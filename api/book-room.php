<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header("Content-Type: application/json");

if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["status" => "error", "message" => "Invalid request"]);
    exit;
}

// ✅ FIXED DATABASE NAME (NO HYPHENS)
$conn = new mysqli("localhost", "root", "", "pioneer_kings_resort");

if ($conn->connect_error) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => $conn->connect_error]);
    exit;
}

$name     = trim($_POST['name'] ?? '');
$email    = trim($_POST['email'] ?? '');
$phone    = trim($_POST['phone'] ?? '');
$room     = trim($_POST['room'] ?? '');
$checkin  = $_POST['checkin'] ?? '';
$checkout = $_POST['checkout'] ?? '';

if (!$name || !$email || !$phone || !$room || !$checkin || !$checkout) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "All fields are required"]);
    exit;
}

$stmt = $conn->prepare("
    INSERT INTO bookings (name, email, phone, room, checkin, checkout, status)
    VALUES (?, ?, ?, ?, ?, ?, 'Pending')
");

if (!$stmt) {
    echo json_encode(["status" => "error", "message" => $conn->error]);
    exit;
}

$stmt->bind_param("ssssss", $name, $email, $phone, $room, $checkin, $checkout);

if ($stmt->execute()) {
    echo json_encode(["status" => "success"]);
} else {
    echo json_encode(["status" => "error", "message" => $stmt->error]);
}

$stmt->close();
$conn->close();
