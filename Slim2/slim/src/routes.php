<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Firebase\JWT\JWT;
use Tuupola\Base62;

return function (App $app) {
    $container = $app->getContainer();

  
    $app->post('/api/user/login', function ($request, $response, $args) use ($container) {

        $email = $request->getParam('email');
        $password = $request->getParam('password');
    
    
        $sql = "select user_id from Users where email='$email' AND password='$password'";
    
        try {
            $db = new db();
            $db = $db->connect();
    
            $query = $db->query($sql);
            $users = $query->fetchAll(PDO::FETCH_OBJ);
            $db = null;

           if(count($users)>0){
            $requested_scopes = $request->getParsedBody() ?: [];
            $now = new DateTime();
            $future = new DateTime('+15 minutes');
            $server = $request->getServerParams();
            $jti = (new Base62)->encode(random_bytes(16));
            $payload = [
                'iat' => $now->getTimeStamp(),
                'exp' => $future->getTimeStamp(),
                'jti' => $jti,
                'sub' => $server['PHP_AUTH_USER'],
                'user_id' => $users[0]->userid,
            ];

            $secret = 'secret_key';
            $token = JWT::encode($payload, $secret, 'HS256');
            
            $data['token'] = $token;
            $data['expires'] = $future->getTimeStamp();

           } else{
               $data['token'] = 'false';
           }
            

    
            return $response->withStatus(201)
            ->withHeader('Content-Type', 'application/json')
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

        } catch (PDOException $e) {
            echo $e;
        }
    });

    

    $app->get('/api/user', function (Request $request, Response $response, array $args) use ($container) {
        
        $token =  $request->getAttribute('jwt');
        $userid = $token['user_id'];
        $sql = "select * from users where userid = $userid ";
        echo $userid;

        try {
            $db = new db();
            $db = $db->connect();
    
            $query = $db->query($sql);
            $users = $query->fetchAll(PDO::FETCH_OBJ);
            $db = null;


            return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
            ->write(json_encode($users, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));

        } catch (PDOException $e) {
            echo $e;
        }
    });

    $app->get('/api/products', function (Request $request, Response $response, array $args) use ($container) {
        
        $token =  $request->getAttribute('jwt');
        $userid = $token['user_id'];
        $sql = "select product_name,product_price,product_categories,product_platforms,
        product_stock,product_description,product_languages,product_minimum_requeriments,product_recommended_requeriments
        from Products where JSON_CONTAINS(product_categories,'[\"Fear\",\"Driving\"]')";      
          

        try {
            $db = new db();
            $db = $db->connect();
    
            $query = $db->query($sql);
            $games = $query->fetchAll(PDO::FETCH_OBJ);
            $db = null;

            
            if(count($games)>0){
                return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
                ->write(json_encode($games, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
            } else{
                return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
                ->write(json_encode(null, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
            }
            

        } catch (PDOException $e) {
            echo $e;
        }
    });

    
    
};
