<?php

include_once("headers.php");
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include_once("headers.php");
require_once 'db.php';

session_start();

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['titol']) || !isset($data['descripcio']) || !isset($data['URLapp']) || !isset($data['idConsola'])) {
    http_response_code(400);
    echo json_encode(['error' => 'Faltan datos requeridos']);
    exit;
}

$sql = "INSERT INTO problema (titol, descripcio, URLapp, idConsola) VALUES (?, ?, ?, ?)";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al preparar la consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param("sssi", $data['titol'], $data['descripcio'], $data['URLapp'], $data['idConsola']);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Problema creado exitosamente']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al crear el problema: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
