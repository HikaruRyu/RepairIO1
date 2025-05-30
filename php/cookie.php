<?php
include_once("headers.php");

function isUserAuthenticated() {
    if (!isset($_COOKIE['user'])) {
        return false;
    }

    $user = json_decode(base64_decode($_COOKIE['user']), true);
    
    if (!$user || !isset($user['email']) || !isset($user['idUser'])) {
        return false;
    }

    $cookieTime = strtotime($user['expiry']);
    if ($cookieTime < time()) {
        return false;
    }

    include_once("db.php");
    
    $sql = "SELECT idUser FROM usuari WHERE email = ? AND idUser = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("si", $user['email'], $user['idUser']);
    $stmt->execute();
    $result = $stmt->get_result();

    return $result->num_rows === 1;
}
