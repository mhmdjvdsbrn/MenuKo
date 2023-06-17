var timeouts = [];
var ajaxUploderImage;
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
    		
    		if(uploadFor == 'menu'){
    		    
    		    var name = $('#txt_add_name_mahsol').val();
    		    var idCategory = $('#add_product_select_category').val();
    		    var category = $("#add_product_select_category option:selected").text();
    		    var mablagh = $('#txt_add_mablagh_mahsol').val();
    		    var mohtava = $('#txt_add_mohtava_mahsol').val();
    		    
                var arrData = [name,category,idCategory,mablagh,mohtava];
    		    
    		}
    		else if(uploadFor == 'banner'){
    		    
    		    
    		    var name = $('#txt_name_maghaze').val();
                var number = $('#txt_number_maghaze').val();
                var address = $('#txt_address_maghaze').val();
    	        
    	        var arrData = [name,number,address];
    		    
    		}
    		else if(uploadFor == 'logo'){
    		    
    		    var name = $('#txt_name_maghaze').val();
                var number = $('#txt_number_maghaze').val();
                var address = $('#txt_address_maghaze').val();
    	        
    	        var arrData = [name,number,address];
    		}
    		
    		if(inputFile == 0){
    		    notif_alert_manager('','','','لطفا تصویر را انتخاب نمایید');
    		}
    		else{
                
                var matn_disabled_btn = '<div class="btn_img_uploders" id="uploder_btn_export" style="filter:grayscale(1)"><div class="text">';
                if(uploadFor == 'menu'){
        	        matn_disabled_btn += 'اضافه کردن به منو';
        	    }
        	    else if(uploadFor == 'banner'){
        	        matn_disabled_btn += 'ثبت بنر';
        	    }
        	    else if(uploadFor == 'logo'){
        	        matn_disabled_btn += 'ثبت لوگو';
        	    }
                matn_disabled_btn += '</div></div>';
                $('#writer_export_disable').html(matn_disabled_btn);
                
                
                $("#notification").find(".text").html('در حال آپلود عکس لطفا منتظر بمانید');
    		    $("#notification").animate({"top":"80px","width":"220px"},250);
                
        		ajaxUploderImage = $.ajax({
        			url: '../api/image_uploader_ajaxer.php',
        			type: 'post',
        			data: {uploadFor:uploadFor,id:id,arrData:arrData,token:token,imageData:imageData},
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
        			    
        			    
        			    if(uploadFor == 'menu'){
        			        notif_alert_manager(refresh_menu,'1','',response);
                		}
                		else if(uploadFor == 'banner'){
                            $('#img_banner').attr('src', $('#img_banner').attr('src') + '?' + Math.random());
                            notif_alert_manager('','1','',response);
                		}
                		else if(uploadFor == 'logo'){
                		     
                            $('#img_logo').attr('src', $('#img_logo').attr('src') + '?' + Math.random());
                		    notif_alert_manager('','1','',response);
                		}
    
        			    
        
        			}
        		});
            }
        }
    });    
    
    
}

function scrollToDiv(id){
    
    
    
    $(".category").css({"background":"white","color":"black"});
    
    $("#btnCategory" + id).css({"background":"var(--score-Asli-color)","color":"white"});
    
    var element = "#categoryId" + id;
    $('html, body').animate({
        scrollTop: $(element).offset().top - 80
    }, 200);
}
function refresh_menu(){
    
    var token = $("#tokenHolder").val();
    
    $.ajax({
		url: '../api/load_menu_ajaxer.php',
		type: 'post',
		data: {token:token},
		dataType: 'HTML',
		success: function(response){

			$("#asli_main_score").html(response);

		}
	});
	
    
}
function upload_img_alertDialog(){
    
    var uploadFor = $('#hiddenUploadFor').val();
    
    
    notif_alert_manager('','','imgUpload_alertDialog','');
    
    // set galley setting to default
    $("#selectedFile").val('');
    
    $(".cropit-preview-image").attr({"src":""});
    $("#gallery_progress_liner").css({"width":"0%"});
    
    var matn_enabled_btn = '<div class="btn export btn_img_uploders" style="background:var(--sabz-color);"><div class="text">';
    if(uploadFor == 'menu'){
        matn_enabled_btn += 'اضافه کردن به منو';
        $('.image-editor').cropit('previewSize', { width: 200, height: 200});
        $("#imgUpload_alertDialog").css({"width":"340px"});
    }
    else if(uploadFor == 'banner'){
        matn_enabled_btn += 'ثبت بنر';
        $("#imgUpload_alertDialog").css({"width":"630px"});
        $('.image-editor').cropit('previewSize', { width: 600, height: 200});
    }
    else if(uploadFor == 'logo'){
        $('.image-editor').cropit('previewSize', { width: 200, height: 200});
        $("#imgUpload_alertDialog").css({"width":"340px"});
        matn_enabled_btn += 'ثبت لوگو';
    }
    matn_enabled_btn += '</div><div class="btn_effect" style="height: 0px;"></div></div>';
    
    $('#writer_export_disable').html(matn_enabled_btn);
    upload_export();

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
        	url: '../api/add_category_ajaxer.php',
        	type: 'post',
        	data: {token:token,categoryTitle:categoryTitle},
        	dataType: 'HTML',
        	success: function(response){
        	    notif_alert_manager(raste_manage,'1','',response);
        	    refresh_category();
        	}
        });
	}
}
function del_submited(id){

    $("document").ready(function(){
        
	    var token = $("#tokenHolder").val();


        $.ajax({
        	url: '../api/api_delete_product_ajaxer.php',
        	type: 'post',
        	data: {token:token,id:id},
        	dataType: 'HTML',
        	success: function(response){
            	
            	notif_alert_manager('','1','',response);
		        refresh_menu();
            }
        });
    });
}
function delCategory(id,name){
    
    notif_alert_manager('','','delete_category_alertDialog','');
    var matn = "<center><div class='text'><br>آیا مطمعن هستید که میخواهید <br>دسته بندی  "+name+ " " + "را حذف کنید؟</div><div dir='ltr' style='display:inline-flex'><div class='btn btn_submit' onclick='del_category_submited("+ id +")'><div class='btn_effect'></div><div class='text' style='position:relative;z-index:2'>بله</div></div><div class='btn btn_deny' onclick='deny_delete()'><div class='btn_effect'></div><div class='text'  style='position:relative;z-index:2'>خیر</div></div></div>";
	document.getElementById("delete_category_alertDialog").innerHTML = matn;
	
	
}
function submit_editProductInfo(){
    
    var id = $("#txt_edit_id").val();
    var title = $("#txt_edit_title").val();
    var categoryId = $("#txt_edit_category").val();
    var categoryName = $("#txt_edit_category option:selected").text();
    		    
    var ingredients = $("#txt_edit_ingredients").val();
    var price = $("#txt_edit_price").val();
    var token = $("#tokenHolder").val();
    
    
    
    
    

    $.ajax({
    	url: '../api/api_edit_product_ajaxer.php',
    	type: 'post',
    	data: {token:token,id:id,title:title,categoryName:categoryName,categoryId:categoryId,ingredients:ingredients,price:price},
    	dataType: 'HTML',
    	success: function(response){
        	
        	notif_alert_manager('','1','',response);
	        refresh_menu();
        }
    });
    
    
    
    
}

function editProductInfo(id,title,category,ingredients,price){
    
    
    
    $("#txt_edit_category option").each(function(){
        
        if($(this).text() == category){
            $(this).attr('selected', 'selected');
            $("#txt_edit_id_category").val($(this).val());
        }
    });
    
    
    $("#title_mahsol_name").html(title);
    
    $("#txt_edit_id").val(id);
    $("#txt_edit_title").val(title);
    $("#txt_edit_ingredients").val(ingredients);
    $("#txt_edit_price").val(price);
    
    
    notif_alert_manager('','','edit_alertDialog','');
    
}
function del_category_submited(id){

    $("document").ready(function(){
        
	    var token = $("#tokenHolder").val();


        $.ajax({
        	url: '../api/api_delete_category_ajaxer.php',
        	type: 'post',
        	data: {token:token,id:id},
        	dataType: 'HTML',
        	success: function(response){
            	
            	notif_alert_manager('','1','',response);
		        refresh_category();
		        refresh_menu();
            }
        });
    });
}
function refresh_category(){
    
    
    $("document").ready(function(){
        
	    var token = $("#tokenHolder").val();

        $.ajax({
        	url: '../api/load_category_box_ajaxer.php',
        	type: 'post',
        	data: {token:token},
        	dataType: 'HTML',
        	success: function(response){
            	$('#category_box').html(response)
            }
        });
    });
}
$(document).scroll(function(e){

    control_scroll();

});
function control_scroll(){
    // grab the scroll amount and the window height
    var scrollAmount = $(window).scrollTop();
    var documentHeight = $(document).height();

    if(scrollAmount <= 380) {
        
        // $('#category_box').css({"top":380 - scrollAmount})
        
        
        $('#category_box').css({"top":"380px","position": "absolute"});
    }
    
    if(scrollAmount > 380) {
        
        
        $('#category_box').css({"top":"0px","position":"fixed"});
    }
}

$("document").ready(function(){
    
    refresh_menu();
    control_scroll();
    
    
    
    $('#linker_qr_manage').click(function(){
        
        notif_alert_manager('','1','qr_alertDialog','');
        
        document.getElementById("qr_alertDialog").innerHTML = "<div class='loader'></div>";
    	
    	$("document").ready(function(){
    	
    	    var token = $("#tokenHolder").val();
    	    $.ajax({
            	url: '../api/load_qr_ajaxer.php',
            	type: 'post',
            	data: {token:token},
            	dataType: 'HTML',
            	success: function(response){
            	    
                    $("#qr_alertDialog").html(response);
            	    
            	    
            	}
            });
    	});
        
    });
    
    
    $('#linker_info').click(function(){
        
        load_info();
        
    });
    
    
    function updateCategory(){
        
        var token = $("#tokenHolder").val();
        
        $.ajax({
			url: '../api/api_getCategory.php',
			type: 'post',
			data: {token:token},
			dataType: 'HTML',
			success: function(response){
			    $("#add_product_select_category").html(response);
			}
        });
    }
    
    
    
    $("#add_img_gallery").click(function(){
    
        $('#txt_add_name_mahsol').val('');
		$('#txt_add_mablagh_mahsol').val('');
		$('#txt_add_mohtava_mahsol').val('');
		    
        number_seprator();
        updateCategory();
        
        
        var tedadPic = $("#tedad_pic_gallery").val();
        if(tedadPic >= 8){
            check = false;
            notif_alert_manager('','','','نمیتوان بیشتر از 8 تصویر آپلود کرد');
        }
        else{
            get_field_gallery();
        }
        
        
        
	});
    
    
    
});

function edame_upload_banner(){
        
    $("#hiddenUploadFor").val('banner');
    upload_img_alertDialog();
    
}
function edame_upload_logo(){
        
    $("#hiddenUploadFor").val('logo');
    upload_img_alertDialog();
    
}
function load_info(){
    notif_alert_manager('','1','info_alertDialog','');
        
    document.getElementById("info_alertDialog").innerHTML = "<div class='loader'></div>";
	
	$("document").ready(function(){
	
	    var token = $("#tokenHolder").val();
	    $.ajax({
        	url: '../api/load_info_ajaxer.php',
        	type: 'post',
        	data: {token:token},
        	dataType: 'HTML',
        	success: function(response){
        	    
                $("#info_alertDialog").html(response);
        	    
        	    
        	}
        });
	});
}
function deny_upload(){
    
    
    var uploadFor = $("#hiddenUploadFor").val();
    if(uploadFor == "menu"){
        notif_alert_manager(get_field_gallery,'1','','آپلود تصویر لغو شد');
    }
    else{
        load_info();
    }
    
		
}
function submit_info(){
    
    var name = $('#txt_name_maghaze').val();
    var number = $('#txt_number_maghaze').val();
    var address = $('#txt_address_maghaze').val();
    var token = $("#tokenHolder").val();
    
    $.ajax({
    	url: '../api/edit_info_ajaxer.php',
    	type: 'post',
    	data: {name:name,number:number,address:address,token:token},
    	dataType: 'HTML',
    	success: function(response){
    	    refresh_info();
    	    notif_alert_manager(load_info,'','',response);
    	}
    });
    
}
function refresh_info(){
    
    var token = $("#tokenHolder").val();
    
    $.ajax({
    	url: '../api/refresh_info_ajaxer.php',
    	type: 'post',
    	data: {token:token},
    	dataType: 'HTML',
    	success: function(response){
    	    $("#box_info").html(response);
    	}
    });
}
function edame_add_gallery(){
    
    $("#hiddenUploadFor").val('menu');
    
    var mablagh_mahsol = $('#txt_add_mablagh_mahsol').val();
    var mohtava_mahsol = $('#txt_add_mohtava_mahsol').val();
    var name_mahsol = $('#txt_add_name_mahsol').val();
    
    
    if(mablagh_mahsol == '' || mohtava_mahsol == '' || name_mahsol == ''){
        notif_alert_manager('','','','لطفا همه ی بخش ها را پر نمایید');
    }
    else{
        upload_img_alertDialog();
    }
}

function deny_edit_info(){
    notif_alert_manager('','1','','پنجره اطلاعات بسته شد');
}