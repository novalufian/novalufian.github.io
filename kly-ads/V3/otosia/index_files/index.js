                (function() {
                    var useSSL = 'https:' == document.location.protocol;
                    var dDate = new Date();
                    var nRand = dDate.getFullYear()+""+dDate.getMonth()+""+dDate.getDate()+""+dDate.getHours();//+""+dDate.getMinutes();
                    var sSite = 18;
                    var src = (useSSL ? 'https:' : 'http:') +
                    '//a.merdeka.com/internal-ads/'+nRand+'/'+sSite+'/data.js';
                    document.write('<scr' + 'ipt src="' + src + '"></scr' + 'ipt>');
                    
                    if ( document.addEventListener ) { // native event
                        document.addEventListener("DOMContentLoaded", addDMP_toBody, false);
                    } else if ( document.attachEvent ) {
                        addDMP_toBody();
                    }
                    
                })();
                
                function addDMP_toBody()
                {
                    var urlPath = document.URL;
                    var startPos = urlPath.search("utm_param=");
                    if(startPos>1)
                    { 
                        Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
                        /*console.log('KLN dmp detected');*/
                        var endPos = urlPath.search("&utm_");
                        var url_param = urlPath.substr(startPos+10, (endPos-(startPos+10)));
                        
                        var DMPstring = kln_decodeParam(url_param);
                        /*console.log(DMPstring);*/

                        var endPos = DMPstring.search("}");
                        //console.log('endPos : '+endPos);
                        //console.log('len : '+DMPstring.length);
                        
                        DMPstring = DMPstring.substr(0, endPos+1);
                        /*console.log(DMPstring);*/
                        
                        var DMPdata = JSON.parse(DMPstring);
                        var pixelTag = '';
                        DMPdata = Object.keys(DMPdata).map(function (key) {
                            var axel = Math.random() + '';
                            var a = axel * 10000000000000;
                            
                            var oImg=document.createElement("img");
                            oImg.setAttribute('src', 'https://pubads.g.doubleclick.net/activity;dc_iu=/36504930/DFPAudiencePixel;ord=' + a + ';dc_seg=' + DMPdata[key] + '?');
                            oImg.setAttribute('alt', 'dmp pixel');
                            oImg.setAttribute('height', '1px');
                            oImg.setAttribute('width', '1px');
                            document.body.appendChild(oImg);
                        });
                    }
                }
                
                function kln_showAds(zone_id)
                {
                    if (typeof noAdsPage == 'undefined') {
                        noAdsPage = false;
                    }
                    inAds_kln_obj = inAds_kln_json[zone_id];
                    if(typeof inAds_kln_obj == 'object'){
                        var idx = Math.floor((Math.random() * (Object.keys(inAds_kln_obj).length)) + 1);
                        if(Object.keys(inAds_kln_obj).length)
                        {
                            /*get ads object list*/ 
                                var dataBanner = inAds_kln_obj;
                            /*get ads object list IDs*/
                                var keyArray = Object.keys(dataBanner);
                            /*check if current page is advertorial pages*/
                            if(!noAdsPage)
                            {
                                /*only deliver regular ads on non advertorial pages*/
                                /*randomize ads if contain more than one creative*/
                                var idx = keyArray.sort(function() {return 0.5 - Math.random()});
                                document.write(dataBanner[idx[0]]);
                            }else{
                                /*check if there are custom ads for this page, based on the url*/
                                if (typeof dataBanner[urlPath] != 'undefined') {
                                    document.write(dataBanner[urlPath]);
                                }
                            }
                                
                        }
                    }
                } 
                
                // Encode the String
                function kln_encodeParam(sText)
                {
                    var encodedString = Base64.encode(string);
                    return encodedString;
                }
                
                // Decode the String
                function kln_decodeParam(sText)
                {
                    var decodedString = Base64.decode(sText);
                    return decodedString;
                } 
                   
 /* From Real Value */