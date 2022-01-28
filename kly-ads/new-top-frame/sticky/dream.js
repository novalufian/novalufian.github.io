var _PARENT_BODY_ = null;
    var _PARENT_BODY_TARGET_ = null;
    var _TOPFRAME_PARENT_WRAPPER_ = null;
    var _TOPFRAME_WRAPPER_ = null;
    var _TOPFRAME_STICKY_ = false;
    var _TOPFRAME_STICKY_END_ = false;
    var _TOPFRAME_STICKY_LAST_SCROLL_ = 0;
    var _TOPFRAME_STICKY_LAST_SCROLL_END_ = 0;
    var _TOPFRAME_STICKY_SCROLL_SPEED_ = 10;
    var _TOPFRAME_STICKY_IS_READY_ = false;

    var _turnOff_ = false;
    var _IS_IOS_ = parent.window.navigator.platform.match(/iPhone|iPod|iPad/);
    var _ORINETATION_ = (_IS_IOS_) ? parent.window.orientation : parent.screen.orientation.angle;

    var _TOPFRAME_STICKY_CUSTOM_STYLE_ = document.createElement("style");

    if (kly.gtm.subCategory.toLowerCase() == 'culinary') {
        document.addEventListener("DOMContentLoaded", _INIT_STICKY_TOPFRAME_);
    }

    function _INIT_STICKY_TOPFRAME_() {
        _PARENT_BODY_ = document.querySelector("body");
        _PARENT_BODY_TARGET_ = document.querySelector(".wrapper");
        _TOPFRAME_PARENT_WRAPPER_ = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
        _TOPFRAME_WRAPPER_ = document.querySelector("#div-gpt-ad-topfrm-parallax-wrapper");
        _PARENT_BODY_TARGET_.style = '';
        document.addEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
        _TOPFRAME_STICKY_STYLE_();
        _TOPFRAME_STICKY_TWEAK_();
         _TOPFRAME_STICKY_IS_READY_ = true;

    }

    window.addEventListener("orientationchange", _ORIENTATION_CHANGE_);

    function _ORIENTATION_CHANGE_ () {
        _ORINETATION_ = (_IS_IOS_) ? window.orientation : screen.orientation.angle;
        if (_ORINETATION_ == 0) {
            return;
        }
        _turnOff_ = true;
        _UNSET_TOPFRAME_STICKY_();
    }


    function _TOPFRAME_STICKY_SCROLL_() {
        var _scrolltop_ = document.documentElement.scrollTop;
        if (_scrolltop_ >=0 && !_TOPFRAME_STICKY_) {
            _TOPFRAME_STICKY_ = true;
            _TOPFRAME_PARENT_WRAPPER_.classList.add("sticky");
            _TOPFRAME_WRAPPER_.classList.add("sticky");

            _TOPFRAME_STICKY_COUNTDOWN_(7);
            document.removeEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
            _PARENT_BODY_TARGET_.classList.add("topframe_is_sticky");
            document.querySelectorAll('.topframe_is_sticky').moveIt();
        }
    }

    function _UNSET_TOPFRAME_STICKY_() {
        document.removeEventListener("scroll", _TOPFRAME_STICKY_SCROLL_);
        _TOPFRAME_STICKY_END_ = true;
        _TOPFRAME_STICKY_CUSTOM_STYLE_.remove();
        if(_TOPFRAME_PARENT_WRAPPER_ !== null) {
            _TOPFRAME_PARENT_WRAPPER_.classList.remove("sticky");
        }
        if(_TOPFRAME_WRAPPER_ !== null) {
          _TOPFRAME_WRAPPER_.classList.remove("sticky");
        }

        _PARENT_BODY_TARGET_.classList.remove("topframe_is_sticky");

        setTimeout(function () {
            document.querySelector("body").style = '';
            _PARENT_BODY_TARGET_.style = '';
            if(_TOPFRAME_PARENT_WRAPPER_ !== null) {
                _TOPFRAME_PARENT_WRAPPER_.style = ''; 
            }
            document.documentElement.scrollTo(0,_TOPFRAME_STICKY_LAST_SCROLL_END_);
        }, 200);
    }

    function _TOPFRAME_STICKY_COUNTDOWN_(_time_) {
        _TOPFRAME_STICKY_LAST_SCROLL_ = document.documentElement.scrollTop;
        var _target_ = document.querySelector(".topframe-sticky-counter");
        var countdown = setInterval(function () {

            _target_.textContent = 'Penawaran sponsor berakhir setelah ('+_time_+')';
            if (_time_ <= 0 || _turnOff_) {
                _TOPFRAME_PARENT_WRAPPER_.style.top = '-100vh';
                _TOPFRAME_PARENT_WRAPPER_.style.transition = 'top .5s ease';

                setTimeout(function () {
                    _UNSET_TOPFRAME_STICKY_();
                }, 700);
                clearInterval(countdown);
                _target_.remove();
            }
            _time_ --;
        }, 1000);

    }

    function checkScrollDirectionIsUp(event) {
        if (event.wheelDelta) {
            return event.wheelDelta > 0;
        }
        return event.deltaY < 0;
    }

    Object.prototype.moveIt = function(){
        if (_TOPFRAME_STICKY_END_) {
            return;
        }
        var instances = [];

        this.forEach(function(el){
            instances.push(new moveItItem(el));
        });

        window.addEventListener('scroll', function(){
            if (!_TOPFRAME_STICKY_END_) {
                var scrollTop = document.documentElement.scrollTop;
                instances.forEach(function(inst){
                    inst.update(scrollTop);
                });
            }
        }, {passive: true});
    };
    

    var moveItItem = function(el){
        this.el = el;
        this.speed = parseInt(_TOPFRAME_STICKY_SCROLL_SPEED_);
    };

    moveItItem.prototype.update = function(scrollTop){
        _TOPFRAME_STICKY_LAST_SCROLL_END_ = _TOPFRAME_STICKY_LAST_SCROLL_ + ( scrollTop / (this.speed / 4));
        this.el.style.transform = 'translateY(' + -( _TOPFRAME_STICKY_LAST_SCROLL_END_ ) + 'px)';
    };

    function _TOPFRAME_STICKY_STYLE_() {
        var _P_ = document.createElement("p");
        _P_.classList.add("topframe-sticky-counter");
        _P_.textContent = "Penawaran sponsor berakhir setelah (7)";
        _TOPFRAME_PARENT_WRAPPER_.appendChild(_P_)
        var _H_ = document.querySelector("body").clientHeight;
        _TOPFRAME_STICKY_CUSTOM_STYLE_.textContent = 'body{height: '+(_H_ * 20 )+'px;scroll-behavior: smooth;width : 100vw} .topframe_is_sticky::before {content: "";position: relative;height: 110.41666666666667vw !important;display: block;} .topframe_is_sticky{position:fixed ; top : 0px; left:0px;transition: all 1s ease; width: 100vw;} .layout__ads{ transition: all 1s ease; } .topframe-sticky-counter {display : none;} .layout__ads.sticky { position: fixed; z-index: 99; height: calc(100vw *(267 / 414) + 25px ); } #div-gpt-ad-topfrm-parallax-wrapper.sticky::after , #div-gpt-ad-topfrm-parallax-wrapper.sticky::before { position: absolute; height: 25px; width: 100vw; left: 0; } #div-gpt-ad-topfrm-parallax-wrapper.sticky::after { content: ""; top: calc(100vw *(267 / 414) ); background: #0072FF; z-index: 100; animation: progress-bar 7s forwards linear; } #div-gpt-ad-topfrm-parallax-wrapper.sticky::before { content: ""; top: calc(100vw *(267 / 414) ); background: #212121; z-index: 99; } .sticky .topframe-sticky-counter { display : block; top: calc((100vw *(267 / 414) ) + 8px); color : #fff; line-height : 14px; z-index: 101; -webkit-animation: webkit-progress-count 7s forwards linear; animation: progress-count 7s forwards linear; width: 100%; margin: 0px; position: absolute; text-align: center; font-family: sans-serif; } div#div-gpt-ad-topfrm-parallax-wrapper, div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-dream-topfrm-oop iframe { transition: all .3s ease; } div#div-gpt-ad-topfrm-parallax-wrapper.sticky { height: calc(100vw *(267 / 414)) !important; position: fixed !important; top: 0px; z-index : 9; } div#div-gpt-ad-topfrm-parallax-wrapper.sticky #div-gpt-ad-dream-topfrm-oop iframe { transform: scale(.55); top: calc((-110.41666666666667vw * .42) / 2) !important; } @keyframes progress-bar{ from {width: 0px;} to{width: 100vw;} }';
        _PARENT_BODY_TARGET_.appendChild(_TOPFRAME_STICKY_CUSTOM_STYLE_);

    }

    function _TOPFRAME_STICKY_TWEAK_() {
        var _WRAPPER_DREAM_ = document.querySelector(".wrapper");
        _WRAPPER_DREAM_.insertBefore(document.querySelector(".header"), _WRAPPER_DREAM_.querySelector(".container"));
    }
