<?php

    $token = $_POST['token'];
    $id = $_POST['id'];
    $title = $_POST['title'];
    $categoryId = $_POST['categoryId'];
    $ingredients = $_POST['ingredients'];
    $price = $_POST['price'];
    
    function httpPost2($url,$data,$token){
        $headers = array(
            "Content-Type: application/json",
            "Authorization: Bearer $token",
        );
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

        
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
    
    if($token!=""){
        
        $boolCheck = false;
        
            
        $title = $_POST['title'];
        $categoryId = $_POST['categoryId'];
        $categoryName = $_POST['categoryName'];
        $ingredients = $_POST['ingredients'];
        $price = $_POST['price'];
        
        
        $price = str_replace(",","",$price);
            
	        
        $arrCategory = array(
          'id'=> $categoryId,
          'category_name'=> $categoryName
        );
        
        $data = array(
          'title'=> $title,
          'price'=> $price,
          'ingredients'=> $ingredients,
          'category'=> $arrCategory
        );
	        
        
        
        $data = json_encode($data);
    
        $url = 'http://menuko.ir:7000/api/product/'.$id."/";
        $response = httpPost2($url,$data,$token);
        $response2 = json_decode($response, TRUE);
        
        if($response2['id'] != ""){
            $boolCheck = true;
            echo "اطلاعات جدید ثبت شد";
        }
        else{
            $boolCheck = false;
            echo "مشکل در ثبت اطلاعات";
        }
    }
    else{
        echo "مشکلی در ارسال اطلاعات";
    }
?>
