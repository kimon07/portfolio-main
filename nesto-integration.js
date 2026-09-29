(() => {
 const link=document.querySelector('[data-nesto-open]'),dialog=document.querySelector('[data-nesto-dialog]');
 if(!link||!dialog)return;
 let previousOverflow='', returnFocus=null;
 link.addEventListener('click',event=>{
 event.preventDefault();returnFocus=document.activeElement;document.querySelector('[data-menu-close]')?.click();
 previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
 const frame=dialog.querySelector('iframe');if(!frame.getAttribute('src'))frame.src='nesto.html';
 if(!dialog.open)dialog.showModal();
 if(location.hash!=="#personal-project")history.pushState({route:"personal-project"},"","#personal-project");
 });
 const close=()=>{if(dialog.open)dialog.close();};
 dialog.querySelector('[data-nesto-close]').addEventListener('click',close);
 window.addEventListener('message',event=>{if(event.source===dialog.querySelector('iframe').contentWindow&&event.data?.type==='nesto:close')close();});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;if(location.hash==='#personal-project')history.replaceState({},'',location.pathname+location.search+'#works');
 if(!document.querySelector('[data-experience]').inert){
   const target=returnFocus?.isConnected&&returnFocus.matches('a[href],button,input,select,textarea,[tabindex]')&&returnFocus.getClientRects().length&&!returnFocus.closest('[aria-hidden="true"]')?returnFocus:document.querySelector('[data-menu-open]');
   target?.focus({preventScroll:true});
 }});
})();