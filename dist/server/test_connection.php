<?php
require_once 'config/database.php';

$database = new Database();
$result = $database->connect();
echo json_encode($result);
?> 