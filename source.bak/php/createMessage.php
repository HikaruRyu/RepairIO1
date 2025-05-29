<?php
require_once 'db.php';
include_once("headers.php");

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['idForum'], $data['contingut'], $data['idUsuari'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Datos incompletos recibidos'
    ]);
    exit;
}

try {
    $stmt = $conn->prepare("INSERT INTO missatge (contingut, data, idUsuari, idForum) 
                           VALUES (?, CURRENT_DATE(), ?, ?)");
    
    $stmt->execute([
        $data['contingut'],
        $data['idUsuari'],
        $data['idForum']
    ]);
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Mensaje creado exitosamente'
    ]);
} catch(PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al crear el mensaje: ' . $e->getMessage()
    ]);
}

$conn = null;
