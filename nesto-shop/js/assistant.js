/* No API is configured. The adapter is deliberately separate from the dialog UI. */
(() => {
  'use strict';
  const catalog = window.NestoCatalog;
  if (!catalog) return;
  const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const ui = {
    esc: escapeHTML,
    money: value => Math.round(value).toLocaleString('ko-KR') + '원',
    photo: (asset, label) => '<img class="n-photo" src="img/' + escapeHTML(asset) + '" alt="' + escapeHTML(label) + '" loading="lazy">',
  };
  const routeProduct = location.pathname.endsWith('/product.html')
    ? catalog.find(p => p.id === Number(new URLSearchParams(location.search).get('id') ?? 1)) : null;
  const topics = ['상품 추천', '배송 안내', '소재·관리', '교환·반품'];
  const demoProvider = {
    mode:'demo',
    async respond({message, productId}) {
      const product = catalog.find(p => p.id === productId);
      const value = message.trim().toLowerCase();
      if (/반품|교환|취소|환불/.test(value)) return {
        text:'이곳은 실제 결제·배송이 없는 콘셉트 스토어예요. 체험 주문은 MY NESTO → 주문 내역에서 취소할 수 있어요. 실제 판매를 시작할 때에는 반품 기간·비용·접수 방법을 운영 정책과 연결해야 해요. 구매 전에는 선택한 컬러와 크기, 설치할 공간을 확인해 주세요.',
        actions:[{label:'MY NESTO에서 확인',action:'account'}],
      };
      if (/배송|배달|설치|언제/.test(value)) return {
        text:product ? `${product.name}의 예시 배송 안내는 ${product.delivery}, 배송비 무료예요. 가구를 놓을 자리와 출입문·엘리베이터 크기를 미리 확인해 주세요. 실제 배송 일정 조회나 예약은 제공하지 않아요.` : '콘셉트 카탈로그 기준으로 가구는 전문 설치배송 7–14일, 조명·홈데코는 택배배송 3–5일로 안내하고 있어요. 상품 상세에서 개별 안내를 확인할 수 있어요. 실제 배송 일정 조회나 예약은 제공하지 않아요.',
        actions:product ? [{label:'이 상품의 배송 정보',href:`product.html?id=${product.id}#n-delivery`}] : [],
      };
      if (/소재|관리|세탁|얼룩|청소|원목|부클레/.test(value)) return {
        text:product ? `${product.name}\n소재: ${product.material}\n관리: ${product.care}` : '원목과 무늬목은 물기를 바로 닦고 컵 받침을 사용해 주세요. 패브릭은 부드러운 브러시로 먼지를 제거하고, 조명은 전원을 분리한 뒤 닦아주세요. 상품마다 소재가 다르니 상세에서 해당 제품의 관리 안내를 확인해 주세요.',
        actions:product ? [{label:'제품 특징 확인',href:`product.html?id=${product.id}#product-detail-1`}] : [],
      };
      if (product && /크기|치수|사이즈|컬러|색상|가격|얼마|옵션/.test(value)) return {
        text:`${product.name}\n크기: ${product.dimensions}\n컬러: ${product.colors.join(', ')}\n기본 가격: ${ui.money(product.price)}\n케어 키트는 20,000원 추가예요. 사진은 대표 컬러 기준이며, 옵션과 수량을 고르면 총 금액이 반영돼요.`,
        actions:[{label:'옵션 선택하러 가기',href:`product.html?id=${product.id}`}],
      };
      if (/추천|골라|찾|소파|체어|의자|테이블|조명|램프|침대|수납|러그|거실|침실|만원|만 원/.test(value)) {
        const groups = [['sofa',/소파/],['chair',/의자|체어|벤치/],['table',/테이블|책상/],['bed',/침대/],['light',/조명|램프/],['storage',/수납|서랍/],['decor',/러그|소품|화병|거울/]];
        const group = groups.find(([,pattern])=>pattern.test(value))?.[0];
        const space = /침실/.test(value) ? 'bedroom' : /거실/.test(value) ? 'living' : null;
        const amount = value.match(/(\d+(?:\.\d+)?)\s*만\s*원?/);
        const budget = amount ? Number(amount[1])*10000 : Infinity;
        const filtered = catalog.filter(p=>(!group||p.group===group)&&(!space||p.spaces.includes(space))&&p.price<=budget);
        const preferred = [1,21,11,0,25];
        const choices = filtered.sort((a,b)=> {
          if(Number.isFinite(budget)) return a.price-b.price;
          const rank=p=>preferred.includes(p.id)?preferred.indexOf(p.id):10+p.id;
          return rank(a)-rank(b);
        }).slice(0,3);
        return choices.length ? {
          text:`${Number.isFinite(budget) ? `${ui.money(budget)} 이하에서 ` : ''}${group || space ? '말씀하신 조건으로' : '크림·우드에 작은 오렌지 포인트를 더해'} 골랐어요. 아래 제품에서 크기와 소재를 비교해 보세요. 예: “50만원 이하 조명 추천”처럼 더 구체적으로 물어볼 수 있어요.`,
          productIds:choices.map(p=>p.id),
        } : {text:'현재 카탈로그에는 이 조건에 맞는 상품이 없어요. 예산을 바꾸거나 다른 종류를 골라보세요.',actions:[{label:'전체 상품 비교하기',href:'list.html'}]};
      }
      return {text:'현재는 준비된 상품 데이터와 질문 유형으로 답하는 데모 상담이에요. 상품 추천, 배송, 소재·관리, 교환·반품을 안내할 수 있어요. 아래 빠른 질문을 골라보세요. 실제 주문 조회나 상담원 접수는 지원하지 않아요.'};
    },
  };
  // A server-backed provider can be supplied before this script. Never put API keys here.
  // Contract: { mode:'api', respond({message, productId, history, signal}) => Promise<{text, productIds?, actions?}> }
  const provider = window.NestoAssistantProvider?.respond ? window.NestoAssistantProvider : demoProvider;
  window.NestoAssistantAdapters = Object.freeze({demo:demoProvider});
  const isDemo = provider.mode !== 'api';
  const launcher = document.createElement('button');
  launcher.type='button'; launcher.className='n-assistant-launcher';
  launcher.setAttribute('aria-controls','n-assistant'); launcher.setAttribute('aria-expanded','false'); launcher.setAttribute('aria-haspopup','dialog');
  launcher.innerHTML='<svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M20 11a8 8 0 0 1-8 8H5l-3 3V11a9 9 0 0 1 18 0Z"/><path d="M7 10h8M7 14h5"/></svg><span>AI 문의하기</span>';
  const dialog=document.createElement('dialog');
  dialog.id='n-assistant'; dialog.className='n-assistant'; dialog.setAttribute('aria-labelledby','n-assistant-title'); dialog.setAttribute('aria-describedby','n-assistant-note');
  dialog.innerHTML=`<header class="n-assistant-header"><div><small>NESTO / A LITTLE HELP</small><h2 id="n-assistant-title">무엇을 도와드릴까요?</h2></div><button type="button" data-assistant-close aria-label="상담창 닫기">×</button></header><p class="n-assistant-note" id="n-assistant-note">${isDemo ? '데모 상담 · AI API 미연결 · 입력 내용은 전송·저장되지 않아요.' : 'AI 상담 · 답변은 상품 상세 정보와 함께 확인해 주세요.'}</p>${routeProduct ? `<a class="n-assistant-context" href="product.html?id=${routeProduct.id}">지금 보는 상품 · ${ui.esc(routeProduct.name)} ↗</a>` : ''}<div class="n-assistant-log" role="log" aria-live="polite" aria-relevant="additions" aria-label="상담 내용"></div><div class="n-assistant-questions" role="group" aria-label="빠른 질문">${topics.map(topic=>`<button type="button" data-assistant-question="${topic}">${topic} ↗</button>`).join('')}</div><p class="n-assistant-status" role="status"></p><form class="n-assistant-form"><label class="n-sr-only" for="n-assistant-input">궁금한 내용</label><input id="n-assistant-input" name="message" required maxlength="400" autocomplete="off" placeholder="궁금한 내용을 적어주세요"><button type="submit" aria-label="질문 보내기">↑</button></form>`;
  document.body.append(launcher,dialog);
  const log=dialog.querySelector('[role="log"]'), input=dialog.querySelector('input'), status=dialog.querySelector('[role="status"]');
  const history=[];
  let controller=null, opener=launcher, busy=false;
  function append(role,text,result={}) {
    const message=document.createElement('div'); message.className='n-assistant-message n-assistant-'+role;
    const label=document.createElement('small');label.textContent=role==='user'?'나':'NESTO';
    const paragraph=document.createElement('p'); paragraph.textContent=text;
    message.append(label,paragraph);
    for(const id of (Array.isArray(result.productIds)?result.productIds:[]).slice(0,3)) {
      const p=catalog.find(p=>p.id===id);if(!p)continue;
      const a=document.createElement('a');a.className='n-assistant-product';a.href=`product.html?id=${p.id}`;
      a.innerHTML=ui.photo(p.image,p.name)+`<span><strong>${ui.esc(p.name)}</strong><small>${ui.money(p.price)} · 상세 보기 ↗</small></span>`;
      message.append(a);
    }
    for(const action of (Array.isArray(result.actions)?result.actions:[]).slice(0,3)) {
      if(action.action==='account') {
        const button=document.createElement('button');button.type='button';button.textContent=action.label;
        button.onclick=()=>{dialog.close();document.querySelector('[data-action="account"]')?.click();};message.append(button);
      } else if(typeof action.href==='string' && /^(?:index|list|product)\.html(?:[?#].*)?$/.test(action.href)) {
        const a=document.createElement('a');a.href=action.href;a.textContent=action.label;a.className='n-assistant-link';message.append(a);
      }
    }
    log.append(message);log.scrollTop=log.scrollHeight;
  }
  function setBusy(value) {
    busy=value;
    dialog.querySelectorAll('[data-assistant-question],button[type="submit"]').forEach(button=>button.disabled=value);
    status.textContent=value?'답변을 확인하고 있어요.':'';
    log.setAttribute('aria-busy',String(value));
  }
  async function send(text) {
    const message=text.trim().slice(0,400);if(!message||busy)return;
    input.value='';append('user',message);setBusy(true);
    controller=new AbortController();const request=controller;
    const timeout=setTimeout(()=>request.abort(),20000);
    try {
      const response=await Promise.race([
        provider.respond({message,productId:routeProduct?.id??null,history:history.slice(-12),signal:request.signal}),
        new Promise((_,reject)=>request.signal.addEventListener('abort',()=>reject(new Error('aborted')),{once:true})),
      ]);
      if(!response||typeof response.text!=='string')throw new Error('invalid response');
      append('assistant',response.text,response);
      history.push({role:'user',content:message},{role:'assistant',content:response.text});
      if(history.length>12)history.splice(0,history.length-12);
    } catch {
      if(dialog.open) append('assistant','답변을 불러오지 못했어요. 잠시 후 다시 질문해 주세요. 상품 상세의 배송·관리 정보도 확인할 수 있어요.');
    } finally {
      clearTimeout(timeout);if(controller===request){controller=null;setBusy(false);}
    }
  }
  function open() {
    if(dialog.open)return;
    opener=document.activeElement;
    dialog.showModal();launcher.setAttribute('aria-expanded','true');
    if(!log.children.length)append('assistant',`안녕하세요, NESTO예요. ${routeProduct ? '지금 보고 계신 상품이 궁금한가요?' : '우리 집에 어울리는 가구를 함께 찾아볼까요?'}${isDemo ? ' 빠른 질문이나 짧은 문장으로 데모 상담을 이용해 보세요.' : ''}`);
    dialog.querySelector('[data-assistant-close]').focus();
  }
  launcher.onclick=open;
  dialog.querySelector('[data-assistant-close]').onclick=()=>dialog.close();
  dialog.querySelector('form').onsubmit=e=>{e.preventDefault();send(input.value);};
  dialog.querySelectorAll('[data-assistant-question]').forEach(button=>button.onclick=()=>send(button.dataset.assistantQuestion));
  dialog.addEventListener('keydown',event=>{if(event.key==='Escape')event.stopPropagation();});
  dialog.addEventListener('click',event=>{if(event.target===dialog){const r=dialog.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)dialog.close();}});
  dialog.addEventListener('close',()=>{controller?.abort();launcher.setAttribute('aria-expanded','false');if(opener?.isConnected)opener.focus({preventScroll:true});});
})();
