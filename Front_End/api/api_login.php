<?php
    
    $username = $_POST['username'];
    $password = $_POST['password'];
    $boolCheck = false;

    

    $data = array(
      'username'=> $username,
      'password'=> $password
    );
    
    function httpPost($url, $data,$token){
        $curl = curl_init($url);
        curl_setopt($curl, CURLOPT_POST, true);
        curl_setopt($curl, CURLOPT_POSTFIELDS, http_build_query($data));
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($curl);
        curl_close($curl);
        return $response;
    }
    



    $url = 'http://menuko.ir:7000/auth/jwt/create';

    
    $response = httpPost($url,$data,"");
    
    $response = json_decode($response, TRUE);

    if($response['access'] != "")
        // print_r ($response);
        $boolCheck = true;
    else
        echo "0";
        
        
    $authorization = $response['access'];
    print_r ($authorization);
    

?>
