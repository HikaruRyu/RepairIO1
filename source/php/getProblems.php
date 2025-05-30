<?php
header('Content-Type: application/json');
require_once 'db.php';
include_once("headers.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idConsola = $_GET['idConsola'] ?? null;
    
    if (!$idConsola) {
        http_response_code(400);
        echo json_encode(['error' => 'ID de consola no proporcionado']);
        exit;
    }

    try {
        $stmt = $conn->prepare("SELECT * FROM problema WHERE idConsola = ?");
        $stmt->bind_param("i", $idConsola);
        $stmt->execute();
        $result = $stmt->get_result();

        $problems = [];
        while ($row = $result->fetch_assoc()) {
            $problems[] = $row;
        }

        echo json_encode($problems);
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener los problemas: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?>
