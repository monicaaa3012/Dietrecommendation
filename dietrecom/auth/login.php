<?php
include '../helpers/connection.php';

try {
    if (isset($_POST["email"], $_POST["password"])) {
        $email = $_POST["email"];
        $password = $_POST["password"];

        $sql = "SELECT * FROM users WHERE email = '$email'";
        $result = mysqli_query($con, $sql);

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

        if ($count === 0) {
            echo json_encode(
                array(
                    "success" => false,
                    "message" => "User not registered"
                )
            );
            die();
        }

        $user = mysqli_fetch_assoc($result);
        $hashedPassword = $user["password"];

        $isPasswordCorrect = password_verify($password, $hashedPassword);

        if (!$isPasswordCorrect) {
            echo json_encode(
                array(
                    "success" => false,
                    "message" => "Incorrect password"
                )
            );
            die();
        }

        $token = bin2hex(random_bytes(32));
        $user_id = $user['user_id'];

        $sql = "INSERT INTO access_tokens (token, user_id) VALUES ('$token','$user_id')";
        $result = mysqli_query($con, $sql);

        if (!$result) {
            echo json_encode(
                array(
                    "success" => false,
                    "message" => "Failed to login",
                )
            );
            die();
        }

        // Include additional user data in the response
        $responseData = array(
            "user_id" => $user['user_id'],
            "full_name" => $user['full_name'],
            "email" => $user['email'],
            "role" => $user['role'],
            "height" => $user['height'] ?? null,
            "weight" => $user['weight'] ?? null,
            "sex" => $user['sex'] ?? null,
            "age" => $user['age'] ?? null,
            "activity_level" => $user['activity_level'] ?? null,
            "goal" => $user['goal'] ?? null
        );

        echo json_encode(
            array(
                "success" => true,
                "message" => "Login successfully!",
                "token" => $token,
                "user" => $responseData
            )
        );
    } else {
        echo json_encode(
            array(
                "success" => false,
                "message" => "email and password are required"
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
