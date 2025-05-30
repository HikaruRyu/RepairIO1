<?php
include_once("headers.php");
require_once 'db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    exit(json_encode(['status' => 'error', 'message' => 'Método no permitido']));
}

$data = array_map('trim', $_POST);
$idConsola = intval($data['idConsola'] ?? 0);

if (
    !$idConsola ||
    empty($data['nom']) ||
    empty($data['fabricant']) ||
    empty($data['descripcio']) ||
    empty($data['infoManteniment']) ||
    empty($data['URLapp']) ||
    empty($data['imatge'])
) {
    exit(json_encode(['status' => 'error', 'message' => 'Faltan campos requeridos']));
}

$sql = "UPDATE consola SET nom = ?, fabricant = ?, descripcio = ?, infoManteniment = ?, URLapp = ?, imatge = ? WHERE idConsola = ?";
$stmt = $conn->prepare($sql);

if (!$stmt) {
    exit(json_encode(['status' => 'error', 'message' => 'Error al preparar la consulta: ' . $conn->error]));
}

$stmt->bind_param(
    "ssssssi",
    $data['nom'],
    $data['fabricant'],
    $data['descripcio'],
    $data['infoManteniment'],
    $data['URLapp'],
    $data['imatge'],
    $idConsola
);

if ($stmt->execute()) {
    echo json_encode([
        'status' => $stmt->affected_rows > 0 ? 'success' : 'error',
        'message' => $stmt->affected_rows > 0
            ? 'Consola actualizada exitosamente'
            : 'No se encontró la consola para actualizar'
    ]);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error al actualizar: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
