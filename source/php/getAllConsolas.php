<?php

include_once("headers.php");
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

include_once("headers.php");
require_once 'db.php';

$sql = "SELECT * FROM consola ORDER BY nom";
$result = $conn->query($sql);

if ($result) {
    $consolas = [];
    while ($row = $result->fetch_assoc()) {
        $consolas[] = $row;
    }
    echo json_encode(['status' => 'success', 'data' => $consolas]);
} else {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al obtener las consolas: ' . $conn->error
    ]);
}

$conn->close();
