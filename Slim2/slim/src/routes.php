<?php

use Slim\App;
use Slim\Http\Request;
use Slim\Http\Response;
use Firebase\JWT\JWT;
use Tuupola\Base62;
use MongoDB\Client as Mongo;
use MongoDB\BSON\ObjectId;

return function (App $app) {
    $container = $app->getContainer();

    //Login and get the access token.
    $app->post('/api/user/login', function ($request, $response, $args) use ($container) {

        //Get the request parameters.
        $email = $request->getParam('email');
        $password = $request->getParam('password');
    
        //Create the conection to db
        $db = new db();
        $mongo = $db->connect();
        
        $user = $mongo->wallakeys->users->find(['email'=>$email,'password'=>$password])->toArray();

        //Create the token and encode it.
        if (count($user)>0 && count($user)<2) {
            $now = new DateTime();
            $future = new DateTime('+500 minutes');
            $jti = (new Base62)->encode(random_bytes(16));
            $payload = [
            'iat' => $now->getTimeStamp(),
            'exp' => $future->getTimeStamp(),
            'jti' => $jti,
            'oid' => strval($user[0]->_id)
            ];

            $secret = 'secret_key';
            $token = JWT::encode($payload, $secret, 'HS256');
        
            $data['token'] = $token;
            $data['expires'] = $future->getTimeStamp();
            $data['oid'] = strval($user[0]->_id);

            return $response->withStatus(201)
        ->withHeader('Content-Type', 'application/json')
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        } else {
            return $response->withStatus(201)
            ->withHeader('Content-Type', 'application/json')
            ->write(json_encode(false, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        }
    });

    
    //Register a user into db if not exists

    $app->post('/api/user/register', function (Request $request, Response $response, array $args) use ($container) {

        //Take the params from request.
        $email = $request->getParam('email');
        $password = $request->getParam('password');

        //Create the conection to db
        $db = new db();
        $mongo = $db->connect();

        //Check if the user exists in db.
        $checkUser = $mongo->wallakeys->users->find(['email'=>$email])->toArray();
        //User not exist
        if (count($checkUser)==0) {
            
            //Introduce new user
            $inserted = $mongo->wallakeys->users->insertOne(['email'=>$email,'password'=>$password], array());

            $now = new DateTime();
            $future = new DateTime('+500 minutes');
            $jti = (new Base62)->encode(random_bytes(16));
            $payload = [
            'iat' => $now->getTimeStamp(),
            'exp' => $future->getTimeStamp(),
            'jti' => $jti,
            'oid' => $inserted->getInsertedID()
            ];

            $secret = 'secret_key';
            $token = JWT::encode($payload, $secret, 'HS256');
        
            $data['token'] = $token;
            $data['expires'] = $future->getTimeStamp();
            $data['oid'] = $inserted->getInsertedID();

            return $response->withStatus(201)
            ->withHeader('Content-Type', 'application/json')
            ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        } else {
            $response->withStatus(200)->withHeader('Content-Type', 'application/json')
            ->write(json_encode(false, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        }
    });

    $app->delete('/api/user/delete', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid']->{'$oid'};
        $db = new db();
        $mongo = $db->connect();
       
        $delete = $mongo->wallakeys->users->deleteOne(['_id' => new MongoDB\BSON\ObjectId($oid)]);
        
        if (($delete->getDeletedCount())>0) {
            return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
            ->write(json_encode("User has been deleted succesfully", JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        } else {
            return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
            ->write(json_encode("error", JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        }
    });

    //Get all products
    $app->get('/api/products', function (Request $request, Response $response, array $args) use ($container) {
        $db = new db();
        $mongo = $db->connect();
        $data = $mongo->wallakeys->games->find()->toArray();

        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

    //Filter Products
    $app->get('/api/products/filter', function (Request $request, Response $response, array $args) use ($container) {
        $db = new db();
        $mongo = $db->connect();
        $categories = explode(",", $request->getQueryParam("filterCategories"));
        $platforms = explode(",", $request->getQueryParam("filterPlatforms"));
        $price = explode(",", $request->getQueryParam("filterPrice"));
        
        //Check the values from the request
        if ($platforms[0] == "" and count($platforms)==1) {
            $platforms = null;
        }
        if ($categories[0] == "" and count($categories)==1) {
            $categories = null;
        }
        
        if (!isset($price[0]) and !isset($price[1])) {
            $price = null;
        } elseif (!isset($price[0]) and isset($price[1])) {
            $maxPrice = $price[1];
        } elseif (isset($price[0]) and !isset($price[1])) {
            $minPrice = $price[0];
        } else {
            $maxPrice= $price[1];
            $minPrice = $price[0];
        }

        //If platforms and categories are not null and prices change
        if ($platforms != null and $categories != null and isset($maxPrice) and isset($minPrice)) {
            $data = $mongo->wallakeys->games->find([   '$and' => [    ["categories" => ['$in'=>$categories]],
                                                                      ["platforms" =>['$all'=>$platforms]],
                                                                      ["price" =>['$gt'=>intval($minPrice),'$lt'=>intval($maxPrice)]] ]   ])->toArray();
        } elseif ($platforms != null and $categories != null and !isset($maxPrice) and isset($minPrice)) {
            $data = $mongo->wallakeys->games->find([   '$and' => [    ["categories" => ['$in'=>$categories]],
                                                                      ["platforms" =>['$all'=>$platforms]],
                                                                      ["price" =>['$gt'=>intval($minPrice)]]]    ])->toArray();
        } elseif ($platforms != null and $categories != null and isset($maxPrice) and !isset($minPrice)) {
            $data = $mongo->wallakeys->games->find([   '$and' => [    ["categories" => ['$in'=>$categories]],
                                                                      ["platforms" =>['$all'=>$platforms]],
                                                                      ["price" =>['$lt'=>intval($maxPrice)]]]    ])->toArray();
        
        //If categories not null and prices change
        } elseif ($categories != null and isset($maxPrice) and isset($minPrice)) {
            $data = $mongo->wallakeys->games->find([   '$and' => [    ["categories" => ['$in'=>$categories]],
                                                                  ["price" =>['$gt'=>intval($minPrice),'$lt'=>intval($maxPrice)]] ]   ])->toArray();
        } elseif ($categories != null and isset($minPrice)) {
            $data = $mongo->wallakeys->games->find([   '$and' => [    ["categories" => ['$in'=>$categories]],
                                                                        ["price" =>['$gt'=>intval($minPrice)]] ]   ])->toArray();
        } elseif ($categories != null and isset($maxPrice)) {
            $data = $mongo->wallakeys->games->find([   '$and' => [    ["categories" => ['$in'=>$categories]],
                                                                        ["price" =>['$lt'=>intval($maxPrice)]] ]   ])->toArray();
                           
        //If platforms not null and prices change
        } elseif ($platforms != null and isset($maxPrice) and isset($minPrice)) {
            $data = $mongo->wallakeys->games->find([   '$and' => [     ["platforms" =>['$all'=>$platforms]],
                                                                        ["price" =>['$gt'=>intval($minPrice),'$lt'=>intval($maxPrice)]] ]   ])->toArray();
        } elseif ($platforms != null and isset($minPrice)) {
            $data = $mongo->wallakeys->games->find([   '$and' => [     ["platforms" =>['$all'=>$platforms]],
                                                                        ["price" =>['$gt'=>intval($minPrice)]] ]   ])->toArray();
        } elseif ($platforms != null and isset($maxPrice)) {
            $data = $mongo->wallakeys->games->find([   '$and' => [    ["platforms" =>['$all'=>$platforms]],
                                                                        ["price" =>['$lt'=>intval($maxPrice)]] ]   ])->toArray();

        //If platforms and categories are not null but prices are
        } elseif ($platforms != null and $categories != null) {
            $data = $mongo->wallakeys->games->find([   '$and' => [    ["categories" => ['$in'=>$categories]],
                                                                      ["platforms" =>['$all'=>$platforms]] ]])->toArray();

        //If only platforms
        } elseif ($platforms != null) {
            $data = $mongo->wallakeys->games->find(["platforms" =>['$in'=>$platforms]])->toArray();
        
        //If only categories
        } elseif ($categories != null) {
            $data = $mongo->wallakeys->games->find(["categories" =>['$in'=>$categories]])->toArray();
        
        //If only min and max price
        } elseif (isset($minPrice) and isset($maxPrice)) {
            $data = $mongo->wallakeys->games->find(["price" =>['$gt'=>intval($minPrice),'$lt'=>intval($maxPrice)]])->toArray();
        
        //If only max price
        } elseif (isset($maxPrice)) {
            $data = $mongo->wallakeys->games->find(["price" =>['$lt'=>intval($maxPrice)]])->toArray();
        
        //If onlye min price
        } elseif (isset($minPrice)) {
            $data = $mongo->wallakeys->games->find(["price" =>['$gt'=>intval($minPrice)]])->toArray();
        }

        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

    //Get specific product
    $app->get('/api/product/info', function (Request $request, Response $response, array $args) use ($container) {
        $productID = $request->getParam('productID');

        $db = new db();
        $mongo = $db->connect();
       
        $info = $mongo->wallakeys->games->find(['_id' => new MongoDB\BSON\ObjectId($productID)])->toArray();
        
       
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($info, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

    //Get categories
    $app->get('/api/categories', function (Request $request, Response $response, array $args) use ($container) {
        $db = new db();
        $mongo = $db->connect();
        $data = $mongo->wallakeys->games->distinct('categories');

        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

    //Get platforms
    $app->get('/api/platforms', function (Request $request, Response $response, array $args) use ($container) {
        $db = new db();
        $mongo = $db->connect();
        $data = $mongo->wallakeys->games->distinct('platforms');

        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });


    //Get user's info
    $app->get('/api/user/info', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid'];
        $db = new db();
        $mongo = $db->connect();
       
        $info = $mongo->wallakeys->users->find(['_id' => new MongoDB\BSON\ObjectId($oid)], ['projection' => ['password' => 0,'_id'=> 0]])->toArray();
        
       
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($info, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

    //Get user's info
    $app->get('/api/user/account/cards', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid'];
        $db = new db();
        $mongo = $db->connect();
       
        $info = $mongo->wallakeys->users->find(['_id' => new MongoDB\BSON\ObjectId($oid)], ['projection' => ['cards' => 1]])->toArray();
        
       
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($info, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });



    //Update user's account details info
    $app->post('/api/user/update', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid'];
        $db = new db();
        $mongo = $db->connect();
        //Get the request parameters.
        $data['fullname'] = $request->getParam('fullname');
        $data['country'] = $request->getParam('country');
        $data['birthday'] = $request->getParam('birthday');


        foreach ($data as $key => $value) {
            $info[] = $mongo->wallakeys->users->findOneAndUpdate(
                ['_id' => new MongoDB\BSON\ObjectId($oid)],
                [ '$set' => [$key => $value]],
                ['upsert' => true]
            );
        }
        if (!isset($info[0])) {
            $info = true;
        }
       
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($info, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });


    //Update user's password
    $app->post('/api/user/updatepassword', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid'];
        $db = new db();
        $mongo = $db->connect();
        //Get the request parameters.
        $oldpassword = $request->getParam('oldPassword');
        $newpassword = $request->getParam('newPassword');


        
        $info[] = $mongo->wallakeys->users->findOneAndUpdate(
            ['_id' => new MongoDB\BSON\ObjectId($oid),'password' => $oldpassword],
            [ '$set' => ['password' => $newpassword]]
        );
        
        if (!isset($info[0])) {
            $info = true;
        }
       
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($info, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

    //Update user's phone
    $app->post('/api/user/updatephone', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid'];
        $db = new db();
        $mongo = $db->connect();
        //Get the request parameters.
        $phoneNumber = $request->getParam('phoneNumber');


        
        $info[] = $mongo->wallakeys->users->findOneAndUpdate(
            ['_id' => new MongoDB\BSON\ObjectId($oid)],
            [ '$set' => ['phoneNumber' => $phoneNumber]],
            ['upsert' => true]
        );
        
        if (!is_null($info[0])) {
            $info = true;
        }
       
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($info, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

    //Set new user's card
    $app->post('/api/user/addcard', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid'];
        $db = new db();
        $mongo = $db->connect();
        //Get the request parameters.
        $fullName = $request->getParam('fullName');
        $number = $request->getParam('number');
        $month = $request->getParam('month');
        $year = $request->getParam('year');
        $CVV = $request->getParam('CVV');


        
        $info[] = $mongo->wallakeys->users->findOneAndUpdate(
            ['_id' => new MongoDB\BSON\ObjectId($oid)],
            [ '$push' =>['cards' => ['id' =>new MongoDB\BSON\ObjectId(), 'fullname' => $fullName,'number'=> $number,'month'=>$month,'year' => $year,'cvv' => $CVV] ] ],
            ['upsert' => true]
        );

        if (!is_null($info[0])) {
            $info = true;
        }

        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($info, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });
    //Delete user's card
    $app->delete('/api/user/deletecard', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid'];
        $db = new db();
        $mongo = $db->connect();
        //Get the request parameters.
        $cardID = $request->getParam('cardID');
        $password = $request->getParam('password');

        $info[] = $mongo->wallakeys->users->findOneAndUpdate(
            ['_id' => new MongoDB\BSON\ObjectId($oid),'password' => $password],
            [ '$pull' => ['cards' => [ 'id' => new MongoDB\BSON\ObjectId($cardID)]]]
        );

        if (!is_null($info[0])) {
            $info = "deleted";
        } else {
            $info = "notdeleted";
        }

        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($info, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

    //Delete user's card
    $app->post('/api/order/new', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid'];
        $db = new db();
        $mongo = $db->connect();
        //Get the request parameters.
        $games = $request->getParam('games');
        $totalOrder = $request->getParam('total');
        $arrayGames = explode(",", $games);
        
        $keys = array();
        foreach ($arrayGames as $key => $value) {
            $quantity = intval(substr($value, strpos($value, "+")+1));
            for ($i=0; $i <  $quantity;  $i++) {
                $new = substr(str_shuffle(str_repeat("0123456789ABDCEFGHIJKLMNOPQRSTUVWXYZ", 10)), 0, 10);
                $keys[] =  $new;
            }

            $id=substr($value, 0, strpos($value, "+"));
            $game = $mongo->wallakeys->games->find(['_id' => new MongoDB\BSON\ObjectId($id)])->toArray();


            $data[] = ['id' => substr($value, 0, strpos($value, "+")), 'quantity' => substr($value, strpos($value, "+")+1 ),
                'keys' => $keys,'name'=>$game[0]->name,'price'=>$game[0]->price,'image'=>$game[0]->img
            ];
            $keys = [];
        }

        $orderID = substr(str_shuffle(str_repeat("0123456789", 6)), 0, 6);
        $date = (new DateTime())->format('Y-m-s H:i:s');
        $info[] = $mongo->wallakeys->users->findOneAndUpdate(
            ['_id' => new MongoDB\BSON\ObjectId($oid)],
            [ '$push' =>['orders' => [
                'id' => $orderID
                , 'games' =>$data ,'date' => $date,'total' => $totalOrder ] ] ],
            ['new' => true]

        );         
        
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($orderID, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

    //Get user's orders
    $app->get('/api/user/orders', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid'];
        $db = new db();
        $mongo = $db->connect();
       
        $info = $mongo->wallakeys->users->find(['_id' => new MongoDB\BSON\ObjectId($oid)], ['projection' => ['orders' => 1]])->toArray();
        
       
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($info, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

    //Get order detail
    $app->get('/api/user/order/details', function (Request $request, Response $response, array $args) use ($container) {
        $token = $request->getAttribute('jwt');
        $oid = $token['oid'];
        $db = new db();
        $mongo = $db->connect();
        $orderID = $request->getParam("orderID");

        $info = $mongo->wallakeys->users->find(['_id' => new MongoDB\BSON\ObjectId($oid)], ['projection' => ['orders' => 1]])->toArray();

        foreach ($info[0]->orders as $key => $value) {
            if ($value['id'] == $orderID){
                $orderDetails = $value;
                break;
            } 

        }
       
        return $response->withStatus(200)->withHeader('Content-Type', 'application/json')
        ->write(json_encode($orderDetails, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
    });

};
