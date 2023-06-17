<?php
    
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
    
    echo $token = $_POST['token'];

    $url = 'http://menuko.ir:7000/api/owner/';
    $response = httpPost2($url,$token);
    $response2 = json_decode($response, TRUE);
    
    if($boolCheck)
        if($response2['id'] != "")
            $boolCheck = true;
        else{
            $boolCheck = false;
            echo "0";
        }
    
    if($boolCheck)
        print_r ($response);
    
    
    
?>
