$(function(){ 
	// ----- native-swiper
    if(typeof swiper !== "undefined"){
    	var swiper = new Swiper('.swiper-native.swiper-container', {
    		slidesPerView: 'auto',
    		grabCursor: true,
    		spaceBetween:15,
    		freeMode:true,
    		touchRatio:0.8
    	})
    }
    
	// ---- native-detail-link
	$(".native-detail-link").click(function() {
	    var $this    = $(this);
	    var $iframe  = $this.closest('.slot-youtubev2').find(".slot-iframe iframe").attr("src", $this.data("link"));
	    var $title   =  $this.closest('.slot-youtubev2').find(".slot-native-lg h6").text($this.data("title"));
        var $twitter =  $this.closest('.slot-youtubev2').find(".share-sosmed").find(".tweet").attr("href", $this.data("twitter"));
        var $fb      =  $this.closest('.slot-youtubev2').find(".share-sosmed").find(".fb").attr("href", $this.data("fb"));        
        var $gplus   =  $this.closest('.slot-youtubev2').find(".share-sosmed").find(".gplus").attr("href", $this.data("gplus"));
        var $wa      =  $this.closest('.slot-youtubev2').find(".share-sosmed").find(".wa").attr("href", $this.data("wa"));
        var $bbm     =  $this.closest('.slot-youtubev2').find(".share-sosmed").find(".bbm").attr("href", $this.data("bbm"));
	});
	
    $(document).on('click', '.native-btn-share', function(e){
		$(this).toggleClass('open')
		if ($(this).hasClass("open")){
			$(this).closest('.slot-deskrip').addClass('transparent'); 
			$(this).parent().find('.share-sosmed').addClass('slide-animation');
		}else{
			$(this).closest('.slot-deskrip').removeClass('transparent'); 
			$(this).parent().find('.share-sosmed').removeClass('slide-animation')
		}
	});
	
	$(document).bind( "mouseup touchend", function(e){
		var container = $('.share-animation');
		if (!container.is(e.target) && container.has(e.target).length === 0){
			$('.native-btn-share').removeClass('open');
			$('.slot-deskrip').removeClass('transparent'); 
			$('.share-sosmed').removeClass('slide-animation')
		}
	});
});