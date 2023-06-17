function refresh_menu_moshtari(){
    
    var id = $("#idHolder").val();
    
    $.ajax({
		url: '../api/load_menu_for_moshtari.php',
		type: 'post',
		data: {id:id},
		dataType: 'HTML',
		success: function(response){

			$("#asli_main_score").html(response);

		}
	});
	
    
}
$(document).scroll(function(e){

    control_scroll();

});
$("document").ready(function(){
    
    refresh_menu_moshtari();
    control_scroll();
    
    var scrollAmount = $(window).scrollTop();
    $("#counterCategories").val(scrollAmount);
});
function scrollToDiv(id){
    
    
    var element = "#categoryId" + id;
    $('html, body').animate({
        scrollTop: $(element).offset().top - 80
    }, 200);
}
function control_scroll(){
    // grab the scroll amount and the window height
    var scrollAmount = $(window).scrollTop();
    var documentHeight = $(document).height();
    
    
    if(scrollAmount <= 332) {
        
        $('#category_box').css({"top":"332px","position": "absolute"});
    }
    
    if(scrollAmount > 332) {
        
        
        $('#category_box').css({"top":"0px","position":"fixed"});
    }
    
    var counterCategories = $("#counterCategories").val();
    
    var i;
    for (i = 0; i < counterCategories; ++i) {
        
        var element = "#categoryId" + i;
        var scroll = $(element).offset().top - 80;

        if(scroll - scrollAmount < 50){
            
            $(".category").css({"background":"white","color":"black"});
            $("#btnCategory" + i).css({"background":"var(--score-Asli-color)","color":"white"});
            
        }
    }


}