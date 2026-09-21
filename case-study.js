(() => {
  const root = document.querySelector('.case-study');
  if (!root) return;
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  root.querySelectorAll('[data-case-jump]').forEach(button => button.addEventListener('click', event => {
    event.preventDefault();
    const section = root.querySelector(`[data-team-section="${button.dataset.caseJump}"]`);
    if (section) root.scrollTo({top:section.offsetTop, behavior:reduced() ? 'instant' : 'smooth'});
  }));
  const range = root.querySelector('[data-compare-range]');
  root.querySelectorAll('[data-compare-set]').forEach(button => button.addEventListener('click', () => {
    range.value = button.dataset.compareSet;
    range.dispatchEvent(new Event('input', {bubbles:true}));
  }));
  const stories = [
    {image:'home-desktop-first.png', ratio:'1600 / 1000', alt:'상단 카테고리 메뉴 띠가 포함된 이솝 리디자인 첫 홈 화면', label:'HOME / MAIN VISUAL', title:'설명보다 제품이\n먼저 보이도록.', body:'첫 화면에는 긴 문장을 넣지 않고 제품과 식물 이미지를 크게 사용했습니다. 메뉴는 밝은 상단 바에 따로 두어, 이미지가 바뀌어도 탐색 영역이 흐려지지 않게 했습니다.', detail:'큰 메인 이미지 · 상단 메뉴 분리 · 설명 요소 최소화', x:'15%', y:'40%', position:'50% 0%'},
    {image:'product-list.png', ratio:'5 / 3', alt:'전체 제품 페이지의 큰 제목과 카테고리 진입부', label:'CATALOG / CONTENT ORDER', title:'목록에 들어왔다는 것을\n먼저 알 수 있도록.', body:'제품을 보기 전에 현재 페이지를 바로 파악할 수 있도록 ALL PRODUCTS를 가장 크게 두었습니다. 설명은 그 아래에 짧게 붙이고, 이미지 다음에는 흰 배경과 구분선으로 카테고리 시작점을 만들었습니다.', detail:'큰 페이지 제목 · 짧은 설명 · 카테고리 영역 분리', x:'18%', y:'82%', position:'50% 0%'},
    {image:'product-detail.png', ratio:'5 / 3', alt:'제품 상세 화면의 이미지와 제품 정보, 구매 영역', label:'PRODUCT / INFORMATION ORDER', title:'제품을 확인한 뒤\n옵션을 고를 수 있도록.', body:'제품 사진은 왼쪽에 크게 두고, 오른쪽에는 제품명과 가격, 용량, 수량, 구매 버튼 순서로 정보를 모았습니다. 정보 사이의 간격을 나눠 한 번에 너무 많은 항목이 보이지 않도록 했습니다.', detail:'왼쪽 제품 이미지 · 오른쪽 구매 정보 · 항목별 간격', x:'74%', y:'70%', position:'50% 0%'},
    {image:'promotion-citrus.png', ratio:'1424 / 1592', alt:'시트러스 프로모션의 대표 세트와 구성 제품', label:'PROMOTION / IMAGE SCALE', title:'세트와 단품을\n크기로 구분했습니다.', body:'대표 세트는 왼쪽에 크게 보여 주고 가격과 버튼을 가까이 배치했습니다. 개별 제품은 오른쪽의 같은 크기 카드로 나눠, 세트 구성과 각 제품 정보를 따로 확인할 수 있게 했습니다.', detail:'큰 세트 이미지 · 2열 제품 카드 · 이름과 가격 정렬', x:'65%', y:'53%', position:'50% 0%'}
  ];
  root.querySelectorAll('[data-case-choice]').forEach(button => button.addEventListener('click', () => {
    const index = Number(button.dataset.caseChoice), story = stories[index];
    root.querySelectorAll('[data-case-choice]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    const img = root.querySelector('[data-case-image]');
    if (img) { img.src = `assets/aesop/${story.image}`; img.alt = story.alt; img.style.aspectRatio = story.ratio; img.style.objectPosition = story.position; }
    const focus = root.querySelector('[data-case-focus]');
    focus.textContent = String(index + 1).padStart(2,'0'); focus.style.left = story.x; focus.style.top = story.y;
    ['label','title','body','detail'].forEach(key => root.querySelector(`[data-case-note-${key}]`).textContent = story[key]);
  }));
  root.querySelector('[data-case-focus]').addEventListener('click', () => {
    const current = root.querySelector('[data-case-choice][aria-pressed="true"]');
    root.querySelectorAll('[data-case-choice]')[(Number(current.dataset.caseChoice) + 1) % stories.length].click();
  });
  const stage = root.querySelector('[data-case-live-stage]');
  const viewport = root.querySelector('[data-case-viewport]');
  const frame = root.querySelector('[data-case-frame]');
  const coverViewport = root.querySelector('[data-case-cover-viewport]');
  const coverFrame = root.querySelector('[data-case-cover-frame]');
  const poster = root.querySelector('[data-case-poster]');
  const launch = root.querySelector('[data-case-launch]');
  const status = root.querySelector('[data-case-status]');
  const url = 'https://octos8.github.io/Aesop-projects/';
  let started = false, loadTimer;
  const resizeCover = () => {
    if (!coverViewport || !coverFrame) return;
    coverFrame.style.transform = `scale(${coverViewport.clientWidth / 1600})`;
  };
  const resize = () => {
    const mobile = stage.dataset.device === 'mobile';
    // Match the live site's actual design canvases. Using a narrower desktop
    // iframe made the site's 1600px layout overflow and crop both edges.
    const width = mobile ? 402 : 1600, height = mobile ? 874 : 1000;
    frame.style.width = `${width}px`; frame.style.height = `${height}px`;
    frame.style.transform = `scale(${viewport.clientWidth / width})`;
  };
  if (coverViewport) new ResizeObserver(resizeCover).observe(coverViewport);
  resizeCover();
  new ResizeObserver(resize).observe(viewport);
  const start = () => {
    started = true; frame.hidden = false; poster.hidden = true; launch.hidden = true;
    status.textContent = '사이트를 불러오는 중입니다. 표시되지 않으면 위의 새 창 링크를 이용해 주세요.';
    frame.src = url; resize();
    clearTimeout(loadTimer);
    loadTimer = setTimeout(() => { status.textContent = '화면이 표시되지 않으면 ‘새 창에서 열기’로 접속해 주세요.'; }, 15000);
  };
  frame.addEventListener('load', () => {
    if (!started) return;
    clearTimeout(loadTimer);
    status.textContent = '화면 안에서 클릭·스크롤할 수 있습니다. 표시되지 않으면 새 창에서 열어 주세요.';
  });
  launch.addEventListener('click', start);
  root.querySelector('[data-case-reset]').addEventListener('click', () => { if (started) start(); });
  root.querySelectorAll('[data-case-device]').forEach(button => button.addEventListener('click', () => {
    const mobile = button.dataset.caseDevice === 'mobile';
    stage.dataset.device = button.dataset.caseDevice;
    root.querySelectorAll('[data-case-device]').forEach(item => item.setAttribute('aria-pressed', String(item === button)));
    poster.src = mobile ? 'assets/aesop/home-mobile.png' : 'assets/aesop/hero-banner.jpg';
    root.querySelector('[data-case-device-label]').textContent = mobile ? '모바일 / 필요한 메뉴만 남기고 세로로' : 'PC / 이미지와 정보를 넓게 분리';
    root.querySelector('[data-case-device-note]').textContent = mobile ? '가로 메뉴는 아이콘으로 줄이고 로고를 가운데 두었습니다. 제품 이미지를 먼저 보여 준 뒤 프로모션과 다음 콘텐츠가 한 방향으로 이어지게 했습니다.' : '가로 메뉴는 한 줄로 펼치고, 큰 이미지 안에서도 제품 주변의 여백이 충분히 남도록 구성했습니다.';
    resize();
  }));
})();
