<?php
include_once("db.php");
include_once("headers.php");
include_once("cookie.php");


$nom = $_POST['nom'] ?? '';
$fabricant = $_POST['fabricant'] ?? '';
$descripcio = $_POST['descripcio'] ?? '';
$infoManteniment = $_POST['infoManteniment'] ?? '';
$URLapp = $_POST['URLapp'] ?? '';
$imatge = $_POST['imatge'] ?? '';

if (empty($nom) || empty($fabricant) || empty($descripcio) || empty($infoManteniment) || empty($URLapp) || empty($imatge)) {
    echo json_encode(['status' => 'error', 'message' => 'Todos los campos son obligatorios']);
    exit;
}

try {
    $sql = "INSERT INTO consola (nom, fabricant, descripcio, infoManteniment, URLapp, imatge) 
            VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $nom, $fabricant, $descripcio, $infoManteniment, $URLapp, $imatge);
    
    if ($stmt->execute()) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Consola creada exitosamente',
            'idConsola' => $stmt->insert_id
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => 'Error al crear la consola: ' . $stmt->error
        ]);
    }
    
    $stmt->close();
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

$conn->close();
