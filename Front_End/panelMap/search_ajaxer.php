<?php

    header('Content-Type: text/html; charset=utf-8');


    $a = file_get_contents('php://input');
	$data = urldecode($a);
	$b = explode("&",$a);

    foreach($b as $i =>$key) {
        
        $temp_var = explode("=",$key);
        $name_var = $temp_var[0];
        $value_var = $temp_var[1];
    
        $$name_var = urldecode($value_var);
    
    }
    
    function findcity($city){
        
        
        if($city == 'semnan'){
            $name = "سمنان";
        }
        else if($city == 'shahrood'){
            $name = "شاهرود";
        }
        else if($city == 'damghan'){
            $name = "دامغان";
        }
        else if($city == 'garmsar'){
            $name = "گرمسار";
        }
        else if($city == 'sorkhe'){
            $name = "سرخه";
        }
        else if($city == 'mehdishahr'){
            $name = "مهدی شهر";
        }
        else if($city == 'mayamay'){
            $name = "میامی";
        }
        else{
            $name = "آرادان";
        }
        
        
        
        return $name;
    }






    $pages = $page_holder - 1;
    
    
    $select_namayesh = $s_select_namayesh;
    $parvande = $s_parvande;
	$idsenfi = $s_idsenfi;
	$name = $s_name;
	$family = $s_family;
	
	
	
	$meli = $s_meli;
	$title = $s_title;
	$phone = $s_phone;
	$raste = $s_raste;
	$address = $s_address;

    $select_pardakht = $s_select_pardakht;
	$NumFish = $s_NumFish;
	$BankFish = $s_BankFish;
	$numHesab = $s_numHesab;
	$bankCheck = $s_bankCheck;
	$dateSaresid = $s_dateSarresid;
	$sahebHesab = $s_sahebHesab;
	$numSerial = $s_numSerial;
	
    $safe = false;
    include("Connections/sql.php");
    include("phpfunc.php");
    
    
    
    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");

    
    $duty_info = "SELECT * FROM `maghazeha` order by city";
    
    if ($table=mysqli_query($sql,$duty_info))  {
    	$count=mysqli_num_rows($table);
    }
    
        
    function standardVariable($str){
        
        $str = str_replace("(*)","",$str);
        $str = str_replace("'","",$str);
        
        
        return $str;
    }
    
    $family = standardVariable($family);
    
    mysqli_select_db($sql,"espsemna_manage");
    $query_baseInfo = mysqli_query($sql,"select * from baseInfo");
    $baseInfo_row = mysqli_fetch_array($query_baseInfo);
    if($saved_pass == $baseInfo_row['password']){
        $safe = true;
    }
    
    
    mysqli_select_db($sql,"espsemna_manage");
    $query_maliInfo=mysqli_query($sql,"select * from maliYear");
    $Mali_info_row = mysqli_fetch_array($query_maliInfo);
    $db_year = $Mali_info_row['year'];
    
    $emsal = false;
    
    $year = $tb_year;
    
    $table_name_info = "usersInfo_".$year;
    $table_name_payInfo = "payinfo_".$year;
    $table_name_Maliinfo = "maliInfo_".$year;
    
    if($year == $db_year){
        $emsal = true;
    }
    
    mysqli_select_db($sql,"espsemna_senf");
    
	$bool = true;
	$BLpaySearch = false;
	
	if($NumFish != '' OR $BankFish != '' OR $numHesab != '' OR $bankCheck != '' OR $dateSaresid != '' OR $sahebHesab != '' OR $numSerial != ''){
	    
        $BLpaySearch = true;
        $duty = "select DISTINCT i.* from $table_name_info i join $table_name_payInfo p on i.id=p.idPerson ";
	    
	}
	else{
	    if(!$BLpaySearch)
	        $duty = "select * from $table_name_info i ";
	}
	
	$duty = "SELECT * FROM `maghazeha` i ";

	if(!empty($name)){
	    
		if($bool){
		    $bool = false;
	    	$duty .= "WHERE i.name LIKE '".'%'.$name.'%'."'";
		}
		else{
			$duty .= " AND i.name LIKE '".'%'.$name.'%'."'";
		} 
			
	}
	
	if(!empty($select_namayesh)){
		if($bool){
			$bool = false;
			$duty .= "WHERE i.categoryId='".$select_namayesh."'";
		}
		else{
			$duty .= " AND i.categoryId='".$select_namayesh."'";
			
		}
	}
	
	if(!empty($select_pardakht)){
		if($bool){
			$bool = false;
			$duty .= "WHERE i.city='".$select_pardakht."'";
		}
		else{
			$duty .= " AND i.city='".$select_pardakht."'";
			
		}
	}
	if(!empty($family)){
		if($bool){
			$bool = false;
			$duty .= "WHERE i.family LIKE '".'%'.$family.'%'."'";
		}
		else{
			$duty .= " AND i.family LIKE '".'%'.$family.'%'."'";
		}
	}
	if(!empty($meli)){
		if($bool){
			$bool = false;
			$duty .= "WHERE i.meli LIKE '".'%'.$meli.'%'."'";
		}
		else{
			$duty .= " AND i.meli LIKE '".'%'.$meli.'%'."'";
		}
	}
	if(!empty($title)){
		if($bool){
			$bool = false;
			$duty .= "WHERE i.text LIKE '".'%'.$title.'%'."'";
		}
		else{
			$duty .= " AND i.text LIKE '".'%'.$title.'%'."'";
		}
	}
	if(!empty($phone)){
		if($bool){
			$bool = false;
			$duty .= "WHERE i.number LIKE '".'%'.$phone.'%'."'";
		}
		else{
			$duty .= " AND i.number LIKE '".'%'.$phone.'%'."'";
		}
	}
	if(!empty($idsenfi)){
	    
	    if (strpos($idsenfi, '-') !== false) {
	        
	        $idsenfi = str_replace('-','',$idsenfi);
	        
            if($bool){
    			$bool = false;
    			$duty .= "WHERE i.idsenfi='".$idsenfi."'";
    		}
    		else{
    			$duty .= " AND i.idsenfi='".$idsenfi."'";
    		}
        }
        else{
    		if($bool){
    			$bool = false;
    			$duty .= "WHERE i.idsenfi LIKE '".'%'.$idsenfi.'%'."'";
    		}
    		else{
    			$duty .= " AND i.idsenfi LIKE '".'%'.$idsenfi.'%'."'";
    		}
        }
		
	}
	if(!empty($raste)){
		if($bool){
			$bool = false;
			$duty .= "WHERE i.raste LIKE '".'%'.$raste.'%'."'";
		}
		else{
			$duty .= " AND i.raste LIKE '".'%'.$raste.'%'."'";
		}
	}
	if(!empty($address)){
		if($bool){
			$bool = false;
			$duty .= "WHERE i.address LIKE '".'%'.$address.'%'."'";
		}
		else{
			$duty .= " AND i.address LIKE '".'%'.$address.'%'."'";
		}
	}
	if(!empty($parvande)){
	    
	    if (strpos($parvande, '-') !== false) {
	        
	        $parvande = str_replace('-','',$parvande);
	        
            if($bool){
    			$bool = false;
    			$duty .= "WHERE i.id='".$parvande."'";
    		}
    		else{
    			$duty .= " AND i.id='".$parvande."'";
    		}
        }
        else{
    		if($bool){
    			$bool = false;
    			$duty .= "WHERE i.id='".$parvande."'";
    		}
    		else{
    			$duty .= " AND i.id='".$parvande."'";
    		}
        }
	}
	
	//pardakhti ha search 
	if(!empty($BankFish)){
		if($bool){
			$bool = false;
			$duty .= "WHERE p.BankFish LIKE '".'%'.$BankFish.'%'."'";
		}
		else{
			$duty .= " AND p.BankFish LIKE '".'%'.$BankFish.'%'."'";
		}
	}
	if(!empty($NumFish)){
		if($bool){
			$bool = false;
			$duty .= "WHERE p.NumFish LIKE '".'%'.$NumFish.'%'."'";
		}
		else{
			$duty .= " AND p.NumFish LIKE '".'%'.$NumFish.'%'."'";
		}
	}
	if(!empty($numHesab)){
		if($bool){
			$bool = false;
			$duty .= "WHERE p.numHesab LIKE '".'%'.$numHesab.'%'."'";
		}
		else{
			$duty .= " AND p.numHesab LIKE '".'%'.$numHesab.'%'."'";
		}
	}
	if(!empty($bankCheck)){
		if($bool){
			$bool = false;
			$duty .= "WHERE p.bankCheck LIKE '".'%'.$bankCheck.'%'."'";
		}
		else{
			$duty .= " AND p.bankCheck LIKE '".'%'.$bankCheck.'%'."'";
		}
	}
	if(!empty($dateSaresid)){
		if($bool){
			$bool = false;
			$duty .= "WHERE p.dateSaresid LIKE '".'%'.$dateSaresid.'%'."'";
		}
		else{
			$duty .= " AND p.dateSaresid LIKE '".'%'.$dateSaresid.'%'."'";
		}
	}
	if(!empty($sahebHesab)){
		if($bool){
			$bool = false;
			$duty .= "WHERE p.nameCheck LIKE '".'%'.$sahebHesab.'%'."'";
		}
		else{
			$duty .= " AND p.nameCheck LIKE '".'%'.$sahebHesab.'%'."'";
		}
	}
	if(!empty($numSerial)){
		if($bool){
			$bool = false;
			$duty .= "WHERE p.serialCheck LIKE '".'%'.$numSerial.'%'."'";
		}
		else{
			$duty .= " AND p.serialCheck LIKE '".'%'.$numSerial.'%'."'";
		}
	}
	
	
	
	// to count faal an ghfaal
	if($bool){
	    
		$dute = $duty." where i.state='1'";
        $temp=mysqli_query($sql,$dute);
        $count_faalha = mysqli_num_rows($temp);
        
        $dute = $duty." where i.state='0'";
        $temp = mysqli_query($sql,$dute);
        $count_ghfaalha = mysqli_num_rows($temp);
        
        $dute = $duty." where i.state='2'";
        $temp = mysqli_query($sql,$dute);
        $count_moalaghha = mysqli_num_rows($temp);
	}
	else{
		$dute = $duty." AND i.state='1'";
        $temp=mysqli_query($sql,$dute);
        $count_faalha = mysqli_num_rows($temp);
        
        $dute = $duty." AND i.state='0'";
        $temp=mysqli_query($sql,$dute);
        $count_ghfaalha = mysqli_num_rows($temp);
        
        $dute = $duty." AND i.state='2'";
        $temp = mysqli_query($sql,$dute);
        $count_moalaghha = mysqli_num_rows($temp);
	}
	
	
    if($tpTable = mysqli_query($sql,$duty)){
        $tp_count = mysqli_num_rows($tpTable);
        
        $counterTasvie = 0;
        $counterNotPay = 0;
        $counterAlhesab = 0;
        $counterNotBedehi = 0;
        
        for($i = 1;$i <= $tp_count;$i++){
    	    $tprow = mysqli_fetch_array($tpTable);
    	    
    	    $TasvieDute = "select * from $table_name_Maliinfo where id = '".$tprow['id']."' ";
    	    $tasvieTable = mysqli_query($sql,$TasvieDute);
    	    $TasvieRow = mysqli_fetch_array($tasvieTable);
    	    
    	    if($TasvieRow['state'] == 0){
    	        $counterNotTasvie++;
    	        
    	        $anyPayDute = "select * from $table_name_payInfo where idPerson = '".$tprow['id']."' ";
        	    $payTable = mysqli_query($sql,$anyPayDute);
        	    if($payTable = mysqli_query($sql,$anyPayDute)){
        	        
        	        $countPays = mysqli_num_rows($payTable);
            	    if($countPays == 0){
            	        $arrMali = userMaliInfo($year,$tprow['id']);
            	        if($arrMali['mande_kol'] <= 0){
            	            $counterNotBedehi++;
            	        }
            	        else{
            	            $counterNotPay++;
            	        }
            	    }
            	    else{
            	        $counterAlhesab++;
            	    }
        	    }
    	    }
    	    else{
    	        $counterTasvie++;
    	    }
        }
    }
	
	$duty .=" order by city";
// 	echo $duty;
	
	if ($table=mysqli_query($sql,$duty))  {
		$count=mysqli_num_rows($table);
		
	}
	if($count == 0){
		echo '<br><br><br><div class="text">هیچ نتیجه ای یافت نشد</div>';
	}
	
	for($i = 1;$i <= $pages*10;$i++){
        $row=mysqli_fetch_array($table);
    }
    

    if($count - $pages*10 > 10){
        $tedad = 10;
    }
    else{
        $tedad = $count - $pages*10;
    }
    
	for($i = 1;$i <= $tedad;$i++){
	    
                    
    	$row = mysqli_fetch_array($table);
    					
    					    
        $duty = "SELECT * FROM `categories` where id = '".$row['categoryId']."'";
        
        if ($tableCate = mysqli_query($sql,$duty))  {
        	$row_category = mysqli_fetch_array($tableCate);
        }
        
    	$category = $row_category['name'];
    	
    	$text = $row['text'];
    	
    	
    // 	$text = substr($text, 0, 42);  // abcd
        // $text = substr($text, strlen($text) - $index - 1, 1);
        $str = $text;
        $length = strlen($str);
        $counterSpace = 3;
        $index = $length;
        for($a = 0; $a < $length; ++$a){
            if($str[$a] == ' '){
                $counterSpace--;
                if($counterSpace == 0){
                    $index = $a;
                    break;
                }
            }
        
        }
        
        $text = substr($str, 0, $index);
        
        
        

    	$text .= "...";
    	
    
    	    
        echo '<div class="maghaze">';
    		echo '<div style="display:flex;">';
    			echo '<div class="home home1 '.$colorClass.'" title="'.$row['id'].'">';
    				echo '<div class="text notSpacingNumber">';
    					echo $row['id'];
    				echo '</div>';
    			echo '</div>';
    			echo '<div class="home home7">';
    				echo '<div class="text">';
    					echo $row['name'];
    				echo '</div>';
    			echo '</div>';
    			echo '<div class="home home5">';
    				echo '<div class="text">';
    					echo findcity($row['city']);
    					
    					
    				echo '</div>';
    			echo '</div>';
    
    			echo '<div class="home home3">';
    				echo '<div class="text notSpacingNumber">';
    					echo $category;
    				echo '</div>';
    			echo '</div>';
    			echo '<div class="home home3">';
    				echo '<div class="text notSpacingNumber">';
    					echo $row['address'];;
    				echo '</div>';
    			echo '</div>';
    			echo '<div class="home home6">';
    				echo '<div class="text notSpacingNumber">';
    					echo $row['number'];
    				echo '</div>';
    			echo '</div>';
    			echo '<div class="home home5" style="border: none;">';
    
    				echo '<div style="display:inline-flex">';
		
		    
						echo '<img class="icons edit_icon" style="width: 22px;" title="گالری" src="gallery.svg" onclick="galleryPage(';
						echo "'".$row['id']."'";
						echo ')">';
    				
    				
    					echo '<img class="icons edit_icon" title="ویرایش" src="edit.svg" onclick="edit(';
    					echo "'".$row['id']."'";
    					echo ')">';
    					
    					
    					echo '<img class="icons del_icon" title="حذف" src="delete.svg" onclick="delInfo(';
    					echo "'".$row['id']."','".$row['name']."','".$row['family']."'";
    					echo ')">';
    					
    				echo '</div>';		
    			echo '</div>';
    		echo '</div>';
    	echo '</div>';
    }
	
	$matn = '
            <input id="query_holder" value="'.$duty.'" type="hidden">
            <div class="btn" onclick="'."notif_alert_manager('','','saleMali_alertDialog','')".';">
		            <div style="display:inline-flex;">
			            <div class="text">
			                سال مالی:
    			        </div>
    			        <div class="text tedad_shower">
			                '.$year.'
    			        </div>
    			    </div>
			    </div>
			    
			    <div class="btn" onclick="natije_detail('."'all'".')">
		            <div style="display:inline-flex;">
			            <div class="text">
			                کل نتایج:
    			        </div>
    			        <div class="text tedad_shower">
			                '.$count.'
    			        </div>
    			    </div>
			    </div>
			    
			    
			    <div class="btn" onclick="natije_detail('."'faal'".')">
		            <div style="display:inline-flex;">
			            <div class="text">
			                فعال ها:
    			        </div>
    			        <div class="text tedad_shower">
			                '.$count_faalha.'
    			        </div>
    			    </div>
			    </div>
			    
			    
			    <div class="btn" onclick="natije_detail('."'ghFaal'".')">
		            <div style="display:inline-flex;">
			            <div class="text">
			                غیر فعال ها:
    			        </div>
    			        <div class="text tedad_shower">
			                '.$count_ghfaalha.'
    			        </div>
    			    </div>
			    </div>
			    
			    <div class="btn" onclick="natije_detail('."'moalagh'".')">
			            <div style="display:inline-flex;">
    			            <div class="text">
    			                معلق ها:
        			        </div>
        			        <div class="text tedad_shower">
    			                '.$count_moalaghha.'
        			        </div>
        			    </div>
    			    </div>
			    
			    
			    <div class="btn" onclick="natije_detail('."'tasvie'".')">
		            <div style="display:inline-flex;">
			            <div class="text">
			                تسویه شده ها:
    			        </div>
    			        <div class="text tedad_shower">
			                '.$counterTasvie.'
    			        </div>
    			    </div>
			    </div>
			    
			    <div class="btn" onclick="natije_detail('."'alhesab'".')">
		            <div style="display:inline-flex;">
			            <div class="text">
			                علی الحساب: 
    			        </div>
    			        <div class="text tedad_shower">
			                '.$counterAlhesab.'
    			        </div>
    			    </div>
			    </div>
			    
			    <div class="btn" onclick="natije_detail('."'notPay'".')">
		            <div style="display:inline-flex;">
			            <div class="text">
			                بدون پرداخت: 
    			        </div>
    			        <div class="text tedad_shower">
			                '.$counterNotPay.'
    			        </div>
    			    </div>
			    </div>
			    
			    <div class="btn" onclick="natije_detail('."'notBedehi'".')">
		            <div style="display:inline-flex;">
			            <div class="text">
			                فاقد بدهی:
    			        </div>
    			        <div class="text tedad_shower">
			                '.$counterNotBedehi.'
    			        </div>
    			    </div>
			    </div>';

	echo '<div id="matn_natayej" style="display:none">'.$matn.'</div>';
	echo '<input id="tedad" value="'.$count.'" type="hidden">';
?>