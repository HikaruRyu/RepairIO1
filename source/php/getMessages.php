<?php
require_once 'db.php';
include_once("headers.php");

$idForum = $_GET['idForum'] ?? null;

if (!$idForum) {
    echo json_encode([
        'status' => 'error',
        'message' => 'ID del foro requerido'
    ]);
    exit;
}

try {
    $stmt = $conn->prepare("SELECT m.*, u.nom as autor 
                            FROM missatge m 
                            JOIN usuari u ON m.idUsuari = u.idUser 
                            WHERE m.idForum = ? 
                            ORDER BY m.data DESC");
    $stmt->bind_param("i", $idForum);
    $stmt->execute();
    $result = $stmt->get_result();

    $messages = [];
    while ($row = $result->fetch_assoc()) {
        $messages[] = $row;
    }

    echo json_encode([
        'status' => 'success',
        'messages' => $messages
    ]);
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
