'use strict';
document.documentElement.classList.add('js');
const menuButton=document.querySelector('.menu-toggle');
const navigation=document.querySelector('#navigation');
function closeMenu(){navigation.classList.remove('is-open');menuButton.setAttribute('aria-expanded','false');}
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')!=='true';menuButton.setAttribute('aria-expanded',String(open));navigation.classList.toggle('is-open',open);});
navigation.addEventListener('click',e=>{if(e.target.closest('a'))closeMenu();});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&navigation.classList.contains('is-open')){closeMenu();menuButton.focus();}});
document.querySelectorAll('[data-service]').forEach(link=>link.addEventListener('click',()=>{document.querySelector('#service').value=link.dataset.service;document.querySelector('#enquiry-result').hidden=true;}));
const form=document.querySelector('#enquiry-form');
form.addEventListener('input',()=>{document.querySelector('#enquiry-result').hidden=true;});
form.addEventListener('submit',e=>{e.preventDefault();const data=new FormData(form);const name=String(data.get('name')).trim();if(!name){document.querySelector('#name').setCustomValidity('Please enter your name.');document.querySelector('#name').reportValidity();return;}
const message=`Hello Owambe Soirées, my name is ${name}.\n\nOccasion: ${data.get('event')}\nDate: ${data.get('date')||'Not decided yet'}\nHelp needed: ${data.get('service')}\n\n${String(data.get('message')).trim()}`;
document.querySelector('#send-whatsapp').href='https://wa.me/2348104030633?text='+encodeURIComponent(message);
document.querySelector('#send-email').href='mailto:i.khadijat@yahoo.com?subject='+encodeURIComponent('Event enquiry — '+data.get('event'))+'&body='+encodeURIComponent(message);
document.querySelector('#enquiry-result').hidden=false;});
document.querySelector('#name').addEventListener('input',e=>e.target.setCustomValidity(''));
document.querySelector('#year').textContent=new Date().getFullYear();
const galleryButtons=[...document.querySelectorAll('.image-open')];
const dialog=document.querySelector('#gallery-dialog');let currentImage=0;
function showImage(index){currentImage=(index+galleryButtons.length)%galleryButtons.length;const item=galleryButtons[currentImage];const image=document.querySelector('#large-image');image.src='images/'+item.dataset.image;image.alt=item.querySelector('img').alt;document.querySelector('#gallery-title').textContent=item.dataset.title;document.querySelector('#gallery-caption').textContent=item.dataset.caption;document.querySelector('#gallery-count').textContent=`${currentImage+1} / ${galleryButtons.length}`;}
galleryButtons.forEach((button,index)=>button.addEventListener('click',()=>{showImage(index);dialog.showModal();}));
document.querySelector('.dialog-close').addEventListener('click',()=>dialog.close());
document.querySelector('#previous-image').addEventListener('click',()=>showImage(currentImage-1));
document.querySelector('#next-image').addEventListener('click',()=>showImage(currentImage+1));
dialog.addEventListener('keydown',e=>{if(e.key==='ArrowRight'){e.preventDefault();showImage(currentImage+1);}if(e.key==='ArrowLeft'){e.preventDefault();showImage(currentImage-1);}});
dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close();}});
const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)');
const motionButton=document.querySelector('#motion-toggle');let motionDisabled=reducedMotion.matches;let motionContext;
function setupMotion(){motionContext?.revert();if(window.gsap){gsap.killTweensOf('.image-open');gsap.set('.image-open',{clearProps:'transform'});}document.documentElement.classList.toggle('motion-off',motionDisabled);motionButton.textContent=motionDisabled?'Motion: off':'Motion: on';motionButton.setAttribute('aria-pressed',String(motionDisabled));if(motionDisabled||!window.gsap||!window.ScrollTrigger)return;
gsap.registerPlugin(ScrollTrigger);motionContext=gsap.matchMedia();
motionContext.add('(prefers-reduced-motion: no-preference)',()=>{
  gsap.from('.title-line',{yPercent:35,opacity:.15,duration:.95,stagger:.12,ease:'power3.out',clearProps:'transform,opacity'});
  gsap.from('.hero-backdrop',{clipPath:'inset(8% 12% 8% 12%)',duration:1.4,ease:'power3.out',clearProps:'clipPath'});
  gsap.from('.hero-scene.current',{scale:1.12,duration:1.8,ease:'power2.out'});
  gsap.to('.reading-progress',{scaleX:1,ease:'none',scrollTrigger:{start:0,end:'max',scrub:.2}});
  gsap.from('.intro h2',{y:35,opacity:.25,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.intro',start:'top 85%',once:true},clearProps:'transform,opacity'});
  gsap.utils.toArray('.service').forEach(row=>gsap.from(row,{y:24,opacity:.35,duration:.65,ease:'power3.out',scrollTrigger:{trigger:row,start:'top 92%',once:true},clearProps:'transform,opacity'}));
  gsap.from('.art-caption',{x:-24,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.about-art',start:'top 70%',once:true},clearProps:'transform'});
});
motionContext.add('(hover: none) and (prefers-reduced-motion: no-preference)',()=>{
  // Touch visitors discover the photographs through scrolling, without a cursor.
  gsap.utils.toArray('.gallery-item').forEach(card=>{
    gsap.fromTo(card.querySelector('img'),{scale:1.14},{scale:1,ease:'none',scrollTrigger:{trigger:card,start:'top bottom',end:'bottom 35%',scrub:.4}});
    gsap.from(card.querySelector('figcaption'),{y:24,opacity:.3,duration:.65,ease:'power3.out',scrollTrigger:{trigger:card,start:'top 75%',once:true},clearProps:'transform,opacity'});
  });
  const rows=gsap.utils.toArray('.service');
  rows.forEach(row=>ScrollTrigger.create({trigger:row,start:'top 60%',end:'bottom 40%',toggleClass:'touch-highlight'}));
  gsap.utils.toArray('.steps article').forEach(step=>gsap.from(step,{y:24,opacity:.25,duration:.65,ease:'power3.out',scrollTrigger:{trigger:step,start:'top 85%',once:true},clearProps:'transform,opacity'}));
  gsap.from('.invitation-preview',{rotation:-3,y:30,opacity:.5,duration:.9,ease:'power3.out',scrollTrigger:{trigger:'.invitation-preview',start:'top 85%',once:true},clearProps:'transform,opacity'});
  gsap.to('.hero-scroll .circle-arrow',{y:7,duration:.65,yoyo:true,repeat:5,ease:'power2.inOut'});
  return()=>rows.forEach(row=>row.classList.remove('touch-highlight'));
});
motionContext.add('(min-width: 901px) and (prefers-reduced-motion: no-preference)',()=>{
  gsap.to('.hero-backdrop',{yPercent:15,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
  gsap.to('.hero-copy',{y:-65,ease:'none',scrollTrigger:{trigger:'.hero',start:'top top',end:'bottom top',scrub:1}});
  gsap.from('.steps article',{x:35,opacity:.25,stagger:{each:.15,ease:'power2.out'},duration:.8,ease:'power3.out',scrollTrigger:{trigger:'.steps',start:'top 80%',once:true},clearProps:'transform,opacity'});
});
motionContext.add('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)',()=>{
const cleanups=[];document.querySelectorAll('.magnetic').forEach(button=>{const move=e=>{const r=button.getBoundingClientRect();gsap.to(button,{x:(e.clientX-r.left-r.width/2)*.12,y:(e.clientY-r.top-r.height/2)*.15,duration:.25,overwrite:true});};const reset=()=>gsap.to(button,{x:0,y:0,duration:.35,overwrite:true});button.addEventListener('pointermove',move);button.addEventListener('pointerleave',reset);button.addEventListener('blur',reset);cleanups.push(()=>{button.removeEventListener('pointermove',move);button.removeEventListener('pointerleave',reset);button.removeEventListener('blur',reset);gsap.set(button,{clearProps:'transform'});});});return()=>cleanups.forEach(fn=>fn());
});}
motionButton.addEventListener('click',()=>{motionDisabled=!motionDisabled;setupMotion();});reducedMotion.addEventListener('change',()=>{motionDisabled=reducedMotion.matches;setupMotion();});setupMotion();
document.fonts.ready.then(()=>window.ScrollTrigger?.refresh());

// Scene changes are user-controlled; the opening never cycles while someone reads.
let sceneTransition;
const sceneButtons=[...document.querySelectorAll('[data-scene]')];
sceneButtons.forEach(button=>button.addEventListener('click',()=>{
  if(button.getAttribute('aria-pressed')==='true')return;
  sceneTransition?.kill();
  const current=document.querySelector('.hero-scene.current');
  const incoming=document.querySelector('.hero-scene.incoming');
  incoming.src='images/'+button.dataset.scene;
  sceneButtons.forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelector('#scene-credit').textContent=button.dataset.credit;
  const finish=()=>{current.src=incoming.src;incoming.style.opacity='0';incoming.style.transform='';};
  if(window.gsap&&!motionDisabled){sceneTransition=gsap.fromTo(incoming,{opacity:0,scale:1.08},{opacity:1,scale:1.03,duration:.65,ease:'power2.out',onComplete:finish});}else finish();
}));
document.querySelectorAll('[data-layout]').forEach(button=>button.addEventListener('click',()=>{
  const gallery=document.querySelector('.gallery');
  document.querySelectorAll('[data-layout]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  gallery.classList.toggle('contact-sheet',button.dataset.layout==='filmstrip');
  if(window.gsap&&!motionDisabled){gsap.fromTo(gallery,{opacity:.6},{opacity:1,duration:.25,ease:'power2.out',clearProps:'opacity'});}
  window.ScrollTrigger?.refresh();
}));
const precisePointer=matchMedia('(hover: hover) and (pointer: fine)');
document.querySelectorAll('.image-open').forEach(button=>{
  button.addEventListener('pointermove',e=>{if(motionDisabled||!precisePointer.matches||!window.gsap)return;const r=button.getBoundingClientRect();gsap.to(button,{rotationY:(e.clientX-r.left-r.width/2)/r.width*7,rotationX:-(e.clientY-r.top-r.height/2)/r.height*5,duration:.3,ease:'power2.out',overwrite:true});});
  const reset=()=>{if(window.gsap)gsap.to(button,{rotationY:0,rotationX:0,duration:motionDisabled?0:.4,overwrite:true,clearProps:'transform'});};
  button.addEventListener('pointerleave',reset);button.addEventListener('blur',reset);
});

let chosenOccasion='Wedding / kamu';
document.querySelectorAll('[data-occasion]').forEach(button=>button.addEventListener('click',event=>{
  chosenOccasion=button.dataset.occasion;
  document.querySelectorAll('[data-occasion]').forEach(b=>b.setAttribute('aria-pressed',String(b===button)));
  document.querySelector('#invitation-phrase').textContent=button.dataset.phrase;
  if(window.gsap&&!motionDisabled&&event.detail>0)gsap.fromTo('.invitation-preview',{rotation:-1,scale:.98},{rotation:2,scale:1,duration:.45,ease:'power3.out',overwrite:true});
}));
document.querySelector('#invitation-name').addEventListener('input',event=>{document.querySelector('#invitation-person').textContent=event.target.value.trim()||'Your people. Your celebration.';});
document.querySelector('#plan-occasion').addEventListener('click',()=>{document.querySelector('#event').value=chosenOccasion;document.querySelector('#enquiry-result').hidden=true;});
