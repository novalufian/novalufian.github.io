/*disablescroll*/
var disableBodyScroll = (function() {
  var _selector = !1,
      _element = !1,
      _clientY;
  if (!Element.prototype.matches) Element.prototype.matches = Element.prototype.msMatchesSelector || Element.prototype.webkitMatchesSelector;
  if (!Element.prototype.closest) Element.prototype.closest = function(s) {
    var ancestor = this;
    if (!document.documentElement.contains(el)) return null;
    do {
      if (ancestor.matches(s)) return ancestor;
      ancestor = ancestor.parentElement;
    } while (ancestor !== null);
    return el;
  };
  var preventBodyScroll = function(event) {
    if (!1 === _element || !event.target.closest(_selector)) {
      event.preventDefault();
    }
  };
  var captureClientY = function(event) {
    if (event.targetTouches.length === 1) {
      _clientY = event.targetTouches[0].clientY;
    }
  };
  var preventOverscroll = function(event) {
    if (event.targetTouches.length !== 1) {
      return
    }
    var clientY = event.targetTouches[0].clientY - _clientY;
    if (_element.scrollTop === 0 && clientY > 0) {
      event.preventDefault();
    }
    if ((_element.scrollHeight - _element.scrollTop <= _element.clientHeight) && clientY < 0) {
      event.preventDefault();
    }
  };
  return function(allow, selector) {
    if (typeof selector !== "undefined") {
      _selector = selector;
      _element = document.querySelector(selector);
    }
    if (!0 === allow) {
      if (!1 !== _element) {
        _element.addEventListener('touchstart', captureClientY, !1);
        _element.addEventListener('touchmove', preventOverscroll, !1);
      }
      document.body.addEventListener("touchmove", preventBodyScroll, !1);
    } else {
      if (!1 !== _element) {
        _element.removeEventListener('touchstart', captureClientY, !1);
        _element.removeEventListener('touchmove', preventOverscroll, !1);
      }
      document.body.removeEventListener("touchmove", preventBodyScroll, !1);
    }
  }
});
//*call javascript
// $('html, body').css('overflow', '') disableBodyScroll(false, '');
$(function() {
  $('.pull-right.btn-main-menu').click(function() {
    $(this).toggleClass('collapsed');
    if ($(this).hasClass('collapsed')) {
      $('html').removeClass('overflow');
      $('.navbar-menu').removeClass('open');
    } else {
      $('html').addClass('overflow');
      $('.navbar-menu').addClass('open');
      disableBodyScroll(true, '.navbar-menu .navbar-nav');
    }
  });
  $('.pull-left.btn-search').click(function() {
    $(this).toggleClass('collapsed');
    if ($('.navbar-search').hasClass('collapse')) {
      $($('.navbar-search').removeClass('collapse'));
    } else {
      $('.navbar-search').addClass('collapse');
    }
  });
  $('.navbar-menu--header-close').click(function(e) {
    e.preventDefault();
    $('html').removeClass('overflow');
    $('.btn-main-menu.pull-right').trigger('click');
  });
});