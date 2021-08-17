# landgrab
A mini-game based on ingress and IITC.

## What is ingress?
[Ingress](https://ingress.com/) is an augmented-reality game for Android and
iOS.

## What is IITC?
[Ingress Intel Total Conversion](https://iitc.app/) is a fan-made replacement
for the standard Ingress online map.

# What is Landgrab?
Landgrab is a mini-game built using IITC.

Ingress tracks which portals you have captured. Landgrab gives you a score for
each portal based on how many nearby portals you have captured. You get a more
points for capturing all of the portals in an area than you would for capturing
the same number of portals spread out more widely.

## How does it work?
Landgrab draws the [Voronoi
Diagram](https://en.wikipedia.org/wiki/Voronoi_diagram) of the portal network -
basically it divides the map up into regions around each portal.  Each portal
you have captured gets a score equal to the smallest number of regions you have
to cross to reach a portal that you *haven't* captured. Each regions is
coloured according to your score for that region.

Scores are shown in the portal detail view.
## How do I play it?
You need a userscript manager to use IITC. Go to the
[Releases](https://github.com/birkett83/landgrab/releases/) page and click on
landgrab.user.js to install the plugin.

## This is flakey as heck, what's the deal?
- I don't know javascript. I r clueless noob.
- There is a bug related to caching in the standard Ingress Intel map that
  causes your portal capture history to not load correctly. If you reload the
  page, the history for the portals in view on the map should load correctly.
  Landgrab will store history in your browser once it has seen it, so you should
  only need to do this once for each area.
- It will only update the Voronoi diagram and teh scores when portal data has
  completely finished loading.

# Credits
IITC was originally written by Stefan Breunig and IITC "Community Edition"
(IITC-CE) is now maintained by modos189 and others.

Landgrab was originally based on the Uniques plugin by 3ch01c.

Landgrab uses [d3-delunay](https://github.com/d3/d3-delaunay) to compute the
Voronoi diagram
