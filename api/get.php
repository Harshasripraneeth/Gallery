<?php

//headers
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept');
header('Content-Type: application/json');

if($_SERVER['REQUEST_METHOD'] === 'GET'){

    $servername='172.17.0.2';
    $username='root';
    $password='test';
    $database='gallery';

   $db=mysqli_connect($servername,$username,$password,$database);

   $query = "SELECT location FROM images";

   $rows = $db->query($query);

   $results = array();
   $number_of_rows = mysqli_num_rows($rows);
   $results['data'] = array();
   if($number_of_rows > 0)
   {
   	
   	while( $row = $rows->fetch_assoc())
   	{
         $item = array('location'=>$row['location']);
   		array_push($results['data'],$item);
   	}
   
   	echo json_encode($results);
}
else
{
   echo json_encode(array('message'=> 'no results found'));
}

 	    
}
else{
	echo json_encode(array("message"=>"please ensure the request method is GET"));
} 
