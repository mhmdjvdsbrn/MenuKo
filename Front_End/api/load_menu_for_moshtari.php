<?php

    $id = $_POST['id'];
    
    
       
    function httpPost2($url){
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
    
    
    $url = 'http://menuko.ir:7000/api/menu/'.$id;
    $response = httpPost2($url);
    $response2 = json_decode($response, TRUE);
    
    $counter = count($response2);
    $boolCheck = false;
	for($a = 0;$a < $counter;$a++){
        if($response2[$a]['products'][0]['id'] != ""){
            $boolCheck = true;
        }
        
	}

    if(!$boolCheck){
        echo '<div class="text">';
        echo "هیچ محصولی یافت نشد";
        echo "</div>";
    }


    echo'<div id="asli_main_score_scroll" style="width:calc(100% - 30px);">
		
			<div style="margin-top:20px;"></div>';
			
			if($boolCheck){
			    
    			$countCategories = count($response2);
    			
    			for($a = 0;$a < $countCategories;$a++){
    			    
    			    $countProducts = count($response2[$a]['products']);
    			    
    			    $thisCategory = $response2[$a]['category_name'];
    			    
    			    $idCategory = "categoryId".$a;
    		    
                    for($i = 0;$i < $countProducts;$i++){
                        
                        if($i == 0){
                            echo '<div id="'.$idCategory.'" class="text categoryLabel">'.$thisCategory.'</div>';
                        }
                            
                            
                            
            			echo'
            	
            			
            			<div class="ticket_box_score">
            			
            			
            				<img class="img_product" src="'.$response2[$a]['products'][$i]['image'].'" width="40%" height="auto">
            			
            				<div class="bottom_ticket_box_score">
            					
            					<div class="text" style="font-weight: bold;font-size: 14pt;">';
            						echo $response2[$a]['products'][$i]['title'];
            					echo '</div>
            					
            					<div class="text">';
            					    echo $response2[$a]['products'][$i]['ingredients'];
            					echo '</div>
            					
            					<div class="text" style="bottom: 10px;border-radius: 4px;position: absolute;left: 10px;font-weight: bold;font-size: 12pt;display: flex;float: left;margin-left: 5px;background:#d1ffe1;padding:4px 6px;border-radius:4px;">';
            						
            						echo number_format($response2[$a]['products'][$i]['price']);
            						
            											
            						echo '<div class="text" style="position:relative;left:-1px;margin-top:1px;font-size:10pt;">
            							تومان
            						</div>
            						
            					</div>
            					
            					
            					<div class="text" style="bottom: 50;border-radius: 4px;position: absolute;left:9px;font-size: 10pt;display: flex;float: left;margin-left: 5px;background:#ededed;padding:4px 6px;border-radius:4px;">';
            						
            						echo $response2[$a]['category_name'];
            						
            											
    						echo '</div>
            				</div>
            			</div>';
            			
        			
        		
                    }
    			}
			
            echo '</div>';
        echo '</div>';
    }
			












?>