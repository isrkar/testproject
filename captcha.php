<?php
$captcha = "";
if (isset($_POST["g-recaptcha-response"]))
    $captcha = $_POST["g-recaptcha-response"];

if (!$captcha)
    echo "not ok";
$secret = "6LdqUyIUAAAAAMWGt7h0m39x9eeKvpLeutUjAnYX";
$response = json_decode(file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret=".$secret."&response=".$captcha."&remoteip=".$_SERVER["REMOTE_ADDR"]), true);

if ($response["success"] != false) {
    echo "ok";
} else {
    echo "not ok";
}
?>