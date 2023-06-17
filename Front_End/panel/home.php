<?php 

    $token = $_POST['data'];
    if($token == ""){
        echo'<script>location.href="index.php";</script>';
    }
    
    echo "<input type='hidden' id='tokenHolder' value='".$token."'>";

    // $name_store = $data['name_store'];
    
    $boolCheck = false;

    function httpPost2($url,$token){
        $headers = array(
            "Content-Type: application/json",
            "Authorization: Bearer $token",
        );
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_HTTPHEADER, $headers );
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

    $url = 'http://menuko.ir:7000/api/category/';
    $response = httpPost2($url,$token);
    $response2 = json_decode($response, TRUE);
    
    $countCategories = count($response2);
    
    if($countCategories > 0)
        $boolCheck = true;
    else{
        $boolCheck = false;
    }
    
    $url = 'http://menuko.ir:7000/api/owner/';
    $response = httpPost2($url,$token);
    $response3 = json_decode($response, TRUE);
    
    if($response3['id'] != ""){
        
        $name = $response3['name_store'];
        $phone = $response3['phone_store'];
        $address = $response3['address'];
        
        $pathBanner = $response3['banner_image'];
        $pathLogo = $response3['profile_image'];
        
        
        $id = $response3['id'];
        
        
        
    }
    
    
?>

<title>منو کو</title>
<html lang="fa" dir="rtl">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="../setting.css">
    <link rel="stylesheet" href="../style.css?v=12345678">
    <link rel="stylesheet" href="../styles.css">
    <link rel="stylesheet" href="../style_index3.css">
    <link rel="stylesheet" href="../print_sizes.css">

</head>
<input type="hidden" id="hiddenUploadFor" value="menu">
<input type="hidden" id="idHolder" value="<?php echo $id?>">

<center>
<div id="notification">
	<div class="text"></div>
</div>
<div id="darkness"></div>
<div class="alertDialog default_empty_alertDialog" id="gallery_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="info_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="qr_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="raste_manage_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="delete_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="delete_category_alertDialog"></div>
<div class="alertDialog" id="edit_alertDialog">
    
    <center>
    	<div class="text">
    	<br>
    	ویرایش اطلاعات محصول 
    	<div id="title_mahsol_name">
    	    
    	</div>
    	</div>
    	<br>
    	<input class="txt" id="txt_edit_id" type="hidden">
    	<input class="txt" id="txt_edit_id_category" type="hidden">
    	<input class="txt" style="width: 320px;" id="txt_edit_title" placeholder="نام غذا">
    	<div class="select_box_jensiat" id="select_box_raste" style="width:320px;padding-top: 1px;" autocomplete="off">
    		<select class="select_jensiat" id="txt_edit_category">
	
    		<?php 
    		    if($boolCheck){
        
                    for($i = 0;$i < $countCategories;$i++){
                        
                        
                        echo '<option value="'.$response2[$i]['id'].'">'.$response2[$i]['category_name']."</option>";
                        
                        
                    }
                }
    		
    		
    		
    		?>
    		
    		</select>
    		
    		
    		
        </div>
    	<textarea class="txt" style="width: 320px;height:100px;text-align: right;direction: rtl;resize: none;" id="txt_edit_ingredients" placeholder="محتویات ..."></textarea>
    	<input type="text" pattern="\d*" class="txt number-separator" style="width: 320px;" id="txt_edit_price" placeholder="قیمت (بر حسب تومان)">
    	<br>
    	<div dir="ltr" style="display:inline-flex">
    		<div class="btn btn_submit" onclick="submit_editProductInfo()">
    			<div class="btn_effect"></div>
    			<div class="text" style="position:relative;z-index:2">ویرایش</div>
    		</div>
    		<div class="btn btn_deny" onclick="notif_alert_manager('','1','','ویرایش محصول لغو شد')">
    			<div class="btn_effect"></div>
    			<div class="text" style="position:relative;z-index:2">لغو</div>
    		</div>
    	</div>
    </center>
</div>
<div class="alertDialog" id="add_raste_alertDialog">
    <div id=add_raste_wtiter">
        
        <input type="hidden" id="txt_parvane_type_pay">
        
        <div class="custom_br"></div>
        
        <center>
            
            <div class="pay_cadr" style="height:60px">
                <div class="text" style="display: table-cell; vertical-align: middle;">
                    عنوان دسته بندی جدید را جهت افزودن وارد کنید
                </div>
            </div>
            
            <div class="pay_cadr" style="height:110px;border-top:none">
                
                <div style="height:20px;"></div>
                
	            <div style="display:inline-flex;direction:rtl;margin-top:15px">
    	            
                	<input class="pay_txt" id="txt_add_category" style="width:200px" placeholder="عنوان دسته بندی">

            	</div>
            	            
            </div>
            
            <div dir="ltr" style="display:inline-flex">
            	<div class="btn btn_submit" onclick="add_category()">
            		<div class="btn_effect"></div>
            		<div class="text" style="position:relative;z-index:2">ثبت</div>
            	</div>
            	<div class="btn btn_deny" onclick="notif_alert_manager(raste_manage,'1','','افزودن دسته بندی لغو شد')">
            		<div class="btn_effect" style="height: 0px;"></div>
            		<div class="text" style="position:relative;z-index:2">لفو</div>
            	</div>
            </div>
        </center>
    </div>
</div>
<div class="alertDialog" id="imgUpload_alertDialog">
    <center>
	<div class="image-editor">
        <input type="file" id="selectedFile" class="cropit-image-input" style="display:none">
        
        <div style="width: auto;height: 200px;position:relative;margin-top:15px;">
            <div class="cropit-preview"></div>
        </div>
        <div style="display:inline-flex;margin-top:10px">
            <div class="text" style="font-size:10pt">
                آپلود شده:
            </div>
            <div id="gallery_box_progress" style=>
                <div id="gallery_progress_liner">
                
                </div>
            </div>
            
        </div>
        
        <div id="box_modify_img">	  
        
            <div style="direction:rtl;margin-top:8px;">
                <div class="linker btn btn_img_uploders" onclick="document.getElementById('selectedFile').click();">
            	    <div class="text">
            		    انتخاب عکس
            	    </div>
            	    <div class="btn_effect" style="height: 0px;"></div>
            	</div>
                <br>
            
            	<div style="display:inline-flex;direction:ltr;margin-top: 3px;">
            	    <div style="display:inline-flex;margin-top:3px;">		  
                		<input type="range" id="zommer_range_input" class="cropit-image-zoom-input">
                		<div class="text text_controler">
                			زوم کردن
                		</div>
                	</div>
                </div>
                <br><br>
                <div style="display:inline-flex;direction:ltr;margin-top: 3px;">
                	<div class="linker btn btn_control_img rotate-ccw">
                	    <img src="../rotate.svg">
                	    <div class="btn_effect" style="height: 0px;"></div>
                	</div>
                	<div class="linker btn btn_control_img rotate-cw">
                	    <img src="../rotate.svg" style="transform:rotateY(180deg);">
                	    <div class="btn_effect" style="height: 0px;"></div>
                	</div>
                	<div class="text text_controler" style="margin-top:3px;margin-left:5px">
            		    چرخش
            	    </div>
                </div>
            </div>	
        </div>
        
        
        
        <div style="display:inline-flex;margin-top:25px" dir="rtl">
            
            <div class="btn btn_deny" onclick="deny_upload()" style="width: auto;">
            	<div class="btn_effect" style="height: 0px;"></div>
            	<div class="text" style="position:relative;z-index:2">
            		لغو و بازگشت
            	</div>
            </div>
            
            <div id="writer_export_disable">
                <div class="btn export btn_img_uploders" style="background:var(--sabz-color);">
                    <div class="text">
                	    اضافه کردن به منو
                    </div>
                    <div class="btn_effect" style="height: 0px;"></div>
                </div>
            </div>
        </div>
    </div>
    
    </center>
</div>
<div class="alertDialog" id="get_field_gallery_alertDialog">
    <center>
    	<div class='text'>
    	<br>
    	اطلاعات محصول را وارد نمایید
    	</div>
    	<br>
    	<input class='txt' style="width: 320px;" id='txt_add_name_mahsol' placeholder="نام غذا">
    	<div class="select_box_jensiat" id="select_box_raste" style="width:320px;padding-top: 1px;">
    		<select class="select_jensiat" id="add_product_select_category"></select>
        </div>
    	<textarea class='txt' style="width: 320px;height:100px;text-align: right;direction: rtl;resize: none;" id='txt_add_mohtava_mahsol' placeholder="محتویات ..."></textarea>
    	<input type="text" pattern="\d*" class='txt number-separator' style="width: 320px;" id='txt_add_mablagh_mahsol' placeholder="قیمت (بر حسب تومان)">
    	<br>
    	<div dir='ltr' style='display:inline-flex'>
    		<div class='btn btn_submit' onclick='edame_add_gallery()'>
    			<div class='btn_effect'></div>
    			<div class='text' style='position:relative;z-index:2'>ادامه</div>
    		</div>
    		<div class='btn btn_deny' onclick='deny_add_pic()'>
    			<div class='btn_effect'></div>
    			<div class='text'  style='position:relative;z-index:2'>لغو</div>
    		</div>
    	</div>
    </center>
</div>

<div class="top">
	
	<div style="width:310px;position:absolute;top:-1px;right:15px;">
		<div class="text" style="color:white;font-size:12pt;margin-top:8px;float:right;">
			<?php echo $name_store?>
		</div>
	</div>
	
	<div style="display:inline-flex;direction:rtl">
	
	
		
		<div class="home_top" id="linker_info">
			<div class="text">
				اطلاعات
			</div>
		</div>
		
			
		<div class="home_top" id="linker_raste_manage">
			<div class="text">
				دسته بندی
			</div>
		</div>
		
		
		<div class="home_top" id="linker_qr_manage">
			<div class="text">
				دریافت بارکد
			</div>
		</div>
		
		
	</div>
</div>

<div class="home" style="    width: 100%;
    display: inline-flex;
    height: 200px;
    overflow: hidden;
    position: absolute;
    top: 34px;
    right: 0;
    z-index: 6;">
    
    <!--$fileBanner = "";-->
    
    <?php
        if($pathBanner != ""){
            echo '<img id="img_banner" src="https://menuko.ir/.'.$pathBanner.'" style="width:100%;min-height: 200px;height:fit-content;">';
        }
        else{
            
        }
    
    ?>
    
    

</div>
<div class="home" style="    width: 100%;
    display: inline-flex;
    height: 140px;
    position: absolute;
    top: 234px;
    right: 0;
    z-index: 10;">
    
    <!--$fileBanner = "";-->
    
    <div style="    position: absolute;
    left: 15px;
    width: 100px;
    height: 100px;
    top: -70px;
    border: 3px solid #dddddd;
    box-shadow:rgb(58 61 66 / 6%) 0px 1px 0px, rgb(0 0 0 / 30%) 0px 8px 32px -16px;
    border-radius: 20px;
    overflow: hidden;">
        
                
        <?php
            if($pathLogo != ""){
                echo '<img id="img_logo" src="https://menuko.ir/'.$pathLogo.'" style="width:100%;width:100%;">';
            }
            else{
                echo '<img id="img_logo" src="https://menuko.ir/defaultLogo.jpg" style="width:100%;width:100%;">';
            }
        
        ?>
        
        
        
        
    </div>
    
    <div style="width:100%;">
        <div style="width: 95%;background: #fdfdfd;box-shadow:0px 0px 7px -5px black;border-radius: 20px;margin: 12px;text-align: right;">
            <div id="box_info" style="width: fit-content;padding:10px;border-radius: 50px;margin: 12px;margin-right: 40;text-align: right;">
                <div class="text" style="font-size: 20px;font-weight: bold;">
                    <?php echo $name?>
                </div> 
                <div class="text" style="font-size: 16px;">
                    شماره تلفن : <?php echo $phone?>
                </div> 
                <div class="text" style="font-size: 14px;">
                    <?php echo $address?>
                </div>  
            </div>
        </div>
    </div>

</div>
<div class="home" id="category_box" style="top: 380px;">
    
    <?php
    
        if($boolCheck){
        
            for($i = 0;$i < $countCategories;$i++){
                echo '<div class="category" id="btnCategory'.$i.'" onclick="scrollToDiv('."'".$i."'".')"><div class="text">'.$response2[$i]['category_name']."</div></div>";
            }
        }
    
    ?>

</div>


<div class="home" style="width:100%;float: left;padding:10px;margin-top: 390px;">
    
	<div class="linker panel_maghaze_btn" id="add_img_gallery">
			<div class="text">
				افزودن غذا
			</div>
		</div>


	<div id="asli_main_score" style="width:100%;height:auto"></div>

</div>



<script src="../jquery.min.js"></script>
<script src="../jquery.cropit.js"></script>
<script src="../homejs.js"></script>
<script src="../test.js?v=1"></script>
<script src="paneljs.js?v=1.1"></script>
<script src="../canvasjs.min.js"></script>
<script src="../jQuery.print.js"></script>