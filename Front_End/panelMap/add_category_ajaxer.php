<?php

    $category_name = $_POST['categoryTitle'];
    
    
    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");
    

    $dute_exist ="SELECT * FROM `categories` WHERE `name` = '".$category_name."'";
    
    if($result = mysqli_query($sql,$dute_exist)){
        $count = mysqli_num_rows($result);
    }
    
    
    
    if($count == 0){
        
        
        $dute = "INSERT INTO `categories`(`name`) VALUES ('".$category_name."')";
        
        if(mysqli_query($sql,$dute)){
            $boolCheck = true;
            echo "دسته بندی اضافه شد";
        }
        else{
            echo "مشکل در ثبت دسته بندی";
        }
    }
    else{
        echo "عنوان دسته بندی تکراری است";
    }
?>
