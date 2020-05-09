<?php $page = "home"; ?>
<?php include('inc_header.php');?>
<!-- middle -->
<div id="middle-content" class="homePage">
  <section id="mainBanner" class="section">
    <div id="weather_banner" class="bannerBig">
      <div class="temp_text">
        <h3 class="weather-temperature">0 &#x2103;</h3>
        <span><?php echo date("l\, jS F Y") . "<br>"; ?></span>
      </div><!--end.temp_text-->

      <p id="demo" style="display: none;"></p>
      <div class="place_text">
        <span>Selamat datang di,</span>
        <h3>Angkasa Pura II Free Wifi.</h3>
      </div>
    </div><!--end.bannerBig-->
  </section>
  <section id="list_tenant" class="section">
    <div class="wrapper">
      <div class="content_tenant">
        <div class="list_icon">
          <div class="item_icon">
            <a href="https://www.liputan6.com/">
            <img src="images/lip6.png">
            </a>
          </div><!--end.item_icon-->
          <div class="item_icon">
            <a href="https://www.kapanlagi.com/">
            <img src="images/kapanlagi@2x.png">
          </a>
          </div><!--end.item_icon-->
          <div class="item_icon">
            <a href="https://www.fimela.com/">
            <img src="images/fimela@2x.png">
          </a>
          </div><!--end.item_icon-->
          <div class="item_icon">
            <a href="https://www.bola.com/">
            <img src="images/bolacom.png">
          </a>
          </div><!--end.item_icon-->
          <div class="item_icon">
            <a href="https://www.bola.net/">
            <img src="images/bolanet.png">
          </a>
          </div><!--end.item_icon-->
          <div class="item_icon">
            <a href="https://www.brilio.net/">
            <img src="images/brillio.png">
          </a>
          </div><!--end.item_icon-->
          <div class="item_icon">
            <a href="https://www.dream.co.id/">
            <img src="images/dream.png">
          </a>
          </div><!--end.item_icon-->
          <div class="item_icon">
            <a href="https://www.famous.id/">
            <img src="images/famous.png">
          </a>
          </div><!--end.item_icon-->
          <div class="item_icon">
            <a href="https://www.merdeka.com/">
            <img src="images/merdeka.png">
          </a>
          </div><!--end.item_icon-->
          <div class="item_icon">
            <a href="https://www.otosia.com/">
            <img src="images/otosia.png">
          </a>
          </div><!--end.item_icon-->
        </div>
      </div><!--end.content_tenant-->
    </div><!--end,wrapper-->
  </section>
  <section id="main_content" class="section">
    <div class="wrapper">
      <div class="bride_text">
        <h3>Kamu Sudah Tau Belum?</h3>
        <p>Fakta menarik yang harus kamu tau sebelum liburan, Yuk simak disini!</p>
      </div><!--end.bride_text-->

      <div id="list-newsnya" class="list_news relative">
        <div class="loader_gif" style="display: block;">
          <div class="loadingnya">
            <div class="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
          </div>
        </div>
      </div><!--end.list_news-->
      <div id="paging" data-url="">
      </div>
      <div class="loadCenter text-center" style="display: none;">
        <div class="lds-facebook"><div></div><div></div><div></div></div>
      </div>
    </div><!--end.wrapper-->
  </section>


  
</div>
<script src="js/js_lib.js"></script>
<script src="js/js_run.js"></script>
<script type="text/javascript">
  loadAPI();
  changeBanner();
  setTimeout(function(){
    getLocation();
  }, 1000);
  

  /*$(document).ready(function(){
    $('#content-article_list').infinitescroll({
      navSelector: "#next:last",
      nextSelector: "#next:last",
      itemSelector: "#content-article_list",
      debug: true,
      dataType: 'html',
      loadOnScroll: false,
      scrollThreshold:false,
       button: '.view-more-button',
      path: function(index) {
        return "article" + index + ".html";
      }
      }, function(newElements, data, url){
      });
  });*/
</script>
<?php include('inc_footer.php');?>