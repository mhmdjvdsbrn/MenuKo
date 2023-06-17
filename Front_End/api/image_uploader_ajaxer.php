<?php
	
    $id = $_POST['id'];
    $token = $_POST['token'];
    $uploadFor = $_POST['uploadFor'];
    $arrData = $_POST['arrData'];
    
    
    if($uploadFor == "menu"){
        
        $name = $arrData[0];
	    $category = $arrData[1];
	    $idCategory = $arrData[2];
	    
        $mablagh = $arrData[3];
        $mablagh = str_replace(",","",$mablagh);
        $mohtava = $arrData[4];
        
        
        
        
    }
    else if($uploadFor == "banner"){
        
        
        $name = $arrData[0];
	    $number = $arrData[1];
	    $address = $arrData[2];
        
    }
    else if($uploadFor == "logo"){
        
        $name = $arrData[0];
	    $number = $arrData[1];
	    $address = $arrData[2];
        
    }
    		    

    
	$data = $_POST['imageData'];
	
	
	if (preg_match('/^data:image\/(\w+);base64,/', $data, $type)) {
		$data = substr($data, strpos($data, ',') + 1);
		$type = strtolower($type[1]); // jpg, png, gif

		if (!in_array($type, [ 'jpg', 'jpeg', 'gif', 'png' ])) {
			throw new \Exception('invalid image type');
		}

		$data = base64_decode($data);

		if ($data === false) {
			throw new \Exception('base64_decode failed');
		}
	} else {
		throw new \Exception('did not match data URI with image data');
	}

    $time = time();
    $picId = $time;


    if($uploadFor == 'menu'){
	        
        $fileLoc = "../media/images/".$id."/".$time.".{$type}";
    	    
	}
	elseif($uploadFor == 'banner'){
	    
	    $fileLoc = "../media/images/".$id."/"."banner".".{$type}";
	  
	}
	elseif($uploadFor == 'logo'){
	    
	    $fileLoc = "../media/images/".$id."/"."logo".".{$type}";
	  
	}

	if (file_put_contents($fileLoc, $data) === FALSE) {
		echo "مشکلی در ثبت تصویر پیش آمد";
	}
	else{
	    
	    compressImage($fileLoc,$fileLoc,10);
	    
	    // inja age vase javad sabt shod bego sabt shod moafaghiat amiz
	    
	    if($uploadFor == 'menu'){
	        
	        $path = "/media/images/".$id."/".$time.".{$type}";
    	        
    	        
            $arrCategory = array(
              'id'=> $idCategory,
              'category_name'=> $category
            );
            
            $data = array(
              'title'=> $name,
              'price'=> $mablagh,
              'ingredients'=> $mohtava,
              'category'=> $arrCategory,
              'image'=> $path,
            );
    	        
            
            $data = json_encode($data);
    	    
    	    ProductCreate($data,$token);
            
    	}
    	elseif($uploadFor == 'banner'){
    	    
    	    
    	    $path = "/media/images/".$id."/"."banner".".{$type}";
	        
            $data = array(
              'banner_image'=> $path,
            );
            
            $data = json_encode($data);
    	    
	        
    	    if(updateInfo($data,$token)){
    	        echo "تصویر بنر با موفقیت ثبت شد";
    	    }
    	    else{
    	        echo "مشکل در ثبت اطلاعات";
    	    }
    	    
    	    
            
    	}
    	elseif($uploadFor == 'logo'){
    	    
    	    
    	    $path = "/media/images/".$id."/"."logo".".{$type}";
	        
            $data = array(
              'profile_image'=> $path,
            );
            
            $data = json_encode($data);
    	    
    	    if(updateInfo($data,$token)){
    	        echo "تصویر لوگو با موفقیت ثبت شد";
    	    }
    	    else{
    	        echo "مشکل در ثبت اطلاعات";
    	    }
    	    
    	    
    	    
    	}
    	
    	
	}



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
    
    
    function httpPUT($url,$data,$token){
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
    
    
    
    function updateInfo($data,$token){
        
    
        $url = 'http://menuko.ir:7000/api/owner/';
        $response = httpPUT($url,$data,$token);
        $response2 = json_decode($response, TRUE);
        
        
        if($response2['id'] != ""){
            $boolCheck = true;
            return true;
        }
        else{
            $boolCheck = false;
            return false;
        }
    }
    

    function ProductCreate($data,$token){
        
    
        $url = 'http://menuko.ir:7000/api/product/create';
        $response = httpPost2($url,$data,$token);
        $response2 = json_decode($response, TRUE);
        
        
        if($response2['id'] != ""){
            $boolCheck = true;
            echo "محصول با موفقیت شد";
        }
        else{
            $boolCheck = false;
            echo "مشکل در ثبت محصول ";
        }
    }
    
    
    
    // Compress image
    function compressImage($source, $destination, $quality) {
    
      $info = getimagesize($source);
    
      if ($info['mime'] == 'image/jpeg') 
        $image = imagecreatefromjpeg($source);
    
      elseif ($info['mime'] == 'image/gif') 
        $image = imagecreatefromgif($source);
    
      elseif ($info['mime'] == 'image/png') 
        $image = imagecreatefrompng($source);
    
      imagejpeg($image, $destination, $quality);
    
    }
    



?>