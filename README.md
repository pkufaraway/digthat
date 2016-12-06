This is the public repository of DrEcco website for 2016 Fall [Heuristic Problem Solving](http://cs.nyu.edu/courses/fall16/CSCI-GA.2965-001/) class at NYU.

## For class fellows:

We provide a game setting template and two APIs for you to help display your game on our website. Our goal is to try to make the website more stable and manageable, and hopefully fancier =)

### GameSetting

`gameSettings.js` [here](https://github.com/cxashawn/DrEcco_Website/blob/master/js) provides a set of functions that can be used to generate custom game setting panel.

* usage:
    * Insert your game page into the iframe tag of the given template php `empty/index.php` [here](https://github.com/cxashawn/DrEcco_Website/tree/master/empty) file, then create some \<div\>s with ID in your game page to receive values from these functions. Detailed usage example is provided
    * If you do not want your game to be displayed in popup window, just ignore `newWindowBtn` function(you can simply comment out line 44 on `empty/index.php`)

### SaveData API

SaveData api provides a varchar(255) to store the game state that you want to save. It returns 200 if save successes; 404 if username does not exist.

* usage:
    * send `GET` requests to `dbman/save.php`

* params:
    * type: 'save' or 'load'
    * user: username of the current player
    * game: game name
    * data: a string less than 255 (only for type=save)

### SaveScore API

SaveScore API provides a varchar(255) to store the game score that you want to save. If your game does not have an actual score, just send "WIN", "LOSE" or "TIE". If your game have several roles, say Hunter and Prey, please come up a single score which makes sense to all roles, say hunter moves in this case.

* usage:
    * send `GET` requests to `dbman/saveScore.php`

* params:
    * gamename : name of your game, should be the same as your zip folder name
    * playername : default player1/2/3 or any name user sets in this game 
    * score : "WIN", "LOSE", "TIE" or an actual score.

## Submission
Please compress all your codes in a `zip` file. Send your codes to {xc906, by653} @ nyu.edu. 
If any problems, feel free to email us or create issues.


