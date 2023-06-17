<?php


    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");

    $dute_exist ="SELECT * FROM `categories`";
    
    if($table = mysqli_query($sql,$dute_exist)){
        
    }
    
    $type = $_POST['type'];
    
    if($type == 'makan'){
				            
        $dute_exist ="SELECT * FROM `categories`";
    
        if($table = mysqli_query($sql,$dute_exist)){
            $count = mysqli_num_rows($table);
        }

    }
    else{
        		            
        $dute_exist ="SELECT * FROM `mohtava_categories`";
    
        if($table = mysqli_query($sql,$dute_exist)){
            $count = mysqli_num_rows($table);
        }
    }

    
    
?>
<center>
	<div class="text">
	<br>
	دسته بندی مورد نظر را انتخاب نمایید
	</div>
	<br>
	<div class="select_box_jensiat" id="select_box_raste" style="width:320px;padding-top: 1px;">
		<select class="select_jensiat" id="edit_top_select_category">
		    
		    <?php
                
                    for($i = 0;$i < $count;$i++){
                        
                        $row = mysqli_fetch_array($table);
                            
                        echo "<option value='".$row['id']."'>".$row['name']."</option>";
                    }
            ?>
	    </select>
    </div>
    
	<br>
	<div dir="ltr" style="display:inline-flex">
		<div class="btn btn_submit" onclick="editTopCategory()">
			<div class="btn_effect"></div>
			<div class="text" style="position:relative;z-index:2">ثبت</div>
		</div>
		<div class="btn btn_deny" onclick="notif_alert_manager(manageCategoriesAlert,'1','','ویرایش دسته بندی لغو شد');">
			<div class="btn_effect"></div>
			<div class="text" style="position:relative;z-index:2">لغو</div>
		</div>
	</div>
</center>
<input type="hidden" id="edit_top_type_category" value="<?php echo $type?>"/>