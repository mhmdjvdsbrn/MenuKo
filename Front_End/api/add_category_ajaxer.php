<?php

    $token = $_POST['token'];
    $category_name = $_POST['categoryTitle'];
    
    if($category_name != "" AND $token!=""){
        
        $boolCheck = false;
        $exist = false;
        
        function httpPost3($url,$token){
            $headers = array(
                "Content-Type: application/json",
                "Authorization: Bearer $token",
            );
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers );
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
            $response = curl_exec($ch);
            curl_close($ch);
            return $response;
        }
    
        $url = 'http://menuko.ir:7000/api/category/';
        $response = httpPost3($url,$token);
        $response2 = json_decode($response, TRUE);
        
        $countCategories = count($response2);
        
        if($countCategories > 0){
            for($i = 0;$i < $countCategories;$i++){
                
                if($response2[$i]['category_name'] == $category_name)
                    $exist = true; 
                
            }
        }
        
        
        
        
        $data = array(
          'category_name'=> $category_name
        );
        
        
        $data = json_encode($data);
    
    
        function httpPost2($url,$data,$token){
            
    
            
            
            $headers = array(
                "Content-Type: application/json",
                "Authorization: Bearer $token",
            );
            $ch = curl_init($url);
            curl_setopt($ch, CURLOPT_POST, true);
            curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
            curl_setopt($ch, CURLOPT_HTTPHEADER, $headers );
            curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    
            
            $response = curl_exec($ch);
            curl_close($ch);
            return $response;
        }
        
        
    
        $url = 'http://menuko.ir:7000/api/category/create';
        $response = httpPost2($url,$data,$token);
        $response2 = json_decode($response, TRUE);
        
        
        
        if($exist){
            $boolCheck = false;
            echo "عنوان دسته بندی تکراری است";
        }
        else if($response2['id'] != ""){
            $boolCheck = true;
            echo "دسته بندی اضافه شد";
        }
        else{
            $boolCheck = false;
            echo "مشکل در ثبت دسته بندی";
        }
    }
    else{
        echo "مشکلی در ارسال اطلاعات";
    }
?>
