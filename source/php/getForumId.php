<?php
require_once 'db.php';
include_once("headers.php");

$consola_nom = $_GET['consola_nom'] ?? null;

if (!$consola_nom) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Nombre de consola requerido'
    ]);
    exit;
}

try {
    $stmt = $conn->prepare("
        SELECT f.idForum 
        FROM forum f 
        JOIN consola c ON f.idConsola = c.idConsola 
        WHERE c.nom = ?
    ");
    $stmt->bind_param("s", $consola_nom);
    $stmt->execute();

    $stmt->bind_result($idForum);

    if ($stmt->fetch()) {
        echo json_encode([
            'status' => 'success',
            'idForum' => $idForum
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'No se encontró el foro para esta consola'
        ]);
    }

    $stmt->close();
    $conn->close();

} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
?>
