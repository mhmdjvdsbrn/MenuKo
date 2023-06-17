<?php
    
    function httpPost2($url,$token){
        $headers = array(
            "Content-Type: application/json",
            "Authorization: Bearer $token",
        );
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "DELETE");
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
    
    $token = $_POST['token'];
    $id = $_POST['id'];
    

    $url = 'http://menuko.ir:7000/api/category/'.$id.'/';
    $response = httpPost2($url,$token);
    $response2 = json_decode($response, TRUE);
    
    if($response2 == ""){
        // handle response
        echo "دسته بندی با موفقیت حذف شد";
    }
    else{
        echo "خطا در حذف دسته بندی";
    }
    
?>