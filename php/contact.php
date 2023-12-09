<?
// ---------------------------- Configuration -------------------------- //
$adminemail="example@gmail.com";  // your e-mail
//---------------------------------------------------------------------- //

// Clean Form
function clean($value = "") {
    $value = trim($value);
    $value = stripslashes($value);
    $value = strip_tags($value);
    $value = htmlspecialchars($value);

    return $value;
}

// Validation
function check_length($value = "", $min, $max) {
    $result = (mb_strlen($value) < $min || mb_strlen($value) > $max);

    return !$result;
}

if($_SERVER['REQUEST_METHOD'] == 'POST') {
	$name = $_POST['name'];
	$title = $_POST['title'];
	$email = $_POST['email'];
	$message = $_POST['message'];
	$name = clean($name);
	$title = clean($title);
	$email = clean($email);
	$message = clean($message);

    // This message will come to your mail
    $msg="
    Name: $name
    Title: $title
    E-mail: $email
    Message: $message
    ";

    $msg = clean($msg);

	if(!empty($name) && !empty($title) && !empty($email) && !empty($message)) {
	    $email_validate = filter_var($email, FILTER_VALIDATE_EMAIL);

	    if(check_length($name, 2, 25) && check_length($title, 2, 50) && check_length($message, 2, 1000) && $email_validate) {
            mail("$adminemail", "$name", "$msg");
	        echo "<p class='mnt-6 mb-25'>Message sent</p>";
	    } else {
	        echo "<p class='mnt-6 mb-25'>The data you entered is incorrect</p>";
	    }
	} else {
	    echo "<p class='mnt-6 mb-25'>Fill in the blank fields</p>";
	}
} else {
	header("Location: ../index.php");
}
?>
