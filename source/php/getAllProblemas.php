<?php
include_once("headers.php");
require_once 'db.php';

session_start();

$sql = "
    SELECT p.*, c.nom as consola_nom
    FROM problema p
    JOIN consola c ON p.idConsola = c.idConsola
    ORDER BY p.idProblema DESC
";

$result = $conn->query($sql);

if ($result) {
    $problemas = [];
    while ($row = $result->fetch_assoc()) {
        $problemas[] = $row;
    }
    echo json_encode($problemas);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Error al obtener los problemas: ' . $conn->error]);
}

$conn->close();
