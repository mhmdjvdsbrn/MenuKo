<?php
    $year = 1400;
    $table_name_user = "usersInfo_".$year;
    
    include("Connections/sql.php");
    mysqli_select_db($sql,"menukoir_map");

    $dute_exist ="SELECT * FROM `categories` order by sort"; 
    
    
    if($table = mysqli_query($sql,$dute_exist)){
        $count = mysqli_num_rows($table);
    }
    
    
    $dute_user ="SELECT * FROM `categories` order by sort";
    
    if($tableCategories = mysqli_query($sql,$dute_user)){
        
        $countCategories = mysqli_num_rows($tableCategories);
        
        $countCategories;
        
        for($i = 1;$i <= $countCategories;$i++){
            
            $rowCate = mysqli_fetch_array($tableCategories);
            
            $duty  ="SELECT * FROM `maghazeha` where categoryId='".$rowCate['id']."'";
        
            if($tablePosts = mysqli_query($sql,$duty)){
                
                $arr = [];
                $points = '[';
                
                $countPosts = mysqli_num_rows($tablePosts);
                
                
                for($a = 0;$a < $countPosts;$a++){
                    
                    $rowPosts = mysqli_fetch_array($tablePosts);
                    
                    
                    
                    if($rowPosts['lat'] != '' AND $rowPosts['lang'] != ''){
                    
                        // $temp = [$rowPosts['lang'],$rowPosts['lat']];
                        
                    
                        if($a != 0)
                            $points .= ',';
                    
                        $points .= '{
                    		"type": "Feature",
                    		"properties": {
                    		    "party": "'.$rowPosts['id'].'",
                    			"popupContent": "'."<b>".$rowCate['name']."</b><br>".$rowPosts['name'].'"
                    		},
                    		"geometry": {
                    			"type": "Point",
                    			"coordinates": ['.$rowPosts['lang'].','.$rowPosts['lat'].']
                    		}
                    	}';
                    
                    }
                    
                }
                
                
                $points .= ']';
                
                
                
                echo '<input id="txt_points'.$rowCate['id'].'" type="hidden" value='."'".$points."'".'>';
                
                
            }
            
            
            
            
            
        }
            
            
            
        
        
        
        
    }
    
?>
<!doctype html>
<html lang="fa" dir="ltr">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="leaflet.css" />
    <link rel="stylesheet" href="leaflet/MarkerCluster.css" />
    <link rel="stylesheet" href="leaflet/MarkerCluster.Default.css" />
    <style>
    .leaflet-tooltip-pane > * {
        direction: rtl;
        font-family:iransans;
        font-size: 8pt;
    }
    .leaflet-tooltip-pane {
        direction: ltr;
        font-family:iransans;
        font-size: 8pt;
    }
    *{
        -moz-user-select: none;
	    -khtml-user-select: none;
	    -webkit-user-select: none;
	    -ms-user-select: none;
	    user-select: none;
    }
    .text{
        font-family:iransans;
        font-size: 11pt;
    }
    .marker-cluster div{
        margin-left:5px !important;   
    }
    .easy-button-container a{
        width:auto !important;
            padding: 0px 50px;
    }
    .header{
        padding:0px !important;
        margin:0px !important;
        
    }
    ul{
            list-style-type: none;

    }
    .header li{
        margin:5px 0px !important;
    }
    * {
        -webkit-touch-callout:none;
        -webkit-user-select:none;
        -moz-user-select:none;
        -ms-user-select:none;
        user-select:none;
        
        -webkit-user-select: none;  
        -moz-user-select: none;    
        -ms-user-select: none;      
        user-select: none;
    }
    .box-info{
        width:100%;
        background:#f7f7f7;
        height:50px;
        margin: 7px;
        font-family: iransans
    }
    .box-info .text{
      text-align: center;
      position: relative;
      top: 50%;
      -ms-transform: translateY(-50%);
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
    .btn{
        -moz-user-select: none;
        -khtml-user-select: none;
        -webkit-user-select: none;
        -ms-user-select: none;
        user-select: none;
        position: relative;
        width: fit-content;
        height: 15px;
        padding: 6px 11px 15px 11px;
        border-radius: 5px;
        color: white;
        cursor: pointer;
        overflow: hidden;
        margin-top: 15px;
        background-color:#5f82f1;
        border: 1px solid var(--mainColor-asli-porang);
    }
    .btn .text{
        font-size: 10.5pt;
    }
    
    
#category_box {
    width: 100%;
    display: inline-flex;
    height: auto;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 8px;
    position: fixed;
    box-shadow: 0px 3px 8px -5px #565656;
    top: 0px;
    background: whitesmoke;
    border-bottom: 1px solid var(--score-Asli-color);
    right: 0;
    z-index: 6;
    direction: rtl;
    padding-top: 10px;
}
.category {
    width: fit-content;
    height: fit-content;
    background: white;
    border-radius: 20px;
    padding: 8px 15px 8px 15px;
    margin: 2px 4px 2px 4px;
    cursor: pointer;
    white-space: nowrap;
}
    
    
    
</style>
</head>
<body id="bbbb">
<div class="map" id="userMap" style="direction: ltr;width:100%;height:100%;position:fixed;left:0px;top:0px;"></div>


</body>

<script src="jquery.min.js"></script>
<script>
$("document").ready(function(){

  	var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 18,
			attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
		}),
		latlng = new L.LatLng(50.5, 30.51);

		
		var map = L.map('userMap',{
            maxZoom: 18,
            minZoom: 5,
            zoomControl: false,
            center: latlng, 
            zoom: 13, 
            layers: [tiles]
            
        }).setView([35.583010, 53.393148],14);

	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 18,
		id: 'mapbox/light-v9',
		tileSize: 512,
		zoomOffset: -1,
	}).addTo(map);
	
	L.control.zoom({
        position: 'bottomright'
    }).addTo(map);
    
    
    var LeafIcon = L.Icon.extend({
	options: {
			shadowUrl: 'images/marker-shadow.png',
			iconSize:     [18, 28],
			shadowSize:   [35, 41],
			iconAnchor:   [7, 30],
			shadowAnchor: [10, 42],
			popupAnchor:  [-53, 76],
			tooltipAnchor:  [9, -20]
		}
	});
	
	
	var customIcon = new LeafIcon({iconUrl: 'images/marker-icon.png'});
	
	
	function onEachFeature(feature, layer) {
		// does this feature have a property named popupContent?
		if (feature.properties && feature.properties.popupContent) {
		    
		    var matn = feature.properties.popupContent;
		    
			layer.bindTooltip(matn,{
    			permanent: true, 
    			direction: 'right'
    		});
		}
	}
	
	
	
	
	var points = '';
	
    	
    <?php

        
            
    
        $dute_user = "SELECT * FROM `categories` order by sort";
    
        $tableCategories2 = mysqli_query($sql,$dute_user);
        
        $countCategories2 = mysqli_num_rows($tableCategories2);
        

        for($i = 1;$i <= $countCategories2;$i++){
            
            $rowCate = mysqli_fetch_array($tableCategories2);
            $categoryid = $rowCate['id'];
            
            echo 'points = $("#txt_points'.$categoryid.'").val();';
            

            echo "
                
            
                var markers".$categoryid." = L.featureGroup();
                // 	var markers = L.markerClusterGroup();
    
            	var geoJsonLayer = L.geoJSON(JSON.parse(points), {
            		onEachFeature: onEachFeature,
            		pointToLayer: function(feature,latlng){
                        return L.marker(latlng,{icon: customIcon}).on('click', markerOnClick);
                    }
            	});
        
        		markers".$categoryid.".addLayer(geoJsonLayer);
        
        		map.addLayer(markers".$categoryid.");
    		";
        }
    	
	?>
	
	$(".category").click(function(){
    	    
    	    var value = $(this).attr("value");
    	    
    	    
    	    $(".category").css({"background":"white","color":"black"});
            $(this).css({"background":"#fc4800","color":"white"});
            
            
            <?php
            
                $dute_user = "SELECT * FROM `categories` order by sort";
            
                $tableCategories3 = mysqli_query($sql,$dute_user);
                
                $countCategories3 = mysqli_num_rows($tableCategories3);
                
        
                for($i = 1;$i <= $countCategories3;$i++){
                    
                    $rowCate = mysqli_fetch_array($tableCategories3);
                    $categoryid = $rowCate['id'];
                    
                    echo "map.removeLayer(markers".$categoryid.");";
                }
            ?>
            
            
        
    	    if(value=="removeAll"){
    	        
    	    }
    	    else if(value=="showAll"){
    	        
                
                <?php
                
                    $dute_user = "SELECT * FROM `categories` order by sort";
                
                    $tableCategories4 = mysqli_query($sql,$dute_user);
                    
                    $countCategories4 = mysqli_num_rows($tableCategories4);
                    
            
                    for($i = 1;$i <= $countCategories4;$i++){
                        
                        $rowCate = mysqli_fetch_array($tableCategories4);
                        $categoryid = $rowCate['id'];
                        
                        echo "map.addLayer(markers".$categoryid.");";
                    }
                ?>
    	        
    	    }
    	    else{
    	        map.addLayer(eval(value));
    	    }
    	    
    	});
	
	
    function markerOnClick(e){
        
        console.log(e);
       // $("#title_maghaze").html(e.target._tooltip._content);
        var latlng = e.latlng;
        
        
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        
        
        
        $("#box_maghaze").css({"display":"inherit"});
        
        $("#box_maghaze").html("<div class='loaderasdasdasd'></div>");
        
        
		$.ajax({
			url: 'load_maghaze_ajaxer.php',
			type: 'post',
			data: {lat:lat,lng:lng},
			dataType: 'HTML',
			success: function(response){
			    
                $("#box_maghaze").html(response);
                var d = new Date();
                $('#maghaze_img').attr('src', $('#maghaze_img').attr('src') + '?_=' + d.getMilliseconds());
            }
		});

         
		
		
    }
    	
	//remove leaflet link
	$('.leaflet-control-attribution').hide();
	
        	
});
    
    
</script>
<div class="leaflet-control-container">
    
    
    
    <div class="home" id="category_box">
        <div class="category" style="background:#fc4800;color:white;" value="showAll">
            <div class="text">نمایش همه</div>
        </div>
        <div class="category" value="removeAll">
            <div class="text">حذف همه</div>
        </div>
        
        
        <?php
                
            for($i = 1;$i <= $count;$i++){
                
                $row = mysqli_fetch_array($table);
                
                
                $group = "markers".$row['id'];
                
                echo '<div class="category" value="'.$group.'">
                    <div class="text">'.$row['name'].'</div>
                </div>';
                
                
            }
        ?>
        
        
        
        
    </div>
    
    
    <div id="box_maghaze" style="    
    width: 385px;
    position: fixed;
    bottom: 20px;
    border-radius: 15px;
    left: 50%;
    transform: translate(-50%, 0%);
    background: white;
    display:none;
    height: 120px;
    padding: 10px;
    box-shadow: 0px 0px 11px -6px #484848;
    border: 1px solid darkgrey;">
        
        
        
        
        
        
        
        
        
    </div>
    
</div>


<script src="jquery.min.js"></script>
<script src="leaflet.js"></script>
<script src="leaflet/leaflet.markercluster-src.js"></script>