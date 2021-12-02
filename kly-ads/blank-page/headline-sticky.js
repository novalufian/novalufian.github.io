/* ============ HEADLINE STICKY - DEFAULT 3s ============ */
            var stickyDuration = (kmklabs.gtm.subCategory === "citizen6") ? 7 : (kmklabs.gtm.subCategory === "news") ? 8 : (kmklabs.gtm.subCategory === "health") ? 9 : 6;
            var headlineStickyInterval = stickyDuration,
		    headlineStickyStatus = !1,
		    headlineStickyPaused = !1;
		    headlineStickyCounterStatus = !1;

		function headlineSticky(t) {
		    null != t && (headlineStickyInterval = t);
		    var e = document.getElementById("div-gpt-ad-liputan6-hl"),
		        n = document.createElement("div");
		    n.setAttribute("id", "div-gpt-ad-liputan6-hl-shadow"), 
		    e.parentElement.insertBefore(n, e), 
		    console.log(headlineStickyInterval), 
		    injectStickyStyleAndAnimation(), 
		    window.addEventListener("scroll", headlineStickyScrollEevent)
		}

		function headlineStickyScrollEevent() {
		    var t = document.getElementById("div-gpt-ad-liputan6-hl").firstElementChild,
		        e = document.getElementById("div-gpt-ad-liputan6-hl-shadow").getBoundingClientRect().top,
		        n = document.querySelector(".layout__nav-content");
		    document.documentElement.scrollTop || document.body.scrollTop;
		    if ( headlineStickyStatus){
				if (e <= 0){
					if (n.classList.contains("layout__nav-content--no-hanging")){
						t.classList.remove("hl-navbar-hanging");
					}else {
						t.classList.add("hl-navbar-hanging");
					};
		    			headlineStickyPaused = !1;

				}else {
					// removeStickyHeadline(t, !1);
					t.classList.remove("hl-active-sticky");
					t.classList.remove("hl-navbar-hanging");
					t.style.margin = "10px 0";
					headlineStickyPaused = !0;
					headlineStickyStatus = !1;
				};
			}else {
				console.log('else', e)
				if (e <= 0) {
					t.classList.add("hl-active-sticky");
					if (!headlineStickyCounterStatus) {
						headlineStickyCounterStatus = !0;
						removeStickyHeadline(t, !1);
					}
					headlineStickyStatus = !0;
					// setTimeout(function () {
					// 	// t.style = "";
					// }, 500)
				}
			}
		}

		function removeStickyHeadline(t, e) {
			console.log('remove')
		    	var n = setInterval(function() {
			    	console.log(headlineStickyInterval)
			    	if (!headlineStickyPaused) {
			    		if (headlineStickyInterval <= 0){
						t.classList.remove("hl-active-sticky");
						t.classList.remove("hl-navbar-hanging");
						t.style.margin = "10px 0";
						clearInterval(n);
						window.removeEventListener("scroll", headlineStickyScrollEevent);
					}else {
						headlineStickyInterval--;
					}
			    	}
			    }, 1000);

			    if (!headlineStickyPaused) {
			    	if (e) {
			    		clearInterval(n);
			    		t.classList.remove("hl-active-sticky");
			    		t.classList.remove("hl-navbar-hanging");
			    	}
			    }
		}

		function injectStickyStyleAndAnimation() {
		    var t = document.createElement("style");
		    t.textContent = "\n\t\t.hl-active-sticky {\n\t\t\tposition: fixed;\n\t\t\ttop: -100%;\n\t\t\tz-index: 9999;\n\t\t\tleft: 50%;\n\t\t\ttransform: translateX(-50%);\n\t\t\tmargin: 0;\n\t\t\ttransition : margin-top .5s ease;\n\t\t\tanimation: hlSlideDown .5s forwards;\n\t\t}\n\n\t\t.hl-navbar-hanging{\n\t\t\tmargin-top : 50px !important;\n\t\t}\n\n\t\t@keyframes hlSlideDown{\n\t\t\t0%{top : -100px;}\n\t\t\t100%{top : 0px;}\n\t\t}\n\t\t.headline_ad__box {display: flex;justify-content: center;align-items: center;}", document.head.appendChild(t)
		}
            /* ============ HEADLINE STICKY - DEFAULT 3s ============ */
