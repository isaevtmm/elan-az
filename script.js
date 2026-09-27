/* elan.az — front-end davranışları (backend yoxdur) */
(function () {
  /* 1) Karusel oxları: "Yaşayış kompleksləri" və "Agentliklər" sıraları 1300px-dən aşağı üfüqi sürüşür.
        Desktop-da sıra tam yerləşdiyi üçün oxlar heç nə etmir (dizayndakı kimi). */
  var GAP = 16;
  document.querySelectorAll('.block').forEach(function (block) {
    var row = block.querySelector('.cards--scroll');
    var prev = block.querySelector('.arrow--prev');
    var next = block.querySelector('.arrow--next');
    if (!row || !prev || !next) return;
    function step() {
      var card = row.querySelector('.card');
      return card ? card.getBoundingClientRect().width + GAP : 300;
    }
    function update() {
      var scrollable = row.scrollWidth > row.clientWidth + 1;
      var max = row.scrollWidth - row.clientWidth - 1;
      prev.disabled = scrollable && row.scrollLeft <= 0;
      next.disabled = scrollable && row.scrollLeft >= max;
    }
    prev.addEventListener('click', function () { row.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { row.scrollBy({ left: step(), behavior: 'smooth' }); });
    row.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  });

  /* 2) Yan menyu (burger) — 950px-dən aşağı header linkləri, alət ikonları və profil burada açılır */
  var drawer = document.getElementById('drawer');
  var burger = document.querySelector('.burger');
  if (drawer && burger) {
    function setOpen(open) {
      drawer.classList.toggle('is-open', open);
      document.body.classList.toggle('drawer-open', open);
      drawer.setAttribute('aria-hidden', String(!open));
      burger.setAttribute('aria-expanded', String(open));
    }
    burger.addEventListener('click', function () { setOpen(!drawer.classList.contains('is-open')); });
    drawer.querySelectorAll('[data-drawer-close]').forEach(function (el) {
      el.addEventListener('click', function () { setOpen(false); });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') setOpen(false); });
    var mq = window.matchMedia('(min-width: 950px)');
    (mq.addEventListener ? mq.addEventListener('change', onChange) : mq.addListener(onChange));
    function onChange(m) { if (m.matches) setOpen(false); }
  }
})();
