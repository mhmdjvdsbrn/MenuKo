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
    
    $token = $_POST['token'];

    $url = 'http://menuko.ir:7000/api/owner/';
    $response = httpPost2($url,$token);
    $response2 = json_decode($response, TRUE);
    
    if($response2['id'] != ""){
        
        $name = $response2['name_store'];
        $phone = $response2['phone_store'];
        $address = $response2['address'];
        
        
        
    }
    
?>


<div class="text" style="font-size: 20px;font-weight: bold;">
    <?php echo $name?>
</div> 
<div class="text" style="font-size: 16px;">
    شماره تلفن : <?php echo $phone?>
</div> 
<div class="text" style="font-size: 14px;">
    <?php echo $address?>
</div> 
