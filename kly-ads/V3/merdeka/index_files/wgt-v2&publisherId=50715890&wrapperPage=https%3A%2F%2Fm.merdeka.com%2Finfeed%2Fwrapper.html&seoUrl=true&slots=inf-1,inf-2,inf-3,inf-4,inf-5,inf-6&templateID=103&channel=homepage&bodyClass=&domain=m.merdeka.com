function infSdkLoader()
{this.slotParams=[];this.enableTracker=true;this.publisherID='50715890';this.publisherTrackerClick='';this.publisherTrackerImpresssion='';this.slots="inf-1,inf-2,inf-3,inf-4,inf-5,inf-6";this.slots=this.slots.split(",");this.isIAB='';this.firstSlot=this.slots[0];this.slotBackfills=[];this.clockInterval;}
infSdkLoader.prototype={constructor:infSdkLoader,init:function()
{if(this.publisherID=='51345770')
{this.tweek_tempo();}
else this.initRequest();for(var i in this.slots)
{if(document.getElementById(this.slots[i]))
{if(document.getElementById(this.slots[i]).getAttribute('replace')!=null)
{document.getElementById(this.slots[i]).classList.add("inf-no-campaign");}
else
{document.getElementById(this.slots[i]).setAttribute('class','inf-no-campaign');}}}},set_init:function(params)
{this.publisherID=params.publisherId;this.slots=params.slots;this.firstSlot='inf-gpt-6ecba71675cbb04af68a0ab7a802bf87';this.init();},tweek_tempo:function()
{var th=this;var attempt=1;var maxAttempt=3;th.clockInterval=setInterval(function(){if(th.isJqueryPluginLoaded('mmenu'))
{var elmNav=document.getElementsByTagName('nav')[0];var isLoaded=elmNav.classList.contains('mm-menu');if(isLoaded)
{th.initRequest();window.clearInterval(th.clockInterval);}}
else
{if(attempt>maxAttempt)
{th.initRequest();window.clearInterval(th.clockInterval);}}
attempt++;},1000);},initRequest:function()
{var th=this;var attempt=1;var maxAttempt=10;var elmntExists=document.getElementById(th.firstSlot);if(elmntExists)
{th.gptRequest();}
else
{var intvalID=setInterval(function()
{if(attempt<=maxAttempt)
{var elementExists=document.getElementById(th.firstSlot);if(elementExists)
{th.gptRequest();clearInterval(intvalID);}
else console.log('[INFEED] search element : '+th.firstSlot+'('+attempt+')');}
else clearInterval(intvalID);attempt++;},1000);}},ReInitRequest:function(slot)
{var th=this;var attempt=1;var maxAttempt=10;var intvalIDCheck=setInterval(function()
{if(attempt<=maxAttempt)
{if(document.getElementById(slot).getElementsByTagName("iframe").length==0)
{th.renderBackfill(slot);clearInterval(intvalIDCheck);}}
else clearInterval(intvalIDCheck);attempt++;},1000);},isJqueryPluginLoaded:function(plugin)
{return window.jQuery&&jQuery.fn[plugin];},gptRequest:function()
{var th=this;var gptFrameID='inf-gpt-6ecba71675cbb04af68a0ab7a802bf87';var divNode=document.createElement("div");divNode.id=gptFrameID;divNode.style="display: none;";document.body.appendChild(divNode);var frameID=th.createIframe("50715890",gptFrameID,"<!DOCTYPE HTML> <html> <head> <base target=\"_parent\"> <meta http-equiv=\"content-type\" content=\"text/html\" /> <meta name=\"author\" content=\"KLNmalang\" /> <title>Safe Frame</title> <style> #inf-lb-container { clear: both; } #inf-lb-container .inf-lb-item{ width: 50%; float: left; } </style> <script async=\"async\" src=\"https://www.googletagservices.com/tag/js/gpt.js\"></script> <script> var googletag = googletag || {}; googletag.cmd = googletag.cmd || []; var elContainer = JSON.parse(\'[\"#inf-1\",\"#inf-2\",\"#inf-3\",\"#inf-4\",\"#inf-5\",\"#inf-6\"]\'); var bodyID = \"gpt-1b4b85dafec31abc29fd44bb88cb2365\"; </script> <script> var slotCount = 0; var slotParams = []; googletag.cmd.push(function() { googletag.defineOutOfPageSlot(\"/36504930/infeed.id/m.merdeka.com/dfp-natAds-1\", \"div-gpt-ad-fb27ec14868b53798e1147b8ebc66af8\").addService(googletag.pubads());googletag.defineOutOfPageSlot(\"/36504930/infeed.id/m.merdeka.com/dfp-natAds-2\", \"div-gpt-ad-99d0f8a6aeba5d49d078cdf4bd4f1303\").addService(googletag.pubads());googletag.defineOutOfPageSlot(\"/36504930/infeed.id/m.merdeka.com/dfp-natAds-3\", \"div-gpt-ad-65c904a3d3245be901d0ff9fdac4455e\").addService(googletag.pubads());googletag.defineOutOfPageSlot(\"/36504930/infeed.id/m.merdeka.com/dfp-natAds-4\", \"div-gpt-ad-4e674a58f0a69126059601801807efc7\").addService(googletag.pubads());googletag.defineOutOfPageSlot(\"/36504930/infeed.id/m.merdeka.com/dfp-natAds-5\", \"div-gpt-ad-0549e35bfa7ffbd2d014dd4760a79bbf\").addService(googletag.pubads());googletag.defineOutOfPageSlot(\"/36504930/infeed.id/m.merdeka.com/dfp-natAds-6\", \"div-gpt-ad-1d2f362dcb1ad6ea7c8066df77d4f77c\").addService(googletag.pubads()); googletag.pubads().addEventListener(\"slotRenderEnded\", function(event) { var dfp_slotDelivered = event.isEmpty ? \"none\" : \"block\"; /* check wheter there is ads or not*/ var dfp_slotAdUnitPath = event.slot.getSlotId().getAdUnitPath(); /* get adunit path */ var dfp_slotAdUnitID = event.slot.getSlotId().getId(); /* get adunit container id*/ /*if ( dfp_slotDelivered==\"block\" && parentID==event.slot.getSlotId().m)*/ if ( dfp_slotDelivered==\"block\") { /*console.log(event.slot.getSlotId().getName()); slotParams.push(params);*/ }else{ /*IMPORTANT : add empty object to simulate empty campaign on container*/ slotParams.push({}); } document.getElementById(bodyID).setAttribute(\"params\", JSON.stringify(slotParams)); slotCount++; }); var urlPath = parent.window.location.href, urlArray=urlPath.split(\"/\"), dfp_Article = urlArray[urlArray.length - 1]; /* Start Global targetting tags */ document.getElementById(bodyID).setAttribute(\"data-tags\", \'none\'); if(typeof parent.window.kly !== \'undefined\') { var tagForAds = parent.window.kly.gtm.tag.replace(/[^A-Za-z0-9|\\- ]/ig,\"\").trim().split(\"|\").map(item => item.trim().toLowerCase()); (tagForAds.length) ? googletag.pubads().setTargeting(\"tags\", tagForAds) : \'\'; document.getElementById(bodyID).setAttribute(\"data-tags\", tagForAds); } if(typeof parent.window.kmklabs !== \'undefined\') { var tagForAds = parent.window.kmklabs.gtm.tag.replace(/[^A-Za-z0-9|\\- ]/ig,\"\").trim().split(\"|\").map(item => item.trim().toLowerCase()); (tagForAds.length) ? googletag.pubads().setTargeting(\"tags\", tagForAds) : \'\'; document.getElementById(bodyID).setAttribute(\"data-tags\", tagForAds); } /* End Global targetting tags */ googletag.pubads().setTargeting(\"currentUrl\", urlPath); googletag.pubads().setTargeting(\"page_url\", [dfp_Article]); googletag.pubads().setTargeting(\'infeed_isIAB\', \'\'); googletag.pubads().setTargeting(\"channel\", \'homepage\'); googletag.pubads().enableSingleRequest(); googletag.enableServices(); }); function getTemplateID() { return 103; } function setResParam(parentID, params) { /*console.log(params);*/ slotParams.push(params); } /** * CREATE Additional custom 3rd party script * @param elType string type of element (script|div|style) * @param elAttributes object array collections of element attr complete with its value * @param elNode string node element ID where its going to be added */ create3rdPartyElement = function(elType, elAttributes, elNode) { var parentID = getParrentEl(); /*checking node element existance*/ /*if(!parent.document.getElementById(elNode)) elNode = parentID;*/ if( parent.document.querySelector(elContainer[elNode]) ) { elNode = elContainer[elNode]; } else { elNode = parentID; } var ob_script = parent.document.createElement(elType); /*Itterate objects attributes*/ Object.keys(elAttributes).forEach(function (key) { if(key==\'src\'){ /*handling script src*/ ob_script.src = elAttributes[key]; }else if(key==\'cssStyle\'){ /*handling css styles*/ if(!!(window.attachEvent && !window.opera)) { ob_script.styleSheet.cssText = elAttributes[key]; } else { var styleText = document.createTextNode(elAttributes[key]); ob_script.appendChild(styleText); } }else if(key==\'jsScript\'){ /*handling script tag*/ try { var tagCode = document.createTextNode(elAttributes[key]); ob_script.appendChild(tagCode); } catch(e) { ob_script.text = elAttributes[key]; } }else{ ob_script.setAttribute(key, elAttributes[key]); } }); if(parent.document.querySelector(elNode)) parent.document.querySelector(elNode).appendChild(ob_script); }; function getCurrentLocationAddr() { return parent.window.location.href; } function getParrentEl() { var currentID = this.frameElement.getAttribute(\'id\'); return parent.document.getElementById(currentID).parentNode.getAttribute(\'id\'); } </script> </head> <body style=\"padding: 0;margin: 0; overflow: hidden; width: 0; height: 0;\" id=\"gpt-1b4b85dafec31abc29fd44bb88cb2365\"> <!-- /36504930/infeed.id/m.merdeka.com/dfp-natAds-1 --> <div id=\"div-gpt-ad-fb27ec14868b53798e1147b8ebc66af8\" class=\"inf-item\"> <script> googletag.cmd.push(function() { googletag.display(\"div-gpt-ad-fb27ec14868b53798e1147b8ebc66af8\"); }); </script> </div><!-- /36504930/infeed.id/m.merdeka.com/dfp-natAds-2 --> <div id=\"div-gpt-ad-99d0f8a6aeba5d49d078cdf4bd4f1303\" class=\"inf-item\"> <script> googletag.cmd.push(function() { googletag.display(\"div-gpt-ad-99d0f8a6aeba5d49d078cdf4bd4f1303\"); }); </script> </div><!-- /36504930/infeed.id/m.merdeka.com/dfp-natAds-3 --> <div id=\"div-gpt-ad-65c904a3d3245be901d0ff9fdac4455e\" class=\"inf-item\"> <script> googletag.cmd.push(function() { googletag.display(\"div-gpt-ad-65c904a3d3245be901d0ff9fdac4455e\"); }); </script> </div><!-- /36504930/infeed.id/m.merdeka.com/dfp-natAds-4 --> <div id=\"div-gpt-ad-4e674a58f0a69126059601801807efc7\" class=\"inf-item\"> <script> googletag.cmd.push(function() { googletag.display(\"div-gpt-ad-4e674a58f0a69126059601801807efc7\"); }); </script> </div><!-- /36504930/infeed.id/m.merdeka.com/dfp-natAds-5 --> <div id=\"div-gpt-ad-0549e35bfa7ffbd2d014dd4760a79bbf\" class=\"inf-item\"> <script> googletag.cmd.push(function() { googletag.display(\"div-gpt-ad-0549e35bfa7ffbd2d014dd4760a79bbf\"); }); </script> </div><!-- /36504930/infeed.id/m.merdeka.com/dfp-natAds-6 --> <div id=\"div-gpt-ad-1d2f362dcb1ad6ea7c8066df77d4f77c\" class=\"inf-item\"> <script> googletag.cmd.push(function() { googletag.display(\"div-gpt-ad-1d2f362dcb1ad6ea7c8066df77d4f77c\"); }); </script> </div> </body> </html>",false);var frameTag=document.getElementById(frameID);th.templateBackfill();if(frameTag)
{frameTag.style.display="none";frameTag.onload=function(){var doc=frameTag.contentWindow.document;var attempt=1;var maxAttempt=10;var intvalIDCheckParams=setInterval(function()
{if(attempt<=maxAttempt)
{var params=doc.body.getAttribute("params");if(params)
{th.slotParams=JSON.parse(params);th.buildAds();clearInterval(intvalIDCheckParams);}}
else clearInterval(intvalIDCheckParams);attempt++;},1000);};}},impressionTracker:function()
{var totalAds=this.slotParams&&this.slotParams[0].adunitID?this.slotParams.length:0;if(this.publisherTrackerImpresssion&&totalAds>0)
{var img=document.getElementById(this.firstSlot).appendChild(document.createElement('img'));var imgID="img-50715890-"+this.firstSlot;img.setAttribute("id",imgID);img.setAttribute("src",this.publisherTrackerImpresssion);img.setAttribute("style","width: 0;height: 0;visibility: hidden;");}},buildAds:function()
{var totalAds=this.slotParams?this.slotParams.length:0;var platform="outstream";var infeedTemplate='';var mainContent='';var html="<div class=\"inf-cont\"> <div class=\"inf-wrapper\"> <div class=\"inf-img\"> <a href=\"###LINK###\"> <img src=\"###IMAGE###\" alt=\"###TEXT###\"> </a> </div> <div class=\"inf-text\"> <span><a href=\"/infeed/\">###LABEL###</a></span> <div> <a href=\"###LINK###\">###TEXT###</a> </div> </div> </div> </div>";var css="<style> .inf-cont { border-bottom: solid 1px #ececec; text-align: left; padding: 10px 5px; margin-bottom: 1px; margin: 0 10px; } .inf-wrapper { padding: 0px; min-height: 60px } .inf-img{ float: left; margin: 0 10px 0 0; } .inf-img a { background-color: transparent; border-bottom: 0; padding: 0; width: 120px; height: 60px; overflow: hidden; display: block; } .inf-img img { width: 100% } .inf-text { margin-left: 130px; padding: 5px 0 } .inf-text span { color: #959595; text-transform: capitalize; font-size: 12px; display: block; margin-top: -8px; font-family: arial; } .inf-text span a { color: #959595; text-decoration: none; } .inf-text div { font: bold 15px arial; margin: 0 } .inf-text div a { font: normal 15px arial; padding: 0; text-decoration: none; background-color: transparent; color: #000; border: 0; } </style>";if(this.slotParams)
{for(var i in this.slotParams)
{if(this.slots[i]&&Object.keys(this.slotParams[i]).length>0)
{var param=this.slotParams[i];var body=param.adunitID?this.renderLayout(html+css,param,"_self"):'';mainContent="<!DOCTYPE HTML> <html> <head> <base target=\"_parent\"> <meta http-equiv=\"content-type\" content=\"text/html\" /> <meta name=\"author\" content=\"KLNmalang\" /> <title>Safe Frame</title> <style> #inf-outstream-container{ } </style> </head> <body style=\"padding: 0;margin: 0; overflow: hidden; width: 100%;\" class=\"inf-homepage \"> <div id=\"inf-outstream-container\" style=\"padding: 0;\"> ###MAIN_CONTENT### <div style=\"clear: both; height: 0;\"></div> </div> </body> <script> /* Start Global targetting tags */ if(typeof parent.window.kly !== \'undefined\') { var tags = parent.window.kly.gtm.tag.replace(/[^A-Za-z0-9|\\- ]/ig,\"\").trim().split(\"|\").map(item => item.trim().toLowerCase().replace(/ /g,\'-\')); } if(typeof parent.window.kmklabs !== \'undefined\') { var tags = parent.window.kmklabs.gtm.tag.replace(/[^A-Za-z0-9|\\- ]/ig,\"\").trim().split(\"|\").map(item => item.trim().toLowerCase().replace(/ /g,\'-\')); } if( tags ) { for( var i in tags ) { if( tags[i] ) { document.body.classList.add(tags[i]); } } } /* End Global targetting tags */ </script> </html>";mainContent=mainContent.replace(/###MAIN_CONTENT###/gi,body);var targetElement=(this.slots[i]).substr(0,(this.slots[i]).length-1)+(param.adunitID).substr((param.adunitID).length-1,1);var frameID=this.createIframe("50715890",targetElement,mainContent,true);this.resizeIframe(targetElement,frameID,totalAds,true);}
else
{this.renderBackfill(this.slots[i]);}}}
else
{for(var i in this.slots)
{this.renderBackfill(this.slots[i]);}}
for(var i in this.slots)
{if(this.slotBackfills[this.slots[i]])
{this.ReInitRequest(this.slots[i]);}}},renderBackfill:function(current_slot)
{if(document.getElementById(current_slot)&&this.slotBackfills[current_slot])
{infeedTemplate='<div class="inf-cont">'+this.slotBackfills[current_slot]+'</div>';current_slot.innerHTML='';mainContent="<!DOCTYPE HTML> <html> <head> <base target=\"_parent\"> <meta http-equiv=\"content-type\" content=\"text/html\" /> <meta name=\"author\" content=\"KLNmalang\" /> <title>Safe Frame</title> <style> #inf-outstream-container{ } </style> </head> <body style=\"padding: 0;margin: 0; overflow: hidden; width: 100%;\" class=\"inf-homepage \"> <div id=\"inf-outstream-container\" style=\"padding: 0;\"> ###MAIN_CONTENT### <div style=\"clear: both; height: 0;\"></div> </div> </body> <script> /* Start Global targetting tags */ if(typeof parent.window.kly !== \'undefined\') { var tags = parent.window.kly.gtm.tag.replace(/[^A-Za-z0-9|\\- ]/ig,\"\").trim().split(\"|\").map(item => item.trim().toLowerCase().replace(/ /g,\'-\')); } if(typeof parent.window.kmklabs !== \'undefined\') { var tags = parent.window.kmklabs.gtm.tag.replace(/[^A-Za-z0-9|\\- ]/ig,\"\").trim().split(\"|\").map(item => item.trim().toLowerCase().replace(/ /g,\'-\')); } if( tags ) { for( var i in tags ) { if( tags[i] ) { document.body.classList.add(tags[i]); } } } /* End Global targetting tags */ </script> </html>";mainContent=mainContent.replace(/###MAIN_CONTENT###/gi,infeedTemplate);mainContent=mainContent.replace(/width: 100%;/gi,"/width: auto;");var frameID=this.createIframe("50715890",current_slot,mainContent,true);this.resizeIframe(current_slot,frameID,1,true);}},renderLayout:function(content,param,target)
{if(!param)return'';var no_tracker=this.enableTracker?(param.no_tracker=="FALSE"?false:true):true;var trackerClick=no_tracker?'':param.dfp_click_tracker;var trackerImpresssion=no_tracker?'':param.dfp_impr_tracker;if(this.publisherTrackerClick)
{trackerClick=this.publisherTrackerClick+trackerClick;}
if(param["3rd_click_tracker"])
{trackerClick=param["3rd_click_tracker"]+trackerClick;}
var wrapperURL='https://m.merdeka.com/infeed/';var newsUrl_=param.link.split('/');var newsUrl=newsUrl_[newsUrl_.length-1];if(newsUrl)wrapperURL=wrapperURL+newsUrl+'';if(param.link)
{var landingPageUrl=landingPageTarget='_self';var isNewTab=true;if(param.link.indexOf("d.infeed.id/article/")>0)
{var landingPageUrl=wrapperURL;}
else
{landingPageUrl=param.link}
if(target=="_self")
{if(param.target=='self'||param.target=='')
{isNewTab=false;}
if(content.indexOf('###TARGET###')<=0&&isNewTab)
{content=content.replace(/"###LINK###"/gi,'"###LINK###" target="_blank"');}}
else
{landingPageTarget="_blank";}}
if(landingPageUrl=='_self')
{landingPageUrl='_parent';}
landingPageUrl=landingPageUrl.replace('https://','//');content=content.replace(/###TEXT###/gi,param.text);content=content.replace(/###DESC###/gi,(param.desc?param.desc:''));content=content.replace(/###LABEL###/gi,param.label);content=content.replace(/###IMAGE###/gi,trackerImpresssion+param.image);content=content.replace(/###LINK###/gi,trackerClick+landingPageUrl);content=content.replace(/###TARGET###/gi,landingPageTarget);if(param["3rd_impression_tracker"])
{content+='<img src="'+param["3rd_impression_tracker"]+'" style="width: 0;height: 0;visibility: hidden;"/>';}
return content},createIframe:function(publisherID,elementID,tagHTML,resize)
{var elmn=document.getElementById(elementID);if(elmn)
{if(elmn.getAttribute('replace')!=null)
{elmn.innerHTML='';}
var iframe=elmn.appendChild(document.createElement('iframe'));var frameID="frame-"+publisherID+"-"+elementID+resize;iframe.setAttribute("id",frameID);iframe.setAttribute("name",frameID);iframe.setAttribute("sandbox","allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-top-navigation");iframe.setAttribute("scrolling","no");if(!resize)
{iframe.setAttribute("style","visibility: hidden; display: none; width: 0; height: 0;");var css_custom="";var divNode=document.createElement("div");divNode.id="infeed-custom-css";divNode.style="display: none;";divNode.innerHTML=css_custom;document.body.appendChild(divNode);}
document.getElementById(frameID).style.border="none";document.getElementById(frameID).style.overflow="hidden";document.getElementById(frameID).style.width=0;document.getElementById(frameID).style.height=0;doc=iframe.contentWindow.document;doc.open();doc.write(tagHTML);doc.close();if(elmn&&resize)
{if(elmn.getAttribute('replace')!=null)
{elmn.classList.remove("inf-no-campaign");elmn.classList.add("inf-filled-campaign");}
else
{elmn.setAttribute('class','inf-filled-campaign');}
if(typeof infCallback==='function')
{infCallback(elementID);}}
return frameID;}},resizeIframe:function(cntnrID,frameID,totalAds,isOutstream)
{if(document.getElementById(frameID))
{InfResizeFrame_6ecba71675cbb04af68a0ab7a802bf87(cntnrID,frameID,totalAds,isOutstream);document.getElementById(frameID).onload=function(){InfResizeFrame_6ecba71675cbb04af68a0ab7a802bf87(cntnrID,frameID,totalAds,isOutstream);};window.onresize=function(event){InfResizeFrame_6ecba71675cbb04af68a0ab7a802bf87(cntnrID,frameID,totalAds,isOutstream);};window.addEventListener("orientationEvent",function(){InfResizeFrame_6ecba71675cbb04af68a0ab7a802bf87(cntnrID,frameID,totalAds,isOutstream);});window.addEventListener("resize",function(){InfResizeFrame_6ecba71675cbb04af68a0ab7a802bf87(cntnrID,frameID,totalAds,isOutstream);});}},templateBackfill:function()
{for(i in this.slots)
{var elmn=document.getElementById(this.slots[i]);if(elmn)
{chlds=elmn.getElementsByTagName('template');for(var j=0;j<chlds.length;j++)
{if(chlds[j].getAttribute('type')=='text/x-handlebars-template')
{this.slotBackfills[this.slots[i]]=chlds[j].innerHTML;chlds[j].remove();}}}}}};(function(doc){var infSdk=new infSdkLoader();infSdk.init();})(document);function InfResizeFrame_6ecba71675cbb04af68a0ab7a802bf87(cntnrID,frameID,totalAds,isOutstream)
{var d=document.getElementById(frameID).contentWindow.document;var bodyW=d.body.style.width;var bodyH=d.body.clientHeight;if(isOutstream)
{if(totalAds==0)
{bodyW=bodyH=0;}
else
{var infCont=d.getElementsByClassName("inf-cont");bodyH=infCont[0].clientHeight+1;bodyW="100%";}}
document.getElementById(cntnrID).style.width=bodyW;document.getElementById(cntnrID).style.height=bodyH+"px";document.getElementById(frameID).style.width=bodyW;document.getElementById(frameID).style.height=bodyH+"px";setTimeout(function(){var d=document.getElementById(frameID).contentWindow.document;var bodyWidth=d.body.style.width;var bodyHeight=d.body.clientHeight;if(isOutstream)
{if(totalAds==0)
{bodyWidth=bodyHeight=0;}
else
{var infCont=d.getElementsByClassName("inf-cont");bodyHeight=infCont[0].clientHeight+1;bodyWidth="100%";}}
document.getElementById(cntnrID).style.width=bodyWidth;document.getElementById(cntnrID).style.height=bodyHeight+"px";document.getElementById(frameID).style.width=bodyWidth;document.getElementById(frameID).style.height=bodyHeight+"px";},1000);}/*2020-04-07 11:05:45 in*//*2020-04-07 11:06:53 out*/