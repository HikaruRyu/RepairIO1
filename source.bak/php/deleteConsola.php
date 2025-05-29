<?php
include_once("headers.php");
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
    exit;
}

$idConsola = isset($_POST['idConsola']) ? intval($_POST['idConsola']) : 0;

if (!$idConsola) {
    echo json_encode(['status' => 'error', 'message' => 'ID de consola no válido']);
    exit;
}

$sql = "DELETE FROM consola WHERE idConsola = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al preparar la consulta: ' . $conn->error
    ]);
    exit;
}

$stmt->bind_param("i", $idConsola);

if ($stmt->execute()) {
    if ($stmt->affected_rows > 0) {
        echo json_encode(['status' => 'success', 'message' => 'Consola eliminada exitosamente']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'No se encontró la consola para eliminar']);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al ejecutar la consulta: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
