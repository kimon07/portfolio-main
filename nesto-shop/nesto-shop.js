(() => {
  'use strict';
  const $ = (s, r = document) => r.querySelector(s),
    $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = (v) =>
    String(v ?? '').replace(
      /[&<>"']/g,
      (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c],
    );
  const money = (n) => Math.round(n).toLocaleString('ko-KR') + '원';
  const params = new URLSearchParams(location.search),
    page = location.pathname.split('/').pop() || 'index.html';
  const groupNames = {
    all: '전체',
    sofa: '소파',
    chair: '체어',
    table: '테이블',
    bed: '침대',
    storage: '수납',
    light: '조명',
    decor: '홈데코',
  };
  const products = window.NestoCatalog;
  const productById = (id) => products.find((p) => p.id === Number(id));
  let state = {
    likes: [],
    cart: [],
    coupon: false,
    profile: null,
    orders: [],
    questions: [],
    helpful: [],
  };
  try {
    const saved = JSON.parse(localStorage.getItem('nesto-shop-v2') || 'null');
    if (saved && typeof saved === 'object') {
      for (const key of ['likes', 'cart', 'orders', 'questions', 'helpful'])
        if (Array.isArray(saved[key])) state[key] = saved[key];
      state.coupon = saved.coupon === true;
      if (saved.profile && typeof saved.profile.name === 'string')
        state.profile = { name: saved.profile.name };
    }
  } catch {}
  state.likes = state.likes.filter((id) => productById(id));
  state.cart = state.cart.filter(
    (row) =>
      row &&
      productById(row.id) &&
      Number.isInteger(row.qty) &&
      row.qty > 0 &&
      row.qty <= 99 &&
      typeof row.color === 'string',
  );
  const save = () => {
    try {
      localStorage.setItem('nesto-shop-v2', JSON.stringify(state));
    } catch {}
  };
  const photo = (asset, label, extra = '') => {
    if (asset && typeof asset === 'object') {
      const [x, y, width, height] = asset.crop;
      return (
        '<div class="n-photo n-photo-crop ' +
        esc(extra) +
        '"><img src="img/' +
        esc(asset.src) +
        '" alt="' +
        esc(label) +
        '" loading="lazy" style="width:' +
        (asset.width / width) * 100 +
        '%;height:' +
        (asset.height / height) * 100 +
        '%;left:' +
        (-x / width) * 100 +
        '%;top:' +
        (-y / height) * 100 +
        '%"></div>'
      );
    }
    return typeof asset === 'number'
      ? '<div class="n-photo ' +
          extra +
          '" role="img" aria-label="' +
          esc(label) +
          '" style="background-position:' +
          ((asset % 4) * 100) / 3 +
          '% ' +
          (asset > 3 ? 100 : 0) +
          '%"></div>'
      : '<img class="n-photo ' +
          extra +
          '" src="img/' +
          asset +
          '" alt="' +
          esc(label) +
          '" loading="lazy">';
  };
  const reviewPhoto = (productId, shot, label, extra = '') =>
    '<div class="n-review-photo ' +
    extra +
    '" role="img" aria-label="' +
    esc(label) +
    '" style="--review-image:url(\'img/' +
    productById(productId).image.replace(
      '.webp',
      [0, 16, 22].includes(productId) ? '-gallery-v2.webp' : '-gallery.webp',
    ) +
    "');--review-x:" +
    [0, 50, 100][shot % 3] +
    '%"></div>';
  const iconHeart = (active) =>
    '<svg viewBox="0 0 24 24" width="19" height="19" fill="' +
    (active ? 'currentColor' : 'none') +
    '" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8z"/></svg>';
  const price = (p) =>
    '<div class="n-price">' +
    (p.discount ? '<del>' + money(p.original) + '</del>' : '') +
    '<div>' +
    (p.discount ? '<b>' + p.discount + '%</b>' : '') +
    '<strong>' +
    money(p.price) +
    '</strong></div></div>';
  function card(p) {
    const liked = state.likes.includes(p.id);
    return (
      '<article class="n-card"><div class="n-card-media"><a href="product.html?id=' +
      p.id +
      '" aria-label="' +
      esc(p.name) +
      ' 상세 보기">' +
      photo(p.image, p.name) +
      '</a><span class="n-card-badge">' +
      (p.fresh ? 'NEW' : 'BEST') +
      '</span><button class="n-like" data-like="' +
      p.id +
      '" aria-pressed="' +
      liked +
      '" aria-label="' +
      esc(p.name) +
      ' 찜">' +
      iconHeart(liked) +
      '</button></div><div class="n-card-info"><small>NESTO · ' +
      groupNames[p.group] +
      '</small><a href="product.html?id=' +
      p.id +
      '"><h3>' +
      esc(p.name) +
      '</h3></a><p>' +
      esc(p.desc) +
      '</p>' +
      price(p) +
      '<div class="n-rating"><span>★ ' +
      p.rating +
      ' · 리뷰 ' +
      p.reviewCount +
      '</span><span data-like-count="' +
      p.id +
      '">♡ ' +
      (p.likes + (liked ? 1 : 0)) +
      '</span></div></div></article>'
    );
  }
  const cards = (arr) => '<div class="n-grid">' + arr.map(card).join('') + '</div>';
  const root = $('#main');
  root.insertAdjacentHTML(
    'afterend',
    '<dialog class="n-modal"><div class="n-modal-top"><h2 id="n-modal-title"></h2><button type="button" data-close aria-label="창 닫기">×</button></div><div class="n-modal-body"></div></dialog><div class="n-toast" role="status" aria-live="polite"></div><button class="n-top" aria-label="맨 위로 이동">↑</button>',
  );
  const modal = $('.n-modal');
  modal.setAttribute('aria-labelledby', 'n-modal-title');
  let toastTimer, modalOpener;
  function toast(message) {
    $('.n-toast').textContent = message;
    $('.n-toast').classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => $('.n-toast').classList.remove('show'), 3000);
  }
  function openDialog(title, html) {
    if (!modal.open) modalOpener = document.activeElement;
    $('#n-modal-title').textContent = title;
    $('.n-modal-body').innerHTML = html;
    if (!modal.open) modal.showModal();
    $('.n-modal-body input, .n-modal-body button, [data-close]', modal)?.focus();
  }
  $('[data-close]').onclick = () => modal.close();
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      const r = modal.getBoundingClientRect();
      if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom)
        modal.close();
    }
  });
  modal.addEventListener('close', () => {
    if (modalOpener?.isConnected) modalOpener.focus();
  });
  $('.n-top').onclick = () =>
    window.scrollTo({
      top: 0,
      behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
    });
  function heading(kicker, title, desc, link) {
    return (
      '<div class="n-heading"><div><small>' +
      kicker +
      '</small><h2>' +
      title +
      '</h2>' +
      (desc ? '<p>' + desc + '</p>' : '') +
      '</div>' +
      (link ? '<a href="' + link + '">VIEW ALL ↗</a>' : '') +
      '</div>'
    );
  }
  function home() {
    const campaigns = [
      {
        asset: 'brand-mood',
        title: 'MAKE YOURSELF AT HOME',
        description: '나의 취향이 편안하게 머무는 공간, NESTO',
        action: 'data-content="브랜드 소개" aria-haspopup="dialog"',
        label: 'ABOUT NESTO · 브랜드 소개 보기',
      },
      {
        asset: 'signature',
        title: 'COLOR YOUR NEST',
        description: '공간에 기분 좋은 색을 더하는 NESTO SIGNATURE COLLECTION',
        href: 'list.html',
        label: 'VIEW COLLECTION · NESTO 시그니처 컬렉션 보기',
      },
      {
        asset: 'housewarming',
        title: 'NESTO HOUSEWARMING WEEK',
        description: '새로운 공간을 위한 특별한 시작, 인기 가구 최대 20% OFF',
        href: 'list.html?filter=sale',
        label: 'SHOP THE SALE · NESTO 집들이 할인 상품 보기',
      },
    ];
    const bannerMarkup = campaigns
      .map((campaign, i) => {
        const base = 'img/banners/NESTO-' + campaign.asset + '-';
        const tag = campaign.href ? 'a' : 'button';
        const action = campaign.href
          ? 'href="' + campaign.href + '"'
          : 'type="button" ' + campaign.action;
        return (
          '<div class="n-slide" role="group" aria-roledescription="slide" aria-label="' +
          (i + 1) +
          ' / ' +
          campaigns.length +
          '">' +
          '<' +
          tag +
          ' class="n-banner-link" ' +
          action +
          ' aria-label="' +
          esc(campaign.label) +
          '">' +
          '<picture class="n-banner-picture">' +
          '<source media="(max-width: 700px)" srcset="' +
          base +
          '402x500.svg" width="402" height="500">' +
          '<source media="(max-width: 1024px)" srcset="' +
          base +
          '1024x900.svg" width="1024" height="900">' +
          '<img class="n-banner-image" src="' +
          base +
          '1920x810.svg" width="1920" height="810" alt="' +
          esc(campaign.title + ' — ' + campaign.description) +
          '" loading="' +
          (i ? 'lazy' : 'eager') +
          '" fetchpriority="' +
          (i ? 'auto' : 'high') +
          '">' +
          '</picture></' +
          tag +
          '></div>'
        );
      })
      .join('');
    root.innerHTML =
      '<section class="n-hero" aria-label="NESTO 캠페인 슬라이드" aria-roledescription="carousel"><h1 class="n-banner-heading">MAKE YOURSELF AT HOME — NESTO</h1><div class="n-slides">' +
      bannerMarkup +
      '</div><div class="n-hero-controls"><button type="button" data-slide-step="-1" aria-label="이전 배너">←</button><div role="group" aria-label="배너 선택">' +
      campaigns
        .map(
          (campaign, i) =>
            '<button type="button" data-slide="' +
            i +
            '" aria-label="' +
            (i + 1) +
            '번 배너: ' +
            esc(campaign.title) +
            '" aria-pressed="' +
            (i === 0) +
            '"></button>',
        )
        .join('') +
      '</div><button type="button" data-slide-step="1" aria-label="다음 배너">→</button><button type="button" data-slide-pause aria-label="자동 재생 일시정지">Ⅱ</button></div></section>' +
      '<div class="n-notice"><span>HELLO, NESTO</span><p>처음 만나는 편안함. 웰컴 쿠폰과 함께 시작하세요.</p><button data-action="coupon">웰컴 혜택 ↗</button></div><section class="n-section n-wrap" id="spaces">' +
      heading(
        '01 / FIND YOUR SPACE',
        'SHOP BY SPACE',
        '좋아하는 공간에서 시작하는 나다운 집.',
        'list.html',
      ) +
      '<div class="n-rail" data-rail aria-label="공간별 카테고리">' +
      [
        ['LIVING', '거실', 'sofa'],
        ['DINING', '다이닝', 'table'],
        ['KITCHEN', '주방', 'storage'],
        ['BEDROOM', '침실', 'bed'],
      ]
        .map(
          (x, i) =>
            '<a class="n-space" href="list.html?space=' +
            x[0].toLowerCase() +
            '">' +
            photo(i, x[1] + ' 인테리어') +
            '<div><h3>' +
            x[0] +
            '</h3><span>' +
            x[1] +
            ' ↗</span></div></a>',
        )
        .join('') +
      '</div><div class="n-rail-controls"><button data-rail-step="-1" aria-label="이전 공간">←</button><button data-rail-step="1" aria-label="다음 공간">→</button></div></section><section class="n-section n-wrap" id="stories">' +
      heading(
        '02 / REAL LIFE, GOOD DESIGN',
        'STORIES FROM HOME',
        '각자의 취향으로 완성한, 서로 다른 집의 이야기.',
        'list.html?space=living',
      ) +
      '<div class="n-rail">' +
      [
        [4, 3, '하루의 끝, 나만의 자리', '부드러운 소재로 완성한 독서 공간'],
        [1, 0, '함께할수록 좋은 테이블', '둘이 앉아도, 여럿이 둘러앉아도'],
        [3, 18, '조금 느려도 괜찮은 아침', '포근한 패브릭으로 채운 침실'],
        [0, 1, '가장 편안한 주말', '따뜻한 햇살과 크림 소파'],
      ]
        .map(
          (s, i) =>
            '<article class="n-story"><a href="product.html?id=' +
            s[1] +
            '">' +
            reviewPhoto(s[1], 0, s[2], 'n-photo') +
            '</a><p class="n-stars">★★★★★</p><h3>' +
            s[2] +
            '</h3><p>' +
            s[3] +
            '</p><a class="n-story-product" href="product.html?id=' +
            s[1] +
            '">' +
            photo(products[s[1]].image, products[s[1]].name) +
            '<div><small>STYLED WITH</small><strong>' +
            products[s[1]].name +
            '</strong><span>' +
            money(products[s[1]].price) +
            '</span></div><span>↗</span></a></article>',
        )
        .join('') +
      '</div><div class="n-rail-controls"><button data-rail-step="-1" aria-label="이전 스토리">←</button><button data-rail-step="1" aria-label="다음 스토리">→</button></div></section><section class="n-editorial">' +
      photo(0, '자연광이 들어오는 크림 소파 거실') +
      '<div><small>THE SLOW SUNDAY EDIT</small><h2>A SOFTER<br>KIND OF DAY.</h2><p>햇빛이 머무는 자리에 놓인 소파.<br>좋아하는 책 한 권, 따뜻한 커피 한 잔.<br>편안함은 이렇게 작은 순간에서 시작됩니다.</p><a href="list.html?category=sofa">편안한 일상 만나기 ↗</a></div></section><section class="n-section n-wrap">' +
      heading(
        '03 / EVERYDAY FAVORITES',
        'BETTER PRICE, SAME NESTO.',
        '일상을 채우는 좋은 가구를, 조금 더 가볍게.',
        'list.html?filter=sale',
      ) +
      cards([products[0], products[1], products[3], products[5]]) +
      '</section><section class="n-section n-wrap">' +
      heading(
        '04 / NEW ARRIVALS',
        'HELLO, NEW FAVORITES.',
        '우리 집에 새롭게 더하고 싶은 것들.',
        'list.html?filter=new',
      ) +
      cards([products[25], products[26], products[27], products[18]]) +
      '</section><section class="n-brand"><small>MAKE ROOM FOR WHAT YOU LOVE.</small><h2>GOOD DAYS<br>START AT HOME.</h2><button data-content="브랜드 소개">NESTO의 이야기 ↗</button></section>';
    $('.n-brand').insertAdjacentHTML(
      'beforebegin',
      '<section class="n-section n-wrap n-season">' +
        heading(
          '05 / THE AUTUMN EDIT',
          '작은 변화, 포근한 계절.',
          '조명 하나, 러그 한 장으로 달라지는 우리 집.',
          'list.html?category=decor',
        ) +
        '<div class="n-season-grid"><a href="product.html?id=21">' +
        photo(products[21].image, 'PODO 램프가 밝히는 따뜻한 저녁') +
        '<div><small>A WARMER EVENING</small><h3>불을 낮추고, 쉬어가는 시간.</h3><span>조명 컬렉션 만나기 ↗</span></div></a><a href="product.html?id=23">' +
        photo(products[23].image, 'SOL 러그의 포근한 텍스처') +
        '<div><small>SOFT UNDERFOOT</small><h3>발끝에 닿는 계절의 온기.</h3><span>포근한 소재 만나기 ↗</span></div></a></div></section><section class="n-section n-wrap n-home-reviews" id="home-reviews">' +
        heading(
          '06 / NOTES FROM HOME',
          '좋아하는 집의 기록.',
          '제품과 함께하는 일상을 상상해보세요. 예시 리뷰입니다.',
          'product.html?id=18#product-detail-2',
        ) +
        '<div class="n-home-review-grid">' +
        [18, 21, 11]
          .map((id) => {
            const p = products[id];
            return (
              '<a href="product.html?id=' +
              p.id +
              '#product-detail-2">' +
              photo(p.image, p.name) +
              '<div><span class="n-stars">★★★★★</span><h3>' +
              p.reviews[0][2] +
              '</h3><p>' +
              p.reviews[0][3] +
              '</p><small>' +
              p.name +
              ' · ' +
              p.reviews[0][0] +
              '</small></div></a>'
            );
          })
          .join('') +
        '</div></section>',
    );
    const AUTOPLAY_DELAY = 5200;
    let slide = 0,
      paused = matchMedia('(prefers-reduced-motion: reduce)').matches,
      autoTimer;
    const slides = $$('.n-slide'),
      track = $('.n-slides'),
      show = (i) => {
        slide = (i + slides.length) % slides.length;
        track.style.transform = 'translate3d(-' + slide * 100 + '%,0,0)';
        slides.forEach((s, j) => {
          const active = j === slide;
          s.hidden = false;
          s.setAttribute('aria-hidden', String(!active));
          s.inert = !active;
        });
        $$('[data-slide]').forEach((b) =>
          b.setAttribute('aria-pressed', String(+b.dataset.slide === slide)),
        );
      };
    const schedule = () => {
      clearTimeout(autoTimer);
      if (paused) return;
      autoTimer = setTimeout(() => {
        if (
          !document.hidden &&
          !$('.n-hero').matches(':hover') &&
          !$('.n-hero').contains(document.activeElement)
        )
          show(slide + 1);
        schedule();
      }, AUTOPLAY_DELAY);
    };
    const go = (i) => {
      show(i);
      schedule();
    };
    show(0);
    $$('[data-slide]').forEach((b) => (b.onclick = () => go(+b.dataset.slide)));
    $$('[data-slide-step]').forEach(
      (b) => (b.onclick = () => go(slide + Number(b.dataset.slideStep))),
    );
    const pauseButton = $('[data-slide-pause]');
    pauseButton.textContent = paused ? '▶' : 'Ⅱ';
    pauseButton.setAttribute('aria-label', paused ? '자동 재생 시작' : '자동 재생 일시정지');
    pauseButton.onclick = () => {
      paused = !paused;
      pauseButton.textContent = paused ? '▶' : 'Ⅱ';
      pauseButton.setAttribute('aria-label', paused ? '자동 재생 시작' : '자동 재생 일시정지');
      schedule();
    };
    schedule();
    document.addEventListener('visibilitychange', schedule);
    let startX = 0;
    $('.n-hero').addEventListener('touchstart', (e) => (startX = e.touches[0].clientX), {
      passive: true,
    });
    $('.n-hero').addEventListener(
      'touchend',
      (e) => {
        const delta = e.changedTouches[0].clientX - startX;
        if (Math.abs(delta) > 60) go(slide + (delta < 0 ? 1 : -1));
      },
      { passive: true },
    );
  }
  function catalog() {
    const spaces = { living: '거실', dining: '다이닝', kitchen: '주방', bedroom: '침실' };
    let category = groupNames[params.get('category')] ? params.get('category') : 'all';
    let sort = ['featured', 'low', 'high', 'new', 'popular', 'discount'].includes(
      params.get('sort'),
    )
      ? params.get('sort')
      : 'featured';
    let color = params.get('color') || '',
      current = Math.max(1, Number(params.get('page')) || 1);
    const filter = params.get('filter'),
      query = (params.get('q') || '').trim(),
      space = params.get('space');
    const scope = products.filter(
      (p) =>
        (filter !== 'new' || p.fresh) &&
        (filter !== 'sale' || p.discount > 0) &&
        (!spaces[space] || p.spaces.includes(space)),
    );
    const categories = Object.entries(groupNames).filter(
      ([id]) => id === 'all' || scope.some((p) => p.group === id),
    );
    if (!categories.some(([id]) => id === category)) category = 'all';
    const tones = [
      ['', '모든 컬러'],
      ['오크', '내추럴 우드'],
      ['월넛', '월넛'],
      ['크림', '크림'],
      ['그레이', '그레이'],
      ['오렌지', '오렌지'],
      ['샌드', '샌드'],
    ];
    root.innerHTML =
      '<section class="n-catalog-hero"><div class="n-wrap"><small>FIND YOUR EVERYDAY FAVORITES</small><h1>' +
      (query
        ? 'FIND YOUR NEST.'
        : spaces[space]
          ? space.toUpperCase() + '.'
          : filter === 'new'
            ? 'NEW, JUST IN.'
            : filter === 'sale'
              ? 'GOOD DESIGN.<br>BETTER PRICE.'
              : 'MAKE ROOM<br>FOR YOU.') +
      '</h1><p>' +
      (query
        ? '“' + esc(query) + '”와 어울리는 제품'
        : spaces[space]
          ? '나의 ' + spaces[space] + '을 위한 가구와 작은 소품.'
          : '당신의 일상에 자연스럽게 어울리는 가구.') +
      '</p></div></section><section class="n-section n-wrap n-catalog"><nav class="n-space-links" aria-label="공간별 쇼핑"><a href="list.html">모든 공간</a>' +
      Object.entries(spaces)
        .map(
          ([key, label]) =>
            '<a href="list.html?space=' +
            key +
            '" ' +
            (key === space ? 'aria-current="page"' : '') +
            '>' +
            label +
            '</a>',
        )
        .join('') +
      '</nav><div class="n-filters" role="group" aria-label="카테고리">' +
      categories
        .map(
          ([id, label]) =>
            '<button data-category="' +
            id +
            '" aria-pressed="' +
            (id === category) +
            '">' +
            label +
            '</button>',
        )
        .join('') +
      '</div><div class="n-toolbar"><p data-count aria-live="polite"></p><div class="n-sort-tools"><label>컬러 <select data-color>' +
      tones.map(([v, l]) => '<option value="' + v + '">' + l + '</option>').join('') +
      '</select></label><label>정렬 <select data-sort><option value="featured">추천순</option><option value="popular">인기순</option><option value="low">낮은 가격순</option><option value="high">높은 가격순</option><option value="new">신상품순</option><option value="discount">할인율순</option></select></label><a href="list.html">필터 초기화</a></div></div><div data-results></div><nav class="n-pagination" aria-label="상품 목록 페이지"></nav></section>';
    function render() {
      const words = query.toLowerCase().split(/\s+/).filter(Boolean);
      const items = scope.filter(
        (p) =>
          (category === 'all' || p.group === category) &&
          (!color || p.colors.some((c) => c.includes(color))) &&
          words.every((w) =>
            (p.name + ' ' + p.desc + ' ' + groupNames[p.group] + ' ' + p.colors.join(' '))
              .toLowerCase()
              .includes(w),
          ),
      );
      items.sort(
        sort === 'low'
          ? (a, b) => a.price - b.price
          : sort === 'high'
            ? (a, b) => b.price - a.price
            : sort === 'new'
              ? (a, b) => b.id - a.id
              : sort === 'popular'
                ? (a, b) => b.likes - a.likes
                : sort === 'discount'
                  ? (a, b) => b.discount - a.discount
                  : (a, b) => Number(b.signature) - Number(a.signature) || a.id - b.id,
      );
      const pages = Math.max(1, Math.ceil(items.length / 12));
      current = Math.min(current, pages);
      $('[data-count]').textContent = items.length + '개의 제품';
      $('[data-results]').innerHTML = items.length
        ? cards(items.slice((current - 1) * 12, current * 12))
        : '<div class="n-search-suggestion"><h2>이런 제품은 어떠세요?</h2><p>선택한 조건과 정확히 일치하는 제품 대신, 함께 살펴보기 좋은 NESTO 제품을 모았어요.</p><a href="list.html" class="n-btn n-btn-outline">전체 컬렉션 보기</a></div>' +
          cards(scope.slice(0, 4));
      $('.n-pagination').innerHTML =
        pages > 1
          ? '<button data-page="' +
            (current - 1) +
            '" ' +
            (current === 1 ? 'disabled' : '') +
            ' aria-label="이전 페이지">←</button>' +
            Array.from(
              { length: pages },
              (_, i) =>
                '<button data-page="' +
                (i + 1) +
                '" ' +
                (current === i + 1 ? 'aria-current="page"' : '') +
                '>' +
                (i + 1) +
                '</button>',
            ).join('') +
            '<button data-page="' +
            (current + 1) +
            '" ' +
            (current === pages ? 'disabled' : '') +
            ' aria-label="다음 페이지">→</button>'
          : '';
      const url = new URL(location.href);
      for (const [k, v] of Object.entries({ category, sort, color, page: current })) {
        if (v) url.searchParams.set(k, v);
        else url.searchParams.delete(k);
      }
      history.replaceState(null, '', url);
    }
    $('[data-sort]').value = sort;
    $('[data-color]').value = color;
    $$('[data-category]').forEach(
      (b) =>
        (b.onclick = () => {
          category = b.dataset.category;
          current = 1;
          $$('[data-category]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
          render();
        }),
    );
    $('[data-sort]').onchange = (e) => {
      sort = e.target.value;
      current = 1;
      render();
    };
    $('[data-color]').onchange = (e) => {
      color = e.target.value;
      current = 1;
      render();
    };
    $('.n-pagination').onclick = (e) => {
      const b = e.target.closest('[data-page]');
      if (b && !b.disabled) {
        current = +b.dataset.page;
        render();
        $('.n-toolbar').scrollIntoView({ block: 'start' });
      }
    };
    render();
    document.title = (spaces[space] || groupNames[category]) + ' 컬렉션 | NESTO';
  }

  let currentProduct,
    quantity = 1;

  function galleryImage(p, kind) {
    if (kind === 'product') return photo(p.image, p.name + ' 대표 이미지');
    return reviewPhoto(
      p.id,
      { room: 0, material: 1, side: 2 }[kind],
      p.name + ' ' + { room: '공간 연출', material: '소재 디테일', side: '다른 각도' }[kind],
      'n-gallery-scene',
    );
  }
  function detail() {
    const p = productById(params.get('id') ?? 1) || products[0];
    currentProduct = p;
    if (params.has('id') && !productById(params.get('id'))) {
      const url = new URL(location.href);
      url.searchParams.set('id', p.id);
      history.replaceState(null, '', url);
    }
    document.title = p.name + ' | NESTO';
    const galleryLabels = {
      product: '대표 이미지',
      room: '공간 연출',
      material: '소재 디테일',
      side: '다른 각도',
    };
    const delivery = p.delivery + ' · 배송비 무료';
    const related = products.filter((x) => x.id !== p.id && x.group === p.group).slice(0, 4);
    const together = products
      .filter(
        (x) => x.id !== p.id && x.group !== p.group && x.spaces.some((s) => p.spaces.includes(s)),
      )
      .sort((a, b) => Math.abs((a.id % 7) - (p.id % 7)) - Math.abs((b.id % 7) - (p.id % 7)))
      .slice(0, 4);
    root.innerHTML =
      '<div class="n-wrap n-breadcrumb"><a href="index.html">HOME</a><span>/</span><a href="list.html?category=' +
      p.group +
      '">' +
      groupNames[p.group] +
      '</a><span>/</span>' +
      esc(p.name) +
      '</div><section class="n-wrap n-detail"><div class="n-gallery"><button class="n-gallery-main" data-gallery-zoom aria-label="상품 사진 확대">' +
      galleryImage(p, 'product') +
      '</button><div class="n-thumbs" aria-label="상품 사진 선택">' +
      p.gallery
        .map(
          (kind, i) =>
            '<button data-photo="' +
            kind +
            '" aria-label="' +
            galleryLabels[kind] +
            ' 선택" aria-pressed="' +
            (i === 0) +
            '">' +
            galleryImage(p, kind) +
            '<span>' +
            galleryLabels[kind] +
            '</span></button>',
        )
        .join('') +
      '</div><p class="n-caption">이미지를 누르면 크게 볼 수 있어요. 대표 이미지는 ' +
      esc(p.colors[0]) +
      ' 컬러입니다.</p></div><div class="n-summary"><small>NESTO / ' +
      (p.fresh ? 'NEW COLLECTION' : 'EVERYDAY FAVORITES') +
      '</small><h1>' +
      esc(p.name) +
      '</h1><p>' +
      esc(p.desc) +
      '</p><div class="n-summary-rating"><a href="#product-detail-2">★ ' +
      p.rating +
      ' <u>리뷰 ' +
      p.reviewCount +
      '</u></a><button class="n-like" data-like="' +
      p.id +
      '" aria-pressed="' +
      state.likes.includes(p.id) +
      '" aria-label="상품 찜">' +
      iconHeart(state.likes.includes(p.id)) +
      '</button></div>' +
      price(p) +
      '<div class="n-benefits"><div><strong>첫 만남 혜택</strong><p>웰컴 쿠폰 5% · 최대 30,000원</p><button data-action="coupon">쿠폰 받기 ↓</button></div><details><summary>' +
      delivery +
      '</summary><p>주문 후 배송일을 협의하는 설정의 상품입니다. 가구를 놓을 자리뿐 아니라 출입문, 계단과 엘리베이터 크기도 미리 확인해주세요. 전기 배선과 벽 타공은 별도 시공이 필요합니다.</p></details></div><div class="n-options"><label for="n-color">컬러<select id="n-color">' +
      p.colors.map((c) => '<option>' + esc(c) + '</option>').join('') +
      '</select></label><label for="n-size">구성<select id="n-size"><option value="standard">' +
      (p.group === 'bed' ? '프레임 단품 · 매트리스 별도' : '기본 구성') +
      '</option><option value="care">케어 키트 포함 (+20,000원)</option></select></label></div><p class="n-option-note" data-color-note>선택 컬러: ' +
      esc(p.colors[0]) +
      '</p><div class="n-quantity"><span>수량</span><button data-qty="-1" aria-label="수량 줄이기">−</button><output data-quantity>1</output><button data-qty="1" aria-label="수량 늘리기">+</button></div><div class="n-total"><span>총 상품 금액</span><strong data-total>' +
      money(p.price) +
      '</strong></div><div class="n-actions"><button class="n-btn n-btn-outline" data-add-cart>장바구니</button><button class="n-btn" data-buy>구매하기</button></div><p class="n-caption">NESTO 콘셉트 스토어 · 가상 상품과 예시 이미지입니다. 주문은 체험용이며 실제 결제·배송은 발생하지 않습니다.</p></div></section><nav class="n-tabs" aria-label="상품 상세 메뉴"><a href="#product-detail-1" class="is-active">상품정보</a><a href="#product-detail-2">상품리뷰 <span>' +
      p.reviewCount +
      '</span></a><a href="#product-detail-3">상품 Q&A</a><a href="#n-delivery">배송·교환</a></nav><section id="product-detail-1" class="n-story-detail n-wrap"><small>DESIGNED TO FEEL AT HOME.</small><h2>' +
      esc(p.name) +
      '<br>일상에 자연스럽게.</h2><p>' +
      esc(p.desc) +
      '</p>' +
      galleryImage(p, 'room') +
      '<div class="n-detail-features"><article><span>01 / MATERIAL</span><h3>손끝에서 느끼는 소재</h3><p>' +
      esc(p.material) +
      '</p></article><article><span>02 / PROPORTION</span><h3>우리 집에 맞는 크기</h3><p>' +
      esc(p.dimensions) +
      '</p></article><article><span>03 / EVERYDAY CARE</span><h3>오래 함께하는 방법</h3><p>' +
      esc(p.care) +
      '</p></article></div><div class="n-detail-diptych"><figure>' +
      galleryImage(p, 'material') +
      '<figcaption>가까이에서 살펴보는 소재와 마감</figcaption></figure><div><small>YOUR EVERYDAY FAVORITE</small><h3>좋아하는 물건들과<br>함께 놓아보세요.</h3><p>' +
      esc(p.desc) +
      '</p><a class="n-btn n-btn-outline" href="list.html?space=' +
      p.spaces[0] +
      '">어울리는 공간 둘러보기 ↗</a></div></div><table class="n-specs"><caption>구매 전 확인해주세요</caption><tbody>' +
      [
        ['상품명', p.name],
        ['브랜드', 'NESTO'],
        ['컬러', p.colors.join(' / ')],
        ['크기', p.dimensions],
        ['주요 소재', p.material],
        [
          '구성',
          p.group === 'bed'
            ? '침대 프레임 1개 · 매트리스 별도'
            : p.group === 'light'
              ? '조명 1개 · 전구 별도'
              : '본품 1개 · 연출 소품 제외',
        ],
        ['배송', delivery],
        ['관리', p.care],
        [
          '참고',
          '재는 위치에 따라 약간의 치수 차이가 있으며 화면과 조명에 따라 색이 달라 보일 수 있습니다.',
        ],
      ]
        .map(([k, v]) => '<tr><th scope="row">' + k + '</th><td>' + esc(v) + '</td></tr>')
        .join('') +
      '</tbody></table></section><section id="product-detail-2" class="n-section n-wrap n-reviews">' +
      heading(
        'REVIEWS',
        '함께 쓰는 이야기.',
        '가상 상품의 사용 장면을 담은 예시 리뷰와 이미지입니다.',
        '',
      ) +
      '<div class="n-review-overview"><strong>' +
      p.rating +
      '<small> / 5.0</small></strong><span class="n-stars">' +
      (p.reviewCount ? '★★★★★' : '☆☆☆☆☆') +
      '</span><p>' +
      (p.reviewCount
        ? p.reviewCount + '개의 이야기 · 디자인, 크기, 소재를 살펴보세요.'
        : '아직 등록된 리뷰가 없습니다.') +
      '</p></div><div class="n-review-list">' +
      p.reviews
        .map(
          (r, i) =>
            '<article class="n-review"><div><strong>' +
            r[0] +
            '</strong><small>2026.09.' +
            (26 - i * 3) +
            '</small><span class="n-stars" aria-label="5점 만점에 ' +
            r[1] +
            '점">' +
            '★'.repeat(r[1]) +
            '☆'.repeat(5 - r[1]) +
            '</span></div><div><small class="n-review-option">구매 옵션 · ' +
            esc(p.colors[i % p.colors.length]) +
            ' / 기본 구성</small><h3>' +
            r[2] +
            '</h3><p class="n-review-text" id="review-text-' +
            i +
            '">' +
            esc(r[3]) +
            '</p><button data-review-more aria-expanded="false" aria-controls="review-text-' +
            i +
            '">더보기 ↓</button>' +
            (i < 3
              ? '<div class="n-review-photos"><button data-review-product="' +
                p.id +
                '" data-review-shot="' +
                i +
                '" aria-label="' +
                esc(p.name) +
                ' 리뷰 사진 ' +
                (i + 1) +
                ' 확대">' +
                reviewPhoto(p.id, i, p.name + ' 사용 장면 예시 ' + (i + 1)) +
                '</button></div>'
              : '') +
            '<div class="n-review-actions"><button data-helpful="' +
            p.id +
            '-' +
            i +
            '" aria-pressed="' +
            state.helpful.includes(p.id + '-' + i) +
            '">도움이 돼요 ' +
            (state.helpful.includes(p.id + '-' + i) ? 1 : 0) +
            '</button><button data-report="' +
            i +
            '">신고·차단</button></div></div></article>',
        )
        .join('') +
      '</div></section><section id="product-detail-3" class="n-section n-wrap n-questions">' +
      heading(
        'QUESTIONS & ANSWERS',
        '구매 전 궁금한 점.',
        '제품 구성과 관리 방법을 확인하세요.',
        '',
      ) +
      '<button class="n-btn n-btn-outline" data-question>상품 문의하기 ↗</button><div data-questions></div></section><section class="n-section n-wrap" id="n-delivery">' +
      heading('DELIVERY & CARE', '오래 함께하는 일상.', '', '') +
      '<div class="n-benefits"><details open><summary>배송과 설치</summary><p>' +
      delivery +
      '. 주문 상품과 설치 환경에 따라 소요 기간이 달라질 수 있습니다. 수령 전 설치 위치를 비워두고, 포장을 열어 구성품과 표면 상태를 확인해주세요. 이 스토어에서는 주문 흐름만 체험할 수 있습니다.</p></details><details><summary>소재별 관리</summary><p>' +
      esc(p.care) +
      '</p></details><details><summary>교환·반품 안내</summary><p>색상과 사이즈, 출입문 및 설치 공간의 치수를 주문 전에 확인해주세요. 수령 시 파손이나 구성 누락을 발견하면 포장과 제품 상태를 사진으로 기록해두는 것이 좋습니다. 이 사이트의 체험 주문은 MY NESTO에서 취소할 수 있습니다.</p></details></div></section><section class="n-section n-wrap n-recommendations">' +
      heading('PAIRS WELL WITH', '함께 두면 더 좋은 가구.', '', 'list.html?space=' + p.spaces[0]) +
      cards(together) +
      '</section>' +
      (related.length
        ? '<section class="n-section n-wrap">' +
          heading(
            'MORE TO LOVE',
            '다른 디자인도 만나보세요.',
            '',
            'list.html?category=' + p.group,
          ) +
          cards(related) +
          '</section>'
        : '');
    $$('[data-photo]').forEach(
      (b) =>
        (b.onclick = () => {
          $('.n-gallery-main').innerHTML = galleryImage(p, b.dataset.photo);
          $$('[data-photo]').forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
        }),
    );
    $('[data-gallery-zoom]').onclick = () => openDialog(p.name, $('.n-gallery-main').innerHTML);
    $$('[data-qty]').forEach(
      (b) =>
        (b.onclick = () => {
          quantity = Math.max(1, Math.min(99, quantity + Number(b.dataset.qty)));
          updateQuantity();
        }),
    );
    $('#n-size').onchange = updateQuantity;
    $('#n-color').onchange = () => {
      $('[data-color-note]').textContent =
        '선택 컬러: ' +
        $('#n-color').value +
        ($('#n-color').value !== p.colors[0] ? ' · 이미지는 대표 컬러 기준입니다.' : '');
    };
    updateQuantity();
    $('[data-add-cart]').onclick = () => {
      addCart(selection());
      openDialog(
        '장바구니에 담았어요.',
        '<div class="n-added">' +
          photo(p.image, p.name) +
          '<div><h3>' +
          esc(p.name) +
          '</h3><p>' +
          esc(selection().color) +
          ' · ' +
          quantity +
          '개</p><strong>' +
          money(unit(selection()) * quantity) +
          '</strong></div></div><div class="n-actions"><button class="n-btn n-btn-outline" data-continue>계속 둘러보기</button><button class="n-btn" data-action="cart">장바구니 보기</button></div>',
      );
    };
    $('[data-buy]').onclick = () => checkout([selection()], false);
    renderQuestions();
    const observer = new IntersectionObserver(
      (entries) =>
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            $$('.n-tabs a').forEach((a) =>
              a.classList.toggle('is-active', a.hash === '#' + entry.target.id),
            );
        }),
      { rootMargin: '-140px 0px -55% 0px' },
    );
    $$('#product-detail-1,#product-detail-2,#product-detail-3,#n-delivery').forEach((s) =>
      observer.observe(s),
    );
  }

  function selection() {
    return {
      id: currentProduct.id,
      color: $('#n-color').value,
      size: $('#n-size').value,
      qty: quantity,
    };
  }
  function unit(row) {
    return productById(row.id).price + (row.size === 'care' ? 20000 : 0);
  }
  function updateQuantity() {
    if (!currentProduct) return;
    $('[data-quantity]').textContent = quantity;
    $('[data-total]').textContent = money(unit(selection()) * quantity);
    $('[data-qty="-1"]').disabled = quantity === 1;
    $('[data-qty="1"]').disabled = quantity === 99;
  }
  function addCart(row) {
    const match = state.cart.find(
      (x) => x.id === row.id && x.color === row.color && x.size === row.size,
    );
    if (match) match.qty = Math.min(99, match.qty + row.qty);
    else state.cart.push({ ...row });
    save();
    updateBadges();
  }
  function cartTotal(rows) {
    const subtotal = rows.reduce((sum, row) => sum + unit(row) * row.qty, 0),
      discount = state.coupon ? Math.min(30000, Math.round(subtotal * 0.05)) : 0;
    return { subtotal, discount, total: subtotal - discount };
  }
  function totals(rows) {
    const t = cartTotal(rows);
    return (
      '<dl class="n-cart-totals"><div><dt>상품 금액</dt><dd>' +
      money(t.subtotal) +
      '</dd></div><div><dt>배송비</dt><dd>0원</dd></div><div><dt>웰컴 쿠폰 ' +
      (state.coupon ? '적용' : '미적용') +
      '</dt><dd>−' +
      money(t.discount) +
      '</dd></div><div><dt>총 결제 예정 금액</dt><dd><strong>' +
      money(t.total) +
      '</strong></dd></div></dl>'
    );
  }
  function showCart() {
    openDialog(
      '장바구니',
      state.cart.length
        ? '<div class="n-cart-list">' +
            state.cart
              .map((row, i) => {
                const p = productById(row.id);
                return (
                  '<div class="n-cart-row">' +
                  photo(p.image, p.name) +
                  '<div><a href="product.html?id=' +
                  p.id +
                  '"><strong>' +
                  esc(p.name) +
                  '</strong></a><p>' +
                  esc(row.color) +
                  ' · ' +
                  (row.size === 'care' ? '케어 키트 포함' : '기본 구성') +
                  '</p><b>' +
                  money(unit(row) * row.qty) +
                  '</b><div class="n-quantity"><button data-cart-step="-1" data-row="' +
                  i +
                  '" ' +
                  (row.qty === 1 ? 'disabled' : '') +
                  ' aria-label="상품 수량 줄이기">−</button><output>' +
                  row.qty +
                  '</output><button data-cart-step="1" data-row="' +
                  i +
                  '" ' +
                  (row.qty === 99 ? 'disabled' : '') +
                  ' aria-label="상품 수량 늘리기">+</button></div></div><button data-cart-remove="' +
                  i +
                  '" aria-label="' +
                  esc(p.name) +
                  ' 삭제">×</button></div>'
                );
              })
              .join('') +
            '</div>' +
            totals(state.cart) +
            '<div class="n-actions"><button class="n-btn n-btn-outline" data-action="coupon">쿠폰 받기</button><button class="n-btn" data-checkout>주문하기</button></div><p class="n-caption">장바구니는 이 브라우저에 저장됩니다.</p>'
        : '<div class="n-empty"><p>아직 담은 제품이 없어요.</p><a class="n-btn" href="list.html">좋아하는 가구 찾기 ↗</a></div>',
    );
  }
  let pendingOrder = null;
  function checkout(rows, fromCart) {
    pendingOrder = { rows: rows.map((x) => ({ ...x })), fromCart };
    openDialog(
      '주문 미리보기',
      '<p class="n-demo-note">포트폴리오 체험 주문입니다. 결제 및 배송은 발생하지 않습니다.</p>' +
        rows
          .map(
            (row) =>
              '<div class="n-order-line"><strong>' +
              esc(productById(row.id).name) +
              '</strong><p>' +
              esc(row.color) +
              ' · ' +
              (row.size === 'care' ? '케어 키트 포함' : '기본 구성') +
              ' · ' +
              row.qty +
              '개</p></div>',
          )
          .join('') +
        totals(rows) +
        '<p class="n-caption">예상 적립 포인트 ' +
        Math.floor(cartTotal(rows).total * 0.01).toLocaleString('ko-KR') +
        'P</p><button class="n-btn" data-order-confirm>체험 주문 완료하기</button>',
    );
  }
  function showAccount() {
    if (!state.profile && !state.orders.length) {
      openDialog(
        'NESTO 멤버십',
        '<form class="n-form" data-profile-form><p>닉네임으로 쇼핑 흐름을 체험해 보세요. 실제 회원가입이나 인증은 진행되지 않습니다.</p><label>닉네임<input name="name" required maxlength="24" autocomplete="nickname" placeholder="이름 또는 닉네임"></label><button class="n-btn">체험 시작하기</button></form>',
      );
      return;
    }
    openDialog(
      'MY NESTO',
      '<h3>' +
        esc(state.profile?.name || '게스트') +
        '님, 반가워요.</h3><div class="n-account-actions"><button data-action="wishlist">찜한 상품 ' +
        state.likes.length +
        '</button><button data-action="cart">장바구니 ' +
        state.cart.length +
        '</button><button data-action="coupon">' +
        (state.coupon ? '웰컴 쿠폰 보유' : '웰컴 쿠폰 받기') +
        '</button></div><h3>체험 주문 내역</h3>' +
        (state.orders.length
          ? state.orders
              .map(
                (order, i) =>
                  '<div class="n-order-line"><small>' +
                  esc(order.date) +
                  ' · ' +
                  esc(order.number) +
                  '</small><h4>' +
                  esc(order.names) +
                  '</h4><p>' +
                  money(order.total) +
                  ' · ' +
                  (order.cancelled ? '취소됨' : '체험 주문 완료') +
                  '</p>' +
                  (!order.cancelled
                    ? '<button data-order-cancel="' + i + '">주문 취소</button>'
                    : '') +
                  '</div>',
              )
              .join('')
          : '<p class="n-empty">아직 주문 내역이 없습니다.</p>') +
        '<button class="n-btn n-btn-outline" data-signout>체험 프로필 나가기</button>',
    );
  }
  function showWishlist() {
    openDialog(
      '좋아하는 가구',
      state.likes.length
        ? cards(products.filter((p) => state.likes.includes(p.id)))
        : '<div class="n-empty"><p>마음에 드는 가구의 하트를 눌러보세요.</p><a class="n-btn" href="list.html">컬렉션 보기</a></div>',
    );
  }
  function search() {
    openDialog(
      '무엇을 찾고 있나요?',
      '<form class="n-form" action="list.html"><label>상품 검색<input type="search" name="q" required placeholder="소파, 테이블, 오렌지..." maxlength="80"></label><button class="n-btn">검색 ↗</button></form><div class="n-search-tags"><span>추천 검색어</span>' +
        ['소파', '체어', '테이블', '수납']
          .map((q) => '<a href="list.html?q=' + encodeURIComponent(q) + '">' + q + '</a>')
          .join('') +
        '</div>',
    );
  }
  function renderQuestions() {
    const target = $('[data-questions]');
    if (!target) return;
    const p = currentProduct;
    const answers = [
      ['어떤 소재로 만들어졌나요?', p.material + '. ' + p.care],
      [
        '어떤 구성이 포함되나요?',
        p.group === 'bed'
          ? '침대 프레임 1개입니다. 매트리스와 연출 소품은 별도입니다.'
          : p.group === 'light'
            ? '조명 본품 1개입니다. 전구와 배선 시공은 별도이며, 상품 정보의 소켓 규격을 확인해주세요.'
            : '본품 1개 구성입니다. 사진 속 다른 가구와 소품은 포함되지 않습니다.',
      ],
      [
        '크기를 확인하고 싶어요.',
        p.dimensions + '입니다. 설치할 자리와 반입 동선을 함께 확인해주세요.',
      ],
    ];
    target.innerHTML =
      answers
        .map(
          ([q, a]) =>
            '<details><summary><span>제품 안내</span> ' +
            q +
            '</summary><p>' +
            esc(a) +
            '</p></details>',
        )
        .join('') +
      state.questions
        .filter((q) => q.product === p.id)
        .map(
          (q) =>
            '<details><summary><span>내 문의</span> ' +
            esc(q.title) +
            '</summary><p>' +
            esc(q.body) +
            '</p><small>' +
            esc(q.name) +
            ' · 이 브라우저에 저장된 체험 문의입니다.</small></details>',
        )
        .join('');
  }
  function content(title) {
    const topics = {
      '작은 공간 스타일링': {
        image: 8,
        kicker: 'SMALL SPACE, BIG COMFORT',
        title: '공간보다 먼저,<br>생활을 생각해요.',
        intro:
          '작은 집에서는 가구의 개수보다 생활의 동선이 중요합니다. 앉고, 걷고, 물건을 꺼내는 자리를 먼저 그려보세요.',
        items: [
          [
            '비워둘 자리를 먼저',
            '주로 오가는 통로에는 여유를 두고, 서랍과 문이 열리는 범위까지 표시해보세요.',
          ],
          [
            '낮고 열린 가구',
            '낮은 소파와 다리가 드러나는 가구는 바닥을 더 많이 보여줍니다. 오픈 선반에는 자주 쓰는 것만 담아보세요.',
          ],
          [
            '하나의 가구, 두 가지 쓰임',
            '사이드 테이블을 침실 협탁으로, 작은 테이블을 작업대로 활용하면 공간을 덜 차지합니다.',
          ],
        ],
        href: 'list.html?space=living',
      },
      '홈카페 만들기': {
        image: 6,
        kicker: 'A TABLE FOR EVERYDAY',
        title: '매일의 커피가<br>조금 더 좋아지는 자리.',
        intro:
          '큰 다이닝룸이 아니어도 괜찮아요. 빛이 드는 한쪽에 테이블과 편안한 의자, 좋아하는 잔을 놓아보세요.',
        items: [
          [
            '우리 집에 맞는 테이블',
            '소규모 식사에는 라운드 테이블을, 작업과 식사를 함께한다면 긴 상판을 골라보세요.',
          ],
          [
            '빛의 높이',
            '펜던트는 앉은 사람의 시야를 가리지 않는 높이로 계획하고, 배선 위치를 미리 확인하세요.',
          ],
          [
            '정리까지 편안하게',
            '컵과 티 도구는 가까운 수납장에 모아두세요. 테이블 위에는 작은 화병 하나면 충분합니다.',
          ],
        ],
        href: 'list.html?space=dining',
      },
      '침실 스타일링': {
        image: 18,
        kicker: 'REST COMES NATURALLY',
        title: '하루의 끝을<br>부드럽게 만드는 방법.',
        intro: '편안한 침실은 침대의 크기, 손이 닿는 협탁, 눈부시지 않은 빛에서 시작됩니다.',
        items: [
          [
            '침대 옆의 여유',
            '누울 자리뿐 아니라 침대에 드나드는 공간과 수납 서랍을 여는 자리도 확인하세요.',
          ],
          [
            '소재를 겹쳐보세요',
            '우드의 결 위에 부클레, 리넨, 울처럼 표정이 다른 소재를 더하면 같은 색도 풍성해집니다.',
          ],
          [
            '빛은 낮고 따뜻하게',
            '취침 전에는 작은 조명을 켜고 천장등을 낮춰보세요. 손이 닿는 곳에 스위치를 두면 더 편안합니다.',
          ],
        ],
        href: 'list.html?space=bedroom',
      },
      '소재와 관리': {
        image: 3,
        kicker: 'MATERIAL MATTERS',
        title: '좋은 가구를<br>오래 곁에 두는 습관.',
        intro:
          '소재의 변화를 이해하고 가볍게, 자주 관리해주세요. 제품별 안내는 상세페이지에서 확인할 수 있습니다.',
        items: [
          [
            '우드',
            '물기와 열은 받침으로 막고, 젖으면 바로 닦아주세요. 원목의 결과 색은 제품마다 조금씩 다릅니다.',
          ],
          [
            '패브릭과 부클레',
            '약한 흡입력으로 먼지를 제거하세요. 얼룩은 비비지 말고 눌러 닦고, 강한 세제는 피해주세요.',
          ],
          [
            '조명과 소품',
            '전원을 분리한 뒤 부드러운 천으로 관리하세요. 도자기와 거울은 모서리에 충격이 가해지지 않게 다뤄주세요.',
          ],
        ],
        href: 'list.html',
      },
      '구매 전 체크리스트': {
        image: 11,
        kicker: 'MEASURE ONCE, LIVE WELL',
        title: '놓을 자리부터<br>들어오는 길까지.',
        intro: '가구를 주문하기 전, 줄자로 몇 군데만 확인하면 선택이 훨씬 쉬워집니다.',
        items: [
          [
            '01 · 설치 공간',
            '가로·세로·높이를 재고 콘센트, 걸레받이, 난방 기구와 간섭이 없는지 확인하세요.',
          ],
          [
            '02 · 반입 동선',
            '현관문, 복도, 계단의 폭과 엘리베이터 내부 치수를 확인하세요. 큰 가구는 대각선 여유도 필요합니다.',
          ],
          [
            '03 · 구성과 옵션',
            '매트리스와 전구, 연출 소품은 기본 구성에서 제외됩니다. 선택한 컬러와 케어 키트 포함 여부를 주문 요약에서 확인하세요.',
          ],
        ],
        href: 'list.html',
      },
      '배송과 설치': {
        image: 5,
        kicker: 'FROM OUR NEST TO YOURS',
        title: '도착하는 순간까지<br>차분하게 준비해요.',
        intro:
          '가구는 전문 설치배송 7–14일, 조명과 소품은 택배배송 3–5일을 기준으로 구성한 콘셉트입니다. 실제 결제와 출고는 진행하지 않습니다.',
        items: [
          ['배송 전', '설치 공간을 비우고 바닥 보호와 반입 동선을 확인해주세요.'],
          ['수령 시', '포장 상태, 구성품, 표면 마감과 흔들림을 함께 확인해주세요.'],
          [
            '교환과 주문 취소',
            '실제 구매 시 적용되는 판매자의 교환·반품 조건을 주문 전에 확인하는 것이 좋습니다. NESTO 체험 주문은 MY NESTO에서 취소할 수 있습니다.',
          ],
        ],
        href: 'list.html',
      },
    };
    let body;
    if (topics[title]) {
      const t = topics[title];
      body =
        photo(products[t.image].image, products[t.image].name) +
        '<small>' +
        t.kicker +
        '</small><h3>' +
        t.title +
        '</h3><p>' +
        t.intro +
        '</p><div class="n-info-grid">' +
        t.items.map(([h, p]) => '<article><h3>' + h + '</h3><p>' + p + '</p></article>').join('') +
        '</div><a class="n-btn" href="' +
        t.href +
        '">함께 살펴보기 ↗</a>';
    } else if (/혜택|쿠폰|이벤트/.test(title))
      body =
        '<small>A LITTLE WELCOME</small><h3>처음 만나는 NESTO.</h3><p>마음에 둔 가구가 있다면, 웰컴 쿠폰으로 조금 더 가볍게 시작해보세요.</p><div class="n-coupon"><strong>5%</strong><p>최대 30,000원 · 장바구니 상품 금액에 적용<br>한 주문당 1회 · 체험용 혜택</p><button class="n-btn" data-action="coupon">' +
        (state.coupon ? '쿠폰 보유 중' : '웰컴 쿠폰 받기') +
        '</button></div><a class="n-btn n-btn-outline" href="list.html?filter=sale">좋은 가격의 가구 보기 ↗</a>';
    else if (title === '문의하기')
      body =
        '<form class="n-form" data-contact-form><p>가구 선택, 소재 관리, 사이트 이용에 관한 내용을 남겨보세요. 작성 내용은 이 브라우저에만 저장되며 외부로 전송되지 않습니다.</p><label>문의 제목<input name="title" required maxlength="80"></label><label>내용<textarea name="body" required maxlength="1000" rows="5"></textarea></label><button class="n-btn">문의 기록 저장</button></form>';
    else if (title === '자주 묻는 질문')
      body =
        '<h3>어떤 점이 궁금하세요?</h3>' +
        [
          [
            '상품 컬러를 직접 고를 수 있나요?',
            '상세페이지에서 컬러와 구성을 선택할 수 있습니다. 이미지는 대표 컬러 기준이며, 다른 컬러는 선택 내용과 주문 요약에 표시됩니다.',
          ],
          [
            '장바구니는 어디에 저장되나요?',
            '같은 브라우저에서는 새로고침 후에도 유지됩니다. 다른 기기와 동기화되지는 않습니다.',
          ],
          [
            '주문 후 취소는 어떻게 하나요?',
            '체험 주문을 완료한 뒤 MY NESTO의 주문 내역에서 취소할 수 있습니다. 실제 결제와 배송은 발생하지 않습니다.',
          ],
          [
            '침대에 매트리스가 포함되나요?',
            '침대는 프레임 단품입니다. 매트리스는 별도이며 상세페이지에 적힌 규격을 확인해주세요.',
          ],
        ]
          .map(([q, a]) => '<details><summary>' + q + '</summary><p>' + a + '</p></details>')
          .join('');
    else if (/이용|개인정보/.test(title))
      body =
        '<h3>편안하게 둘러보세요.</h3><p>NESTO는 GAON KIM의 가상 가구 브랜드 디자인 프로젝트입니다. 상품·가격·배송 정보와 리뷰는 콘셉트 시연을 위한 예시이며 실제 판매, 결제, 배송, 회원 인증은 진행하지 않습니다.</p><p>상품 이미지는 NESTO의 디자인 방향에 맞춰 제작한 AI 생성 콘셉트 이미지입니다. 리뷰는 실제 구매자의 후기가 아닙니다.</p><p>찜, 장바구니, 닉네임, 체험 주문과 문의는 현재 브라우저의 로컬 저장소에 보관합니다. 서버나 외부 서비스로 전송하지 않습니다. 공용 기기에서는 사용 후 기록을 초기화해주세요.</p><button class="n-btn n-btn-outline" data-reset-state>체험 기록 초기화</button>';
    else
      body =
        photo(0, '햇살이 드는 NESTO 거실') +
        '<small>MAKE YOURSELF AT HOME.</small><h3>집에서 보내는 시간을<br>조금 더 좋아하도록.</h3><p>NESTO는 집을 가장 편안한 나의 자리로 바라봅니다. 둥근 실루엣, 손길이 닿는 소재, 밝은 빛과 작은 색의 포인트. 익숙한 일상에 오래 머무는 가구를 제안합니다.</p><div class="n-info-grid"><article><h3>편안한 형태</h3><p>시선을 압도하기보다 생활 속에 자연스럽게 놓이는 비율과 곡선을 생각합니다.</p></article><article><h3>기분 좋은 색</h3><p>크림과 우드의 차분한 바탕에 오렌지빛 조명, 작은 소품의 생기를 더합니다.</p></article></div><a class="n-btn" href="list.html">NESTO 컬렉션 만나기 ↗</a>';
    openDialog(title, '<article class="n-content">' + body + '</article>');
  }
  function updateBadges() {
    $$('[data-action="cart"]').forEach((a) => {
      let badge = $('.n-count', a);
      if (!badge) {
        badge = document.createElement('b');
        badge.className = 'n-count';
        a.append(badge);
      }
      badge.textContent = state.cart.reduce((sum, row) => sum + row.qty, 0);
    });
  }
  function action(name) {
    if (name === 'search') search();
    else if (name === 'cart') showCart();
    else if (name === 'account') showAccount();
    else if (name === 'wishlist') showWishlist();
    else if (name === 'coupon') {
      const already = state.coupon;
      state.coupon = true;
      save();
      toast(
        already
          ? '이미 받은 쿠폰입니다. 장바구니에 자동 적용됩니다.'
          : '웰컴 쿠폰을 받았습니다. 장바구니에 자동 적용됩니다.',
      );
      if (modal.open && $('#n-modal-title').textContent === '장바구니') showCart();
      $$('[data-action="coupon"]').forEach((b) => {
        if (!b.closest('.n-notice')) b.textContent = '쿠폰 보유 중';
      });
    }
  }
  function navigation() {
    $$('.user-menu a').forEach((a) => {
      const label = a.textContent.trim();
      if (/회원가입/.test(label)) {
        a.closest('li').remove();
        return;
      }
      a.href = '#';
      a.dataset.action = /검색/.test(label)
        ? 'search'
        : /장바구니/.test(label)
          ? 'cart'
          : /찜/.test(label)
            ? 'wishlist'
            : 'account';
      if (/로그인/.test(label)) {
        a.dataset.action = 'wishlist';
        $('span', a).textContent = '찜한 상품';
        $('img', a).src = 'img/heart-1.svg';
        $('img', a).alt = '찜한 상품';
      } else if (/마이페이지/.test(label)) $('span', a).textContent = 'MY NESTO';
    });
    $$('footer a').forEach((a) => {
      const label = a.textContent.trim() || $('img', a)?.alt || 'NESTO';
      a.href = '#';
      a.dataset.content = label;
    });
    $$('footer .coinfo').forEach(
      (dl) =>
        (dl.innerHTML =
          '<dt>PROJECT</dt><dd>NESTO · FURNITURE & LIFESTYLE</dd><dt>DESIGN</dt><dd>GAON KIM</dd><dt>TYPE</dt><dd>개인 포트폴리오 · 웹 디자인</dd><dt>NOTICE</dt><dd>실제 판매·결제가 발생하지 않는 체험 사이트입니다.</dd>'),
    );
    $$('footer .cscenter').forEach(
      (el) =>
        (el.innerHTML =
          '<div class="cscon"><h2>MAKE YOURSELF AT HOME.</h2><p>좋은 가구가 만드는, 기분 좋은 일상.</p><button data-content="문의하기">CONTACT NESTO ↗</button></div>'),
    );
    $$('footer .copy').forEach(
      (el) =>
        (el.textContent =
          '© 2026 NESTO · CONCEPT DESIGN BY GAON KIM. 포트폴리오용 체험 사이트입니다.'),
    );
    const smart = $('.smart-header .common-frame');
    if (smart)
      smart.insertAdjacentHTML(
        'beforeend',
        '<div class="n-mobile-tools"><button data-action="search" aria-label="상품 검색"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="6"/><path d="m15 15 6 6"/></svg></button><button data-action="cart" aria-label="장바구니"><svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 8h14l1 13H4L5 8Z"/><path d="M9 8V5a3 3 0 0 1 6 0v3"/></svg></button></div>',
      );
    const overlay = $('.smart-overlay-menu'),
      open = $('.btn-menu'),
      close = $('.btn-menu-close');
    let savedOverflow = '';
    function closeMenu() {
      overlay.classList.remove('on');
      overlay.inert = true;
      overlay.setAttribute('aria-hidden', 'true');
      open?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = savedOverflow;
      open?.focus();
    }
    if (overlay && open) {
      overlay.inert = true;
      overlay.setAttribute('aria-hidden', 'true');
      overlay.setAttribute('role', 'dialog');
      overlay.setAttribute('aria-label', '전체 메뉴');
      overlay.setAttribute('aria-modal', 'true');
      overlay.id = 'n-mobile-menu';
      open.setAttribute('aria-controls', 'n-mobile-menu');
      open.setAttribute('aria-expanded', 'false');
      open.setAttribute('role', 'button');
      open.tabIndex = 0;
      open.onclick = (e) => {
        e.preventDefault();
        savedOverflow = document.body.style.overflow;
        overlay.inert = false;
        overlay.classList.add('on');
        overlay.setAttribute('aria-hidden', 'false');
        open.setAttribute('aria-expanded', 'true');
        document.body.style.overflow = 'hidden';
        close?.focus();
      };
      if (close) {
        close.setAttribute('role', 'button');
        close.tabIndex = 0;
        close.setAttribute('aria-label', '메뉴 닫기');
        close.onclick = (e) => {
          e.preventDefault();
          closeMenu();
        };
      }
      const tabs = $$('.gnb-smart>li'),
        panels = $$('.gnb2depth-smart');
      tabs.forEach((li, i) => {
        const a = $(':scope>a', li);
        if (!a || i === 0) return;
        a.onclick = (e) => {
          e.preventDefault();
          e.stopPropagation();
          tabs.forEach((t) => t.classList.toggle('on', t === li));
          panels.forEach((p, j) => p.classList.toggle('on', j === i - 1));
        };
      });
      overlay.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          e.preventDefault();
          e.stopPropagation();
          closeMenu();
        }
        if (e.key === 'Tab') {
          const items = $$('a,button,input,select,[tabindex="0"]', overlay).filter(
            (x) => x.getClientRects().length && !x.disabled,
          );
          const first = items[0],
            last = items.at(-1);
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      });
      overlay.addEventListener('click', (e) => {
        const a = e.target.closest('[data-action],[data-content]');
        if (a && !a.closest('.gnb-smart')) closeMenu();
      });
    }
    $$('.gnb>li').forEach((li) => {
      const trigger = $(':scope>a', li),
        panel = $('.gnb2depth', li);
      if (!trigger || !panel) return;
      trigger.setAttribute('aria-haspopup', 'true');
      li.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          li.classList.add('n-menu-dismiss');
          trigger.focus();
        }
        if (e.key === 'ArrowDown') {
          e.preventDefault();
          li.classList.remove('n-menu-dismiss');
          $('a', panel)?.focus();
        }
      });
      li.addEventListener('pointerenter', () => li.classList.remove('n-menu-dismiss'));
      li.addEventListener('focusin', () => li.classList.remove('n-menu-dismiss'));
    });
    updateBadges();
  }
  document.addEventListener('click', (e) => {
    const el = e.target.closest('button,a');
    if (!el) return;
    if (el.hasAttribute('data-continue')) {
      modal.close();
    } else if (el.dataset.action) {
      e.preventDefault();
      action(el.dataset.action);
    } else if (el.dataset.content) {
      e.preventDefault();
      content(el.dataset.content);
    } else if (el.hasAttribute('data-like')) {
      e.preventDefault();
      const id = Number(el.dataset.like);
      state.likes = state.likes.includes(id)
        ? state.likes.filter((x) => x !== id)
        : [...state.likes, id];
      save();
      $$('[data-like="' + id + '"]').forEach((b) => {
        b.setAttribute('aria-pressed', String(state.likes.includes(id)));
        b.innerHTML = iconHeart(state.likes.includes(id));
      });
      $$('[data-like-count="' + id + '"]').forEach(
        (b) =>
          (b.textContent = '♡ ' + (productById(id).likes + (state.likes.includes(id) ? 1 : 0))),
      );
      toast(
        state.likes.includes(id) ? '좋아하는 가구에 저장했습니다.' : '찜 목록에서 삭제했습니다.',
      );
      if (modal.open && $('#n-modal-title').textContent === '좋아하는 가구') showWishlist();
    } else if (el.hasAttribute('data-rail-step')) {
      const rail = $('.n-rail', el.closest('.n-section'));
      rail?.scrollBy({
        left: Number(el.dataset.railStep) * rail.clientWidth * 0.8,
        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth',
      });
    } else if (el.hasAttribute('data-cart-step')) {
      const row = state.cart[Number(el.dataset.row)];
      if (row) {
        row.qty = Math.max(1, Math.min(99, row.qty + Number(el.dataset.cartStep)));
        save();
        updateBadges();
        showCart();
      }
    } else if (el.hasAttribute('data-cart-remove')) {
      state.cart.splice(Number(el.dataset.cartRemove), 1);
      save();
      updateBadges();
      showCart();
    } else if (el.hasAttribute('data-checkout')) {
      if (state.cart.length) checkout(state.cart, true);
    } else if (el.hasAttribute('data-order-confirm') && pendingOrder) {
      const order = pendingOrder;
      pendingOrder = null;
      const total = cartTotal(order.rows).total;
      state.orders.unshift({
        number: 'N' + Date.now(),
        date: new Date().toLocaleDateString('ko-KR'),
        names: order.rows.map((row) => productById(row.id).name + ' ' + row.qty + '개').join(', '),
        total,
        cancelled: false,
      });
      if (order.fromCart) state.cart = [];
      save();
      updateBadges();
      openDialog(
        '체험 주문이 완료되었습니다.',
        '<div class="n-empty"><h3>THANK YOU, MAKE YOURSELF AT HOME.</h3><p>실제 결제와 배송은 발생하지 않습니다.</p><p>주문 금액 ' +
          money(total) +
          '</p><button class="n-btn" data-action="account">마이페이지 보기</button></div>',
      );
    } else if (el.hasAttribute('data-order-cancel')) {
      const order = state.orders[Number(el.dataset.orderCancel)];
      if (order) {
        order.cancelled = true;
        save();
        showAccount();
        toast('체험 주문을 취소했습니다.');
      }
    } else if (el.hasAttribute('data-signout')) {
      state.profile = null;
      save();
      showAccount();
    } else if (el.hasAttribute('data-review-more')) {
      const open = el.getAttribute('aria-expanded') !== 'true';
      el.setAttribute('aria-expanded', String(open));
      el.previousElementSibling.classList.toggle('expanded', open);
      el.textContent = open ? '접기 ↑' : '더보기 ↓';
    } else if (el.hasAttribute('data-review-shot')) {
      const productId = Number(el.dataset.reviewProduct),
        shot = Number(el.dataset.reviewShot),
        product = productById(productId);
      openDialog(
        '리뷰 사진',
        reviewPhoto(
          productId,
          shot,
          (product?.name || '상품') + ' 확대 리뷰 사진',
          'n-review-photo-large',
        ),
      );
    } else if (el.hasAttribute('data-helpful')) {
      const id = el.dataset.helpful;
      state.helpful = state.helpful.includes(id)
        ? state.helpful.filter((x) => x !== id)
        : [...state.helpful, id];
      save();
      el.setAttribute('aria-pressed', String(state.helpful.includes(id)));
      el.textContent = '도움이 돼요 ' + (state.helpful.includes(id) ? 1 : 0);
    } else if (el.hasAttribute('data-report'))
      openDialog(
        '리뷰 신고·차단',
        '<form class="n-form" data-report-form data-review="' +
          el.dataset.report +
          '"><p>체험용 신고 화면입니다. 외부로 전송되지 않습니다.</p><label>사유<select name="reason"><option>상품과 관련 없는 내용</option><option>부적절한 내용</option><option>이 리뷰 숨기기</option></select></label><button class="n-btn">확인</button></form>',
      );
    else if (el.hasAttribute('data-question'))
      openDialog(
        '상품 문의하기',
        '<form class="n-form" data-question-form><p>' +
          esc(currentProduct.name) +
          '</p><label>닉네임<input name="name" maxlength="24" required value="' +
          esc(state.profile?.name || '') +
          '"></label><label>제목<input name="title" maxlength="80" required></label><label>문의 내용<textarea name="body" maxlength="1000" rows="5" required></textarea></label><p class="n-caption">문의는 이 브라우저에만 저장됩니다. 연락처 등 개인정보는 입력하지 마세요.</p><button class="n-btn">문의 등록</button></form>',
      );
    else if (el.hasAttribute('data-reset-state'))
      openDialog(
        '체험 기록 초기화',
        '<p>이 브라우저의 찜·장바구니·프로필·주문·문의 기록을 모두 지울까요?</p><button class="n-btn" data-reset-confirm>초기화하기</button>',
      );
    else if (el.hasAttribute('data-reset-confirm')) {
      try {
        localStorage.removeItem('nesto-shop-v2');
      } catch {}
      location.reload();
    }
  });
  document.addEventListener('submit', (e) => {
    const form = e.target;
    if (form.matches('[data-profile-form]')) {
      e.preventDefault();
      const name = new FormData(form).get('name').trim();
      if (!name) {
        toast('닉네임을 입력해주세요.');
        return;
      }
      state.profile = { name: name.slice(0, 24) };
      save();
      showAccount();
    } else if (form.matches('[data-question-form]')) {
      e.preventDefault();
      const data = new FormData(form);
      if (!['name', 'title', 'body'].every((k) => String(data.get(k)).trim())) {
        toast('모든 항목을 입력해주세요.');
        return;
      }
      state.questions.unshift({
        product: currentProduct.id,
        name: String(data.get('name')).trim().slice(0, 24),
        title: String(data.get('title')).trim().slice(0, 80),
        body: String(data.get('body')).trim().slice(0, 1000),
      });
      save();
      renderQuestions();
      modal.close();
      toast('문의가 등록되었습니다.');
    } else if (form.matches('[data-report-form]')) {
      e.preventDefault();
      if (new FormData(form).get('reason') === '이 리뷰 숨기기')
        $$('.n-review')[Number(form.dataset.review)].hidden = true;
      modal.close();
      toast('리뷰 신고·차단 체험이 완료되었습니다.');
    } else if (form.matches('[data-contact-form]')) {
      e.preventDefault();
      const data = new FormData(form);
      const title = String(data.get('title')).trim(),
        body = String(data.get('body')).trim();
      if (!title || !body) {
        toast('제목과 내용을 입력해주세요.');
        return;
      }
      state.questions.unshift({
        product: null,
        name: state.profile?.name || '게스트',
        title: title.slice(0, 80),
        body: body.slice(0, 1000),
      });
      save();
      openDialog(
        '문의 기록을 저장했어요.',
        '<h3>' +
          esc(title) +
          '</h3><p>' +
          esc(body) +
          '</p><p class="n-caption">현재 브라우저에만 보관됩니다. 실제 접수 또는 외부 전송은 발생하지 않습니다.</p>',
      );
    }
  });
  navigation();
  if (page === 'product.html') detail();
  else if (page === 'list.html') catalog();
  else home();
  window.parent.postMessage(
    {
      type: 'nesto:navigate',
      page: page === 'list.html' ? 'list' : page === 'product.html' ? 'product' : 'home',
    },
    '*',
  );
})();
