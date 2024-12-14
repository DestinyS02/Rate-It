<?php
require 'db.php';  // Include database connection

if (isset($_GET['token'])) {
  $token = $_GET['token'];

  // Check if token exists and is valid
  $stmt = $pdo->prepare("SELECT email, expires_at FROM email_verifications WHERE token = ? AND verified = 0");
  $stmt->execute([$token]);
  $record = $stmt->fetch(PDO::FETCH_ASSOC);

  if ($record) {
    if (strtotime($record['expires_at']) > time()) {
      // Token is valid, mark email as verified
      $update = $pdo->prepare("UPDATE email_verifications SET verified = 1 WHERE token = ?");
      $update->execute([$token]);
      echo "Email verified successfully!";
    } else {
      echo "Token expired.";
    }
  } else {
    echo "Invalid token.";
  }
} else {
  echo "No token provided.";
}
?>