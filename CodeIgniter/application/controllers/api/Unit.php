<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require_once APPPATH . '/core/IG_Controller.php';
class Unit extends CI_Controller{

    function test(){
        $this->load->model('gallery_model');
        $this->load->library('unit_test');
        $result = $this->gallery_model->get_entries_username('praneeth','ALL');
        echo $this->unit->run($result,'is_array','running database cases');
        echo $this->unit->report();
        var_dump( $this->unit->result());

    }
}

?>