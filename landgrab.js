// ==UserScript==
// @author         birkett83
// @name           IITC plugin: Landgrab
// @category       Misc
// @version        0.1
// @description    Landgrab
// @id             landgrab
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @match          https://intel.ingress.com/*
// @grant          none
// ==/UserScript==

function wrapper(plugin_info) {

    // Ingress gives coords stored as (lat, lng) in micro-degrees.
    // Most significant bit of 360,000,000 is 1<<28
    // So we need 28 bits and our max tree height is 28.
    const MAX_HEIGHT = 28;
    // Using negative numbers in the quad tree was giving me a headache.
    // So we'll add 180° before storing / looking up in quad tree.
    const OFFSET = 180*1000*1000;

    // ensure plugin framework is there, even if iitc is not yet loaded
    if(typeof window.plugin !== 'function') window.plugin = function() {};

    //use own namespace for plugin
    var landgrab = window.plugin.landgrab = function() {};

    // maps the JS property names to localStorage keys
    landgrab.FIELDS = {
        'portalInfo': 'plugin-landgrab-portalinfo',
    };

    landgrab.portalInfo = {};
    landgrab.quadtree = [];
    landgrab.updateQueue = [];
    landgrab.score = 0;

    landgrab.bubbleOptions = {
        stroke: true,
        color: '#8E4C82',
        weight: 4,
        opacity: 0.5,
        interactive: false,
        fill: true,
        fillColor: null, // to use the same as 'color' for fill
        fillOpacity: 0.2,
        dashArray: ''
    };

    landgrab.disabledMessage = null;
    landgrab.contentHTML = null;

    landgrab.isHighlightActive = false;

    landgrab.onPortalSelected = function() {
        var guid = window.selectedPortal;
        var portalInfo = landgrab.portalInfo[guid];
        landgrab.selectedBubble.setLatLng([portalInfo.lat/1000000, portalInfo.lng/1000000]);
        landgrab.selectedBubble.setRadius(portalInfo.captureRadius);
    }

    landgrab.onPortalDetailsUpdated = function() {
        if(typeof(Storage) === "undefined") {
            $('#portaldetails > .imgpreview').after(landgrab.disabledMessage);
            return;
        }

        var guid = window.selectedPortal,
            details = portalDetail.get(guid),
            nickname = window.PLAYER.nickname;
        if(details) {
            if(details.history) {
                if(details.history.captured) {
                    landgrab.setPortalCaptured(guid);
                }
            }
            let portalInfo = landgrab.portalInfo[guid];
            $('#portaldetails > .imgpreview').after(
                '<div id="landgrab-container">Portal Score: ' + portalInfo.score + '</br>' +
                'Total Score: ' + landgrab.score + '</div>');

        }
    }

    landgrab.onPortalAdded = function (data) {
        let guid = data.portal.options.guid;
        //landgrab.updateQueue.push(guid);
        let portal = data.portal;
        let history = portal.options.data.history;
        // Bug in stock ingress means history often doesn't show. Something about caching.
        // Reload the page and eventually it does. Or something.
        // For now we just won't add portals until we get the history.
        if (history) {
            let portalInfo = landgrab.portalInfo[guid];
            if (!portalInfo) {
                //console.log("Adding", guid);
                portalInfo = landgrab.portalInfo[guid] = {
                    captured: history.captured,
                    score: 0,
                    captureRadius: 0,
                    lat: portal.options.data.latE6,
                    lng: portal.options.data.lngE6,
                };
            } else {
                //console.log("Updating history on", guid);
                portalInfo.captured = history.captured;
            }
            // add the portal to the queue for rescoring.
            // no point rescoring now because more portals will likely be added nearby
            landgrab.updateQueue.push(guid);
            landgrab.addPortalToQuadTree(guid, portal.options.data.latE6, portal.options.data.lngE6);

        } else {
            //console.log("History not found; Not adding", guid)
        }
    }

    landgrab.portalBubble = function (guid, style) {
        var portalInfo = landgrab.portalInfo[guid];
        return L.geodesicCircle([portalInfo.lat/1000000, portalInfo.lng/1000000], portalInfo.captureRadius, style);
    }

    landgrab.drawBubbles = function() {
        var portalList = Object.fromEntries(
            // Don't try to draw bubbles for portals with score less than 5
            Object.entries(landgrab.portalInfo).filter(
                (entry) => entry[1].score >= 5
            )
        );
        landgrab.bubbles.clearLayers();
        // re-add the bubble for the selected portal
        landgrab.bubbles.addLayer(landgrab.selectedBubble);
        while (!$.isEmptyObject(portalList)) {
            let [best_guid, bestPortalInfo] = Object.entries(portalList).reduce((a, b) => a[1].score > b[1].score ? a : b);
            let bubble = L.geodesicCircle(
                [bestPortalInfo.lat/1000000, bestPortalInfo.lng/1000000],
                bestPortalInfo.captureRadius,
                landgrab.bubbleOptions
            );
            landgrab.bubbles.addLayer(bubble);
            for (let guid of landgrab.findOverlappingBubbles(best_guid)) {
                delete portalList[guid];
            }
        }
    }

    landgrab.onMapDataRefreshEnd = function () {
        var guid;
        while (guid = landgrab.updateQueue.pop()) {
            landgrab.updatePortalScore(guid);
        }
        landgrab.score = 0;
        for (let guid in landgrab.portalInfo) {
            landgrab.score += landgrab.portalInfo[guid].score;
        }
        landgrab.storeLocal('portalInfo');
        landgrab.storeLocal('quadtree');
        landgrab.drawBubbles();
    }

    landgrab.setPortalCaptured = function(guid) {
        var portalInfo = landgrab.portalInfo[guid];

        if(portalInfo === undefined) {
            return;
        }

        if(portalInfo.captured) return;

        portalInfo.captured = true;
        landgrab.storeLocal('portalInfo');
    }

    landgrab.addPortalToQuadTree = function(guid, lat, lng) {
        lat += OFFSET;
        lng += OFFSET;

        var tree = landgrab.quadtree;

        for (let height = MAX_HEIGHT; height > 0; height--) {
            if (tree.length == 0) {
                // create a new empty quadtree node
                for (let i = 0; i < 4; i++) {
                    tree[i] = [];
                }
            }
            let quadrant = (((lat >> height) & 1) << 1)| ((lng >> height) & 1);
            tree = tree[quadrant];
        }
        let quadrant = ((lat & 1) << 1 ) | (lng & 1);
        tree[quadrant] = guid;
    }

    landgrab.distPointPoint = function(lat, lng, other_lat, other_lng) {
        if (other_lat > OFFSET || other_lng > OFFSET) {
            console.warn(other_lng, " > ", OFFSET, "Did you get this from a quad?");
        }
        // spherical distance formula
        // stolen from https://www.movable-type.co.uk/scripts/latlong.html
        // conversion from micro-degrees to radians
        const factor = Math.PI/180000000;
        const earth_diameter = 12742000;
        let φ1 = lat * factor;
        let φ2 = lat * factor;
        let Δφ = (lat-other_lat) * factor;
        let Δλ = (lng-other_lng) * factor;

        let a = Math.sin(Δφ/2) * Math.sin(Δφ/2) + Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ/2) * Math.sin(Δλ/2);
        return earth_diameter * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    }

    landgrab.distPointQuad = function(lat, lng, quad_lat, quad_lng, height) {
        // The quad is the square with top left corner (quad_lat, quad_lng)
        // and side length 1<<height

        // The final `height` bits of quad_lat, quad_lng should be 0.
        // The bitmask has those bit set to 1 so the far corner of the quad is
        // (quad_lat | bitmask, quad_lng | bitmask)

        let bitmask = (1 << height) - 1;

        let quad_lat_far = quad_lat | bitmask;
        let quad_lng_far = quad_lng | bitmask;

        const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

        var nearest_lat = clamp(lat+OFFSET, quad_lat, quad_lat_far);
        var nearest_lng = clamp(lng+OFFSET, quad_lng, quad_lng_far);

        // undo the offset used for storing points in the tree
        var dst = landgrab.distPointPoint(lat, lng, nearest_lat - OFFSET, nearest_lng - OFFSET);

        return dst;
    }


    landgrab.findNearest = function(lat, lng, pred, max_dst, trace) {

        let tree = landgrab.quadtree;
        if (max_dst === undefined) max_dst = Infinity;

        return landgrab.findNearestInner(tree, lat, lng, 0, 0, MAX_HEIGHT+1, null, max_dst, pred, trace);
    }

    landgrab.findNearestInner = function(tree, lat, lng, quad_lat, quad_lng, height, cur_best, cur_dst, pred, trace) {
        ////let prefix = -(1 << height);
        let bitmask = (1 << height) - 1;
        let prefix = ~bitmask;
        const bin = function(num) {
            return (num & ~(1 <<31)).toString(2).padStart(31, 0)
        }
        // useful for debugging
        const target_in_quad = (lat, lng) => (((((lat + OFFSET) & prefix) ^ quad_lat) == 0) && ((((lng + OFFSET & prefix) ^ quad_lng) == 0)));
        if ( trace ) {
            // useful for debugging
            console.log("Target coords:     ", bin(lat + OFFSET), bin(lng + OFFSET));
            console.log("    Looking in quad", bin(quad_lat), bin(quad_lng), height);
            console.log("             Prefix", bin(prefix), bin(prefix))
        }
        if(pred === undefined) { console.log("pred is undefined"); pred = () => true;}
        if (!tree || tree.length == 0) {
            if ( trace ) {
                console.log("bailing because tree empty", tree);
            }
            return [cur_best, cur_dst];
        }
        if (height == 0) {
            // console.log(tree);
            // tree is a leaf node, i.e a portal guid
            let portalInfo = landgrab.portalInfo[tree];
            let new_dst = landgrab.distPointPoint(lat, lng, portalInfo.lat, portalInfo.lng);
            if (new_dst < cur_dst) {
                if (trace) console.log("calling pred");
                if (pred(tree)) {
                    //console.log(tree);
                    return [tree, new_dst];
                } else {
                    return [cur_best, cur_dst];
                }
            } else {
                return [cur_best, cur_dst];
            }
        }

        let new_dst = landgrab.distPointQuad(lat, lng, quad_lat, quad_lng, height)

        if (new_dst > cur_dst) {
            if ( trace ) {
                console.log("bailing because of dst", cur_dst, new_dst);
                console.log(lat, lng, quad_lat, quad_lng, height);
            }

            return [cur_best, cur_dst];
        }

        height = height - 1;

        bitmask = 1 << height;

        [cur_best, cur_dst] = landgrab.findNearestInner(tree[0], lat, lng, quad_lat, quad_lng, height, cur_best, cur_dst, pred, trace);
        [cur_best, cur_dst] = landgrab.findNearestInner(tree[1], lat, lng, quad_lat, quad_lng | bitmask, height, cur_best, cur_dst, pred, trace);
        [cur_best, cur_dst] = landgrab.findNearestInner(tree[2], lat, lng, quad_lat | bitmask, quad_lng, height, cur_best, cur_dst, pred, trace);
        [cur_best, cur_dst] = landgrab.findNearestInner(tree[3], lat, lng, quad_lat | bitmask, quad_lng | bitmask, height, cur_best, cur_dst, pred, trace);
        return [cur_best, cur_dst];
    }

    landgrab.findOverlappingBubbles = function(guid) {
        var portalInfo = landgrab.portalInfo[guid];
        let overlap = function (innerguid) {
            let innerPortalInfo = landgrab.portalInfo[innerguid];
            let dist = landgrab.distPointPoint(innerPortalInfo.lat, innerPortalInfo.lng, overlap.target.lat, overlap.target.lng);
            if (dist < innerPortalInfo.captureRadius + overlap.target.captureRadius) {
                overlap.results.push(innerguid);
            }
            return false;
        }
        overlap.target = portalInfo;
        overlap.results = [];
        landgrab.findNearest(portalInfo.lat, portalInfo.lng, overlap, portalInfo.captureRadius * 2);
        return overlap.results;
    }

    landgrab.updatePortalScore = function(guid) {
        var portalInfo = landgrab.portalInfo[guid];
        if (!portalInfo) {
            console.log("guid not found", guid);
            return 0;
        }
        if (!portalInfo.captured) return 0;
        var [nearest_uncaptured, dist] = landgrab.findNearestUncaptured(portalInfo.lat, portalInfo.lng);
        portalInfo.captureRadius = dist;
        let score = function (guid) {
            score.count = score.count + 1;
            return false;
        }
        score.count = 0;
        landgrab.findNearest(portalInfo.lat, portalInfo.lng, score, dist);
        portalInfo.score = score.count;
    }

    landgrab.findNearestUncaptured = function(lat, lng) {
        var uncaptured = function(guid) {
            return !landgrab.portalInfo[guid].captured;
        }
        return landgrab.findNearest(lat, lng, uncaptured);
    }

    /*landgrab.findExact = function (lat, lng) {
        var tree = landgrab.quadtree;
        for (let height = MAX_HEIGHT; height > 0; height--) {
            let quadrant = (((lat >> height) & 1) << 1)| ((lng >> height) & 1);

            if (tree[quadrant].length == 0) {
                console.log(height, quadrant, tree);
            }
            tree = tree[quadrant];
        }
        let quadrant = ((lat & 1) << 1 ) | (lng & 1);
        return tree[quadrant];
    }*/

    /*landgrab.commonPrefixDist = function(lat, lng) {
        // Finds the quadrant in the tree with the longest common prefix of lat, lng.
        // This gives us an upper bound for the distance to the nearest point.
        var tree = landgrab.quadtree;
        for (let height = 31; height >= 0; height--) {
            if (tree.length > 0) {
                let quadrant = (((lat >> (height-1)) & 2) | ((lng >> height) & 1));
                //console.log(tree, height);
                tree = tree[quadrant];
            } else {
                // This quad is not in the quadtree. so parent is, which means the target
                // point is in a quad of height height+1 that contains at least one portal
                // The target point is at most sqrt(2)*(1<<(height+1)) from that portal.
                // But... we're using squared distances because taking square roots is for
                // suckers.

                return Math.pow(2, 2*height+3);
            }
        }
        return 0;
    }*/

    landgrab.storeLocal = function(name) {
        var key = landgrab.FIELDS[name];
        if(key === undefined) return;

        var value = landgrab[name];

        if(typeof value !== 'undefined' && value !== null) {
            localStorage[key] = JSON.stringify(landgrab[name]);
        } else {
            localStorage.removeItem(key);
        }
    }

    landgrab.loadLocal = function(name) {
        var key = landgrab.FIELDS[name];
        if(key === undefined) return;

        if(localStorage[key] !== undefined) {
            landgrab[name] = JSON.parse(localStorage[key]);
        }
    }

    /***************************************************************************************************************************************************************/
    /** HIGHLIGHTER ************************************************************************************************************************************************/
    /***************************************************************************************************************************************************************/
    landgrab.highlighter = {
        highlight: function(data) {
            var guid = data.portal.options.ent[0];
            var history = data.portal.options.data.history;

            var portalInfo = landgrab.portalInfo[guid];

            // doing this here feels kinda gross. I can't find a better alternative right now.

            if (history && portalInfo) {
                if (history.captured) {
                    landgrab.setPortalCaptured(guid);
                }
            }

            var style = {};

            if (portalInfo) {
                if (portalInfo.captured) {
                    // captured - no highlights
                } else {
                    // we have an 'portalInfo' entry for the portal, but it's not captured
                    style.fillColor = 'white';
                    style.fillOpacity = 1.0;
                }
            } else {
                // no visit data at all
                style.fillColor = 'white';
                style.fillOpacity = 1.0;
            }

            data.portal.setStyle(style);
        },

        setSelected: function(active) {
            landgrab.isHighlightActive = active;
        }
    }


    landgrab.setupCSS = function() {
        $("<style>")
            .prop("type", "text/css")
            .html('\
#landgrab-container {\
  display: block;\
  text-align: center;\
  margin: 6px 3px 1px 3px;\
  padding: 0 4px;\
}\
#landgrab-container label {\
  margin: 0 0.5em;\
}\
')
            .appendTo("head");
    }

    landgrab.setupContent = function() {
        landgrab.disabledMessage = '<div id="landgrab-container" class="help" title="Your browser does not support localStorage">Plugin landgrab disabled</div>';
    }

    var setup = function() {
        landgrab.setupCSS();
        landgrab.setupContent();
        landgrab.loadLocal('portalInfo');
        for (let guid in landgrab.portalInfo) {
            let portalInfo = landgrab.portalInfo[guid];
            landgrab.addPortalToQuadTree(guid, portalInfo.lat, portalInfo.lng);
        }
        landgrab.bubbles = new L.LayerGroup();
        landgrab.selectedBubble = L.geodesicCircle([0, 0], 0, {
            ...landgrab.bubbleOptions,
            color: '#ADD8E6'
        });
        window.addPortalHighlighter('landgrab', landgrab.highlighter);
        window.addHook('portalDetailsUpdated', landgrab.onPortalDetailsUpdated);
        window.addHook('portalSelected', landgrab.onPortalSelected);
        window.addHook('portalAdded', landgrab.onPortalAdded);
        window.addHook('mapDataRefreshEnd', landgrab.onMapDataRefreshEnd);
        window.addLayerGroup('Landgrab: Grabbed land', landgrab.bubbles, true);
    }

    setup.info = plugin_info; //add the script info data to the function as a property
    if(!window.bootPlugins) window.bootPlugins = [];
    window.bootPlugins.push(setup);
    // if IITC has already booted, immediately run the 'setup' function
    if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = { version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);

