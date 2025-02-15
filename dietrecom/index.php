<?php
include 'helpers/connection.php';



if (!$con) {
    echo "Connection failed";
} else {
    echo "Connection successful";
}