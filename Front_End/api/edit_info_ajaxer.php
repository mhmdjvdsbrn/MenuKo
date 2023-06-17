<?php

    $token = $_POST['token'];
    $name = $_POST['name'];
    $address = $_POST['address'];
    $number = $_POST['number'];
    
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
        
        
        
        
        $data = array(
          'name_store'=> $name,
          'address'=> $address,
          'phone_store'=> $number
        );
        
        
        $data = json_encode($data);
    
        $url = 'http://menuko.ir:7000/api/owner/';
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
