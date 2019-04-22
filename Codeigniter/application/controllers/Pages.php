<?php
use Restserver\Libraries\REST_Controller;
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/libraries/Key.php';
require APPPATH . '/libraries/Format.php';

class Pages extends REST_Controller{
    public function __construct(){
        parent::__construct();
        $this->load->model('Website_model');
        
    }
    public function ajax_get(){
        
        
        $data['query'] = $this->Website_model->get_website_list();
        
        $this->response(json_encode($data['query']));
       
    }

    

}

