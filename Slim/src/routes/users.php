<?php
use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;

$app = new \Slim\App;


$app->options('/{routes:.+}', function ($request, $response, $args) {
    return $response;
});

$app->add(function ($req, $res, $next) {
    $response = $next($req, $res);
    return $response
            ->withHeader('Access-Control-Allow-Origin', '*')
            ->withHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Origin, Authorization')
            ->withHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
});

//Get all users

$app->get('/api/users',function(Request $request,Response $response){


    $sql = "select * from users";

    try{
        $db = new db();
        $db = $db->connect();

        $query = $db->query($sql);
        $users = $query->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return $response->withStatus(200)
        ->write(json_encode($users));


    } catch(PDOException $e){
        echo $e;
    }
}); 

$app->post('/api/user/login',function(Request $request,Response $response){

    $email = $request->getParam('email');
    $password = $request->getParam('password');


    $sql = "select * from users where email='$email' AND password='$password'";

    try{
        $db = new db();
        $db = $db->connect();

        $query = $db->query($sql);
        $users = $query->fetchAll(PDO::FETCH_OBJ);
        $db = null;
        
        return count($users)>0 ? $response->withStatus(200)->write("true"):$response->withStatus(200)->write("false");


    } catch(PDOException $e){
        echo $e;
    }
}); 

// Catch-all route to serve a 404 Not Found page if none of the routes match
// NOTE: make sure this route is defined last
$app->map(['GET', 'POST', 'PUT', 'DELETE', 'PATCH'], '/{routes:.+}', function($req, $res) {
    $handler = $this->notFoundHandler; // handle using the default Slim page not found handler
    return $handler($req, $res);
});