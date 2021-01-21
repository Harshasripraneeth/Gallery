<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: *');
header('Content-Type: application/json');
header('Access-Control-Allow-Headers: Access-Control-Allow-Headers,Content-Type,Access-Control-Allow-methods,Authorization,X-Requested-With');

 $servername='172.17.0.2';
 $username='root';
 $password='test';
 $database='gallery';

$conn=mysqli_connect($servername,$username,$password,$database);

if(isset($_FILES['uploadFile'])){
  
    $file = $_FILES['uploadFile'];

    $fileName = $file['name'];
    $fileTmpName = $file['tmp_name'];
    $fileSize = $file['size'];
    $fileError = $file['error'];

    $fileExt = explode(".",$fileName);
    $fileActualExt = strtolower(end($fileExt));

    $fileFormats = array('jpg','jpeg','png');

    //check whether given file is image or not

    if (in_array($fileActualExt,$fileFormats)){

        if($fileError === 0){

            if($fileSize < 1000000){

                $filePath = uniqid('',true).".".$fileActualExt;
                $fileDestination = '../gallery/public/pictures/'.$filePath;
                move_uploaded_file($fileTmpName,$fileDestination);
                $username = $_POST['username'];
                $category = $_POST['category'];
                $description = $_POST['description'];

                $query = "INSERT INTO images (username,location,category,description) VALUES (?,?,?,?)";
                $stmt = $conn->prepare($query);
                $stmt->bind_param("ssss",$username,$filePath,$category,$description);
                $stmt->execute();

                echo json_encode(array("status"=>"success"));
     
            }
            else{
                echo "file size is too big! please compress it";
            }

        }
        else{
            echo "Error Occured!!";
        }



    }
    else{
        echo "file format is not supported";
    }


}
