<?php
    
    $categoryId = $_POST['id'];
    
    header('Content-Type: application/json');
    
    include("../Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");
    
    $dute="SELECT * FROM `maghazeha` where categoryId = '".$categoryId."'";
    if ($table_year = mysqli_query($sql,$dute)){
       $count = mysqli_num_rows($table_year);
    }
    
    
    
    //Make an array to collect the results
    $kol_soalat = array();
    for($i = 0;$i < $count;$i++) {
       //add the results to the array
        $row = mysqli_fetch_array($table_year);
        $kol_soalat[] = array(
			'id'         =>  (string)$row['id'],
			'type'         =>  (string)"image",
			'title'         =>  (string)$row['name'],
			'text'         =>  (string)$row['city'],
			'fileUrl'         =>  (string)$row['image'],
			'fileVideo'         =>  (string)$row['image'],
		);
		

   }
   
   
   
   
    //print the object:
    echo json_encode($kol_soalat);
   



?>