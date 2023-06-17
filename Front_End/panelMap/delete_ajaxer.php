<?php
    header('Content-Type: text/html; charset=utf-8');

    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");
    
    
    $id = $_POST['id'];
    
    $dute_user = "DELETE FROM `maghazeha` WHERE id = '".$id."'";
    
    
    if(mysqli_query($sql,$dute_user)){
	    echo "مکان با موفقیت حذف شد";
    }else{
        echo "مشکلی در حذف پیش آمد";
    }

?>