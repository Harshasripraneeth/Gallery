<html>
 <head>
 <title> api </title>
 </head>

 <body>
 <p> welcome to gallery api</p>
 <?php 
   foreach($result as $row){
 ?>

   <p> <?php echo $row['id'] . " " . $row['username'] . " " . $row['email'] ; ?></p>

   <?php } ?>


 </body>
</html>