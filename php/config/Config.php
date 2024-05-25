<?php

class Config
{
    static $db = [
        'driver' => 'mysql',
        'host' => 'mariadb',
        'port' => 3306,
        'schema' => 'playlist',
        'username' => 'root',
        'password' => 'costa'
    ];

    static $cors_domain = 'http://localhost:3000';
}