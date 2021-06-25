let isLoaded = false;

function klyAppsBannerLoaded() {
  if (isLoaded === true) {
    return;
  }

  isLoaded = true;
  if (parent.klyDpfParam.dfp_use_video_source !="youtube") {
    klyAppsEmbedAutoplayVideo();
  }
}

function invitationLandToSlideNumber(number, isAutomation) {
//  console.log('invitation land to ' + number, isAutomation);
}

function expandedLandToSlideNumber(number, isAutomation) {
    console.log(number);

    //  console.log('expanded land to ' + number, isAutomation);
    klyAppsTriggerTimerStart('frame' + parseInt(number));

    /* Fixed Timelinemax Transform Matrix Animation */
    for(var i=0; i<document.querySelectorAll('.innity-apps-carol-big').length; i++) {
    document.querySelectorAll('.innity-apps-carol-big')[i].style.zIndex = 0;
    }
    document.querySelector('.innity-apps-carol-card-' + parseInt(number)).style.zIndex = 1;


    if (number === 2) {
        if (parent.klyDpfParam.dfp_use_video_source !="youtube") {
            document.getElementsByClassName('apps-video-control-wrapper')[0].style.opacity = 1;
        }else{
            parent.klyDpfParam.dfp_use_video_obj.player_.tech_.play()
        }
        klyAppsPlayVideo();
    } else {
        if (parent.klyDpfParam.dfp_use_video_source !="youtube") {
            document.getElementsByClassName('apps-video-control-wrapper')[0].style.opacity = 0;
        }else{
            parent.klyDpfParam.dfp_use_video_obj.player_.tech_.pause()
        }
        klyAppsPauseVideo();
    }
}

function expandedBannerClosed() {
  klyAppsTrackerReset();
}

/**
 * Device orientation event callback. <br />
 * Callback only when isOrientationEnable is set to TRUE in CoreEngine.js <br />
 * e.alpha <br />
 * e.beta <br />
 * e.gamma
 * @param {object} e
 */
function deviceOrientation(e) {
  console.log(e.alpha, e.beta, e.gamma);
}
/**
 * Orientation change event callback. <br />
 * Callback only when isOrientationEnable is set to TRUE in CoreEngine.js <br />
 * e.eventType
 * @param {object} e
 */
function orientationChange(e) {
  console.log(e.eventType);
}

// ========== Video template required code ==========
let klyAppsFallbackPlayer = null;
let klyAppsVideoPlayer = null;
let klyAppsVisibilityHidden = 'hidden';

function klyAppsEmbedAutoplayVideo() {
  if (document.getElementById('video-wrapper-1') === null) {
    return;
  }

  klyAppsVideoPlayer = new klyAppsMobileAutoPlayVideo(
    'video-wrapper-1',
    'video1',
    {
      webm: klyDpfParam.dfp_video,
      mp4: klyDpfParam.dfp_videomp4,
      mpg: 'images/video1.mpg',
      poster: klyDpfParam.poster,
      autoplay: false,
      loop: false,
      forceFallback: false,
      // For fallback player.
      fullscreen: true,
      canvaswidth: '320',
      canvasheight: '180',
      midctatext: 'Learn More',
      playstatectatext: 'Learn More',
      //urls: 'clickTAG'
    },
    klyDpfParam.poster // this is fallback video poster.
  );

  klyAppsFallbackPlayer = klyAppsVideoPlayer.getFallbackPlayer();
  if (klyAppsFallbackPlayer !== null) {
    klyAppsRunFallbackVideo();
  }

  klyAppsVisibilityBinding();
}

function klyAppsPauseVideo() {
  if (klyAppsVideoPlayer === null) {
    return;
  }

  if (klyAppsFallbackPlayer !== null) {
    klyAppsFallbackPlayer.pausePreview();
    return;
  }

  klyAppsVideoPlayer.pauseVideo();
}

function klyAppsPlayVideo() {
  if (klyAppsVideoPlayer === null) {
    return;
  }

  if (klyAppsFallbackPlayer !== null) {
    klyAppsFallbackPlayer.playPreview();
    return;
  }

  klyAppsVideoPlayer.playVideo();
}

function klyAppsRunFallbackVideo() {
//    fallbackPlayer.noLoop(); // Preview will not loop after ended.
//    fallbackPlayer.noAutoplay(); // Preview will not autoplay.
//    fallbackPlayer.remainPreviewAfterClick(); // Preview will remain there after clicked.
//    fallbackPlayer.setClickCallback(whenFallbackAutoplayIsClicked);
//    fallbackPlayer.addListener('load', fallbackVideoOnLoad);
//    fallbackPlayer.addListener('play', fallbackVideoPlayed);
//    fallbackPlayer.addListener('ended', whenPreviewEnded);
//    fallbackPlayer.setVideoEndedCallback(whenHTMLVideoPlayedEnded);
//    fallbackPlayer.fullscreenCallBack(checkVideoFullScreenStatus);
  klyAppsFallbackPlayer.startEngine(); // This is always required!!!!!
}

function klyAppsVisibilityBinding() {
  var visibilityChangeEvent = 'visibilitychange';
  if (typeof (document.msHidden) !== 'undefined') {
    klyAppsVisibilityHidden = 'msHidden';
    visibilityChangeEvent = 'msvisibilitychange';
  } else if (typeof (document.webkitHidden) !== 'undefined') {
    klyAppsVisibilityHidden = 'webkitHidden';
    visibilityChangeEvent = 'webkitvisibilitychange';
  }

  document.addEventListener(visibilityChangeEvent, klyAppsVisibilityChange, false);
}

function klyAppsVisibilityChange() {
  if (klyAppsFallbackPlayer !== null) {
    return;
  }

  if (document[klyAppsVisibilityHidden] === true) {
    // When browser is hidden or in background.
    klyAppsVideoPlayer.pauseVideo();
  } else {
    // When browser is active or focus.
//        videoPlayer.playVideo();
  }
}
// ========== Video template required code ==========

/**
 * Device orientation event callback. <br />
 * Callback only when isOrientationEnable is set to TRUE in CoreEngine.js <br />
 * e.alpha <br />
 * e.beta <br />
 * e.gamma
 * @param {object} e
 */
function deviceOrientation(e) {
  console.log(e.alpha, e.beta, e.gamma);
}
/**
 * Orientation change event callback. <br />
 * Callback only when isOrientationEnable is set to TRUE in CoreEngine.js <br />
 * e.eventType
 * @param {object} e
 */
function orientationChange(e) {
  console.log(e.eventType);
}
