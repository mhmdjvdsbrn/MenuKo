<?php
    
    
    
    $type = $_POST['dataType'];
    $city = $_POST['city'];
    $category_id = $_POST['category_id'];
    header('Content-Type: application/json');
    
    include("../Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");
    
    
    if($type == "makan")
        $dute="SELECT * FROM `maghazeha` where city = '".$city."' and categoryId = '".$category_id."'";
    
    
    if($type == "mohtava"){

        $dute = "select i.* from `posts` i join `categoryAssign` p on i.id=p.idMohtava where i.city = '".$city."' and p.idCategory = '".$category_id."'";
    }
        
    
    
    
    if ($table_year = mysqli_query($sql,$dute)){
       $count = mysqli_num_rows($table_year);
    }
    
    

    
    //Make an array to collect the results
    $kol_soalat = array();
    for($i = 0;$i < $count;$i++) {
       //add the results to the array
        $row = mysqli_fetch_array($table_year);
        
        if($type == "makan"){
            $image = $row['image'];
        }
        else{
            $image = $row['file'];
        }
            
            
        $text = "آدرس:";
        $text .= $row['address'];
        $text .= "\n";
        
        $text .= "شماره تماس:";
        $text .= $row['number'];
        
        
        $kol_soalat[] = array(
			'id'         =>  (string)$row['id'],
			'type'         =>  (string)"image",
			'title'         =>  (string)$row['name'],
			'text'         =>  (string)$text,
			'fileUrl'         =>  (string)$image,
			'fileVideo'         =>  (string)$row['video'],
		);
		

   }
   
   
   
    //print the object:
    echo json_encode($kol_soalat);
    
    
    
    
    
    
//     $state = "1";
//     $status = "ok";
//     $text = "1";
//     $type = "video";
//     $fileUrl = "https://espsemnan.ir/galleryImages/1675501221.jpeg";
    
    
//     $kol_soalat = array(
// 		'state'         =>  (string)$state,
// 		'status'         =>  (string)$status,
// 		'type'        => (string)$type,
// 		'text'         =>  (string)$text,
// 		'fileUrl'         =>  (string)$fileUrl,
// 	);
	
	
// 	$type = "image";
//     $kol_soalat2 = array(
// 		'state'         =>  (string)$state,
// 		'status'         =>  (string)$status,
// 		'type'        => (string)$type,
// 		'text'         =>  (string)$text,
// 		'fileUrl'         =>  (string)$fileUrl,
// 	);
	
	
	
	
//     $kol_soalat = array($kol_soalat,$kol_soalat);

// 	$jsone = json_encode($kol_soalat);

//     echo $jsone;


?>