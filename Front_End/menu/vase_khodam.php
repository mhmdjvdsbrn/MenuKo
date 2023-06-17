<?php 
    
    
    // Compress image
    function compressImage($source, $destination, $quality) {
    
      $info = getimagesize($source);
    
      if ($info['mime'] == 'image/jpeg') 
        $image = imagecreatefromjpeg($source);
    
      elseif ($info['mime'] == 'image/gif') 
        $image = imagecreatefromgif($source);
    
      elseif ($info['mime'] == 'image/png') 
        $image = imagecreatefrompng($source);
    
      imagejpeg($image, $destination, $quality);
    
    }
    
    
    if ($handle = opendir('../media/images/6/')) {
    
        while (false !== ($entry = readdir($handle))) {
    
            if ($entry != "." && $entry != "..") {
                if (!strpos($entry, '_') !== false) {
                    // The word WAS found
                    echo "$entry\n";
                    
                    
                    $source_img = '../media/images/6/'.$entry;
                    compressImage($source_img,$source_img,10);
                    
                    
                }
    
    
    
                
            }
        }
    
        closedir($handle);
    }



?>