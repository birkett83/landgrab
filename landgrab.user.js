// ==UserScript==
// @author         birkett83
// @name           IITC plugin: Landgrab
// @category       Misc
// @version        0.2
// @description    Landgrab
// @id             landgrab
// @namespace      https://github.com/IITC-CE/ingress-intel-total-conversion
// @match          https://intel.ingress.com/*
// @grant          none

// @require        https://cdn.jsdelivr.net/npm/d3-delaunay@6.0.2/dist/d3-delaunay.min.js

// ==/UserScript==

/* globals $, L, d3 */


function wrapper(plugin_info) {
    // ensure plugin framework is there, even if iitc is not yet loaded
    if(typeof window.plugin !== 'function') window.plugin = function() {};

    //use own namespace for plugin
    var landgrab = window.plugin.landgrab = function() {};

    landgrab.portalInfo = [];
    landgrab.portalIndex = {};
    landgrab.scores = [];
    landgrab.totalScore = 0;
    landgrab.voronoi = null;
    landgrab.colorGradient = ['#000000', '#b20000', '#da0000', '#e72400', '#f14c01', '#fa7400', '#fc9200', '#feb901', '#ffde04', '#ffe432', '#ffea60'];

    landgrab.disabledMessage = null;
    landgrab.contentHTML = null;

    landgrab.voronoiStyle = {
        stroke: true,
        color: '#FF00FF',
        weight: 4,
        opacity: 0.5,
        interactive: false,
        fill: true,
        fillColor: null, // to use the same as 'color' for fill
        fillOpacity: 0.2,
        dashArray: ''
    };

    landgrab.onPortalSelected = function() {
        // TODO
    }

    landgrab.onPortalDetailsUpdated = function() {
        if(typeof(Storage) === "undefined") {
            $('#portaldetails > .imgpreview').after(landgrab.disabledMessage);
            return;
        }

        var guid = window.selectedPortal,
            details = window.portalDetail.get(guid),
            nickname = window.PLAYER.nickname;
        if(details) {
            let [idx, portalInfo] = landgrab.getPortal(guid);
            if(details.history) {
                if(details.history.captured && !portalInfo.captured) {
                    portalInfo.captured = true;
                    landgrab.computeScores();
                    landgrab.storePortalInfo();
                }
            }
            if (landgrab.scores == null) {
                console.log("scores are null!");
                return
            }


            $('#portaldetails > .imgpreview').after(
                '<div id="landgrab-container">Portal Score: ' + landgrab.scores[idx] + '</br>' +
                'Total Score: ' + landgrab.totalScore + '</div>');

        }
    }

    landgrab.onPortalAdded = function (data) {
        let guid = data.portal.options.guid;
        let portal = data.portal;
        let history = portal.options.data.history;
        // Bug in stock ingress means history often doesn't show. Something about caching.
        // Reload the page and eventually it does. Or something.
        // For now we just ignore portals that don't have history.
        if (!history) { return }
        let [idx, portalInfo] = landgrab.getPortal(guid);
        if (idx == undefined) {
            // We have not seen this portal before.
            // This means we need to compute a new voronoi diagram (and scores)
            // We'll do that in mapDataRefreshEnd
            landgrab.voronoi = null;
            //console.log(history);
            landgrab.addPortal(guid, portal.options.data.latE6/1000000, portal.options.data.lngE6/1000000, history.captured);
        } else {
            if(history.captured && !portalInfo.captured) {
                // This portal has been captured since we last saw it. We need to recompute scores.
                // We'll do that in mapDataRefreshEnd
                portalInfo.captured = true;
                landgrab.scores = null;
            }
        }
    }

    landgrab.mapDataRefreshEnd = function () {
        if (!landgrab.voronoi) {
            // Using the d3-geo-voronoi package which does proper spherical geometry
            // produced extremely bad results when portals are close together, probably
            // because of rounding errors in the trigonometric functions blowing up.

            // Instead we will just ignore all that and pretend these are coordinates
            // a plane. This will totally break near the anti-prime meridian.
            // To the people of Fiji, I humbly apologise, I could not get it to work
            // properly for you.

            landgrab.voronoi = d3.Delaunay.from(
                Object.values(landgrab.portalInfo),
                p => p.lat,
                p => p.lng
            ).voronoi([-180, -180, 180, 180]);
            // need to recompute scores.
            landgrab.scores = null;
        }
        if (!landgrab.scores) {
            landgrab.computeScores();
        }
        landgrab.storePortalInfo();
    }

    landgrab.computeScores = function(depth, neighbors) {
        var polygons = [...landgrab.voronoi.cellPolygons()];
        var newneighbors = []
        if (depth == undefined) {
            landgrab.voronoiLayer.clearLayers();
            landgrab.totalScore = 0;
            landgrab.scores = [];
            depth = 0;
            neighbors = [];
            for (let [i, portalInfo] of landgrab.portalInfo.entries()) {
                // Find the uncaptured portals, i.e. score 0
                if (!portalInfo.captured) {
                    neighbors.push(i)
                }
            }
        }
        for (let i of neighbors) {
            // Check if we've seen this portal before
            if (landgrab.scores[i] != undefined) { continue };
            landgrab.scores[i] = depth;
            if (depth > 0) {
                // draw on map
                let color = landgrab.colorGradient[depth % landgrab.colorGradient.length];
                let style = {...landgrab.voronoiStyle, color: color};
                landgrab.voronoiLayer.addLayer(
                    new L.polygon(polygons[i], style)
                );
            }
            landgrab.totalScore += depth;
            for (let n of landgrab.voronoi.neighbors(i)) {
                if (landgrab.scores[n] == undefined) {
                    newneighbors.push(n)
                }
            }
        }
        if (newneighbors.length) {
            landgrab.computeScores(depth+1, newneighbors);
        }
    }

    landgrab.getPortal = function(guid) {
        var idx = landgrab.portalIndex[guid];
        if (idx == undefined) {
            //console.log("guid not found", guid);
            return [null, null];
        }
        var portalInfo = landgrab.portalInfo[idx];
        if (portalInfo == undefined) {
            //console.log("index not found", guid, idx);
            return [null, null];
        }
        if (portalInfo.guid != guid) {
            console.log("guid mismatch", guid, idx, portalInfo.guid);
            return [null, null];
        }
        return [idx, portalInfo];
    }

    landgrab.addPortal = function(guid, lat, lng, captured) {
        // It would be nice to use the guid as our portal identifiers everywhere
        // but sadly d3.Delunay only works on integer indices.
        let newlen = landgrab.portalInfo.push({
            guid: guid,
            lat: lat,
            lng: lng,
            captured: captured,
        });
        landgrab.portalIndex[guid] = newlen -1;
    }

    const key = 'plugin-landgrab-portalinfo';
    landgrab.loadPortalInfo = function() {
        if(localStorage[key] == undefined) {
            return;
        }

        var portalInfo = JSON.parse(localStorage[key]);
        if (!portalInfo instanceof Array) {return};
        // We don't set landgrab.portalInfo to the value loaded from JSON directly
        // because we need to construct landgrab.portalIndex as well.
        // So instead we call addPortal on each item.
        for (let p of portalInfo) {
            landgrab.addPortal(p.guid, p.lat, p.lng, p.captured);
        }
    }

    landgrab.storePortalInfo = function() {
        //localStorage.removeItem('plugin-landgrab-portalinfo');
        localStorage[key] = JSON.stringify(landgrab.portalInfo);
    }

    /***************************************************************************************************************************************************************/
    /** HIGHLIGHTER ************************************************************************************************************************************************/
    /***************************************************************************************************************************************************************/
    landgrab.highlighter = {
        highlight: function(data) {
            var guid = data.portal.options.ent[0];
            let [idx, portalInfo] = landgrab.getPortal(guid);

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
        landgrab.loadPortalInfo();
        window.COLORS[0] = "#777777";

        landgrab.voronoiLayer = new L.LayerGroup();
        window.addPortalHighlighter('landgrab', landgrab.highlighter);
        window.addHook('portalDetailsUpdated', landgrab.onPortalDetailsUpdated);
        window.addHook('portalSelected', landgrab.onPortalSelected);
        window.addHook('portalAdded', landgrab.onPortalAdded);
        window.addHook('mapDataRefreshEnd', landgrab.mapDataRefreshEnd);
        window.addLayerGroup('Landgrab: Grabbed land', landgrab.voronoiLayer, true);
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
