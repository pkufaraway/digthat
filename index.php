<!DOCTYPE html>
<html>
<head>
    <base href="localhost">
    <script src="js/jquery-2.2.4.min.js"></script>
    <script src="js/facebox.js"></script>
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
    <?php include "header.php"; ?>
<nav>
  <ul>
      <li><a href="">Home</a></li>
<!--	<li><a href="memory">Memory Game</a></li>-->
  </ul>
	<li><a href="games/empty/">Empty Template</a></li>
	<li><a href="games/multiplayer-snake/">Snake</a></li>
     <!--?php include "leftMenuGame.php"; ?-->
</nav>
<!--<article>-->
<!--    <h2><a href="images/loading.gif" rel="facebox">text</a>-->
<!--    </h2>-->
<!--  <h1>Notice</h1>-->
<!--</article>-->

    <?php include "footer.php"; ?>
</div>

</body>
</html>
