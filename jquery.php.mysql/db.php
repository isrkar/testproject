<?php

define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PWD','');
define('DB_DB','test');


$db=new mysqli(DB_HOST, DB_USER, DB_PWD, DB_DB);

if(mysqli_connect_errno()){
    echo mysqli_connect_error();
}