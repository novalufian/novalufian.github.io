var urlApi = "https://www.newshub.id/api/interactive-content/1397/&token=2d71b23259a858ffb8c3da2713f70512&0.978678434852559 ";


function loadAPI(){
	$.ajax({
	  url: urlApi,
	  dataType: 'json',
	  timeout:15000,
	  beforeSend: function (XMLHttpRequest) {
		  	

		},

	  success: function(object) {

	  	var quiz = $(object.question);
	  	console.log(quiz);

	  	var _str = "";
	  	//quiz.sort(function(a, b){return 0.5 - Math.random()});

		$.each(quiz, function(i, k){
			var x=i+1;
			var y=x+1;

			_str=_str+'<li class="pane'+x+'">';
              _str=_str+'<h4>'+k.text+'</h4>';
              _str=_str+'<div class="img" style="background: url('+k.media+') no-repeat scroll center center;background-size:cover;"></div>';
              _str=_str+'<p>Lorem Ipsum has been the industrys standard dummy text ever since the 1500s.</p>';
              _str=_str+'<div class="like"></div>';
              _str=_str+'<div class="dislike"></div>';
          _str=_str+'</li>';
		});

		$('#list-kuisnya').html(_str);
		tinderJ();
		$("#info_overlay").show();
	    setTimeout(function(){
	      $("#info_overlay").fadeOut('slow')
	    }, 3000);
	  },
	  error: function () {
	    $('#list-kuisnya').hide();
	    $("#timer").hide();
	    $('.failed-load').show();
	  }
	});
}

function loadResult(){

	console.log('masuk');
	$.ajax({
	  url: urlApi,
	  dataType: 'json',
	  beforeSend: function (XMLHttpRequest){
	  	$("#swiper_step2").hide();
		$('.halBefore-kuis').show();

		},
	  success: function(object) {
	  	var results = $(object.result);
	  	console.log(results[0].photo);

	  	$("#result_images").attr("src", results[0].photo);
	  	$("#mainTitleResult").html(results[0].title);
	  	$('.halBefore-kuis').hide();
		
		$("#swiper_step3").fadeIn();
	  }
	});
}

function tinderJ(){
	$("#tinderslide").jTinder({
		// dislike callback
	    onDislike: function (item) {
	        $('#status').html((item.index()+1));
	        var itemStats = (item.index()+1);
	        if(itemStats == 1){
	        	setTimeout(function(){
					loadResult();
			    }, 1000);
	        }
	    },
		// like callback
	    onLike: function (item) {
	        $('#status').html((item.index()+1));
	        var itemStats = (item.index()+1);
	        if(itemStats == 1){
	        	setTimeout(function(){
					loadResult();
			    }, 1000);
	        }
	    },
		animationRevertSpeed: 200,
		animationSpeed: 400,
		threshold: 1,
		likeSelector: '.like',
		dislikeSelector: '.dislike'
	});

	/**
	 * Set button action to trigger jTinder like & dislike.
	 */
	$('.actions .like, .actions .dislike').click(function(e){
		e.preventDefault();
		$("#tinderslide").jTinder($(this).attr('class'));
	});
}

function Validate(event) {
        var regex = new RegExp("^[0-9]");
        var key = String.fromCharCode(event.charCode ? event.which : event.charCode);
        if (!regex.test(key)) {
            event.preventDefault();
            return false;
        }
    } 

