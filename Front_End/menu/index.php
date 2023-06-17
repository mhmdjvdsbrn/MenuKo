<?php

    $id = $_GET['id'];

    echo "<input type='hidden' id='idHolder' value='".$id."'>";

    // $name_store = $data['name_store'];
    
    $boolCheck = false;

       
    function httpPost2($url){
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }

    $url = 'http://menuko.ir:7000/api/menu/category/'.$id;
    $response = httpPost2($url);
    $response2 = json_decode($response, TRUE);
    
    $countCategories = count($response2);
    
    if($countCategories > 0){
        $boolCheck = true;
        echo "<input id='counterCategories' type='hidden' value='".$countCategories."'>";
    }
    else{
        $boolCheck = false;
    }
    
    $url = 'http://menuko.ir:7000/api/menu/owner/'.$id;
    $response = httpPost2($url,$token);
    $response3 = json_decode($response, TRUE);
    
    $response3 = $response3[0];
    
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
<input type="hidden" id="ScrollHolder" value="0">
<center>
<div id="notification">
	<div class="text"></div>
</div>
<div class="home" style="    width: 100%;
    display: inline-flex;
    height: 200px;
    overflow: hidden;
    position: absolute;
    padding: 0;
    top: 0px;
    right: 0;
    z-index: 6;">
    
    <!--$fileBanner = "";-->
    
    <?php
        if($pathBanner != ""){
            echo '<img id="img_banner" src="https://menuko.ir/.'.$pathBanner.'?'.rand(5, 15).'" style="width:100%;min-height: 200px;height:fit-content;">';
        }
        else{
            
        }
    
    ?>
    
    

</div>
<div class="home" style="    width: 100%;
    display: inline-flex;
    height: 140px;
    position: absolute;
    top: 200px;
    right: 0;
    z-index: 10;">
    
    <!--$fileBanner = "";-->
    
    <div style="    position: absolute;
    left: 20px;
    width: 100px;
    height: 100px;
    top: -70px;
    border: 3px solid #dddddd;
    box-shadow:rgb(58 61 66 / 6%) 0px 1px 0px, rgb(0 0 0 / 30%) 0px 8px 32px -16px;
    border-radius: 20px;
    overflow: hidden;">
        
                
        <?php
            if($pathLogo != ""){
                echo '<img id="img_logo" src="https://menuko.ir/'.$pathLogo.'?'.rand(5, 15).'" style="width:100%;width:100%;">';
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
<div class="home" id="category_box" style="top: 332px;position: absolute;">
    
    <?php
    
        if($boolCheck){
        
            for($i = 0;$i < $countCategories;$i++){
                echo '<div class="category" id="btnCategory'.$i.'" onclick="scrollToDiv('."'".$i."'".')"><div class="text">'.$response2[$i]['category_name']."</div></div>";
            }
        }
    
    ?>

</div>


<div class="home" style="width:100%;float: left;padding:10px;margin-top: 390px;">
    

	<div id="asli_main_score" style="width:100%;height:auto"></div>

</div>



<script src="../jquery.min.js"></script>
<script src="../jquery.cropit.js"></script>
<script src="../homejs.js"></script>
<script src="../test.js"></script>
<script src="moshtari.js?v=1.1"></script>
<script src="../canvasjs.min.js"></script>
<script src="../jQuery.print.js"></script>