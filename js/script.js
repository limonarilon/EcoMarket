(function($) {
  "use strict";

  var initPreloader = function() {
    $(document).ready(function() {
      $('body').addClass('preloader-site');

      // Ocultar preloader tras 1.5 segundos si no se carga todo
      setTimeout(function() {
        $('.preloader-wrapper').fadeOut();
        $('body').removeClass('preloader-site');
      }, 1500);
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


// --- Carrito funcional EcoMarket ---
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

function actualizarContadores() {
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById("cart-count").textContent = totalItems;
  const badgeMobile = document.getElementById("cart-count-mobile");
  if (badgeMobile) badgeMobile.textContent = totalItems;
  const badgeOffcanvas = document.getElementById("cart-count-offcanvas");
  if (badgeOffcanvas) badgeOffcanvas.textContent = totalItems;
}

function actualizarTotal() {
  const total = carrito.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  document.getElementById("cart-total").textContent = "$" + total.toLocaleString();
  document.getElementById("cart-total-offcanvas").textContent = "$" + total.toLocaleString();
}

function renderCarrito() {
  const ul = document.getElementById("cart-items");
  ul.innerHTML = "";
  if (carrito.length === 0) {
    ul.innerHTML = '<li class="list-group-item text-center text-muted">El carrito está vacío</li>';
    actualizarContadores();
    actualizarTotal();
    return;
  }
  carrito.forEach((item, idx) => {
    const li = document.createElement("li");
    li.className = "list-group-item d-flex justify-content-between align-items-center lh-sm";
    li.innerHTML = `
      <div>
        <h6 class="my-0">${item.nombre}</h6>
        <small class="text-body-secondary">x${item.cantidad}</small>
      </div>
      <div class="d-flex align-items-center gap-2">
        <span class="text-body-secondary">$${(item.precio * item.cantidad).toLocaleString()}</span>
        <button class="btn btn-sm btn-outline-danger btn-remove-item" data-idx="${idx}" title="Quitar"><svg width="16" height="16"><use xlink:href="#trash"></use></svg></button>
      </div>
    `;
    ul.appendChild(li);
  });
  // Quitar producto
  ul.querySelectorAll('.btn-remove-item').forEach(btn => {
    btn.addEventListener('click', function() {
      const idx = parseInt(this.getAttribute('data-idx'));
      carrito.splice(idx, 1);
      guardarCarrito();
      renderCarrito();
    });
  });
  actualizarContadores();
  actualizarTotal();
}

function agregarAlCarritoDesdeBoton(e) {
  e.preventDefault();
  const btn = e.currentTarget;
  const productItem = btn.closest('.product-item');
  if (!productItem) return;
  const nombre = productItem.querySelector('h3')?.textContent?.trim() || 'Producto';
  const precioText = productItem.querySelector('.price')?.textContent?.replace(/[^\d]/g, '') || '0';
  const precio = parseInt(precioText, 10) || 0;
  let cantidad = 1;
  const qtyInput = productItem.querySelector('input[name="quantity"], input#quantity');
  if (qtyInput) {
    cantidad = parseInt(qtyInput.value, 10) || 1;
  }
  // Buscar si ya está en el carrito
  const idx = carrito.findIndex(p => p.nombre === nombre && p.precio === precio);
  if (idx > -1) {
    carrito[idx].cantidad += cantidad;
  } else {
    carrito.push({ nombre, precio, cantidad });
  }
  guardarCarrito();
  renderCarrito();
}

document.addEventListener("DOMContentLoaded", function() {
  // Botones "Agregar al carrito"
  document.querySelectorAll('.nav-link').forEach(btn => {
    if (btn.textContent && btn.textContent.trim().startsWith('Agregar al carrito')) {
      btn.addEventListener('click', agregarAlCarritoDesdeBoton);
    }
  });
  // Render inicial
  renderCarrito();
  // Pagar (demo)
  const btnPagar = document.getElementById('btn-pagar');
  if (btnPagar) {
    btnPagar.addEventListener('click', function() {
      if (carrito.length === 0) {
        alert('El carrito está vacío.');
        return;
      }
      alert('¡Gracias por tu compra! (Demo)');
      carrito = [];
      guardarCarrito();
      renderCarrito();
    });
  }
});


})(jQuery);
