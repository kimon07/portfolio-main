(() => {
  const embedded = window.parent !== window;
  const parentOrigin = location.origin === 'null' ? '*' : location.origin;
  if (embedded) document.body.classList.add('embedded');

  // A living scene changes only when requested. All scenes remain readable without JS.
  const lifeTabs = [...document.querySelectorAll('[data-life]')];
  const lifePanels = [...document.querySelectorAll('[data-life-panel]')];
  function selectLife(name, focus = false) {
    if (!lifePanels.some(panel => panel.dataset.lifePanel === name)) return;
    lifeTabs.forEach(tab => {
      const selected = tab.dataset.life === name;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus({ preventScroll: true });
    });
    lifePanels.forEach(panel => { panel.hidden = panel.dataset.lifePanel !== name; });
  }
  if (lifeTabs.length) {
    lifePanels.forEach(panel => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'life-tab-' + panel.dataset.lifePanel);
      panel.tabIndex = 0;
    });
    selectLife('first');
    document.querySelector('.life-tabs').hidden = false;
    document.querySelector('[data-life-help]').hidden = false;
    document.querySelector('.life-panels').classList.add('is-enhanced');
    lifeTabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectLife(tab.dataset.life));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowDown') next = (index + 1) % lifeTabs.length;
        if (event.key === 'ArrowUp') next = (index - 1 + lifeTabs.length) % lifeTabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = lifeTabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        selectLife(lifeTabs[next].dataset.life, true);
      });
    });
  }

  // Progressive enhancement: without JS, every design explanation remains readable.
  const tabs = [...document.querySelectorAll('[data-choice]')];
  const panels = [...document.querySelectorAll('[data-panel]')];
  function selectChoice(choice, focus = false) {
    if (!panels.some(panel => panel.dataset.panel === choice)) return;
    tabs.forEach(tab => {
      const selected = tab.dataset.choice === choice;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
      if (selected && focus) tab.focus({ preventScroll: true });
    });
    panels.forEach(panel => { panel.hidden = panel.dataset.panel !== choice; });
  }
  if (tabs.length) {
    panels.forEach(panel => {
      panel.setAttribute('role', 'tabpanel');
      panel.setAttribute('aria-labelledby', 'tab-' + panel.dataset.panel);
      panel.tabIndex = 0;
    });
    selectChoice('color');
    document.querySelector('.decision-tabs').hidden = false;
    document.querySelector('.direction')?.classList.add('is-enhanced');
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => selectChoice(tab.dataset.choice));
      tab.addEventListener('keydown', event => {
        let next;
        if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
        if (event.key === 'ArrowLeft') next = (index - 1 + tabs.length) % tabs.length;
        if (event.key === 'Home') next = 0;
        if (event.key === 'End') next = tabs.length - 1;
        if (next === undefined) return;
        event.preventDefault();
        selectChoice(tabs[next].dataset.choice, true);
      });
    });
    document.querySelectorAll('[data-open-choice]').forEach(link => {
      link.addEventListener('click', () => selectChoice(link.dataset.openChoice, true));
    });
  }

  const frame = document.querySelector('[data-preview]');
  const stage = document.querySelector('.preview-stage');
  const shell = document.querySelector('.preview-shell');
  const viewport = document.querySelector('.preview-viewport');
  const screenButtons = [...document.querySelectorAll('[data-screen]')];
  const deviceButtons = [...document.querySelectorAll('[data-device]')];
  const mobileQuery = matchMedia('(max-width:700px)');
  const tabletQuery = matchMedia('(max-width:1024px)');
  const reducedMotion = matchMedia('(prefers-reduced-motion:reduce)');
  const defaultDevice = () => mobileQuery.matches ? 'mobile' : tabletQuery.matches ? 'pad' : 'pc';
  const widths = { pc:1440, pad:768, mobile:390 };
  const heights = { pc:900, pad:1024, mobile:844 };
  const deviceLabels = { pc:'PC', pad:'TABLET', mobile:'MOBILE' };
  const paths = { home:'index.html', list:'list.html?space=living', product:'product.html?id=1' };
  const experiences = {
    home: ['메인', '공간에서 시작하는 탐색', '‘SHOP BY SPACE’에서 거실을 골라보세요. 마음에 드는 공간이 관련 상품 목록으로 이어집니다.'],
    list: ['상품 목록', '같은 기준으로 나란히 비교', '카테고리·컬러 필터와 정렬을 바꿔보세요. 마음에 드는 상품을 누르면 소재와 치수를 확인할 수 있습니다.'],
    product: ['상품 상세', '사진에서 구체적인 선택으로', '사진을 넘기고 옵션·수량을 선택해 보세요. 아래로 스크롤하면 소재·치수·배송 정보를 확인할 수 있습니다.'],
  };
  const deviceNotes = {
    pc:'PC · 넓은 화면에서 이미지를 보고, 목록은 4열로 비교합니다.',
    pad:'TABLET · 목록을 3열로 조정하고, 메뉴를 접어 탐색 공간을 확보합니다.',
    mobile:'MOBILE · 목록은 2열, 상세는 사진 다음에 정보를 읽는 세로 배치입니다.',
  };
  let device = defaultDevice();
  let screen = 'home';
  let deviceSelected = false;
  let currentPath = paths.home;
  const setText = (selector, value) => {
    const element = document.querySelector(selector);
    if (element.textContent !== value) element.textContent = value;
  };
  function updateContext() {
    screenButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.screen === screen)));
    deviceButtons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.device === device)));
    setText('[data-size]', widths[device] + ' PX');
    setText('[data-experience-title]', experiences[screen][1]);
    setText('[data-experience-copy]', experiences[screen][2]);
    setText('[data-device-note]', deviceNotes[device]);
    setText('.preview-caption', deviceLabels[device] + ' · ' + experiences[screen][0] + ' — 화면 안에서 스크롤하며 직접 살펴보세요.');
    frame.title = 'NESTO ' + experiences[screen][0] + ' · ' + deviceLabels[device] + ' 사이트 체험';
    document.querySelector('.nesto-open-site a').href = 'nesto-shop/' + currentPath;
  }
  function resize() {
    const style = getComputedStyle(stage);
    const available = Math.max(1, stage.clientWidth - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight) - 2);
    const width = widths[device];
    const height = heights[device];
    const scale = Math.min(1, available / width);
    shell.style.width = width * scale + 2 + 'px';
    viewport.style.width = width * scale + 'px';
    viewport.style.height = height * scale + 'px';
    frame.style.width = width + 'px';
    frame.style.height = height + 'px';
    frame.style.transform = 'scale(' + scale + ')';
    stage.dataset.previewDevice = device;
  }
  deviceButtons.forEach(button => button.addEventListener('click', () => {
    deviceSelected = true;
    device = button.dataset.device;
    resize();
    updateContext();
  }));
  screenButtons.forEach(button => button.addEventListener('click', () => {
    screen = button.dataset.screen;
    currentPath = paths[screen];
    frame.src = 'nesto-shop/' + currentPath;
    updateContext();
  }));
  document.querySelectorAll('[data-preview-link]').forEach(link => {
    link.addEventListener('click', event => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
      const nextScreen = link.dataset.previewScreen;
      const nextDevice = link.dataset.previewDevice;
      if (!Object.prototype.hasOwnProperty.call(paths, nextScreen)) return;
      // Keep filters, options and scroll position when this screen is already open.
      if (screen !== nextScreen) {
        screen = nextScreen;
        currentPath = paths[screen];
        frame.src = 'nesto-shop/' + currentPath;
      }
      if (Object.prototype.hasOwnProperty.call(widths, nextDevice)) {
        deviceSelected = true;
        device = nextDevice;
        resize();
      }
      updateContext();
      // The anchor's native #preview navigation also works without JavaScript.
    });
  });
  function syncFrame() {
    try {
      const url = new URL(frame.contentWindow.location.href);
      const page = url.pathname.split('/').pop();
      const next = { 'index.html':'home', 'list.html':'list', 'product.html':'product' }[page];
      if (!next) return;
      screen = next;
      currentPath = page + url.search + url.hash;
      // Keep the case-study calm; visitors can explicitly start the shop's slider.
      const pause = frame.contentDocument.querySelector('[data-slide-pause]');
      if (pause?.getAttribute('aria-label') === '자동 재생 일시정지') pause.click();
      updateContext();
    } catch { /* The standalone shop link stays available if the frame is inaccessible. */ }
  }
  frame.addEventListener('load', syncFrame);
  // Filters update history without reloading; resolve their current URL at opening time.
  document.querySelector('.nesto-open-site a').addEventListener('click', syncFrame);
  window.addEventListener('message', event => {
    if (event.source === frame.contentWindow && event.origin === location.origin && event.data?.type === 'nesto:navigate') syncFrame();
  });
  const adapt = () => {
    if (!deviceSelected) device = defaultDevice();
    resize();
    updateContext();
  };
  mobileQuery.addEventListener('change', adapt);
  tabletQuery.addEventListener('change', adapt);
  if ('ResizeObserver' in window) new ResizeObserver(resize).observe(stage);
  else window.addEventListener('resize', resize);
  resize();
  updateContext();

  const screenDialog = document.querySelector('[data-screen-dialog]');
  if (screenDialog && typeof screenDialog.showModal === 'function') {
    const screenImage = screenDialog.querySelector('[data-screen-image]');
    const screenTitle = screenDialog.querySelector('[data-screen-title]');
    let screenOpener = null;
    let previousOverflow = '';
    document.querySelectorAll('[data-screen-zoom]').forEach(button => {
      button.hidden = false;
      button.addEventListener('click', () => {
        if (!button.dataset.image || screenDialog.open) return;
        screenOpener = button;
        screenImage.src = button.dataset.image;
        screenImage.alt = button.dataset.alt || button.dataset.title || 'NESTO 구현 화면';
        screenTitle.textContent = button.dataset.title || 'NESTO 구현 화면';
        previousOverflow = document.body.style.overflow;
        screenDialog.showModal();
        document.body.style.overflow = 'hidden';
        screenDialog.querySelector('.screen-dialog__body').scrollTo(0, 0);
      });
    });
    screenDialog.querySelector('[data-screen-close]').addEventListener('click', () => screenDialog.close());
    screenDialog.addEventListener('click', event => {
      if (event.target !== screenDialog) return;
      const bounds = screenDialog.getBoundingClientRect();
      if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) {
        screenDialog.close();
      }
    });
    screenDialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow;
      if (screenOpener?.isConnected) screenOpener.focus({ preventScroll: true });
      screenOpener = null;
    });
  }

  document.querySelectorAll('[data-back]').forEach(link => link.addEventListener('click', event => {
    if (!embedded) return;
    event.preventDefault();
    window.parent.postMessage({ type:'nesto:close' }, parentOrigin);
  }));
  window.addEventListener('keydown', event => {
    if (event.key === 'Escape' && embedded && !document.querySelector('dialog[open]')) window.parent.postMessage({ type:'nesto:close' }, parentOrigin);
  });
  if ('IntersectionObserver' in window && !reducedMotion.matches) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }), { threshold:.12 });
    document.querySelectorAll('[data-reveal]').forEach(element => {
      element.classList.add('will-reveal');
      observer.observe(element);
    });
    reducedMotion.addEventListener('change', event => {
      if (!event.matches) return;
      observer.disconnect();
      document.querySelectorAll('[data-reveal]').forEach(element => element.classList.add('is-visible'));
    });
  }
})();
