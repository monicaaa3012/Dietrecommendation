<?php
include '../helpers/connection.php';

try {
    if (isset(
        $_POST["fullName"],
        $_POST["email"],
        $_POST["password"],
    )) {
        $fullName = $_POST["fullName"];
        $email = $_POST["email"];
        $password = $_POST["password"];


        $sql = "select * from users where email = '$email'";
        $result =  mysqli_query($con, $sql);


        if (!$result) {
            echo json_encode(
                array(
                    "success" => false,
                    "message" => "Failed to check if email exists"
                )
            );
            die();
        }

        $count = mysqli_num_rows($result);

        if ($count > 0) {
            echo json_encode(
                array(
                    "success" => false,
                    "message" => "Email already exists"
                )
            );
            die();
        }

        $encryptedPassword = password_hash($password, PASSWORD_DEFAULT);


        $sql = "insert into users (full_name, email, password,role) values ('$fullName', '$email', '$encryptedPassword','user')";
        $result =  mysqli_query($con, $sql);

        if (!$result) {
            echo json_encode(
                array(
                    "success" => false,
                    "message" => "Failed to register"
                )
            );
            die();
        }

        echo json_encode(
            array(
                "success" => true,
                "message" => "User registered successfully"
            )
        );
    } else {

        echo json_encode(
            array(
                "success" => false,
                "message" => "fullName, email and password are required"
            )
        );
    }
} catch (\Throwable $th) {
    echo json_encode(
        array(
            "success" => false,
            "message" => $th->getMessage()
        )
    );
}