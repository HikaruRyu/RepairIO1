<?php
require_once 'db.php';
include_once("headers.php");

setcookie('user', '', time() - 3600, '/');

header('/');
exit;
