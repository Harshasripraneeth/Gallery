<?php

class Gallery_model extends CI_Model{

    public function __construct(){
        parent::__construct();
        $this->db  = $this->load->database('default',TRUE);
    }

    // retrieve records from database based on category and username.
    public function get_entries_username($username,$category){
        
        try
        {
            if($category === "ALL")
            {
                $this->db->select('*');
                $this->db->where('username', $username); 
                $data['images']  = $this->db->get('images')->result_array();
           // $data['images'] = $this->db->query("SELECT * FROM images where username = '$username' ")->result_array();
            
            }
            else
            $data['images'] = $this->db->query("SELECT * FROM images where username = '$username' and category = '$category' ")->result_array();
            
            //retrieving categories list from database.
            $this->db->distinct();
            $this->db->select('category');
            $this->db->where('username', $username); 
            $data['categories']  = $this->db->get('images')->result_array();
            //$data['categories'] = $this->db->query("SELECT distinct category FROM images where username = '$username' ");
            return $data;
        }
        catch (Exception $e) {
            $invalid = ['error'=> $e->getMessage()];
            $this->response($invalid, 500);
        }
    }
    
    //inserting the record into the database
    public function insert_image($data){
        $this->db->insert('images',$data);
        return true;
    }

    //function to update the record in the database.
    public function update($id,$data){
        $this->db->update('images',$data,$id);
    }
    
    //delete the record from the database based on id.
    public function delete($id){
        $this -> db -> where('id',$id);
        $this -> db -> delete('images');
    }
}

?>