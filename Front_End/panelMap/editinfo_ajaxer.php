<?php
    header('Content-Type: text/html; charset=utf-8');

    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");
    
    
    $id = $_POST['id'];
    $text = $_POST['text'];
    $name = $_POST['name'];
    $address = $_POST['address'];
    $numPhone = $_POST['numPhone'];
    $address = $_POST['address'];
    $categoryId = $_POST['categoryId'];
    $city = $_POST['city'];
    
    
    $dute_user = "UPDATE `maghazeha` SET `name`='$name',`city`='$city',`categoryId`='$categoryId',`number`='$numPhone',`text`='$text',`address`='$address' WHERE id = '".$id."'";
    
    if(mysqli_query($sql,$dute_user)){
        $state = 1;
	    $matn = "تغییرات ثبت شد";
    }
    else{
        $state = 1;
        $matn = "مشکلی در ثبت پیش آمد"; 
    }

    
    $tempArr = array($state,$matn);
    
    echo json_encode($tempArr, JSON_NUMERIC_CHECK);


?>