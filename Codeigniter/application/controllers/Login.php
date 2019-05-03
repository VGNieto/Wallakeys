
<?php
use Restserver\Libraries\REST_Controller;
require APPPATH . '/libraries/REST_Controller.php';
require APPPATH . '/libraries/Key.php';
require APPPATH . '/libraries/Format.php';

class Login extends REST_Controller {  

    public function __construct()  
    {  
        parent::__construct();  
        $this->load->helper('url');//you can autoload this functions by configuring autoload.php in config directory  
        $this->load->library ( 'session' );  
        $this->load->model('User_model');  
    }  

    public function login_post(){  
        
        $data['email']=htmlspecialchars($this->post('email'));  
        $data['password']=htmlspecialchars($this->post('password'));  
        $res=$this->User_model->islogin($data);  
        if($res){     
            $this->session->set_userdata('id',$data['username']);   
            $this->response(json_encode("true"));
        
        }  
        else{  
        echo 0;  
        }   
    }  

    public function logout(){  
        $this->session->sess_destroy();  
        header('location:'.base_url()."login/".$this->index());  
        
    }  
}  