<?php

$servername = "db";
$username = "root";
$password = "";
$dbname = "repairio1";

// Crear conexión con MySQLi
$conn = new mysqli($servername, $username, $password, $dbname);
$conn->options(MYSQLI_OPT_CONNECT_TIMEOUT, 5);
// Verificar conexión
if ($conn->connect_error) {
    echo "Failed to connect to MySQL: " . $mysqli -> connect_error;
    die(json_encode([
        'status' => 'error',
        'message' => 'Connection failed: ' . $conn->connect_error
    ]));
}
?>
