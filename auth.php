<?php
// api/auth.php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Max-Age: 3600");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

include_once '../config/database.php';

$database = new Database();
$db = $database->getConnection();

// Get posted data
$data = json_decode(file_get_contents("php://input"));

// Registration endpoint
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'register') {
    if (
        !empty($data->name) &&
        !empty($data->email) &&
        !empty($data->password) &&
        !empty($data->department)
    ) {
        // Validate email format
        if (!preg_match('/^[0-9]{7}@ub\.edu\.ph$/', $data->email)) {
            http_response_code(400);
            echo json_encode(array("error" => "Invalid UBMail format"));
            exit();
        }

        // Validate password
        if (!preg_match('/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/', $data->password)) {
            http_response_code(400);
            echo json_encode(array("error" => "Password must be at least 8 characters with uppercase, lowercase, and number"));
            exit();
        }

        try {
            // Check if email already exists
            $check_query = "SELECT id FROM users WHERE email = ?";
            $check_stmt = $db->prepare($check_query);
            $check_stmt->execute([$data->email]);

            if ($check_stmt->rowCount() > 0) {
                http_response_code(400);
                echo json_encode(array("error" => "Email already exists"));
                exit();
            }

            // Insert new user
            $query = "INSERT INTO users (name, email, password, department) VALUES (?, ?, ?, ?)";
            $stmt = $db->prepare($query);
            $hashed_password = password_hash($data->password, PASSWORD_DEFAULT);
            
            if ($stmt->execute([
                $data->name,
                $data->email,
                $hashed_password,
                $data->department
            ])) {
                http_response_code(201);
                echo json_encode(array("message" => "Registration successful"));
            } else {
                throw new Exception("Registration failed");
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("error" => "Server error: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Missing required fields"));
    }
}

// Login endpoint
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_GET['action']) && $_GET['action'] === 'login') {
    if (!empty($data->email) && !empty($data->password)) {
        try {
            $query = "SELECT id, email, password FROM users WHERE email = ?";
            $stmt = $db->prepare($query);
            $stmt->execute([$data->email]);

            if ($stmt->rowCount() > 0) {
                $row = $stmt->fetch(PDO::FETCH_ASSOC);
                
                if (password_verify($data->password, $row['password'])) {
                    http_response_code(200);
                    echo json_encode(array(
                        "message" => "Login successful",
                        "user_id" => $row['id']
                    ));
                } else {
                    http_response_code(401);
                    echo json_encode(array("error" => "Invalid credentials"));
                }
            } else {
                http_response_code(401);
                echo json_encode(array("error" => "Invalid credentials"));
            }
        } catch (Exception $e) {
            http_response_code(500);
            echo json_encode(array("error" => "Server error: " . $e->getMessage()));
        }
    } else {
        http_response_code(400);
        echo json_encode(array("error" => "Missing email or password"));
    }
}
?>