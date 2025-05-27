<?php
header('Content-Type: application/json');
require_once 'db.php';
include_once("headers.php");

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $idProblema = $_GET['idProblema'] ?? null;
    
    if (!$idProblema) {
        http_response_code(400);
        echo json_encode(['error' => 'ID de problema no proporcionado']);
        exit;
    }

    try {
        $stmt = $conn->prepare("SELECT * FROM problema WHERE idProblema = ?");
        $stmt->bind_param("i", $idProblema);
        $stmt->execute();
        $result = $stmt->get_result();
        
        if ($result->num_rows > 0) {
            $problema = $result->fetch_assoc();
            echo json_encode($problema);
        } else {
            http_response_code(404);
            echo json_encode(['error' => 'Problema no encontrado']);
        }
    } catch (Exception $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Error al obtener el problema: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Método no permitido']);
}
?>
