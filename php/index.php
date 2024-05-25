<?php
session_start();

use Slim\Factory\AppFactory;
use Slim\Routing\RouteCollectorProxy;

use Psr\Http\Message\ResponseInterface as Response;
use Psr\Http\Message\ServerRequestInterface as Request;
use Psr\Http\Server\RequestHandlerInterface;
use Slim\Routing\RouteContext;

require __DIR__ . '/vendor/autoload.php';


//autoloader
function autoloader($class_name)
{
    $directories = ['', '/controllers', '/src', '/config'];
    foreach ($directories as $dir) {
        $file = __DIR__ . $dir . '/' . $class_name . '.php';
        if (file_exists($file)) {
            require $file;
            return;
        }
    }
}
spl_autoload_register('autoloader');

$app = AppFactory::create();

$app->addBodyParsingMiddleware();

$app->add(function (Request $request, RequestHandlerInterface $handler): Response {
    $routeContext = RouteContext::fromRequest($request);
    $routingResults = $routeContext->getRoutingResults();
    $methods = $routingResults->getAllowedMethods();
    $requestHeaders = $request->getHeaderLine('Access-Control-Request-Headers');

    $response = $handler->handle($request);

    $response = $response->withHeader('Access-Control-Allow-Origin', Config::$cors_domain);
    $response = $response->withHeader('Access-Control-Allow-Methods', implode(',', $methods));
    $response = $response->withHeader('Access-Control-Allow-Headers', $requestHeaders);
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
