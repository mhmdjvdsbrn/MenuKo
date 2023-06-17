<title>منو کو</title>
<html lang="fa" dir="rtl">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="leaflet.css" />
	<link rel="stylesheet" href="MarkerCluster.css" />
	<link rel="stylesheet" href="MarkerCluster.Default.css" />
    <link rel="stylesheet" href="setting.css">
    <link rel="stylesheet" href="style.css?v=12345678">
    <link rel="stylesheet" href="styles.css">
    <link rel="stylesheet" href="style_index3.css">
    <link rel="stylesheet" href="print_sizes.css">

</head>
<input type="hidden" id="hiddenUploadFor" value="gallery">
<center>
<!--<div id="right">-->
<!--    <div id="container">-->
<!--        <div class="dropdown" state="close">-->
<!--            <div class="dropdown-title">-->
<!--    	        <div class="text">-->
<!--        			ایجاد منو-->
<!--    			</div>-->
<!--    			<img class="menu_icon" src="menuIcon.svg" style="height:16px;">-->
<!--            </div>-->
<!--    	</div>-->
<!--    	<div class="dropdown" state="close">-->
<!--    	    <div class="dropdown-title">-->
<!--    	        <div class="text">-->
<!--                    ایجاد دسته بندی-->
<!--    			</div>-->
<!--    			<img class="menu_icon" src="tag.svg" style="top:12px">-->
<!--    	    </div>-->
<!--    	</div>-->
<!--    	<div class="dropdown" state="close">-->
<!--    	    <div class="dropdown-title">-->
<!--    	        <div class="text">-->
<!--                     دریافت بارکد-->
<!--    			</div>-->
<!--    			<img class="menu_icon" src="license.svg" style="top: 11px;">-->
<!--    	    </div>-->
    		
<!--    	</div>-->
<!--    	<div style="height:10px"></div>-->
<!--    </div>-->
<!--</div>-->
<div id="notification">
	<div class="text"></div>
</div>
<div id="darkness"></div>
<div class="alertDialog default_empty_alertDialog" id="gallery_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="raste_manage_alertDialog"></div>
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
                	    <img src="rotate.svg">
                	    <div class="btn_effect" style="height: 0px;"></div>
                	</div>
                	<div class="linker btn btn_control_img rotate-cw">
                	    <img src="rotate.svg" style="transform:rotateY(180deg);">
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
    	<div class="select_box_jensiat" id="select_box_raste" style="width:320px;">
    		<select class="select_jensiat" id="loadinfo_select_raste">
    		    <option selected="" value="1604327940000">523234 | خرده فروشی پوشاک زنانه</option><option value="1604327977000">523222 | خرده فروشی پوشاک مردانه</option><option value="1604327995000">523236 | خرده فروشی روپوش و مانتو</option><option value="1604328025000">523241 | خرده فروشی پوشاک نوزاد و بچگانه</option><option value="1604328054000">523817 | خرده فروشی لباس های ورزشی</option><option value="1604328081000">523233 | خرده فروشی مقنعه و روسری</option>
    		</select>
        </div>
    	<textarea class='txt' style="width: 320px;height:100px;text-align: right;direction: rtl;resize: none;" id='txt_add_mohtava_mahsol' placeholder="محتویات ..."></textarea>
    	<input type="text" pattern="\d*" class='txt number-separator' style="width: 320px;" id='txt_add_mablagh_mahsol' placeholder="قیمت">
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
			منو کو
		</div>
	</div>
	
	<div style="display:inline-flex;direction:rtl">
		
		
		<a href="#">
			<div class="home_top">
				<div class="text">
				    منو
				</div>
			</div>
		</a>
			
		<div class="home_top" id="linker_raste_manage">
			<div class="text">
				دسته بندی
			</div>
		</div>
		
		<a href="#aboutUs">
			<div class="home_top">
				<div class="text">
					دریافت بارکد
				</div>
			</div>
		</a>
		
		<a href="#workWithUs">	
			<div class="home_top">
				<div class="text">
					اطلاعات
				</div>
			</div>
		</a>
		
	</div>
</div>


<div class="home" style="width:100%;float: left;margin-top:30;padding:10px;">
    
	<div class="linker panel_maghaze_btn" id="add_img_gallery">
			<div class="text">
				افزودن غذا
			</div>
		</div>


	<div id="asli_main_score" style="width:100%;height:auto">
	
			
		<div id="asli_main_score_scroll" style="width:calc(100% - 30px);">
		
			<div style="margin-top:20px;"></div>
	
			<div class="ticket_box_score">
			
				<img src="food2.jpg" width="40%" height="auto">
			
				<div class="bottom_ticket_box_score">
					
					<div class="text" style="font-weight: bold;font-size: 14pt;">
						پیتزا سبزیجات
					</div>
					
					<div class="text">
						گندم، گوشت گوساله ربش ریش شده، با تزیین کنجد، دارچین و روغن، سرویس اضافه به انتخاب شماگندم، گوشت گوساله ربش ریش شده، با تزیین کنجد، دارچین و روغن، سرویس اضافه به انتخاب شما
					</div>
					
					<div class="text" style="bottom: 10px;border-radius: 4px;position: absolute;left: 10px;font-weight: bold;font-size: 12pt;display: flex;float: left;margin-left: 5px;background:#d1ffe1;padding:4px 6px;border-radius:4px;">
						3.200.000
						
											
						<div class="text" style="position:relative;left:-1px;margin-top:1px;font-size:10pt;">
							تومان
						</div>
						
					</div>
				</div>	
			
			</div>
			
			<div class="ticket_box_score">
			
				<img src="food2.jpg" width="40%" height="auto">
			
				<div class="bottom_ticket_box_score">
					
					<div class="text" style="font-weight: bold;font-size: 14pt;">
						پیتزا سبزیجات
					</div>
					
					<div class="text">
						گندم، گوشت گوساله ربش ریش شده، با تزیین کنجد، دارچین و روغن، سرویس اضافه به انتخاب شما
					</div>
					
					<div class="text" style="bottom: 10px;border-radius: 4px;position: absolute;left: 10px;font-weight: bold;font-size: 12pt;display: flex;float: left;margin-left: 5px;background:#d1ffe1;padding:4px 6px;border-radius:4px;">
						3.200.000
						
											
						<div class="text" style="position:relative;left:-1px;margin-top:1px;font-size:10pt;">
							تومان
						</div>
						
					</div>
				</div>	
			
			</div>
			
			<div class="ticket_box_score">
			
				<img src="food2.jpg" width="40%" height="auto">
			
				<div class="bottom_ticket_box_score">
					
					<div class="text" style="font-weight: bold;font-size: 14pt;">
						پیتزا سبزیجات
					</div>
					
					<div class="text">
						گندم، گوشت گوساله ربش ریش شده، با تزیین کنجد، دارچین و روغن، سرویس اضافه به انتخاب شما
					</div>
					
					<div class="text" style="bottom: 10px;border-radius: 4px;position: absolute;left: 10px;font-weight: bold;font-size: 12pt;display: flex;float: left;margin-left: 5px;background:#d1ffe1;padding:4px 6px;border-radius:4px;">
						3.200.000
						
											
						<div class="text" style="position:relative;left:-1px;margin-top:1px;font-size:10pt;">
							تومان
						</div>
						
					</div>
				</div>	
			
			</div>
			
			<div class="ticket_box_score">
			
				<img src="food2.jpg" width="40%" height="auto">
			
				<div class="bottom_ticket_box_score">
					
					<div class="text" style="font-weight: bold;font-size: 14pt;">
						پیتزا سبزیجات
					</div>
					
					<div class="text">
						گندم، گوشت گوساله ربش ریش شده، با تزیین کنجد، دارچین و روغن، سرویس اضافه به انتخاب شما
					</div>
					
					<div class="text" style="font-weight: bold;font-size: 12pt;display: flex;float: left;margin-left: 5px;background:#d1ffe1;padding:6px;border-radius:4px;">
						3.200.000
						
											
						<div class="text" style="position:relative;left:-1px;margin-top:1px;font-size:10pt;">
							تومان
						</div>
						
					</div>
				</div>	
			
			</div>
			
			

			<div class="ticket_box_score">
			
				<img src="food2.jpg" width="40%" height="auto">
			
				<div class="bottom_ticket_box_score">
					
					<div class="text" style="font-weight: bold;font-size: 14pt;">
						پیتزا سبزیجات
					</div>
					
					<div class="text">
						گندم، گوشت گوساله ربش ریش شده، با تزیین کنجد، دارچین و روغن، سرویس اضافه به انتخاب شما
					</div>
					
					<div class="text" style="font-weight: bold;font-size: 12pt;display: flex;float: left;margin-left: 5px;background:#d1ffe1;padding:6px;border-radius:4px;">
						3.200.000
						
											
						<div class="text" style="position:relative;left:-1px;margin-top:1px;font-size:10pt;">
							تومان
						</div>
						
					</div>
				</div>	
			
			</div>
			
			<div class="ticket_box_score">
			
				<img src="food2.jpg" width="40%" height="auto">
			
				<div class="bottom_ticket_box_score">
					
					<div class="text" style="font-weight: bold;font-size: 14pt;">
						پیتزا سبزیجات
					</div>
					
					<div class="text">
						گندم، گوشت گوساله ربش ریش شده، با تزیین کنجد، دارچین و روغن، سرویس اضافه به انتخاب شما
					</div>
					
					<div class="text" style="font-weight: bold;font-size: 12pt;display: flex;float: left;margin-left: 5px;background:#d1ffe1;padding:6px;border-radius:4px;">
						3.200.000
						
											
						<div class="text" style="position:relative;left:-1px;margin-top:1px;font-size:10pt;">
							تومان
						</div>
						
					</div>
				</div>	
			
			</div>
			
			<div class="ticket_box_score">
			
				<img src="food2.jpg" width="40%" height="auto">
			
				<div class="bottom_ticket_box_score">
					
					<div class="text" style="font-weight: bold;font-size: 14pt;">
						پیتزا سبزیجات
					</div>
					
					<div class="text">
						گندم، گوشت گوساله ربش ریش شده، با تزیین کنجد، دارچین و روغن، سرویس اضافه به انتخاب شما
					</div>
					
					<div class="text" style="font-weight: bold;font-size: 12pt;display: flex;float: left;margin-left: 5px;background:#d1ffe1;padding:6px;border-radius:4px;">
						3.200.000
						
											
						<div class="text" style="position:relative;left:-1px;margin-top:1px;font-size:10pt;">
							تومان
						</div>
						
					</div>
				</div>	
			
			</div>
			
			<div class="ticket_box_score">
			
				<img src="food2.jpg" width="40%" height="auto">
			
				<div class="bottom_ticket_box_score">
					
					<div class="text" style="font-weight: bold;font-size: 14pt;">
						پیتزا سبزیجات
					</div>
					
					<div class="text">
						گندم، گوشت گوساله ربش ریش شده، با تزیین کنجد، دارچین و روغن، سرویس اضافه به انتخاب شما
					</div>
					
					<div class="text" style="font-weight: bold;font-size: 12pt;display: flex;float: left;margin-left: 5px;background:#d1ffe1;padding:6px;border-radius:4px;">
						3.200.000
						
											
						<div class="text" style="position:relative;left:-1px;margin-top:1px;font-size:10pt;">
							تومان
						</div>
						
					</div>
				</div>	
			
			</div>
			
			<div class="ticket_box_score">
			
				<img src="food2.jpg" width="40%" height="auto">
			
				<div class="bottom_ticket_box_score">
					
					<div class="text" style="font-weight: bold;font-size: 14pt;">
						پیتزا سبزیجات
					</div>
					
					<div class="text">
						گندم، گوشت گوساله ربش ریش شده، با تزیین کنجد، دارچین و روغن، سرویس اضافه به انتخاب شما
					</div>
					
					<div class="text" style="font-weight: bold;font-size: 12pt;display: flex;float: left;margin-left: 5px;background:#d1ffe1;padding:6px;border-radius:4px;">
						3.200.000
						
											
						<div class="text" style="position:relative;left:-1px;margin-top:1px;font-size:10pt;">
							تومان
						</div>
						
					</div>
				</div>	
			
			</div>
			
		</div>

	</div>

</div>


<script src="jquery.min.js"></script>
<script src="jquery.cropit.js"></script>
<script src="homejs.js"></script>
<script src="test.js"></script>
<script src="canvasjs.min.js"></script>
<script src="jQuery.print.js"></script>
