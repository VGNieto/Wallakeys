<?php
class Pages extends CI_Controller{

    public function ajax(){

        $this->load->model('Website_model');
        $data['query'] = $this->Website_model->get_website_list();
        $response['success'] = 1;

        $this->output->set_status_header(200)->set_content_type('application/json')->set_output(json_encode($data['query']));

    }
}

