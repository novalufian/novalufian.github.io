fetch('https://a.kapanlagi.com/channel/entertainment/nativevideos-v3.php')
.then(function(response){
	return response.json();
})
.then(function(response_data){
	var appUrl = 'https://a.kapanlagi.com/';
	
	var removeAutoplay = function(url){
		if(!url || typeof url !== 'string'){
			return url;
		};
		// Must be muted.
		// @url: https://hacks.mozilla.org/?p=33080
		url = url.replace('mute=false', 'mute=true');
		url = url.replace('autoplay=true', 'autoplay=false');
		url = url.replace('&&', '&');
		return url;
	};
	
	function is_onviewpoint(element, divider){
		var thewindow=$(window);
		var element=$(element);
		
		if(!element.length || !thewindow.length)return undefined;
		if(!divider || typeof divider !== 'number' || divider<0)divider=0;
		
		var doc_top = thewindow.scrollTop();
		var doc_bottom = doc_top + thewindow.height();
		var element_top = element.offset().top;
		var element_bottom = element_top + element.height();
		
		var element_divide=element_top;
		var doc_divide=doc_top;
		if(divider){
			element_divide=element_top+((element_bottom-element_top)*divider);
			doc_divide=doc_top+((doc_bottom-doc_top)*divider);
		};
		
		return (
			(
				false
				   // Too small (original).
				|| ((element_top >= doc_top) && (element_bottom <= doc_bottom))
				   // Too big.
				|| ((element_top <= doc_top) && (element_bottom >= doc_bottom))
				|| (
					// A half top.
					(element_top <= doc_top) && (element_top <= doc_bottom)
					&& (element_bottom >= doc_top) && (element_bottom <= doc_bottom)
					)
				|| (
					// A half bottom.
					(element_top >= doc_top) && (element_top <= doc_bottom)
					&& (element_bottom >= doc_top) && (element_bottom >= doc_bottom)
					)
			) && (
				!divider
				|| (divider && doc_divide>element_divide)
			)
		);
	};
	
	var data = response_data.data || {};
	var nativevideos = data.nativevideos || {};
	var slot1 = nativevideos[0] || {};
	var slot2 = nativevideos[1] || {};
	
	var slot1_0 = slot1[0] || {};
	var title_slot_1 = slot1_0.title || '';
	var url_slot_1 = slot1_0.videourl || '';
	var urlshare_slot_1 = slot1_0.videourlorigin || '';
	
	var slot2_0 = slot2[0] || {};
	var title_slot_2 = slot2_0.title || ''; 
	var url_slot_2   = slot2_0.videourl || '';
	var urlshare_slot_2 = slot2_0.videourlorigin || '';
	
	// url_slot_1 = removeAutoplay(url_slot_1);
	// url_slot_2 = removeAutoplay(url_slot_2);
	
	var html_slot_1 = '';
	var html_slot_2 = '';
	
	var data_appUrl = $('.native_video_1').data('appurl');
	if(data_appUrl && typeof data_appUrl === 'string'){
		appUrl = data_appUrl;
	};
	
	if(url_slot_1){
		var imgAsset = 'https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/';
		
		(function(k,l,n){
			if(k.getElementById(l)){return;}
			var js = k.createElement('script');
			js.type = 'text/javascript';
			js.id = l; js.async = true;js.src = n;
			ref = k.getElementsByTagName('script')[0];
			ref.parentNode.insertBefore(js, ref);
		}(
			document,
			'nativevideoslot-addShareBox-js',
			appUrl + 'v5/js/m/playlist_native_video_addShareBox.js?v5'
		));
		
		(function(k,l,n){
			if(k.getElementById(l)){return;}
			var link = k.createElement('link');
			link.rel = 'stylesheet';
			link.id = l; link.href = n;
			ref = k.getElementsByTagName('link')[0];
			ref.parentNode.insertBefore(link, ref);
		}(
			document,
			'nativevideoslot-addShareBox-style',
			appUrl+'v5/css/m2/playlist_native_video_addShareBox.css'
		));
		
		var title_share_1   = encodeURIComponent(title_slot_1); 
		var html_slot_1 = ''
			+'<div class="slot-nativevideo1 slot-nativescrolling" data-slotid="slot1">' 
				+'<div class="slot-youtubev2">' 
					+'<div class="slot-native-lg">' 
						+'<div class="slot-iframe nativescrolling-video">' 
							+'<iframe class="nativevideo-iframe" allowfullscreen="allowfullscreen" src="'+url_slot_1+'"></iframe>' 
						+'</div> '
						+'<div class="slot-deskrip">'
							+'<h6 class="nativescrolling-text">'+title_slot_1+'</h6> '
							+'<div class="share-animation"> '
								+'<a href="javascript:void(0)" class="native-btn-share"> '
									+'<img src="'+imgAsset+'Share-Icon.png" class="open-share"> '
									+'<img src="'+imgAsset+'Close-Icon.png" class="close-share">'
								+'</a>'
							+'<div class="share-sosmed"> '
								+'<a href="https://twitter.com/share?text='+title_share_1+'&url='+urlshare_slot_1+'" target="_blank" class="tweet"><img src="'+imgAsset+'twitter.png"></a> '
								+'<a href="https://facebook.com/sharer.php?u='+urlshare_slot_1+'" target="_blank" class="fb"><img src="'+imgAsset+'facebook.png"></a> '
								+'<a href="whatsapp://send?text='+title_share_1+'+-+'+urlshare_slot_1+'" target="_blank" class="wa"><img src="'+imgAsset+'WA.png"></a> '
							+'</div> '
						+'</div> '
					+'</div> '
				+'</div>'
				+'<a href="javascript:void(0);" class="nativescrolling-close" data-nativescrolling-action="close">&nbsp;</a> '
				+'<a href="javascript:void(0);" class="nativescrolling-trigger" data-nativescrolling-action="switch">&nbsp;</a> '
			+'</div>'; 
	};
	
	if(url_slot_2){
		var title_share_2   = encodeURIComponent(title_slot_2); 
		var html_slot_2 = '<div class="slot-youtubev2"> '
			  +'    <div class="slot-native-lg">'
			  +'        <div class="slot-iframe">'
			  +'            <iframe class="nativevideo-iframe" allowfullscreen="allowfullscreen" src="'+url_slot_2+'"></iframe> '
			  +'        </div>'
			  +'        <div class="slot-deskrip">'
			  +'            <h6>'+title_slot_2+'</h6>'
			  +'            <div class="share-animation"> '
			  +'                  <a href="javascript:void(0)" class="native-btn-share"><img src="https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/Share-Icon.png" class="open-share"> <img src="https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/Close-Icon.png" class="close-share"> </a> '
			  +'                  <div class="share-sosmed"> '
			  +'                      <a href="https://twitter.com/share?text='+title_share_2+'&url='+urlshare_slot_2+'" target="_blank" class="tweet"><img src="https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/twitter.png"></a> '
			  +'                      <a href="https://facebook.com/sharer.php?u='+urlshare_slot_2+'" target="_blank" class="fb"><img src="https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/facebook.png"></a> '
			  +'                      <a href="whatsapp://send?text='+title_share_2+'+-+https%3A%2F%2Fwww.vidio.com%2Fwatch%2F1740873-jawaban-sarita-abdul-mukti-soal-gosip-check-in-shafa-babas" target="_blank" class="wa"><img src="https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/WA.png"></a> '
			  +'         </div>'
			  +'      </div> </div> </div> </div>';
	};
	
	$(document).ready(function(){
		var timeInterval = 0;
		var playPauseVideo = function(iframe, play){
			var iframe_w = $(iframe).get(0);
			if(!iframe_w){return;};
			
			var validComands = [
				'play', 'pause',
			];
			
			var message = '';
			if(play === true){
				message = 'play';
			}else if(play === false){
				message = 'pause';
			}else if($.inArray(play, validComands) !== -1){
				message = play;
			};
			
			var iframeWindow = iframe_w.contentWindow?
				iframe_w.contentWindow:iframe_w.contentDocument.defaultView;
			if(typeof iframeWindow.postMessage === 'function'){
				iframeWindow.postMessage(message, '*');
			};
			return message;
		};
		
		var nativeOnViewPlayPause = function(targetelement){
			if(targetelement.data('nativevideo-onview')){
				return;
			};
			if(!is_onviewpoint(targetelement)){
				return;
			};
			
			targetelement.attr('data-nativevideo-onview', true);
			return playPauseVideo($('iframe.nativevideo-iframe', targetelement), true);
		};
		
		var nativescrollingAction = function(element, action){
			element = $(element);
			if(element.data('onNativescrollingAction') === true){
				return;
			};
			var elementAction = element.data('nativescrolling-action');
			if(action !== 'close' || action !== 'open'){
				if(element.hasClass('active')){
					action = 'close';
				}else{
					action = 'open';
				};
			};
			
			element.data('onNativescrollingAction', true);
			element.addClass('onanimation');
			if(action === 'close'){
				element.removeClass('active');
			}else{
				element.addClass('active');
			};
			
			// playPauseVideo(
				// $('iframe.nativevideo-iframe', element),
				// (action !== 'close')
			// );
			window.setTimeout(function(){
				element.data('onNativescrollingAction', false);
				element.removeClass('onanimation');
			}, 100);
			element.data('nativescrolling-action', action);
		};
		
		$(document).on('click','*[data-nativescrolling-action]', function(){
			var action = $(this).data('nativescrolling-action');
			var parent = $(this).parents('.slot-nativescrolling');
			if(!action || !parent.length){return;};
			nativescrollingAction(parent, action);
		});
		
		var nativescrolling = function(targetelement){
			if(
				typeof window.kly === 'object'
				&& window.kly.overlayVideo === false
			){return;};
			
			targetelement = $(targetelement);
			var slotelement = $('.slot-nativescrolling', targetelement).first();
			var onviewelement = targetelement.data('nativescrolling');
			if(!onviewelement || !slotelement.length){return;};
			onviewelement = $(onviewelement).first();
			targetelement.height(slotelement.height());
			
			var windowTop = $(window).scrollTop();
			var initialtop = slotelement.data('nativescrolling-initialtop');
			var initialized = slotelement.data('nativescrolling-initialized');
			slotelement.removeClass('active');
			
			var docTop = $('body').css('top');
			docTop = parseInt(docTop);
			docTop = Math.abs(docTop);
			
			var docMarginTop = $('body').css('marginTop');
			docMarginTop = parseInt(docMarginTop);
			docMarginTop = Math.abs(docMarginTop);
			
			if(docTop <= 0 && docMarginTop > 0 ){
				docTop = docMarginTop;
			};
			
			initialtop = 700;
			if(windowTop <= 0 && docTop > 0){
				windowTop = docTop;
			};
			
			if(
				initialtop && typeof initialtop === 'number'
				&& windowTop < initialtop
			){
				slotelement.removeClass('nativescrolling');
				return;
			};
			
			
			var action = slotelement.data('nativescrolling-action');
			if(action){
				if(action == 'open'){
					slotelement.addClass('active');
				};
				if(is_onviewpoint(targetelement)){
					slotelement.removeClass('nativescrolling');
				}else{
					slotelement.addClass('nativescrolling');
				};
				return;
			};
			
			if(
				!is_onviewpoint(onviewelement, 0.5)
				&& is_onviewpoint(onviewelement)
			){
				return;
			};
			
			if(is_onviewpoint(targetelement)){
				slotelement.removeClass('nativescrolling');
				return;
			};
			
			slotelement.addClass('active');
			slotelement.addClass('nativescrolling');
			if(!initialized){
				slotelement.data('nativescrolling-initialized', true);
				initialtop = onviewelement.offset().top + (onviewelement.height()/2);
				slotelement.data('nativescrolling-initialtop', initialtop);
				
				var time = 5;
				var closeElement = $('.nativescrolling-close', targetelement);
				closeElement.addClass('counting');
				closeElement.text(time);
				timeInterval = window.setInterval(function(){
					if(!slotelement.hasClass('active')){
						return;
					};
					closeElement.text(time);
					closeElement.addClass('counting');
					time--;
					if (time < 0){
						closeElement.text('');
						clearInterval(timeInterval);
						closeElement.removeClass('counting');
					};
				}, 1000)
			};
			return;
		};
		
		var nativeOnViewAction = function(index){
			var targetelement = $(this);
			
			nativescrolling(targetelement);
			// nativeOnViewPlayPause(targetelement);
			return;
		};
		
		var scrollAction = function(){
			var selector = '.native_video_1, .native_video_2';
			$(selector).each(nativeOnViewAction);
		};
		
		if ($('.native_video_1').length){
			var data_appUrl = $('.native_video_1').data('appurl');
			if(data_appUrl)
				appUrl = data_appUrl;
			$('.native_video_1').append(html_slot_1);
		};
		
		if ($('.native_video_2').length){
			$('.native_video_2').append(html_slot_2);
		};
		
		$(window).scroll(scrollAction);
	});
});
 
