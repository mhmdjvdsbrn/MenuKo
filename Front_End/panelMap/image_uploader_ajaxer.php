<?php

   
    include("Connections/sql.php");
    include("jdf.php");
    
    mysqli_select_db($sql,"menukoir_map");
    
	
    $token = $_POST['token'];
    $uploadFor = $_POST['uploadFor'];
    $arrData = $_POST['arrData'];
    
    
    if($uploadFor == "makan"){
        
        
        
        $name = $arrData[0];
        $city = $arrData[1];
        
	    $category = $arrData[2];
	    $idCategory = $arrData[3];
        $number = $arrData[4];
        
        $matn = $arrData[5];
        
        $address = $arrData[6];
        $lat = $arrData[7];
        $lang = $arrData[8];
        
        
        
        
    }
    else if($uploadFor == "mohtava"){
        
        
        $title = $arrData[0];
	    $matn = $arrData[1];
	    $city = $arrData[2];
	    $arrayCategories = $arrData[3];
	    
        
    }
    else if($uploadFor == "gallery"){
        
        $id = $arrData[0];
        
    }
    else if($uploadFor == "categoryIcon"){
        
        $id = $arrData[0];
        $typeCategory = $arrData[1];
        
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


    if($uploadFor == 'makan'){
	        
        $fileLoc = "./galleryImages/".$time.".{$type}";
    	    
	}
	elseif($uploadFor == 'mohtava'){
	    
	    
	    $fileLoc = "./mohtavaImages/".$time.".{$type}";
	  
	}
	elseif($uploadFor == 'gallery'){
	    
	    $fileLoc = "./galleryImages/".$time.".{$type}";
	  
	}
	elseif($uploadFor == 'categoryIcon'){
	    
	    $fileLoc = "./categoryImages/".$time.".{$type}";
	    
	}

	if (file_put_contents($fileLoc, $data) === FALSE) {
		echo "مشکلی در ثبت تصویر پیش آمد";
	}
	else{
	    
	   // compressImage($fileLoc,$fileLoc,10);
	    
	    // inja age vase javad sabt shod bego sabt shod moafaghiat amiz
	    
	    if($uploadFor == 'makan'){
	        
	       // $path = "https://menuko.ir/panelMap/makanImages/".$time.".{$type}";
	        $path = "https://menuko.ir/panelMap/galleryImages/".$time.".{$type}";
            	        
            	        
            $dute_user ="INSERT INTO `maghazeha`(`name`,`city`, `categoryId`, `image`, `number`,`text`,`address`, `lat`, `lang`) VALUES ('".$name."','".$city."','".$idCategory."','".$path."','".$number."','".$matn."','".$address."','".$lat."','".$lang."')";
            
            
    	    
    	    
    	    $type = "image";
    	    $date = jstrftime('%Y/%m/%d');
            $time = jdate('H:i:s');
            
           
            if($tableAll = mysqli_query($sql,$dute_user)){
                echo 'مکان با موفقیت اضافه شد';
            }
            else{
                echo 'مشکلی در ثبت مکان';
            }
            
            
            $maxId = 0;
	        
	        $dute_user ="SELECT * FROM `maghazeha`";
	        
            if($tableCounter = mysqli_query($sql,$dute_user)){
                $counter = mysqli_num_rows($tableCounter);
                
                for($i = 0;$i < $counter;$i++){
                    $row = mysqli_fetch_array($tableCounter);
                    
                    
                    if($row['id'] > $maxId)
                        $maxId = $row['id'];
                }
                
            }
            
             
    	    $max = 1;
            $dute_user ="INSERT INTO `galleryPage`(`idMakan`, `tartib`, `url`) VALUES ('".$maxId."','".$max."','".$path."')";
            
            
            if(mysqli_query($sql,$dute_user)){
                // echo 'تصویر با موفقیت اضافه شد';
            }
            else{
                // echo 'مشکلی در ثبت تصویر';
            }

    	}
    	elseif($uploadFor == 'mohtava'){
    	    
    	    
    	    $path = "https://menuko.ir/panelMap/mohtavaImages/".$time.".{$type}";
    	    
    	    $type = "image";
    	    $date = jstrftime('%Y/%m/%d');
            $time = jdate('H:i:s');
            $idCategory = "null";
	        
    	    $dute_user ="INSERT INTO `posts`(`city`, `categoryId`, `type`, `date`, `time`, `title`, `text`, `file`) VALUES ('".$city."','".$idCategory."','".$type."','".$date."','".$time."','".$title."','".$matn."','".$path."')";
            
            
            
            
            $dute_user ="INSERT INTO `posts`(`city`, `categoryId`, `type`, `date`, `time`, `title`, `text`, `file`) VALUES ('".$city."','".$idCategory."','".$type."','".$date."','".$time."','".$title."','".$matn."','".$path."')";
            
            if($tableAll = mysqli_query($sql,$dute_user)){
                echo 'محتوا با موفقیت اضافه شد';
            }
            else{
                echo 'مشکلی در ثبت محتوا';
            }
    	    
    	    
    	    
    	    $maxId = 0;
	        
	        $dute_user = "SELECT * FROM `posts`";
	        
            if($tableCounter = mysqli_query($sql,$dute_user)){
                $counter = mysqli_num_rows($tableCounter);
                
                for($i = 0;$i < $counter;$i++){
                    $row = mysqli_fetch_array($tableCounter);
                    
                    
                    if($row['id'] > $maxId)
                        $maxId = $row['id'];
                }
                
            }
            
            foreach ($arrayCategories as $value) {
            
                $dute_user ="INSERT INTO `categoryAssign`(`idMohtava`, `idCategory`) VALUES ('".$maxId."','".$value."')";
                if(mysqli_query($sql,$dute_user)){
                    // echo 'محتوا با موفقیت اضافه شد';
                }
            
            }
            
            
            
            
            
            
            
    	}
    	elseif($uploadFor == 'gallery'){
    	    
    	        	    
    	    $path = "https://menuko.ir/panelMap/galleryImages/".$time.".{$type}";
    	    
    	    $type = "image";
    	    $date = jstrftime('%Y/%m/%d');
            $time = jdate('H:i:s');
            
            $max = 0;
	        
	        $dute_user ="SELECT * FROM `galleryPage` WHERE idMakan='".$id."'";
	        
            if($tableCounter = mysqli_query($sql,$dute_user)){
                echo "counter".$counter = mysqli_num_rows($tableCounter);
                
                for($i = 0;$i < $counter;$i++){
                    $row = mysqli_fetch_array($tableCounter);
                    
                    echo "<br>";
                    echo "tartib".$row['tartib'];
                    echo "<br>";
                    
                    if($row['tartib'] > $max)
                        $max = $row['tartib'];
                }
                
                $max++;
                
            }
    	    
            $dute_user ="INSERT INTO `galleryPage`(`idMakan`, `tartib`, `url`) VALUES ('".$id."','".$max."','".$path."')";
            
            
            if($tableAll = mysqli_query($sql,$dute_user)){
                echo 'تصویر با موفقیت اضافه شد';
            }
            else{
                echo 'مشکلی در ثبت تصویر';
            }
    	    
    	    
    	    
    	    
    	}
    	elseif($uploadFor == 'categoryIcon'){
    	    
    	    $path = "https://menuko.ir/panelMap/categoryImages/".$time.".{$type}";
    	    
    	    $date = jstrftime('%Y/%m/%d');
    	    
    	    if($typeCategory == "makan"){
    	        
    	        $dute_user ="UPDATE `categories` SET `image`='$path' WHERE id = '$id'";
    	    }
    	    else{
    	        $dute_user ="UPDATE `mohtava_categories` SET `image`='$path' WHERE id = '$id'";
    	    }
    	    
    	    echo $dute_user;
    	    
    	    if($tableAll = mysqli_query($sql,$dute_user)){
                echo 'تصویر با موفقیت ویرایش شد';
            }
            else{
                echo 'مشکلی در ثبت تصویر';
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
        
    
        $url = 'https://menuko.ir:7000/api/owner/';
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
        
    
        $url = 'https://menuko.ir:7000/api/product/create';
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