<?php
include_once("headers.php");
require_once 'db.php';

session_start();



$idProblema = $_GET['id'] ?? null;

if (!$idProblema) {
    http_response_code(400);
    echo json_encode(['error' => 'ID del problema requerido']);
    exit;
}

$stmt = $conn->prepare("DELETE FROM problema WHERE idProblema = ?");

if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Error al preparar la consulta: ' . $conn->error]);
    exit;
}

$stmt->bind_param("i", $idProblema);

if ($stmt->execute()) {
    echo json_encode(['message' => 'Problema eliminado exitosamente']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al eliminar el problema: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
