var IzootoOptin=function(){this.optinType=6;this.data="<style>#izooto-subscription-prompt .izfadeInUp{-webkit-animation-name: fadeInUp; animation-name: fadeInUp; -webkit-animation-duration: 1s; animation-duration: 1s; -webkit-animation-fill-mode: both; animation-fill-mode: both;}@-webkit-keyframes 'fadeInUp'{0%{opacity: 0; -webkit-transform: translate3d(0, 100%, 0); transform: translate3d(0, 100%, 0);}100%{opacity: 1; -webkit-transform: none; transform: none;}}@keyframes 'fadeInUp'{0%{opacity: 0; -webkit-transform: translate3d(0, 100%, 0); transform: translate3d(0, 100%, 0);}100%{opacity: 1; -webkit-transform: none; transform: none;}}.powered-by-izooto{font-size: 11px; font-weight: 600; font-family: sans-serif; letter-spacing: 0.4px; color: {{--messageForeColor--}};}#izooto-subscription-prompt .iz_prompt_overlay_dep{position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.7); z-index: 2147483647;}#izooto-subscription-prompt .iz_prompt_containr{position: fixed; bottom: 0; right: 0; width: 400px; height: auto; padding: 20px 0; padding-right: 10px; padding-left: 10px; font-family: 'Open Sans', sans-serif; z-index: 2147483647; box-shadow: 0 0 50px rgba(0, 0, 0, .31); background: {{--bgColor--}};}#izooto-subscription-prompt .iz_prompt_containr .iz_img_container{float: left; width: 17%; height: 100%;}#izooto-subscription-prompt .iz_img_container img.iz_img{max-width: 70px;}#izooto-subscription-prompt .iz_prompt_containr .iz_text_container{width: 78%; float: right;}#izooto-subscription-prompt .iz_text_container .iz_description{line-height: 24px; word-break: break-word; font-size: 17px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 2; text-overflow: ellipsis; overflow: hidden; max-height: 46px; padding-bottom: 5px; word-break: break-word; font-weight: 300; color: {{--messageForeColor--}};}#izooto-subscription-prompt .iz_text_container .iz_title{word-break: break-word; margin-top: 0; margin-bottom: 5px; font-size: 22px; line-height: 28px; font-weight: 300; letter-spacing: 1px; display: -webkit-box; -webkit-box-orient: vertical; -webkit-line-clamp: 3; overflow: hidden; text-overflow: ellipsis; max-height: 85px; text-transform: none; color:{{--titleForeColor--}};}#izooto-subscription-prompt .izfadeInUp .iz_buttons_container{clear: both; width: 100%; margin-left: 8%;}#izooto-subscription-prompt .izfadeInUp .iz_allow_button{text-transform: none; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; display: inline-block; text-align: center; vertical-align: middle; font-weight: 400; line-height: 1; font-size: 14px; min-width: 125px; max-width: 140px; cursor: pointer; background-image: none; padding: 12px 5px; border-radius: 4px; text-decoration: none; background:{{--btn2bgColor--}}; color:{{--btn2ForeColor--}};}#izooto-subscription-prompt .izfadeInUp .iz_block_button{text-transform: none; display: inline-block; text-align: center; vertical-align: middle; font-weight: 400; line-height: 1; font-size: 14px; min-width: 125px; max-width: 140px; overflow: hidden; white-space: nowrap; text-overflow: ellipsis; cursor: pointer; background-image: none; padding: 12px 5px; border-radius: 4px; text-decoration: none; background:{{--btn1bgColor--}}; color:{{--btn1ForeColor--}};}#izooto-subscription-prompt .iz_prompt_containr .izbranding{position: fixed; right: 5px; bottom: 5px; width: 130px;}@media only screen and (max-width: 800px){#izooto-subscription-prompt .izfadeInUp .iz_buttons_container{padding-bottom: 15px; padding-top: 15px;}#izooto-subscription-prompt .iz_prompt_containr{z-index: 99999999; width: 100%; padding: 10px 0; position: fixed; left: 0px; right: auto;}#izooto-subscription-prompt .iz_prompt_containr .iz_text_container{width: 75%;}#izooto-subscription-prompt .izfadeInUp .iz_allow_button{min-width: 80px; max-width: 110px; padding: 10px 5px;}#izooto-subscription-prompt .izfadeInUp .iz_block_button{min-width: 80px; max-width: 110px; padding: 10px 5px;}#izooto-subscription-prompt .iz_prompt_containr .iz_img_container{padding-left: 10px;}#izooto-subscription-prompt .iz_prompt_containr' .iz_text_container{padding-right: 10px ;width: 70% ;}#izooto-subscription-prompt .iz_text_container.iz_title{word-break: break-word ;font-size: 16px ;line-height: 22px ;max-height: 46px ;}#izooto-subscription-prompt .iz_text_container .iz_description{line-height: 20px ;font-size: 13px ;max-height: 58px ;padding-bottom: 5px;}#izooto-subscription-prompt .iz_text_container .iz_buttons_container{padding-bottom: 4% ;}}</style> <div id='izooto-subscription-prompt'> <div class='iz_prompt_overlay'> <div class='izfadeInUp iz_prompt_containr'> <div class='iz_img_container'> <img alt='notification' class='iz_img' src='{{--icon--}}' width='70' height='70'></div><div class='iz_text_container'> <div class='iz_title'>{{--message--}}</div><div class='iz_description'>{{--subMessage--}}</div></div><center> <div class='iz_buttons_container'> <a href='javascript:void(0)' class='iz_allow_button' onclick='_izooto.openPopup(); '>{{--btn2Txt--}}</a> <a href='javascript:void(0)'class='iz_block_button' onclick='_izooto.closeDialog(); '>{{--btn1Txt--}}</a> </div></center> <a href='{{--poweredbysrc--}}' target='_blank'><span class='izbranding powered-by-izooto'>Powered by iZooto</span></a> </div></div></div>";}
if(_izooto!=undefined&&IzootoOptin!=undefined&&typeof _izooto.optinCallback=="function"){_izooto.optinCallback(IzootoOptin);}