<?php

use Slim\App;
use Tuupola\Middleware\HttpBasicAuthentication;
use \Tuupola\Middleware\Cors;

return function (App $app) {
    // e.g: $app->add(new \Slim\Csrf\Guard);
    

    $container = $app->getContainer();

    $container['logger'] = function ($c) {
        $logger = new \Monolog\Logger('my_logger');
        $file_handler = new \Monolog\Handler\StreamHandler("../logs/app.log");
        $logger->pushHandler($file_handler);
        return $logger;
    };
    
    $container["jwt"] = function ($container) {
        return new StdClass;
    };
    
    $app->add(new Tuupola\Middleware\JwtAuthentication([
        "path" => "/",
        "logger" => $container['logger'],
        "secret" => "secret_key",
        "attribute" => "jwt",
        "rules" => [
            new Tuupola\Middleware\JwtAuthentication\RequestPathRule([
                "path" => "/",
                "ignore" => ["/token", "/not-secure", "/home", "/api/user/login","/api/user/register","/api/products","/api/product/info",
                "/api/categories","/api/platforms","/api/products/filter"]
            ]),
            new Tuupola\Middleware\JwtAuthentication\RequestMethodRule([
                "ignore" => ["OPTIONS"]
            ]),
        ],
        "error" => function ($response, $arguments) {
            $data["status"] = "error";
            $data["message"] = $arguments["message"];
            return $response
                ->withHeader("Content-Type", "application/json")
                ->getBody()->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        }
    ]));

    
    $app->add(new Tuupola\Middleware\HttpBasicAuthentication([
        "path" => "/api/token",
        "users" => [
            "user" => "password"
        ]
    ]));
    
    $options = [
        "logger" => $container["logger"],
        "origin" => ["*"],
        "methods" => ["GET", "POST", "PUT", "PATCH", "DELETE","OPTIONS"],
        "headers.allow" => ["Authorization", "If-Match", "If-Unmodified-Since","token"],
        "headers.expose" => ["Authorization", "Etag","token"],
        "credentials" => true,
        "cache" => 60,
        "error" => function ($request, $response, $arguments) {
            $data["status"] = "error";
            $data["message"] = $arguments["message"];
            return $response
                ->withHeader("Content-Type", "application/json")
                ->write(json_encode($data, JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
        }];
    $app->add(new Tuupola\Middleware\CorsMiddleware($options));
};
