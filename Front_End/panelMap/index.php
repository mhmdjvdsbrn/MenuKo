<?php
    
    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");

    
    $duty_info = "SELECT * FROM `maghazeha` order by city";
    
    if ($table=mysqli_query($sql,$duty_info))  {
    	$count=mysqli_num_rows($table);
    }
    
    $safe = true;
    
    
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

?>


<html lang="fa" dir="rtl">
<head>
    <title>panelMap</title>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <link rel="stylesheet" href="leaflet.css" />
	<link rel="stylesheet" href="MarkerCluster.css" />
	<link rel="stylesheet" href="MarkerCluster.Default.css" />
    <link rel="stylesheet" href="setting.css">
    <link rel="stylesheet" href="styles_2.css">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="print_sizes.css">
</head>

<input type="hidden" id="hiddenTopCategory_id_holder" value="1">
<input type="hidden" id="page_holder" value="1">
<input type="hidden" id="tedad_page_holder" value="100">
<input type="hidden" name="tb_year" value="1402" class="tb_year">
<input type="hidden" id="table_holder" value="1402">
<input type="hidden" id="hiddenUploadFor" value="makan">
<input type="hidden" id="id_gallery_holder" value="1">
<input type="hidden" id="id_categoryIcon_holder" value="1">
<input type="hidden" id="type_categoryIcon_holder" value="1">

<div class="alertDialog default_empty_alertDialog" id="gallery_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="delete_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="top_categories_manage_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="manage_city_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="manage_sub_city_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="raste_manage_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="mohtava_manage_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="choose_locMap_alertDialog"></div>
<div class="alertDialog" id="get_field_add_maghaze_alertDialog"></div>
<div class="alertDialog" id="get_field_add_mohtava_alertDialog"></div>
<div class="alertDialog" id="get_field_add_mohtava_category_alertDialog"></div>
<div class="alertDialog default_empty_alertDialog" id="choose_category_alertDialog"></div>
<div class="alertDialog" id="choose_top_categories_type_alertDialog">
    <center>
        <br>
        <div class="text">
            نوع دسته بندی را انتخاب کنید
        </div>
        <div style="height:8px;"></div>
    	<div class="btn print_btn" style="height:23px !important" onclick="chooseTopCategory('makan')">
    	    <div class="text">
    	        دسته بندی مکانی
    	    </div>
    	</div>
    	<div class="btn print_btn" style="height:23px !important" onclick="chooseTopCategory('mohtava')">
    	    <div class="text">
    	        دسته بندی محتوایی
    	    </div>
    	</div>
	</center>
</div>
<div class="alertDialog" id="info_edit_alertDialog">
    <center>
        
        <div class="top_pager">
            <div id="pager_info" class="home_pager">
                <div class="text">
                    اطلاعات فرد
                </div>
            </div>
            <div id="pager_map" class="home_pager">
                <div class="text">
                    نقشه
                </div>
            </div>
        </div>
        
    </center>
    <div id="info_edit_writer"></div>
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
<div class="alertDialog" id="add_category_mohtava_alertDialog">
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
    	            
                	<input class="pay_txt" id="txt_add_category_mohtava" style="width:200px" placeholder="عنوان دسته بندی">

            	</div>
            	            
            </div>
            
            <div dir="ltr" style="display:inline-flex">
            	<div class="btn btn_submit" onclick="add_category_mohtava()">
            		<div class="btn_effect"></div>
            		<div class="text" style="position:relative;z-index:2">ثبت</div>
            	</div>
            	<div class="btn btn_deny" onclick="notif_alert_manager(category_mohtava_manage,'1','','افزودن دسته بندی لغو شد')">
            		<div class="btn_effect" style="height: 0px;"></div>
            		<div class="text" style="position:relative;z-index:2">لفو</div>
            	</div>
            </div>
        </center>
    </div>
</div>
<div id="right">
    <div id="container">
        <div class="dropdown" state="close">
    	    <div class="dropdown-title">
    	        <div class="text">
                    نقشه
    			</div>
    			<img class="menu_icon" src="mapIcon.svg" style="width:15px;">
    	    </div>
    	    <div class="menu dropdown-menu first-dropdown-menu">
    			<button class="text btn_menu" tabindex="-1" onclick="loadAllMap()">
                    نمایش نقشه
    			</button>
    		</div>
    		<div class="menu dropdown-menu first-dropdown-menu">
    			<button class="text btn_menu" tabindex="-1" onclick="ChooseMapAddress()">
                    اضافه کردن مکان
    			</button>
    		</div>
    		<div class="menu dropdown-menu first-dropdown-menu">
    			<button class="text btn_menu" tabindex="-1" id="linker_raste_manage">
                    ایجاد دسته بندی نقشه
    			</button>
    		</div>
    	</div>
    	
    	<div class="dropdown" state="close">
    	    <div class="dropdown-title">
    	        <div class="text">
                    شهرستان و روستاها
    			</div>
    			<img class="menu_icon" src="mapIcon.svg" style="width:15px;">
    	    </div>
    	    <div class="menu dropdown-menu first-dropdown-menu">
    			<button class="text btn_menu" tabindex="-1" onclick="manageCity()">
                    مدیریت شهرستان ها
    			</button>
    		</div>
    		<div class="menu dropdown-menu first-dropdown-menu">
    			<button class="text btn_menu" tabindex="-1" onclick="manageSubCity()">
                    مدیریت شهر و روستا
    			</button>
    		</div>
    	</div>
    	  	
    	<div class="dropdown" state="close">
    	    <div class="dropdown-title">
    	        <div class="text">
        			محتوا
    			</div>
    			<img class="menu_icon" src="report.svg" style="width:15px;top:13px">
    			
    	    </div>
    		<div class="menu dropdown-menu">
    			<button class="text btn_menu" tabindex="-1" onclick="category_mohtava_manage()">
        			ایجاد دسته بندی محتوا
    			</button>
    		</div>
    		<div class="menu dropdown-menu">
    			<button class="text btn_menu" tabindex="-1" onclick="addMohtavaAlert()">
    		    	 اضافه کردن محتوا
    			</button>
    		</div>
    	</div>
    	<div class="dropdown" state="close">
    	    <div class="dropdown-title">
    	        <div class="text">
        			مدیریت
    			</div>
    			<img class="menu_icon" src="setting.svg" style="width:15px;top:13px">
    			
    	    </div>
    		<div class="menu dropdown-menu">
    			<button class="text btn_menu" tabindex="-1" onclick="manageCategoriesAlert()">
        			مدیریت دسته بندی ها
    			</button>
    		</div>
    	</div>
    	
    	<div class="dropdown" state="close">
    	    <a href="./index.php">
        	    <div class="dropdown-title">
        	        <div class="text">
            			خروج
        			</div>
        			<img class="menu_icon" src="powerOff.svg" style="width:15px;top:14px">
        			
        	    </div>
    	    </a>
    	</div>
    	
    	<div style="height:10px"></div>
    </div>
</div>
<center>
<div style="margin-right:200px;">
<div id="notification" style="top: -90px; width: 0px;">
	<div class="text"></div>
</div>
<div id="darkness"></div>
<div class="div" id="main">
    
 <!--   <div class="btn_search" id="change_search" title='جستجوی مالی'>-->
	<!--	<img src="change.svg" class="icons">-->
	<!--	<div class="btn_effect"></div>-->
	<!--</div>-->
	
    <div id="search_box">

	    <div class="search_part" id="search_part1" state="open">
		    
		    <div class="search_taki_box autocomplete">
				<input type="text" autocomplete="off" placeholder="شناسه" id="search_parvande">
			</div>
			<div class="search_taki_box autocomplete">
				<input type="text" autocomplete="off" placeholder="نام" id="search_name">
			</div>

			<input type="hidden" autocomplete="off" placeholder="نام خانوادگی" id="search_family">
			<input type="hidden" autocomplete="off" placeholder="کد ملی" id="search_meli">
			<input type="hidden" autocomplete="off" placeholder="شناسه صنفی" id="search_idsenfi">
			<!--<input type="hidden" autocomplete="off" placeholder="عنوان تابلو" id="search_title">-->
			<input type="hidden" autocomplete="off" placeholder="رسته" id="search_raste">
			
			<div class="search_taki_box autocomplete">
				<input type="text" autocomplete="off" placeholder="تلفن همراه" id="search_phone">
			</div>
			<div class="search_taki_box autocomplete">
				<input type="text" autocomplete="off" placeholder="آدرس" id="search_address">
			</div>
			
			<div class="search_taki_box autocomplete">
				<input type="text" autocomplete="off" placeholder="متن" id="search_title">
			</div>
			
			
			
			<div class="search_taki_box box_search_select">
				<select class="select_search" id="search_select_namayesh">
		            <option value="">نمایش همه</option>
		            
		            
		            
		            
		            <?php	                
                        
                        $duty_cat = "SELECT * FROM `categories`";
                        
                        if ($tableCat = mysqli_query($sql,$duty_cat))  {
                        	$counterCat =mysqli_num_rows($tableCat);
                        }
                        
                        
                
                        
                        for($a = 0;$a < $counterCat;$a++){
                            
                            $row_cat = mysqli_fetch_array($tableCat);
                            
                            
                            echo "<option value='".$row_cat['id']."'>".$row_cat['name']."</option>";
                            
                            
                            
                            
                        }
                        
                        
                    		            
		            
		            
		            
		            
		            ?>
		            
		            
		        </select>
			</div>
			
			
			<div class="search_taki_box box_search_select">
				<select class="select_search" id="search_select_pardakht">
				    <option value="">نمایش همه</option>
		            <option value="semnan">سمنان</option>
        		    <option value="shahrood">شاهرود</option>
        		    <option value="mayamey">میامی</option>
        		    <option value="mehdishahr">مهدی شهر</option>
        		    <option value="damghan">دامغان</option>
        		    <option value="sorkhe">سرخه</option>
        		    <option value="aradan">آرادان</option>
        		    <option value="garmsar">گرمسار</option>
		    
		            
		            
		            
		        </select>
			</div>
		</div>
		 <!--searche Pishrafte  -->
		
		<div class="search_part" id="search_part2" style="transform:scaleY(0)" state="close">
		    
			<div class="search_taki_box autocomplete" tabindex="-1">
				<input type="text" autocomplete="off" id="search_NumFish" placeholder="شماره فیش" tabindex="-1">
			</div>
			<div class="search_taki_box autocomplete" tabindex="-1">
				<input type="text" autocomplete="off" id="search_BankFish" placeholder="نام بانک نقدی" tabindex="-1">
			</div>
			<div class="search_taki_box autocomplete" tabindex="-1">
				<input type="text" autocomplete="off" id="search_SahebHesab" placeholder="نام صاحب چک" tabindex="-1">
			</div>
			<div class="search_taki_box autocomplete" tabindex="-1">
				<input type="text" autocomplete="off" id="search_bankCheck" placeholder="نام بانک چک" tabindex="-1">
			</div>
			<div class="search_taki_box autocomplete" tabindex="-1">
				<input type="text" autocomplete="off" id="search_numSerial" placeholder="شماره سریال چک" tabindex="-1">
			</div>
			<div class="search_taki_box autocomplete" tabindex="-1">
				<input type="text" autocomplete="off" id="search_numHesab" placeholder="شماره حساب چک" tabindex="-1">
			</div>
			<div class="search_taki_box autocomplete" tabindex="-1">
				<input type="text" autocomplete="off" id="search_dateSarresid" placeholder="تاریخ سررسید چک" tabindex="-1">
			</div>
			<div class="search_taki_box box_search_select" style="width: 126px;margin-left: 3px;" tabindex="-1">
				<select class="select_search" id="search_select_pardakht" tabindex="-1">
		            <option value="1" tabindex="-1">همه</option>
		            <option value="2" tabindex="-1">پرداخت شده</option>
		            <option value="3" tabindex="-1">تسویه نشده</option>
		            <option value="4" tabindex="-1">پرداخت نقدی</option>
		            <option value="5" tabindex="-1">پرداخت با چک</option>
		        </select>
			</div>
		</div>
	</div>


        <div style="display:inline-flex;" dir="rtl">
    		<!--<div class="btn btn_search" id="btn_add_marker" style="width: auto;padding-left: 10px;" onclick="ChooseMapAddress()">-->
    		<!--	<div style="display:flex">-->
    		<!--		<div class="text">اضافه کردن مغازه</div>-->
    		<!--		<img src="add.svg" class="icons">-->
    		<!--	</div>-->
    		<!--	<div class="btn_effect"></div>-->
    		<!--</div>-->
    		<!--&nbsp;&nbsp;&nbsp;-->
    		<!--<div class="btn btn_search" id="linker_raste_manage" style="width: auto;padding-left: 10px;">-->
    		<!--	<div style="display:flex">-->
    		<!--		<div class="text">ایجاد دسته بندی نقشه</div>-->
    		<!--		<img src="add.svg" class="icons">-->
    		<!--	</div>-->
    		<!--	<div class="btn_effect"></div>-->
    		<!--</div>-->
    		<!--&nbsp;&nbsp;&nbsp;-->
    		<!--<div class="btn btn_search" onclick="category_mohtava_manage()" style="width: auto;padding-left: 10px;">-->
    		<!--	<div style="display:flex">-->
    		<!--		<div class="text">ایجاد دسته بندی محتوا</div>-->
    		<!--		<img src="add.svg" class="icons">-->
    		<!--	</div>-->
    		<!--	<div class="btn_effect"></div>-->
    		<!--</div>-->
    		<!--&nbsp;&nbsp;&nbsp;-->
    		<!--<div class="btn btn_search" style="width: auto;padding-left: 10px;" onclick="addMohtavaAlert()">-->
    		<!--	<div style="display:flex;">-->
    		<!--		<div class="text">اضافه کردن محتوا</div>-->
    		<!--		<img src="add.svg" class="icons">-->
    		<!--	</div>-->
    		<!--	<div class="btn_effect"></div>-->
    		<!--</div>-->
    		<!--&nbsp;&nbsp;&nbsp;-->
    		
    		
    	</div>
    	
    <br><br>
    	
    
	<div style="display:inline-flex;" dir="rtl">
		<div class="btn_search btn_pak">
			<div style="display:flex">
				<div class="text">پاک کردن</div>
				<img src="eraser.svg" class="icons">
			</div>
			<div class="btn_effect"></div>
		</div>
		<div class="btn_search" id="btn_search">
			<div style="display:flex">
				<div class="text">جستجو</div>
				<img src="magnifier.svg" class="icons">
			</div>
			<div class="btn_effect"></div>
		</div>
		
		<!--&nbsp;&nbsp;&nbsp;-->
		
		<!--<div class="btn btn_search" id="refresh_view" onclick="refresh_iframe()">-->
  <!--  		<img src="../rotate.svg" class="icons">-->
  <!--  		<div class="btn_effect" style="height: 0px;"></div>-->
  <!--  	</div>-->
    	
		&nbsp;&nbsp;&nbsp;
		
    	<div class="btn btn_search" style="margin: 0;" id="change_view" title="جستجوی مالی">
    		<img src="change.svg" class="icons">
    		<div class="btn_effect" style="height: 0px;"></div>
    	</div>
		
	</div>
    	
    <br><br>
    	
    <div class="maghaze" id="title_page_maghaze">
		<div style="display:flex;">
			<div class="home home1">
				<div class="text">
					شناسه
				</div>
			</div>
			<div class="home home7">
				<div class="text">
					نام
				</div>
			</div>
			<div class="home home5">
				<div class="text">
					شهر
				</div>
			</div>
	
			<div class="home home3">
				<div class="text">
					دسته بندی
				</div>
			</div>
			
			<div class="home home3">
				<div class="text">
					آدرس
				</div>
			</div>
			<div class="home home6">
				<div class="text">
					شماره تلفن
				</div>
			</div>
			<div class="home home5">
				<div class="text">
					پردازش
				</div>
			</div>
		</div>	
	</div>
    	
	<div id="page_maghaze">
		<?php
		    if($safe){
		        
                for($i = 1;$i <= 10;$i++){
                    
					$row_info = mysqli_fetch_array($table);
                					
                					    
                    $duty = "SELECT * FROM `categories` where id = '".$row_info['categoryId']."'";
                    
                    if ($tableCate = mysqli_query($sql,$duty))  {
                    	$row_category = mysqli_fetch_array($tableCate);
                    }
                    
					$category = $row_category['name'];
					
					$text = $row_info['text'];
                	
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
        					echo '<div class="home home1 '.$colorClass.'" title="'.$row_info['id'].'">';
        						echo '<div class="text notSpacingNumber">';
        							echo $row_info['id'];
        						echo '</div>';
        					echo '</div>';
        					echo '<div class="home home7">';
        						echo '<div class="text">';
        							echo $row_info['name'];
        						echo '</div>';
        					echo '</div>';
        					echo '<div class="home home5">';
        						echo '<div class="text">';
        							echo findcity($row_info['city']);
        							
        							
        						echo '</div>';
        					echo '</div>';
        	
        					echo '<div class="home home3">';
        						echo '<div class="text notSpacingNumber">';
        							echo $category;
        						echo '</div>';
        					echo '</div>';
        					echo '<div class="home home3">';
        						echo '<div class="text notSpacingNumber">';
        							echo $row_info['address'];;
        						echo '</div>';
        					echo '</div>';
        					echo '<div class="home home6">';
        						echo '<div class="text notSpacingNumber">';
        							echo $row_info['number'];
        						echo '</div>';
        					echo '</div>';
        					echo '<div class="home home5" style="border: none;">';
        
        						echo '<div style="display:inline-flex">';
        						
        						
        						
        						    
        							echo '<img class="icons edit_icon" style="width: 22px;" title="گالری" src="gallery.svg" onclick="galleryPage(';
        							echo "'".$row_info['id']."'";
        							echo ')">';
        						
        							echo '<img class="icons edit_icon" title="ویرایش" src="edit.svg" onclick="edit(';
        							echo "'".$row_info['id']."'";
        							echo ')">';
        							
        							
        							echo '<img class="icons del_icon" title="حذف" src="delete.svg" onclick="delInfo(';
        							echo "'".$row_info['id']."','".$row_info['name']."','".$row_info['family']."'";
        							echo ')">';
            						
            					echo '</div>';		
            				echo '</div>';
            			echo '</div>';
            		echo '</div>';
				}
			}
		?>
	</div>
	
	
	<div style="display:inline-flex;margin-top:8px;direction:rtl">
	    
	    <div class="btn" style="width:45px;background-color:var(--mainColor-second-color);border:1px solid var(--mainColor-asli-porang);padding: 3px 2px 12px 1px;margin-top:3px;height: 11px;" onclick="last_page('1')">
			<div style="display:flex;margin-top: -1px;">
				<img src="next_img.svg" style="margin: 2px 0px 0px 2px;width:13px" class="icons">
				<div class="text" style="font-size:10.4pt;color:white">قبلی</div>
			</div>
			<div class="btn_effect" style="height: 0px;"></div>
		</div>
		
		&nbsp;&nbsp;&nbsp;&nbsp;
		
	    <div class="text" style="display:inline-flex;margin-top:6px;">
	        صفحه
	        &nbsp;
	        <div class="text notSpacingNumber" id="text_numPage">
	            1
	        </div>
	        &nbsp;
	        از
	        &nbsp;
	        <div class="text notSpacingNumber" id="text_tedadPage">
	            <?php
	                if($count % 10 == 0)
	                    echo intval($count/10);    
	                else
	                    echo intval($count/10) + 1;    
	            
	            ?>
	        </div>
	    </div>
	    
	    &nbsp;&nbsp;&nbsp;&nbsp;
	    
	    <div class="btn" style="width:45px;background-color:var(--mainColor-second-color);border:1px solid var(--mainColor-asli-porang);padding:2px 6px 12px 3px;margin-top:3px;height: 11px;" onclick="next_page('1');">
			<div style="display:flex;margin-top: -1px;">
				<div class="text" style="font-size:10.4pt;color:white">بعدی</div>
				<img style="transform: rotate(180deg);margin: 3px 2px 0px 0px;width:13px" src="next_img.svg" class="icons">
			</div>
			<div class="btn_effect" style="height: 0px;"></div>
		</div>
		
	    
	</div>
	
	
	
	
	
	
	
</div>
</center>


<script src="jquery.min.js"></script>
<script src="jquery.cropit.js"></script>
<script src="homejs.js"></script>
<script src="test.js"></script>
<script src="panelMap.js?v=1"></script>

<script src="canvasjs.min.js"></script>
<script src="leaflet.js"></script>
<script src="leaflet.js"></script>
<script src="leaflet-src.esm.js"></script>
<script src="leaflet-src.js"></script>
<script src="leaflet.markercluster-src.js"></script>
