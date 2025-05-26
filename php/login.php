<?php
include_once("db.php");
include_once("headers.php");

$email = $_POST['email'] ?? '';
$password = $_POST['password'] ?? '';

if (empty($email) || empty($password)) {
    echo json_encode(['status' => 'error', 'message' => 'Falten dades.']);
    exit;
}

$sql = "SELECT * FROM usuari WHERE email = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $email);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows === 1) {
    $user = $result->fetch_assoc();

    if (password_verify($password, $user['contrasenya'])) {
        $userData = [
            'idUser' => $user['idUser'],
            'email' => $user['email'],
            'expiry' => date('Y-m-d H:i:s', time() + 3600) 
        ];

        $cookieData = base64_encode(json_encode($userData));

        setcookie('user', $cookieData, time() + 3600, "/", "localhost", false, true);

        echo json_encode([
            'status' => 'success',
            'message' => 'Sessió iniciada correctament.',
            'user' => [
                'idUser' => $user['idUser'],
                'nom' => $user['nom'],
                'email' => $user['email'],
                'rol' => $user['rol']
            ]
        ]);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Contrasenya incorrecta.']);
    }
} else {
    echo json_encode(['status' => 'error', 'message' => 'Usuari no trobat.']);
}

$stmt->close();
$conn->close();
