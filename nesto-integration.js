(() => {
 const link=document.querySelector('[data-nesto-open]'),dialog=document.querySelector('[data-nesto-dialog]');
 if(!link||!dialog)return;
 let previousOverflow='';
 link.addEventListener('click',event=>{
 event.preventDefault();document.querySelector('[data-menu-close]')?.click();
 previousOverflow=document.body.style.overflow;document.body.style.overflow='hidden';
 const frame=dialog.querySelector('iframe');if(!frame.getAttribute('src'))frame.src='nesto.html';
 dialog.showModal();
 });
 const close=()=>{if(dialog.open)dialog.close();};
 dialog.querySelector('[data-nesto-close]').addEventListener('click',close);
 window.addEventListener('message',event=>{if(event.source===dialog.querySelector('iframe').contentWindow&&event.data?.type==='nesto:close')close();});
 dialog.addEventListener('close',()=>{document.body.style.overflow=previousOverflow;document.querySelector('[data-menu-open]')?.focus();});
})();