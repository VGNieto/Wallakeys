<?php

use MongoDB\Client as Mongo;

class db{

    private $username = "viczz";
    private $pwd = "viczz";

    public function connect(){
        return new Mongo("mongodb://{$this->username}:{$this->pwd}@127.0.0.1:27017");

    }


}