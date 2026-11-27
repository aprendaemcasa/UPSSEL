/* Configuração dos links — troque aqui se mudar o checkout */
var CHECKOUT = {
  upsell: { url: "https://pay.cakto.com.br/rkxs8ph", value: 19.9 },
  downsell: { url: "https://pay.cakto.com.br/j3vubdv_1336785", value: 14.9 }
};
var PIXEL_ID = "1573290757137188";

/* Meta Pixel */
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init', PIXEL_ID);
fbq('track', 'PageView');

(function () {
  var offer = document.body.getAttribute("data-offer");
  var cfg = CHECKOUT[offer];
  var qs = window.location.search.replace(/^\?/, "");

  function withParams(href) {
    if (!qs) return href;
    return href + (href.indexOf("?") > -1 ? "&" : "?") + qs;
  }

  // Links de checkout recebem os UTMs da URL (UTMify)
  document.querySelectorAll("[data-buy]").forEach(function (a) {
    if (cfg) a.href = withParams(cfg.url);
    a.addEventListener("click", function () {
      if (cfg) fbq("track", "InitiateCheckout", { value: cfg.value, currency: "BRL", content_name: "kitmega-" + offer });
    });
  });
  // Links internos (recusar) mantêm os UTMs
  document.querySelectorAll("[data-keep]").forEach(function (a) {
    a.href = withParams(a.getAttribute("href"));
  });

  if (cfg) fbq("track", "ViewContent", { value: cfg.value, currency: "BRL", content_name: "kitmega-" + offer });

  // Contador de 10 minutos (reinicia por sessão; só reforça que a oferta é desta página)
  var el = document.querySelectorAll(".timer");
  if (el.length) {
    var key = "kt_" + offer, end;
    try { end = +sessionStorage.getItem(key); } catch (e) {}
    if (!end || end < Date.now()) {
      end = Date.now() + 10 * 60 * 1000;
      try { sessionStorage.setItem(key, end); } catch (e) {}
    }
    var tick = function () {
      var s = Math.max(0, Math.round((end - Date.now()) / 1000));
      var t = String(Math.floor(s / 60)).padStart(2, "0") + ":" + String(s % 60).padStart(2, "0");
      el.forEach(function (n) { n.textContent = t; });
    };
    tick(); setInterval(tick, 1000);
  }

  // Barra fixa aparece depois do primeiro botão
  var sticky = document.querySelector(".sticky");
  var first = document.querySelector(".hero .btn");
  if (sticky && first && "IntersectionObserver" in window) {
    new IntersectionObserver(function (e) {
      sticky.classList.toggle("show", !e[0].isIntersecting && e[0].boundingClientRect.top < 0);
    }).observe(first);
  }
})();
