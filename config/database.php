<?php
$host = "localhost";
$user = "root";
$pass = "";
$db   = "pioneer_kings_resort";

// Create connection
$conn = new mysqli($host, $user, $pass, $db);

// Check connection
if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}
?>
