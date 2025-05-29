<?php
require_once 'db.php';
include_once("headers.php");

$user_id = $_GET['idUser'] ?? null;

if (!$user_id) {
    echo json_encode([
        'status' => 'error',
        'message' => 'No se proporcionó idUser'
    ]);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT * FROM usuari WHERE idUser = ?");
    $stmt->execute([$user_id]);
    $user = $stmt->fetch();
    
    if ($user) {
        echo json_encode([
            'status' => 'success',
            'user' => $user
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'User not found'
        ]);
    }
} catch(PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

$conn = null;
