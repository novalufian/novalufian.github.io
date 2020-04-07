$( document ).ready(function() {
	
	var no = 1; 
	
	$.getJSON("http://api.merdeka.com/native-video/otosia/v4", function( data ) {
		$.each(data,function(k, v) {
			v = v[0];
			var url = v.video_url;
			url = url.replace("&el=&","&el=&muted=1&");
			url = url.replace("utm_source=otosia.com","utm_source=otosia.com-mobile");
			
			var el = $("#video-slot-"+no+"");
			var title =  $("<div></div>").addClass("video-title").html(v.video_title);
			var video =  $("<div></div>")
						.addClass("videoWrapper skrin-embed")
						.attr({
							"src": url,
							"data-debug":"true",
							"data-lazy":"true",
							});
			
			if(el.attr("data-src") === "Homepage"){
				el.append(title);
				el.append($("<div></div>").attr("class", "videoWrapper skrin-embed")
					.append($("<iframe></iframe>")
						  .attr("class", "native-video")
						  .attr("src", url)
						  .attr("style", "border:none;")
						  )
					);
			}else{
				/*el.append(title);
				el.append(video);*/
			}
			no ++;
		});
	});	
});