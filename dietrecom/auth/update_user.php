<?php
include '../helpers/connection.php';

try {
    if (isset(
        $_POST["user_id"],
        $_POST["height"],
        $_POST["weight"],
        $_POST["sex"],
        $_POST["age"],
        $_POST["activity_level"],
        $_POST["goal"]
    )) {
        $user_id = $_POST["user_id"];
        $height = $_POST["height"];
        $weight = $_POST["weight"];
        $sex = $_POST["sex"];
        $age = $_POST["age"];
        $activity_level = $_POST["activity_level"];
        $goal = $_POST["goal"];

        $sql = "UPDATE users 
                SET height = '$height', weight = '$weight', sex = '$sex', 
                    age = '$age', activity_level = '$activity_level', goal = '$goal'
                WHERE user_id = '$user_id'";
        $result = mysqli_query($con, $sql);

        if (!$result) {
            echo json_encode(
                array(
                    "success" => false,
                    "message" => "Failed to update user details"
                )
            );
            die();
        }

        echo json_encode(
            array(
                "success" => true,
                "message" => "User details updated successfully"
            )
        );
    } else {
        echo json_encode(
            array(
                "success" => false,
                "message" => "All fields are required"
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
?>
