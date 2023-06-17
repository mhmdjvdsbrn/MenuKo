var timeouts = [];
var ajaxUploderImage;
function loadAlertEditGalleryText(picId,numPic){
	
	notif_alert_manager('','','edit_txt_pic_text_alertDialog','');
	
	var txt_matn = '';
    
    var text = "<center><div class='text'><br>لطفا جهت ویرایش، متن جدید تصویر شماره "+numPic+" را وارد کنید</div><br><input class='txt' id='txt_matn_pic' readonly ";
    
    
    text += "onfocus='this.removeAttribute(" + '"readonly"' + ")'";
    
    text += "style='width:250px;' placeholder='متنی که رو تصویر را اینجا وارد کنید'><br><div dir='ltr' style='display:inline-flex'><div class='btn btn_submit' onclick='EditPicText("+'"'+ picId +'","'+ txt_matn + '"' +")'><div class='btn_effect'></div><div class='text' style='position:relative;z-index:2'>ثبت</div></div><div class='btn btn_deny' onclick='btn_deny_pic()'><div class='btn_effect'></div><div class='text'  style='position:relative;z-index:2'>لغو</div></div></div>";
    
    
    $("#edit_txt_pic_text_alertDialog").html(text);
        
    
}
function btn_deny_pic(){
    
    notif_alert_manager(load_gallery_alertDialog,'','',"ویرایش متن تصویر لغو شد");

}
function EditPicText(picId){
    
    var text = $("#txt_matn_pic").val();
    
    $.ajax({
		url: 'edit_gallery_text_ajaxer.php',
		type: 'post',
		data: {picId:picId,text:text},
		dataType: 'HTML',
		success: function(response){
		    
		    notif_alert_manager(load_gallery_alertDialog,'','',response);
		},
    	error: function() {
            // re call ajax
            clearAllTimeOut();
            timeouts.push(setTimeout(function(){EditPicText(picId)}, 1200));
        }
    });
}
function GetPermissionToRemoveImage(picId,numPic){
    
    
	notif_alert_manager('','','GetPermissionRPic_alertDialog','');
    
    var text = "<center><div class='text'><br>آیا مطمعن هستید که میخواهید تصویر شماره "+numPic+" را حذف کنید؟</div><div dir='ltr' style='display:inline-flex'><div class='btn btn_submit' onclick='RemoveImage("+ picId +")'><div class='btn_effect'></div><div class='text' style='position:relative;z-index:2'>بله</div></div><div class='btn btn_deny' onclick='deny_pic_delete()'><div class='btn_effect'></div><div class='text'  style='position:relative;z-index:2'>خیر</div></div></div>";
    $("#GetPermissionRPic_alertDialog").html(text);
        
}
function RemoveImage(picId){
    $.ajax({
		url: 'remove_image_gallery_ajaxer.php',
		type: 'post',
		data: {picId:picId},
		dataType: 'HTML',
		success: function(response){
		    
		    notif_alert_manager(load_gallery_alertDialog,'','',response);

		},
    	error: function() {
            // re call ajax
            clearAllTimeOut();
            timeouts.push(setTimeout(function(){RemoveImage(picId)}, 1200));
        }
    });
}
function deny_pic_delete(){
    notif_alert_manager(load_gallery_alertDialog,'','',"حذف تصویر لغو شد");
}
function edame_add_ozv_etehadie(){
    //for get data 
    var name = $('#txt_name_ozv').val();
    var family = $('#txt_family_ozv').val();
    var semat = $('#txt_semat_ozv').val();
    var jaygah = $('#txt_jaygah_ozv').val();
    
    
    if(name == '' || family == '' || semat == '' || jaygah == ''){
        notif_alert_manager('','','','لطفا همه ی بخش ها را پر کنید');
    }
    else if(parseInt(jaygah) < 1){
        notif_alert_manager('','','','عدد جایگاه نمیتواند کمتر از 1 باشد');
    }
    else{
        upload_img_alertDialog();
    }
        
}
function add_ozv_etehadie(){
    notif_alert_manager('','1','get_field_aza_alertDialog','');
}
function deny_get_field_aza(){
    notif_alert_manager(load_aza_etehadie_alertDialog,'','',"ثبت عضو جدید لغو شد");
}
function remove_ozv(id){
    
    $.ajax({
		url: 'remove_ozv_ajaxer.php',
		type: 'post',
		data: {id:id},
		dataType: 'HTML',
		success: function(response){

            notif_alert_manager('','1','',response);
            load_aza_etehadie_alertDialog();
            
            
		}
	});
}
function edit_ozv_etehadie(id){
    
    var name = $('#txt_edit_name_ozv').val();
    var family = $('#txt_edit_family_ozv').val();
    var semat = $('#txt_edit_semat_ozv').val();
    var jaygah = $('#txt_edit_jaygah_ozv').val();
    
    if(name == '' || family == '' || semat == '' || jaygah == ''){
        notif_alert_manager('','','','لطفا همه ی بخش ها را پر کنید');
    }
    else if(parseInt(jaygah) < 1){
        notif_alert_manager('','','','عدد جایگاه نمیتواند کمتر از 1 باشد');
    }
    else{
        $.ajax({
    		url: 'edit_ozv_ajaxer.php',
    		type: 'post',
    		data: {id:id,name,family,semat,jaygah},
    		dataType: 'HTML',
    		success: function(response){
    
                notif_alert_manager('','1','',response);
                load_aza_etehadie_alertDialog();
                
                
    		}
    	});
    }
}
function deny_remove_ozv(){
    notif_alert_manager('','','','حذف عضو لغو شد');
    load_aza_etehadie_alertDialog();
}
function deny_edit_aza(){
    notif_alert_manager('','','','ویرایش عضو لغو شد');
    load_aza_etehadie_alertDialog();
}
function load_edit_ozv(id){
    
    notif_alert_manager('','1','edit_aza_alertDialog','');
    
    $.ajax({
		url: 'load_edit_ozv_ajaxer.php',
		type: 'post',
		data: {id:id},
		dataType: 'HTML',
		success: function(response){
		    
            $("#edit_aza_alertDialog").html(response);
            
            
		}
	});
    
}
function load_aza_etehadie_alertDialog(){
    
    
    $("#hiddenUploadFor").val('aza');
    
    //empty inputs:
    $('#txt_name_ozv').val('');
    $('#txt_family_ozv').val('');
    $('#txt_semat_ozv').val('');

    notif_alert_manager('','','aza_etehadie_alertDialog','');
    
    document.getElementById("aza_etehadie_alertDialog").innerHTML = "<div class='loader'></div>";
    
    $.ajax({
		url: 'load_aza_etehadie_ajaxer.php',
		type: 'post',
		data: {},
		dataType: 'HTML',
		success: function(response){
		    
            $("#aza_etehadie_alertDialog").html(response);
            var tedad = parseInt($('#hidden_tedad_aza').val()) + 1;
            $('#txt_jaygah_ozv').val(tedad);
            
            
		}
	});
    
    
}
function load_akhbar_alertDialog(){
    
    $("#hiddenUploadFor").val('news');
    $('#txt_title_news').val('');
    $('#txt_subtitle_news').val('');
    $('#txt_matn_news').val('');
    
    notif_alert_manager('','','akhbar_alertDialog','');
    
    document.getElementById("akhbar_alertDialog").innerHTML = "<div class='loader'></div>";
    
    $.ajax({
		url: 'load_news_ajaxer.php',
		type: 'post',
		data: {},
		dataType: 'HTML',
		success: function(response){
		    
            $("#akhbar_alertDialog").html(response);
            
		}
	});
    
    
}
function add_news(){
    
    notif_alert_manager('','','get_field_news_alertDialog','');
    
}
function deny_get_field_news(){
    load_akhbar_alertDialog();
}
function edame_add_news(){
    
    var titleNews = $('#txt_title_news').val();
    var subtitleNews = $('#txt_subtitle_news').val();
    var MatnNews = $('#txt_matn_news').val();
    
    if(titleNews == '' || subtitleNews == '' || MatnNews == ''){
        notif_alert_manager('','','','لطفا همه ی بخش ها را پر نمایید');
    }
    else{
        upload_img_alertDialog();
    }
    
}
function remove_news(id){
    
    $.ajax({
		url: 'remove_news_ajaxer.php',
		type: 'post',
		data: {id:id},
		dataType: 'HTML',
		success: function(response){
		    
    	    notif_alert_manager(load_akhbar_alertDialog,'1','',response);
            
		}
	});
    
}
function deny_remove_news(){
    notif_alert_manager(load_akhbar_alertDialog,'','','حذف خبر لغو شد');
}
function upload_img_alertDialog(){
    
    var uploadFor = $('#hiddenUploadFor').val();
    $('.image-editor').cropit('previewSize', { width: 526, height: 339});

    notif_alert_manager('','','imgUpload_alertDialog','');
    
    // set galley setting to default
    $("#selectedFile").val('');
    $("#txt_image_gallery").val('');
    $(".cropit-preview-image").attr({"src":""});
    $("#gallery_progress_liner").css({"width":"0%"});
    
    var matn_enabled_btn = '<div class="btn export btn_img_uploders" style="background:var(--sabz-color);"><div class="text">';
    if(uploadFor == 'gallery'){
        matn_enabled_btn += 'اضافه کردن به گالری';
    }
    else if(uploadFor == 'news'){
        matn_enabled_btn += 'ثبت خبر';
    }
    else if(uploadFor == 'aza'){
        $('.image-editor').cropit('previewSize', { width: 300, height: 300});
        matn_enabled_btn += 'ثبت عضو';
    }
    matn_enabled_btn += '</div><div class="btn_effect" style="height: 0px;"></div></div>';
    
    $('#writer_export_disable').html(matn_enabled_btn);
    upload_export();

}
function deny_add_pic(){
    notif_alert_manager(ChooseMapAddress,'1','','اضافه کردن مکان لغو شد');
}
function get_field_gallery(){
    notif_alert_manager('','1','get_field_gallery_alertDialog','');
}
function load_gallery_alertDialog(){
    
    
    $("#hiddenUploadFor").val('gallery');
    $("#txt_add_gallery").val('');
    

	notif_alert_manager('','1','gallery_alertDialog','');

    document.getElementById("gallery_alertDialog").innerHTML = "<div class='loader'></div>";

    $.ajax({
		url: 'load_gallery_ajaxer.php',
		type: 'post',
		data: {},
		dataType: 'HTML',
		success: function(response){
		    
            $("#gallery_alertDialog").html(response);
            
        	$("#add_img_gallery").click(function(){
                
                
                var tedadPic = $("#tedad_pic_gallery").val();
                if(tedadPic >= 8){
                    check = false;
                    notif_alert_manager('','','','نمیتوان بیشتر از 8 تصویر آپلود کرد');
                }
                else{
                    get_field_gallery();
                }
                
                
                
        	});
            
		}
	});
}
$("document").ready(function(){	
    
    
    function clearSelection() {
        if(document.selection && document.selection.empty) {
            document.selection.empty();
        } else if(window.getSelection) {
            var sel = window.getSelection();
            sel.removeAllRanges();
        }
    }
    
    
    $('.roydad_title .text').focus(function() { alert('focused');  });
    
    //clear selection while alertDialog is loading
    $('body').click(function(){
        var child3 = $('.alertDialog:visible').find(".loader");
        if(child3.length > 0) {
            clearSelection();
        }
    });
    
    
    $('#right *').on('keydown', function(e){ 
      if (e.keyCode == 9){
        
        e.preventDefault();
        $('#search_parvande').focus();
        
      }
    });
   
    
    $("#linker_empty_parvande").click(function(){
	    
	    empty_parvande();	
	
	});
	
	$("#linker_raste_manage").click(function(){
	    
	    raste_manage();	
	
	});
	
	//website:
	
	//aza etehadie
	
	$("#linker_aza_etehadie").click(function(){
	    
	    load_aza_etehadie_alertDialog();	
	
	});
    
    //gallery
    
    $("#linker_gallery").click(function(){
	    
	    load_gallery_alertDialog();	
	
	});
    
    //Upload image js part
    $('.image-editor').cropit({
      imageState: {},
    });
    
    $('.rotate-cw').click(function() {
        $('.image-editor').cropit('rotateCW');
    });
    $('.rotate-ccw').click(function() {
        $('.image-editor').cropit('rotateCCW');
    });
    
	var _URL = window.URL || window.webkitURL;
	
	$("#selectedFile").change(function(e) {
        var file, img;
        
        if ((file = this.files[0])) {
            img = new Image();
            img.onload = function() {
                
                
                var uploadFor = $('#hiddenUploadFor').val();
                
                if(uploadFor != 'categoryIcon')
                    if(this.width < 526 || this.height < 339){
            		    $("#notification").find(".text").html('حداقل عرض تصویر 526px و حداقل طول تصویر 339px باید باشد');
    	                $("#notification").animate({"width":"360px","top":"80px"},250).delay(1800).animate({"width":"0px","top":"-90px"},150);
    	                
    	                // set galley setting to default
                	    $("#selectedFile").val('');
                	    $("#txt_image_gallery").val('');
                	    $(".cropit-preview-image").attr({"src":""});
                	    $("#gallery_progress_liner").css({"width":"0%"});
    	                
                    }
                
            };
            img.onerror = function() {
                
                notif_alert_manager('','','','لطفا یک تصویر انتخاب کنید');
                
                // set galley setting to default
        	    $("#selectedFile").val('');
        	    $("#txt_image_gallery").val('');
        	    $(".cropit-preview-image").attr({"src":""});
        	    $("#gallery_progress_liner").css({"width":"0%"});
	                
                
            };
            img.src = _URL.createObjectURL(file);
         }
    });
    
    $("#search_part2 *").attr({"tabindex":"-1"});
    
    $("#change_search").click(function(){
		
		if($("#search_part2").attr("state") == "close"){
		    
		    $("#search_part2 *").removeAttr("tabindex");
		    $("#search_part1 *").attr({"tabindex":"-1"});
		    
		    $("#search_part2").css({"transform":"scaleY(1)","z-index":"5"});
		    $("#search_part1").css({"transform":"scaleY(0)","z-index":"1"});
		    $("#search_part2").attr({"state":"open"})
		    $("#search_part1").attr({"state":"close"})
		    
		    $(this).attr({"title":"بازگشت"});
		    
		    
		    
		}
		else{
		    
		    $("#search_part1 *").removeAttr("tabindex");
		    $("#search_part2 *").attr({"tabindex":"-1"});
		    
		    $("#search_part2").css({"transform":"scaleY(0)","z-index":"1"});
		    $("#search_part1").css({"transform":"scaleY(1)","z-index":"5"});
		    $("#search_part2").attr({"state":"close"})
		    $("#search_part1").attr({"state":"open"})
		    
		    $(this).attr({"title":"جستجوی مالی"});
		}	
	});
	
	$(".btn_search").mouseover(function(){
		$(this).find(".btn_effect").css({"height":"80px"});
		$(this).css({"transform":"scale(1.015)"});
	});
	$(".btn_search").mouseleave(function(){
		$(this).find(".btn_effect").css({"height":"0px"});
		$(this).css({"transform":"scale(1)"});
	});
	
	$(".btn_search").mousedown(function(){
		$(this).css({"transform":"scale(0.98)"});
	});
	$(".btn_search").mouseup(function(){
		$(this).css({"transform":"scale(1)"});
	});
	
	
	
	
	$('#add_checkbox').change(function() {

	    if($(this).is(":checked")){
			$("#txt_change_jari").removeAttr('disabled');
        }
		else{
			$("#txt_change_jari").attr('disabled','disabled');
			$("#txt_change_jari").val("");
		}    
	});


});
function deny_upload(){
    
    if(typeof ajaxUploderImage !== "undefined")
		    ajaxUploderImage.abort();
		    
    var uploadFor = $('#hiddenUploadFor').val();
    
    if(uploadFor == 'gallery'){
        notif_alert_manager(load_gallery_alertDialog,'1','','آپلود تصویر لغو شد');
    }
    else if(uploadFor == 'news'){
        notif_alert_manager(load_akhbar_alertDialog,'1','','آپلود تصویر لغو شد');
    }
    else if(uploadFor == 'aza'){
        notif_alert_manager(load_aza_etehadie_alertDialog,'1','','آپلود تصویر لغو شد');
    }
		
}
function payInfo(id){
    
    notif_alert_manager('','','pay_alertDialog','');
	
	document.getElementById("pay_alertDialog").innerHTML = "<div class='loader'></div>";
	
	$("document").ready(function(){
	
	    var tb_year = $("#table_holder").val();
	
        $.ajax({
        	url: 'load_payinfo_ajaxer.php',
        	type: 'post',
        	data: {id:id,tb_year:tb_year},
        	dataType: 'HTML',
        	success: function(response){
        	    

        	    $("#pay_alertDialog").html(response);
        	    
        	    $(".eyeIcon").click(function(){
        	        
        	        id = $(this).attr("idholder");
        	        detailId = "#"+id;
        	        
        	        if($(this).hasClass('grayscaleFilter')){
        	            $(".eyeIcon").addClass('grayscaleFilter');
        	            $(".pay_detail").css({"display":"none"});
        	            $(this).removeClass('grayscaleFilter');
        	            
        	            //in yeki cheshm roshan
        	            $(detailId).css({"display":"block"});
        	            
        	        }
        	        else{
        	            $(".pay_detail").css({"display":"none"});
        	            $(".eyeIcon").addClass('grayscaleFilter');
        	            // hame cheshma khamosh
        	        }
        	            
        	        
        	    });
        	    
        	    
        	    $("#close_payInfo_alert").click(function(){
            		notif_alert_manager('','1','','پنجره پرداخت بسته شد');
            	});
        	},
        	error: function() {
                // re call ajax
                
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){payInfo(id)}, 1200));
                
            }
        });
	});
}
function empty_parvande(){
    
	notif_alert_manager('','','empty_numParvande_alertDialog','');
	
    document.getElementById("empty_numParvande_alertDialog").innerHTML = "<div class='loader'></div>";
	
	$("document").ready(function(){
	
	    var tb_year = $("#table_holder").val();
	
        $.ajax({
        	url: 'load_empty_numparvande_ajaxer.php',
        	type: 'post',
        	data: {tb_year:tb_year},
        	dataType: 'HTML',
        	success: function(response){
        	    

        	    $("#empty_numParvande_alertDialog").html(response);
        	    
        	    
        	    $("#close_empty_numParvande_alert").click(function(){
            		notif_alert_manager('','1','','پنجره شماره پرونده خالی بسته شد');
            	});
        	},
        	error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){empty_parvande()}, 1200));
            }
        });
	});
    
}

function month_filter_alert(url){
    
    var month = parseInt($('#month_holder').val());
    $('#filter_select_month').val(month);
    
    $('#btn_submit_month').attr({"onclick":"submitMonthFilter('" + url + "')"});
    
    
    notif_alert_manager('','','filter_month_alertDialog','')
    
    
}

function filter_alert(type){
    
    if(type == "bedehiOzviat"){
        $("#smsKind").val('bedehiOzviat');
        $("#filterRowRaste").css({"display":"none"});
        $("#filter_alertDialog").css({"height":"470px"});
        
    }
    else if(type == "custom"){
        $("#smsKind").val('custom');
        $("#filterRowRaste").css({"display":"block"});
        $("#filter_alertDialog").css({"height":"520px"});
    }
    
    
    $("#txt_filter_custom_parvande").val('');
    $("#txt_filter_s_parvande").val('');
    $("#txt_filter_e_parvande").val('');
    $("#txt_filter_s_bedehi").val('');
    $("#txt_filter_e_bedehi").val('');
    
    $("#txt_filter_bedehi").val('');
    $("#txt_filter_mantaghe").val('');
    
    $("#filter_select_raste").val('all');
    $("#filter_select_jensiat").val('1');
    $("#filter_select_state").val('2');
    
    notif_alert_manager('','','filter_alertDialog','');
}
function filter_users(){
    
    number_seprator();
    
    var tb_year = $("#table_holder").val();
    
    var f_c_parvande = $("#txt_filter_custom_parvande").val();
    var f_s_parvande = $("#txt_filter_s_parvande").val();
    var f_e_parvande = $("#txt_filter_e_parvande").val();
    var f_s_bedehi = $("#txt_filter_s_bedehi").val();
    var f_e_bedehi = $("#txt_filter_e_bedehi").val();
    
    f_s_bedehi = f_s_bedehi.replaceAll(",", "");
    f_e_bedehi = f_e_bedehi.replaceAll(",", "");
    
    var f_mantaghe = $("#txt_filter_mantaghe").val();
    
    var f_select_raste = $("#filter_select_raste").val();
    var f_select_jensiat = $("#filter_select_jensiat").val();
    var f_select_state = $("#filter_select_state").val();
    
    var smsKind = $("#smsKind").val();
    
    var check = true
    
    
    if(f_s_parvande != '' && (isNaN(f_s_parvande) || f_s_parvande <= 0)){
		check = false;				
	}
	if(f_e_parvande != '' && (isNaN(f_e_parvande) || f_e_parvande <= 0)){
		check = false;				
	}
	if(f_s_bedehi != '' && (isNaN(f_s_bedehi) || f_s_bedehi <= 0)){
		check = false;				
	}
	if(f_e_bedehi != '' && (isNaN(f_e_bedehi) || f_e_bedehi <= 0)){
		check = false;				
	}
    
    if(check){
        
        notif_alert_manager('','1','load_filtered_users_alertDialog','');
    
        $("#load_filtered_users_alertDialog").html("<div class='loader'></div>");
        
        $.ajax({
        	url: 'filter_users_ajaxer.php',
        	type: 'post',
        	data: {tb_year:tb_year,smsKind:smsKind,f_e_bedehi:f_e_bedehi,f_s_bedehi:f_s_bedehi,f_c_parvande,f_c_parvande,f_s_parvande:f_s_parvande,f_e_parvande:f_e_parvande,f_mantaghe:f_mantaghe,f_select_jensiat:f_select_jensiat,f_select_state:f_select_state,f_select_raste:f_select_raste},
        	dataType: 'HTML',
        	success: function(response){
        	    $("#load_filtered_users_alertDialog").html(response);
        	}
        });
    }
    else{
        notif_alert_manager('','','','لطفا فیلتر ها را به دقت انتخاب نمایید');
    }
}
function show_credit_alert(){
    
	notif_alert_manager('','','credit_sms_alertDialog','');
	
	document.getElementById("credit_sms_alertDialog").innerHTML = "<div class='loader'></div>";
	
	$("document").ready(function(){
	        
        $.ajax({
        	url: './sms/getCredit_ajaxer.php',
        	type: 'post',
        	data: {callFunc:1},
        	dataType: 'HTML',
        	success: function(response){
        	    
        	    var text = '<center><br><br><div class="edit_home"><div class="text">اعتبار سامانه پیامک';
        	    text += '</div><input type="text" disabled="disabled" value="' + response + '"></div></center>';
        	    text += '<div class="btn_close_alert" onclick="';
        	    text += "notif_alert_manager('','1','','پنجره اعتبار پیامک بسته شد')";
        	    text += '"><img src="mali_close.svg" width="15px" height="15px"></div>';
        	    
                $("#credit_sms_alertDialog").html(text);
        	    
        	},
        	error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){show_credit_alert()}, 1200));
            }
        });
	});
	
    
}
function gp_sms_alert(arrId,smsKind,cost,credit){
    
	
	
	var tb_year = $("#table_holder").val();
	var count = arrId.length;
	var smsType = 'گروهی';

    if(smsKind == "bedehiOzviat"){
        
        notif_alert_manager('','1','dasti_sms_alertDialog','');
        
        var year = tb_year;
        var fullName = 'نام' + " " + 'نام خانوادگی';
        var jensiat = 'جناب آقای/سرکار خانم';
    	var bedehi = '.....';
    	
    	prepare_sms_preview(year,fullName,jensiat,bedehi,smsType,count,cost,credit);
        
        
        var typeErsal = 'bedehiGP';
        var attrOnclick = "sms_sender('" + arrId + "','" + typeErsal + "')";
        
        $("#btn_dasti_sms_submit").attr({"onclick":attrOnclick});
    
        $("#deny_preview_sms").attr({"onclick":"notif_alert_manager(filter_users,'','','ارسال گروهی پیامک لغو شد')"});
    }
    else{
        
        getCustomSmsMatnAlert(smsType,count,cost,credit);
        
        var typeErsal = 'customGP';
        var attrOnclick = "custom_sms_sender('" + arrId + "','" + typeErsal + "')";
        
        $("#btn_custom_sms_submit").attr({"onclick":attrOnclick});
    
        $("#deny_get_custom_matn_sms").attr({"onclick":"notif_alert_manager(filter_users,'','','ارسال گروهی پیامک لغو شد')"});
        
    }

    
    
}
function dasti_sms_alert(id,jensiat,name,family,bedehi,number,credit){
    
    if(bedehi != 0){
    
        notif_alert_manager('','','dasti_sms_alertDialog','');
    	
    	var tb_year = $("#table_holder").val();
    	
    	var year = tb_year;
        var fullName = name + " " + family;
    	var smsType = 'تکی';
    	var count = '1';
    	var cost = '498' + ' ریال';

    	prepare_sms_preview(year,fullName,jensiat,bedehi,smsType,count,cost,credit);
    	
    	var JFname = jensiat + ' ' + fullName;
    
        var arrId = [];
        arrId[0] = id;
        
        var typeErsal = 'bedehiTaki';
        
        var attrOnclick = "sms_sender('" + arrId + "','" + typeErsal + "')";
        $("#btn_dasti_sms_submit").attr({"onclick":attrOnclick});
        
        $("#deny_preview_sms").attr({"onclick":"notif_alert_manager(smsInfo(" + id + "),'','','ارسال پیامک لغو شد')"});
    }
    else{
        notif_alert_manager('','','','بدهی مغازه دار صفر است');
    }
}
function dasti_custom_sms_alert(id,credit){


    var count = 1;
    var cost = '498' + ' ریال';
    var smsType = 'تکی';

    var arrId = [];
    arrId[0] = id;
    
    getCustomSmsMatnAlert(smsType,count,cost,credit);
    
    var typeErsal = 'customTaki';
    var attrOnclick = "custom_sms_sender('" + arrId + "','" + typeErsal + "')";
    
    $("#btn_custom_sms_submit").attr({"onclick":attrOnclick});

    $("#deny_get_custom_matn_sms").attr({"onclick":"notif_alert_manager(smsInfo(" + id + "),'','','ارسال پیامک لغو شد')"});
    

}
function sms_sender(arrId,typeErsal){
    
    
    // To disable twice send sms
    $("#btn_dasti_sms_submit").removeAttr("onclick");
    
    var tb_year = $("#table_holder").val();
    
    $.ajax({
        url: 'sms/index.php',
        type: 'post',
        data: {tb_year:tb_year,arrId:arrId,typeErsal:typeErsal},
        dataType: 'HTML',
        success: function(response){
		    
		    if(typeErsal == 'bedehiTaki'){
		        notif_alert_manager(smsInfo(arrId),'','',response);
		    }
		    else{
		        notif_alert_manager('','1','',response);
		    }
		        
        }
    });
}
function custom_sms_sender(arrId,typeErsal){
    
    
    
    // To disable twice send sms
    $("#btn_custom_sms_submit").removeAttr("onclick");
    
    var tb_year = $("#table_holder").val();
    var matn = $("#matn_custom_sms").val();
    
    if(matn != ''){
        
        $.ajax({
            url: 'sms/customSms.php',
            type: 'post',
            data: {tb_year:tb_year,arrId:arrId,typeErsal:typeErsal,matn:matn},
            dataType: 'HTML',
            success: function(response){
    		    
    		    if(typeErsal == 'customTaki'){
    		        notif_alert_manager(smsInfo(arrId),'','',response);
    		    }
    		    else{
    		        notif_alert_manager('','1','',response);
    		    }
    		        
            }
        });
    }
    else{
        notif_alert_manager('','','','متن پیامک نمیتواند خالی باشد');
    }
}
function smsInfo(id){
    
	notif_alert_manager('','','sms_alertDialog','');
	
	document.getElementById("sms_alertDialog").innerHTML = "<div class='loader'></div>";
	
	$("document").ready(function(){
	
	    var tb_year = $("#table_holder").val();
	
        $.ajax({
        	url: 'load_smsInfo_ajaxer.php',
        	type: 'post',
        	data: {id:id,tb_year:tb_year},
        	dataType: 'HTML',
        	success: function(response){
        	    

        	    $("#sms_alertDialog").html(response);
        	    
        	    
        	    $("#close_smsInfo_alert").click(function(){
        	        
        	        notif_alert_manager('','1','','پنجره پیامک بسته شد');
        	        
            	});
        	},
        	error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){smsInfo(id)}, 1200));
            }
        });
	});
}
function getCustomSmsMatnAlert(smsType,count,cost,credit){
    
    notif_alert_manager('','1','get_custom_sms_matn_alertDialog','');
    
    // vase card box bala
	
	var title1 = 'پیامک'; 
	title1 += ' ' +  smsType + ' ';
    title1 += 'دلخواه';
    
    var title2 = 'اعتبار کل';
    title2 += ': ' + credit;
    
    
    $("#matn_custom_sms").val('');

    $("#title1_sms_custom_preview").html(title1);
    $("#title2_sms_custom_preview").html(title2);
    
}
function prepare_sms_preview(year,fullName,jensiat,bedehi,smsType,count,cost,credit){
    
	// vase card box bala
	
	var title1 = 'پیامک'; 
	title1 += ' ' +  smsType + ' ';
    title1 += 'حق عضویت';
    
    var title2 = 'اعتبار کل';
    title2 += ': ' + credit;

    $("#title1_sms_preview").html(title1);
    $("#title2_sms_preview").html(title2);
    
    // vase card box pain
    
    var tedad = 'تعداد افراد';
    tedad += ': ' + count;
    
    var hazine = 'هزینه کل';
    hazine += ': ' + cost;
    
    numCredit = credit.replace(/[^0-9]/g,'');
    numHazine = hazine.replace(/[^0-9]/g,'');
    
    var mande = (numCredit  - numHazine).toLocaleString();
    
    var etabar = 'مانده اعتبار';
    etabar += ': ' + mande;
    
    $("#sms_detail1").html(tedad);
    $("#sms_detail2").html(hazine);
    $("#sms_detail3").html(etabar);
    
    
    
    // vase matn preview div
    
    var temp = 'با احترام، بدهی حق عضویت شما تا پایان سال ';

    var matn = '<font class="blanks">';    
    
    matn += jensiat + " " + fullName + "</font><br><div style='height: 7px;'></div>";
    
    
    matn += " " + temp + " ";
    
    matn += '<font class="blanks">';    
    matn += year + "</font>" + " مبلغ ";
    matn += '<font class="blanks">';    
    matn += bedehi + "</font>" + " ";
    
    temp = 'ریال میباشد. لطفا در اسرع وقت پرداخت نمایید.';
    
    temp += "<br>" + 'شماره کارت اتحادیه:';
    
    temp += "<br>" + '6104337431380086';
    
    

    
    temp += "<br>" + 'اتحادیه صنف پوشاک سمنان';

    matn += temp;
    
    $("#matnSmsDasti").html(matn);
    
}
function submitMonthFilter(url){
    
    
    notif_alert_manager('','1','load_filtered_month_alertDialog','');

    document.getElementById("load_filtered_month_alertDialog").innerHTML = "<div class='loader'></div>";

    $("document").ready(function(){		
        
        var f_select_month = $("#filter_select_month").val();
        var f_select_month_text = $("#filter_select_month option:selected").text();
        var tb_year = $("#table_holder").val();
        
        $.ajax({
			url: url,
			type: 'post',
			data: {f_select_month:f_select_month,f_select_month_text:f_select_month_text,tb_year:tb_year},
			dataType: 'HTML',
			success: function(response){
			    
			    $("#load_filtered_month_alertDialog").html(response);
                
			},
        	error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){submitMonthFilter(url)}, 1200));
            }
		});
    });
    
    
}
function detailSearchRow(numParvande){
    
    
    search_pak();
    
    
    
    $("#search_parvande").val(numParvande);
    
    
    refresh_list();
    
    var matn = "جستجوی پرونده ";
    matn += numParvande;
    	
	notif_alert_manager('','1','',matn);
    
    
}
function natije_detail(type){
    
    var duty = $("#query_holder").val();
    duty = duty.replaceAll("'",'$lol$');
    
    
    
    
    notif_alert_manager('','1','load_natije_detail_alertDialog','');

    document.getElementById("load_natije_detail_alertDialog").innerHTML = "<div class='loader'></div>";
	
        
    var tb_year = $("#table_holder").val();
    
    $.ajax({
		url: 'natije_details_ajaxer.php',
		type: 'post',
		data: {type:type,duty:duty,tb_year:tb_year},
		dataType: 'HTML',
		success: function(response){
		    
		    $("#load_natije_detail_alertDialog").html(response);
            
		}
	});
    
}
function empty_alerts(){
    
    $(".default_empty_alertDialog").html('');
    
}
function etmam_print(){
    
    
    $("document").ready(function(){		
        
        $('#setPagePrintSize').html('<style>@page{size:a4;}</style>');
            
        $('.roydad_title_row').css({"margin-right":"8px"});
        $('#scroll_filtered_etmam').css({"overflow-y":"initial"});
        
        $('#print_part_etmam').print();
        
        $('.roydad_title_row').css({"margin-right":"25px"});
        $('#scroll_filtered_etmam').css({"overflow-y":"scroll"});
    
    });
}
function tavalod_print(){
    
    
    $("document").ready(function(){		
        
        $('#setPagePrintSize').html('<style>@page{size:a4;}</style>');
            
        $('.roydad_title_row').css({"margin-right":"8px"});
        $('#scroll_filtered_tavalod').css({"overflow-y":"initial"});
        
        $('#print_part_tavalod').print();
        
        $('.roydad_title_row').css({"margin-right":"25px"});
        $('#scroll_filtered_tavalod').css({"overflow-y":"scroll"});
    
    });
}
function openNemodar(type){
    
    if(type == 'sotoniPay')
        url = 'nemodar_sotoni_pay_ajaxer.php';
        
    if(type == 'sotoniTypePay')
        url = 'nemodar_sotoni_typePay_ajaxer.php';
        
    if(type == 'dayereBedehi')
        url = 'nemodar_dayere_pay_ajaxer.php';
        
    if(type == 'sotoniJoin')
        url = 'nemodar_sotoni_join_ajaxer.php';
        
    if(type == 'sotoniRaste'){
        url = 'nemodar_sotoni_raste_ajaxer.php';
    }
    
    if(type == 'dayereRaste'){
        url = 'nemodar_sotoni_raste_ajaxer.php';
    }
        
        
    
    notif_alert_manager('','1','nemodar_alertDialog','');
    $("document").ready(function(){		
        
        $("#nemodar_loading_part").html("<div class='loader'></div>");
        $("#nemodar_hider").hide();
        
        
        var tb_year = $("#table_holder").val();

        $.ajax({
			url: url,
			type: 'post',
			data: {type:type,tb_year:tb_year},
			dataType: 'JSON',
		    success: function(response){
		    
		        if(type == 'sotoniTypePay')
		            ChartSotoniTypePay(response);
		    
		        if(type == 'sotoniPay')
		            ChartSotoniPay(response);
		    
		        if(type == 'dayereBedehi')
                    ChartDayereBedehi(response);
                    
                if(type == 'sotoniJoin')
                    ChartSotoniJoin(response);
                    
                if(type == 'sotoniRaste')
                    ChartSotoniRaste(response);
                    
                if(type == 'dayereRaste')
                    ChartDayereRaste(response);
                
                
			},
        	error: function() {
                // re call ajax
                clearAllTimeOut();
                timeouts.push(setTimeout(function(){openNemodar(type)}, 1200));
            }
		});
    });
}
function drawNemodar(color,title,axisTitle,dataArr){

    var siteName = $("#siteName").val();

    $("#nemodar_loading_part").html("");
    $("#nemodar_hider").fadeIn(); 
    
    CanvasJS.addColorSet("customColor",color);
    
    var chart = new CanvasJS.Chart("chartContainer", {
    	animationEnabled: true,
    	colorSet: "customColor",
    	title:{
    		text:title,
    		fontFamily: "IRANSans,tahoma,sans-serif",
    	    fontSize: 22,
    	    margin: 12,
    	},
    	
    	subtitles: [{
    		text: siteName,
    		fontFamily: "IRANSans,tahoma,sans-serif",
    	    fontSize: 13,
    	}],
    	axisY: {
    		title: axisTitle,
    		titleFontSize: 15,
    		titleFontFamily: "IRANSans,tahoma,sans-serif",
    		labelFontFamily: "IRANSans,tahoma,sans-serif",
    	},
    	axisX: {
    	    labelFontFamily: "IRANSans,tahoma,sans-serif",
    	    labelFontSize: 13,
    	    labelMaxWidth: 55,  
            labelWrap: true,
            labelTextAlign: "right",
    	},
    	toolTip:{
          fontFamily: "IRANSans,tahoma,sans-serif",
          fontColor: "black",
         },
         legend:{
            fontFamily: "IRANSans,tahoma,sans-serif",
            verticalAlign: "top",
            horizontalAlign: "right",
         },
    	data: dataArr
    });
    chart.render();
}
function ChartSotoniTypePay(dataResponse){
    
    var color =  [//colorSet Array
        "#2ce23a",//green pay
    ];

    var tb_year = $("#table_holder").val();
    var axisTitle = "مبلغ پرداختی به میلیون ریال";
    
    var title =  'نمودار پرداختی ها در سال مالی ';
    title += tb_year;
    
    var dataArr = [{
		type: "column",
		indexLabelFontFamily: "IRANSans,tahoma,sans-serif",
		indexLabelFontColor: "black",
		indexLabelPlacement: "inside",    //Try Changing to outside
		indexLabelFontSize: 16,
		indexLabel: "{y}", 
		dataPoints:dataResponse,
		
		
	}];

    drawNemodar(color,title,axisTitle,dataArr);
}
function ChartSotoniPay(dataResponse){
    
    var color = [//colorSet Array
        "#2ce23a",//green pay
        "#efef38",//zard takhfif
    ];
    
    var tb_year = $("#table_holder").val();
    var axisTitle = "مبلغ پرداختی به میلیون ریال";
    
    var title =  'نمودار پرداختی ها در سال مالی ';
    title += tb_year;
    
    var date1 = dataResponse[0];
    var date2 = dataResponse[1];
    
    var dataArr = [{
		type: "column",
		name: "پرداخت",
		showInLegend: true,
		indexLabelFontFamily: "IRANSans,tahoma,sans-serif",
		indexLabelFontColor: "black",
		indexLabelFontSize: 14,
		indexLabelBackgroundColor: "white",
		indexLabel: "{y}", 
		dataPoints:date1,
		
	},{
		type: "column",
		name: "تخفیف",
		showInLegend: true,
		indexLabelFontFamily: "IRANSans,tahoma,sans-serif",
		indexLabelFontColor: "black",
		indexLabelFontSize: 14,
		indexLabel: "{y}", 
		dataPoints:date2,
	}];

    drawNemodar(color,title,axisTitle,dataArr);
}
function ChartSotoniJoin(dataResponse){
    
    var color =  [//colorSet Array
        "#38EDFF",//abi asli color
    ];
    
    var tb_year = $("#table_holder").val();
    
    var axisTitle = "واحد شمارش نفر میباشد";
    var title =  'نمودار تعداد اعضای جدید در سال مالی ';
    title += tb_year;
    
    var dataArr = [{
		type: "column",
		indexLabelFontFamily: "IRANSans,tahoma,sans-serif",
		indexLabelFontColor: "black",
		indexLabelPlacement: "inside",    //Try Changing to outside
		indexLabelFontSize: 16,
		indexLabel: "{y}", 
		dataPoints:dataResponse,
		
	}];

    drawNemodar(color,title,axisTitle,dataArr);
}
function ChartSotoniRaste(dataResponse){
    
    
    var color =  [//colorSet Array
        "#38EDFF",//abi asli color
    ];
    
    var tb_year = $("#table_holder").val();
    
    var axisTitle = "واحد شمارش نفر میباشد";
    var title =  'نمودار تعداد اعضای رسته ها در سال مالی ';
    title += tb_year;
    
    var dataArr = [{
		type: "column",
		indexLabelFontFamily: "IRANSans,tahoma,sans-serif",
		indexLabelFontColor: "black",
		indexLabelPlacement: "inside",    //Try Changing to outside
		indexLabelFontSize: 16,
		indexLabel: "{y}", 
		dataPoints:dataResponse,
		
	}];

    drawNemodar(color,title,axisTitle,dataArr);
}
function ChartDayereRaste(dataResponse){
    
    
    var color =  [//colorSet Array
        '#e6194b', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#46f0f0', '#f032e6', '#bcf60c', '#fabebe', '#008080', '#e6beff', '#9a6324', '#fffac8', '#800000', '#aaffc3', '#808000', '#ffd8b1', '#000075', '#808080',
    ];
    
    var tb_year = $("#table_holder").val();
    
    var axisTitle = '';
    var title =  'نمودار دایره ای رسته ها در سال مالی ';
    title += tb_year;
    
    var dataArr = [{
		type: "pie",
		showInLegend: "true",
		indexLabelFontFamily: "IRANSans,tahoma,sans-serif",
		indexLabelFontColor: "black",
		indexLabelFontSize: 14,
		indexLabelBackgroundColor: "white",
		legendText: "{label}",
		indexLabel: "%{label} - #percent",
		yValueFormatString: "#,##0 نفر",
		dataPoints:dataResponse
	}];

    drawNemodar(color,title,axisTitle,dataArr);
    
    
}
function ChartDayereBedehi(dataResponse){
    
    
    var color =  [//colorSet Array
        "#f53838",//red bedehi
        "#2ce23a",//green pay
        "#efef38",//zard takhfif
    ];
    
    var tb_year = $("#table_holder").val();
    
    var axisTitle = '';
    var title =  'نمودار دایره ای حق عضویت در سال مالی ';
    title += tb_year;
    
    var dataArr = [{
		type: "pie",
		showInLegend: "true",
		indexLabelFontFamily: "IRANSans,tahoma,sans-serif",
		indexLabelFontColor: "black",
		indexLabelFontSize: 14,
		indexLabelBackgroundColor: "white",
		legendText: "{label}",
		indexLabel: "%{label} - #percent",
		yValueFormatString: "#,##0 ریال",
		dataPoints:dataResponse
	}];
    drawNemodar(color,title,axisTitle,dataArr);
}
function exportNemodar(type){

    var x = document.getElementsByClassName("canvasjs-chart-canvas");
    var canvas = x[0];
    var img    = canvas.toDataURL("image/png");
    
    var inputImage = new Image();
    inputImage.src = img;
    var outputImage = document.createElement('canvas');

    inputImage.addEventListener('load', function(e){
        
        // set it to the same size as the image
        outputImage.width = inputImage.naturalWidth;
        outputImage.height = inputImage.naturalHeight;
    
        // draw our image at position 0, 0 on the canvas
        var ctx = outputImage.getContext('2d');
        ctx.drawImage(inputImage,0,12);    
        
        var newimg = outputImage.toDataURL("image/png");
        
        if(type == "download"){
            
            var fileName = "nemodar.png";
            const a = document.createElement("a");
            a.href = newimg;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        }
        
        if(type == "print"){
            document.getElementById("imgCanvas").innerHTML="<img style='margin-top:20px;' src = '"+newimg+"'/>";
            $('#setPagePrintSize').html('<style>@page{size:a5 landscape}</style>');
            
            // show print and then hide
            $('#imgCanvas').css({"display":"inherit"});
            $('#imgCanvas').print();
            $('#imgCanvas').css({"display":"none"});
        }
    });
}
function printAlertDialog(partId,scrollId,printSize){
    
    var script = document.createElement('script');
    script.src = './jQuery.print.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    
    $('#setPagePrintSize').html('<style>@page{size:' + printSize + ';}</style>');
    
    $.getScript(script.src, function(){
        
        $('.roydad_title_row').css({"margin-right":"8px"});
        $('#' + scrollId).css({"overflow-y":"initial"});
        $('.notPrint,.btn_close_alert,.home_tools').hide();
        $('.printBr').css({"display":"block"});

        $('#' + partId).print();
        
        $('.roydad_title_row').css({"margin-right":"25px"});
        $('#' + scrollId).css({"overflow-y":"scroll"});
        $('.notPrint,.btn_close_alert,.home_tools').show();
        $('.printBr').css({"display":"none"});
    });
}
function printDeatilSearch(){
    
    var script = document.createElement('script');
    script.src = './jQuery.print.js';
    script.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(script);
    
    $('#setPagePrintSize').html('<style>@page{size:a4;}</style>');
    
    $.getScript(script.src, function(){
    
        $('.roydad_title_row').css({"margin-right":"8px"});
        $('#scroll_detail_search').css({"overflow-y":"initial"});
        
        $('#print_part_detail_search').print();
        
        $('.roydad_title_row').css({"margin-right":"25px"});
        $('#scroll_detail_search').css({"overflow-y":"scroll"});
        
    });
}
function clearAllTimeOut(){
    
    for (var i = 0; i < timeouts.length; i++) {
        
        if(typeof timeouts[i] !== "undefined"){
            
            clearTimeOut(timeouts[i]);
        
            var index = timeouts.indexOf(timeouts[i]);
            if (index !== -1)
                timeouts.splice(index, 1);
        }
    }
    //quick reset of the timer array you just cleared
    //timeouts = [];
}
function refresh_alerts(){
    clearAllTimeOut()
    empty_alerts();
    
	        
}
function notif_alert_manager(ReturnFunc,closeAlerts,openAlertId,matn){
    
    if(closeAlerts != ''){
    	refresh_alerts();
    	
    	$("#darkness").css({"visibility":"hidden"});
    	$(".alertDialog").css({"visibility":"hidden","transform":"translate(-50%,-50%) scale(0)"});
    	$(".home_pager").removeClass("selected_pager");
    }
    
    if(openAlertId != ''){
        
        refresh_alerts();
        
        if(parseInt($("#notification").css('top')) == 80){
            $("#notification").stop( true, true ).animate({"top":"-90px","width":"0px"},250);
        }
        
        var id = "#" + openAlertId;
        $("#darkness").css({"visibility":"visible"});
    	$(".alertDialog").css({"visibility":"hidden","transform":"translate(-50%,-50%) scale(0)"});
        $(id).css({"visibility":"visible","transform":"translate(-50%,-50%) scale(1)"});     
    }
    
    if(matn != ''){
        
        $("#notification").find(".text").html(matn);
        //prevent from repeating animate (stop last animate) and turn notif to default situation
	    $("#notification").stop( true, true ).animate({"top":"-90px","width":"0px"},100);
	    $("#notification").animate({"top":"80px","width":"220px"},250).animate({"top":"80px"},1100).animate({"top":"-90px","width":"0px"},150);
	    
    }
    
    
    if(ReturnFunc != ''){
        ReturnFunc();
    }
	
    
}
function confirm_manager(forId,titleConfirm,submitFunc,matnSubmit,denyFunc,matnDeny){
    
    
    notif_alert_manager('','','confirm_alertDialog','');
    
    $("#titleConfirm").html(titleConfirm);
    $("#btn_submit_confirm").attr({"onclick":submitFunc + "('" + forId + "')"});
    $("#btn_submit_confirm").find(".text").html(matnSubmit);
    
    $("#btn_deny_confirm").attr({"onclick":denyFunc + '()'});
    $("#btn_deny_confirm").find(".text").html(matnDeny);
    
    
}