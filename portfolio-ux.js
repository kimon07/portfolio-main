/* Shared reading and navigation tools for the existing portfolio pages. */
(() => {
  const isPortfolio = typeof portfolioScene !== 'undefined';
  const reduced = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const routes = { home: ['WORKS', '그래픽 · 콘텐츠 디자인'], about: ['ABOUT', '소개 · 스킬'], personal: ['PERSONAL PROJECT', 'NESTO · 가구 쇼핑몰'], team: ['TEAM PROJECT', 'AESOP · 웹 리디자인'] };
  const routeHashes = { home:'works', about:'about', personal:'personal-project', team:'team-project' };
  const routeUrls = { home:'index.html#works', about:'index.html#about', personal:'nesto.html', team:'index.html#team-project' };
  const directory = document.createElement('dialog');
  directory.className = 'reader-directory';
  directory.setAttribute('aria-label', '포트폴리오 전체 메뉴');
  directory.innerHTML = `<header><span>GAON KIM / PORTFOLIO</span><button type="button" data-directory-close>닫기 ×</button></header><nav aria-label="포트폴리오 영역">${Object.entries(routes).map(([route, [label, note]], i) => `<a href="${routeUrls[route]}" data-portfolio-route="${route}"><small>0${i + 1}</small><strong>${label}</strong><span>${note}</span><i aria-hidden="true">↗</i></a>`).join('')}</nav>`;
  document.body.append(directory);
  directory.querySelector('[data-directory-close]').addEventListener('click', () => directory.close());
  directory.addEventListener('click', event => { if (event.target === directory) directory.close(); });

  function openDirectory() { if (!directory.open) directory.showModal(); }
  async function closeDirectoryForNavigation() {
    if (!directory.open) return;
    directory.classList.add('is-closing');
    if (!reduced()) await new Promise(resolve => setTimeout(resolve, 220));
    directory.close();
    directory.classList.remove('is-closing');
  }
  let routing = false;
  async function navigate(route) {
    if (!routes[route] || routing) return;
    routing = true;
    await closeDirectoryForNavigation();
    if (!isPortfolio) {
      if (window.parent !== window && route !== 'personal') {
        window.parent.postMessage({ type: 'portfolio:navigate', route }, location.origin === 'null' ? '*' : location.origin);
      } else location.href = routeUrls[route];
      routing = false;
      return;
    }
    if (route === 'personal') {
      location.href = routeUrls.personal;
      return;
    }
    document.querySelector('.works-directory')?.close();
    const nestoDialog = document.querySelector('[data-nesto-dialog]');
    if (nestoDialog?.open) nestoDialog.close();
    const scene = portfolioScene;
    scene.closeMenu();
    scene.closeTeamProject(true);
    scene.closeProfile(true);
    scene.closeProjectView(true);
    if (scene.contactOpen) {
      scene.closeContact(true);
      await new Promise(resolve => setTimeout(resolve, reduced() ? 20 : 1000));
    }
    const hash = routeHashes[route];
    history.pushState({ route: hash }, '', `#${hash}`);
    scene.setIntro(false);
    if (route === 'about') scene.openProfile(false);
    else if (route === 'team') scene.openTeamProject(false);
    else {
      scene.setProjectFilter('all');
      document.querySelector('[data-category-open="all"]')?.focus({preventScroll:true});
    }
    routing = false;
  }

  document.addEventListener('click', event => {
    const menu = event.target.closest('[data-reader-menu]');
    if (menu) { openDirectory(); return; }
    const link = event.target.closest('[data-portfolio-route]');
    if (link && !event.defaultPrevented && event.button === 0 && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
      event.preventDefault();
      navigate(link.dataset.portfolioRoute);
    }
  });
  // Escape inside a native dialog must not also close the underlying project.
  window.addEventListener('keydown', event => {
    if (document.querySelector('dialog[open]')) event.stopImmediatePropagation();
  }, true);
  window.addEventListener('message', event => {
    const frame = document.querySelector('[data-nesto-dialog] iframe');
    if (event.source === frame?.contentWindow && event.origin === location.origin && event.data?.type === 'portfolio:navigate') navigate(event.data.route);
  });
  document.querySelectorAll('.project-view__header,.profile-view__header,.team-view__header,.project-bar,.contact-ui__header').forEach(header => {
    const button = document.createElement('button');
    button.type = 'button'; button.className = 'reader-menu'; button.dataset.readerMenu = '';
    button.textContent = 'MENU +'; button.setAttribute('aria-haspopup', 'dialog');
    header.append(button);
  });

  const chapterCleanup = new WeakMap();
  function setProjectChapterColors(project) {
    const view = document.querySelector('[data-project-view]');
    const contrast = (a, b) => {
      const light = hex => {
        const rgb = hex.match(/[\da-f]{2}/gi)?.slice(0, 3).map(value => {
          const channel = parseInt(value, 16) / 255;
          return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
        });
        return rgb ? rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722 : 0;
      };
      const x = light(a), y = light(b);
      return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
    };
    const paper = project.background;
    const ink = project.ink;
    const accent = [project.palette[0], project.palette[1], project.palette[2]]
      .find(color => /^#[\da-f]{6}$/i.test(color) && contrast(color, paper) >= 4.5) || ink;
    view.style.setProperty('--chapter-paper', paper);
    view.style.setProperty('--chapter-ink', ink);
    view.style.setProperty('--chapter-accent', accent);
  }
  function setupChapters(root, selector, documentScroll = false) {
    chapterCleanup.get(root)?.();
    root.querySelector(':scope > .reader-chapters')?.remove();
    const sections = [...root.querySelectorAll(selector)];
    if (!sections.length) return;
    const nav = document.createElement('nav');
    nav.className = 'reader-chapters'; nav.setAttribute('aria-label', '프로젝트 목차');
    const select = document.createElement('select');
    select.setAttribute('aria-label', '현재 섹션 및 이동');
    const links = document.createElement('div'); links.className = 'reader-chapters__links';
    sections.forEach((section, i) => {
      const label = section.dataset.readerSection;
      const button = document.createElement('button'); button.type = 'button'; button.textContent = label;
      button.addEventListener('click', () => jump(i)); links.append(button);
      select.add(new Option(label, String(i)));
    });
    const progress = document.createElement('span'); progress.className = 'reader-progress'; progress.setAttribute('aria-hidden', 'true');
    nav.append(links, select, progress); root.prepend(nav);
    select.addEventListener('change', () => jump(Number(select.value)));
    function jump(i) {
      const scroller = documentScroll ? window : root;
      const current = documentScroll ? window.scrollY : root.scrollTop;
      const origin = documentScroll ? 0 : root.getBoundingClientRect().top;
      const offset = root.matches('[data-profile-scroll]') ? nav.offsetHeight + 12 : 128;
      const top = current + sections[i].getBoundingClientRect().top - origin - offset;
      scroller.scrollTo({ top: Math.max(0, top), behavior: reduced() ? 'instant' : 'smooth' });
    }
    let scheduled = 0;
    function update() {
      scheduled = 0;
      const threshold = nav.getBoundingClientRect().bottom + 44;
      let active = 0;
      sections.forEach((section, i) => { if (section.getBoundingClientRect().top <= threshold) active = i; });
      const scroll = documentScroll ? document.documentElement : root;
      if (scroll.scrollTop > 0 && scroll.scrollTop >= scroll.scrollHeight - scroll.clientHeight - 3) active = sections.length - 1;
      [...links.children].forEach((button, i) => { if(i === active) button.setAttribute('aria-current','location'); else button.removeAttribute('aria-current'); });
      select.value = String(active);
      const percent = Math.min(100, Math.round(scroll.scrollTop / Math.max(1, scroll.scrollHeight - scroll.clientHeight) * 100));
      progress.textContent = `${String(active + 1).padStart(2,'0')} / ${String(sections.length).padStart(2,'0')}`;
      nav.style.setProperty('--reading-progress', `${percent}%`);
    }
    const onScroll = () => { if (!scheduled) scheduled = requestAnimationFrame(update); };
    const target = documentScroll ? window : root;
    target.addEventListener('scroll', onScroll, {passive:true});
    root.addEventListener('toggle', onScroll, true);
    root.addEventListener('load', onScroll, true);
    const observer = new ResizeObserver(onScroll); observer.observe(root);
    chapterCleanup.set(root, () => { target.removeEventListener('scroll',onScroll); root.removeEventListener('toggle',onScroll,true); root.removeEventListener('load',onScroll,true); observer.disconnect(); cancelAnimationFrame(scheduled); });
    update();
  }

  function foldCopy(element, label) {
    if (!element || element.querySelector('details')) return;
    const text = element.innerHTML;
    const split = text.indexOf('다.');
    if (split < 0 || split >= text.length - 25) return;
    const details = document.createElement('details'); details.className = 'reader-more';
    const summary = document.createElement('summary'); summary.textContent = label;
    const body = document.createElement('p'); body.innerHTML = text.slice(split + 2).replace(/^(\s*<br\s*\/?\s*>)+/,'').trim();
    element.innerHTML = text.slice(0,split + 2);
    details.append(summary,body); element.after(details);
  }
  document.querySelectorAll('.case-lead,.case-finish > p:not(.case-eyebrow),.overview .prose > p,.ending > div > p').forEach(el => foldCopy(el, el.closest('.case-finish,.ending') ? '과정과 회고 더 읽기' : '설계 배경 더 읽기'));

  if (isPortfolio) {
    setupChapters(document.querySelector('[data-team-scroll]'), '[data-reader-section]');
    const details = document.querySelector('[data-project-scroll]');
    const artworkDialog = document.createElement('dialog');
    artworkDialog.className = 'artwork-lightbox'; artworkDialog.setAttribute('aria-label','작품 원본 확대');
    artworkDialog.innerHTML = '<form method="dialog"><button>닫기 ×</button></form><img alt="">';
    document.body.append(artworkDialog);
    artworkDialog.addEventListener('click', event => { if(event.target === artworkDialog) artworkDialog.close(); });
    window.addEventListener('portfolio:detail', () => {
      const project = PROJECTS[portfolioScene.activeDetailIndex];
      setProjectChapterColors(project);
      setupChapters(details, '[data-reader-section]');
      details.querySelectorAll('[data-detail-art]').forEach(canvas => {
        const button = document.createElement('button'); button.type = 'button'; button.className = 'artwork-zoom';
        button.setAttribute('aria-label',`${project.title} 원본 확대 보기`);
        canvas.replaceWith(button); button.append(canvas);
        const caption = document.createElement('span'); caption.textContent = '원본 확대 ↗'; button.append(caption);
        button.addEventListener('click', () => {
          const image = artworkDialog.querySelector('img'); image.src = project.imageSrc; image.alt = project.title;
          artworkDialog.showModal();
        });
      });
    });
    const about = document.querySelector('.profile-about'); about.dataset.readerSection = '01 / ABOUT';
    document.querySelector('.profile-skills').dataset.readerSection = '02 / SKILLS';
    document.querySelector('.profile-contact-cta').dataset.readerSection = '03 / CONTACT';
    setupChapters(document.querySelector('[data-profile-scroll]'), '[data-reader-section]');

    const introLinks = document.createElement('nav'); introLinks.className = 'intro-projects'; introLinks.setAttribute('aria-label','주요 프로젝트 바로가기');
    introLinks.innerHTML = '<a href="#personal-project" data-portfolio-route="personal"><span>PERSONAL / WEB DESIGN</span><strong>NESTO <i aria-hidden="true">↗</i></strong><small>가구 쇼핑몰 리디자인</small></a><a href="#team-project" data-portfolio-route="team"><span>TEAM / WEB DESIGN</span><strong>AESOP <i aria-hidden="true">↗</i></strong><small>웹 리디자인 · 디자인 50%</small></a>';
    document.querySelector('.intro__copy').append(introLinks);
    const gallery = document.createElement('dialog'); gallery.className = 'works-directory'; gallery.setAttribute('aria-label','전체 작품 목록');
    gallery.innerHTML = `<header><div><p>SELECTED WORKS</p><h2>작품을 한눈에.</h2></div><button type="button" data-gallery-close>전시로 돌아가기 ×</button></header><div class="works-directory__filters" role="group" aria-label="작품 분류">${[{id:'all',label:'전체'},...WORK_CATEGORIES].map(group => `<button type="button" data-gallery-filter="${group.id}" aria-pressed="false">${group.label}</button>`).join('')}</div><p class="works-directory__status" role="status"></p><div class="works-directory__grid"></div>`;
    document.body.append(gallery);
    const grid = gallery.querySelector('.works-directory__grid');
    PROJECTS.forEach((project,i) => {
      const button = document.createElement('button'); button.type = 'button'; button.dataset.group = project.group;
      const image = document.createElement('img'); image.src = project.imageSrc; image.alt = ''; image.loading = 'lazy'; image.decoding = 'async';
      const label = document.createElement('span'); label.textContent = `${project.index} / ${project.title}`;
      const note = document.createElement('small'); note.textContent = `${project.category} · 자세히 보기 ↗`;
      button.append(image,label,note); button.addEventListener('click', () => { gallery.close(); portfolioScene.startFocus(i, undefined, true, true); }); grid.append(button);
    });
    function filter(group) {
      let count = 0;
      [...grid.children].forEach(button => { button.hidden = group !== 'all' && button.dataset.group !== group; if (!button.hidden) count++; });
      gallery.querySelectorAll('[data-gallery-filter]').forEach(button => button.setAttribute('aria-pressed',String(button.dataset.galleryFilter === group)));
      gallery.querySelector('.works-directory__status').textContent = `${group === 'all' ? '전체' : WORK_CATEGORIES.find(item => item.id === group).label} · ${count}개 작품`;
    }
    gallery.addEventListener('click', event => { const button = event.target.closest('[data-gallery-filter]'); if(button) { portfolioScene.setProjectFilter(button.dataset.galleryFilter); filter(button.dataset.galleryFilter); } });
    gallery.querySelector('[data-gallery-close]').addEventListener('click', () => gallery.close());
    const listButton = document.createElement('button'); listButton.type = 'button'; listButton.className = 'works-list-button'; listButton.textContent = '목록 보기 ↗'; listButton.setAttribute('aria-haspopup','dialog');
    listButton.addEventListener('click', () => { filter(portfolioScene.activeGroup); gallery.showModal(); });
    document.querySelector('.topbar').append(listButton);
    const fallback = () => { document.querySelector('[data-webgl-fallback]').innerHTML = '작품 목록으로 포트폴리오를 살펴보세요. <button type="button" data-fallback-list>작품 목록 열기 ↗</button>'; document.querySelector('[data-fallback-list]').addEventListener('click',()=>listButton.click()); };
    fallback(); window.addEventListener('portfolio:fallback',fallback);
    // An existing link can open any project without requiring the 3D renderer.
    if (location.hash === '#personal-project') document.addEventListener('DOMContentLoaded', () => navigate('personal'), {once:true});
    else if (!portfolioScene.gl) {
      if(location.hash === '#about') portfolioScene.openProfile(false);
      if(location.hash === '#team-project') portfolioScene.openTeamProject(false);
      const projectIndex = PROJECTS.findIndex(project => '#'+project.id === location.hash);
      if(projectIndex >= 0) portfolioScene.startFocus(projectIndex, undefined, false, true);
    }
    window.addEventListener('popstate', () => {
      if (location.hash !== '#personal-project') document.querySelector('[data-nesto-dialog]')?.close();
      else if (!document.querySelector('[data-nesto-dialog]')?.open) document.querySelector('[data-nesto-open]')?.click();
    });
  } else {
    setupChapters(document.querySelector('main'), '[data-reader-section]', true);
  }
})();
