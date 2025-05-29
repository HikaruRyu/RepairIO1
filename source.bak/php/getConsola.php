<?php
include_once("headers.php");
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idConsola = isset($_GET['idConsola']) ? intval($_GET['idConsola']) : 0;

    if ($idConsola <= 0) {
        echo json_encode(['status' => 'error', 'message' => 'ID de consola no válido']);
        exit;
    }

    $sql = "SELECT * FROM consola WHERE idConsola = ?";
    $stmt = $conn->prepare($sql);

    if (!$stmt) {
        echo json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta: ' . $conn->error]);
        exit;
    }

    $stmt->bind_param("i", $idConsola);
    $stmt->execute();
    $result = $stmt->get_result();
    $consola = $result->fetch_assoc();

    if ($consola) {
        echo json_encode(['status' => 'success', 'data' => $consola]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Consola no encontrada']);
    }

    $stmt->close();
} else {
    echo json_encode(['status' => 'error', 'message' => 'Método no permitido']);
}

$conn->close();

