/* AIエンジニア募集ページ（100年後版）だけの動き（2026年10月3日）
   - 既存の矢印（↗ ↓ ↑）に印を付け、ホバーで抜けて戻る動きにする
   - 右下（スマホは下）に「正社員／インターン」の入口カード。ファーストビューを過ぎたら出し、問い合わせ欄では引っ込める
   - スクロールで一度だけふわっと表示 */
(function () {
  var html = document.documentElement;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var KIND = { '↗': 'ai-g-ne', '↓': 'ai-g-down', '↑': 'ai-g-up' };

  document.querySelectorAll('a>span[aria-hidden="true"], summary>span[aria-hidden="true"]').forEach(function (s) {
    var k = KIND[s.textContent.trim()];
    if (k) s.classList.add('ai-g', k);
  });

  // 入口カード（nav 要素にするとヘッダー用の nav 指定に巻き込まれるので div）
  var box = document.createElement('div');
  box.className = 'ai-entry';
  box.setAttribute('role', 'navigation');
  box.setAttribute('aria-label', '応募・お問い合わせの入り口');
  box.innerHTML =
    '<a href="#contact-fulltime"><span class="ai-entry-thumb"><img src="assets/entry-fulltime.webp" alt="" width="120" height="64" loading="lazy"></span>' +
    '<span class="ai-entry-label"><b>FULL-TIME</b><small><span class="ai-pc">正社員で問い合わせる</span><span class="ai-sp">正社員で相談</span></small></span><span class="ai-g ai-g-down" aria-hidden="true">↓</span></a>' +
    '<a href="#contact-intern"><span class="ai-entry-thumb"><img src="assets/entry-intern.webp" alt="" width="120" height="64" loading="lazy"></span>' +
    '<span class="ai-entry-label"><b>INTERNSHIP</b><small><span class="ai-pc">インターンで問い合わせる</span><span class="ai-sp">インターンで相談</span></small></span><span class="ai-g ai-g-down" aria-hidden="true">↓</span></a>';
  document.body.appendChild(box);

  var hero = document.querySelector('.hero');
  var contact = document.querySelector('#contact');
  var heroIn = true, contactIn = false;
  function update() { box.classList.toggle('is-visible', !heroIn && !contactIn); }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (es) { heroIn = es[0].isIntersecting; update(); }, { threshold: 0.05 }).observe(hero);
    if (contact) new IntersectionObserver(function (es) { contactIn = es[0].isIntersecting; update(); }, { threshold: 0 }).observe(contact);
  } else {
    heroIn = false; update();
  }

  // スクロールで表示
  if (reduce || !('IntersectionObserver' in window)) { html.classList.remove('ai-anim'); window.__aiReady = true; return; }
  var groups = [
    '.chapter', '.message-grid>h2', '.prose>p', '.statement .shell>*', '.section-top>*', '.everyday-grid>article',
    '.everyday-close', '.business-row>article', '.systems-note', '.role-intro', '.role-grid>.role', '.leaders',
    '.now-grid>div:first-child>*', '.opportunities>article', '.now-note', '.you>*', '.gym-evidence-heading>*',
    '.gym-evidence-grid figure', '.gym-evidence-copy>*', '.ai-recruit>h2', '.ai-recruit-list>div', '.ai-recruit-entry',
    '#contact .cf-inner>*:not(.cf-panel)', '.final-call .shell>*'
  ];
  var targets = [];
  groups.forEach(function (sel) {
    var last = null, i = 0;
    document.querySelectorAll(sel).forEach(function (el) {
      if (el.closest('.hero') || el.hasAttribute('data-ai-r')) return;
      i = el.parentElement === last ? i + 1 : 0;
      last = el.parentElement;
      el.setAttribute('data-ai-r', '');
      el.style.setProperty('--ai-d', Math.min(i * 0.08, 0.4) + 's');
      targets.push(el);
    });
  });
  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  targets.forEach(function (el) { io.observe(el); });
  window.__aiReady = true;
})();
