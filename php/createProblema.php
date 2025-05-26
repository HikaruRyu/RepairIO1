<?php
include_once("headers.php");
require_once 'db.php';

session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 1) {
    http_response_code(403);
    echo json_encode(['error' => 'No tienes permisos para crear problemas']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['descripcio']) || !isset($data['URLapp']) || !isset($data['idConsola'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos requeridos']);
    exit;
}

$sql = "INSERT INTO problema (descripcio, URLapp, idConsola) VALUES (?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al preparar la consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param("ssi", $data['descripcio'], $data['URLapp'], $data['idConsola']);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Problema creado exitosamente']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al crear el problema: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
