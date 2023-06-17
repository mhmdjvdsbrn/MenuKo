<?php


    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");

    $dute_exist ="SELECT * FROM `topCategories`";
    
    if($table = mysqli_query($sql,$dute_exist)){
        $count = mysqli_num_rows($table);
    }
    
    
?>

<center>
	<div class="space"></div>	
	<div class="space"></div>
	<div class="space"></div>
	<div class="cadr_box">
		<div class="text"  style="display: table-cell; vertical-align: middle;">
		    دسته بندی های اصلی
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
    		    <div class="home_cadr roydad_title" style="flex:4">
    				<div class="text">
    						عنوان دسته بندی
    				</div>
    			</div>
    			<div class="home_cadr roydad_title" style="flex:2">
    				<div class="text">
    						نوع
    				</div>
    			</div>
    			<div class="home_cadr roydad_title" style="flex:2">
    				<div class="text">
    						پردازش
    				</div>
    			</div>
    		</div>
    		
    		<div id="scroll_raste_manage" style="height:300px;overflow-y:scroll;direction:ltr;">
    		    
    		    <?php
    
                                     
                        
                    for($i = 0;$i < $count;$i++){
                        
                        $row = mysqli_fetch_array($table);
                        
                        $name = "";
                        
                 
				        if($row['type'] == 'makan'){
				            
				            $dute_exist ="SELECT * FROM `categories` where id='".$row['categoryId']."'";
                        
                            if($tableCate = mysqli_query($sql,$dute_exist)){
                                $rowCate = mysqli_fetch_array($tableCate);
                                
                                
                                $name = $rowCate['name'];
                            }
                            
                            
                            
                            
                            
				        }
				        else{
				            
				            $dute_exist ="SELECT * FROM `mohtava_categories` where id='".$row['categoryId']."'";
                        
                            if($tableCate = mysqli_query($sql,$dute_exist)){
                                $rowCate = mysqli_fetch_array($tableCate);
                                
                                
                                $name = $rowCate['name'];
                            }
				            
				            
				            
				        }
					        
                        
                        
                            
                        echo '<div class="roydad_row">';
                        echo'
            				<div style="display:flex;" dir="rtl">
            			    	<div class="roydad_row_home">
            						<div class="text">';
        						        echo $i + 1;
            						echo'</div>						
            					</div>
            					<div class="roydad_row_home"  style="flex:4">
            						<div class="text notSpacingNumber">';
        						        echo $name;
            						echo'</div>						
            					</div>
            					
            					<div class="roydad_row_home"  style="flex:2">
            						<div class="text notSpacingNumber">';
        						        
        						        if($row['type'] == 'makan'){
        						            echo "مکان";
        						        }
        						        else{
        						            echo "محتوا";
        						        }
        						        
        						        
        						        
            						echo'</div>						
            					</div>
            					
            					<div class="roydad_row_home home_tools" style="flex:2">
            						<div style="display:inline-flex;direction:ltr">
            						    <img onclick="delCategory('."'".$row['id']."','".$row['name']."'".')" class="icons" src="../delete.svg">					
            						    <img onclick="chooseTypeCategory('."'".$row['id']."'".')" class="icons" src="../edit.svg">					
            						</div>
            					</div>
            				</div>
            			</div>';
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
        		بستن
        	</div>
        </div>
        
    </div>
          
</center>
