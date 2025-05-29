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
    $conn->begin_transaction();

    $sql = "INSERT INTO consola (nom, fabricant, descripcio, infoManteniment, URLapp, imatge) 
            VALUES (?, ?, ?, ?, ?, ?)";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ssssss", $nom, $fabricant, $descripcio, $infoManteniment, $URLapp, $imatge);
    
    if (!$stmt->execute()) {
        throw new Exception('Error al crear la consola: ' . $stmt->error);
    }
    
    $idConsola = $stmt->insert_id;
    $stmt->close();

    $sql = "INSERT INTO forum (idConsola) VALUES (?)";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $idConsola);
    
    if (!$stmt->execute()) {
        throw new Exception('Error al crear el foro: ' . $stmt->error);
    }
    
    $stmt->close();

    $conn->commit();

    echo json_encode([
        'status' => 'success',
        'message' => 'Consola y foro creados exitosamente',
        'idConsola' => $idConsola
    ]);

} catch (Exception $e) {
    $conn->rollback();
    
    echo json_encode([
        'status' => 'error',
        'message' => 'Error: ' . $e->getMessage()
    ]);
}

$conn->close();
?>
