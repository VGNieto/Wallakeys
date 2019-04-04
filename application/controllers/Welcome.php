<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {
	
	public function index()
	{
		$this->load->model('Website_model');
        $data['query'] = $this->Website_model->get_website_list();
		$this->load->view('welcome_message',$data);
	}
}
