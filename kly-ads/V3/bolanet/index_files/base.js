if("undefined"==typeof window)var window={};"undefined"==typeof window.playback&&(window.playback={}),window.playback.Revision={tag:"PLAYBACK-2020-04-03_02-24-58",revision:"a56fe20",time:"2020-04-03T05:36:14",url:"https://static-playback-vidio-com.akamaized.net/playback/a56fe20",storageType:"gcs"},function(e,a,i){if("undefined"!=typeof a){var t=a.getElementsByTagName("body")[0],n=a.createElement("script"),o=a.createElement("link"),r=function(a){var t="PLAYBACK::PLAYBACK::"+a;if("undefined"!=typeof i&&"function"==typeof e.playbackProperties){var n=e.playbackProperties();n.storage_type=playback.Revision.storageType,n.page=e.location.href,n.event_time=Math.floor(Date.now()/1e3),n.lite_mode=!!PlayerEnvironment.currentEnv().lite_mode,i.track(t,n)}};o.rel="stylesheet",o.media="all",o.href=playback.Revision.url+"/playback.css",n.setAttributeNode(a.createAttribute("crossorigin")),n.onload=function(){e.Topic.publish("playback/playback/loaded"),r("LOADED")},n.onerror=function(){r("FAILED")},n.src=playback.Revision.url+"/playback.js",t.appendChild(n),t.appendChild(o)}}(window,window.document,window.ahoy);