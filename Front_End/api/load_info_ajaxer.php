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


<center>
	<div class="text">
	<br>
	اطلاعات مغازه خود را وارد نمایید
	</div>
	<br>
	<input value="<?php echo $name?>" class="txt" style="width: 320px;" id="txt_name_maghaze" placeholder="نام مغازه">
	<input value="<?php echo $phone?>" type="text" pattern="\d*" class="txt" style="width: 320px;" id="txt_number_maghaze" placeholder="شماره تلفن مغازه">
	<textarea class="txt" style="width: 320px;height:100px;text-align: right;direction: rtl;resize: none;" id="txt_address_maghaze" placeholder="آدرس ..."><?php echo $address?></textarea>
	<div class="row_upload">
	    
	        <div class="text" style="margin: 13px;">
	            تصویر بنر خود را آپلود کنید
	        </div>
	        
	        
	        <div style="position:absolute;left:5px;top:5px;display:inline-flex;">
	        
    	    
        	    <div class="btn btn_submit" onclick="edame_upload_banner()" style="margin-top: 5px;">
        			<div class="btn_effect"></div>
        			<div class="text" style="position:relative;z-index:2;">آپلود</div>
        		</div>
        		
        		<!--<div style="display:inline-flex;direction:ltr;">-->
        		<!--    <img style="width: 26px;margin-top: 4px;" onclick="delCategory('1','پیتزا امریکایی')" class="icons" src="../delete_disabled.svg">				 	-->
        		<!--</div>-->
    		</div>
		
		</div>
	    
	</div>
	
	<div class="row_upload">
	    
	        <div class="text" style="margin: 13px;">
	            تصویر لوگو خود را آپلود کنید
	        </div>
	        
	        
	        <div style="position:absolute;left:5px;top:5px;display:inline-flex;">
	        
    	    
        	    <div class="btn btn_submit" onclick="edame_upload_logo()" style="margin-top: 5px;">
        			<div class="btn_effect"></div>
        			<div class="text" style="position:relative;z-index:2;">آپلود</div>
        		</div>
        		
        		<!--<div style="display:inline-flex;direction:ltr;">-->
        		<!--    <img style="width: 26px;margin-top: 4px;" onclick="delCategory('1','پیتزا امریکایی')" class="icons" src="../delete_disabled.svg">				 	-->
        		<!--</div>-->
    		</div>
		
		</div>
	    
	</div>
	
	<br>
	<div dir="ltr" style="display:inline-flex">
		<div class="btn btn_submit" onclick="submit_info()">
			<div class="btn_effect"></div>
			<div class="text" style="position:relative;z-index:2">ثبت</div>
		</div>
		<div class="btn btn_deny" onclick="deny_edit_info()">
			<div class="btn_effect"></div>
			<div class="text" style="position:relative;z-index:2">بستن</div>
		</div>
	</div>
</center>