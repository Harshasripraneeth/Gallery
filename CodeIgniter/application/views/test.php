<html>
<head>
<title> test</title>
</head>

<body>
   <?php echo base_url('index.php/api/gallery/test') ?>
  <form method= 'post' action = <?php echo base_url('index.php/api/gallery/test'); ?> enctype="multipart/form-data" >

  <input type = 'text' name = 'token'/>
  <input type = 'text' name = "category"/>
  <input type = 'submit'/>
         
  </form>
</body>
</html>