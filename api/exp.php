
<?php
    $servername='172.17.0.2';
    $username='root';
    $password='test';
    $database='gallery';
   
   $conn=mysqli_connect($servername,$username,$password,$database);
   $query =   "SELECT location from images";
   $results = $conn->query($query);
   while( $row = $results->fetch_assoc())
   {
       echo $row['location'];
       echo gettype($row['location']);
?>
  <img style="height:300px;" src = <?php echo "../gallery/uploads/".$row['location']?> alt ="not loaded">
<?php
   }

?>