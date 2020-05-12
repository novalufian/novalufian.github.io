
if(!replaceArray) {
function replaceArray(find, replace, string) {
	var replaceString = string;
	var regex;
	if(typeof find != 'object'
		|| typeof replace != 'object'
		|| find === null || replace === null
	)return replaceString;
	
	for (var i = 0; i < find.length; i++) {
		regex = new RegExp(find[i], "g");
		replaceString = replaceString.replace(regex, replace[i]);
	};
	return replaceString;
}};

// Prototypes below are Mozilla's experimental prototype.
// Those are polyfill which used to add compatibility support
// in older environments that do not natively support it.
// B.2016.252
if(!Object.keys) {
	Object.keys = (
		function() {
			'use strict';
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length;
				
			return function(obj) {
				if (
					typeof obj !== 'object'
					&& (typeof obj !== 'function' || obj === null)
				){
					throw new TypeError('Object.keys called on non-object');
				};
				
				var result = [], prop, i;
				
				for (prop in obj){
					if (hasOwnProperty.call(obj, prop)) {
						result.push(prop);
					};
				};
				
				if (hasDontEnumBug) {
					for (i = 0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[i])) {
							result.push(dontEnums[i]);
						};
					};
				};
				return result;
			};
		}()
	);
};

if(!Object.values) {
	Object.values = (
		function() {
			'use strict';
			var hasOwnProperty = Object.prototype.hasOwnProperty,
				hasDontEnumBug = !({toString: null}).propertyIsEnumerable('toString'),
				dontEnums = [
					'toString',
					'toLocaleString',
					'valueOf',
					'hasOwnProperty',
					'isPrototypeOf',
					'propertyIsEnumerable',
					'constructor'
				],
				dontEnumsLength = dontEnums.length;
				
			return function(obj) {
				if (
					typeof obj !== 'object'
					&& (typeof obj !== 'function' || obj === null)
				){
					throw new TypeError('Object.keys called on non-object');
				};
				
				var result = [], prop, i;
				
				for (prop in obj){
					if (hasOwnProperty.call(obj, prop)) {
						result.push(obj[prop]);
					};
				};
				
				if (hasDontEnumBug) {
					for (i = 0; i < dontEnumsLength; i++) {
						if (hasOwnProperty.call(obj, dontEnums[i])) {
							result.push(dontEnums[i]);
						};
					};
				};
				return result;
			};
		}()
	);
};

// Start of KL-Socmed functions.

(function ($) {
	if(
		!$.fn.klnsosial
		|| !$.fn.klnsosial.version
		|| $.fn.klnsosial.version < 20190527.6
	){
		// Function overwrite.
		$.fn.klnsosial = function (options){
			// Versioning and information for future use.
			// So, it can be tested if version is correct with
			// '$.fn.klnsosial.version', or
			// '$.fn.klnsosial.is_mobile'.
			$.fn.klnsosial.version=20190527.6;
			$.fn.klnsosial.is_mobile=true;
			
			// Global result.
			// Call it with '$.fn.klnsosial.graphdata'.
			$.fn.klnsosial.graphdata=$.fn.klnsosial.graphdata||{};
			
			// Constants variable.
			const socmedia_cookieinfo='klnShareSocmed';
			
			// Image preloader.
			var image_cdn='https://cdns.klimg.com/kapanlagi.com/v5/i/m/socialtabs/';
			(new Image()).src = image_cdn+'klshare16icon-facebook_75.png';
			(new Image()).src = image_cdn+'klshare16icon-twitter_75.png';
			(new Image()).src = image_cdn+'klshare16icon-whatsapp_75.png';
			
			// Basic settings.
			var settings = {
				twitter_user: 'kapanlagicom',
				url: location.href,
				text: document.title,
				twitter_popupwidth: 550,
				twitter_popupheight: 250,
				facebook_popupwidth: 550,
				facebook_popupheight: 550,
				whatsapp_popupwidth: 250,
				whatsapp_popupheight: 250,
				callback: function(data, data_source, status, element){},
				floating: ''
			};
			
			// Base variable.
			var graph_facebook={
				share:{
					comment_count: 0,
					share_count: 0,
				},
				og_object:{
					id: 0,
					engagement:{
						count: 0,
						social_sentence: null,
					}
				}
			};
			
			// Like its name.
			var basic_html= ''
			+' <div class="mkl-share16{ADDITIONAL_CLASSES}"> '
				+'<ul class="list-share16"> '
					+' <li> '
						+' <a href="https://facebook.com/sharer.php?u={URL}" class="fb-share share-link" data-slot="facebook" data-popupwidth="{FACEBOOK_POPUPWIDTH}" data-popupheight="{FACEBOOK_POPUPHEIGHT}" ></a> '
					+' </li> '
					+' <li> '
						+' <a href="https://twitter.com/share?text={TEXT}&url={URL}&via={TWITTER_USER}" data-slot="twitter" class="tweet-share share-link"  data-popupwidth="{TWITTER_POPUPWIDTH}" data-popupheight="{TWITTER_POPUPHEIGHT}" ></a> '
					+' </li> '
					+' <li> '
						+' <a href="whatsapp://send?text={TEXT_WHATSAPP} {URL}" class="wa-share share-link" data-slot="whatsapp" data-popupwidth="{WHATSAPP_POPUPWIDTH}" data-popupheight="{WHATSAPP_POPUPHEIGHT}" ></a> '
					+' </li> '
					+' <li class="count-share"> '
						+' {SHARE_COUNT} '
					+' </li> '
				+' </ul> '
			+' </div> '
			+'';
			
			// Helper functions.
			var read_cookie = function(cookie_key){
				var result=[];
				var cookie_array=document.cookie.split(";");
				cookie_key=RegExp("^\\s*"+cookie_key+"=\\s*(.*?)\\s*$");
				for(var i=0;i<cookie_array.length;i++){
					var cookie_match=cookie_array[i].match(cookie_key);
					cookie_match && result.push(cookie_match[1]);
				};
				return result[0];
			};
			var fancy_numeric = function(number){
				// Using SI Prefixes of Bureau International des Poids et Mesures,
				// (https://www.bipm.org/en/si/prefixes.html).
				var power_symbol={
					3:'k',
					6:'M',
					9:'G',
					12:'T',
					15:'P',
					18:'E',
					21:'Z',
					24:'Y'
				};
				
				// Temporary number.
				var temp_number=parseFloat(number);
				
				// Default value.
				var last_powersymbol={
					number:number,
					power:0,
					symbol:null,
					overflow:false,
					last_number:temp_number
				};
				
				// Looping.
				for (var power in power_symbol){
					symbol=power_symbol[power];
					temp_number /=parseFloat(1000);
					
					if(temp_number<1){
						break;
					}else{
						last_powersymbol={
							number:number,
							power:power,
							symbol:symbol,
							overflow:false,
							last_number:temp_number
						};
					};
				};
				
				// If overflow, set the flag.
				if(last_powersymbol.last_number>parseFloat(1000))
					last_powersymbol.overflow=true;
				
				// Result.
				return last_powersymbol;
			};
			var change_share_count=function(object, share_count){
				// Fancy string.
				var fancy_count=fancy_numeric(share_count);
				var symbol=fancy_count.symbol;
				if(symbol== null)symbol='';
				var fancy_string=parseFloat(fancy_count.last_number.toFixed(1)) + symbol;
				
				// If overflow.
				if(fancy_count.overflow)
					fancy_string='+999'+symbol;
				
				// Built it.
				var string_share_count=replaceArray(
					['{SHARE_COUNT}'],
					[fancy_string],
					'<dt>{SHARE_COUNT}</dt><dd>SHARES</dd>'
				);
				
				// Set it.
				object.find('.count-share').each(function(index){
					$(this).html(string_share_count);
				});
			};
			var save_socmedinfo_tocookie=function(settings, share){
				// Serialized.
				var cookie_string='';
				share['url']=settings.url;
				for (var key in share){
					if (hasOwnProperty.call(share, key)) {
						var value=share[key];
						cookie_string +=key+'='+value+';';
					};
				};
				cookie_string=encodeURIComponent(cookie_string);
				
				// Save it.
				var date = new Date();
				date.setTime(date.getTime()+(60*60*1000)); // 60 minutes.
				var cookie_value='';
				cookie_value+=socmedia_cookieinfo+"="+cookie_string;
				cookie_value+=';';
				cookie_value+='expires='+date.toGMTString();
				cookie_value+=';';
				cookie_value+='path='+window.location.pathname;
				document.cookie = cookie_value;
			};
			var get_socmedinfo_fromcookie=function(socmedia_cookie){
				// Parse it.
				var share={};
				var cookie_string=decodeURIComponent(socmedia_cookie);
				var cookie_array=cookie_string.split(';');
				for(var i=0;i<cookie_array.length;i++){
					var component=cookie_array[i].match(/^([\S^.]*)\=([\S^.]*)$/);
					var key=component && component[1];
					var value=component && component[2];
					share[key]=value;
				};
				return share;
			};
			
			return this.each(function(){
				var t=$(this);
				if (options) {
					if (options.url == "" || options.url == undefined) {
						var tempurl = settings.url.split('?');
						tempurl = tempurl[0].split('#');
						options.url = tempurl[0];
					};
					$.extend(settings, options);
				};
				
				// Get URL information.
				var url_info = settings.url.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)(\/[^?#]*)(\?[^#]*|)(#.*|)$/);
				url_info=url_info && {
					protocol: url_info[1],
					host: url_info[2],
					hostname: url_info[3],
					port: url_info[4],
					pathname: url_info[5],
					search: url_info[6],
					hash: url_info[7]
				};
				
				var text_whatsapp = settings.text.replace("| M.Kapanlagi.com","");
				text_whatsapp = replaceArray(["&#38;", "#"],["&", "%23"], text_whatsapp);
				
				var additional_class='';
				if(settings.floating){
					switch($.trim(settings.floating.toLowerCase())){
						case 'left':additional_class += ' alignleft';break;
						case 'right':additional_class += ' alignright';break;
						case 'center':additional_class += ' aligncenter';break;
					};
				};
				
				// Sharebox error fix.
				var divboxshare = $(".box-share");
				var count = divboxshare.length;
				if(count == 1){
					divboxshare.addClass('fixed');                                     
				};
				
				var replace={
					'{URL}': encodeURIComponent(settings.url),
					'{TEXT}': encodeURIComponent(settings.text),
					'{TEXT_WHATSAPP}': encodeURIComponent(text_whatsapp),
					'{TWITTER_USER}': encodeURIComponent(settings.twitter_user),
					'{FACEBOOK_POPUPWIDTH}': settings.facebook_popupwidth,
					'{FACEBOOK_POPUPHEIGHT}': settings.facebook_popupheight,
					'{TWITTER_POPUPWIDTH}': settings.twitter_popupwidth,
					'{TWITTER_POPUPHEIGHT}': settings.twitter_popupheight,
					'{WHATSAPP_POPUPWIDTH}': settings.whatsapp_popupwidth,
					'{WHATSAPP_POPUPHEIGHT}': settings.whatsapp_popupheight,
					'{ADDITIONAL_CLASSES}': additional_class,
					'{SHARE_COUNT}': '',
				};
				
				var this_html=basic_html;
				var output_html=replaceArray(Object.keys(replace), Object.values(replace), this_html);
				t.html(output_html);
				
				$('.share-link').click(function(event){
					window.dataLayer = window.dataLayer || [];
					window.dataLayer.push({
						'event': "click",
						'feature_name': "social-share",
						'feature_location': "center",	
						'feature_position': $(this).data('slot'),													
					 }); 
					 //event.preventDefault();      
				});
				
				t.find('a.share-link').on('click', function(event) {
					event.preventDefault();
					var href=$(this).attr('href');					  	
					if(href && href!='javascript:void(0)'){
						var popupheight=$(this).data('popupheight') || 500;
						var popupwidth=$(this).data('popupwidth') || 500;
						window.open(
							href,
							'klshare',
							'location=yes,links=no,scrollbars=no,toolbar=no,width='+popupwidth+',height='+popupheight+''
						);						 
					};
					return false;
				});
				
				// Get social share cookie.
				var socmedia_cookie=read_cookie(socmedia_cookieinfo);
				var socmedia_cookie_share_data={
					url:null
				};
				
				if(socmedia_cookie != null){
					socmedia_cookie_share_data=get_socmedinfo_fromcookie(socmedia_cookie);
				};
				
				// Valid share count?
				if(socmedia_cookie_share_data.url == settings.url){
					
					var share_count=socmedia_cookie_share_data.count;
					if(share_count>3){
						change_share_count(t, share_count);
					};
					
					// Call the callback.
					if(typeof(settings.callback) == 'function'){
						settings.callback(graph_facebook, 'cookie', 'notmodified', t);
					};
					
					return;
				};
				
				for(var key in $.fn.klnsosial.graphdata){
					var value = $.fn.klnsosial.graphdata[key];
					if(value.url == settings.url){
						var share_count=value.og_object.engagement.count;
						if(share_count>3){
							change_share_count(t, share_count);
						};
						
						// Call the callback.
						if(typeof(settings.callback) == 'function'){
							settings.callback(graph_facebook, 'graphdata', 'notmodified', t);
						};
						
						return;
					};
				}
				
				var encoded_url=encodeURIComponent(settings.url);
				$.get('https://graph.facebook.com/' + encoded_url + '?fields=og_object{engagement}',
					function (facebook_data){
					
					$.extend(graph_facebook, facebook_data);
					var share_count=graph_facebook.og_object.engagement.count;
					if(share_count>3){
						change_share_count(t, share_count);
					};
					
					// Save it.
					save_socmedinfo_tocookie(settings, graph_facebook.og_object.engagement);
					
					// Save it for global use.
					var graphdata_length=Object.keys($.fn.klnsosial.graphdata).length;
					$.fn.klnsosial.graphdata[graphdata_length]={
						url: settings.url,
						og_object: graph_facebook.og_object
					};
					
					// Call the callback.
					if(typeof(settings.callback) == 'function'){
						settings.callback(graph_facebook, 'facebook', 'success', t);
					};
					
					if(share_count>0){
						// send result to HQ.
						$.ajax({
							url: "https://a.kapanlagi.com/fbsharepost/",
							type: "POST",
							data: {
								url:   settings.url,
								og_object: graph_facebook.og_object
							}
						});
					};
					
				}).fail(function(){
					// If any error occurred use the failover.
					
					// Built new url.
					var app_url='https://a.kapanlagi.com/fbshare/'+ encodeURIComponent(settings.url);
					
					// Call it.
					$.get(app_url, function (app_data){
						
						$.extend(graph_facebook, app_data);
						var share_count=graph_facebook.og_object.engagement.count;
						if(share_count>3){
							change_share_count(t, share_count);
						};
						
						// Save it.
						save_socmedinfo_tocookie(settings, graph_facebook.og_object.engagement);
						
						// Save it for global use.
						var graphdata_length=Object.keys($.fn.klnsosial.graphdata).length;
						$.fn.klnsosial.graphdata[graphdata_length]={
							url: settings.url,
							og_object: graph_facebook.og_object
						};
						
						// Call the callback.
						if(typeof(settings.callback) == 'function'){
							settings.callback(graph_facebook, 'app', 'success', t);
						};
						
					}).fail(function(event, request, settings){
						// Call the callback.
						if(typeof(settings.callback) == 'function'){
							settings.callback(graph_facebook, 'app', 'error', t);
						};
					});
				});
			});
		};
	};	
})(jQuery);
