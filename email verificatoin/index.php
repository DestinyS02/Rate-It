<?php
require 'db.php';
require 'PHPMailer/src/PHPMailer.php';
require 'PHPMailer/src/SMTP.php';
require 'PHPMailer/src/Exception.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
  $email = $_POST['email'];

  // Generate a token
  $token = bin2hex(random_bytes(16));
  $expiresAt = date('Y-m-d H:i:s', strtotime('+1 hour'));

  // Insert into database
  $stmt = $pdo->prepare("INSERT INTO email_verifications (email, token, expires_at) VALUES (?, ?, ?)");
  $stmt->execute([$email, $token, $expiresAt]);

  $mail = new PHPMailer(true);

  try {
    $config = include('config.php');
    $mail->isSMTP();
    $mail->SMTPAuth = true;
    $mail->Host = $config['smtp_host'];
    $mail->Username = $config['smtp_username'];
    $mail->Password = $config['smtp_password'];
    $mail->Port = $config['smtp_port'];
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;

    $mail->setFrom('no-reply@example.com', 'Rating App');
    $mail->addAddress($email);
    $mail->isHTML(true);

    $verificationLink = "http://localhost/email-verify-example/verify.php?token=$token";
    $mail->Subject = 'Verify your email address';
    $mail->Body = "Click the link to verify your email: <a href='$verificationLink'>$verificationLink</a>";

    $mail->send();
    echo "Verification email sent!";
  } catch (Exception $e) {
    echo "Error sending email: {$mail->ErrorInfo}";
  }
}
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Sign Up</title>
</head>

<body>
  <h1>Sign Up</h1>
  <form method="POST" action="">
    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>
    <button type="submit">Sign Up</button>
  </form>
</body>

</html>