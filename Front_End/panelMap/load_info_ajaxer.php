<!DOCTYPE html>
<div id="print_part_loadInfo">

<center>
    
<?php
    $id = $_POST['id'];
    
    $year = $_POST['tb_year'];
    $table_name_user = "maghazeha";
    $table_name_maliInfo = "maliInfo_".$year;
    
    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");

    
    $duty_info = "SELECT * FROM `maghazeha` order by city";
    
    if ($table=mysqli_query($sql,$duty_info))  {
    	$count=mysqli_num_rows($table);
    }
    
    
    $table_name_categories = "categories";
    
    $dute = "SELECT * FROM ".$table_name_categories;
    if ($tableCategories = mysqli_query($sql,$dute)){
    	$countCategories = mysqli_num_rows($tableCategories);
    }
    
    
    $dute_user ="SELECT * FROM `".$table_name_user."` WHERE id = '".$id."'";
    $dute_mohlat ="SELECT * FROM `".$table_name_maliInfo."` WHERE id = '".$id."'";
    
    
    if($result = mysqli_query($sql,$dute_user)){
        $row = mysqli_fetch_array($result);
    }
    if($table = mysqli_query($sql,$dute_mohlat)){
        $row_mohlat = mysqli_fetch_array($table);
    }
    
    if(!empty($id)){
    
    echo '
    <div style="display:inline-flex;margin-top:20px" dir="rtl">
        <div class="edit_home">
    		<div class="text">
    			شناسه مکان
    		</div>
    		<input type="text" id="txt_numParvande" value="'.$row['id'].'" disabled>
    	</div>
    	<div class="edit_home">
    		<div class="text">
    			نام مکان
    		</div>
    		<input type="text" id="txt_name" value="'.$row['name'].'">
    	</div>
    	<div class="edit_home">
    		<div class="text">
    			تلفن همراه
    		</div>
    		<input class="notSpacingNumberInput" type="text" id="txt_numPhone" value="'.$row['number'].'">
    	</div>
    </div>
    <div style="display:inline-flex" dir="rtl">
        
    	<div class="edit_home home_raste">
    		<div class="text text_raste">
    			شهرستان
    		</div>
    		<div class="select_box_jensiat" id="select_box_raste">
        		<select class="select_jensiat" id="loadinfo_select_city">
        		    ';
        		    
        		    $arrCity = array(
                        "semnan" => "سمنان",
                        "shahrood" => "شاهرود",
                        "mayamey"   => "میامی",
                        "mehdishahr"  => "مهدی شهر",
                        "damghan" => "دامغان",
                        "sorkhe" => "سرخه",
                        "aradan" => "آرادان",
                        "garmsar" => "گرمسار"
                    );
                    
                    
                    foreach ($arrCity as $key => $value) {
		            
		                
		                $makeSelected = '';
    		            
    		            if($row['city'] == $key)
    		                $makeSelected = ' selected';        
		            
                        
                        echo "<option".$makeSelected." value='".$key."'>".$value."</option>";
                    }
        		        
        		 echo'
        		</select>
            </div>
    	</div>
    	
    </div>
    <div style="display:inline-flex" dir="rtl">
    	<div class="edit_home home_address">
    		<div class="text text_address">
    			آدرس
    		</div>
    		<input type="text" id="txt_address" value="'.$row['address'].'">
    	</div>
    	<div class="edit_home home_raste">
    		<div class="text text_raste">
    			دسته بندی
    		</div>
    		<div class="select_box_jensiat" id="select_box_raste">
        		<select class="select_jensiat" id="loadinfo_select_raste">
        		    ';
        		    
    		        for($i = 0;$i < $countCategories;$i++){
    		            
    		            $rowCategories = mysqli_fetch_array($tableCategories);
    		            
    		            $makeSelected = '';
    		            
    		            if($rowCategories['id'] == $row['categoryId'])
    		                $makeSelected = ' selected';
    		         
    		            echo "<option".$makeSelected." value='".$rowCategories['id']."'>".$rowCategories['name']."</option>";
    		        }
        		        
        		        
        		 echo'
        		</select>
            </div>
    	</div>
    </div>
    <div style="display:inline-flex" dir="rtl">
    	<div class="edit_home home_address" style="width: 1085px;height: auto;;">
    		<div class="text text_address" style="width: 1035px !important;">
    			متن
    		</div>
    		<textarea style="height:220px;width: 98%;text-align: right;resize:none" type="text" id="txt_matn">'.$row['text'].'</textarea>
    	</div>
    	
    </div>
    
    
    </div>
    </div>
    
    
    <center>
        
        <div id="manage_part" style="display:inline-flex;margin-top:0px;" dir="rtl">
            
            <div class="btn btn_deny" onclick="'."notif_alert_manager('','1','','تغییرات لغو شد');".'">
            	<div class="btn_effect"></div>
            	<div class="text" style="position:relative;z-index:2">
            		لغو
            	</div>
            </div>
            
            
            <div class="btn submit_edit">
            	<div class="btn_effect"></div>
            	<div class="text" style="position:relative;z-index:2">
            		ثبت
            	</div>
            </div>
            
            <div class="btn print_info" id="load_info_print">
            	<div class="btn_effect"></div>
            	<div class="text" style="position:relative;z-index:2">
            		چاپ
            	</div>
            </div>
        
        </div>
    </center>
    
    ';
    
    }
    
    mysqli_close($sql);
?>
</body>
</html>
