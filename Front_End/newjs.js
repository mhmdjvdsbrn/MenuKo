$("document").ready(function(){
    
    
    
    function updateCategory(token){
        
        $.ajax({
    			url: 'api_getCategory.php',
    			type: 'post',
    			data: {token:token},
    			dataType: 'HTML',
    			success: function(response){
    			    $("#loadinfo_select_raste").html(response)
    			}
        });
    }


});
    