<?php
    
    
    $type = $_POST['dataType'];
    $city = $_POST['city'];
            
    
    header('Content-Type: application/json');
    
    include("../Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");
    
    if($type == "makan")
        $dute="SELECT * FROM `categories` order by sort";
    
    
    if($type == "mohtava")
        $dute="SELECT * FROM `mohtava_categories`";
    
    
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
			'name'         =>  (string)$row['name'],
			'fileUrl'         =>  (string)$row['image'],
			'type'              => (string)$type
		);
		

   }
   
   
   
   
    //print the object:
    echo json_encode($kol_soalat);
   



?>