const _KLY_NIELSEN_TRACKER = [];
const _COOKIE_LIFE_TIME = 90;

_dummyNielsenTrakcer();
_klySettingupNielsen();

function _klySettingupNielsen() {
	// get visitor id
	var _visitor = (parseInt(_klyGetCookie("visitor_id"))) ? parseInt(_klyGetCookie("visitor_id")) : ""; 
	// get nielsen tracker id
	var _nielsen = (parseInt( _klyGetCookie("KLY_Nielsen"))) ? parseInt( _klyGetCookie("KLY_Nielsen")) : ""; 

	//checking nielsen tracker value
	if (_nielsen) {
		// update cookie 
		_klySetCookie("KLY_Nielsen",_nielsen ,_COOKIE_LIFE_TIME);
		//inject tracker pixel
		_klyCreateNielsenTracker(_nielsen, _visitor);

	}else{

		// get random nilesen tracker
		var new_nielsen =  _KLY_NIELSEN_TRACKER[Math.floor(Math.random() * 100) + 1];
		//create cookie
		_klySetCookie("KLY_Nielsen", new_nielsen, _COOKIE_LIFE_TIME);
		//inject tracker pixel
		_klyCreateNielsenTracker(new_nielsen, _visitor);

	}
}

function _klyGetCookie(name) {

	var nameEQ = name + "=";
	var ca = document.cookie.split(';');
	
	for(var i=0;i < ca.length;i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1,c.length);
		if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
	}

	return null;
}

function _klySetCookie(name, value, days) {

	var expires = "";
	
	if (days) {
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000));
		expires = "; expires=" + date.toUTCString();
	}
	
	document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

function _klyCreateNielsenTracker(tracking_pixel_id , visitor_id ) {

	var _tracker = `https://secure-gl.imrworldwide.com/cgi-bin/m?ca=nlsn${tracking_pixel_id}&cr=crtve&ce=liputan6&pc=${visitor_id}&ci=nlsnci1588&am=3&at=view&rt=banner&st=image&r={timestamp}`;
	var _img = document.createElement("img");
	_img.setAttribute("src", _tracker);
	_img.setAttribute("style", "display:none;");
	document.body.appendChild(_img);

}

function _dummyNielsenTrakcer() {
	for(var k = 0; k < 100; k++){
		var _random =  Math.floor(100000 + Math.random() * 900000);
		_KLY_NIELSEN_TRACKER.push(_random);
	}
}
