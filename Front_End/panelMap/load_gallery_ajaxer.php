<?php
    
    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");
    
    $id = $_POST['id'];
    $duty = "SELECT * FROM `galleryPage` where idMakan='$id'";
    if ($table=mysqli_query($sql,$duty))  {
    	$count=mysqli_num_rows($table);
    }
  

echo '
<div class="btn_close_alert mali_linker" onclick="notif_alert_manager('."'','1','','پنجره گالری بسته شد'".')">
		<img src="mali_close.svg" width="15px" height="15px">
</div>
<center>
    <input type="hidden" id="tedad_pic_gallery" value="'.$count.'">
    <div style="display:inline-flex" dir="rtl">
        <div class="text" style="font-size:10.8pt;margin-top:15px;">
            نهایتا 8 تصویر میتوان در گالری تصاویر آپلود کرد.(
        </div>
        <div class="text" style="font-size:10pt;margin-top:15px;">
            تعداد تصاویر آپلود شده : 
            '.$count.'
             تصویر
        </div>
        <div class="text" style="font-size:10.8pt;margin-top:15px;">
            )
        </div>
    </div>
    
    <div id="main_gallery" style="width:852px;height:400px;padding-top:10px;border-top:none">';
        
    for($i = 0;$i < $count;$i++){
        $row=mysqli_fetch_array($table);
        echo'
            <div class="box_img_gallery">
                <div class="title_box_img_gallery">
                    <div style="display:inline-flex;position:absolute;right:12px;top:5px">
                        <div class="text">
                            تصویر شماره
                        </div>
                        &nbsp;
                        <div class="text">';
                            echo $i + 1;
                            
        echo '
                        </div>
                    </div>
                    <div style="display:inline-flex;position:absolute;left:12px;top:9px">
                        <img class="icons" onclick="loadAlertEditGalleryText('."'".$row['id']."','".($i + 1)."'".')" src="edit.svg" title="ویرایش">
                        <img class="icons" onclick="GetPermissionToRemoveImage('."'".$row['id']."','".($i + 1)."'".')" src="delete.svg" title="حذف" >
                    </div>
                </div>
                <div class="div_img_gallery">
                    <img src="'.$row['url'].'">
                </div>
            </div>
        ';
    }
echo'
    </div>
    
    <div class="btn" onclick="add_img_gallery('.$id.')" style="margin-top:40px;background:var(--mainColor-asli-color);border:1px solid var(--mainColor-asli-porang);width:fit-content">  
        <div class="Text">
            عکس جدید
        </div>
        <div class="btn_effect" style="height: 0px;"></div>
    </div>
    </center>';
        
?>