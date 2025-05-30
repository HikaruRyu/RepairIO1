<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "repairio1";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die(json_encode([
        'status' => 'error',
        'message' => 'Connection failed: ' . $conn->connect_error
    ]));
}
?>
