(() => {
  'use strict';
  const products = window.AesopCatalog || [];
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const money = value => Number(value).toLocaleString('ko-KR') + '원';
  const find = id => products.find(p => p.id === id);
  const url = p => `./purchase.html?id=${encodeURIComponent(p.id)}`;
  const memory = {};
  let storageFailed = false;
  const read = key => {try {const value=JSON.parse(localStorage.getItem('aesop.'+key)||'[]');if(!Array.isArray(value))return [];return value.filter(x=>{
    if(key==='favorites'||key==='recent')return typeof x==='string';
    if(!x||typeof x!=='object')return false;
    if(key==='questions')return typeof x.product==='string'&&typeof x.text==='string';
    if(key==='orders')return typeof x.id==='string'&&typeof x.date==='string'&&Number.isFinite(x.total)&&Array.isArray(x.items)&&x.items.every(i=>i&&typeof i.id==='string'&&Number.isInteger(i.qty)&&i.qty>0&&i.qty<=99);
    return true;
  });}catch{return memory[key]||[];}};
  const save = (key,value) => {memory[key]=value;try{localStorage.setItem('aesop.'+key,JSON.stringify(value));}catch{storageFailed=true;}};
  const price = (p,option) => p.prices?.[p.options.indexOf(option)] || p.price;
  let timer;
  function toast(message) {
    let el=$('.ae-toast');
    if(!el){el=document.createElement('div');el.className='ae-toast';el.setAttribute('role','status');document.body.append(el);}
    el.textContent=message+(storageFailed?' (이 브라우저에서는 현재 화면에서만 보관됩니다.)':'');
    el.classList.add('is-visible');clearTimeout(timer);timer=setTimeout(()=>el.classList.remove('is-visible'),3600);
  }
  function cart() {return read('cart').filter(x=>find(x.id)&&find(x.id).options.includes(x.option)&&Number.isInteger(x.qty)&&x.qty>0&&x.qty<=99);}
  function badges(){const count=cart().reduce((n,x)=>n+x.qty,0);$$('a[href="./cart.html"]').forEach(a=>{let b=$('.ae-cart-count',a);if(!b){b=document.createElement('span');b.className='ae-cart-count';a.append(b);}b.textContent=count;b.hidden=!count;a.setAttribute('aria-label',`장바구니 ${count}개`);});}
  function add(p,option=p.options[0],qty=1,gift=false,discount=false){
    const items=cart(),item=items.find(x=>x.id===p.id&&x.option===option&&!!x.gift===gift&&!!x.discount===discount);
    if(item)item.qty=Math.min(99,item.qty+qty);else items.push({id:p.id,option,qty:Math.min(99,qty),gift,discount});
    save('cart',items);badges();toast(`${p.name} ${qty}개를 담았습니다.`);
  }
  const categoryLabels={'FRAGRANCE':'향수','SKIN CARE':'스킨 케어','BODY CARE':'바디 케어','HAND CARE':'핸드 & 립','HAIR CARE':'헤어 케어','HOME':'홈 리추얼','SET':'세트','BODY & HAIR':'바디 & 헤어','MIST':'미스트','MOISTURIZER':'모이스처라이저','CLEANSER':'클렌저'};
  function card(p){return `<article class="ae-card"><a class="ae-card-image" href="${url(p)}"><img src="${p.image}" alt="${escape(p.name)}" loading="lazy"></a><div><p class="ae-kicker">${escape(categoryLabels[p.category]||p.category)}</p><h3><a href="${url(p)}">${escape(p.name)}</a></h3><p>${money(p.price)}</p></div><button class="ae-button ae-outline" type="button" data-quick-add="${p.id}">장바구니 담기</button></article>`;}
  const grid = items => `<div class="ae-product-grid">${items.map(card).join('')}</div>`;
  const empty = (title,body) => `<div class="ae-empty"><h2>${title}</h2><p>${body}</p><a class="ae-button" href="./shoppingLIst.html">제품 둘러보기</a></div>`;
  function matchCategory(p,c){return !c||c==='ALL'||p.category===c||(c==='BODY & HAIR'&&['BODY CARE','HAIR CARE'].includes(p.category))||(c==='MIST'&&/미스트/.test(p.name))||(c==='MOISTURIZER'&&/밤|크림|로션|오일|세럼/.test(p.name))||(c==='CLEANSER'&&/클렌저|워시|샴푸/.test(p.name));}
  function remember(p){save('recent',[p.id,...read('recent').filter(id=>id!==p.id)].slice(0,12));}
  window.AesopShop={products,find,price,read,save,add,toast,money,url,cart};
  document.addEventListener('click',e=>{const b=e.target.closest('[data-quick-add]');if(b)add(find(b.dataset.quickAdd));});
  badges();

  // Catalogue preserves the existing card structure and image ratios.
  const list=$('[data-product-list]');
  if(list){
    let visibleCount=matchMedia('(max-width:768px)').matches?6:12;
    const more=document.createElement('button');more.type='button';more.className='ae-button ae-load-more';more.textContent='제품 더 보기';list.after(more);
    const filter=document.createElement('nav');filter.className='ae-pills ae-filters';filter.setAttribute('aria-label','제품 필터');
    filter.innerHTML=['ALL','FRAGRANCE','SKIN CARE','BODY CARE','HAND CARE','HAIR CARE','HOME','SET'].map(c=>`<button type="button" data-filter="${c}" aria-pressed="false">${categoryLabels[c]||'전체'}</button>`).join('');
    $('.collection-toolbar').before(filter);
    const count=document.createElement('p');count.className='ae-result-count';count.setAttribute('role','status');list.before(count);
    function render(){
      const params=new URLSearchParams(location.search),cat=params.get('category')||'ALL',view=params.get('view');
      let items=products.filter(p=>matchCategory(p,cat)&&(!view||(view==='new'?p.new:view==='best'?p.best:true)));
      const sort=$('[data-product-sort]').value;
      if(sort==='price-low')items.sort((a,b)=>a.price-b.price);
      if(sort==='price-high')items.sort((a,b)=>b.price-a.price);
      if(sort==='name')items.sort((a,b)=>a.name.localeCompare(b.name,'ko'));
      $('#products-title').textContent=categoryLabels[cat]||(view==='new'?'New 컬렉션':view==='best'?'Best Seller':'전체 제품');
      count.textContent=`${items.length}개의 제품 중 ${Math.min(visibleCount,items.length)}개 표시`;
      const selected=new Map($$('[data-product-card]',list).map(c=>[c.dataset.id,$('select',c).value]));
      more.hidden=visibleCount>=items.length;
      list.innerHTML=items.slice(0,visibleCount).map(p=>`<li class="collection-card" data-product-card data-id="${p.id}"><article><a class="collection-image" href="${url(p)}"><img src="${p.image}" alt="${escape(p.name)}" loading="lazy"></a><div class="collection-info"><h3><a href="${url(p)}">${escape(p.name)}</a></h3><p class="collection-price"><strong data-card-price>${price(p,selected.get(p.id)||p.options[0]).toLocaleString('ko-KR')}</strong><span>원</span></p></div><label class="product-option"><span class="sr-only">${escape(p.name)} 용량 선택</span><select>${p.options.map(o=>`<option ${selected.get(p.id)===o?'selected':''}>${escape(o)}</option>`).join('')}</select></label><button class="add-to-cart" type="button" data-list-add>장바구니 담기</button></article></li>`).join('');
      $$('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===cat)));
      $$('[data-category]').forEach(a=>{if(a.dataset.category===cat)a.setAttribute('aria-current','true');else a.removeAttribute('aria-current');});
    }
    function filterTo(cat){const u=new URL(location.href);u.search='';if(cat!=='ALL')u.searchParams.set('category',cat);u.hash='products';history.pushState(null,'',u);visibleCount=matchMedia('(max-width:768px)').matches?6:12;render();$('#products').scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});}
    more.addEventListener('click',()=>{const previous=list.children.length;visibleCount+=12;render();list.children[previous]?.querySelector('a')?.focus({preventScroll:true});});
    filter.addEventListener('click',e=>{const b=e.target.closest('[data-filter]');if(b)filterTo(b.dataset.filter);});
    $$('[data-category]').forEach(a=>a.addEventListener('click',e=>{e.preventDefault();filterTo(a.dataset.category);}));
    $('[data-product-sort]').addEventListener('change',render);window.addEventListener('popstate',render);
    list.addEventListener('change',e=>{const c=e.target.closest('[data-id]');if(c)$('[data-card-price]',c).textContent=price(find(c.dataset.id),$('select',c).value).toLocaleString('ko-KR');});
    list.addEventListener('click',e=>{const b=e.target.closest('[data-list-add]');if(b){const c=b.closest('[data-id]');add(find(c.dataset.id),$('select',c).value);}});render();
  }

  const search=$('.ae-search');
  if(search){
    const input=$('input',search);input.value=new URLSearchParams(location.search).get('q')||'';
    function run(){const q=input.value.trim().toLocaleLowerCase(),terms=q.split(/\s+/).filter(Boolean);const results=q?products.filter(p=>terms.every(t=>`${p.name} ${p.category} ${categoryLabels[p.category]}`.toLowerCase().includes(t))):products.filter(p=>p.best);
      $('.ae-result-count').textContent=q?`“${q}” 검색 결과 ${results.length}개`:'먼저 만나보는 베스트셀러';
      $('.ae-results').innerHTML=results.length?results.map(card).join(''):empty('찾으시는 제품이 없습니다.','짧은 단어로 다시 검색하거나 전체 제품을 살펴보세요.');
    }
    search.addEventListener('submit',e=>{e.preventDefault();const u=new URL(location.href);u.search='';if(input.value.trim())u.searchParams.set('q',input.value.trim());history.pushState(null,'',u);run();});
    input.addEventListener('input',run);window.addEventListener('popstate',()=>{input.value=new URLSearchParams(location.search).get('q')||'';run();});run();
  }

  const profiles={
    'FRAGRANCE':{tag:'A SCENT, A MEMORY',title:'향으로 기억하는 순간',text:'첫인상에서 잔향까지, 시간에 따라 달라지는 향의 표정을 만나보세요.',texture:'소량을 손목이나 목 주변에 가볍게 더하는 향의 리추얼.',use:'원하는 부위에 소량을 사용하세요. 눈 주변과 자극받은 피부는 피하고, 문지르기보다 자연스럽게 향이 퍼지도록 둡니다.',image:'tree.jpg',notes:'시더 우드 · 식물의 잎 · 은은한 잔향'},
    'HAND CARE':{tag:'A MOMENT IN YOUR HANDS',title:'손끝에서 시작되는 여유',text:'하루에도 여러 번 반복하는 작은 몸짓. 손을 씻고 돌보는 순간에 부드러운 향을 더합니다.',texture:'손에 고르게 펼쳐지는 편안한 질감과 은은한 향.',use:'워시는 젖은 손에 덜어 거품을 낸 뒤 충분히 헹굽니다. 밤과 크림은 깨끗하고 마른 손에 소량을 펴 발라주세요.',image:'cream.jpg',notes:'부드러운 질감 · 허브 · 우디 노트'},
    'BODY CARE':{tag:'A DAILY BODY RITUAL',title:'피부에 닿는 편안한 시간',text:'물과 닿는 순간부터 보습으로 마무리하는 시간까지, 하루의 긴장을 내려놓는 바디 리추얼.',texture:'바디의 넓은 면에 부드럽게 펼쳐지는 질감.',use:'클렌저는 젖은 피부에 사용한 뒤 충분히 헹굽니다. 밤과 오일은 샤워 후 물기를 닦은 피부에 소량씩 펴 발라주세요.',image:'cream.jpg',notes:'식물의 향 · 부드러운 텍스처 · 편안한 마무리'},
    'SKIN CARE':{tag:'LESS, BUT CONSIDERED',title:'일상에 맞는 간결한 케어',text:'아침과 저녁, 피부를 돌보는 시간을 간결하게. 자신에게 편안한 질감과 사용 순서를 찾아보세요.',texture:'매일의 루틴에 자연스럽게 더하는 섬세한 사용감.',use:'클렌저는 사용 후 충분히 헹구고, 세럼과 크림은 세안 후 소량을 펴 발라주세요. 미스트는 눈을 감고 얼굴에서 거리를 두어 분사합니다.',image:'orenge.jpg',notes:'싱그러운 식물 · 가벼운 레이어 · 매일의 루틴'},
    'HAIR CARE':{tag:'A FRESH START',title:'산뜻하게 시작하는 하루',text:'두피와 모발을 돌보는 익숙한 시간에 싱그러운 향과 충분한 여유를 더합니다.',texture:'물과 함께 부드럽게 퍼지는 세정 리추얼.',use:'충분히 적신 두피와 모발에 적당량을 덜어 부드럽게 마사지한 뒤 물로 깨끗이 헹궈주세요.',image:'tree.jpg',notes:'그린 노트 · 물 · 깨끗한 마무리'},
    'HOME':{tag:'MAKE ROOM FOR REST',title:'공간에 남기는 작은 여백',text:'일상의 공간을 나만의 휴식처로 바꾸는 향과 질감. 서두르지 않고 감각을 정돈합니다.',texture:'향과 물, 리넨이 만드는 차분한 경험.',use:'배스 솔트는 따뜻한 목욕물에 소량을 풀어 사용합니다. 필로우·린넨 미스트는 피부가 아닌 패브릭에 소량 분사하고 완전히 말린 뒤 사용합니다. 눈에 띄지 않는 곳에 먼저 시험하세요.',image:'tree.jpg',notes:'미네랄 · 리넨 · 고요한 공간'},
    'SET':{tag:'RITUALS, TOGETHER',title:'하나의 분위기로 이어지는 리추얼',text:'서로 어울리는 제품을 함께 경험하는 즐거움. 향과 쓰임새를 따라 완성하는 일상의 작은 장면.',texture:'서로 다른 질감과 향을 한 가지 무드로 연결합니다.',use:'구성 제품마다 사용 부위와 방법이 다릅니다. 아래 구성품의 상세 설명을 확인하고, 세정부터 보습까지 자신의 루틴에 맞춰 사용하세요.',image:'tree.jpg',notes:'함께 쓰는 즐거움 · 계절의 감각'}
  };
  const productForm=$('[data-product-form]');
  if(productForm){
    const requested=new URLSearchParams(location.search).get('id');
    const p=find(requested||'new-5');
    if(!p){$('.purchase-page').innerHTML=empty('제품을 찾을 수 없습니다.','주소를 확인하거나 현재 컬렉션에서 제품을 골라주세요.');$('[data-order-dialog]')?.remove();return;}
    window.AesopProduct=p;remember(p);document.title=p.name+' | Aesop Reimagined';
    $('#product-title').textContent=p.name;$('.product-name-en').textContent=p.id==='new-5'?'Sunlit Botanical Body Balm':categoryLabels[p.category]+' / Aesop Reimagined';
    $('.breadcrumb [aria-current]').textContent=p.name;
    const crumb=$$('.breadcrumb a')[2];crumb.textContent=categoryLabels[p.category];crumb.href='./shoppingLIst.html?category='+encodeURIComponent(p.category)+'#products';
    const photo=$('[data-gallery-main]');photo.src=p.image;photo.alt=p.name;
    const profile={...profiles[p.category]};
    const rituals=[
      [/핸드 워시/, '젖은 손 위에서 가볍게 피어나는 거품과 깨끗한 마무리.', '젖은 손에 적당량을 덜어 충분히 거품을 낸 뒤 흐르는 물로 헹궈주세요.', 'tree.jpg'],
      [/클렌저/, '물과 어우러져 부드럽게 퍼지는 세정의 감각.', '피부를 충분히 적신 뒤 적당량을 덜어 부드럽게 마사지하고 깨끗이 헹궈주세요.', 'orenge.jpg'],
      [/오일/, '손의 온기를 따라 얇고 유연하게 펼쳐지는 오일 텍스처.', '샤워 후 물기를 가볍게 닦은 바디에 소량씩 펴 발라주세요.', 'orenge.jpg'],
      [/핸드.*밤|핸드 크림/, '손끝과 손등을 부드럽게 감싸는 크리미한 질감.', '깨끗하고 마른 손에 소량을 덜어 손등과 손끝까지 천천히 펴 발라주세요.', 'cream.jpg'],
      [/바디.*밤|바디 로션/, '피부 위에서 천천히 펼쳐지는 부드러운 보습의 감각.', '샤워 후 물기를 닦은 바디에 적당량을 고르게 펴 발라주세요.', 'cream.jpg'],
      [/배스 솔트/, '따뜻한 물 안에서 서서히 풀어지는 미네랄의 질감.', '따뜻한 목욕물에 소량을 넣고 충분히 녹여 사용합니다. 사용 후에는 물로 가볍게 헹궈주세요.', 'tree.jpg'],
      [/필로우|린넨/, '패브릭 위에 은은하게 남는 공간의 향.', '피부가 아닌 패브릭에 소량 분사한 뒤 충분히 말려주세요. 눈에 띄지 않는 곳에 먼저 시험합니다.', 'tree.jpg'],
      [/페이셜 미스트/, '가볍게 분사되어 루틴에 더해지는 산뜻한 수분감.', '눈과 입을 감고 얼굴에서 거리를 두어 소량 분사해 주세요.', 'orenge.jpg'],
      [/세럼/, '몇 방울로 루틴에 더하는 매끄러운 질감.', '세안 후 소량을 얼굴에 고르게 펴 바릅니다. 눈 주변을 피해 주세요.', 'orenge.jpg'],
      [/퍼퓸 밤/, '손끝으로 덜어 피부에 얇게 더하는 고체 향.', '깨끗한 손끝으로 소량을 덜어 손목이나 목 주변에 가볍게 펴 발라주세요.', 'tree.jpg'],
      [/롤온/, '맥박이 느껴지는 곳에 가볍게 남기는 향의 흔적.', '손목이나 목 주변에 소량을 굴려 사용하세요. 눈 주변은 피합니다.', 'tree.jpg']
    ];
    const ritual=rituals.find(([pattern])=>pattern.test(p.name));if(ritual){profile.texture=ritual[1];profile.use=ritual[2];profile.image=ritual[3];}
    const gallery=p.id==='new-5'?[p.image,'./img/buy-info/cream.jpg','./img/buy-info/orenge.jpg','./img/buy-info/tree.jpg']:[p.image,'./img/buy-info/'+profile.image];
    $('.product-thumbnails').innerHTML=gallery.map((src,i)=>`<button class="product-thumbnail ${i?'':'is-active'}" type="button" data-image="${src}" data-alt="${escape(i?'리추얼 무드 이미지 — '+profile.notes:p.name)}" aria-label="${i?'리추얼 무드 '+i:'제품'} 이미지 보기" aria-pressed="${!i}"><img src="${src}" alt="${escape(i?'자연 소재의 질감':p.name)}"></button>`).join('');
    $('.size-options').innerHTML='<legend class="sr-only">용량 선택</legend>'+p.options.map((o,i)=>`<button class="size-option ${i?'':'is-selected'}" type="button" data-size="${escape(o)}" data-price="${price(p,o)}" data-original="${price(p,o)}" aria-pressed="${!i}"><span>${escape(o)}</span><span>${money(price(p,o))}</span></button>`).join('');
    $('.dialog-product img').src=p.image;$('.dialog-product strong').textContent=p.name;
    const desc=document.createElement('p');desc.className='ae-product-description';desc.textContent=p.description||profile.text;$('.product-heading-row').after(desc);
    const note=document.createElement('p');note.className='ae-note';note.textContent='리브랜딩 콘셉트 제품 · 가격과 제품 설명은 포트폴리오 체험용입니다.';$('.purchase-benefits').after(note);
    if(p.id!=='new-5'){
      $('.product-story').innerHTML=`<div class="ae-editorial"><img src="${p.image}" alt="${escape(p.name)}" loading="lazy"><div><p class="ae-kicker">${profile.tag}</p><h2>${profile.title}</h2><p>${escape(p.description||profile.text)}</p><p class="ae-kicker">TEXTURE / EXPERIENCE</p><p>${profile.texture}</p></div></div><div class="ae-editorial ae-ingredient"><img src="./img/buy-info/${profile.image}" alt="${profile.notes}" loading="lazy"><div><p class="ae-kicker">INGREDIENT INSPIRATION</p><h2>자연에서 가져온<br>감각의 단서.</h2><p>${profile.notes}</p><p class="ae-note">원료와 향의 디자인 콘셉트입니다. 실제 전성분이나 효능 정보가 아닙니다.</p><details open><summary>사용 리추얼</summary><p>${profile.use}</p></details><details><summary>보관과 사용 안내</summary><p>직사광선을 피해 보관하세요. 실제 제품의 사용법과 주의사항은 용기의 표시를 확인해 주세요.</p></details></div></div>`;
      $('#review-panel').innerHTML='<div class="ae-empty"><h3>아직 작성된 후기가 없습니다.</h3><p>이 제품은 포트폴리오의 콘셉트 컬렉션입니다.</p></div>';
      $('.qna-list').innerHTML='<li><button class="review-card qna" type="button" aria-expanded="false" aria-controls="qna-answer-concept">실제로 구매할 수 있는 제품인가요?</button><p id="qna-answer-concept" class="qna-answer" hidden>리브랜딩 콘셉트 제품입니다. 장바구니와 주문 미리보기를 체험하실 수 있습니다.</p></li>';
    } else {
      const accessible=document.createElement('div');accessible.className='ae-product-guide';accessible.innerHTML=`<p class="ae-kicker">THE DAILY RITUAL</p><h2>선릿 보태니컬 바디 밤</h2><p>햇살과 시트러스에서 영감을 얻은 바디 케어 콘셉트. 크림처럼 부드럽게 펼쳐지는 질감과 은은한 우디 노트를 담았습니다.</p><details><summary>주요 원료와 텍스처 이야기</summary><p>만다린 오렌지와 시더 우드를 향의 모티프로 삼았습니다. 위 이미지의 원료와 제형은 디자인 콘셉트이며 실제 전성분 정보가 아닙니다.</p></details><details><summary>사용 리추얼</summary><p>샤워 후 물기를 닦은 피부에 소량씩 부드럽게 펴 발라주세요. 실제 사용 전에는 제품에 표기된 사용법을 확인해 주세요.</p></details>`;$('.product-story').append(accessible);
      const demo=document.createElement('p');demo.className='ae-note';demo.textContent='아래 후기는 화면 구성을 위한 예시 콘텐츠입니다.';$('#review-panel').prepend(demo);
    }
    if(p.category==='SET'){
      const section=document.createElement('section');section.className='ae-set-contents';const items=products.filter(x=>x.id.startsWith('ritual-')&&x.image.includes(`promo-0${p.theme}-`));section.innerHTML='<p class="ae-kicker">IN THIS COLLECTION</p><h2>함께 담긴 리추얼</h2>'+grid(items);$('.product-story').append(section);
    }
    const favorites=read('favorites');$('[data-favorite]').setAttribute('aria-pressed',String(favorites.includes(p.id)));
    const related=$('.tgt-img');related.innerHTML='<div class="ae-related-grid"></div>';
    function relatedRender(recent=false){let items=recent?read('recent').filter(id=>id!==p.id).map(find).filter(Boolean):products.filter(x=>x.id!==p.id&&x.category===p.category).slice(0,3);if(!items.length&&!recent)items=products.filter(x=>x.best).slice(0,3);$('.ae-related-grid',related).innerHTML=items.length?items.map(card).join(''):empty('최근 본 다른 제품이 없습니다.','다른 제품을 살펴보면 이곳에 표시됩니다.');}
    $$('[data-tgt-view]').forEach(b=>b.addEventListener('click',()=>{$$('[data-tgt-view]').forEach(x=>{x.setAttribute('aria-pressed',String(x===b));x.closest('li').classList.toggle('tgt-underline',x===b);x.closest('li').classList.toggle('tgt-color',x!==b);});relatedRender(b.dataset.tgtView==='recent');}));relatedRender();
    const saved=read('questions').filter(x=>x.product===p.id&&typeof x.text==='string');
    const notes=document.createElement('div');notes.className='ae-question-notes';$('.qna-list').after(notes);
    const renderNotes=()=>{notes.innerHTML=read('questions').filter(x=>x.product===p.id).map(x=>`<article><span class="ae-kicker">나의 문의 메모 · 전송되지 않음</span><p>${escape(x.text)}</p></article>`).join('');};renderNotes();
    window.AesopQuestion=()=>{
      let d=$('#ae-question-dialog');if(!d){d=document.createElement('dialog');d.id='ae-question-dialog';d.className='ae-dialog';d.innerHTML='<form><button class="ae-dialog-close" type="button" aria-label="닫기">×</button><p class="ae-kicker">PRODUCT QUESTION</p><h2>궁금한 내용을 남겨보세요.</h2><p>문의는 이 브라우저에 메모로 보관됩니다. 브랜드에 전송되지 않습니다.</p><label for="ae-question">문의 내용</label><textarea id="ae-question" required minlength="5" maxlength="1000" rows="5" placeholder="개인정보 없이 제품에 관한 질문을 적어주세요."></textarea><button class="ae-button" type="submit">문의 메모 저장</button></form>';document.body.append(d);$('.ae-dialog-close',d).onclick=()=>d.close();$('form',d).onsubmit=e=>{e.preventDefault();const text=$('textarea',d).value.trim();if(text.length<5){$('textarea',d).setCustomValidity('5자 이상 입력해 주세요.');$('textarea',d).reportValidity();return;}save('questions',[...read('questions'),{product:p.id,text}]);renderNotes();d.close();$('form',d).reset();toast('문의 메모를 이 브라우저에 저장했습니다.');};$('textarea',d).oninput=e=>e.target.setCustomValidity('');}d.showModal();
    };
  }

  const rowTotal=x=>Math.round(price(find(x.id),x.option)*(x.discount?.95:1))*x.qty;
  const total=items=>items.reduce((n,x)=>n+rowTotal(x),0);
  function orderRows(items,editable=false){return items.map((x,i)=>{const p=find(x.id);return `<article class="ae-cart-row"><a href="${url(p)}"><img src="${p.image}" alt="${escape(p.name)}"></a><div><h3><a href="${url(p)}">${escape(p.name)}</a></h3><p>${escape(x.option)}${x.gift?' · 선물 포장':''}${x.discount?' · 5% 쿠폰':''}</p>${editable?`<div class="ae-quantity"><button data-cart-change="${i}" data-delta="-1" aria-label="${escape(p.name)} 수량 줄이기" ${x.qty<=1?'disabled':''}>−</button><output>${x.qty}</output><button data-cart-change="${i}" data-delta="1" aria-label="${escape(p.name)} 수량 늘리기" ${x.qty>=99?'disabled':''}>＋</button><button data-cart-remove="${i}" aria-label="${escape(p.name)} 삭제">삭제</button></div>`:`<p>${x.qty}개</p>`}</div><strong>${money(rowTotal(x))}</strong></article>`;}).join('');}
  const cartPage=$('[data-cart-page]');
  if(cartPage){
    const render=()=>{const items=cart();cartPage.innerHTML=items.length?`<div class="ae-cart-layout"><div>${orderRows(items,true)}</div><aside class="ae-order-summary"><h2>주문 요약</h2><p>상품 ${items.reduce((n,x)=>n+x.qty,0)}개</p><strong>${money(total(items))}</strong><p class="ae-note">체험용 장바구니입니다. 실제 결제는 진행되지 않습니다.</p><a class="ae-button" href="./checkout.html">주문 미리보기</a><a class="ae-link" href="./shoppingLIst.html">계속 둘러보기 ↗</a></aside></div>`:empty('장바구니가 비어 있습니다.','좋아하는 제품을 골라 나만의 리추얼을 만들어보세요.');};
    cartPage.addEventListener('click',e=>{const b=e.target.closest('[data-cart-change],[data-cart-remove]');if(!b)return;const items=cart();if(b.hasAttribute('data-cart-remove'))items.splice(Number(b.dataset.cartRemove),1);else{const x=items[Number(b.dataset.cartChange)];x.qty=Math.max(1,Math.min(99,x.qty+Number(b.dataset.delta)));}save('cart',items);badges();render();toast('장바구니를 업데이트했습니다.');});render();
  }
  const checkout=$('[data-checkout-page]');
  if(checkout){
    const direct=new URLSearchParams(location.search).has('direct');
    const items=direct?read('checkout').filter(x=>find(x.id)&&find(x.id).options.includes(x.option)&&Number.isInteger(x.qty)&&x.qty>0&&x.qty<=99):cart();
    checkout.innerHTML=items.length?`<div class="ae-cart-layout"><div>${orderRows(items)}<details open><summary>주문 미리보기 안내</summary><p>주소·연락처·카드 정보를 입력하지 않습니다. 선택 내역만 이 브라우저에 저장됩니다.</p></details></div><aside class="ae-order-summary"><h2>선택 내역</h2><strong>${money(total(items))}</strong><p>실제 청구 금액: 0원</p><label class="ae-check"><input type="checkbox" id="ae-demo-consent"> 실제 구매가 아닌 체험임을 확인했습니다.</label><button class="ae-button" data-finish-order>미리보기 완료</button><a class="ae-link" href="./cart.html">장바구니로 돌아가기</a></aside></div>`:empty('확인할 제품이 없습니다.','장바구니에 제품을 담은 뒤 다시 방문해 주세요.');
    $('[data-finish-order]')?.addEventListener('click',()=>{if(!$('#ae-demo-consent').checked){toast('체험 안내를 확인해 주세요.');$('#ae-demo-consent').focus();return;}const id='PREVIEW-'+Date.now().toString(36).toUpperCase();save('orders',[{id,date:new Date().toISOString(),items,total:total(items)},...read('orders')].slice(0,20));if(direct)save('checkout',[]);else save('cart',[]);badges();checkout.innerHTML=`<div class="ae-empty" tabindex="-1"><p class="ae-kicker">YOUR RITUAL, SAVED</p><h2>선택한 리추얼을 저장했습니다.</h2><p>${id}</p><p>결제나 배송은 진행되지 않았습니다.<br>내 컬렉션에서 이 내역을 다시 볼 수 있습니다.</p><a class="ae-button" href="./account.html?tab=orders">저장한 내역 보기</a></div>`;$('.ae-empty',checkout).focus();});
  }
  const account=$('[data-account-content]');
  if(account){
    const render=tab=>{$$('[data-account-tab]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.accountTab===tab)));if(tab==='orders'){account.innerHTML=read('orders').length?read('orders').map(o=>`<details><summary>${escape(o.date.slice(0,10))} · ${escape(o.id)} · ${money(o.total)}</summary><p class="ae-note">결제되지 않은 미리보기 내역</p>${orderRows(o.items.filter(x=>find(x.id)))}</details>`).join(''):empty('아직 저장한 주문 미리보기가 없습니다.','장바구니에서 선택 내역을 확인해 보세요.');}else{const items=read(tab).map(find).filter(Boolean);account.innerHTML=items.length?grid(items):empty(tab==='recent'?'최근 본 제품이 없습니다.':'관심 제품이 없습니다.','제품 상세 화면에서 하트를 눌러 마음에 드는 제품을 모아보세요.');}};
    $$('[data-account-tab]').forEach(b=>b.onclick=()=>render(b.dataset.accountTab));render(new URLSearchParams(location.search).get('tab')==='orders'?'orders':'favorites');
  }
  const discover=$('[data-discover-page]');if(discover)discover.innerHTML=grid(products.filter(p=>p.best));
  $('[data-clear-data]')?.addEventListener('click',()=>{let d=$('#ae-clear-dialog');if(!d){d=document.createElement('dialog');d.id='ae-clear-dialog';d.className='ae-dialog';d.innerHTML='<h2>저장한 데이터를 삭제할까요?</h2><p>장바구니, 관심 제품, 최근 본 제품, 문의 메모와 주문 미리보기 기록을 이 브라우저에서 삭제합니다.</p><div class="ae-pills"><button data-confirm-clear class="ae-button">삭제</button><button class="ae-button ae-outline" data-cancel-clear>취소</button></div>';document.body.append(d);$('[data-cancel-clear]',d).onclick=()=>d.close();$('[data-confirm-clear]',d).onclick=()=>{['cart','favorites','recent','questions','orders','checkout'].forEach(k=>{save(k,[]);});badges();d.close();toast('이 사이트의 저장 데이터를 삭제했습니다.');};}d.showModal();});
  window.addEventListener('storage',()=>{badges();});
  $$('video').forEach(v=>{v.poster='./img/promotion/promo-01-hero.png';if(matchMedia('(prefers-reduced-motion: reduce)').matches){v.autoplay=false;v.pause();}});
  const reveal=$$('.ae-editorial,.ae-values,.ae-wide-story');
  if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('ae-revealed');observer.unobserve(e.target);}}),{threshold:.08});reveal.forEach(el=>{el.classList.add('ae-reveal');observer.observe(el);});}
})();
