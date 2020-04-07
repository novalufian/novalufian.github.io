function doXhr(url,params,cb){
      var xhr=new XMLHttpRequest();
      xhr.onreadystatechange=function(){
        if(xhr.readyState===4){
          console.log(xhr.response);
          cb(xhr.response);
          return xhr.response;
        }
      };
      xhr.open('POST',url);
      xhr.setRequestHeader('Content-Type','text/plain');
      xhr.send(JSON.stringify(params));
    }
    (function(){
      doXhr('https://app.otosia.com/api/breakingnews',{},function(str){
        var data=JSON.parse(str);
        if (!data.error) {
          var bar='<div class="motosia-breaking-news-bar-v2">'+
                      '<div class="title-breaking-news">'+
                          '<span class="title-breaking-news-icon-warn">&nbsp;</span>'+
                          '<h1>BREAKING NEWS</h1>'+
                      '</div>'+
                      '<div class="breaking-news-content">'+
                          '<a href="'+data.url+'" target="_blank" title="'+data.title+'">'+data.title+'</a>'+
                      '</div>'+
                  '</div>';
            var el =document.getElementById('breaking-place');
            el.innerHTML = bar;
        }
        });
      }());
	 