(() => {
 if(window.parent!==window)document.body.classList.add('embedded');
 const frame=document.querySelector('[data-preview]'),stage=document.querySelector('.preview-stage'),shell=document.querySelector('.preview-shell'),viewport=document.querySelector('.preview-viewport');
 const mobileQuery=matchMedia('(max-width:700px)'),tabletQuery=matchMedia('(max-width:1024px)');
 const defaultDevice=()=>mobileQuery.matches?'mobile':tabletQuery.matches?'pad':'pc';
 let device=defaultDevice(),screen='home',deviceSelected=false;
 const widths={pc:1440,pad:768,mobile:390},heights={pc:900,pad:1024,mobile:844},labels={home:'메인',list:'상품 목록',product:'상품 상세'};
 const pages={home:'index',list:'list',product:'product'};
 function resize(){
 const style=getComputedStyle(stage),available=Math.max(1,stage.clientWidth-parseFloat(style.paddingLeft)-parseFloat(style.paddingRight));
 // Scale the whole device, including its height, without changing its layout.
 const width=widths[device],height=heights[device],scale=Math.min(1,available/width);
 stage.style.minHeight='0';
 shell.style.width=width*scale+'px';viewport.style.width=width*scale+'px';viewport.style.height=height*scale+'px';frame.style.width=width+'px';frame.style.height=height+'px';frame.style.transform='scale('+scale+')';
 stage.dataset.device=device;
 document.querySelectorAll('[data-device]').forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.device===device)));
 document.querySelector('[data-size]').textContent=Math.round(width)+' PX';document.querySelector('.preview-caption').textContent=(device==='mobile'?'MO':device.toUpperCase())+' · '+labels[screen]+' — 화면 안에서 스크롤하며 직접 살펴보세요.';
 document.querySelector('.nesto-open-site a').href='nesto-shop/'+pages[screen]+'.html';
 }
 document.querySelectorAll('[data-device]').forEach(button=>button.addEventListener('click',()=>{deviceSelected=true;device=button.dataset.device;resize();}));
 document.querySelectorAll('[data-screen]').forEach(button=>button.addEventListener('click',()=>{screen=button.dataset.screen;document.querySelectorAll('[data-screen]').forEach(item=>item.setAttribute('aria-pressed',String(item===button)));frame.src='nesto-shop/'+({home:'index',list:'list',product:'product'}[screen])+'.html';resize();}));
 document.querySelectorAll('[data-back]').forEach(link=>link.addEventListener('click',event=>{if(window.parent!==window){event.preventDefault();window.parent.postMessage({type:'nesto:close'},'*');}}));
 window.addEventListener('keydown',event=>{if(event.key==='Escape'&&window.parent!==window)window.parent.postMessage({type:'nesto:close'},'*');});
 window.addEventListener('message',event=>{if(event.source===frame.contentWindow&&event.data?.type==='nesto:navigate'&&labels[event.data.page]){screen=event.data.page;document.querySelectorAll('[data-screen]').forEach(item=>item.setAttribute('aria-pressed',String(item.dataset.screen===screen)));resize();}});
 const adapt=()=>{if(!deviceSelected)device=defaultDevice();resize();};
 mobileQuery.addEventListener('change',adapt);tabletQuery.addEventListener('change',adapt);
 new ResizeObserver(resize).observe(stage);window.addEventListener('resize',resize);resize();
 if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('visible');observer.unobserve(entry.target);}}),{threshold:.08});document.querySelectorAll('.section-heading,.overview,.principles article,.photo-grid').forEach(item=>{item.classList.add('reveal');observer.observe(item);});}
})();
