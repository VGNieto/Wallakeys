<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class User_model extends CI_Model {  
    function __construct()  
    {  
        parent::__construct();  
        $this->load->database();  
    }  
      
    public function islogin($data){  
        $query=$this->db->get_where('users',array('email'=>$data['email'],'password'=>$data['password']));  
        return $query->num_rows();  
    }  
}