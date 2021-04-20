<?php

    defined('BASEPATH') OR exit('No direct script access allowed');

    require_once APPPATH . '/libraries/REST_Controller.php';

    require_once APPPATH . '/libraries/JWT/JWT.php';
    require_once APPPATH . '/libraries/JWT/BeforeValidException.php';
    require_once APPPATH . '/libraries/JWT/ExpiredException.php';
    require_once APPPATH . '/libraries/JWT/SignatureInvalidException.php';
    use \Firebase\JWT\JWT;
        
    class IG_Controller extends REST_Controller {
        
        public function __construct(){
            parent::__construct();
        }

        //function for decoding and authentication the JWT token.

        function auth(){
            //JWT token from  Authrorization header.
            $token = $this->input->get_request_header('Authorization');
            $key = 'SecretKey';

             //decoding the token.
            try {
                $decoded = JWT::decode($token, $key, array('HS256'));
                return $decoded;
            } catch (Exception $e) {
                $invalid = ['status' => $e->getMessage()]; //Respon if credential invalid
                $this->response($invalid, 401);
            }
        }

    }

?>