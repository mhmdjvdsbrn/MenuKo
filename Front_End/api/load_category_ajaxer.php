<?php

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
    
    $token = $_POST['token'];

    $url = 'http://menuko.ir:7000/api/category/';
    $response = httpPost2($url,$token);
    $response2 = json_decode($response, TRUE);
    
    $countCategories = count($response2);
    
    if($countCategories > 0)
        $boolCheck = true;
    else{
        $boolCheck = false;
        echo "0";
    }
    
    
?>

<center>
	<div class="space"></div>	
	<div class="space"></div>
	<div class="space"></div>
	<div class="cadr_box">
		<div class="text"  style="display: table-cell; vertical-align: middle;">
		    دسته بندی های تعریف شده
		</div>
	</div>
	
	<div class="cadr_box" style="height:300px;border:none">
		
		<div style="width:96%">
    
    		<div class="roydad_title_row" dir="rtl">
    		    <div class="home_cadr roydad_title">
    				<div class="text">
    				        ردیف
    				</div>
    			</div>
    		    <div class="home_cadr roydad_title" style="flex:3">
    				<div class="text">
    						عنوان دسته بندی
    				</div>
    			</div>
    			<div class="home_cadr roydad_title">
    				<div class="text">
    						پردازش
    				</div>
    			</div>
    		</div>
    		
    		<div id="scroll_raste_manage" style="height:300px;overflow-y:scroll;direction:ltr;">
    		    
    		    <?php
    
                                         
                    if($boolCheck){
                            
                        for($i = 0;$i < $countCategories;$i++){
                                
                            echo '<div class="roydad_row">';
                            echo'
                				<div style="display:flex;" dir="rtl">
                			    	<div class="roydad_row_home">
                						<div class="text">';
            						        echo $i + 1;
                						echo'</div>						
                					</div>
                					<div class="roydad_row_home"  style="flex:3">
                						<div class="text notSpacingNumber">';
            						        echo $response2[$i]['category_name'];
                						echo'</div>						
                					</div>
                					
                					<div class="roydad_row_home home_tools">
                						<div style="display:inline-flex;direction:ltr">
                						    <img onclick="delCategory('."'".$response2[$i]['id']."','".$response2[$i]['category_name']."'".')" class="icons" src="../delete.svg">					
                						</div>
                					</div>
                				</div>
                			</div>';
                        }
                            
                    }
                            
                        
    
    		    ?>
			</div>
		</div>
	</center>
</div>
<center>
    
    <div style="display:inline-flex">
    
        <div class="btn btn_deny" onclick="notif_alert_manager('','1','','پنجره مدیریت دسته بندی بسته شد')">
        	<div class="btn_effect"></div>
        	<div class="text" style="position:relative;z-index:2">
        		لغو
        	</div>
        </div>
        
        <div class="btn btn_submit" onclick="add_raste()" style="width:auto">  
            <div class="Text">
                ایجاد دسته بندی جدید
            </div>
            <div class="btn_effect" style="height: 0px;"></div>
        </div>
        
    </div>
          
</center>
