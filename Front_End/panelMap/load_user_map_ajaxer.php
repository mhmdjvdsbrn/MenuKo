<?php

    $id = $_POST['id'];
    $year = $_POST['tb_year'];
    $table_name_user = "usersInfo_".$year;
    
    include("../Connections/sql.php");
    
    
    if($id != ''){
        
        mysqli_select_db($sql,"espsemna_manage");
    
        $dute_user ="SELECT * FROM `".$table_name_user."` WHERE id = '".$id."'";
        
        if($result = mysqli_query($sql,$dute_user)){
            $row = mysqli_fetch_array($result);
        }
        
        $lat = $row['userLat'];
        $lang = $row['userLang'];
        $mapAddress = $row['title'];
        
        
    }
    else{
                	
        $lat = '35.583010';
        $lang = '53.388148';
        $mapAddress = 'نامشخص';
        
    }
    
    
    
?>

<div style="height:10px"></div>
<center>
    <div class="map" id="userMap" style="direction: ltr;width: 1050px; height: 420px;position:relative"></div>

    <div id="manage_part" style="display:inline-flex;margin-top:5px;" dir="rtl">
            
        <div class="btn btn_deny" id="denyMap" onclick="notif_alert_manager('','1','','پنجره نقشه بسته شد');">
        	<div class="btn_effect"></div>
        	<div class="text" style="position:relative;z-index:2">
        		بستن
        	</div>
        </div>
        <div class="btn submit_edit" id="submitMap" onclick="<?php echo "editMap('".$id."','".$lat."','".$lang."','edit')"?>">
        	<div class="btn_effect"></div>
        	<div class="text" style="position:relative;z-index:2">
        		ویرایش
        	</div>
        </div>
    </div>
</center>

<input type="hidden" id="userMapAddress" value="<?php echo $mapAddress?>">
<input type="hidden" id="userLat" value="<?php echo $lat?>">
<input type="hidden" id="userLang" value="<?php echo $lang?>">
