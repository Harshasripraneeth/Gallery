<?php
defined('BASEPATH') OR exit('No direct script access allowed');
Header('Access-Control-Allow-Origin: *'); //for allow any domain, insecure
Header('Access-Control-Allow-Headers: *'); //for allow any headers, insecure
Header('Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE'); //method allowed

require_once APPPATH . '/core/IG_Controller.php';

header('Content-Type: application/json');

class Gallery extends IG_Controller{
    
    function __construct()
    {
        // Construct the parent class
        parent::__construct();
      
        $this->load->model('gallery_model');
    }
    
    //function to test the auth function in IG_Controller.
    public function test_post(){
         var_dump (parent::auth());
         echo $this->input->post('category');
    }


   //post request to get all images based on usernamae and category from react.
    public function index_post(){
      
        //decrypting the JWT Token.
        $decoded = parent::auth();

      try{
            
            if($_POST){		

                $username = $decoded->{'username'};

                $category = $this->input->post('category');

                //retreiving the results from the database.
                $result = $this->gallery_model->get_entries_username($username,$category);
                if(count($result['images']) > 0){
                    $this->response(array(
                        'message' =>'success',
                        'data' => $result['images'],
                        'categories' => $result['categories']
                    ),200);
                }
                // empty records in the database using the username.
                else
                $this->response(array(
                    'message' =>'no results found',
                ),200);

            }

            //no parameters received from the api request.
            else{
                header('Content-Type: application/json');
                $this->response(array(
                    'message' =>'Bad GET Request',
                ),200);
            }   
        }
        catch (Exception $e) {
            $invalid = ['error'=> $e->getMessage()];
            $this->response($invalid, 500);
        }
    }

    //inserting the data into the database.
    public function image_post()
    {

        $decoded = parent::auth();

        try{
            if($_POST)
            {
                if($_FILES)
                {
                    $username = $decoded->{'username'};

                    //saving the file into the uploads folder.
                    $config['upload_path'] = './uploads/';
                    $config['allowed_types'] = 'png|jpeg|jpg';
                    $this->load->library('upload',$config);
                    if ( ! $this->upload->do_upload('uploadFile'))
                    {
                        $error = array('error' => $this->upload->display_errors());  
                        $this->response(array(
                            'message' => $error
                        ),200);
                    }
                    else
                    {
                        $data = array();
                        $fileData = $this->upload->data();

                        $data['location'] = base_url('uploads/'.$fileData['file_name']);
                        $data['title'] = $this->input->post('title');
                        $data['description'] = $this->input->post('description');
                        $data['category'] = $this->input->post('category');
                        $data['username'] = $username;
                        
                        //inserting the record into the database.
                        if($this->gallery_model->insert_image($data))
                        $this->response(array(
                            'message' =>'success'
                        ),200);
                        else
                        $this->response(array(
                            'message' =>'error occured'
                        ),200);

                    }
                }
                else{
                    $this->response(array(
                        'message' =>'Bad Request file not uploaded with request'
                    ),200);
                }
            }
            else{
                $this->response(array(
                    'message' =>'Bad Post Request'
                ),200);
            }

        }
        catch (Exception $e) {
            $invalid = ['error'=> $e->getMessage()];
            $this->response($invalid, 500);
        }
        
    
        
    }

    //deleting the record from the database.
    public function imageDelete_post()
    {


        $decoded = parent::auth();
        
        try
        {
            $username = $decoded->{'username'};
            if($_POST){
    
                //removing the file from uploads folder.
                $this->load->helper('file');
                $location = './'.substr($this->input->post('location'), 32);
                unlink($location);
    
                //deleting the record from the database.
                $this->gallery_model->delete($this->input->post('id'));
                $this->response(array(
                    'message' =>'success'
                ),200);
            }
            else{
                $this->response(array(
                    'message' =>'Bad  request'
                ),200);
            }

        }
        catch (Exception $e) {
            $invalid = ['error'=> $e->getMessage()];
            $this->response($invalid, 500);
        }
        
        
     
    
    }
}

?>