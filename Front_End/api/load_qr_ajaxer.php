<?php

    $token = $_POST['token'];

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
    
    
    $url = 'http://menuko.ir:7000/api/owner/';
    $response = httpPost2($url,$token);
    $response2 = json_decode($response, TRUE);
    
    $imagePath = $response2['barcode'];

?>


<br>
<center>
    
    <img class="img_qrcode" src="<?php echo $imagePath?>">
    
    <div class="linker panel_maghaze_btn" id="download_qr_img">
		<div class="text">
			دانلود تصویر بارکد
		</div>
	</div>


</center>