var ajaxerRefreshLish,ajaxerPagerEdit;
var timeouts = [];
$("document").ready(function(){
 
    number_seprator();
 
    $(document).on('input', '#zommer_range_input', function() {
        
        var num = $(this).val()*100;
        
        $(this).css({"background":"linear-gradient(to right, #6ae3ff 0%, #6ae3ff " + num + "%, #fff " + num + "%, white 100%)"});
        
    });
		
	$('.box_checkbox').click(function(){
	    
		if($('#checkbox_val').val()=="true"){
			$('#checkbox_val').val('false');
			$('.tike_checkbox').css({"visibility":"hidden"});
            $('.box_checkbox').css({"background-color":"var(--whiteback-color)"});
		}
		else{
			$('#checkbox_val').val('true');
			$('.tike_checkbox').css({"visibility":"visible"});
			$('.box_checkbox').css({"background-color":"var(--sabz-color)"});
		}
	});

	$("#darkness").click(function(){
	    
		notif_alert_manager('','1','','لغو شد');
		
	});
	
	$('body').bind('keydown', function(e) {
	    
	    if($("#darkness").css("visibility") == "hidden"){
	        
	        //check if we are not focused on search inputs
	        if(!$('.search_taki_box input').is(':focus')){
        	    
        	    if(e.keyCode==37){
                    // badi key
                    next_page(0);
        	    }
        	    if(e.keyCode==39){
                    // ghabli key
                    last_page(0);
        	    }
        	    
        	    
        	    
        	    if(e.keyCode == 9){
        	        e.preventDefault();
        	        
        	        if($("#search_part1").attr('state') == "open"){
        	            
        	            $("#search_parvande").focus();
        	            
        	        }
        	        else if($("#search_part2").attr('state') == "open"){
        	        
        	            $("#search_NumFish").focus();
        	            
        	        }
        	    }
	        }
	        
	    }
	    
        if(e.keyCode==27){
            
            // Esc key
            
            if($("#darkness").css("visibility") != "hidden"){
        		
        		notif_alert_manager('','1','','لغو شد');
        		
            }
        }
    });
    
    // do search when the key is up
    $('body').bind('keyup', function(e) {
	    
	    if($("#darkness").css("visibility") == "hidden"){
	        
	        //check if we are not focused on search inputs
	        if(!$('.search_taki_box input').is(':focus')){
	        
	            if(e.keyCode==37 || e.keyCode==39){
                    refresh_list();
        	    }
	        }
	    }
    });
	
});


function tike_date_checker(text,tedad){
	var num = parseInt(text);
	if(text.toString().length == tedad  && Number.isInteger(num))
		return true;
}
function is_date_checker(date) {
	var check = true;
	var bits = date.split('/');
	if(date.length == 10){
	
		if(!(tike_date_checker(bits[0],4))){
			check = false;
		}
		if(!(tike_date_checker(bits[1],2))){
			check = false;
		}
		if(!(tike_date_checker(bits[2],2))){
			check = false;
		}
	}
	else{
		check = false;
	}
	return check;
}
function changeSaleMali(tb_year){
    $("document").ready(function(){
        $("#table_holder").val(tb_year);
        $(".tb_year").each(function(){
            $(this).val(tb_year);
        });
        
		$("#page_holder").val(1);
		$("#text_numPage").html(1);
        
        refresh_list();
        
        notif_alert_manager('','1','','سال مالی تغییر کرد');
        
    });
}
function submitPass(){
    $("document").ready(function(){
        var last_pass = $("#txt_lPass").val();
        var n_pass = $("#txt_nPass").val();
        var t_n_pass = $("#txt_tnPass").val();
        
        if(n_pass==""){
            
            notif_alert_manager('','','',"رمز نمیتواند خالی باشد");
    		
        }
        else{
            if(n_pass!=t_n_pass){
                
                notif_alert_manager('','','',"رمز جدید و تکرارش مطابقت ندارند");
        		
            }
            else{
                $.ajax({
        			url: 'changePass_ajaxer.php',
        			type: 'post',
        			data: {last_pass:last_pass,n_pass:n_pass},
        			dataType: 'HTML',
        			success: function(response){
        			
                        notif_alert_manager('','1','',response);
                
                        var last_pass = $("#txt_lPass").val('');
                        var n_pass = $("#txt_nPass").val('');
                        var t_n_pass = $("#txt_tnPass").val('');
        			}
    			});
            }
        }

    });
}
function omorMali(id){
    
    notif_alert_manager('','','omorMali_alertDialog','');
    
    document.getElementById("omorMali_alertDialog").innerHTML = "<div class='loader'></div>";
    
    $("document").ready(function(){		

        var tb_year = $("#table_holder").val();

		$.ajax({
			url: 'omor_mali_ajaxer.php',
			type: 'post',
			data: {tb_year:tb_year,id:id},
			dataType: 'HTML',
			success: function(response){
			    
                $("#omorMali_alertDialog").html(response);
                number_seprator();
                
            	$(".btn_iconi").click(function(){
            	    
                    var check = true;
                    
                    var maliType = $(this).attr("maliType");
                    
                    var mablagh = $("#txt_mablagh_dasti_mali").val();
                    var mablagh = mablagh.replaceAll(",", "");
                    
                    var sharh = $("#txt_sharh_dasti_mali").val(); 
                    var select_roydad_type = $("#select_dasti_mali").val(); 
                
                    if(select_roydad_type=='1'){
                        
                        notif_alert_manager('','','',"نوع بدهی را تعیین کنید");
                        
                        check = false;
                    }
                    if(select_roydad_type=='2'){
                      var roydadType = "jari";
                    }
                    if(select_roydad_type=='3'){
                      var roydadType = "ghabli";
                    }
                    if(select_roydad_type=='4'){
                      var roydadType = "motafareghe";
                    }

                    if(check){
                        if(mablagh == ''){
                            check = false;
                           
                            notif_alert_manager('','','',"مبلغ نمیتواند خالی باشد");
                           
                        }
                        else{
                            if(isNaN(mablagh)){
                                check = false;
                               
                                notif_alert_manager('','','',"مبلغ باید عدد باشد");
                                
                            }
                            else{
                               if(sharh == ''){
                        	        check = false;
                        	       
                        	        notif_alert_manager('','','',"شرح نمیتواند خالی باشد");
                        	   }
                            }
                        }
            	    }
            	    if(check){
            	        
            	        $("#txt_mablagh_dasti_mali").val('');
                        $("#txt_sharh_dasti_mali").val(''); 
                        $("#select_dasti_mali").val('1'); 
            	        
                        $.ajax({
                			url: 'set_dasti_bedehi_ajaxer.php',
                			type: 'post',
                			data: {tb_year:tb_year,id:id,mablagh:mablagh,sharh:sharh,maliType:maliType,roydadType:roydadType},
                			dataType: 'HTML',
                			success: function(response){
                			    
                			    notif_alert_manager('','','',response);
                		        omorMali(id);
                			}
                		});
            	    }
            	    
            	    
            	});
             
			},
            error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){omorMali(id)}, 1200));
            }
			
		});
    });
}
function dabirKhane(id){

    chap_parvane(id);

//     notif_alert_manager('','','dabirkhane_alertDialog','');

// 	$("#chap_parvane_btn").attr("onclick","chap_parvane("+id+")");
// 	$("#pay_parvane_btn").attr("onclick","load_pay_parvane("+id+")");
	
}
function load_pay_parvane(id){
    
    
    notif_alert_manager('','','load_pay_parvane_alertDialog','');

    document.getElementById("load_pay_parvane_alertDialog").innerHTML = "<div class='loader'></div>";
    
    $("document").ready(function(){
        
        var tb_year = $("#table_holder").val();
        
        $.ajax({
        	url: 'load_pay_parvane_ajaxer.php',
        	type: 'post',
        	data: {id:id,tb_year:tb_year},
        	dataType: 'HTML',
        	success: function(response){
        	    
        	    $("#load_pay_parvane_alertDialog").html(response);
        	    
        	    $("#close_pay_parvande_alert").click(function(){
            		notif_alert_manager('','1','','پنجره پرداخت پروانه بسته شد');
            	});
        	    
        	},
            error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){load_pay_parvane(id)}, 1200));
            }
        	
        });
        
    });
}
function chap_parvane(id){
    
    notif_alert_manager('','','chap_parvane_alertDialog','');
    
    document.getElementById("chap_parvane_alertDialog").innerHTML = "<div class='loader'></div>";
    
    $("document").ready(function(){
        
        var tb_year = $("#table_holder").val();
        
        $.ajax({
        	url: 'load_dabirkhane_ajaxer.php',
        	type: 'post',
        	data: {id:id,tb_year:tb_year},
        	dataType: 'HTML',
        	success: function(response){
        	    $("#chap_parvane_alertDialog").html(response);
        	    
        	    $("#btn_ebtal_daraie").click(function(){
        	        
        	        var txt_tarikh_daraie = $("#txt_tarikh_daraie").val();
        	        
        	        if(txt_tarikh_daraie != ''){
        	            if(is_date_checker(txt_tarikh_daraie)){
        	                $("#form_ebtal_daraie").submit();
        	            }
        	            else{
            		        notif_alert_manager('','','','فرمت تاریخ دارایی صحیح نمی باشد');
        	            }
        	        }
        	        else{
            		    notif_alert_manager('','','','تاریخ دارایی نمیتواند خالی باشد');
        	        }
        	        
        	    });
        	    
        	},
            error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){chap_parvane(id)}, 1200));
            }
        	
        });
        
    });
        
}
function pay_parvane(idPerson,id,type,fullName){
    
	notif_alert_manager('','','pay_parvane_alertDialog','');
	
	$.ajax({
        url: 'send_date_ajaxer.php',
        type: 'post',
        data: {},
        dataType: 'HTML',
        success: function(response){
            $("#txt_parvane_tarikh_pay").val(response);
        },
        error: function() {
            // re call ajax
            clearAllTimeOut();
            timeouts.push(setTimeout(function(){pay_parvane(idPerson,id,type,fullName)}, 1200));
        }
    });
    $("#name_pay_parvane").html(fullName);
	
	
	var matn = "پرداخت ";
	matn += type;
	matn += " پروانه";
	$("#type_pay_parvane").html(matn);
	
	$("#txt_parvane_type_pay").val(type);
	
    $("#txt_parvande_numFish_pay").val('');
    $("#txt_parvande_bankFish_pay").val('');
    $("#txt_parvande_mablagh_pay").val('');
    
    $("#btn_pay_parvane_sabt").attr("onclick","pay_parvane_sabt('" + idPerson + "','" + id + "')");
	$("#deny_pay_parvane").attr("onclick","denyNewDarkhast("+idPerson+")");
	
}
function pay_parvane_sabt(idPerson,id){
    
    var check = true;
    var check_kamel = true;
    
    var payType = $("#txt_parvane_type_pay").val();
    var tarikh_pardakht = $("#txt_parvane_tarikh_pay").val();
    var numFish = $("#txt_parvande_numFish_pay").val();
    var bankFish = $("#txt_parvande_bankFish_pay").val();
    var mablagh = $("#txt_parvande_mablagh_pay").val();
    mablagh = mablagh.replaceAll(",", "");

    if(tarikh_pardakht == ''){
        check = false;
		notif_alert_manager('','','',"تاریخ پرداخت خالی است");
    }

    if(check){
        
        if(mablagh == ''){
            check = false;
		    notif_alert_manager('','','',"مبلغ پرداخت خالی است");
		    
        }
        else{
            if(isNaN(mablagh)){
	            check = false;
			    notif_alert_manager('','','',"مبلغ باید عدد باشد");
            }
            else{
    	        if(numFish == ''){
    	            check = false;
				    notif_alert_manager('','','',"شماره فیش خالی است");
    	        }
    	        else{
    	            if(bankFish == ''){
        	            check = false;
					    notif_alert_manager('','','',"نام بانک خالی است");
        	        }
    	        }
            }
        }
    }
    
    if(check){
        
        var tb_year = $("#table_holder").val();
        
        $.ajax({
            url: 'set_pay_parvande_ajaxer.php',
            type: 'post',
            data: {tb_year:tb_year,id:id,payType:payType,tarikh_pardakht:tarikh_pardakht,numFish:numFish,bankFish:bankFish,mablagh:mablagh},
            dataType: 'HTML',
            success: function(response){

		        notif_alert_manager('','','',response);
		    
    		    loadPager('pager_darkhast',idPerson);
		        
            }
        });
    }

}
function loadPager(pagerId,id){
    
    // if(typeof ajaxerPagerEdit !== "undefined")
    //      ajaxerPagerEdit.abort();
    
    $("#pager_info").attr({"onclick":"loadPager('pager_info'," + id + ")"});
    $("#pager_sanad").attr({"onclick":"loadPager('pager_sanad'," + id + ")"});
    $("#pager_map").attr({"onclick":"loadPager('pager_map'," + id + ")"});
    $("#pager_darkhast").attr({"onclick":"loadPager('pager_darkhast'," + id + ")"});

    notif_alert_manager('','','info_edit_alertDialog','');
    
    var obj = $("#" + pagerId);
    
    
    $(".home_pager").removeClass("selected_pager");
    obj.addClass("selected_pager");
    
    if(pagerId == "pager_info"){
        editInfo(id);    
    }
    else if(pagerId == "pager_sanad"){
        loadSanad(id);
    }
    else if(pagerId == "pager_map"){
        loadMap(id);
    }
    else if(pagerId == "pager_darkhast"){
        loadDarkhast(id);
    }
        
    
}
function edit(id){
    loadPager('pager_info',id);
}
function loadSanad(id){
    
    document.getElementById("info_edit_writer").innerHTML = "<br><br><br><center><div class='text'>این بخش در دست طراحی است</div></center>";
    
}
function loadMap(id){
    
    document.getElementById("info_edit_writer").innerHTML = "<div class='loader'></div>";

    var tb_year = $("#table_holder").val();
    
    
	$("document").ready(function(){		

		ajaxerPagerEdit = $.ajax({
			url: 'load_user_map_ajaxer.php',
			type: 'post',
			data: {tb_year:tb_year,id:id},
			dataType: 'HTML',
			success: function(response){

				$("#info_edit_writer").html(response);
				
				var userMapAddress = $("#userMapAddress").val();
				var matn = "تابلو:";
				matn += " " + userMapAddress;
				var userLang = $("#userLang").val();
				var userLat = $("#userLat").val();
				var userLoc = [userLat,userLang];
				
				
				
				
				
    			
    	    	var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    				maxZoom: 18,
    				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    			}),
    			latlng = new L.LatLng(50.5, 30.51);
    
                
				
				var map = L.map('userMap',{
                    maxZoom: 18,
                    minZoom: 10,
                    zoomControl: false,
                    center: latlng, 
                    zoom: 15, 
                    layers: [tiles]
                    
                }).setView(userLoc,16);
                map.flyTo(userLoc, 15);
				
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
        				iconSize:     [23, 56],
        				shadowSize:   [52, 71],
        				iconAnchor:   [12, 55],
        				shadowAnchor: [15, 71],
        				popupAnchor:  [-53, 76],
        				tooltipAnchor:  [10, -26]
        			}
        		});
        	
        	
        		var customIcon = new LeafIcon({iconUrl: 'images/marker.png'});
            	
            	L.marker(userLoc, {icon: customIcon}).bindTooltip(matn,{
            		permanent: true, 
            		direction: 'right'
            	}).addTo(map);
            	
            	//remove leaflet link
            	$('.leaflet-control-attribution').hide();
				
				
			}
			    
		});
	});
    
}

function loadAllMap(){
    
    var tb_year = $("#table_holder").val();

    notif_alert_manager('','','choose_locMap_alertDialog','');

    document.getElementById("choose_locMap_alertDialog").innerHTML = "<div class='loader'></div>";

	$.ajax({
		url: 'load_all_user_map_ajaxer.php',
		type: 'post',
		data: {tb_year:tb_year},
		dataType: 'HTML',
		success: function(response){

			$("#choose_locMap_alertDialog").html(response);
			
			var points = $("#txt_points").val();
			
			
			
	    	var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}),
			latlng = new L.LatLng(50.5, 30.51);

			
			var map = L.map('userMap',{
                maxZoom: 18,
                minZoom: 10,
                zoomControl: false,
                
                center: latlng, 
                zoom: 15, 
                layers: [tiles]
                
            }).setView([35.583010, 53.388148],15);

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
        	
        	var markers = L.markerClusterGroup();

        	var geoJsonLayer = L.geoJSON(JSON.parse(points), {
        		onEachFeature: onEachFeature,
        		pointToLayer: function(feature,latlng){
                  return L.marker(latlng,{icon: customIcon});
                }
        	});
    
    		markers.addLayer(geoJsonLayer);
    
    		map.addLayer(markers);
    		map.fitBounds(markers.getBounds());
        	
        	
        	
        	
        	
        	
        	
        	
        	//remove leaflet link
        	$('.leaflet-control-attribution').hide();
			
			
		},
		error: function() {
            // re call ajax
            clearAllTimeOut();
            timeouts.push(setTimeout(function(){loadAllMap()}, 1200));
        }
			    
	});
    
}
function loadDarkhast(id){

    document.getElementById("info_edit_writer").innerHTML = "<div class='loader'></div>";

    var tb_year = $("#table_holder").val();
    
	$("document").ready(function(){		

		ajaxerPagerEdit = $.ajax({
			url: 'load_darkhast_ajaxer.php',
			type: 'post',
			data: {tb_year:tb_year,id:id},
			dataType: 'HTML',
			success: function(response){

				$("#info_edit_writer").html(response);
				
			}
		});
	});
}
function newDarkhast(id,type){
    
    var tb_year = $("#table_holder").val();
    var table_emsal_holder = $("#table_emsal_holder").val();

    if(tb_year == table_emsal_holder){
        
        
        // set addDarkhast_alertDialog sizes
        if(type == 'enteghal'){
            var height = '435px';
        }
        if(type == 'tamdid'){
            var height = '265px';
        }
        $("#addDarkhast_alertDialog").css({"height":height});
        
		notif_alert_manager('','','addDarkhast_alertDialog','');
		
		$("#addDarkhast_alertDialog").html("<div class='loader'></div>");
		
		$.ajax({
			url: 'load_add_darkhast_ajaxer.php',
			type: 'post',
			data: {id:id,type:type,tb_year:tb_year},
			dataType: 'HTML',
			success: function(response){
			    
			    $("#addDarkhast_alertDialog").html(response);
			    
			    $("#addDr_txt_dateStart").keyup(function() {
                        
                    var tempStart = $(this).val();
                    if(is_date_checker(tempStart)){
                        
                        var bits = tempStart.split('/');
                        var num = parseInt(bits[0]);
                        
                        var tempEnd = (num + 5) + '/' + bits[1] + '/' + bits[2];
                        $("#addDr_txt_dateEnd").val(tempEnd);
                        
                    }
                    else{
                        
                        $("#addDr_txt_dateEnd").val('تاریخ صدور نامعتبر');
                        
                    }
                });
			    
			},
			error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){newDarkhast(id,type)}, 1200));
            }
		});
		
    }
    else{
        notif_alert_manager('','','',"اطلاعات قبلی قابل ویرایش نیست");
    }
}
function loadLastInfoDarkhast(id,type){
    
    var tb_year = $("#table_holder").val();
    var table_emsal_holder = $("#table_emsal_holder").val();

    if(tb_year == table_emsal_holder){
        
        
        // set addDarkhast_alertDialog sizes
        if(type == 'enteghal'){
            var height = '435px';
        }
        if(type == 'tamdid'){
            var height = '265px';
        }
        $("#addDarkhast_alertDialog").css({"height":height});
        
		notif_alert_manager('','','addDarkhast_alertDialog','');
		
		$("#addDarkhast_alertDialog").html("<div class='loader'></div>");
		
		$.ajax({
			url: 'load_darkhast_last_info_ajaxer.php',
			type: 'post',
			data: {id:id,type:type,tb_year:tb_year},
			dataType: 'HTML',
			success: function(response){
			    
			    $("#addDarkhast_alertDialog").html(response);
			    
			},
			error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){newDarkhast(id,type)}, 1200));
            }
		});
		
    }
    else{
        notif_alert_manager('','','',"اطلاعات قبلی قابل ویرایش نیست");
    }
}
function submit_morajee(id,date,idPerson){
    
    var tb_year = $("#table_holder").val();
    
    $.ajax({
		url: 'submit_morajee_ajaxer.php',
		type: 'post',
		data: {id:id,date:date,tb_year:tb_year},
		dataType: 'HTML',
		success: function(response){
		    
		    notif_alert_manager('','','',response);
		    
		    loadPager('pager_darkhast',idPerson);
		    
		},
		error: function() {
            // re call ajax
            clearAllTimeOut();
            timeouts.push(setTimeout(function(){newDarkhast(id,type)}, 1200));
        }
	});
}
function load_morajee(id,idPerson){
    
    notif_alert_manager('','','morajee_alertDialog','');
    
    document.getElementById("morajee_alertDialog").innerHTML = "<div class='loader'></div>";
    
    var tb_year = $("#table_holder").val();
    
    $.ajax({
		url: 'load_morajee_ajaxer.php',
		type: 'post',
		data: {id:id,idPerson:idPerson,tb_year:tb_year},
		dataType: 'HTML',
		success: function(response){
		    
		    $("#morajee_alertDialog").html(response);
		    
		},
		error: function() {
            // re call ajax
            clearAllTimeOut();
            timeouts.push(setTimeout(function(){newDarkhast(id,type)}, 1200));
        }
	});
}
function load_biparvane_info(id){
    
    notif_alert_manager('','','biparvaneInfo_alertDialog','');
    
    document.getElementById("biparvaneInfo_alertDialog").innerHTML = "<div class='loader'></div>";
    
    var tb_year = $("#table_holder").val();
    
    $.ajax({
		url: 'load_biparvane_info_ajaxer.php',
		type: 'post',
		data: {id:id,tb_year:tb_year},
		dataType: 'HTML',
		success: function(response){
		    
		    $("#biparvaneInfo_alertDialog").html(response);
		    
		},
		error: function() {
            // re call ajax
            clearAllTimeOut();
            timeouts.push(setTimeout(function(){newDarkhast(id,type)}, 1200));
        }
	});
    
}
function load_sms_biparvane(id){
    
    notif_alert_manager('','','sms_biparvane_alertDialog','');
    
    document.getElementById("sms_biparvane_alertDialog").innerHTML = "<div class='loader'></div>";
    
    var tb_year = $("#table_holder").val();
    
    $.ajax({
		url: 'load_sms_biparvane_ajaxer.php',
		type: 'post',
		data: {id:id,tb_year:tb_year},
		dataType: 'HTML',
		success: function(response){
		    
		    $("#sms_biparvane_alertDialog").html(response);
		    
		},
		error: function() {
            // re call ajax
            clearAllTimeOut();
            timeouts.push(setTimeout(function(){newDarkhast(id,type)}, 1200));
        }
	});
    
}
function loadEditInfoDarkhast(id,type){
    
    var tb_year = $("#table_holder").val();
    var table_emsal_holder = $("#table_emsal_holder").val();

    if(tb_year == table_emsal_holder){
        
        
        // set addDarkhast_alertDialog sizes
        if(type == 'enteghal'){
            var height = '435px';
        }
        if(type == 'tamdid'){
            var height = '265px';
        }
        $("#addDarkhast_alertDialog").css({"height":height});
        
		notif_alert_manager('','','addDarkhast_alertDialog','');
		
		$("#addDarkhast_alertDialog").html("<div class='loader'></div>");
		
		$.ajax({
			url: 'load_darkhast_edit_info_ajaxer.php',
			type: 'post',
			data: {id:id,type:type,tb_year:tb_year},
			dataType: 'HTML',
			success: function(response){
			    
			    $("#addDarkhast_alertDialog").html(response);
			    
			    $("#addDr_txt_dateStart").keyup(function() {
                        
                    var tempStart = $(this).val();
                    if(is_date_checker(tempStart)){
                        
                        var bits = tempStart.split('/');
                        var num = parseInt(bits[0]);
                        
                        var tempEnd = (num + 5) + '/' + bits[1] + '/' + bits[2];
                        $("#addDr_txt_dateEnd").val(tempEnd);
                        
                    }
                    else{
                        
                        $("#addDr_txt_dateEnd").val('تاریخ صدور نامعتبر');
                        
                    }
                });
			    
			},
			error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){newDarkhast(id,type)}, 1200));
            }
		});
		
    }
    else{
        notif_alert_manager('','','',"اطلاعات قبلی قابل ویرایش نیست");
    }
}
function submitAddDarkhast(id,type){
    
    $("#btn_add_darkhast_submit").removeAttr("onclick");
    
    var check = true;
	var tb_year = $("#table_holder").val();

	var dateStart = $("#addDr_txt_dateStart").val();
	var dateEnd = $("#addDr_txt_dateEnd").val();
	var idsenfi = $("#addDr_txt_idsenfi").val();
	
	if(type == 'enteghal'){
	    var posti = $("#addDr_txt_posti").val();
	    var address = $("#addDr_txt_address").val();
	}
	else{
	    var posti = '';
	    var address = '';
	}
	
	if(check){
	    if((!is_date_checker(dateStart)) && dateStart != ''){
	        check = false;
	        notif_alert_manager('','','','فرمت تاریخ صدور اشتباه است');
	    }
	    else if((!is_date_checker(dateEnd)) && dateEnd != ''){
	        check = false;
	        notif_alert_manager('','','','فرمت تاریخ اتمام اشتباه است');
	    }
	}
	
    if(check){
        
		$.ajax({
			url: 'add_darkhast_ajaxer.php',
			type: 'post',
			data: {tb_year:tb_year,id:id,type:type,dateStart:dateStart,dateEnd:dateEnd,idsenfi:idsenfi,posti:posti,address:address},
			dataType: 'HTML',
			success: function(response){	
			    
			    notif_alert_manager('','','',response);
				
				loadPager('pager_darkhast',id);
        	}
		});
	}
    
}
function submitEditDarkhast(id,idPerson,type){
    
    $("#btn_add_darkhast_submit").removeAttr("onclick");
    
    var check = true;
	var tb_year = $("#table_holder").val();

	var dateStart = $("#addDr_txt_dateStart").val();
	var dateEnd = $("#addDr_txt_dateEnd").val();
	var idsenfi = $("#addDr_txt_idsenfi").val();
	
	if(type == 'enteghal'){
	    var posti = $("#addDr_txt_posti").val();
	    var address = $("#addDr_txt_address").val();
	}
	else{
	    var posti = '';
	    var address = '';
	}
	
	if(check){
	    if((!is_date_checker(dateStart)) && dateStart != ''){
	        check = false;
	        notif_alert_manager('','','','فرمت تاریخ صدور اشتباه است');
	    }
	    else if((!is_date_checker(dateEnd)) && dateEnd != ''){
	        check = false;
	        notif_alert_manager('','','','فرمت تاریخ اتمام اشتباه است');
	    }
	}
	
    if(check){
        
		$.ajax({
			url: 'edit_info_darkhast_ajaxer.php',
			type: 'post',
			data: {tb_year:tb_year,id:id,idPerson:idPerson,type:type,dateStart:dateStart,dateEnd:dateEnd,idsenfi:idsenfi,posti:posti,address:address},
			dataType: 'HTML',
			success: function(response){	
			    
			    notif_alert_manager('','','',response);
				
				loadPager('pager_darkhast',idPerson);
        	}
		});
	}
    
}
function denyNewDarkhast(id){
    
    notif_alert_manager('','1','','درخواست جدید لغو شد');
    loadPager('pager_darkhast',id);
}
function editInfo(id){
    

    document.getElementById("info_edit_writer").innerHTML = "<div class='loader'></div>";

    var tb_year = $("#table_holder").val();
    
	$("document").ready(function(){		
	    
		ajaxerPagerEdit = $.ajax({
			url: 'load_info_ajaxer.php',
			type: 'post',
			data: {tb_year:tb_year,id:id},
			dataType: 'HTML',
			success: function(response){

				$("#info_edit_writer").html(response);
				
				$("#txt_dateStart").keyup(function() {
                        
                    var tempStart = $(this).val();
                    if(is_date_checker(tempStart)){
                        
                        var bits = tempStart.split('/');
                        var num = parseInt(bits[0]);
                        
                        var tempEnd = (num + 5) + '/' + bits[1] + '/' + bits[2];
                        $("#txt_dateEnd").val(tempEnd);
                        
                    }
                    else{
                        
                        $("#txt_dateEnd").val('تاریخ صدور نامعتبر');
                        
                    }
                });
				

				$("#load_info_print").click(function(){
				    
                    $('#setPagePrintSize').html('<style>@page{size:a4 landscape;}</style>');
                    
                    var site_name = $("#siteName").val();

                    $('#print_part_loadInfo').print({
                        prepend : "<center><br><br><div class='text' style='font-size:18pt'>"+site_name+"</div><br><br></center>",
                    });
                   
				    
				});
				

				$(".submit_edit").click(function(){

					var check = true;
					var tb_year = $("#table_holder").val();
	
					var dateStart = $("#txt_dateStart").val();
					var dateOzviat = $("#txt_dateOzviat").val();
        			var dateEnd = $("#txt_dateEnd").val();
        			var idsenfi = $("#txt_idsenfi").val();
					var name = $("#txt_name").val();
        			var family = $("#txt_family").val();
					var father = $("#txt_father").val();
        			var meli = $("#txt_meli").val();
					var numshe = $("#txt_numshe").val();
					var tavalod = $("#txt_tavalod").val();
        			var address = $("#txt_address").val();
					var numPhone = $("#txt_numPhone").val();
					var numSabet = $("#txt_numSabet").val();
					var title = $("#txt_title").val();
        			var posti = $("#txt_posti").val();
					var state = $("#loadinfo_select_edit_state").val();
					var mohlatPardakht = $("#txt_mohlatPardakht").val();
					var numParvande = $("#txt_numParvande").val();
					
					var jensiat = $('#loadinfo_select_jensiat').find(":selected").text();
					var rasteId = $('#loadinfo_select_raste').val();

					if(dateStart == ''){
						check = false;				
					}
					if(dateOzviat == ''){
						check = false;				
					}
					if(dateEnd == ''){
						check = false;				
					}
					if(idsenfi == ''){
						check = false;				
					}
					if(dateStart == ''){
						check = false;				
					}
					if(rasteId == ''){
						check = false;				
					}
					if(name == ''){
						check = false;				
					}
					if(family == ''){
						check = false;				
					}
					if(father == ''){
						check = false;				
					}
					if(meli == ''){
						check = false;				
					}
					if(numshe == ''){
						check = false;				
					}
					if(tavalod == ''){
						check = false;				
					}
					if(address == ''){
						check = false;				
					}
				    if(numPhone == ''){
						check = false;				
					}
					if(numSabet == ''){
						check = false;				
					}
					if(title == ''){
						check = false;				
					}
					if(posti == ''){
						check = false;				
					}
					if(state == ''){
						check = false;				
					}
					if(mohlatPardakht == ''){
						check = false;				
					}
					if(numParvande == ''){
						check = false;				
					}
					
					if(check){
					    if((!is_date_checker(tavalod)) && tavalod != 0){
					        check = false;
					        notif_alert_manager('','','','فرمت تاریخ تولد اشتباه است');
					    }
					}
		            else{
    					notif_alert_manager('','','','بعضی از فیلد ها خالی است');
    				}
    				
				    if(check){
				        
				        // address = codingStrForAjax(address);
				        // dateStart = codingStrForAjax(dateStart);
				        // dateOzviat = codingStrForAjax(dateOzviat);
				        // dateEnd = codingStrForAjax(dateEnd);
				        // idsenfi = codingStrForAjax(idsenfi);
				        // rasteId = codingStrForAjax(rasteId);
				        // name = codingStrForAjax(name);
				        // family = codingStrForAjax(family);
				        // meli = codingStrForAjax(meli);
				        // numshe = codingStrForAjax(numshe);
				        // tavalod = codingStrForAjax(tavalod);
				        // numPhone = codingStrForAjax(numPhone);
				        // numSabet = codingStrForAjax(numSabet);
				        // title = codingStrForAjax(title);
				        // posti = codingStrForAjax(posti);
				        // state = codingStrForAjax(state);
				        // mohlatPardakht = codingStrForAjax(mohlatPardakht);
				        // numParvande = codingStrForAjax(numParvande);
				        // jensiat = codingStrForAjax(jensiat);
				        
				        // tb_year = codingStrForAjax(tb_year);
				        // id = codingStrForAjax(id);
				        
				        //var obj = tb_year:tb_year,id:id,dateStart:dateStart,dateOzviat:dateOzviat,dateEnd:dateEnd,idsenfi:idsenfi,rasteId:rasteId,name:name,family:family,father:father,meli:meli,numshe:numshe,tavalod:tavalod,address:address,numPhone:numPhone,numSabet:numSabet,title:title,posti:posti,state:state,mohlatPardakht:mohlatPardakht,numParvande:numParvande,jensiat:jensiat;
			
				        
				        // let text = '{ "tb_year":"' + tb_year + '","id":"' + id + '","dateStart":"' + dateStart + '","dateOzviat":"' + dateOzviat + '","dateEnd":"' + dateEnd + '",';
				        // text += '"idsenfi":"' + idsenfi + '","rasteId":"' + rasteId + '","name":"' + name + '","family":"' + family + '","father":"' + father + '",';
				        // text += '"meli":"' + meli + '","numshe":"' + numshe + '","tavalod":"' + tavalod + '","address":"' + address + '","numPhone":"' + numPhone + '",';
				        // text += '"numSabet":"' + numSabet + '","title":"' + title + '","posti":"' + posti + '","state":"' + state + '","mohlatPardakht":"' + mohlatPardakht + '",';
				        // text += '"numParvande":"' + numParvande + '","jensiat":"' + jensiat + '"}';
				        // const obj = JSON.parse(text);

    					$.ajax({
    						url: 'editinfo_ajaxer.php',
    						type: 'post',
    						cache: false,
                            contentType: false,
    						data: {tb_year:tb_year,id:id,dateStart:dateStart,dateOzviat:dateOzviat,dateEnd:dateEnd,idsenfi:idsenfi,rasteId:rasteId,name:name,family:family,father:father,meli:meli,numshe:numshe,tavalod:tavalod,address:address,numPhone:numPhone,numSabet:numSabet,title:title,posti:posti,state:state,mohlatPardakht:mohlatPardakht,numParvande:numParvande,jensiat:jensiat},
    						dataType: 'JSON',
    						success : function(response){	
    						    
    						    if(response[0] == 1)
        						    notif_alert_manager('','1','',response[1]);
        						else
        						    notif_alert_manager('','','',response[1]);
        						    
        						refresh_list();
        						
    		            	}
    					});
    					
    					
    					
    					
    					
    					
    					
    				}
    					

				});
			}
		});
	});	
}
function codingStrForAjax(str){
    
    
    var num = 0;
    var newFamily = '';
    $.each(str.split(''), function(i, nome) {
        num = num + 1;
        
        
        
        if(num % 3 == 0)
            newFamily = newFamily + '(*)' + nome;
        else
            newFamily = newFamily + '' + nome;
    });
    
    newFamily = "'" + newFamily + "'";
    return newFamily;
}

function delInfo(str,name,family){
    
    notif_alert_manager('','','delete_alertDialog','');
    
	document.getElementById("delete_alertDialog").innerHTML = "<center><div class='text'><br>آیا مطمعن هستید که میخواهید <br>محصول  "+name+ " " + "را حذف کنید؟</div><div dir='ltr' style='display:inline-flex'><div class='btn btn_submit' onclick='del_submited("+ str +")'><div class='btn_effect'></div><div class='text' style='position:relative;z-index:2'>بله</div></div><div class='btn btn_deny' onclick='deny_delete()'><div class='btn_effect'></div><div class='text'  style='position:relative;z-index:2'>خیر</div></div></div>";
}
function customPrint(id){
    
    notif_alert_manager('','','print_alertDialog','');
    
    document.getElementById("print_alertDialog").innerHTML = "<div class='loader'></div>";
    
    $("document").ready(function(){
        
        var tb_year = $("#table_holder").val();
	
        $.ajax({
        	url: 'load_printinfo_ajaxer.php',
        	type: 'post',
        	data: {tb_year:tb_year,id:id},
        	dataType: 'HTML',
        	success: function(response){
        	    
        	    $("#print_alertDialog").html(response);
        	    
        		$("#close_print_alert").click(function(){
            		notif_alert_manager('','1','','پنجره چاپ بسته شد');
            	});
        	},
        	error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){customPrint(id)}, 1200));
            }
        });
    });
    
}
function DeletePay(id,name,family){
    
    notif_alert_manager('','','delete_pay_alertDialog','');
    
    document.getElementById("delete_pay_alertDialog").innerHTML = "<center><div class='text'><br>آیا مطمعن هستید که میخواهید اطلاعات پرداختی "+name + " " + family + " " + "را حذف کنید؟</div><div dir='ltr' style='display:inline-flex'><div class='btn btn_submit' onclick='del_pay_submited("+ id +")'><div class='btn_effect'></div><div class='text' style='position:relative;z-index:2'>بله</div></div><div class='btn btn_deny' onclick='deny_pay_delete()'><div class='btn_effect'></div><div class='text'  style='position:relative;z-index:2'>خیر</div></div></div>";
    
}
function tasvie_payInfo(id){
	
	notif_alert_manager('','','tasvie_alertDialog','');
	
	document.getElementById("tasvie_alertDialog").innerHTML = "<div class='loader'></div>";
	
	$("document").ready(function(){
	    
	    var tb_year = $("#table_holder").val();
	
        $.ajax({
        	url: 'load_tasvie_ajaxer.php',
        	type: 'post',
        	data: {id:id,tb_year:tb_year},
        	dataType: 'HTML',
        	success: function(response){
        	    
        	    number_seprator();
                
        	    $("#tasvie_alertDialog").html(response);
				$(".rokesh").hide();
				var tedadPage = 1;
				var counter = 1;

    	        var arr_name_check = [];
    	        var arr_numhesab = [];
    	        var arr_num_serialcheck = [];
    	        var arr_mablagh_check = [];
    	        var arr_name_bank = [];
    	        var arr_tarikh_saresid = [];
    	        var jame_mablagh_checka = 0;
				
				$(".toop_page:nth-child("+counter+")").css({"background-color":"var(--mainColor1-color)"});
				
				$("#last_btn").css({"background":"#e6e6e6","border":"1px solid #9e9e9e","cursor":"default"});
				$("#next_btn").css({"background":"#e6e6e6","border":"1px solid #9e9e9e","cursor":"default"});
        	    
        	    
        	    $("#add_check_field").click(function(){


                    // boro be safe akhar        	        
        	        var marginRight = -(tedadPage - 1)*430 + "px";
        	        $("#content_mover").css({"margin-right":marginRight});
        	        if(tedadPage!=1){
            	        $("#last_btn").css({"background":"#99ecff","border":"1px solid var(--mainColor1-color)","cursor":"pointer"});
    			    	$("#next_btn").css({"background":"#e6e6e6","border":"1px solid #9e9e9e","cursor":"default"});        	            
        	        }
			    	$(".toop_page").css({"background-color":"#fafafa"});
        	        $(".toop_page:nth-child("+tedadPage+")").css({"background-color":"var(--mainColor1-color)"});
        	        counter = tedadPage;
        	        
        	        var check_addCheck = true;
        	        
        	        var name_check = $("#txt_tasvie_name_check").val();
        	        var numhesab = $("#txt_tasvie_numhesab").val();
        	        var num_serialcheck = $("#txt_tasvie_num_serialcheck").val();
        	        var mablagh_check = $("#txt_tasvie_mablagh_check").val();
        	        mablagh_check = mablagh_check.replaceAll(",", "");
        	        var name_bank = $("#txt_tasvie_name_bank").val();
        	        var tarikh_saresid = $("#txt_tasvie_tarikh_saresid").val();
        	        
                    if(name_check=='' || numhesab=='' || num_serialcheck=='' || mablagh_check=='' || name_bank=='' || tarikh_saresid==''){
                       
                        notif_alert_manager('','','',"ابتدا همه ی فیلد های چک را پر کنید");
                        
                        check_addCheck = false;
                       
                    }
                    
                    if(check_addCheck){
                        if(isNaN(mablagh_check)){
                            check_addCheck = false;
                         
                            notif_alert_manager('','','',"مبلغ چک باید عدد باشد");
                        }
                    }
        	        
                    if(check_addCheck){
                        
                        arr_name_check[tedadPage - 1] = name_check;
                        arr_numhesab[tedadPage - 1] = numhesab;
                        arr_num_serialcheck[tedadPage - 1] = num_serialcheck;
                        arr_mablagh_check[tedadPage - 1] = mablagh_check;
                        arr_name_bank[tedadPage - 1] = name_bank;
                        arr_tarikh_saresid[tedadPage - 1] = tarikh_saresid;
                        jame_mablagh_checka += parseInt(mablagh_check);
                        
                        $("#txt_tasvie_name_check").prop('disabled', true).removeAttr('id');
                        $("#txt_tasvie_numhesab").prop('disabled', true).removeAttr('id');
                        $("#txt_tasvie_num_serialcheck").prop('disabled', true).removeAttr('id');
                        $("#txt_tasvie_mablagh_check").prop('disabled', true).removeAttr('id');
                        $("#txt_tasvie_name_bank").prop('disabled', true).removeAttr('id');
                        $("#txt_tasvie_tarikh_saresid").prop('disabled', true).removeAttr('id');
                        
                        $("#last_btn").css({"background":"#99ecff","border":"1px solid var(--mainColor1-color)","cursor":"pointer"});
                    	$("#next_btn").css({"background":"#e6e6e6","border":"1px solid #9e9e9e","cursor":"default"});
                        
                        tedadPage++;
                        
                        $(".rokesh").show(0).fadeOut(600);
                    
                        $(".toop_page").css({"background-color":"#fafafa"});
                    
                        $("#toopPage_place").append('<div class="toop_page" style="background-color:var(--mainColor1-color)"></div>');
                        $("#content_mover").append('<div style="margin:5px"><div style="display:inline-flex"><input class="pay_txt" id="txt_tasvie_name_check" placeholder="نام صاحب چک" ><input class="pay_txt" id="txt_tasvie_numhesab" placeholder="شماره حساب"><input class="pay_txt" id="txt_tasvie_name_bank"  placeholder="نام بانک"></div><div class="space"></div><div class="space"></div><div style="display:inline-flex"><input class="pay_txt number-separator" id="txt_tasvie_mablagh_check" placeholder="مبلغ چک"><input class="pay_txt" id="txt_tasvie_num_serialcheck" placeholder="شماره سریال چک"><input class="pay_txt" id="txt_tasvie_tarikh_saresid" placeholder="تاریخ سررسید"></div></div>');
                        
                        $("#txt_tasvie_name_check").val(name_check);
                        $("#txt_tasvie_numhesab").val(numhesab);
                        $("#txt_tasvie_name_bank").val(name_bank);
                    
                        marginRight = -(tedadPage - 1)*430 + "px";
                        $("#content_mover").css({"margin-right":marginRight});
                        
                        counter = tedadPage;
                    }

        	    });
        	    
        	    $("#next_btn").click(function(){
        	        
					if(parseInt(-$("#content_mover").css("width").replace('px', '')) < parseInt($("#content_mover").css("margin-right").replace('px', '') - 430)){ 
					    
					    $("#last_btn").css({"background":"#99ecff","border":"1px solid var(--mainColor1-color)","cursor":"pointer"});
						counter++;
						
						$(".rokesh").show(0).fadeOut(600);
						
						
						$(".toop_page").css({"background-color":"#fafafa"});
						$(".toop_page:nth-child("+counter+")").css({"background-color":"var(--mainColor1-color)"});
						
						var marginRight = parseInt($("#content_mover").css("margin-right").replace('px', '')) - 430 + "px";
					    $("#content_mover").css({"margin-right":marginRight});
					    
					    if(counter==tedadPage){
					        $("#next_btn").css({"background":"#e6e6e6","border":"1px solid #9e9e9e","cursor":"default"});
					    }
        	        }
        	        
        	    });
				
				$("#last_btn").click(function(){

					$(".rokesh").show(0).fadeOut(600);
					
					$("#last_btn").animate({"pointer-events":"none"});
					
					if(parseInt($("#content_mover").css("margin-right").replace('px', '')) < 0){ 
					    
					    $("#next_btn").css({"background":"#99ecff","border":"1px solid var(--mainColor1-color)","cursor":"pointer"});
						counter--;
					
						$(".toop_page").css({"background-color":"#fafafa"});
						$(".toop_page:nth-child("+counter+")").css({"background-color":"var(--mainColor1-color)"});
						
					
						var marginRight = parseInt($("#content_mover").css("margin-right").replace('px', '')) + 430 + "px";
						$("#content_mover").css({"margin-right":marginRight});
						
						if(counter==1){
					        $("#last_btn").css({"background":"#e6e6e6","border":"1px solid #9e9e9e","cursor":"default"});
					    }
					}

        	    });
        	    
        	    $("#btn_tasvie_sabt").click(function(){
        	        
        	        var disvaler = $("#txt_tasvie_disbler").val();
        	        
        	        if(disvaler == '1'){
        	        
            	        var check = true;
            	        var check_kamel = true;
            	        
            	        var tarikh_pardakht = $("#txt_tasvie_tarikh_pardakht").val();
            	        var takhfif = $("#txt_tasvie_takhfif").val();
            	        takhfif = takhfif.replaceAll(",", "");
            	        
            	        var numFish = $("#txt_tasvie_numFish").val();
            	        var bankFish = $("#txt_tasvie_bankFish").val();
            	        var mablagh_nv = $("#txt_tasvie_mablagh_nv").val();
            	        mablagh_nv = mablagh_nv.replaceAll(",", "");
            	        
            	        var name_check = $("#txt_tasvie_name_check").val();
            	        var numhesab = $("#txt_tasvie_numhesab").val();
            	        var num_serialcheck = $("#txt_tasvie_num_serialcheck").val();
            	        var mablagh_check = $("#txt_tasvie_mablagh_check").val();
            	        mablagh_check = mablagh_check.replaceAll(",", "");
            	        var name_bank = $("#txt_tasvie_name_bank").val();
            	        var tarikh_saresid = $("#txt_tasvie_tarikh_saresid").val();
            	        
            	        
            	        if(tarikh_pardakht == ''){
            	            
            	            check = false;
                            notif_alert_manager('','','',"تاریخ پرداخت خالی است");
            	        }
    
                        if(check){
                	        if(mablagh_nv != ''){
                    	        if(numFish == ''){
                    	            
                    	            check = false;
                    	            notif_alert_manager('','','',"فیلد های واریز/نقدی کامل نیست");
                    	        }
                    	        else{
                    	            if(bankFish == ''){
                    	                
                        	            check = false;
                        	            notif_alert_manager('','','',"فیلد های واریز/نقدی کامل نیست");
                        	        }
                    	        }
                	        }
                        }
            	        
            	        if(check){
                	        if(mablagh_check != ''){
                    	        if(name_check == ''){
                    	            check = false;
                    	        }
                    	        if(numhesab == ''){
                    	            check = false;
                    	        }
                    	        if(num_serialcheck == ''){
                    	            check = false;
                    	        }
            
                    	        if(name_bank == ''){
                    	            check = false;
                    	        }
                    	        if(tarikh_saresid == ''){
                    	            check = false;
                    	        }
                    	        
                    	        if(!check){
                    	            notif_alert_manager('','','',"فیلد های چک کامل نیست");
                                }
                	        }
            	        }
            	        
                        if(check){
                            if(mablagh_check!=''){
                    	        if(isNaN(mablagh_check)){
                    	            check = false;
                    	        }
                            }
                            else{
                                mablagh_check = 0;
                                        
                                var name_check = '';
                    	        var numhesab = '';
                    	        var num_serialcheck = '';
                    	        var name_bank = '';
                    	        var tarikh_saresid = '';
                                        
                                
                    	        $("#txt_tasvie_numhesab").val('');
                    	        $("#txt_tasvie_num_serialcheck").val('');
                    	        $("#txt_tasvie_name_bank").val('');
                    	        $("#txt_tasvie_tarikh_saresid").val('');
                            }
                            
                	        if(takhfif!=''){
                    	        if(isNaN(takhfif)){
                    	            check = false;
                    	        }
                	        }
                	        else{
                	            takhfif = 0;
                	            $("#txt_tasvie_takhfif").val('');
                	        }
                    	        
                	        if(mablagh_nv!=''){
                    	        if(isNaN(mablagh_nv)){
                    	            check = false;
                    	        }
                	        }
                	        else{
                	            
                	            mablagh_nv = 0;
                	            
                	            var numFish = '';
                	            $("#txt_tasvie_numFish").val('');
    
                	        }
                	        
                    	    if(!check){
                    	        notif_alert_manager('','','',"مبلغ باید عدد باشد");
                            }
                        }
                	        
            	        if(check){
                            var bedehi_kol = $("#txt_tasvie_bedehi_kol").val();
                            
                            var jamekol_pardakht = parseInt(mablagh_check) + parseInt(jame_mablagh_checka) + parseInt(mablagh_nv) + parseInt(takhfif);
                            
                            if(parseInt(bedehi_kol) != jamekol_pardakht){
                                
                                check = false;
                                
                                if(parseInt(jamekol_pardakht) > parseInt(bedehi_kol)){
                                    
                                    var ekhtelaf = parseInt(jamekol_pardakht) - parseInt(bedehi_kol);
                                    var matn = 'پرداختی باید ';
                                    matn += addComma(ekhtelaf.toString());
                                    matn += ' ';
                                    matn += 'ریال کمتر باشد';
                                    
                                    notif_alert_manager('','','',matn);
                                    
                                }
                                else{
                                    
                                    var ekhtelaf = parseInt(bedehi_kol) - parseInt(jamekol_pardakht);
                                    
                                    var matn = 'پرداختی باید ';
                                    matn += addComma(ekhtelaf.toString());
                                    matn += ' ';
                                    matn += 'ریال بیشتر باشد';
                                    
                                    notif_alert_manager('','','',matn);
                                    
                                }
        					    
        					    $("#notification").animate({"top":"80px","width":"220px"},250).delay(1100).animate({"top":"-90px","width":"0px"},150);
        					    
                            }
                        }
            	        
            	        if(check){
            	            
            	            $("#txt_tasvie_disbler").val('0');
            	            
            	            var tb_year = $("#table_holder").val();
            	            
            	            arr_name_check[tedadPage - 1] = name_check;
            	            arr_numhesab[tedadPage - 1] = numhesab;
            	            arr_num_serialcheck[tedadPage - 1] = num_serialcheck;
            	            arr_mablagh_check[tedadPage - 1] = mablagh_check;
            	            arr_name_bank[tedadPage - 1] = name_bank;
            	            arr_tarikh_saresid[tedadPage - 1] = tarikh_saresid;
            	            
            	            $.ajax({
                                url: 'set_tasvie_ajaxer.php',
                                type: 'post',
                                data: {tb_year:tb_year,id:id,bedehi_kol:bedehi_kol,tarikh_pardakht:tarikh_pardakht,numFish:numFish,bankFish:bankFish,mablagh_nv:mablagh_nv,arr_name_check:arr_name_check,arr_numhesab:arr_numhesab,arr_num_serialcheck:arr_num_serialcheck,arr_mablagh_check:arr_mablagh_check,arr_name_bank:arr_name_bank,arr_tarikh_saresid:arr_tarikh_saresid,takhfif:takhfif},
                                dataType: 'HTML',
                                success: function(response){
                                    
        					        notif_alert_manager('','1','',response);
                        		    refresh_list();
                        		    
                    				
        					        
                                },
                                error: function() {
                                    // re call ajax
                                    clearAllTimeOut();
                                    timeouts.push(setTimeout(function(){tasvie_payInfo(id)}, 1200));
                                }
            	            });
            	        }
        	        }
        	    });
        	}
        });
    

	});

}
function alhesab_payInfo(id,payType){
	
	notif_alert_manager('','','alhesab_alertDialog','');
	
	document.getElementById("alhesab_alertDialog").innerHTML = "<div class='loader'></div>";
	
	$("document").ready(function(){
	    
	    var tb_year = $("#table_holder").val();
	
        $.ajax({
        	url: 'load_alhesab_ajaxer.php',
        	type: 'post',
        	data: {id:id,tb_year:tb_year,payType:payType},
        	dataType: 'HTML',
        	success: function(response){

        	    $("#alhesab_alertDialog").html(response);
        	    number_seprator();
        	    
        	},
        	error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){alhesab_payInfo(id,payType)}, 1200));
            }
        });
    

	});

}
function submit_alhesab(id,payType){
    
    var check = true;
    var check_kamel = true;
    
    var tarikh_pardakht = $("#txt_alhesab_tarikh_pardakht").val();
    
    
    var numFish = '';
    var bankFish = '';
    var mablagh_nv = '';
    
    var name_check = '';
    var numhesab = '';
    var num_serialcheck = '';
    var mablagh_check = '';
    var name_bank = '';
    var tarikh_saresid = '';
    
    if(payType == "naghd"){
    
        var numFish = $("#txt_alhesab_numFish").val();
        var bankFish = $("#txt_alhesab_bankFish").val();
        var mablagh_nv = $("#txt_alhesab_mablagh_nv").val();
        mablagh_nv = mablagh_nv.replaceAll(",", "");
    }
    
    if(payType == "check"){
        var name_check = $("#txt_alhesab_name_check").val();
        var numhesab = $("#txt_alhesab_numhesab").val();
        var num_serialcheck = $("#txt_alhesab_num_serialcheck").val();
        var mablagh_check = $("#txt_alhesab_mablagh_check").val();
        mablagh_check = mablagh_check.replaceAll(",", "");
        var name_bank = $("#txt_alhesab_name_bank").val();
        var tarikh_saresid = $("#txt_alhesab_tarikh_saresid").val();
    }
    
    if(tarikh_pardakht == ''){
        
        check = false;
        notif_alert_manager('','','',"تاریخ پرداخت خالی است");
    }

    if(check){
        if(payType == "naghd"){
	        if(mablagh_nv == ''){
	            
	            check = false;
	            notif_alert_manager('','','',"مبلغ نقدی خالی است");
			    
	        }
	        else{
	            if(isNaN(mablagh_nv)){
    	            
    	            check = false;
    	            notif_alert_manager('','','',"مبلغ باید عدد باشد");
                }
                else{
        	        if(numFish == ''){
        	            
        	            check = false;
        	            notif_alert_manager('','','',"شماره فیش خالی است");
        	        }
        	        else{
        	            if(bankFish == ''){
            	            
            	            check = false;
            	            notif_alert_manager('','','',"نام بانک خالی است");
            	        }
        	        }
                }
	        }
        }
    }
    
    if(check){
        if(payType == "check"){
	        if(mablagh_check == ''){
	            
	            check = false;
	            notif_alert_manager('','','',"مبلغ چک خالی است");
			   
	        }
	        else{
	            if(isNaN(mablagh_nv)){
    	            
    	            check = false;
    	            notif_alert_manager('','','',"مبلغ باید عدد باشد");
                }
                else{
        	        if(name_check == ''){
        	            check = false;
        	        }
        	        if(numhesab == ''){
        	            check = false;
        	        }
        	        if(num_serialcheck == ''){
        	            check = false;
        	        }

        	        if(name_bank == ''){
        	            check = false;
        	        }
        	        if(tarikh_saresid == ''){
        	            check = false;
        	        }
        	        
        	        if(!check){
        	            notif_alert_manager('','','',"فیلد های چک کامل نیست");
                    }
                }
	        }
        }
    }
    
        
    if(check){
        var bedehi_kol = $("#txt_alhesab_bedehi_kol").val();
        
        if(payType == "check")
            var jamekol_pardakht = parseInt(mablagh_check);
            
        if(payType == "naghd")
            var jamekol_pardakht = parseInt(mablagh_nv);
        
        
        if(parseInt(bedehi_kol) == jamekol_pardakht){
            
            check = false;
            notif_alert_manager('','','','پرداختی باید از بدهی کمتر باشد');
            
        }
    }
    
    if(check){
        
        $("#btn_alheasb_sabt").removeAttr("onclick");
        
        var tb_year = $("#table_holder").val();
        
        $.ajax({
            url: 'set_alhesab_ajaxer.php',
            type: 'post',
            data: {tb_year:tb_year,id:id,bedehi_kol:bedehi_kol,payType:payType,tarikh_pardakht:tarikh_pardakht,numFish:numFish,bankFish:bankFish,mablagh_nv:mablagh_nv,name_check:name_check,numhesab:numhesab,num_serialcheck:num_serialcheck,mablagh_check:mablagh_check,name_bank:name_bank,tarikh_saresid:tarikh_saresid},
            dataType: 'HTML',
            success: function(response){
                
		        notif_alert_manager('','1','',response);
    		    refresh_list();
            },
            error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){submit_alhesab(id,payType)}, 1200));
            }
        });
    }

}
function addComma(str) {

	var objRegex = new RegExp( '(-?[0-9]+)([0-9]{3})' );
 
	while( objRegex.test( str ) ) {
		str = str.replace( objRegex, '$1,$2' );
	}
	return str;
}
function del_pay_submited(id){
    
    $("document").ready(function(){	
        
        var saved_pass = $("#saved_pass").val();
        
        $.ajax({
            url: 'remove_paydata_ajaxer.php',
            type: 'post',
            data: {id:id,saved_pass:saved_pass},
            dataType: 'HTML',
            success: function(response){

                notif_alert_manager('','1','',response);
    		    refresh_list();
            },
            error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){del_pay_submited(id)}, 1200));
            }
        });
    });
    
}

function deny_pay_delete(){
	
	notif_alert_manager('','1','','حذف پرداخت لغو شد');
	
}
function deny_add_maghaze(){
	
	notif_alert_manager('','1','','اضافه کردن کاربر لغو شد');
	
}
function deny_delete(){
	
	notif_alert_manager('','1','','حذف لغو شد');
	
}
function deny_fish_mantaghe(){
	
	notif_alert_manager('','1','','چاپ منطقه ای لغو شد');
}
function deny_mali_mantaghe(){
    
	notif_alert_manager('','1','','گزارش منطقه ای لغو شد');
}
function deny_baze(){
	notif_alert_manager('','1','','چاپ بازه ای لغو شد');
}
function deny_mali_baze(){
	notif_alert_manager('','1','','گزارش بازه ای لغو شد');
}
function deny_pay(){
	
	notif_alert_manager('','1','','پرداخت لغو شد');
}
function deny_changePass(){
	$("document").ready(function(){
	    var last_pass = $("#txt_lPass").val('');
        var n_pass = $("#txt_nPass").val('');
        var t_n_pass = $("#txt_tnPass").val('');
        
		notif_alert_manager('','1','','تغییر رمز ورودی لغو شد');
	});
}
function deny_mohlat(){
	
	notif_alert_manager('','1','','تغییر مهلت لغو شد');

}
function deny_add(){
	
	notif_alert_manager('','1','','تغییر بدهی لغو شد');
}
function submit_mohlat(){
    $("document").ready(function(){
    
        var tb_year = $("#table_holder").val();
    
        var mohlat = $("#txt_mohlat").val();
        
        $.ajax({
        	url: 'set_mohlat_ajaxer.php',
        	type: 'post',
        	data: {tb_year:tb_year,mohlat:mohlat},
        	dataType: 'HTML',
        	success: function(response){
        	    
            	notif_alert_manager('','1','',response);
            },
            error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){submit_mohlat()}, 1200));
            }
        });
    });
    
}
function submit_add_maghaze(){
    $("document").ready(function(){
        var check = true;
		
		var tb_year = $("#table_holder").val();
		
		var mapAddress = $("#add_txt_holder_mapAddress").val();
		var lat = $("#add_txt_holder_lat").val();
		var lang = $("#add_txt_holder_lang").val();
					
	    var dateStart = $("#add_txt_dateStart").val();
	    var dateOzviat = $("#add_txt_dateOzviat").val();
		var dateEnd = $("#add_txt_dateEnd").val();
		var idsenfi = $("#add_txt_idsenfi").val();
		var name = $("#add_txt_name").val();
		var family = $("#add_txt_family").val();
		var father = $("#add_txt_father").val();
		var meli = $("#add_txt_meli").val();
		var numshe = $("#add_txt_numshe").val();
		var tavalod = $("#add_txt_tavalod").val();
		var address = $("#add_txt_address").val();
		var numPhone = $("#add_txt_numPhone").val();
		var numSabet = $("#add_txt_numSabet").val();
		var title = $("#add_txt_title").val();
		var posti = $("#add_txt_posti").val();
		var state = $("#add_select_edit_state").val();
		var mohlatPardakht = $("#add_txt_mohlatPardakht").val();
		var numParvande = $("#add_txt_numParvande").val();
		
		var jensiat = $('#add_select_jensiat').find(":selected").text();
		var rasteId = $('#add_select_raste').val();
		
		if(dateStart == ''){
			check = false;				
		}
		if(dateOzviat == ''){
			check = false;				
		}
		if(dateEnd == ''){
			check = false;				
		}
		if(idsenfi == ''){
			check = false;				
		}
		if(dateStart == ''){
			check = false;				
		}
		if(rasteId == 'khali'){
			check = false;				
		}
		if(name == ''){
			check = false;				
		}
		if(family == ''){
			check = false;				
		}
		if(father == ''){
			check = false;				
		}
		if(meli == ''){
			check = false;				
		}
		if(numshe == ''){
			check = false;				
		}
		if(tavalod == ''){
			check = false;				
		}
		if(address == ''){
			check = false;				
		}
	    if(numPhone == ''){
			check = false;				
		}
		if(numSabet == ''){
			check = false;				
		}
		if(title == ''){
			check = false;				
		}
		if(posti == ''){
			check = false;				
		}
		if(state == ''){
			check = false;				
		}
		if(mohlatPardakht == ''){
			check = false;				
		}
		if(numParvande == ''){
			check = false;				
		}
		
		if(check){
		    if((!is_date_checker(tavalod)) && tavalod != 0){
		        check = false;
		        notif_alert_manager('','','','فرمت تاریخ تولد اشتباه است');
		    }
		}
        else{
			notif_alert_manager('','','','بعضی از فیلد ها خالی است');
		}

	    if(check==true){
	        
			$.ajax({
			    url: 'add_user_ajaxer.php',
				type: 'post',
				cache: false,
                contentType: false,
				data: {tb_year:tb_year,mapAddress:mapAddress,lat:lat,lang:lang,dateStart:dateStart,dateOzviat:dateOzviat,dateEnd:dateEnd,idsenfi:idsenfi,rasteId:rasteId,name:name,family:family,father:father,meli:meli,numshe:numshe,tavalod:tavalod,address:address,numPhone:numPhone,numSabet:numSabet,title:title,posti:posti,state:state,mohlatPardakht:mohlatPardakht,numParvande:numParvande,jensiat:jensiat},
				dataType: 'HTML',
				success: function(response){
				    
				    
				    

					notif_alert_manager('','1','',response);
					
            	},
                error: function() {
                    // re call ajax
                    clearAllTimeOut();
                    timeouts.push(setTimeout(function(){submit_add_maghaze()}, 1200));
                }
			});
		}
    
    });
}

function submit_add(){
    $("document").ready(function(){
    
        var bedehi_jadid = $("#txt_change_jari").val();
        var tb_year = $("#table_holder").val();
        
        
        $.ajax({
        	url: 'change_bedehijari_ajaxer.php',
        	type: 'post',
        	data: {tb_year:tb_year,bedehi_jadid:bedehi_jadid},
        	dataType: 'HTML',
        	success: function(response){

            	
            	notif_alert_manager('','1','',response);
            },
            error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){submit_add()}, 1200));
            }
        });
    });
    
}
function denyEditMap(id){
    notif_alert_manager('','1','','ویرایش نقشه لغو شد');
    loadPager('pager_map',id);
}
function submitMap(id,mapAddress,userLat,userLang){
    
    var tb_year = $("#table_holder").val();

	$.ajax({
		url: 'submit_map_loc_ajaxer.php',
		type: 'post',
		data: {tb_year:tb_year,id:id,mapAddress:mapAddress,userLat:userLat,userLang:userLang},
		dataType: 'HTML',
		success: function(response){
		    
		    notif_alert_manager('','1','',response);
		    loadPager('pager_map',id);
		}
	});
    
    
}
function ChooseMapAddress(){
    notif_alert_manager('','','choose_locMap_alertDialog','');
    
    document.getElementById("choose_locMap_alertDialog").innerHTML = "<div class='loader'></div>";

    var tb_year = $("#table_holder").val();

	$.ajax({
		url: 'load_user_map_ajaxer.php',
		type: 'post',
		data: {tb_year:tb_year},
		dataType: 'HTML',
		success: function(response){

			$("#choose_locMap_alertDialog").html(response);
			var userLang = $("#userLang").val();
			var userLat = $("#userLat").val();
			var userMapAddress = $("#userMapAddress").val();
			var userLoc = [userLat,userLang];
			
			$("#denyMap").attr({"onclick":"notif_alert_manager('','1','','اضافه کردن کاربر لغو شد');"});
            $("#denyMap .text").html("لغو");		
            
            $("#submitMap").attr({"onclick":"addUserAlert('" + userMapAddress + "','" + userLat + "','" + userLang + "')"});
            $("#submitMap .text").html("ادامه");		
            
			$("#userMap").html('<div style="position:absolute;z-index:500;left:50%;top:50%;transform:translate(-50%, -100%)"><img src="images/marker.png" width="23px" height="55px"></div>');
			
			
			
			
    			
	    	var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}),
			latlng = new L.LatLng(50.5, 30.51);

            
			
			var map = L.map('userMap',{
                maxZoom: 18,
                minZoom: 10,
                zoomControl: false,
                center: latlng, 
                zoom: 15, 
                layers: [tiles]
                
            }).setView(userLoc,16);
            map.flyTo(userLoc, 15);

        
        	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        		maxZoom: 18,
        		id: 'mapbox/light-v9',
        		tileSize: 512,
        		zoomOffset: -1,
        	}).addTo(map);
        	
        	L.control.zoom({
                position: 'bottomright'
            }).addTo(map);
        	
        	onDrag();
        
        	map.on('moveend', function(e) {
        	   onDrag();
        	});
        	
        	map.on('move', function(e) {
        	   clear();
        	});
        	map.on('zoomstart', function(e) {
        	   clear();
        	});
        	
        	function clear(){
        	
        		$(".leaflet-marker-icon").remove();
        		$(".leaflet-marker-shadow").remove();
        		$(".leaflet-popup").remove();
        		$(".leaflet-tooltip").remove();
        		$('.leaflet-control-attribution').hide()
        	
        	}
        	
        	function onDrag(){
        	    

        		var LeafIcon = L.Icon.extend({
        		options: {
        				shadowUrl: 'images/marker-shadow.png',
        				iconSize:     [23, 56],
        				shadowSize:   [52, 71],
        				iconAnchor:   [12, 55],
        				shadowAnchor: [15, 71],
        				popupAnchor:  [-53, 76],
        				tooltipAnchor:  [10, -26]
        			}
        		});
        	
        	
        		var customIcon = new LeafIcon({iconUrl: 'images/transparent.png'});
        		
        		clear();
        		
        		selectedLoc = L.latLng(map.getCenter());
        		
        		var mapKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQxZWU0MzllM2MwZGZhMjUwNjM2NzM5YTAwZmYyM2M0MjU0ODg4ZTM3YmJiNzc1ZGUxMDA1MmE4MTk4MGQyMTEyOGY5NWFhNmVlNTFkZTZjIn0.eyJhdWQiOiIxMjM2MCIsImp0aSI6IjQxZWU0MzllM2MwZGZhMjUwNjM2NzM5YTAwZmYyM2M0MjU0ODg4ZTM3YmJiNzc1ZGUxMDA1MmE4MTk4MGQyMTEyOGY5NWFhNmVlNTFkZTZjIiwiaWF0IjoxNjEwNjE0ODgxLCJuYmYiOjE2MTA2MTQ4ODEsImV4cCI6MTYxMzEyMDQ4MSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.BGcTiwsrpMNVepLB6RjLxeIPklna5zM1AEe6Kqv9L6eYYwevPIrSI1E-zU-Pk_9nbG6r3f2GH-fEAKYBGgfFD_v9M9eK9UdAHuT5I9qs3S333kGYYfy1cKJQpkaUi-PWH9TQYRO6FJS0D56CCz04xEI51qc8-rJm7VyQuarDkARXmv1Q5PfVrroju_GGkMg6IzJX3PUD9X1aKuQvXm2X8V1LV34M0FMFOZlvWrDtoRQirqW4a_Q76TSbVJrl2wdJGgZZYkvGl4cE_HCaljNmAb_7hdVc-UG8tTxE6MzHQQNF2gk6Eg9WvvAYQ7dN7tM92ac7ja9SQUxNFEFqAoTT3A';
            	var matn = "مکان واحد صنفی";

            	$.ajax({
            		url: 'https://map.ir/fast-reverse',
            		data: {'x-api-key':mapKey,lat:selectedLoc.lat,lon:selectedLoc.lng},
            		type: "GET",			
            		dataType: 'json',
            		success: function(response){
            		    
            			matn = '<div class="toolTipText">' + response.address + '</div>';
            			$("#submitMap").attr({"onclick":"addUserAlert('" + response.address + "','" + selectedLoc.lat  + "','" + selectedLoc.lng + "')"});
        				
                		L.marker(selectedLoc,{icon: customIcon}).bindTooltip(matn,{
                			permanent: true, 
                			direction: 'right'
                		}).addTo(map);
            		},
            		error: function() {
            			alert('nope');
            		}
            			
            	});
            	
        		
        		
        	}
		}
		    
	});
}
function editMap(id,lat,lang,type){
    
    
    notif_alert_manager('','','choose_locMap_alertDialog','');
    
    document.getElementById("choose_locMap_alertDialog").innerHTML = "<div class='loader'></div>";

    var tb_year = $("#table_holder").val();

	$.ajax({
		url: 'load_user_map_ajaxer.php',
		type: 'post',
		data: {tb_year:tb_year,id:id},
		dataType: 'HTML',
		success: function(response){

			$("#choose_locMap_alertDialog").html(response);
			var userLang = $("#userLang").val();
			var userLat = $("#userLat").val();
			var userLoc = [userLat,userLang];
			
			$("#denyMap").attr({"onclick":"denyEditMap('" + id + "')"});
            $("#denyMap .text").html("لغو و بازگشت");		
            
            $("#submitMap").attr({"onclick":"submitMap('" + id + "','" + userLat + "','" + userLang + "')"});
            $("#submitMap .text").html("ثبت");		
            
			$("#userMap").html('<div style="position:absolute;z-index:500;left:50%;top:50%;transform:translate(-50%, -100%)"><img src="images/marker.png" width="23px" height="55px"></div>');
			
			
		
			
	    	var tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
				maxZoom: 18,
				attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
			}),
			latlng = new L.LatLng(50.5, 30.51);

            
			
			var map = L.map('userMap',{
                maxZoom: 18,
                minZoom: 10,
                zoomControl: false,
                center: latlng, 
                zoom: 15, 
                layers: [tiles]
                
            }).setView(userLoc,16);
            map.flyTo(userLoc, 15);
        
        	L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
        		maxZoom: 18,
        		id: 'mapbox/light-v9',
        		tileSize: 512,
        		zoomOffset: -1,
        	}).addTo(map);
        	
        	L.control.zoom({
                position: 'bottomright'
            }).addTo(map);
        	
        	onDrag();
        
        	map.on('moveend', function(e) {
        	   onDrag();
        	});
        	
        	map.on('move', function(e) {
        	   clear();
        	});
        	map.on('zoomstart', function(e) {
        	   clear();
        	});
        	
        	function clear(){
        	
        		$(".leaflet-marker-icon").remove();
        		$(".leaflet-marker-shadow").remove();
        		$(".leaflet-popup").remove();
        		$(".leaflet-tooltip").remove();
        		$('.leaflet-control-attribution').hide()
        	
        	}
        	
        	function onDrag(){
        	    

        		var LeafIcon = L.Icon.extend({
        		options: {
        				shadowUrl: 'images/marker-shadow.png',
        				iconSize:     [23, 56],
        				shadowSize:   [52, 71],
        				iconAnchor:   [12, 55],
        				shadowAnchor: [15, 71],
        				popupAnchor:  [-53, 76],
        				tooltipAnchor:  [10, -26]
        			}
        		});
        	
        	
        		var customIcon = new LeafIcon({iconUrl: 'images/transparent.png'});
        		
        		clear();
        		
        		selectedLoc = L.latLng(map.getCenter());
        		
        		var mapKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjQxZWU0MzllM2MwZGZhMjUwNjM2NzM5YTAwZmYyM2M0MjU0ODg4ZTM3YmJiNzc1ZGUxMDA1MmE4MTk4MGQyMTEyOGY5NWFhNmVlNTFkZTZjIn0.eyJhdWQiOiIxMjM2MCIsImp0aSI6IjQxZWU0MzllM2MwZGZhMjUwNjM2NzM5YTAwZmYyM2M0MjU0ODg4ZTM3YmJiNzc1ZGUxMDA1MmE4MTk4MGQyMTEyOGY5NWFhNmVlNTFkZTZjIiwiaWF0IjoxNjEwNjE0ODgxLCJuYmYiOjE2MTA2MTQ4ODEsImV4cCI6MTYxMzEyMDQ4MSwic3ViIjoiIiwic2NvcGVzIjpbImJhc2ljIl19.BGcTiwsrpMNVepLB6RjLxeIPklna5zM1AEe6Kqv9L6eYYwevPIrSI1E-zU-Pk_9nbG6r3f2GH-fEAKYBGgfFD_v9M9eK9UdAHuT5I9qs3S333kGYYfy1cKJQpkaUi-PWH9TQYRO6FJS0D56CCz04xEI51qc8-rJm7VyQuarDkARXmv1Q5PfVrroju_GGkMg6IzJX3PUD9X1aKuQvXm2X8V1LV34M0FMFOZlvWrDtoRQirqW4a_Q76TSbVJrl2wdJGgZZYkvGl4cE_HCaljNmAb_7hdVc-UG8tTxE6MzHQQNF2gk6Eg9WvvAYQ7dN7tM92ac7ja9SQUxNFEFqAoTT3A';
            	var matn = "مکان واحد صنفی";

            	$.ajax({
            		url: 'https://map.ir/fast-reverse',
            		data: {'x-api-key':mapKey,lat:selectedLoc.lat,lon:selectedLoc.lng},
            		type: "GET",			
            		dataType: 'json',
            		success: function(response){
            		    
            			matn = '<div class="toolTipText">' + response.address + '</div>';
            			$("#submitMap").attr({"onclick":"submitMap('" + id + "','" + response.address + "','" + selectedLoc.lat  + "','" + selectedLoc.lng + "')"});
        				
                		L.marker(selectedLoc,{icon: customIcon}).bindTooltip(matn,{
                			permanent: true, 
                			direction: 'right'
                		}).addTo(map);
            		},
            		error: function() {
            			alert('nope');
            		}
            			
            	});
            	
        		
        		
        	}
		}
		    
	});
}

function search_pak(type){
    
    $("document").ready(function(){
        $('#search_select_namayesh').val('1');
        $('#search_select_pardakht').val('1');
        
    
    	$("#search_parvande").val('');
    	$("#search_name").val('');
      	$("#search_family").val('');
      	$("#search_idsenfi").val('');
    	$("#search_meli").val('');
    	$("#search_title").val('');
    	$("#search_phone").val('');
    	$("#search_raste").val('');
    	$("#search_address").val('');
    	
    	$("#search_BankFish").val('');
    	$("#search_NumFish").val('');
        $("#search_numHesab").val('');
        $("#search_bankCheck").val('');
        $("#search_SahebHesab").val('');
        $("#search_dateSarresid").val('');
        $("#search_numSerial").val('');

    	
    	$("#page_holder").val(1);
    	$("#text_numPage").html(1);

        $("#search_part1 *").removeAttr("tabindex");
        $("#search_part2 *").attr({"tabindex":"-1"});
        
        $("#search_part2").css({"transform":"scaleY(0)","z-index":"1"});
        $("#search_part1").css({"transform":"scaleY(1)","z-index":"5"});
        $("#search_part2").attr({"state":"close"})
        $("#search_part1").attr({"state":"open"})
        
        $("#change_search").attr({"title":"جستجوی مالی"});
        
    	
    	if(type == "needRefresh"){
        	refresh_list();
        	notif_alert_manager('','','',"نمایش همه اطلاعات");
    	}
    	
    });
}


function refresh_list(){
    
    
    
    $("document").ready(function(){
        

        var tb_year = $("#table_holder").val();
        var page_holder = $("#page_holder").val();
        
        var s_select_namayesh = $('#search_select_namayesh').val();
        var s_select_pardakht = $('#search_select_pardakht').val();
        
        var s_parvande = $("#search_parvande").val();
		var s_name = $("#search_name").val();
  		var s_family = $("#search_family").val();
  		var s_idsenfi = $("#search_idsenfi").val();
    	var s_meli = $("#search_meli").val();
		var s_title= $("#search_title").val();
		var s_phone = $("#search_phone").val();
		var s_raste= $("#search_raste").val();
		var s_address= $("#search_address").val();
        var saved_pass = $("#saved_pass").val();
        
        var s_NumFish = $("#search_NumFish").val();
        var s_BankFish = $("#search_BankFish").val();
        var s_numHesab = $("#search_numHesab").val();
        var s_numSerial = $("#search_numSerial").val();
        var s_bankCheck = $("#search_bankCheck").val();
        var s_sahebHesab = $("#search_SahebHesab").val();
        var s_dateSarresid = $("#search_dateSarresid").val();
        
        s_family = codingStrForAjax(s_family);

		ajaxerRefreshLish = $.ajax({
			url: 'search_ajaxer.php',
			cache: false,
            contentType: false,
			type: 'post',
			data: {tb_year:tb_year,page_holder:page_holder,s_select_pardakht:s_select_pardakht,s_select_namayesh:s_select_namayesh,s_dateSarresid:s_dateSarresid,s_sahebHesab:s_sahebHesab,s_numSerial:s_numSerial,s_bankCheck:s_bankCheck,s_numHesab:s_numHesab,s_BankFish:s_BankFish,s_NumFish:s_NumFish,s_parvande:s_parvande,saved_pass:saved_pass,s_name:s_name,s_family:s_family,s_idsenfi:s_idsenfi,s_meli:s_meli,s_title:s_title,s_phone:s_phone,s_raste:s_raste,s_address:s_address},
			dataType: 'HTML',
			success: function(response){


				$("#page_maghaze").html(response);
				$("#write_natayej").html($("#matn_natayej").html());
				
				
			    if(parseInt($("#tedad").val())%10 == 0)
				    var tedad_holder = parseInt(parseInt($("#tedad").val())/10);
				else
				    var tedad_holder = parseInt(parseInt($("#tedad").val())/10) + 1;
			
				
                $("#tedad_page_holder").val(tedad_holder);
                $("#text_tedadPage").html(tedad_holder);

			}
		});

	});
}
function next_page(doRefresh){

    var temp = parseInt($("#page_holder").val());
    var tedad_page = parseInt($("#tedad_page_holder").val());
    if(tedad_page > temp){
        
        $("#page_holder").val(temp + 1);
        $("#text_numPage").html(temp + 1);
        
    }
    
    if(doRefresh == 1)
        refresh_list();
}
function last_page(doRefresh){
    
    var temp = parseInt($("#page_holder").val());
    
    if(temp > 1){
        
        $("#page_holder").val(temp - 1);
        $("#text_numPage").html(temp - 1);

    }
    
    if(doRefresh == 1)
        refresh_list();
}
function addUserAlert(mapAddress,lat,lang){
    
    var tb_year = $("#table_holder").val();
    var table_emsal_holder = $("#table_emsal_holder").val();

    if(tb_year == table_emsal_holder){
        
		notif_alert_manager('','','addUser_alertDialog','');
		
		$("#addUser_alertDialog").html("<div class='loader'></div>");
		
		$.ajax({
			url: 'load_add_user_ajaxer.php',
			type: 'post',
			data: {tb_year:tb_year},
			dataType: 'HTML',
			success: function(response){
			    
			    $("#addUser_alertDialog").html(response);
			    
			    $("#add_txt_holder_mapAddress").val(mapAddress);
        		$("#add_txt_holder_lat").val(lat);
        		$("#add_txt_holder_lang").val(lang);
			    
			    
			    $("#add_txt_dateStart").keyup(function() {
                    
                    var tempStart = $(this).val();
                    if(is_date_checker(tempStart)){
                        
                        var bits = tempStart.split('/');
                        var num = parseInt(bits[0]);
                        
                        var tempEnd = (num + 5) + '/' + bits[1] + '/' + bits[2];
                        $("#add_txt_dateEnd").val(tempEnd);
                        
                    }
                    else{
                        
                        $("#add_txt_dateEnd").val('تاریخ صدور نامعتبر');
                        
                    }
                });
			   
			    
			}
		});
		
    }
    else{
        notif_alert_manager('','','',"اطلاعات قبلی قابل ویرایش نیست");
    }
    
    
    
}
function submit_add_biParvane(){
    
    
        var check = true;
		
		var tb_year = $("#table_holder").val();
		
		//var mapAddress = $("#add_txt_holder_mapAddress").val();
		//var lat = $("#add_txt_holder_lat").val();
		//var lang = $("#add_txt_holder_lang").val();
					
		
		var ekhtar_number = $("#add_biParvane_txt_ekhtar_number").val();
		var date_bazdid = $("#add_biParvane_txt_date_bazdid").val();
		var name = $("#add_biParvane_txt_name").val();
		var family = $("#add_biParvane_txt_family").val();
        var father = $("#add_biParvane_txt_father").val();
        var title = $("#add_biParvane_txt_title").val();
        var address = $("#add_biParvane_txt_address").val();
        var numPhone = $("#add_biParvane_txt_numPhone").val();
        var numSabet = $("#add_biParvane_txt_numSabet").val();
		
		var jensiat = $('#add_biParvane_select_jensiat').find(":selected").text();
		var rasteId = $('#add_biParvane_select_raste').val();
		
		if(ekhtar_number == ''){
			check = false;				
		}
		if(date_bazdid == ''){
			check = false;				
		}
		if(name == ''){
			check = false;				
		}
		if(family == ''){
			check = false;				
		}
		if(father == ''){
			check = false;				
		}
		if(title == ''){
			check = false;				
		}
		if(address == ''){
			check = false;				
		}
		if(numPhone == ''){
			check = false;				
		}
		if(numSabet == ''){
			check = false;				
		}
		if(jensiat == ''){
			check = false;				
		}
		if(rasteId == ''){
			check = false;				
		}
		
		if(check){
		    if((!is_date_checker(date_bazdid)) && date_bazdid != 0){
		        check = false;
		        notif_alert_manager('','','','فرمت تاریخ بازدید اشتباه است');
		    }
		}
        else{
			notif_alert_manager('','','','بعضی از فیلد ها خالی است');
		}
    
    
        if(check){
            
            $.ajax({
    			url: 'add_biparvane_user_ajaxer.php',
    			type: 'post',
    			data: {tb_year:tb_year,ekhtar_number:ekhtar_number,date_bazdid:date_bazdid,name:name,family:family,father:father,title:title,address:address,numPhone:numPhone,numSabet:numSabet,jensiat:jensiat,rasteId:rasteId},
    			dataType: 'HTML',
    			success: function(response){
    			    
    			    notif_alert_manager('','1','',response);
    			    
    			}
    		});
    		
        }
    
    
}
function morajee_biparvane(id){
    
    var tb_year = $("#table_holder").val();
    
    $.ajax({
		url: 'update_morajee_biparvane_ajaxer.php',
		type: 'post',
		data: {tb_year:tb_year,id:id},
		dataType: 'HTML',
		success: function(response){
		    
		    notif_alert_manager('','1','',response);
		    load_biparvane_users();
		    
		}
	});
    
}
function promp_morajee(id){
    
    var tb_year = $("#table_holder").val();
    
    notif_alert_manager('','','morajee_biparvane_alertDialog','');
    		
	$("#morajee_biparvane_alertDialog").html("<div class='loader'></div>");
    
    $.ajax({
		url: 'load_promp_morajee_biparvane_ajaxer.php',
		type: 'post',
		data: {tb_year:tb_year,id:id},
		dataType: 'HTML',
		success: function(response){
		    
		    $("#morajee_biparvane_alertDialog").html(response);
		    
		}
	});
    
}
function load_biparvane_users(){
    
    var tb_year = $("#table_holder").val();
    var table_emsal_holder = $("#table_emsal_holder").val();

	notif_alert_manager('','','showBiparvane_alertDialog','');
	
	$("#showBiparvane_alertDialog").html("<div class='loader'></div>");
	
	$.ajax({
		url: 'load_biparvane_users_ajaxer.php',
		type: 'post',
		data: {tb_year:tb_year},
		dataType: 'HTML',
		success: function(response){
		    
		    $("#showBiparvane_alertDialog").html(response);
		    
		}
	});
}
$("document").ready(function(){
    
    $("#linker_mohlat").click(function(){
		
	    notif_alert_manager('','','mohlat_alertDialog','');
	});
	
	$("#linker_baze_mali").click(function(){
	    
	    $("#txt_s_baze_mali").val('');
        $("#txt_e_baze_mali").val('');
        
		notif_alert_manager('','','baze_mali_alertDialog','');
	
	});
	
	$("#linker_mali_mantaghe").click(function(){
	    
		notif_alert_manager('','','mali_mantaghe_alertDialog','');
	
	});
	
	
	$("#linker_baze").click(function(){
		$("#txt_s_baze").val('');
        $("#txt_e_baze").val('');
        
		notif_alert_manager('','','baze_alertDialog','');
	
	});
	
	$("#linker_fish_mantaghe").click(function(){
		$("#txt_fish_mantaghe").val('');
		
		notif_alert_manager('','','fish_mantaghe_alertDialog','');
	
	});

	$("#linker_add").click(function(){
	    
		notif_alert_manager('','','change_alertDialog','');
	
	});
	
	$("#linker_pass").click(function(){
	    
		notif_alert_manager('','','changePass_alertDialog','');
	
	});
	
	$("#linker_sale_mali").click(function(){
	    
		notif_alert_manager('','','saleMali_alertDialog','');
	
	});
	
	$("#linker_akhbar").click(function(){
	    
		load_akhbar_alertDialog();
	
	});
	
	$("#close_sale_mali").click(function(){
		
		notif_alert_manager('','1','','سال مالی بسته شد');
	});
	
    $("#linker_add_biparvane").click(function(){
	    

        var tb_year = $("#table_holder").val();
        var table_emsal_holder = $("#table_emsal_holder").val();
    
	    if(tb_year == table_emsal_holder){
	        
    		notif_alert_manager('','','addBiparvane_alertDialog','');
    		
    		$("#addBiparvane_alertDialog").html("<div class='loader'></div>");
    		
    		$.ajax({
    			url: 'load_add_biparvane_ajaxer.php',
    			type: 'post',
    			data: {tb_year:tb_year},
    			dataType: 'HTML',
    			success: function(response){
    			    
    			    $("#addBiparvane_alertDialog").html(response);
    			    
    			}
    		});
    		
	    }
	    else{
	        notif_alert_manager('','','',"اطلاعات قبلی قابل ویرایش نیست");
	    }
    	    
	
	});
	
	
	
	$("#linker_show_biparvane").click(function(){

        load_biparvane_users();
	
	});


	$(".btn_pak").click(function(){
	    
	    search_pak("needRefresh");
		
	});

	$("#btn_search").click(function(){
		
		$("#page_holder").val(1);
		$("#text_numPage").html(1);
		refresh_list();
		
		notif_alert_manager('','','',"جستجو انجام شد");
	
	});
	
	$('.search_taki_box input').bind('keydown', function(e) {
        if(e.keyCode==13){
            
            //enter
            
            $("#page_holder").val(1);
    		$("#text_numPage").html(1);
    		refresh_list();
    		
    		notif_alert_manager('','','',"جستجو انجام شد");
        }
        if(e.keyCode==27){
            
            // ESC
            search_pak("needRefresh");
        }
    });
    
    $(".search_taki_box select").change(function(){
    
    
        $("#page_holder").val(1);
		$("#text_numPage").html(1);
		refresh_list();
		
		notif_alert_manager('','','',"جستجو انجام شد");
	
    });
	
	//drop down menu
	$(".dropdown").click(function(){
		var el = $(this);
		
		if(el.attr("state") == "close"){
			
			//close others
			$(".dropdown").attr({"state":"close"});
			$(".dropdown").css({height: "40px"}, 200);
			$(".dropdown").find(".dropdown-title").removeAttr("style");
			
			//open this one
			
			el.attr({"state":"open"});
			curHeight = "40px";
			el.css('height', 'auto');
			el.find(".dropdown-title").css({background: "var(--mainColor-asli-kmTarPorang)"});
			
		
			autoHeight = el.outerHeight();
			el.outerHeight(curHeight);
			
			setTimeout(function(){ 
    			el.css({height: autoHeight});
			}, 3);
			
			
		}	
		else{
		    //close all
		    
			el.css({height: "40px"}, 350);
			el.attr({"state":"close"});
			el.find(".dropdown-title").removeAttr("style");
		}		
			
	}); 
});


function number_seprator(){
    
    $("document").ready(function(){
        $(document).on('input', '.number-separator', function (e) {
            if (/^[0-9.,]+$/.test($(this).val())) {
                $(this).val(
                    parseFloat($(this).val().replace(/,/g, '')).toLocaleString('en')
                );
            }
            else{
                $(this).val(
                    $(this).val().substring(0, $(this).val().length - 1)
                );
            }
        });
    });
}


