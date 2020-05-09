/*=======================================================================================================	
Author     : Muhammad Febriansyah
Date       : Mei 2016
 ========================================================================================================== */
var tokenBearer = "";
var apiPage='';
var proses=1;
function carouselBan(){
	$('.banner-carousel').owlCarousel({
	    loop:true,
	    margin:10,
	    nav:true,
	    responsive:{
	        0:{
	            items:1
	        },
	        600:{
	            items:3
	        },
	        1000:{
	            items:5
	        }
	    }
	})
}

function loadAPI(){
	$.ajax({
	  url: 'https://dev.one.co.id/oauth/token',
	  dataType: 'json',
	  crossDomain: true,
	  type: 'POST',
	  data: {grant_type: "client_credentials", client_id: "16",client_secret: "fIQ53rqYUmndCijKdUbAESTNAxTbyXdOydoLjbju" },
	    beforeSend: function (xhr) {
	    },
	  success: function(object) {
	  	tokenBearer = (object.access_token);
	  	newsAPI (tokenBearer);
	  }
	});
}

function newsAPI(tokenBearer){
	tokenBearer= tokenBearer;
	$.ajax({
	  url: 'https://dev.one.co.id/api/ap2/article/headline',
	  dataType: 'json',
	  crossDomain: true,
	  type: 'GET',
	  beforeSend: function (xhr) {
	  	xhr.setRequestHeader("Authorization", "Bearer "+tokenBearer);
		proses='2';
	  },
	  success: function(object) {
		//console.log(object);
		var news = (object.data);
		var _str = "";
		 apiPage= (object.meta.pagination.links.next);
		var _paging = '<a id="next" href="'+object.meta.pagination.links.next+'" style="opacity:0">next page?</a>'
		$.each(news, function(i, k){
			_str=_str+'<div class="group_news">';
			_str=_str+'<a href="'+k.source+'">';
			_str=_str+'<div class="thumb_news"><img src="'+k.photos[0].photo_url+'"></div>';
			_str=_str+'<div class="caption_news"><h3>'+k.title+'</h3><span>'+k.publisher.publisher_name+'</span></div>';
			_str=_str+'</a>';
			_str=_str+'</div>';
		});

		$('#list-newsnya').html(_str);
		$('#paging').html(_paging);
		$('#paging').attr('data-url',apiPage);
		// newsAPIPaging(apiPage);
		// loadMore(apiPage);
		
		proses='1';
		//var scrollHeight = $(document).height();
		//var scrollPosition = $(window).height();
		//console.log(scrollHeight+','+scrollPosition);
		//scrollnya(scrollHeight,scrollPosition);
	  }
	});
}


function newsAPIPaging(){

	var apiPage = $('#paging').attr('data-url');
	console.log('urlnya '+apiPage);
	$.ajax({
	  url: apiPage,
	  dataType: 'json',
	  crossDomain: true,
	  type: 'GET',
	  beforeSend: function (xhr) {
	  	$('.loadCenter').show();
	  	xhr.setRequestHeader("Authorization", "Bearer "+tokenBearer);
		proses='2';
	  },
	  success: function(object) {
		//console.log(object);
		$('.loadCenter').hide();
		var news = (object.data);
		var apiPage= (object.meta.pagination.links.next);
		var _str = "";
		$.each(news, function(i, k){
			_str=_str+'<div class="group_news">';
			_str=_str+'<a href="'+k.source+'">';
			_str=_str+'<div class="thumb_news"><img src="'+k.photos[0].photo_url+'"></div>';
			_str=_str+'<div class="caption_news"><h3>'+k.title+'</h3><span>'+k.publisher.publisher_name+'</span></div>';
			_str=_str+'</a>';
			_str=_str+'</div>';
		});
		$('#list-newsnya').append(_str);
		$('#paging').attr('data-url',apiPage);
		
		//var scrollHeight = $(document).height();
		//var scrollPosition = $(window).height();
		proses='1';
		//console.log(scrollHeight+','+scrollPosition);
		//scrollnya(scrollHeight,scrollPosition);

	  }
	});
}

 	$(window).scroll(function(){
 		console.log($(window).scrollTop()+','+$(document).height())
        if($(window).height() + $(window).scrollTop()  >= $(document).height() - 100) {
            if(proses==1){
			  newsAPIPaging();
			}
        }
    });

/*
$(document.body).on('touchmove', onScroll); // for mobile
$(window).on('scroll', onScroll);

function onScroll(){ 
	var scrollHeight = $(document).height();
	var scrollPosition = $(window).height() + $(window).scrollTop();
	if ((scrollHeight - scrollPosition) / scrollHeight === 0) {
	    // when scroll to bottom of the page
	    alert("bawah");
	}
};*/

/*
$(document.body).on('touchmove', onScroll); // for mobile
$(window).on('scroll', onScroll);

// callback
function onScroll(){ 
		if($(window).scrollTop() >= $(document).height() - $(window).height()) {
			if(proses==1){
			  newsAPIPaging();
			}
		}
}; //howto slider*/


var x = document.getElementById("demo");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition, showError);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    x.innerHTML = "<span id='lang'>" + position.coords.latitude + 
    "</span><br><span id='long'>" + position.coords.longitude +"</span>"
    $(function() {
    
      $('.weather-temperature').openWeather({
        key: 'c9d49310f8023ee2617a7634de23c2aa',
        //city: 'Toronto, ON',
        lat: position.coords.latitude ,
        lng: position.coords.longitude ,
        descriptionTarget: '.weather-description',
        windSpeedTarget: '.weather-wind-speed',
        minTemperatureTarget: '.weather-min-temperature',
        maxTemperatureTarget: '.weather-max-temperature',
        humidityTarget: '.weather-humidity',
        sunriseTarget: '.weather-sunrise',
        sunsetTarget: '.weather-sunset',
        placeTarget: '.weather-place',
        iconTarget: '.weather-icon',
        customIcons: '../src/img/icons/weather/',
        success: function() {
        
          //show weather
          $('.weather-wrapper').show();
          
        },
        error: function(message) {
        
          // console.log(message);
        
        }
      });
      
    });
}

function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
            x.innerHTML = "User denied the request for Geolocation."
            break;
        case error.POSITION_UNAVAILABLE:
            x.innerHTML = "Location information is unavailable."
            break;
        case error.TIMEOUT:
            x.innerHTML = "The request to get user location timed out."
            break;
        case error.UNKNOWN_ERROR:
            x.innerHTML = "An unknown error occurred."
            break;
    }
}

function changeBanner(){
	var currentTime = new Date().getHours();
	  if (6 <= currentTime&&currentTime < 12) {
	   		$("#weather_banner").removeClass("siang");
	   		$("#weather_banner").removeClass("sore");
	   		$("#weather_banner").removeClass("malam");
	   		$("#weather_banner").addClass("pagi");
	  }
	  if (13 <= currentTime&&currentTime < 15) {
	   		$("#weather_banner").removeClass("pagi");
	   		$("#weather_banner").removeClass("sore");
	   		$("#weather_banner").removeClass("malam");
	   		$("#weather_banner").addClass("siang");
	  }
	  if (16 <= currentTime&&currentTime < 18) {
	   		$("#weather_banner").removeClass("pagi");
	   		$("#weather_banner").removeClass("siang");
	   		$("#weather_banner").removeClass("malam");
	   		$("#weather_banner").addClass("sore");
	  }

	  if (19 <= currentTime&&currentTime < 5) {
	   		$("#weather_banner").removeClass("pagi");
	   		$("#weather_banner").removeClass("siang");
	   		$("#weather_banner").removeClass("sore");
	   		$("#weather_banner").addClass("malam");
	  }
}

