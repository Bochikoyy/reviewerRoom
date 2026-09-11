import {lessons} from './data.js';
import {icon,esc} from './study-ui.js';
let uploaded=[];
let expanded={};
try{expanded=JSON.parse(localStorage.getItem('sunroom-subject-folders')||'{}');}catch{}
export function setSidebarLessons(items){uploaded=items;window.dispatchEvent(new Event('sunroom-sidebar-changed'));}
export function toggleSubject(id){expanded[id]=!(expanded[id]??true);try{localStorage.setItem('sunroom-subject-folders',JSON.stringify(expanded));}catch{}window.dispatchEvent(new Event('sunroom-sidebar-changed'));}
export function studySidebar({unit,mode='notes',open=false,progress={},activeLesson,library=false}={}){
  const subjectNames=new Map([['endocrinology','Endocrinology'],...uploaded.map(l=>[l.subjectId,l.subject])]);
  const current=uploaded.find(l=>l.id===activeLesson);
  const selectedSubject=current?.subjectId||(!library?'endocrinology':null);
  const action=library?'data-lib':'data-action';
  const total=lessons.reduce((n,l)=>n+l.cards.length,0)+uploaded.reduce((n,l)=>n+l.cards.length,0);
  const learned=lessons.reduce((n,l)=>n+l.cards.filter(c=>progress.learned?.[c.id]).length,0)+uploaded.reduce((n,l)=>n+Object.values(l.cardRatings||{}).filter(r=>r==='know').length,0);
  return `<div class="sidebar-backdrop ${open?'show':''}" ${action}="close-menu"></div><aside class="sidebar ${open?'open':''}" id="${library?'library-subject-sidebar':'subject-sidebar'}" aria-label="Subject navigation" ${open?'role="dialog" aria-modal="true"':''}>
    <div class="sidebar-heading"><span class="eyebrow">YOUR STUDY SPACE</span><button class="icon-btn mobile-only" ${action}="close-menu" aria-label="Close subjects">${icon('close')}</button></div>
    <div class="subject-label">Subjects <span>${String(subjectNames.size).padStart(2,'0')}</span></div>
    ${[...subjectNames].map(([id,name],index)=>{const isOpen=expanded[id]??true;const collectionId=(library?'library-':'')+'subject-collection-'+index;const source=id==='endocrinology'?lessons:[];const own=uploaded.filter(l=>l.subjectId===id);return `<section class="subject-folder"><button class="subject-active subject-folder-toggle ${selectedSubject===id?'selected-subject':''}" ${action}="toggle-subject" data-lib="toggle-subject" data-id="${esc(id)}" aria-expanded="${isOpen}" aria-controls="${collectionId}" aria-label="${isOpen?'Collapse '+esc(name):'Expand '+esc(name)}" title="${isOpen?'Collapse '+esc(name):'Expand '+esc(name)}">${icon('leaf')}<span>${esc(name)}</span>${icon('chevron')}</button><div id="${collectionId}" ${isOpen?'':'hidden'}><div class="lesson-nav-label eyebrow">THE COLLECTION</div><nav class="lesson-nav" aria-label="${esc(name)} lessons">${source.map(l=>`<button ${library?'data-lib="builtin"':'data-action="lesson"'} data-id="${l.id}" class="lesson-link ${!library&&unit===l.id?'selected':''}" ${!library&&unit===l.id?'aria-current="page"':''}><span class="lesson-num">${String(l.id).padStart(2,'0')}</span><span><strong>Lesson ${l.id}</strong><small>${esc(l.sourceTitle)}</small></span>${progress.read?.[l.id]?icon('check','read-check'):''}</button>`).join('')}${own.map((l,i)=>`<button data-lib="open" data-id="${l.id}" class="lesson-link ${activeLesson===l.id?'selected':''}" ${activeLesson===l.id?'aria-current="page"':''}><span class="lesson-num">${String(source.length+i+1).padStart(2,'0')}</span><span><strong>${esc(l.lessonLabel)}</strong><small>${esc(l.title)}</small></span>${l.read?icon('check','read-check'):''}</button>`).join('')}</nav></div></section>`;}).join('')}
    <button class="btn primary sidebar-add" data-lib="upload">${icon('book')} Add Notes</button>
    <div class="sidebar-progress"><div class="eyebrow">A LITTLE EVERY DAY</div><div class="progress-heading"><strong>Your growing knowledge</strong>${icon('spark')}</div><p><span id="total-learned">${learned}</span> of ${total} flashcards learned</p><div class="progress-track"><span style="width:${total?learned/total*100:0}%"></span></div></div>
    <div class="sidebar-bottom"><div class="sunflower-small">${icon('sun')}</div><p>Good things take a little time.<br><strong>So does learning.</strong></p><div class="save-label">${icon('check')} <span>Progress saved on this device</span></div><div class="sidebar-utilities"><button class="text-btn export-btn" data-lib="home">${icon('folder')} Library</button><button class="text-btn export-btn" data-lib="settings">${icon('info')} Settings & Storage</button>${!library?`<button class="text-btn export-btn" data-action="export">${icon('download')} Export progress</button>`:''}</div></div>
  </aside>`;
}
