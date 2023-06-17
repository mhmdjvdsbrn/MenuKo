
<?php

    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");

    
    
    
            
        

    $lat = $_POST['lat'];
    $lng = $_POST['lng'];


    
    
    $duty  ="SELECT * FROM `maghazeha` where lat='".$lat."' and lang='".$lng."'";
    
    if($table = mysqli_query($sql,$duty)){
        
        $row = mysqli_fetch_array($table);
        
                
        $duty  ="SELECT * FROM `categories` WHERE id='".$row['categoryId']."';";
        
        if($tableCat = mysqli_query($sql,$duty)){
            
            $rowCat = mysqli_fetch_array($tableCat);
            
        }
    
        
        
        
    }

    







?>




<div style="display:flex;direction: rtl;">
    <img id="maghaze_img" src="<?php echo $row['image'];?>" style="width: 120px;height: 120px;border-radius: 5px;">
    <div class="details" style="margin:0px 10px 0px 10px">
        <div id="title_maghaze" class="text"><?php echo $row['name'];?></div>
        <div id="type_maghaze" class="text">
            
            <?php echo $rowCat['name'];?>
        </div>
        <div style="display:flex;direction: rtl;">
            <div class="btn">
                <div class="text">
                    تماس
                </div>
            </div>
            <div class="btn" style="margin:15px 5px 0px 0px">
                <div class="text">
                    اشتراک گذاری
                </div>
            </div>
            <div class="btn" style="margin:15px 5px 0px 0px">
                <div class="text">
                    مسیر یابی
                </div>
            </div>
        </div>
    </div>
    
</div>