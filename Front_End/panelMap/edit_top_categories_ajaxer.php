<?php
    header('Content-Type: text/html; charset=utf-8');

    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");
    

    $id = $_POST['id'];
    $categoryId = $_POST['categoryId'];
    $type = $_POST['type'];
                
                
    $dute = "UPDATE `topCategories` SET `type`='".$type."',`categoryId`='".$categoryId."' WHERE id='".$id."'";

    if($table = mysqli_query($sql,$dute)){
        echo "تغییرات ثبت شد";
    }
    else{
        echo "مشکلی در ثبت پیش آمد"; 
    }

?>