<?php
header('Content-Type: application/json');

require_once 'db.php';
include_once("headers.php");

try {
    $conn = new PDO("mysql:host=$servername;dbname=$dbname", $username, $password);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    $stmt = $conn->prepare("SELECT * FROM consola");
    $stmt->execute();
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
    // Add some debugging output
    error_log("Found " . count($result) . " consoles in database");
    
    echo json_encode($result);
} catch(PDOException $e) {
    error_log("Database error: " . $e->getMessage());
    echo json_encode(["error" => "Error: " . $e->getMessage()]);
}
$conn = null;

