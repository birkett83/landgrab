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
each portal based on how many nearby portals you have captured. You get a lot
more points for capturing all of the portals in an area than you would for
capturing the same number of portals spread out more widely.

## How does it work?
For each portal you have captured, Landgrab draws a circle centred on that
portal and passing through the nearest portal that you *haven't* captured. Your
score for that portal is the number of portals inside the circle. Your total
landgrab score is the sum of all of the scores of each portal.

## How do I play it?
You need a userscript manager to use IITC, install the landgrab plugin in the
same way.

Scores are shown in the portal detail view.

"Bubbles" will be displayed on the map showing areas where you have captured
all the portals. In addition, if you select a portal that you have captured,
it will show a bubble indicating all the nearby portals that count towards
the selected portal's score.

## This is flakey as heck, what's the deal?
- I don't know javascript. I r clueless noob.
- There is a bug related to caching in the standard Ingress Intel map that
  causes your portal capture history to not load correctly. If you reload the
  page, the history for the portals in view on the map should load correctly.
  Landgrab will store history in your browser once it has seen it, so you should
  only need to do this once for each area.
- Scores are only computed for portals that are loaded in view. If you have a
  large bubble you may need to scroll around the map to update scores for nearby
  portals.
- It's slow. I don't know how much of this is Intel, how much is IITC and how
  much is Landgrab. Um. Did I mention I'm a javascript noob? I did use a
  quadtree for O(n log(n)) performance instead of the naive O(n^2) algorithm.
  Do I get points for that? I'm sorry.

# Credits
IITC was originally written by Stefan Breunig and IITC "Community Edition"
(IITC-CE) is now maintained by modos189 and others.

Landgrab was originally based on the Uniques plugin by 3ch01c.
