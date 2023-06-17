<?php  
    
    header('Content-Type: application/json');
    
    include("../Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");
    
    
    
    
    
    $dute="SELECT * FROM `topCategories` order by id";
    
    
    if ($table_year = mysqli_query($sql,$dute)){
       $count = mysqli_num_rows($table_year);
    }
    
    
    
    //Make an array to collect the results
    $kol_soalat = array();
    for($i = 0;$i < $count;$i++) {
       //add the results to the array
        $row = mysqli_fetch_array($table_year);
        
        $dute = "SELECT * FROM `categories` where id='".$row['categoryId']."'";
        
        if ($tableCate = mysqli_query($sql,$dute)){
           $rowCate = mysqli_fetch_array($tableCate);
        }
    
        $fileUrl = $rowCate['image'];
        
        $kol_soalat[] = array(
			'id'         =>  (string)$row['categoryId'],
			'name'         =>  (string)$rowCate['name'],
			'fileUrl'         =>  (string)$fileUrl,
			'type'              => (string)$row['type']
		);
		

   }
   
   
   
   
    //print the object:
    echo json_encode($kol_soalat);
   



?>