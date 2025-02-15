<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, OPTIONS');
$host = "localhost";
$user = "root";
$password = "";
$db = "diet";
$port = 3306;

$con = mysqli_connect($host, $user, $password, $db, $port);