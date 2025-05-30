<?php
require_once 'db.php';
include_once("headers.php");

$data = json_decode(file_get_contents('php://input'), true);

if (!$data || !isset($data['idUser'], $data['name'], $data['email'], $data['rol'])) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Datos incompletos recibidos'
    ]);
    exit;
}

$hashed_password = null;
if (isset($data['contrasenya']) && !empty($data['contrasenya'])) {
    $hashed_password = password_hash($data['contrasenya'], PASSWORD_DEFAULT);
}

try {
    $sql = "UPDATE usuari SET 
        nom = ?,
        email = ?,
        rol = ?";
    $params = [
        $data['name'],
        $data['email'],
        $data['rol']
    ];

    if ($hashed_password) {
        $sql .= ", contrasenya = ?";
        array_push($params, $hashed_password);
    }
    
    $sql .= " WHERE idUser = ?";
    array_push($params, $data['idUser']);

    $stmt = $conn->prepare($sql);
    $stmt->execute($params);
    
    echo json_encode([
        'status' => 'success',
        'message' => 'Información del usuario actualizada exitosamente'
    ]);
} catch(PDOException $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Error al actualizar los datos: ' . $e->getMessage()
    ]);
}

$conn = null;
?>
