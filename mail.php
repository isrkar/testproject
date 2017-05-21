<?php

include "db.php";


$email = $db->real_escape_string($_POST['email']);


if (!filter_var($email, FILTER_VALIDATE_EMAIL)) echo json_encode(['status' => 'error', 'status_text' => 'Неверный адрес почты!']);
else {
    $query = 'SELECT COUNT(*) AS emails FROM `email` WHERE `email`="' . $email . '";';

    if ($result = $db->query($query)->fetch_assoc()) {
        if ($result['emails'] != 0) {
            echo json_encode(['status' => 'error', 'status_text' => 'Такой email уже зарегистрирован в базе']);
        } else {
            $query = 'INSERT INTO `email`(`email`) VALUES("' . $email . '");';
            $db->query($query);
            echo json_encode(['status' => 'success', 'status_text' => 'Успех! Email сохранен в базу успешно!']);
        }
    }
}