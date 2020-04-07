$(function() {
			
		  $('.highlight_box').click(function(event) {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
			  'event': "click",
			  'feature_name': "fitur-highlight",
			  'feature_location': "center",
			  'feature_position': this.slot
			});
			//event.preventDefault();
		  });	
		  
		  $('.swiper_box').click(function(event) {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
			  'event': "click",
			  'feature_name': "ampstories",
			  'feature_location': "ampstories",
			  'feature_position': this.slot,
			  'page_type' : "AMPSTORY"
			});
			//event.preventDefault();
		  });	
		  
		  $('.col-sm-6').click(function(event) {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
			  'event': "click",
			  'feature_name': "most-popular",
			  'feature_location': "bottom",
			  'feature_position': this.slot
			});
			//event.preventDefault();
		  });		
		
		  $('.topik_pilihan').click(function(event) {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
			  'event': "click",
			  'feature_name': "most-popular",
			  'feature_location': "bottom",
			  'feature_position': this.slot
			});
			//event.preventDefault();
		  });		
		
		  $('.event_update_').click(function(event) {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
			  'event': "click",
			  'feature_name': "update-terbaru",
			  'feature_location': "bottom",
			  'feature_position': this.slot
			});
			//event.preventDefault();
		  });		
		  
		  $('.tagkllist').click(function(event) {
			window.dataLayer = window.dataLayer || [];
			window.dataLayer.push({
			  'event': "click",
			  'feature_name': "tag-box",
			  'feature_location': "bottom",
			  'feature_position': this.slot
			});
			//event.preventDefault();
		  });		
		  							  	
		  var $doc = $(document);
		  var $win = $(window);
		  var itemstoshow = 1;
		  $(window).scroll(function() {
			if ($('.highlightv2').val() == '') {
			  var top_of_element = $(".highlightv2").offset().top;
			  var bottom_of_element = $(".highlightv2").offset().top + $(".highlightv2").outerHeight();
			  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
			  var top_of_screen = $(window).scrollTop();

			  if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
				  'event': "impression",
				  'feature_name': "fitur-highlight",
				  'feature_location': "center",
				  'feature_position': "",
				  'page_type' : ""				  
				});
				$(".highlightv2").val("done");
			  } else {
				// the element is not visible, do something else
			  }
			}
			
			if ($('.box_stories').val() == '') {
			  var top_of_element = $(".box_stories").offset().top;
			  var bottom_of_element = $(".box_stories").offset().top + $(".box_stories").outerHeight();
			  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
			  var top_of_screen = $(window).scrollTop();

			  if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
				  'event': "impression",
				  'feature_name': "ampstories",
				  'feature_location': "ampstories",	
				  'feature_position': "",
				  'page_type' : ""			  
				});
				$(".box_stories").val("done");
			  } else {
				// the element is not visible, do something else
			  }
			}			
			
			if ($('.most_popular').val() == '') {
			  var top_of_element = $(".most_popular").offset().top;
			  var bottom_of_element = $(".most_popular").offset().top + $(".most_popular").outerHeight();
			  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
			  var top_of_screen = $(window).scrollTop();

			  if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
				  'event': "impression",
				  'feature_name': "most-popular",
				  'feature_location': "bottom",
				  'feature_position': "",
				  'page_type' : ""
				});
				$(".most_popular").val("done");
			  } else {
				// the element is not visible, do something else
			  }
			}
			
			if ($('.column-v3').val() == '') {
			  var top_of_element = $(".column-v3").offset().top;
			  var bottom_of_element = $(".column-v3").offset().top + $(".column-v3").outerHeight();
			  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
			  var top_of_screen = $(window).scrollTop();

			  if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
				  'event': "impression",
				  'feature_name': "topik-pilihan",
				  'feature_location': "bottom",
				  'feature_position': "",
				  'page_type' : ""
				});
				$(".column-v3").val("done");
			  } else {
				// the element is not visible, do something else
			  }
			}
			
			if ($('.update_terbaru').val() == '') {
			  var top_of_element = $(".update_terbaru").offset().top;
			  var bottom_of_element = $(".update_terbaru").offset().top + $(".update_terbaru").outerHeight();
			  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
			  var top_of_screen = $(window).scrollTop();

			  if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
				  'event': "impression",
				  'feature_name': "update-terbaru",
				  'feature_location': "bottom",
				  'feature_position': "",
				  'page_type' : ""
				});
				$(".update_terbaru").val("done");
			  } else {
				// the element is not visible, do something else
			  }
			}
			
			if ($('.kl-list-box-2').val() == '') {
			  var top_of_element = $(".kl-list-box-2").offset().top;
			  var bottom_of_element = $(".kl-list-box-2").offset().top + $(".kl-list-box-2").outerHeight();
			  var bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
			  var top_of_screen = $(window).scrollTop();

			  if ((bottom_of_screen > top_of_element) && (top_of_screen < bottom_of_element)) {
				window.dataLayer = window.dataLayer || [];
				window.dataLayer.push({
				  'event': "impression",
				  'feature_name': "tag-box",
				  'feature_location': "bottom",
				  'feature_position': "",
				  'page_type' : ""
				});
				$(".kl-list-box-2").val("done");
			  } else {
				// the element is not visible, do something else
			  }
			}
			
		  });
		})
