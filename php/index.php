<?php
session_start();
use Slim\Factory\AppFactory;
use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Routing\RouteCollectorProxy;
use Slim\Routing\RouteContext;

require __DIR__ . '/vendor/autoload.php';
require __DIR__ . '/controllers/Controller.php';

$app = AppFactory::create();


$app->addBodyParsingMiddleware();

// This middleware will append the response header Access-Control-Allow-Methods with all allowed methods
$app->add(function (Request $request, RequestHandlerInterface $handler): Response {
    $routeContext = RouteContext::fromRequest($request);
    $routingResults = $routeContext->getRoutingResults();
    $methods = $routingResults->getAllowedMethods();
    $requestHeaders = $request->getHeaderLine('Access-Control-Request-Headers');

    $response = $handler->handle($request);

    $response = $response->withHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    $response = $response->withHeader('Access-Control-Allow-Methods', implode(',', $methods));
    $response = $response->withHeader('Access-Control-Allow-Headers', $requestHeaders);

    // Optional: Allow Ajax CORS requests with Authorization header
    $response = $response->withHeader('Access-Control-Allow-Credentials', 'true');

    return $response;
});

$app->addRoutingMiddleware();
$errorMiddleware = $app->addErrorMiddleware(true, true, true);

$app->group('/login', function (RouteCollectorProxy $group){
    $group->post('', 'Controller:login');
    $group->get('', 'Controller:loginning');
    // Allow preflight requests
    $group->options('', function (Request $request, Response $response): Response {
        return $response;
    });

});

$app->group('/signin', function (RouteCollectorProxy $group){
    $group->post('', 'Controller:signin');
    // Allow preflight requests
    $group->options('', function (Request $request, Response $response): Response {
        return $response;
    });

});

$app->group('/playlist1', function (RouteCollectorProxy $group){
    $group->post('', 'Controller:get_playlist');
    $group->delete('/{id}', 'Controller:delate');
    // Allow preflight requests
    $group->options('', function (Request $request, Response $response): Response {
        return $response;
    });

});

$app->group('/playlist2', function (RouteCollectorProxy $group){
    $group->post('', 'Controller:post_playlist');
    // Allow preflight requests
    $group->options('', function (Request $request, Response $response): Response {
        return $response;
    });

});


$app->run();
