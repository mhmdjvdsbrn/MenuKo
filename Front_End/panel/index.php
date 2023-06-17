
<!doctype html>
<html lang="fa" dir="ltr">
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="google-site-verification" content="AxinQ-BceQbrhJuRAiYYJwBXLJyKTnKUwMuKkM2mmzk" />
    <meta name="description" content="وب سایت رسمی  "/>
    
    <title>پنل مغازه دار</title> 
    <link rel="stylesheet" href="../setting.css">
    <link rel="stylesheet" href="../index_style.css">
    
</head>
<body>
<div style="height:20px"></div>
<div id="notification">
	<center>
    	<div class="text"></div>
	</center>
</div>
<center>
<div id="notification">
	<center>
    	<div class="text"></div>
	</center>
</div>

<div style="display:inline-flex;direction:ltr">
    <div class="div" style="width:400px;margin: 15px;">
        <br>
        <div class="text" style="font-size:12.7pt;">ورود به پنل مغازه دار</div>
        
        <br>
        <div style="background-color:#ececec;width:100%;height:1px;"></div>
        <br>
        
        <form action="home.php" method="post" id="form1">
        	<div class="text label">
        	    نام کاربری
        	</div>
        	<div class="custom_br"></div>
        	<input type="text" id="txt_username"  name="hide_username" class="txt" placeholder="نام کاربری را وارد کنید">
        	
        	<br>
        	<div class="custom_br"></div>
        	
        	<div class="text label">
        	    رمز عبور
        	</div>
        	<div class="custom_br"></div>
        	<input type="password" id="txt_pass" placeholder="رمز را وارد کنید" name="hide_pass" class="txt">
        	
        	<input name="data" id="data" type='hidden' value='0'>
        	</form>
        
        
        <button class="btn vorod_btn" style="margin-top: 25px;background-color:#ff6c5f;color: white;">
        	<div class="btn_effect"></div>
        	<div class="text" style="font-size:12pt;color: white;">
        		ورود
        	</div>
        </button>
        
        <br><br>
        <div class="custom_br"></div>
        
        <div style="background-color:#ececec;width:100%;height:1px;"></div>
        
        <div style="height: 100%;width: 100%;background: #ffceca;">
        
            
            
            <div class="text" style="font-size:13pt;padding-top: 25px;">
            	نام کاربری و رمز عبور را از کجا بیاورم؟
            </div>
        
        </div>
        
    </div>
</div>



</body>

<script src="../jquery.min.js"></script>

<script>

$("document").ready(function(){

    
    $("#goToTop").click(function(){
		$("html").animate({scrollTop: 0}, 400);
	});
    
    $(".btn").mouseover(function(){
		$(this).find(".btn_effect").css({"height":"60px"});
	});
	$(".btn").mouseleave(function(){
		$(this).find(".btn_effect").css({"height":"0px"});
	});
	
	$('body').bind('keydown', function(e) {
        if(e.keyCode==13){
            vorod();
        }
    });
	
	$(".vorod_btn").click(function(){
	    
	    vorod();
		
	});
	
	
	function vorod(){
	    var password = $("#txt_pass").val();
	    var username = $("#txt_username").val();
	    var senfId = $("#txt_senfId").val();
	    var check = true;
	    
	    if(password == "" || username==""){
	        check = false;
	        $("#notification").find(".text").html("لطفا همه فیلد ها را پر کنید");
		    $("#notification").animate({"top":"20px","width":"220px"},250).delay(1100).animate({"top":"-90px","width":"0px"},150);
	    }
		
		if(check){
		    
        	$.ajax({
        		url: '../api/api_login.php',
        		type: 'post',
        		data: {password:password,username:username},
        		dataType: 'HTML',
        		success: function(response){
        		    
        		    if(response == '0'){
    		            $("#notification").find(".text").html("نام کاربری یا رمز عبور اشتباه است");
                		$("#notification").animate({"top":"20px","width":"220px"},250).delay(1100).animate({"top":"-90px","width":"0px"},150);
    		        }
    		        else{
		                $('#form1').attr('action', 'home.php');
		                $('#data').val(response);
		                $( "#form1" ).submit();
		            }
        	    
        		},
        		error: function (request, status, error) {
                    alert(request.responseText);
                }
        	});
	    }
	}
	
});
</script>

</html>