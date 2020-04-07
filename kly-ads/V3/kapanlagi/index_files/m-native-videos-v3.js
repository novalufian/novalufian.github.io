fetch('https://a.kapanlagi.com/channel/entertainment/nativevideos-v3.php')
.then(function(response){
	return response.json();
})
.then(function(response_data){
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
	
	url_slot_1 = removeAutoplay(url_slot_1);
	url_slot_2 = removeAutoplay(url_slot_2);
	
	var html_slot_1 = '';
	var html_slot_2 = '';
	
	if(url_slot_1){
		var title_share_1   = encodeURIComponent(title_slot_1); 
		var html_slot_1 = '<link rel="stylesheet" type="text/css" href="https://a.kapanlagi.com/v5/css/m2/playlist_native_video_addShareBox.css?v9">' 
			+' <script type="text/javascript" src="https://a.kapanlagi.com/v5/js/m/playlist_native_video_addShareBox.js?v5"></script>'
			+' <div class="slot-youtubev2">' 
			+' <div class="slot-native-lg">' 
			+'  <div class="slot-iframe">' 
			+'      <iframe class="nativevideo-iframe" allowfullscreen="allowfullscreen" src="'+url_slot_1+'"></iframe>' 
			+'  </div> '
			+'  <div class="slot-deskrip">'
			+'     <h6>'+title_slot_1+'</h6> '
			+'          <div class="share-animation"> '
			+'               <a href="javascript:void(0)" class="native-btn-share"> '
			+'                    <img src="https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/Share-Icon.png" class="open-share"> '
			+'                    <img src="https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/Close-Icon.png" class="close-share">'
			+'                    </a> <div class="share-sosmed"> '
			+'                              <a href="https://twitter.com/share?text='+title_share_1+'&url='+urlshare_slot_1+'" target="_blank" class="tweet"><img src="https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/twitter.png"></a> '
			+'                              <a href="https://facebook.com/sharer.php?u='+urlshare_slot_1+'" target="_blank" class="fb"><img src="https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/facebook.png"></a> '
			+'                              <a href="whatsapp://send?text='+title_share_1+'+-+'+urlshare_slot_1+'" target="_blank" class="wa"><img src="https://cdns.klimg.com/kapanlagi.com/v5/m/i/assets/img/WA.png"></a> '
			+'                          </div> '
			+'           </div> '
			+'   </div> '
			+'  </div> '
			+' </div>'; 
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
		var playPauseVideo = function(iframe, play){
			var iframe_w = $(iframe).get(0);
			if(!iframe_w){return;};
			
			var message = '';
			if(play === true){
				message = 'play';
			}else if(play === false){
				message = 'pause';
			};
			
			var iframeWindow = iframe_w.contentWindow?
				iframe_w.contentWindow:iframe_w.contentDocument.defaultView;
			if(typeof iframeWindow.postMessage === 'function'){
				iframeWindow.postMessage(message, '*');
			};
		};
		
		var nativeOnViewAction = function(index){
			var targetelement = $(this);
			if(targetelement.data('nativevideo-onview')){
				return;
			};
			if(!is_onviewpoint(targetelement)){
				return;
			};
			
			targetelement.attr('data-nativevideo-onview', true);
			playPauseVideo($('iframe.nativevideo-iframe', targetelement), true);
		};
		
		var scrollAction = function(){
			var selector = '.native_video_1, .native_video_2';
			$(selector).each(nativeOnViewAction);
		};
		
		if ($('.native_video_1').length){
			$('.native_video_1').append(html_slot_1);
		};
		
		if ($('.native_video_2').length){
			$('.native_video_2').append(html_slot_2);
		};
		
		$(window).scroll(scrollAction);
	});
});
 
