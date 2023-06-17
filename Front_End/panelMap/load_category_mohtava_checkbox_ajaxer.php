<?php


    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");

    $dute_exist ="SELECT * FROM `mohtava_categories`";
    
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
		    دسته بندی محتوا را انتخاب نمایید
		</div>
	</div>
	
	<div class="cadr_box" style="height:300px;border:none">
		
		<div style="width:96%">
    
    		<div class="roydad_title_row" dir="rtl">
    		    <div class="home_cadr roydad_title">
    				<div class="text">
    				        انتخاب
    				</div>
    			</div>
    			
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
    			
    			<div class="home_cadr roydad_title" >
    				<div class="text">
    					    ایکن
    				</div>
    			</div>
    		</div>
    		
    		<div id="scroll_raste_manage" style="height:300px;overflow-y:scroll;direction:ltr;">
    		    
    		    <?php
    
                                     
                        
                    for($i = 0;$i < $count;$i++){
                        
                        $row = mysqli_fetch_array($table);
                            
                        echo '<div class="roydad_row">';
                        echo'
            				<div style="display:flex;" dir="rtl">
            			    	<div class="roydad_row_home">
            						<div class="text">';
        						        
        						        echo '<input type="checkbox" cateId="'.$row['id'].'" class="categoryCheckbox">';
        						        
            						echo'</div>						
            					</div>
            					
            					<div class="roydad_row_home">
            						<div class="text">';
        						        echo $i + 1;
            						echo'</div>						
            					</div>
            					
            					<div class="roydad_row_home"  style="flex:3">
            						<div class="text notSpacingNumber">';
        						        echo $row['name'];
            						echo'</div>						
            					</div>
            					
            					
            					
            					
            					<div class="roydad_row_home"  home_tools>
            						<img class="icons" src=';
            						    
        						        echo "'".$row['image']."'>";
        						        
        						echo'</div>			
            				</div>
            			</div>';
            					
                    }
                            
                    
                            
                        
    
    		    ?>
			</div>
		</div>
	</center>
</div>
<center>
    
	<div dir="ltr" style="display:inline-flex">
		<div class="btn btn_submit" onclick="edame_add_mohtava()">
			<div class="btn_effect"></div>
			<div class="text" style="position:relative;z-index:2">ادامه</div>
		</div>
		<div class="btn btn_deny" onclick="deny_add_pic()">
			<div class="btn_effect"></div>
			<div class="text" style="position:relative;z-index:2">لغو</div>
		</div>
	</div>
          
</center>
