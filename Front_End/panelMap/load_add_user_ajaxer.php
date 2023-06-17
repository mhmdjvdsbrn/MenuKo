<?php


    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");

    $dute_exist ="SELECT * FROM `categories`";
    
    if($table = mysqli_query($sql,$dute_exist)){
        $count = mysqli_num_rows($table);
    }
    
    
?>
<center>
	<div class="text">
	<br>
	اطلاعات مکان را وارد نمایید
	</div>
	<br>
	<input class="txt" style="width: 320px;" id="txt_add_name_mahsol" placeholder="نام مکان">
	<div class="select_box_jensiat" id="select_box_raste" style="width:320px;padding-top: 1px;">
		<select class="select_jensiat" id="add_product_select_category">
		    
		    <?php
                
                    for($i = 0;$i < $count;$i++){
                        
                        $row = mysqli_fetch_array($table);
                            
                        echo "<option value='".$row['id']."'>".$row['name']."</option>";
                    }
            ?>
	    </select>
    </div>
    <div class="select_box_jensiat" id="select_box_raste" style="width:320px;padding-top: 1px;">
		<select class="select_jensiat" id="add_product_select_city">
		    
		    <option value='semnan'>سمنان</option>
		    <option value='shahrood'>شاهرود</option>
		    <option value='mayamey'>میامی</option>
		    <option value='mehdishahr'>مهدی شهر</option>
		    <option value='damghan'>دامغان</option>
		    <option value='sorkhe'>سرخه</option>
		    <option value='aradan'>آرادان</option>
		    <option value='garmsar'>گرمسار</option>
		    
	    </select>
    </div>
    <textarea class="txt" style="width: 320px;height:100px;text-align: right;direction: rtl;resize: none;" id="txt_add_maghaze_matn" placeholder="متن ..."></textarea>
    <input class="txt" style="width: 320px;" id="txt_add_number" placeholder="شماره مکان">
    <input class="txt" style="width: 320px;" id="add_txt_holder_mapAddress" placeholder="آدرس مکان">
	<br>
	<div dir="ltr" style="display:inline-flex">
		<div class="btn btn_submit" onclick="edame_add_gallery()">
			<div class="btn_effect"></div>
			<div class="text" style="position:relative;z-index:2">ادامه</div>
		</div>
		<div class="btn btn_deny" onclick="deny_add_pic()">
			<div class="btn_effect"></div>
			<div class="text" style="position:relative;z-index:2">لغو</div>
		</div>
	</div>
</center>
<input type="hidden" id="add_txt_holder_lat"/>
<input type="hidden" id="add_txt_holder_lang"/>