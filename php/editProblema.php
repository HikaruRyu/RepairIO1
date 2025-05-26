<?php
include_once("headers.php");
require_once 'db.php';

session_start();

if (!isset($_SESSION['user_id']) || $_SESSION['user_role'] !== 1) {
    http_response_code(403);
    echo json_encode(['error' => 'No tienes permisos para editar problemas']);
    exit;
}

$data = json_decode(file_get_contents('php://input'), true);

if (!isset($data['idProblema'])) {
    http_response_code(400);
    echo json_encode(['error' => 'ID del problema requerido']);
    exit;
}

$descripcio = $data['descripcio'] ?? null;
$URLapp = $data['URLapp'] ?? null;
$idConsola = $data['idConsola'] ?? null;
$idProblema = $data['idProblema'];

$sql = "UPDATE problema SET descripcio = ?, URLapp = ?, idConsola = ? WHERE idProblema = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al preparar la consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param("ssii", $descripcio, $URLapp, $idConsola, $idProblema);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Problema actualizado exitosamente']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al actualizar el problema: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
