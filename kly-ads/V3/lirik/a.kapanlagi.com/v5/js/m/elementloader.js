// elementloader.js

(function(window, $){
	'use strict';
	var console = window.console || {};
	var localStorage = window.localStorage||{};
	
	var currentScriptUrl;
	var scripts = document.getElementsByTagName('script');
	if(typeof window.document.currentScript !== 'undefined'){
		currentScriptUrl = window.document
			.currentScript.src;
	}else{
		currentScriptUrl = window.document
			.getElementsByTagName("script")[scripts.length-1].src;
	};
	
	$.fn.elementloader = function(options){
		var mainSettings = {
			targeturl : '',
			ignoreempty : false,
		};
		$.extend(mainSettings, options);
		var plugin = $.fn.elementloader;
		plugin.initialized = plugin.initialized || false;
		plugin.version = 20200422.01;
		
		var logger = {
			log: function(){},
			debug: function(){},
			warn: function(){},
			info: function(){}
		};
		
		// Console.
		var loggerInit = function(forced){
			var setIt = false;
			if(typeof forced === 'boolean'){
				setIt = forced;
			}else if(localStorage.debug_active || plugin.debug_active){
				setIt = true;
			};
			
			plugin.debug_active = setIt;
			
			for(var i in logger){
				logger[i] = function(){};
				if(setIt === true){
					logger[i] = console[i].bind(
						console, '%c[Element-Loader]', 'font-weight: bolder'
					);
				};
			};
		};
		loggerInit();
		
		// Helper.
		var is_onviewpoint = function(element){
			element = $(element);
			var doc_top = $(window).scrollTop();
			var doc_bottom = doc_top + $(window).height();
			var element_top = element.offset().top;
			var element_bottom = element_top + element.height();
			return (
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
			);
		};
		plugin.is_onviewpoint = is_onviewpoint;
		
		var json_data = function(element, key, values){
			if(typeof JSON !== 'object')return false;
			if(typeof JSON.stringify !== 'function')return false;
			var attrValue = JSON.stringify(values);
			var element = $(element);
			return element.attr('data-' + key, attrValue);
		};
		plugin.json_data = json_data;
		
		var scroll_action = function(target){
			var targetelement = $(target);
			if(targetelement.hasClass('elementloader-initialized')){
				return false;
			};
			if(!is_onviewpoint(targetelement)){
				return false;
			};
			targetelement.addClass('elementloader-initialized');
			
			var unix = Math.round(+new Date()/1000);
			json_data(targetelement, 'elementloader', {
				version: plugin.version,
				initialized: unix
			});
			
			var elementid = targetelement.attr('id');
			var targeturl = targetelement.data('targeturl') || mainSettings.targeturl;
			var ignoreempty = targetelement.data('ignoreempty') || mainSettings.ignoreempty;
			
			if(!targeturl){
				return false;
			};
			
			if(!elementid)
				logger.debug('Empty ElementID.');
			else
				logger.debug('ElementID', elementid);
			
			var random=Math.floor(Math.random() * (3600 - 1800 + 1)) + 1800;
			var elementloaderid='id'+random;
			var ajaxid='ajax-elementloader-'+elementloaderid;
			logger.debug('ID', elementloaderid);
			
			targetelement.after('<div id="'+ajaxid+'" class="ajax-elementloader">&nbsp;</div>');
			$('#'+ajaxid).css({
				'background-image': "url('data:image/gif;base64,R0lGODlhKwALAPEAAP////y0FP3Zi/y0FCH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAKwALAAACMoSOCMuW2diD88UKG95W88uF4DaGWFmhZid93pq+pwxnLUnXh8ou+sSz+T64oCAyTBUAACH5BAkKAAAALAAAAAArAAsAAAI9xI4IyyAPYWOxmoTHrHzzmGHe94xkmJifyqFKQ0pwLLgHa82xrekkDrIBZRQab1jyfY7KTtPimixiUsevAAAh+QQJCgAAACwAAAAAKwALAAACPYSOCMswD2FjqZpqW9xv4g8KE7d54XmMpNSgqLoOpgvC60xjNonnyc7p+VKamKw1zDCMR8rp8pksYlKorgAAIfkECQoAAAAsAAAAACsACwAAAkCEjgjLltnYmJS6Bxt+sfq5ZUyoNJ9HHlEqdCfFrqn7DrE2m7Wdj/2y45FkQ13t5itKdshFExC8YCLOEBX6AhQAADsAAAAAAAAAAAA=')",
				'background-repeat': 'no-repeat',
				'background-position': '50%',
				height: '50px',
				width: '100%'
			});
			$.ajax({
				type: 'GET',
				url: targeturl,
				success: function(json){
					if(typeof json.status =='undefined' ){
						logger.debug('No status!');
					}else if(json.status!=200 && json.status==204){
						if(ignoreempty){
							logger.debug(elementloaderid, 'Empty response is ignored.');
						}else{
							targetelement.html('');
							logger.debug(elementloaderid, 'Empty response.');
						}
					}else if(json.status!=200){
						logger.debug(elementloaderid, 'Status', json.status);
					}else if(typeof json.data =='undefined' ){
						logger.debug(elementloaderid, 'No data!');
					}else if(typeof json.data.html =='undefined' ){
						logger.debug(elementloaderid, 'No html!');
					}else{
						logger.debug(elementloaderid, 'Success.');
						targetelement.html(json.data.html);
					}
				},
				complete: function(qXHR, textStatus){
					$('#'+ajaxid).remove();
					if(textStatus!='success')
						logger.debug(elementloaderid, 'Status', textStatus, qXHR);
				}
			});
			return true;
		};
		
		var eachReturn = function(index, element){
			var thisElement = $(this);
			$(window).scroll(function(){
				scroll_action(thisElement);
			});
			plugin.initialized = true;
		};
		
		$.fn.elementloader = plugin;
		return this.each(eachReturn);
	};
})(window, jQuery);

$(document).ready(function(){
	$('.elementloader').elementloader();
});
