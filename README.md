# DigThat

A very good practice for building a front-end application. 

Play it on github pages:

[Github Pages Digthat](https://pkufaraway.github.io/digthat/)

# Game Rules

## Overview

Dig That is a two-player game between a Badguy and a Detector. The Badguy builds an explosive tunnel under the city and it is the role of the Detector to detect the tunnel.Two people can play, or one person can play Detector and the computer will be the Badguy.

## Phases

- The Detector looks away from the screen while the Badguy builds a tunnel. Maximum length of the tunnel is randomly generated, and will be specified before building begins. The tunnel needs to be a simple path with a start and end node on the top and bottom rows respectively. In order to construct the tunnel, the Badguy needs to click on the edges he wants to be a part of his tunnel. When he is content with the tunnel, he clicks on the "I finished my tunnel" button in the info panel and the tunnel will disappear. 

- Now the Detector can begin detecting by placing probes on any number of intersections or edges. When the Detector is done, click the "Done placing first round of probes" button. If a given probe is on top of a part of the tunnel, the probe will turn green. Repeat this process up to two more times.

- The Detector selects what she believes is the location of the tunnel. When she is done, she clicks on the "Ready to submit final guess" button. </li>

## Easy Mode

When playing in easy mode, every detection will not only reveal the information about the selected edge/intersection, but also all the edges connected to it.

## Play with AI

AI will randomly build a tunnel and let the player play as the detector.

## Score

If the Detector correctly detected the tunnel, her score is (intersection probes + edge probes) she used. If she incorrectly detected the tunnel, then she gets a score of infinity. Now the two players reverse roles. The winner is the player with the lowest score.

# Skill Stack

## Vue.js

Vue.js is the main javascript framework for this game. The concept of "two-way" binding is very useful for the game, you can take a look at game.js

## Semantic UI

Semantic UI is a very good choice for mordern UI design, the style looks neat and clean.

## Webpack

Webpack is a skill for solving all your dependencies and pack it up to one file. Using uglify plugin with webpack, we can bundle it to a single and uglified file.

# steps for build new version of it.

- Use node.js, install webpack.
- Change all the file you want, including css/html/js
- In the folder js, run webpack(we've provided the config file)
- Now you got a new bundle.js file.