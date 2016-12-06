<!DOCTYPE html>
<html>
<head>
    <?php $base = "../../" ?>
    <base href="../../">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/facebox.js"></script>
    <script src="js/gameSettings.js"></script>
    <link rel="stylesheet" type="text/css" href="css/facebox.css"/>
    <link rel="stylesheet" type="text/css" href="css/main.css"/>
    <link rel="stylesheet" type="text/css" href="css/bootstrap.css"/>
    <script type="text/javascript">
        jQuery(document).ready(function($) {
            $('a[rel*=facebox]').facebox()
        })
    </script>
</head>
<body>
<div class="container">
    <?php include $base."/header.php"; ?>
    <nav>
        <ul>
        <li><a href="">Home</a></li>
        </ul>
        <li><a href="games/empty">Empty Template</a></li>
	<li><a href="games/multiplayer-snake/">Snake</a></li>

        <!--?php include $base."leftMenuGame.php"; ?-->

    </nav>
    <article>
        <h1 id="gameName">Snake</h1>
        <h3 id="groupName">By Null Team</h3>
        <div class="jumbotron">
        <h3>Instruction:</h3>
        <p>- Control your snake(square dot) to eat food(green dot) to get longer.</p>
        <p>- Bumping into walls, other snakes and obstacles(black X) will cause you to lose.</p>
        <p>- The longest snake alive will win.</p>
        <p>Press 'enter' to start/stop/resume the game, 'r' to restart</p>
        </div>
        <h3>Play game in pop up window:<h3>
        <form id="gameSettings" class="well"></form>
        <h4>Screenshot:</h4>
        <img src="games/multiplayer-snake/screenshot.png" width="100%" heigth="100%"></img>
    </article>
    <?php include $base."footer.php"; ?>
</div>
<script type="text/javascript">
    newWindowBtn(2000,2000,"games/multiplayer-snake/dist/index.min.html",[]);
</script>
</body>
</html>
