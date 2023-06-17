function raste_manage(){
    
    notif_alert_manager('','1','raste_manage_alertDialog','');
    
    document.getElementById("raste_manage_alertDialog").innerHTML = "<div class='loader'></div>";
	
    $.ajax({
    	url: 'load_category_ajaxer.php',
    	type: 'post',
    	data: {},
    	dataType: 'HTML',
    	success: function(response){
    	    
            $("#raste_manage_alertDialog").html(response);
    	    
    	    
    	}
    });
    
}
function manageCategoriesAlert(){
        
    notif_alert_manager('','1','top_categories_manage_alertDialog','');
    
    document.getElementById("top_categories_manage_alertDialog").innerHTML = "<div class='loader'></div>";
	


    $.ajax({
    	url: 'load_top_categories_ajaxer.php',
    	type: 'post',
    	data: {},
    	dataType: 'HTML',
    	success: function(response){
    	    
            $("#top_categories_manage_alertDialog").html(response);
    	    
    	    
    	}
    });
    
    
}
function chooseTypeCategory(id){
    
    $("#hiddenTopCategory_id_holder").val(id);
    notif_alert_manager('','1','choose_top_categories_type_alertDialog','');
    
    
}
function editCategory(type,id,name){
    
        
    $("#hiddenUploadFor").val('categoryIcon');
    $("#id_categoryIcon_holder").val(id);
    $("#type_categoryIcon_holder").val(type);
    
    upload_img_alertDialog();
    
}
function editTopCategory(){
    
    var id = $("#hiddenTopCategory_id_holder").val();
    var categoryId = $("#edit_top_select_category").val();
    var type =$("#edit_top_type_category").val(); 
    
    $.ajax({
    	url: 'edit_top_categories_ajaxer.php',
    	type: 'post',
    	data: {id:id,type:type,categoryId:categoryId},
    	dataType: 'HTML',
    	success: function(response){
    	    
    	   notif_alert_manager(manageCategoriesAlert,'1','',response);
    	   
    	    
    	}
    });
    
}
function chooseTopCategory(type){
    
    notif_alert_manager('','1','choose_category_alertDialog','');
    
    document.getElementById("choose_category_alertDialog").innerHTML = "<div class='loader'></div>";
	


    $.ajax({
    	url: 'load_categories_for_top_ajaxer.php',
    	type: 'post',
    	data: {type:type},
    	dataType: 'HTML',
    	success: function(response){
    	    
            $("#choose_category_alertDialog").html(response);
    	}
    });
    
    
    
}
function manageSubCity(){
        
    notif_alert_manager('','1','manage_sub_city_alertDialog','');
    
	document.getElementById("manage_sub_city_alertDialog").innerHTML = "<div class='loader'></div>";

    $.ajax({
    	url: 'load_sub_city_ajaxer.php',
    	type: 'post',
    	data: {},
    	dataType: 'HTML',
    	success: function(response){
    	    
            $("#manage_sub_city_alertDialog").html(response);
    	    
    	    
    	}
    });
    
    
}
function manageCity(){
        
    notif_alert_manager('','1','manage_city_alertDialog','');
    
    document.getElementById("manage_city_alertDialog").innerHTML = "<div class='loader'></div>";
	


    $.ajax({
    	url: 'load_city_ajaxer.php',
    	type: 'post',
    	data: {},
    	dataType: 'HTML',
    	success: function(response){
    	    
            $("#manage_city_alertDialog").html(response);
    	    
    	    
    	}
    });
    
    
}
function add_img_gallery(id){
    
    $("#hiddenUploadFor").val('gallery');
    $("#id_gallery_holder").val(id);
    
    upload_img_alertDialog();
    


}
function galleryPage(id){

    notif_alert_manager('','1','gallery_alertDialog','');
    
    document.getElementById("gallery_alertDialog").innerHTML = "<div class='loader'></div>";
	
    
    $.ajax({
    	url: 'load_gallery_ajaxer.php',
    	type: 'post',
    	data: {id:id},
    	dataType: 'HTML',
    	success: function(response){
    	    
            $("#gallery_alertDialog").html(response);
    	    
    	    
    	}
    });
    
    
    
}

function refresh_iframe(){
    document.getElementById('mapIframe').contentWindow.location.reload();
}
function addMohtavaAlert(){
    
    var tb_year = $("#table_holder").val();

    
	notif_alert_manager('','','get_field_add_mohtava_alertDialog','');
	
	$("#get_field_add_mohtava_alertDialog").html("<div class='loader'></div>");
	
	$.ajax({
		url: 'load_add_mohtava_ajaxer.php',
		type: 'post',
		data: {},
		dataType: 'HTML',
		success: function(response){
		    
		    $("#get_field_add_mohtava_alertDialog").html(response);
		    
		}
	});
	
    
}
function category_mohtava_manage(){
    
    notif_alert_manager('','1','mohtava_manage_alertDialog','');
    
    document.getElementById("mohtava_manage_alertDialog").innerHTML = "<div class='loader'></div>";
	


    $.ajax({
    	url: 'load_category_mohtava_ajaxer.php',
    	type: 'post',
    	data: {},
    	dataType: 'HTML',
    	success: function(response){
    	    
            $("#mohtava_manage_alertDialog").html(response);
    	    
    	    
    	}
    });
    
}
function category_mohtava_checkbox(){
    
    notif_alert_manager('','1','get_field_add_mohtava_category_alertDialog','');
    
    document.getElementById("get_field_add_mohtava_category_alertDialog").innerHTML = "<div class='loader'></div>";


    $.ajax({
    	url: 'load_category_mohtava_checkbox_ajaxer.php',
    	type: 'post',
    	data: {},
    	dataType: 'HTML',
    	success: function(response){
    	    
            $("#get_field_add_mohtava_category_alertDialog").html(response);
    	    
    	    
    	}
    });
    
}
function add_category_mohtava_open(){
    
	notif_alert_manager('','','add_category_mohtava_alertDialog','');
	
}
function add_raste(){
    
    $("#txt_add_isikcode").val('');
    $("#txt_add_raste").val('');
    
	notif_alert_manager('','','add_raste_alertDialog','');
	
}
function edame_add_mohtava(){
    
    $("#hiddenUploadFor").val('mohtava');
    
    var matn_mohtava = $('#txt_add_mohtava_matn').val();
    var title_mahsol = $('#txt_add_title_mohtava').val();
    
    var array = [];
    
    $(".categoryCheckbox:checked").each(function(){
        var categoryId = $(this).attr("cateId");
        array.push(categoryId);
    });
    
    if (array.length === 0) {
        notif_alert_manager('','','','حداقل یک دسته بندی انتخاب کنید');
    }
    else if(matn_mohtava == '' || title_mahsol == ''){
        notif_alert_manager('','','','لطفا همه ی بخش ها را پر نمایید');
    }
    else{
        upload_img_alertDialog();
    }
}
function edame_add_gallery(){
    
    $("#hiddenUploadFor").val('makan');
    
    var name_mahsol = $('#txt_add_name_mahsol').val();
    var number = $('#txt_add_number').val();
    
    
    if(name_mahsol == '' || number == ''){
        notif_alert_manager('','','','لطفا همه ی بخش ها را پر نمایید');
    }
    else{
        upload_img_alertDialog();
    }
}
function upload_img_alertDialog(){
    
    var uploadFor = $('#hiddenUploadFor').val();
    
    
    notif_alert_manager('','','imgUpload_alertDialog','');
    
    // set galley setting to default
    $("#selectedFile").val('');
    
    $(".cropit-preview-image").attr({"src":""});
    $("#gallery_progress_liner").css({"width":"0%"});
    
    var matn_enabled_btn = '<div class="btn export btn_img_uploders" style="background:var(--sabz-color);"><div class="text">';
    if(uploadFor == 'makan'){
        matn_enabled_btn += 'اضافه کردن به نقشه';
        $('.image-editor').cropit('previewSize', { width: 200, height: 200});
        $("#imgUpload_alertDialog").css({"width":"340px"});
    }
    else if(uploadFor == 'mohtava'){
        matn_enabled_btn += 'ثبت محتوا';
        $("#imgUpload_alertDialog").css({"width":"630px"});
        $('.image-editor').cropit('previewSize', { width: 200, height: 200});
        $("#imgUpload_alertDialog").css({"width":"340px"});
    }
    else if(uploadFor == 'gallery'){
        $('.image-editor').cropit('previewSize', { width: 200, height: 200});
        $("#imgUpload_alertDialog").css({"width":"340px"});
        matn_enabled_btn += 'ثبت تصویر';
    }
    else if(uploadFor == 'categoryIcon'){
        $('.image-editor').cropit('previewSize', { width: 200, height: 200});
        $("#imgUpload_alertDialog").css({"width":"340px"});
        matn_enabled_btn += 'ثبت آیکن';
    }
    matn_enabled_btn += '</div><div class="btn_effect" style="height: 0px;"></div></div>';
    
    $('#writer_export_disable').html(matn_enabled_btn);
    upload_export();

}
function upload_export(){
    
    $('.export').click(function() {
        
		var imageData = $('.image-editor').cropit('export', {
          type: 'image/jpeg',
          quality: 0.99,
          originalSize: true
        });
        

		var token = $("#tokenHolder").val();
		var id = $("#idHolder").val();
		var inputFile = $("#selectedFile").get(0).files.length;
        var fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
        
        var _size = $("#selectedFile").get(0).files.item(0).size;      // THE SIZE OF THE FILE.
        j=0;
        //check if file is in GB,MB,KB or Bytes
        while(_size > 900)
        { 
          _size/=1024; //divide file size 
          j++;
        }
        //get exact size
        var exactSize = (Math.round(_size*100)/100);
        
        if(exactSize > 500){
            notif_alert_manager('','','','حداکثر حجم مجاز 500 کیلوبایت میباشد');
        }
        else{

		
    		var uploadFor = $('#hiddenUploadFor').val();
    		
    		if(uploadFor == 'makan'){
    		    
    		    var name = $('#txt_add_name_mahsol').val();
    		    var idCategory = $('#add_product_select_category').val();
    		    var category = $("#add_product_select_category option:selected").text();
    		    
    		    var city = $('#add_product_select_city').val();
    		    
    		    var number = $('#txt_add_number').val();
    		    
    		    var lat = $('#add_txt_holder_lat').val();
    		    var lang = $('#add_txt_holder_lang').val();
    		    
    		    var address = $('#add_txt_holder_mapAddress').val();
    		    
    		    
    		    var matn = $('#txt_add_maghaze_matn').val();
    		    
                var arrData = [name,city,category,idCategory,number,matn,address,lat,lang];
    		    
    		}
    		else if(uploadFor == 'mohtava'){
    		    
                		    
                var arrayCategories = [];
                
                $(".categoryCheckbox:checked").each(function(){
                    var categoryId = $(this).attr("cateId");
                    arrayCategories.push(categoryId);
                });
    		    
    		    
    		    
    		    var title = $('#txt_add_title_mohtava').val();
                var matn = $('#txt_add_mohtava_matn').val();
    		    var city = $('#add_mohtava_select_city').val();
    	        
    	        var arrData = [title,matn,city,arrayCategories];
    		    
    		}
    		else if(uploadFor == 'gallery'){
    		    
    		    var id = $('#id_gallery_holder').val();
    	        var arrData = [id];
    		}
    		else if(uploadFor == 'categoryIcon'){
    		    
                var id = $("#id_categoryIcon_holder").val();
                var type = $("#type_categoryIcon_holder").val();
    	        
    	        var arrData = [id,type];
    		}
    		
    		
    		
        
    		
    		if(inputFile == 0){
    		    notif_alert_manager('','','','لطفا تصویر را انتخاب نمایید');
    		}
    		else{
                
                var matn_disabled_btn = '<div class="btn_img_uploders" id="uploder_btn_export" style="filter:grayscale(1)"><div class="text">';
                if(uploadFor == 'makan'){
        	        matn_disabled_btn += 'اضافه کردن به نقشه';
        	    }
        	    else if(uploadFor == 'mohtava'){
        	        matn_disabled_btn += 'ثبت محتوا';
        	    }
        	    else if(uploadFor == 'gallery'){
        	        matn_disabled_btn += 'ثبت تصویر';
        	    }
        	    else if(uploadFor == 'categoryIcon'){
        	        matn_disabled_btn += 'ثبت آیکن';
        	    }
                matn_disabled_btn += '</div></div>';
                $('#writer_export_disable').html(matn_disabled_btn);
                
                $("#notification").find(".text").html('در حال آپلود عکس لطفا منتظر بمانید');
    		    $("#notification").animate({"top":"80px","width":"220px"},250);
                
        		ajaxUploderImage = $.ajax({
        			url: 'image_uploader_ajaxer.php',
        			type: 'post',
        			data: {uploadFor:uploadFor,id:id,arrData:arrData,imageData:imageData},
        			dataType: 'HTML',
        			xhr: function () {
                        var xhr = new window.XMLHttpRequest();
                        xhr.upload.addEventListener("progress", function(evt) {
                            if (evt.lengthComputable){
                                var percentComplete = evt.loaded / evt.total;
                                percentComplete = parseInt(percentComplete * 100);
                                var inPercent = percentComplete + "%";
                                
                                $("#gallery_progress_liner").css({"width":inPercent});
                                
                                
                            }
                        });
                        return xhr;
                    },
                    error: function () {
                        notif_alert_manager('','','',"nashod");
                    },
        			success: function(response){
        			    
        			    
        			    if(uploadFor == 'makan'){
        			        notif_alert_manager(refresh_iframe,'1','',response);
                		}
                		else if(uploadFor == 'mohtava'){
                            $('#img_banner').attr('src', $('#img_banner').attr('src') + '?' + Math.random());
                            notif_alert_manager('','1','',response);
                		}
                		else if(uploadFor == 'gallery'){
                		     
                		     notif_alert_manager('','1','',response);
                		     var id = $('#id_gallery_holder').val();
                		     galleryPage(id);
                		     
            		        
                		}
                		else if(uploadFor == 'categoryIcon'){
                		     
                		    var type = arrData[1];
                		    if(type == 'makan'){
            			        notif_alert_manager(raste_manage,'1','',response);
                    		}
                    		else{
                    		    notif_alert_manager(category_mohtava_manage,'1','',response);
                    		}
                		     
            		        
                		}
    
        			    
        
        			}
        		});
            }
        }
    });    
    
    
}
function refresh_makan(){
    
}
function add_category(){
    
    var check = true;
    var categoryTitle = $("#txt_add_category").val();
    var token = $("#tokenHolder").val();
    
    if(categoryTitle == ''){
        check = false;
        notif_alert_manager('','','','عنوان دسته بندی خالی است');
    }
	
	if(check){
        $.ajax({
        	url: 'add_category_ajaxer.php',
        	type: 'post',
        	data: {categoryTitle:categoryTitle},
        	dataType: 'HTML',
        	success: function(response){
        	    notif_alert_manager(raste_manage,'1','',response);
        	    refresh_iframe();
        	}
        });
	}
}
function add_category_mohtava(){
    
    var check = true;
    var categoryTitle = $("#txt_add_category_mohtava").val();
    
    if(categoryTitle == ''){
        check = false;
        notif_alert_manager('','','','عنوان دسته بندی خالی است');
    }
	
	if(check){
        $.ajax({
        	url: 'add_category_mohtava_ajaxer.php',
        	type: 'post',
        	data: {categoryTitle:categoryTitle},
        	dataType: 'HTML',
        	success: function(response){
        	    notif_alert_manager(category_mohtava_manage,'1','',response);
        	}
        });
	}
}