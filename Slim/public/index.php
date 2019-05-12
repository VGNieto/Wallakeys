<?php
session_cache_limiter(false);
session_start();


use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

require 'vendor/autoload.php';
require 'src/config/db.php';


//Get slim component
$app = new \Slim\App;

//Users routes

require 'src/routes/users.php';

$app->run();