var pageloader = function($, window){
	'use strict';
	var debug_active = false;
	var internalData = {};
	var localStorage = window.localStorage || {};
	var console = window.console || {};
	var debug = {};
	
	var viewpointurl={
		checkid:0,
		currenturl:null,
		lastchangetime:0
	};
	var pageloader={
		init:null,
		count:0,
		maxpage:0,
		checkid:0,
		currenturl:null,
		nexturl:null,
		onprogress:false,
		is_loaded:false,
		viewpointurl:viewpointurl,
		debug_active:debug_active,
		loadedurl:[]
	};
	
	// Disable console.
	if(!(pageloader.debug_active || localStorage.debug_active)){
		var methods = ["log", "debug", "warn", "info"];
		for(var i=0;i<methods.length;i++){
			var method = methods[i];
			debug[method] = function(){};
			console[method] = function(){};
		}
	}else{
		var methods = ["log", "debug", "warn", "info"];
		for(var i=0;i<methods.length;i++){
			var method = methods[i];
			debug[method] = console[method].bind(
				window.console, '%c[PageLoader]', 'font-weight: bolder'
			);
		}
	}
	
	var getUnixTime = function(){
		var unixTime = new Date().getTime() / 1000;
		return unixTime;
	};
	
	var urlparser = function(href){
		var match = href.match(/^(https?\:)\/\/(([^:\/?#]*)(?:\:([0-9]+))?)([\/]{0,1}[^?#]*)(\?[^#]*|)(#.*|)$/);
		return match && {
			protocol: match[1],
			host: match[2],
			hostname: match[3],
			port: match[4],
			pathname: match[5],
			search: match[6],
			hash: match[7]
		}
	}
	
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
	}
	function is_pass_ahalf_ofviewpoint(element){
		return is_onviewpoint(element, 0.5);
	};

	function get_browser(){
		if(!internalData.browser)internalData.browser = {};
		if(internalData.browser.cachedResult)
			return internalData.browser.cachedResult;
		
		var isOperaMini = (navigator.userAgent.indexOf('Opera Mini') >= 0);
		var isUCBrowser = (navigator.userAgent.indexOf('UCBrowser') >= 0);
		var isOpera = (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0;
		var isFirefox = typeof InstallTrigger !== 'undefined';
		var isSafari = Object.prototype.toString.call(window.HTMLElement).indexOf('Constructor') > 0;
		var isChrome = !!window.chrome && !isOpera;
		var isIE = /*@cc_on!@*/false || !!document.documentMode;
		var isEdge = !isIE && !!window.StyleMedia;
		return internalData.browser.cachedResult =
			isUCBrowser ? 'ucbrowser' :
			isOperaMini ? 'opera-mini' :
			isOpera ? 'opera' :
			isFirefox ? 'firefox' :
			isSafari ? 'safari' :
			isChrome ? 'chrome' :
			isIE ? 'msie' :
			isEdge ? 'edge' :
			"other-browser";
	};
	var viewpointurl_action = function(){
		if(typeof window.history !== 'object'){return;};
		if(typeof window.history.pushState !== 'function'){return;};
		
		$($('.viewpointurl').get().reverse()).each(function(){
			var viewpointurlid=$(this).data('viewpointurlid');
			var viewpointtitle=$(this).data('viewpointtitle');
			var thisurl=$(this).data('viewpointurl');
			
			if(!thisurl){return;};
			if(!viewpointurlid){return;};
			if(!is_onviewpoint($(this))){return;};
			
			if(getUnixTime() - pageloader.viewpointurl.lastchangetime < 1){return;};
			
			if(pageloader.viewpointurl.checkid === viewpointurlid){return;};
			
			pageloader.viewpointurl.checkid=viewpointurlid;
			if(thisurl && pageloader.viewpointurl.currenturl == thisurl){return};
			var urlinfo=urlparser(thisurl);
			
			if(
				(urlinfo == null && thisurl != window.location.pathname)
				|| (
					urlinfo != null
					&& urlinfo.hostname == window.location.hostname
					&& urlinfo.pathname != window.location.pathname
				)
			){
				pageloader.viewpointurl.lastchangetime=getUnixTime();
				pageloader.viewpointurl.currenturl = thisurl;
				window.history.pushState(null, null, thisurl);
			};
			if(viewpointtitle){
				pageloader.viewpointurl.currenturl = thisurl;
				pageloader.viewpointurl.lastchangetime=getUnixTime();
				$(document).prop('title', viewpointtitle);
			}
			debug.log('Viewpoint', viewpointurlid, thisurl);
			return;
		});
	}
	var pageloader_action = function(){
		if(pageloader.onprogress){return false;};
		var maxpage=$('.pageloader').last().data('pageloadermax');
		var maxpage_visible=$('.pageloader').last().hasClass('pageloader-visible');
		var maxpage_ahalf=$('.pageloader').last().hasClass('pageloader-ahalf');
		var maxpage_full=$('.pageloader').last().hasClass('pageloader-full');
		
		pageloader.maxpage = parseInt(maxpage);
		if(get_browser() === 'opera-mini'){return false;};
		if(pageloader.count >= pageloader.maxpage){return false;};
		if(!(
			(maxpage_visible && is_onviewpoint($('.pageloader').last()))
			|| (maxpage_ahalf && is_onviewpoint($('.pageloader').last(), 0.5))
			|| (maxpage_full && is_onviewpoint($('.pageloader').last(), 1.0))
		)){return;};
		$('.ajax-pageloader').remove();
		
		var nexturl=$('.pageloader').last().data('pageloadernexturl');
		var targetelm=$('.pageloader').last().data('pageloadertargetelm');
		if(typeof nexturl === 'object'){
			var nexturls=nexturl;
			var checkurl=null;
			for (var key in nexturls){
				if(!checkurl){
					checkurl=nexturls[key];
					for (var key in pageloader.loadedurl){
						var value=pageloader.loadedurl[key];
						if(checkurl==value){
							checkurl=null;
							break;
						};
					};
				};
			};
			nexturl=checkurl;
		};
		
		if(!nexturl || pageloader.checkid===nexturl){return false;};
		
		// Check if already loaded.
		var load_nexturl=true;
		for (var key in pageloader.loadedurl){
			var value=pageloader.loadedurl[key];
			if(value==nexturl){
				load_nexturl=false;
				break;
			};
		};
		
		if(!load_nexturl){return false;};
		
		value=pageloader.loadedurl.push(nexturl);
		debug.log('Next', nexturl);
		pageloader.checkid=nexturl;
		$('.pageloader').last()
			.after('<div class="ajax-pageloader ajaxloader-small-orange">&nbsp;</div>');
		var currenturl=window.location;
		if(pageloader.currenturl==nexturl){return false;};
		
		pageloader.count++;
		debug.log('font-weight: bolder', 'Count', pageloader.count);
		
		var html='';
		var target={};
		if(targetelm){
			debug.log('Next-Targetelm', targetelm);
			target=$(targetelm);
		}else{
			target=$('.pageloader').last();
		};
		
		pageloader.onprogress=true;
		$.ajax({
			type: 'GET',
			url: nexturl,
			success: function (json) {
				if(typeof json.status =='undefined' ){
					debug.log('Next-Failed', 'No status!');
					return false;
				};
				if(json.status!=200){
					debug.log('Next-Failed', 'Status', json.status);
					return false;
				};
				if(typeof json.data =='undefined' ){
					debug.log('Next-Failed', 'No data!');
					return false;
				};
				
				var pageurl=json.pageurl||null;
				var pagetitle=json.title||null;
				
				for (var key in json.data){
					var value=json.data[key];
					html += value;
				}
				var htmlelement = $(html);
				
				var ajaxid=null;
				if(typeof json.ajaxid !='undefined' && json.ajaxid){
					ajaxid=json.ajaxid;
					debug.log('Next-Ajaxid', ajaxid);
					
					var wrapper=$();
					if(typeof json.ajaxlisttype!='undefined' && json.ajaxlisttype==true){
						debug.log('Next-AjaxListType', ajaxid);
						wrapper=$('<ul id="" class=""></ul>');
						wrapper.addClass('listchild');
					}else{
						debug.log('Next-NotAjaxListType', ajaxid);
						wrapper=$('<div id="" class=""></div>');
					};
					
					wrapper
						.addClass('ajaxcontainer')
						.attr('id', ajaxid).html(htmlelement);
					
					if(typeof json.containerattrs === 'object'){
						for(var attrkey in json.containerattrs){
							var attrval = json.containerattrs[attrkey];
							if(typeof attrval !== 'string'
								&& typeof attrval !== 'number'
							){
								debug.log('Container-Attrs', 'Failed', typeof attrval, {attrkey:attrval});
								continue;
							};
							
							if(attrkey === 'class'){
								debug.log('Container-Attrs', 'AddClass', attrval);
								wrapper.addClass(attrval);
							}else if(attrkey === 'id'){
								debug.log('Container-Attrs', 'AddId', attrval);
								wrapper.attr('id', attrval + ajaxid);
							}else{
								debug.log('Container-Attrs', 'AddAttr', {attrkey:attrval});
								wrapper.attr(attrkey, attrval);
							};
						};
					};
					
					htmlelement=wrapper;
				};
				
				if(typeof window.ga === 'function'){
					// GA URL.
					var reg = /.+?\:\/\/.+?(\/.+?)(?:#|\?|$)/;
					var pathname = reg.exec(pageurl);
					if(pageurl && pathname && pathname[1]){
						pathname=pathname[1];
						htmlelement=$(htmlelement);
						var pagepath = pathname;
						
						// var url_separator = pageurl.indexOf('?') !== -1 ? '&' : '?';
						// pagepath = pathname+url_separator+'ReadingList='+pageloader.count;
						
						debug.log('GA-Track', {
							page: pagepath,
							title: pagetitle,
							url: pageurl
						});
						
						window.ga('set', 'page', pagepath);
						window.ga('set', 'title', pagetitle);
						window.ga('set', 'location', pageurl);
						window.ga('send', 'pageview');
					};
					
				};
				
				var pageloaderelement = htmlelement.find('.pageloader');
				var showonly = pageloaderelement.data('pageloadershowonly');
				if(showonly){
					var showonlyindex = parseInt(pageloader.count);
					if(typeof showonly[showonlyindex] === 'string'){
						var showonlynow = showonly[showonlyindex];
						debug.log('Showonly', showonlyindex, showonlynow);
						htmlelement
							.find('.showonly')
							.not(showonlynow)
							.remove();
					};
				};
				
				// Add it.
				target.after(htmlelement);
				debug.log('Next-Success', json.length, 'item(s)');
				return true;
			},
			complete: function(qXHR, textStatus){
				pageloader.onprogress=false;
				$('.ajax-pageloader').remove();
			}
		});
		return true;
	};
	
	var init = function(forced){
		if(pageloader.is_loaded && !forced)return false;
		pageloader.is_loaded = true;
		var pageloaderelement=$('.pageloader').first();
		
		var showonly = pageloaderelement.data('pageloadershowonly');
		if(showonly){
			if(typeof showonly[1] === 'string'){
				$('.showonly', pageloaderelement)
					.not(showonly[1])
					.remove();
			};
		};
		
		// The new URL.
		$(window).bind('popstate', function(){
			var newurl=window.location.href;
			$('.viewpointurl').each(function(){
				var viewpointurl=$(this).data('viewpointurl');
				if(newurl == viewpointurl){
					$('html, body').animate({
						scrollTop: $(this).offset().top
					}, 100);
					return false;
				};
			});
		});
		
		// Save this url.
		var thisurl=pageloaderelement.data('pageloaderthisurl');
		pageloader.loadedurl.push(thisurl);
		pageloader.count++;
		
		$(window).scroll(function(){
			window.setTimeout(function(){
				// Delay.
				if(pageloader.onprogress){return false;};
				pageloader_action();
			}, 100)
			viewpointurl_action();
		});
		return true;
	};
	
	pageloader.init = init;
	return pageloader;
}(jQuery, window);
$(document).ready(function(){
	pageloader.init();
});
