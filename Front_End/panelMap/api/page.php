<?php
    
    $type = $_POST['dataType'];
    $id = $_POST['id'];
    
    header('Content-Type: application/json');
    
    include("../Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");
    
    
    if($type == "makan")
        $dute = "SELECT * FROM `maghazeha` where id = '".$id."'";
    
    
    if($type == "mohtava")
        $dute="SELECT * FROM `posts` where id = '".$id."'";
    
    
    if ($table_year = mysqli_query($sql,$dute)){
       $count = mysqli_num_rows($table_year);
    }
    
    
    if($type == "makan"){
        $duteGallery = "SELECT * FROM `galleryPage` WHERE `idMakan` = '".$id."'";
        
        if ($table_gallery = mysqli_query($sql,$duteGallery)){
            $countGallery = mysqli_num_rows($table_gallery);
        }
        
        
        //Make an array to collect the results
        $kol_gallery = array();
        for($i = 0;$i < $countGallery;$i++) {
          //add the results to the array
            $row_gallery = mysqli_fetch_array($table_gallery);
            $kol_gallery[] = array(
    			'url' =>  (string)$row_gallery['url']
    		);
    	}
    }
    else{
        $kol_gallery[] = array(
			'url' =>  (string)$row_gallery['url']
		);
    }
	
	
	$gallery = json_encode($kol_gallery);
// 	$gallery = substr($gallery, 1, strlen($gallery) - 2);
//     $gallery = "{".$gallery."}";
	
    
    //Make an array to collect the results
    $kol_soalat = array();
    for($i = 0;$i < $count;$i++) {
       //add the results to the array
        $row = mysqli_fetch_array($table_year);
        
        if($type == "mohtava"){
            $gallery = '[{"url":"'.$row['file'].'"}]';
            $name = $row['title'];
        }
        else{
            $name = $row['name'];
        }
        
        
        $kol_soalat[] = array(
			'id'         =>  (string)$row['id'],
			'type'         =>  (string)"image",
			'title'         =>  (string)$name,
			'gallery'         =>  (string)$gallery,
			'fileUrl'         =>  (string)$row['image'],
			'fileVideo'         =>  (string)$row['video'],
			'address'         =>  (string)$row['address'],
			'number'         =>  (string)$row['number'],
		);
		

   }
   
   
   
   
   
    //print the object:
    echo json_encode($kol_soalat);
   



?>