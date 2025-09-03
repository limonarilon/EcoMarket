(function($) {
  "use strict";

  var initPreloader = function() {
    $(document).ready(function() {
      $('body').addClass('preloader-site');

      // Ocultar preloader tras 3 segundos si no se carga todo
      setTimeout(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
      }, 3000);
    });

    $(window).on('load', function() {
      $('.preloader-wrapper').fadeOut();
      $('body').removeClass('preloader-site');
    });
  }

  var initChocolat = function() {
    if (typeof Chocolat !== 'undefined') {
      Chocolat(document.querySelectorAll('.image-link'), {
        imageSize: 'contain',
        loop: true,
      });
    }
  }

  var initSwiper = function() {
    if (typeof Swiper !== 'undefined') {
      new Swiper(".main-swiper", {
        speed: 500,
        pagination: { el: ".swiper-pagination", clickable: true },
      });

      new Swiper(".category-carousel", {
        slidesPerView: 6,
        spaceBetween: 30,
        speed: 500,
        navigation: { nextEl: ".category-carousel-next", prevEl: ".category-carousel-prev" },
        breakpoints: { 0:{slidesPerView:2},768:{slidesPerView:3},991:{slidesPerView:4},1500:{slidesPerView:6} }
      });

      new Swiper(".brand-carousel", {
        slidesPerView: 4,
        spaceBetween: 30,
        speed: 500,
        navigation: { nextEl: ".brand-carousel-next", prevEl: ".brand-carousel-prev" },
        breakpoints: { 0:{slidesPerView:2},768:{slidesPerView:2},991:{slidesPerView:3},1500:{slidesPerView:4} }
      });

      new Swiper(".products-carousel", {
        slidesPerView: 5,
        spaceBetween: 30,
        speed: 500,
        navigation: { nextEl: ".products-carousel-next", prevEl: ".products-carousel-prev" },
        breakpoints: { 0:{slidesPerView:1},768:{slidesPerView:3},991:{slidesPerView:4},1500:{slidesPerView:6} }
      });
    }
  }

  var initProductQty = function(){
    $('.product-qty').each(function(){
      var $el = $(this);
      $el.find('.quantity-right-plus').click(function(e){
        e.preventDefault();
        var qty = parseInt($el.find('#quantity').val());
        $el.find('#quantity').val(qty + 1);
      });
      $el.find('.quantity-left-minus').click(function(e){
        e.preventDefault();
        var qty = parseInt($el.find('#quantity').val());
        if(qty>0){ $el.find('#quantity').val(qty - 1); }
      });
    });
  }

  var initJarallax = function() {
    if (typeof jarallax !== 'undefined') {
      jarallax(document.querySelectorAll(".jarallax"));
      jarallax(document.querySelectorAll(".jarallax-keep-img"), { keepImg: true });
    }
  }

  $(document).ready(function() {
    initPreloader();
    initSwiper();
    initProductQty();
    initJarallax();
    initChocolat();

    // Modal al enviar formulario de registro
    $('#registroForm').on('submit', function(e) {
      e.preventDefault();
      var modal = new bootstrap.Modal(document.getElementById('modalEnvio'));
      modal.show();
      // Opcional: resetear formulario
      this.reset();
    });
  });

})(jQuery);
