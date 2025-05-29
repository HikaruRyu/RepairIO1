<?php
include_once("db.php"); 
include_once("headers.php");

$username = $_POST['username'] ?? '';
$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';
$confirmPassword = $_POST['confirmPassword'] ?? '';

if ($password !== $confirmPassword) {
    echo json_encode(['status' => 'error', 'message' => 'Les contrasenyes no coincideixen.']);
    exit;
}

$hashedPassword = password_hash($password, PASSWORD_DEFAULT);

$sql = "INSERT INTO usuari (nom, email, contrasenya, rol) VALUES (?, ?, ?, ?)";

$rol = 0;

$stmt = $conn->prepare($sql);
$stmt->bind_param("sssi", $username, $email, $hashedPassword, $rol);

if ($stmt->execute()) {
    echo json_encode(['status' => 'success', 'message' => 'Registre completat correctament.']);
} else {
    echo json_encode(['status' => 'error', 'message' => 'Error en registrar: ' . $stmt->error]);
}

$stmt->close();
$conn->close();
?>
