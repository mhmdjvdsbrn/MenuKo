<?php

    $boolCheck = false;

    function httpPost2($url,$token){
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
    
    $token = $_POST['token'];

    $url = 'http://menuko.ir:7000/api/category/';
    $response = httpPost2($url,$token);
    $response2 = json_decode($response, TRUE);
    
    $countCategories = count($response2);
    
    if($countCategories > 0)
        $boolCheck = true;
    else{
        $boolCheck = false;
        echo "0";
    }
    
    if($boolCheck){
        
        for($i = 0;$i < $countCategories;$i++){
            
            echo "<option value='".$response2[$i]['id']."'>".$response2[$i]['category_name']."</option>";
        }
    }
?>
