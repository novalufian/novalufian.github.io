/*===============================================================================================================	
Author     : Muhammad Febriansyah
Date       : November 2016
 =============================================================================================================== */
$(document).ready(function() {
	
	//loadAPI();

	/**
	 * jTinder initialization
	 */

	

	$(".onlyNumber").on("keypress keyup blur",function (event) {    
       $(".onlyNumber").val($(".onlyNumber").val().replace(/[^\d].+/, ""));
        if ((event.which < 48 || event.which > 57)) {
            event.preventDefault();
        }
    });
    $("#fullname").on("keyup", function(e) {
	    if (e.which === 32 && !this.value.length)
	        e.preventDefault();
	});

	$.validator.addMethod("regex", function(value, element, regexpr) {          
     return regexpr.test(value);
   }, "Please enter a valid Email.")

	jQuery.validator.addMethod("noSpace", function(value, element) { 
		return value.indexOf(" ") < 0 && value != ""; 
	}, "No space please and don't leave it empty");

    $("#biodata_form").validate({
		rules: {
			emailUser:{
				regex: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.(?:com|org|co.id|net|id))+$/,
				
			},
			fullname:{
				required: {
			        depends:function(){
			            $(this).val($.trim($(this).val()));
			            return true;
			        }
			    },
				
			} ,
			noHp:{
				required: true,
				number: true
			}
       	},
		focusInvalid: false,
		submitHandler: function() {
			$("#swiper_step1").hide();
			$("#swiper_step2").fadeIn();
			setTimeout(function(){
				loadAPI();
		    }, 1000);
		},
		errorPlacement: function(error, element) {
	        error.insertAfter(element.parent('.field'));
	    } 
	});

	/*$("#nextPage1").click(function(e){

 		var texInput= $(".input_floating").val();
 		var parentInput = $(".input_floating").closest(".field");


 		if (!$.trim($(texInput).val()).length) {
 			//alert("kosong");
 			$(parentInput).addClass("errorField");
 			$(parentInput).siblings(".erorr_help").show();
 		}else{

 		}

 	});*/

});
