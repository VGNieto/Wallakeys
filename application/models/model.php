<?php

defined('BASEPATH') OR exit('No direct script access allowed');

class Website_model extends CI_Model {

    private $website = 'website';
	
    function get_website_list() {
        $query = $this->db->get($this->website);
        if ($query) {
            return $query->result();
        }
        return NULL;
    }


}