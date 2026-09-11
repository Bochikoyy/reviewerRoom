import './style.css';
import { lessons, pathologyLessons, subjects } from './data.js';

const icons = {
 sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
 book:'<path d="M12 5v15M3 4c4-1 6 0 9 2 3-2 5-3 9-2v15c-4-1-6 0-9 2-3-2-5-3-9-2z"/>',
 cards:'<rect x="3" y="3" width="14" height="15" rx="2"/><path d="M8 21h11a2 2 0 0 0 2-2V8M7 8h6m-6 4h4"/>',
 quiz:'<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 4V2h6v2M9 10h6m-6 4h6m-6 4h3"/>',
 clock:'<circle cx="12" cy="13" r="8"/><path d="M12 9v4l3 2M9 2h6m-3 0v3M5 4 3 6"/>',
 arrow:'<path d="M5 12h14m-5-5 5 5-5 5"/>',
 chevron:'<path d="m9 5 7 7-7 7"/>',
 check:'<path d="m5 12 4 4L19 6"/>',
 close:'<path d="m6 6 12 12M6 18 18 6"/>',
 search:'<circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>',
 moon:'<path d="M20 15A9 9 0 0 1 9 4a9 9 0 1 0 11 11Z"/>',
 menu:'<path d="M4 6h16M4 12h16M4 18h16"/>',
 bookmark:'<path d="M6 3h12v18l-6-4-6 4z"/>',
 download:'<path d="M12 3v12m-4-4 4 4 4-4M4 16v5h16v-5"/>',
 leaf:'<path d="M19 4c-8-1-15 3-14 9 1 6 12 8 14-9ZM5 20l10-11"/>',
 shuffle:'<path d="M3 6h3c5 0 7 12 12 12h3m-4-4 4 4-4 4M3 18h3c2 0 3-2 4-4m4-4c1-2 2-4 4-4h3m-4-4 4 4-4 4"/>',
 reset:'<path d="M3 10a9 9 0 1 1 2 9M3 4v6h6"/>',
 play:'<path d="m8 4 12 8-12 8z"/>',
 pause:'<path d="M8 4v16M16 4v16"/>',
 skip:'<path d="m5 5 10 7-10 7zM19 5v14"/>',
 sound:'<path d="m11 4-6 5H2v6h3l6 5zM15 8a6 6 0 0 1 0 8m3-11a10 10 0 0 1 0 14"/>',
 mute:'<path d="m11 4-6 5H2v6h3l6 5zM16 9l6 6m0-6-6 6"/>',
 spark:'<path d="m12 2 2.5 7.5L22 12l-7.5 2.5L12 22l-2.5-7.5L2 12l7.5-2.5z"/>',
 info:'<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10v1"/>',
 folder:'<path d="M3 6V4h6l2 2h10v14H3z"/>',
 external:'<path d="M14 3h7v7m0-7L10 14M10 3H3v18h18v-7"/>'
};
const icon=(name,cls='')=>`<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[name]||icons.book}</svg>`;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let storageAvailable=true;
function read(key,fallback){try{return JSON.parse(localStorage.getItem(key))??fallback}catch{return fallback}}
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{storageAvailable=false;return false}}
const initial=()=>({learned:{},review:{},read:{},bookmarks:{},quizzes:{},best:{}});
let progress={...initial(),...read('sunroom-progress-v1',{})};
for(const key of Object.keys(initial()))if(!progress[key]||typeof progress[key]!=='object')progress[key]={};
const save=()=>{if(!write('sunroom-progress-v1',progress))toast('Browser storage is unavailable. Keep this page open to retain your session.');};
function parseHash(){
 const m=location.hash.match(/^#(?:(endocrinology|pathology)\/)?lesson-(\d+)\/(notes|flashcards|quiz)$/);
 if(m)return{subject:m[1]||'endocrinology',unit:Number(m[2]),mode:m[3]};
 return null;
}
const hashParams=parseHash();
const last=read('sunroom-view',{subject:'endocrinology',unit:1,mode:'notes'});
let currentSubject=hashParams?hashParams.subject:last.subject||'endocrinology';
if(!subjects[currentSubject])currentSubject='endocrinology';
const activeLessons=()=>subjects[currentSubject]?.lessons||lessons;
let unit=hashParams?hashParams.unit:Number(last.unit)||1;
if(!activeLessons().some(l=>l.id===unit))unit=activeLessons()[0]?.id||1;
let mode=hashParams?hashParams.mode:['notes','flashcards','quiz'].includes(last.mode)?last.mode:'notes';
let search='',bookmarksOnly=false,sidebarOpen=false,cardIndex=0,flipped=false,cardFilter='all',cardOrder=null,reviewOnly=false,lightboxFig=null;
let subjectFolders=read('sunroom-subject-folders',{endocrinology:true,pathology:true});
let endocrinologyOpen=subjectFolders.endocrinology??true;
let pathologyOpen=subjectFolders.pathology??true;
const lesson=()=>activeLessons().find(l=>l.id===unit)||activeLessons()[0];
const progressKey=(u=unit)=>currentSubject==='endocrinology'?u:`${currentSubject}-${u}`;
const bookmarkKey=(id)=>currentSubject==='endocrinology'?`${unit}-${id}`:`${currentSubject}-${unit}-${id}`;
const app=document.querySelector('#app');
let toastTimeout;
function toast(message){const el=document.querySelector('#toast');el.textContent=message;el.classList.add('visible');clearTimeout(toastTimeout);toastTimeout=setTimeout(()=>el.classList.remove('visible'),4000)}
function source(page,label='View source'){
 const pdfPath=currentSubject==='pathology'?`/lessons/Pathology-${unit}.pdf`:`/lessons/Unit-${unit}.pdf`;
 return `<a class="source-link" href="${pdfPath}#page=${page}" target="_blank" rel="noopener">${label} ${icon('external')}</a>`;
}
function learnedCount(l){return l.cards.filter(c=>progress.learned[c.id]).length}
function sidebar(){
 const isMobile=window.innerWidth<=760;
 const isDialog=isMobile&&sidebarOpen;
 const curLessons=activeLessons();
 const learnedTotal=curLessons.reduce((a,l)=>a+learnedCount(l),0);
 const cardTotal=curLessons.reduce((a,l)=>a+l.cards.length,0);
 return `<div class="sidebar-backdrop ${isDialog?'show':''}" data-action="close-menu"></div><aside class="sidebar ${sidebarOpen?'open':''}" id="subject-sidebar" aria-label="Subject navigation" ${isDialog?'role="dialog" aria-modal="true"':''}>
  <div class="sidebar-heading"><span class="eyebrow">YOUR STUDY SPACE</span><button class="icon-btn mobile-only" data-action="close-menu" aria-label="Close subjects">${icon('close')}</button></div>
  <div class="subject-label">Subjects <span>02</span></div>
   <section class="subject-folder"><button class="subject-folder-toggle ${currentSubject==='endocrinology'?'selected-subject subject-active':''}" data-action="toggle-subject" data-id="endocrinology" aria-expanded="${endocrinologyOpen}" aria-controls="subject-collection-0" aria-label="${endocrinologyOpen?'Collapse Endocrinology':'Expand Endocrinology'}" title="${endocrinologyOpen?'Collapse Endocrinology':'Expand Endocrinology'}">${icon('leaf')}<span>Endocrinology</span>${icon('chevron')}</button><div id="subject-collection-0" class="subject-collection" ${endocrinologyOpen?'':'hidden'}><div class="lesson-nav-label eyebrow">THE COLLECTION</div><nav class="lesson-nav" aria-label="Endocrinology lessons">${lessons.map(l=>`<button data-action="lesson" data-subject="endocrinology" data-id="${l.id}" class="lesson-link ${currentSubject==='endocrinology'&&unit===l.id?'selected':''}" ${currentSubject==='endocrinology'&&unit===l.id?'aria-current="page"':''}><span class="lesson-num">0${l.id}</span><span><strong>Lesson ${l.id}</strong><small>${l.sourceTitle}</small></span>${progress.read[l.id]?icon('check','read-check'):''}</button>`).join('')}</nav></div></section>
   <section class="subject-folder"><button class="subject-folder-toggle ${currentSubject==='pathology'?'selected-subject subject-active':''}" data-action="toggle-subject" data-id="pathology" aria-expanded="${pathologyOpen}" aria-controls="subject-collection-1" aria-label="${pathologyOpen?'Collapse Pathology':'Expand Pathology'}" title="${pathologyOpen?'Collapse Pathology':'Expand Pathology'}">${icon('book')}<span>Pathology</span>${icon('chevron')}</button><div id="subject-collection-1" class="subject-collection" ${pathologyOpen?'':'hidden'}><div class="lesson-nav-label eyebrow">THE COLLECTION</div><nav class="lesson-nav" aria-label="Pathology lessons">${pathologyLessons.map(l=>`<button data-action="lesson" data-subject="pathology" data-id="${l.id}" class="lesson-link ${currentSubject==='pathology'&&unit===l.id?'selected':''}" ${currentSubject==='pathology'&&unit===l.id?'aria-current="page"':''}><span class="lesson-num">0${l.id}</span><span><strong>Lesson ${l.id}</strong><small>${l.sourceTitle}</small></span>${progress.read[`pathology-${l.id}`]?icon('check','read-check'):''}</button>`).join('')}</nav></div></section>
  <div class="sidebar-progress"><div class="eyebrow">A LITTLE EVERY DAY</div><div class="progress-heading"><strong>Your growing knowledge</strong>${icon('spark')}</div><p><span id="total-learned">${learnedTotal}</span> of ${cardTotal} flashcards learned</p><div class="progress-track"><span style="width:${cardTotal?learnedTotal/cardTotal*100:0}%"></span></div></div>
  <div class="sidebar-bottom"><div class="sunflower-small">${icon('sun')}</div><p>Good things take a little time.<br><strong>So does learning.</strong></p><div class="save-label">${icon('check')} <span>${storageAvailable?'Progress saved on this device':'Session only · storage unavailable'}</span></div><button class="text-btn export-btn" data-action="export">${icon('download')} Export progress</button></div>
 </aside>`}
function render(){
 const l=lesson();
 const curSubjectObj=subjects[currentSubject]||subjects.endocrinology;
 document.title=`${curSubjectObj.name} · Lesson ${unit} · ${mode==='notes'?'Notes':mode==='quiz'?'Practice quiz':'Flashcards'} | Sunroom`;
 app.innerHTML=`<a href="#study-content" class="skip-link">Skip to lesson</a><header class="site-header"><div class="brand-group"><button class="icon-btn mobile-only" data-action="menu" aria-label="Open subjects" aria-expanded="${sidebarOpen}" aria-controls="subject-sidebar">${icon('menu')}</button><a class="brand" href="${currentSubject==='endocrinology'?`#lesson-${unit}/notes`:`#${currentSubject}/lesson-${unit}/notes`}" data-action="brand"><span class="brand-mark">${icon('sun')}</span><span>sunroom<span class="brand-dot">.</span></span></a><span class="header-divider"></span><span class="brand-caption">a brighter way to study</span></div><div class="header-actions"><span class="course-label">${icon(curSubjectObj.icon)} ${curSubjectObj.name.toUpperCase()}</span><button class="header-focus" data-action="timer">${icon('clock')}<span>Focus timer</span><span class="timer-running-dot" ${timer.running?'':'hidden'}></span></button><button class="icon-btn theme-btn" data-action="theme" aria-label="Switch to ${document.documentElement.dataset.theme==='dark'?'light':'dark'} mode">${icon(document.documentElement.dataset.theme==='dark'?'sun':'moon')}</button></div></header>
 ${sidebar()}<main class="main" id="study-content" tabindex="-1"><div class="breadcrumb">Subjects ${icon('chevron')} ${curSubjectObj.name} ${icon('chevron')} <span>Lesson ${unit}</span></div>
 <section class="lesson-hero"><div class="hero-copy"><div class="eyebrow hero-eyebrow"><span class="tiny-sun">${icon('sun')}</span> A LITTLE FOCUS. A LITTLE SUNSHINE.</div><h1>${l.title}<span>.</span></h1><p>${l.subtitle}</p><div class="hero-meta"><span>${icon('book')} ${currentSubject==='pathology'?'Lecture':'Unit'} ${unit} · ${l.pages} source pages</span><span>${icon('clock')} ~${l.time} min read</span><span class="source-tag">Based on your lesson PDF</span></div></div><div class="hero-art" aria-hidden="true"><div class="orbit orbit-one"></div><div class="orbit orbit-two"></div><div class="art-sun">${icon('sun')}</div><span class="art-spark spark-one">✧</span><span class="art-spark spark-two">✦</span><div class="art-note"><span>one concept</span><em>at a time.</em><i></i></div><div class="art-caption">MAKE ROOM TO GROW</div></div></section>
 <div class="study-toolbar"><div class="unit-tabs" role="tablist" aria-label="Choose lesson">${curSubjectObj.lessons.map(x=>`<button role="tab" aria-selected="${x.id===unit}" tabindex="${x.id===unit?0:-1}" data-action="lesson" data-subject="${currentSubject}" data-id="${x.id}" class="unit-tab ${unit===x.id?'active':''}"><span class="tab-number">0${x.id}</span>Lesson ${x.id}</button>`).join('')}</div><div class="mode-tabs" role="tablist" aria-label="Study mode">${[['notes','book','Notes'],['flashcards','cards','Flashcards'],['quiz','quiz','Quiz']].map(([key,ic,label])=>`<button role="tab" aria-selected="${key===mode}" tabindex="${key===mode?0:-1}" data-action="mode" data-mode="${key}" class="mode-tab ${mode===key?'active':''}">${icon(ic)}<span>${label}</span></button>`).join('')}</div></div>
 <div id="mode-content" role="tabpanel" aria-label="Lesson ${unit} ${mode}">${mode==='notes'?notesView():mode==='flashcards'?cardsView():quizView()}</div>
 <footer class="content-footer"><span>${icon('sun')} A little progress is still progress.</span><span>Made for curious minds · Sunroom</span></footer></main>${lightboxView()}`;
 document.body.classList.toggle('menu-open',sidebarOpen);
 document.querySelector('.site-header').inert=sidebarOpen;
 document.querySelector('.main').inert=sidebarOpen;
 document.querySelector('#timer-root').inert=sidebarOpen;
 bindInputs();
}
function renderFigure(fig){
 if(!fig)return '';
 const list=Array.isArray(fig)?fig:[fig];
 return list.map(f=>`<figure class="note-figure"><div class="figure-img-wrap" data-action="open-lightbox" data-fig-src="${esc(f.src)}" data-fig-alt="${esc(f.alt||'')}" data-fig-caption="${esc(f.caption||'')}" role="button" tabindex="0" aria-label="Click to zoom: ${esc(f.alt||'figure')}"><img src="${esc(f.src)}" alt="${esc(f.alt||'')}"><span class="zoom-hint">${icon('search')} Click to zoom</span></div>${f.caption?`<figcaption class="figure-caption">${f.caption}</figcaption>`:''}</figure>`).join('');
}
function lightboxView(){
 if(!lightboxFig)return '';
 return `<div class="lightbox-overlay" data-action="close-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer"><div class="lightbox-content"><div class="lightbox-image-area"><img class="lightbox-image" src="${esc(lightboxFig.src)}" alt="${esc(lightboxFig.alt||'')}"></div><aside class="lightbox-notes-panel"><div class="lightbox-notes-header"><h3>${icon('info')} Figure Notes</h3><button class="icon-btn lightbox-close" data-action="close-lightbox" aria-label="Close image viewer">${icon('close')}</button></div><div class="lightbox-notes-body">${lightboxFig.caption?`<div class="lightbox-caption">${lightboxFig.caption}</div>`:''}${lightboxFig.alt?`<div class="lightbox-alt"><span class="eyebrow">DESCRIPTION</span><p>${esc(lightboxFig.alt)}</p></div>`:''}<div class="lightbox-tip">${icon('sun')}<p>Use this view to study cell morphology details. Look for key identifying features described in the caption.</p></div></div></aside></div></div>`;
}
function notesView(){return `<div class="notes-layout"><div class="notes-main"><div class="notes-controls"><label class="search-box">${icon('search')}<input id="notes-search" type="search" placeholder="Find a concept in this lesson…" aria-label="Search lesson notes" value="${esc(search)}"><kbd>/</kbd></label><button class="icon-btn bookmark-filter ${bookmarksOnly?'active':''}" data-action="filter-bookmarks" aria-label="Show bookmarked sections" aria-pressed="${bookmarksOnly}">${icon('bookmark')}</button></div><div id="note-sections">${noteSections()}</div></div><aside class="lesson-aside"><div class="on-page"><div class="eyebrow">IN THIS LESSON</div><nav aria-label="Lesson sections">${lesson().sections.map((s,i)=>`<a href="#section-${i}" data-action="section" data-id="${i}"><span>${String(i+1).padStart(2,'0')}</span>${s.title}</a>`).join('')}</nav></div><div class="recall-callout">${icon('cards')}<h3>Make it stick.</h3><p>Close your notes. Try recalling one idea before moving on.</p><button class="text-btn" data-action="mode" data-mode="flashcards">Try the flashcards ${icon('arrow')}</button></div><a class="pdf-download" href="${currentSubject==='pathology'?`/lessons/Pathology-${unit}.pdf`:`/lessons/Unit-${unit}.pdf`}" download>${icon('download')}<span>Original lesson PDF<small>${currentSubject==='pathology'?`Pathology Lecture ${unit}`:`Unit ${unit}`} · ${lesson().pages} pages</small></span></a><p class="source-disclaimer">Study summaries based on your supplied units. Open the original PDF for full detail. Clinical examples are for course revision.</p></aside></div>`}
function noteSections(){const l=lesson();const sections=l.sections.map((s,i)=>({...s,index:i})).filter(s=>(!bookmarksOnly||progress.bookmarks[bookmarkKey(s.index)])&&(!search||JSON.stringify(s).toLowerCase().includes(search.toLowerCase())));
 return `${!search&&!bookmarksOnly?`<div class="objectives"><div class="objectives-icon">${icon('spark')}</div><div><div class="eyebrow">BY THE END, YOU’LL BE ABLE TO</div><ul>${l.objectives.map(o=>`<li>${o}</li>`).join('')}</ul></div></div>`:`<div class="search-results" role="status">${sections.length} section${sections.length===1?'':'s'} ${bookmarksOnly?'bookmarked':''}${search?` matching “${esc(search)}”`:''}<button class="text-btn" data-action="clear-search">Clear filters</button></div>`}
 ${sections.length?sections.map(s=>`<article class="note-section" id="section-${s.index}"><div class="section-title-row"><span class="section-index">${String(s.index+1).padStart(2,'0')}</span><h2>${s.title}</h2><button class="icon-btn note-bookmark ${progress.bookmarks[bookmarkKey(s.index)]?'active':''}" data-action="bookmark" data-id="${s.index}" aria-label="Bookmark ${esc(s.title)}" aria-pressed="${!!progress.bookmarks[bookmarkKey(s.index)]}">${icon('bookmark')}</button></div><p class="section-summary">${s.summary}</p><dl>${s.points.map(([a,b])=>`<div class="concept"><dt>${a}</dt><dd>${b}</dd></div>`).join('')}</dl>${s.table?`<div class="note-table-wrap"><table><caption>${s.table.caption}</caption><thead><tr>${s.table.headers.map(h=>`<th scope="col">${h}</th>`).join('')}</tr></thead><tbody>${s.table.rows.map(row=>`<tr>${row.map((cell,i)=>`${i===0?`<th scope="row">${cell}</th>`:`<td>${cell}</td>`}`).join('')}</tr>`).join('')}</tbody></table></div>`:''}${s.figure?renderFigure(s.figure):''}<div class="takeaway">${icon('sun')}<div><span class="eyebrow">THE TAKEAWAY</span><p>${s.takeaway}</p></div></div><div class="section-source">${currentSubject==='pathology'?'Lecture':'Unit'} ${unit} · pp. ${s.pages.join(', ')} ${source(s.pages[0])}</div></article>`).join(''):`<div class="empty-state">${icon('search')}<h3>${bookmarksOnly?'No bookmarked sections here yet.':'No matching concepts.'}</h3><p>${bookmarksOnly?'Use the bookmark beside a section title to save it.':'Try a shorter term, such as “hormone” or “feedback”.'}</p></div>`}
 <div class="lesson-end"><div>${icon(progress.read[progressKey()]?'check':'book')}<span><strong>${progress.read[progressKey()]?'Lesson marked as read':'One lesson, a little more clarity.'}</strong><small>Ready to put these ideas into practice?</small></span></div><button class="btn secondary" data-action="mark-read">${progress.read[progressKey()]?'Mark unread':'Mark as read'}</button><button class="btn primary" data-action="mode" data-mode="quiz">Try the quiz ${icon('arrow')}</button></div>`;
}
function cardDeck(){let cards=lesson().cards;if(cardFilter==='review')cards=cards.filter(c=>!progress.learned[c.id]);if(cardOrder)cards=[...cards].sort((a,b)=>cardOrder.indexOf(a.id)-cardOrder.indexOf(b.id));return cards}
function cardsView(){const deck=cardDeck();cardIndex=Math.min(cardIndex,Math.max(0,deck.length-1));const c=deck[cardIndex];const known=learnedCount(lesson());return `<section class="practice-area"><div class="practice-heading"><div><div class="eyebrow">A LITTLE ACTIVE RECALL</div><h2>Small cards. Lasting knowledge.</h2><p>Think of your answer, then flip to see how you did.</p></div><div class="learned-pill">${icon(subjects[currentSubject]?.icon||'leaf')} ${known} / ${lesson().cards.length} learned</div></div><div class="flash-toolbar"><div class="pill-group"><button data-action="card-filter" data-filter="all" class="${cardFilter==='all'?'active':''}" aria-pressed="${cardFilter==='all'}">All cards <span>${lesson().cards.length}</span></button><button data-action="card-filter" data-filter="review" class="${cardFilter==='review'?'active':''}" aria-pressed="${cardFilter==='review'}">Still learning <span>${lesson().cards.length-known}</span></button></div><button class="text-btn" data-action="shuffle">${icon('shuffle')} Shuffle</button></div>
 ${c?`<div class="flash-progress"><span>Card ${cardIndex+1} of ${deck.length}</span><span>${progress.learned[c.id]?'✓ Learned':progress.review[c.id]?'↻ Keep practicing':'A fresh little challenge'}</span></div><button class="flashcard ${flipped?'flipped':''}" data-action="flip" aria-label="${flipped?'Answer shown. Flip back to question.':'Flip card to reveal answer'}"><span class="eyebrow">${flipped?'THE ANSWER':'CAN YOU RECALL?'}</span><span class="flash-question">${flipped?c.back:c.front}</span>${flipped?`<span class="flash-detail">${c.detail}</span>`:''}<span class="flip-hint">${icon('reset')} ${flipped?'Click to see question':'Click to reveal answer'} <kbd>Space</kbd></span></button>
 <div class="flash-navigation"><button class="icon-btn nav-round" data-action="card-prev" aria-label="Previous flashcard" ${cardIndex===0?'disabled':''}>${icon('arrow','reverse')}</button><span>${String(cardIndex+1).padStart(2,'0')} <span class="muted">/ ${deck.length}</span></span><button class="icon-btn nav-round" data-action="card-next" aria-label="Next flashcard" ${cardIndex===deck.length-1?'disabled':''}>${icon('arrow')}</button></div>
 <div class="card-rating"><p>${flipped?'How did that one feel?':'Reveal the answer to track your learning.'}</p><div><button class="btn secondary" data-action="rate-card" data-rating="review" ${flipped?'':'disabled'}>${icon('reset')} Still learning</button><button class="btn primary" data-action="rate-card" data-rating="learned" ${flipped?'':'disabled'}>${icon('check')} Got it!</button></div></div><div class="flash-source">${currentSubject==='pathology'?'Lecture':'Unit'} ${unit}, page ${c.page} · ${source(c.page,'Check the original')}</div>`:`<div class="empty-state complete-state">${icon('sun')}<h2>A little sunshine, well earned.</h2><p>You’ve marked all ${lesson().cards.length} cards as learned. Revisit the full deck whenever you like.</p><button class="btn primary" data-action="card-filter" data-filter="all">Review all cards ${icon('arrow')}</button></div>`}
 <div class="practice-tip">${icon('info')} Flashcards track your self-assessment. Quiz results are saved separately.</div></section>`}
function shuffled(items){return [...items].map(value=>({value,sort:Math.random()})).sort((a,b)=>a.sort-b.sort).map(x=>x.value)}
function makeQuiz(){return {answers:{},index:0,submitted:false,started:Date.now(),options:Object.fromEntries(lesson().questions.filter(q=>q.options).map(q=>[q.id,shuffled(q.options)])),rubrics:{}}}
function normalize(s){return String(s||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]/g,'')}
function correct(q,value){return q.type==='mcq'?value===q.answer:[q.answer,...q.aliases||[]].some(a=>normalize(a)===normalize(value))}
function objectiveScore(qz){return lesson().questions.filter(q=>q.type!=='essay'&&correct(q,qz.answers[q.id])).length}
function answered(qz){return lesson().questions.filter(q=>String(qz.answers[q.id]||'').trim()).length}
function quizView(){const l=lesson(),qKey=progressKey(),qz=progress.quizzes[qKey];
 if(!qz)return `<section class="quiz-intro"><div class="quiz-intro-art">${icon('quiz')}<span>✧</span></div><div class="eyebrow">${subjects[currentSubject].name.toUpperCase()} · LESSON ${unit} · PRACTICE QUIZ</div><h2>A check-in, not a finish line.</h2><p>30 questions to help you find what’s sticking<br class="desktop-break"> and what could use another look.</p><div class="quiz-breakdown"><div><strong>15</strong><span>Multiple choice</span></div><div><strong>10</strong><span>Identification</span></div><div><strong>05</strong><span>Essay</span></div></div><div class="quiz-explainer"><p>${icon('check')} Multiple choice and identification are checked after submission.</p><p>${icon('check')} Essays include model answers and three-point self-review rubrics.</p><p>${icon('check')} No countdown. Your answers save as you go on this device.</p></div><button class="btn primary large" data-action="start-quiz">Let’s give it a try ${icon('arrow')}</button>${progress.best[qKey]!=null?`<div class="previous-best">Your best objective score: ${progress.best[qKey]} / 25</div>`:''}<p class="soft-note">You don’t have to know everything to begin.</p></section>`;
 if(qz.submitted)return resultsView(qz);
 const q=l.questions[qz.index];const a=qz.answers[q.id]||'';return `<section class="quiz-workspace"><div class="quiz-top"><div><div class="eyebrow">${subjects[currentSubject].name.toUpperCase()} · LESSON ${unit} · PRACTICE QUIZ</div><h2>Let’s see what’s sticking.</h2></div><span class="saved-state">${icon('check')} <span id="quiz-save-state">${storageAvailable?'Saved on this device':'Session only'}</span></span></div><div class="quiz-layout"><div class="question-panel"><div class="question-meta"><span class="type-badge">${q.type==='mcq'?'Multiple choice':q.type==='essay'?'Essay · self-reviewed':'Identification'}</span><span>Question ${qz.index+1} <span class="muted">of 30</span></span></div><div class="progress-track"><span style="width:${(qz.index+1)/30*100}%"></span></div><h3 id="question-prompt">${q.prompt}</h3>${q.type==='mcq'?`<div class="answer-options" role="radiogroup" aria-labelledby="question-prompt">${qz.options[q.id].map((o,i)=>`<label class="answer-option ${a===o?'selected':''}"><input type="radio" name="answer" value="${esc(o)}" ${a===o?'checked':''}><span class="option-letter">${'ABCD'[i]}</span><span>${o}</span><span class="option-check">${a===o?icon('check'):''}</span></label>`).join('')}</div>`:q.type==='identification'?`<label class="answer-label" for="written-answer">Your answer</label><input class="written-answer" id="written-answer" autocomplete="off" placeholder="Type the term or accepted abbreviation…" value="${esc(a)}"><p class="answer-help">Capitalization, spacing, and punctuation don’t affect checking. Common abbreviations are accepted.</p>`:`<label class="answer-label" for="written-answer">Explain it in your own words</label><textarea class="written-answer essay-answer" id="written-answer" placeholder="Start with the key idea, then explain how or why…">${esc(a)}</textarea><div class="essay-meta"><span>Model answer and rubric appear after submission.</span><span id="word-count">${wordCount(a)} words</span></div>`}<div class="question-actions"><button class="btn secondary" data-action="quiz-prev" ${qz.index===0?'disabled':''}>${icon('arrow','reverse')} Previous</button>${qz.index<29?`<button class="btn primary" data-action="quiz-next">Next question ${icon('arrow')}</button>`:`<button class="btn primary" data-action="submit-quiz">Finish quiz ${icon('check')}</button>`}</div></div><aside class="question-overview"><div class="eyebrow">YOUR QUESTIONS</div><div class="question-grid">${l.questions.map((x,i)=>`<button class="${qz.index===i?'current':''} ${String(qz.answers[x.id]||'').trim()?'answered':''}" data-action="quiz-jump" data-id="${i}" aria-label="Question ${i+1}${String(qz.answers[x.id]||'').trim()?', answered':''}" ${qz.index===i?'aria-current="step"':''}>${i+1}</button>`).join('')}</div><div class="question-legend"><span><i></i> Answered</span><span><i></i> Current</span></div><p id="answered-count">${answered(qz)} of 30 answered</p><button class="btn secondary full" data-action="submit-quiz">Finish & review ${icon('arrow')}</button><p class="small-note">You can switch lessons and pick up where you left off.</p></aside></div></section>`;
}
function wordCount(s){return s.trim()?s.trim().split(/\s+/).length:0}
function resultsView(qz){const qKey=progressKey(),score=objectiveScore(qz),questions=lesson().questions;return `<section class="results"><div class="results-banner"><div><div class="eyebrow">A LITTLE WISER THAN BEFORE</div><h2>You showed up. That counts.</h2><p>Use your answers to decide what to revisit next.</p></div><div class="score-circle"><strong>${score}<span>/25</span></strong><small>OBJECTIVE SCORE</small></div></div><div class="results-stats"><span>${Math.round(score/25*100)}% objective accuracy</span><span>5 essays · self-review separately</span><span>Best: ${progress.best[qKey]??score} / 25</span></div><div class="results-actions"><div class="pill-group"><button data-action="results-filter" data-filter="all" class="${reviewOnly?'':'active'}" aria-pressed="${!reviewOnly}">All answers</button><button data-action="results-filter" data-filter="missed" class="${reviewOnly?'active':''}" aria-pressed="${reviewOnly}">Needs review</button></div><button class="btn secondary" data-action="retake">${icon('reset')} Retake quiz</button></div><p class="review-guide">${icon('info')} Objective answers are checked against the lesson key. Essays are not automatically graded; tick each rubric point your answer covers.</p><div class="answer-review">${questions.filter(q=>!reviewOnly||q.type==='essay'||!correct(q,qz.answers[q.id])).map(q=>{const n=questions.indexOf(q)+1,ok=q.type!=='essay'&&correct(q,qz.answers[q.id]);return `<article class="review-card ${q.type==='essay'?'essay-review':ok?'correct':'incorrect'}"><div class="review-heading"><span class="review-number">${String(n).padStart(2,'0')}</span><span class="type-badge">${q.type==='mcq'?'Multiple choice':q.type==='essay'?'Essay':'Identification'}</span><span class="result-label">${q.type==='essay'?'Self-review':ok?'✓ Correct':'↻ Revisit'}</span></div><h3>${q.prompt}</h3><div class="your-answer"><span class="eyebrow">YOUR ANSWER</span><p>${esc(qz.answers[q.id]||'Not answered')}</p></div>${q.type==='essay'?`<details class="model-answer"><summary>Model answer & self-review rubric ${icon('chevron')}</summary><p>${q.model}</p><div class="rubric">${q.rubric.map((r,i)=>`<label><input type="checkbox" data-rubric="${q.id}" data-point="${i}" ${(qz.rubrics[q.id]||[]).includes(i)?'checked':''}><span>${r}</span></label>`).join('')}</div><div class="rubric-score" id="rubric-${q.id}">${(qz.rubrics[q.id]||[]).length} / 3 points covered · self-assessed</div></details>`:`<div class="answer-explanation"><strong>${ok?'Why it’s right':`Correct answer: ${q.answer}`}</strong><p>${q.explanation}</p></div>`}<div class="section-source">${currentSubject==='pathology'?'Lecture':'Unit'} ${unit} · p. ${q.page} ${source(q.page)}</div></article>`}).join('')}</div><div class="results-end"><p>Knowledge grows with a second look.</p><button class="btn primary" data-action="mode" data-mode="flashcards">Revisit the flashcards ${icon('arrow')}</button></div></section>`}
function setView(nextUnit,nextMode,nextSubject=currentSubject){
 currentSubject=nextSubject;
 if(!subjects[currentSubject])currentSubject='endocrinology';
 unit=nextUnit;
 mode=nextMode;
 search='';
 bookmarksOnly=false;
 sidebarOpen=false;
 cardIndex=0;
 flipped=false;
 cardOrder=null;
 reviewOnly=false;
 write('sunroom-view',{subject:currentSubject,unit,mode});
 const hash=currentSubject==='endocrinology'?`#lesson-${unit}/${mode}`:`#${currentSubject}/lesson-${unit}/${mode}`;
 history.replaceState(null,'',hash);
 render();
 window.scrollTo({top:0,behavior:'instant'});
 document.querySelector('#study-content').focus({preventScroll:true});
}
function refreshMode(){document.querySelector('#mode-content').innerHTML=mode==='notes'?notesView():mode==='flashcards'?cardsView():quizView();bindInputs()}
function refreshSidebar(){const side=document.querySelector('.sidebar');side.outerHTML=sidebar().match(/<aside[\s\S]*<\/aside>/)[0]}
function bindInputs(){
 const qKey=progressKey();
 document.querySelector('#notes-search')?.addEventListener('input',e=>{search=e.target.value;document.querySelector('#note-sections').innerHTML=noteSections()});
 document.querySelectorAll('input[name="answer"]').forEach(el=>el.addEventListener('change',e=>{progress.quizzes[qKey].answers[lesson().questions[progress.quizzes[qKey].index].id]=e.target.value;save();refreshMode();document.querySelector('input[name="answer"]:checked')?.focus()}));
 document.querySelector('#written-answer')?.addEventListener('input',e=>{const qz=progress.quizzes[qKey],q=lesson().questions[qz.index];qz.answers[q.id]=e.target.value;save();document.querySelector('#answered-count').textContent=`${answered(qz)} of 30 answered`;const cell=document.querySelector(`.question-grid [data-id="${qz.index}"]`);cell.classList.toggle('answered',!!e.target.value.trim());cell.setAttribute('aria-label',`Question ${qz.index+1}${e.target.value.trim()?', answered':''}`);if(document.querySelector('#word-count'))document.querySelector('#word-count').textContent=`${wordCount(e.target.value)} words`;document.querySelector('#quiz-save-state').textContent=storageAvailable?'Saved on this device':'Session only'});
 document.querySelectorAll('[data-rubric]').forEach(el=>el.addEventListener('change',e=>{const qz=progress.quizzes[qKey],qid=e.target.dataset.rubric,point=Number(e.target.dataset.point);qz.rubrics[qid]??=[];qz.rubrics[qid]=e.target.checked?[...new Set([...qz.rubrics[qid],point])]:qz.rubrics[qid].filter(x=>x!==point);save();document.querySelector(`#rubric-${qid}`).textContent=`${qz.rubrics[qid].length} / 3 points covered · self-assessed`;}));
}
function confirmDialog(title,message,label,callback){const previous=document.activeElement;const d=document.createElement('dialog');d.className='confirm-dialog';d.innerHTML=`<form method="dialog"><span class="dialog-sun">${icon('sun')}</span><h2>${title}</h2><p>${message}</p><div class="dialog-actions"><button class="btn secondary" value="cancel">Keep studying</button><button class="btn primary" value="confirm">${label}</button></div></form>`;document.body.append(d);d.addEventListener('close',()=>{const yes=d.returnValue==='confirm';d.remove();if(yes)callback();else previous?.focus()});d.showModal()}
app.addEventListener('click',e=>{
 const btn=e.target.closest('[data-action]');if(!btn)return;const action=btn.dataset.action;
 if(btn.tagName==='A')e.preventDefault();
 if(action==='lesson'){
  const s=btn.dataset.subject||currentSubject;
  return setView(Number(btn.dataset.id),mode,s);
 }
 if(action==='mode')return setView(unit,btn.dataset.mode,currentSubject);
 if(action==='brand')return setView(unit,'notes',currentSubject);
 if(action==='toggle-subject'){
  const id=btn.dataset.id;
  if(id==='pathology'){
   pathologyOpen=!pathologyOpen;
   subjectFolders.pathology=pathologyOpen;
  }else{
   endocrinologyOpen=!endocrinologyOpen;
   subjectFolders.endocrinology=endocrinologyOpen;
  }
  write('sunroom-subject-folders',subjectFolders);
  refreshSidebar();
  document.querySelector(`[data-id="${id}"].subject-folder-toggle`)?.focus();
  return;
 }
 if(action==='subject'){
  const id=btn.dataset.id||'endocrinology';
  return setView(1,'notes',id);
 }
 if(action==='menu'||action==='close-menu'){sidebarOpen=action==='menu';render();document.querySelector(sidebarOpen?'[data-action="close-menu"].icon-btn':'[data-action="menu"]')?.focus();return}
 if(action==='theme'){const t=document.documentElement.dataset.theme==='dark'?'light':'dark';document.documentElement.dataset.theme=t;try{localStorage.setItem('sunroom-theme',t)}catch{}btn.setAttribute('aria-label',`Switch to ${t==='dark'?'light':'dark'} mode`);btn.innerHTML=icon(t==='dark'?'sun':'moon');return}
 if(action==='timer'){timerOpen=!timerOpen;renderTimer();return}
 if(action==='filter-bookmarks'){bookmarksOnly=!bookmarksOnly;refreshMode();return}
 if(action==='clear-search'){search='';bookmarksOnly=false;refreshMode();return}
 if(action==='bookmark'){const key=bookmarkKey(btn.dataset.id);progress.bookmarks[key]=!progress.bookmarks[key];save();if(bookmarksOnly)refreshMode();else{btn.classList.toggle('active',!!progress.bookmarks[key]);btn.setAttribute('aria-pressed',!!progress.bookmarks[key])}return}
 if(action==='section'){search='';bookmarksOnly=false;refreshMode();document.querySelector(`#section-${btn.dataset.id}`)?.scrollIntoView({behavior:'smooth',block:'start'});return}
 if(action==='mark-read'){const k=progressKey();progress.read[k]=!progress.read[k];save();refreshMode();refreshSidebar();return}
 if(action==='card-filter'){cardFilter=btn.dataset.filter;cardIndex=0;flipped=false;refreshMode();return}
 if(action==='flip'){flipped=!flipped;refreshMode();document.querySelector('.flashcard')?.focus({preventScroll:true});return}
 if(action==='card-prev'||action==='card-next'){cardIndex+=action==='card-prev'?-1:1;flipped=false;refreshMode();return}
 if(action==='shuffle'){cardOrder=shuffled(lesson().cards.map(c=>c.id));cardIndex=0;flipped=false;refreshMode();toast('Deck shuffled. A fresh perspective.');return}
 if(action==='rate-card'){const deck=cardDeck(),c=deck[cardIndex];if(!c||!flipped)return;progress.learned[c.id]=btn.dataset.rating==='learned';progress.review[c.id]=btn.dataset.rating==='review';save();if(!(cardFilter==='review'&&btn.dataset.rating==='learned'))cardIndex=Math.min(cardIndex+1,deck.length-1);flipped=false;refreshMode();refreshSidebar();return}
 if(action==='start-quiz'){const k=progressKey();progress.quizzes[k]=makeQuiz();save();refreshMode();return}
 if(action==='quiz-next'||action==='quiz-prev'||action==='quiz-jump'){const k=progressKey(),qz=progress.quizzes[k];qz.index=action==='quiz-jump'?Number(btn.dataset.id):Math.max(0,Math.min(29,qz.index+(action==='quiz-next'?1:-1)));save();refreshMode();document.querySelector('.quiz-top')?.scrollIntoView({block:'start',behavior:'instant'});document.querySelector('.question-panel h3')?.setAttribute('tabindex','-1');document.querySelector('.question-panel h3')?.focus({preventScroll:true});return}
 if(action==='submit-quiz'){const k=progressKey(),qz=progress.quizzes[k],missing=30-answered(qz);confirmDialog(missing?`${missing} question${missing===1?' is':'s are'} still unanswered.`:'Ready for a little reflection?',missing?'Unanswered objective questions will count as incorrect. You can go back or finish to see the answers.':'Submit your 25 objective answers and open the model answers for your 5 essays.','Finish & review',()=>{qz.submitted=true;qz.completed=Date.now();progress.best[k]=Math.max(progress.best[k]||0,objectiveScore(qz));save();refreshMode();document.querySelector('.results').scrollIntoView({block:'start'})});return}
 if(action==='results-filter'){reviewOnly=btn.dataset.filter==='missed';refreshMode();return}
 if(action==='retake'){confirmDialog('A fresh start?','This replaces this lesson’s current answers and essay self-review. Your best objective score will stay saved.','Start again',()=>{const k=progressKey();progress.quizzes[k]=makeQuiz();save();reviewOnly=false;refreshMode()});return}
 if(action==='open-lightbox'){e.preventDefault();const d=document.createElement('div');d.innerHTML=btn.dataset.figCaption||'';const caption=d.innerHTML;lightboxFig={src:btn.dataset.figSrc,alt:btn.dataset.figAlt,caption};const existing=document.querySelector('.lightbox-overlay');if(existing)existing.remove();app.insertAdjacentHTML('beforeend',lightboxView());document.body.style.overflow='hidden';document.querySelector('.lightbox-close')?.focus();return}
 if(action==='close-lightbox'){if(btn.classList.contains('lightbox-close')||e.target.classList.contains('lightbox-overlay')){lightboxFig=null;document.querySelector('.lightbox-overlay')?.remove();document.body.style.overflow='';}return}
 if(action==='close-donation'){closeDonationModal();return}
 if(action==='backdrop-donation'){if(e.target.classList.contains('donation-overlay'))closeDonationModal();return}
 if(action==='export'){const blob=new Blob([JSON.stringify({app:'Sunroom',version:1,exported:new Date().toISOString(),progress,timer},null,2)],{type:'application/json'});const url=URL.createObjectURL(blob),link=document.createElement('a');link.href=url;link.download=`sunroom-progress-${new Date().toISOString().slice(0,10)}.json`;link.click();setTimeout(()=>URL.revokeObjectURL(url),1000);toast('Progress exported as a JSON record.');return}
});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'){
  if(donationModalActive){
   if(donationModalActive.remaining<=0)closeDonationModal();
   return;
  }
  if(lightboxFig){lightboxFig=null;document.querySelector('.lightbox-overlay')?.remove();document.body.style.overflow='';return}
  if(sidebarOpen){sidebarOpen=false;render();document.querySelector('[data-action="menu"]')?.focus()}
  if(timerOpen){timerOpen=false;renderTimer();document.querySelector('.timer-fab')?.focus()}
  return;
 }
 if(sidebarOpen&&e.key==='Tab'){const elements=[...document.querySelectorAll('.sidebar button,.sidebar a')].filter(x=>x.offsetParent!==null),first=elements[0],last=elements.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}return}
 if(e.target.closest('input,textarea,select,dialog'))return;
 if(e.key==='/'&&mode==='notes'){e.preventDefault();document.querySelector('#notes-search')?.focus()}
 if(e.target.getAttribute('role')==='tab'&&['ArrowLeft','ArrowRight','Home','End'].includes(e.key)){e.preventDefault();const tabs=[...e.target.parentElement.querySelectorAll('[role="tab"]')];const i=e.key==='Home'?0:e.key==='End'?tabs.length-1:(tabs.indexOf(e.target)+(e.key==='ArrowRight'?1:tabs.length-1))%tabs.length;const target=tabs[i];const selector=target.dataset.mode?`[data-mode="${target.dataset.mode}"].mode-tab`:`[data-id="${target.dataset.id}"].unit-tab`;target.click();document.querySelector(selector)?.focus();return}
 if(mode==='flashcards'&&!timerOpen&&!sidebarOpen&&e.target===document.body){if(e.code==='Space'){e.preventDefault();document.querySelector('[data-action="flip"]')?.click()}if(e.key==='ArrowRight')document.querySelector('[data-action="card-next"]:not(:disabled)')?.click();if(e.key==='ArrowLeft')document.querySelector('[data-action="card-prev"]:not(:disabled)')?.click()}
});
window.addEventListener('hashchange',()=>{const p=parseHash();if(p)setView(p.unit,p.mode,p.subject)});
window.addEventListener('resize',()=>{if(window.innerWidth>760&&sidebarOpen){sidebarOpen=false;render()}});

// The timer uses an absolute deadline so background tabs and refreshes do not lose time.
const defaultTimer={study:25,rest:5,phase:'study',remaining:1500,running:false,end:null,sessions:0,sound:true,preset:'25/5',finished:false};
let timer={...defaultTimer,...read('sunroom-timer-v1',{})},timerOpen=false;
if(!Number.isFinite(timer.remaining)||!Number.isFinite(timer.study)||!Number.isFinite(timer.rest)||!['study','rest'].includes(timer.phase))timer={...defaultTimer};
let audioContext;
function timerSave(){write('sunroom-timer-v1',timer)}
function remaining(){return timer.running?Math.max(0,Math.ceil((timer.end-Date.now())/1000)):timer.remaining}
function timeLabel(seconds){return `${String(Math.floor(seconds/60)).padStart(2,'0')}:${String(seconds%60).padStart(2,'0')}`}
function unlockAudio(){try{audioContext??=new (window.AudioContext||window.webkitAudioContext)();audioContext.resume()}catch{}}
function chime(){if(!timer.sound)return;try{unlockAudio();const tones=[659.25,783.99,1046.5];for(let cycle=0;cycle<3;cycle++)tones.forEach((freq,i)=>{const osc=audioContext.createOscillator(),gain=audioContext.createGain();osc.type='sine';osc.connect(gain);gain.connect(audioContext.destination);osc.frequency.value=freq;const start=audioContext.currentTime+cycle*1.05+i*.17;gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(.2,start+.025);gain.gain.exponentialRampToValueAtTime(.001,start+.72);osc.start(start);osc.stop(start+.75)})}catch{}}
function setPhase(phase,start=false){timer.phase=phase;timer.remaining=timer[phase]*60;timer.running=start;timer.end=start?Date.now()+timer.remaining*1000:null;timer.finished=false;timerSave();renderTimer()}
function renderTimer(){const root=document.querySelector('#timer-root');root.innerHTML=`${timerOpen?`<section class="timer-panel" role="region" aria-label="Focus timer"><div class="timer-panel-head"><div><h2>${icon('clock')} A moment to focus</h2><p>${timer.sessions} study session${timer.sessions===1?'':'s'} completed</p></div><button class="icon-btn" data-timer="close" aria-label="Close focus timer">${icon('close')}</button></div><div class="timer-presets" role="group" aria-label="Focus interval">${['25/5','50/10','90/20','custom'].map(p=>`<button data-timer="preset" data-preset="${p}" class="${timer.preset===p?'active':''}" aria-pressed="${timer.preset===p}">${p==='custom'?'Custom':p}</button>`).join('')}</div>${timer.preset==='custom'?`<div class="custom-times"><label>Study time<div><input type="number" id="study-minutes" min="1" max="180" value="${timer.study}" aria-label="Study minutes"><span>min</span></div></label><label>Rest time<div><input type="number" id="rest-minutes" min="1" max="60" value="${timer.rest}" aria-label="Rest minutes"><span>min</span></div></label></div>`:''}<div class="timer-display"><span class="eyebrow">${timer.phase==='study'?'TIME TO GROW':'TIME TO RECHARGE'}</span><div class="timer-digits-row"><button class="timer-adjust" data-timer="subtract" aria-label="Subtract five minutes" ${remaining()<=60?'disabled':''}>−5m</button><strong id="timer-digits">${timeLabel(remaining())}</strong><button class="timer-adjust" data-timer="add" aria-label="Add five minutes">+5m</button></div><span class="timer-phase">${timer.phase==='study'?'One thing at a time. You’ve got this.':'Relax your shoulders. Take a breath.'}</span></div>${timer.finished?`<div class="timer-finished" role="status">${icon('check')} ${timer.phase==='study'?'Study complete. Take a little break.':'Break complete. Ready when you are.'}<button class="btn primary full" data-timer="transition">Start ${timer.phase==='study'?timer.rest+'m rest':timer.study+'m study'} ${icon('arrow')}</button></div>`:''}<div class="timer-controls"><button class="btn primary" data-timer="toggle">${icon(timer.running?'pause':'play')} ${timer.running?'Pause':remaining()<timer[timer.phase]*60&&!timer.finished?'Resume':timer.phase==='study'?'Start study':'Start rest'}</button><button class="icon-btn" data-timer="reset" aria-label="Reset current timer">${icon('reset')}</button><button class="icon-btn" data-timer="skip" aria-label="Switch to ${timer.phase==='study'?'rest':'study'}">${icon('skip')}</button><button class="icon-btn" data-timer="sound" aria-label="${timer.sound?'Mute':'Enable'} completion sound" aria-pressed="${timer.sound}">${icon(timer.sound?'sound':'mute')}</button></div><p class="timer-footnote">${timer.phase==='study'?`${timer.study} min focus · ${timer.rest} min rest`:'Rest is part of the process.'} · Timer survives refresh</p></section>`:''}<button class="timer-fab ${timer.running?'running':''}" data-timer="open" aria-label="${timerOpen?'Close':'Open'} focus timer" aria-expanded="${timerOpen}">${icon('clock')}<span>${timer.running?timeLabel(remaining()):'Let’s focus'}</span></button>`;document.querySelector('.timer-running-dot')?.toggleAttribute('hidden',!timer.running);
 document.querySelectorAll('.custom-times input').forEach(input=>input.addEventListener('change',e=>{const field=e.target.id==='study-minutes'?'study':'rest';const value=Number(e.target.value);if(!Number.isInteger(value)||value<1||value>(field==='study'?180:60)){e.target.value=timer[field];toast(`Choose 1–${field==='study'?180:60} whole minutes.`);return}timer[field]=value;if(timer.phase===field)setPhase(field);else{timerSave();renderTimer()}}));
}
const baseRenderTimer=renderTimer;
renderTimer=()=>{baseRenderTimer();const footer=document.querySelector('.timer-footnote');if(footer&&!footer.querySelector('[data-timer="test-sound"]')){const test=document.createElement('button');test.className='text-btn timer-test-sound';test.dataset.timer='test-sound';test.setAttribute('aria-label','Test alarm sound');test.textContent='Test alarm sound';footer.append(' · ',test)}};
document.querySelector('#timer-root').addEventListener('click',e=>{const btn=e.target.closest('[data-timer]');if(!btn)return;const action=btn.dataset.timer;
 if(action==='open'||action==='close'){timerOpen=action==='open'?!timerOpen:false;renderTimer();document.querySelector(timerOpen?'[data-timer="close"]':'.timer-fab')?.focus();return}
 if(action==='preset'){timer.preset=btn.dataset.preset;if(timer.preset!=='custom'){[timer.study,timer.rest]=timer.preset.split('/').map(Number);setPhase('study')}else{timerSave();renderTimer()}return}
 if(action==='toggle'){unlockAudio();if(!timer.running&&'Notification'in window&&Notification.permission==='default')Notification.requestPermission().catch(()=>{});if(timer.running){timer.remaining=remaining();timer.running=false;timer.end=null}else{if(timer.remaining<=0)timer.remaining=timer[timer.phase]*60;timer.finished=false;timer.end=Date.now()+timer.remaining*1000;timer.running=true}timerSave();renderTimer();return}
 if(action==='reset'){setPhase(timer.phase);return}
 if(action==='skip'||action==='transition'){setPhase(timer.phase==='study'?'rest':'study',action==='transition');return}
 if(action==='sound'){timer.sound=!timer.sound;unlockAudio();timerSave();renderTimer();return}
 if(action==='test-sound'){unlockAudio();chime();toast(timer.sound?'Alarm sound played.':'Enable the sound button first.');return}
 if(action==='add'||action==='subtract'){timer.remaining=Math.min(10800,Math.max(60,remaining()+(action==='add'?300:-300)));if(timer.running)timer.end=Date.now()+timer.remaining*1000;timer.finished=false;timerSave();renderTimer()}
});
// Timed Donation Modal & 30-Minute Recurring Reminder
let donationModalActive=null;
let donationCountdownInterval=null;
const DONATION_RECURRING_INTERVAL_MS=30*60*1000;
let nextDonationTime=Date.now()+DONATION_RECURRING_INTERVAL_MS;

function donationModalView(type='initial',remaining=3){
 const isRecurring=type==='recurring';
 const isLocked=remaining>0;
 return `<div class="donation-overlay" data-action="backdrop-donation" role="dialog" aria-modal="true" aria-labelledby="donation-modal-title"><div class="donation-card ${isRecurring?'is-recurring':''}"><button class="icon-btn donation-top-close" data-action="close-donation" aria-label="Close donation notice" ${isLocked?'disabled':''}>${icon('close')}</button>${isRecurring?`<div class="donation-badge">${icon('clock')} 30-Minute Study Reminder</div><h2 class="donation-title oops-alert" id="donation-modal-title">OOPS OOPS OOPS, DONATE FLES</h2>`:`<div class="donation-badge">${icon('sun')} Support the Reviewer</div><h2 class="donation-title" id="donation-modal-title">A Little Sunshine for Your Studies</h2>`}<div class="donation-quote-wrap"><blockquote class="donation-quote">“(No one has ever become poor by giving.)”</blockquote></div><div class="donation-qr-box"><img class="donation-qr-img" src="/images/donation-qr.png" alt="MariBank InstaPay QR Code for Chrisnel Graine Caipang"></div><div class="donation-account-info"><div class="donation-account-pill">MariBank (InstaPay) · Chrisnel Graine Caipang</div><p class="donation-subtext">${isRecurring?'You’ve been studying hard for 30 minutes! Keep going and consider sending a little support 🥰':'Accepting donations · modawat rako bisag piso 🥰 salamat ha!'}</p></div><div class="donation-actions"><button class="btn ${isLocked?'':'primary'} donation-close-btn" data-action="close-donation" ${isLocked?'disabled':''}>${isLocked?`<span class="donation-countdown-badge">${remaining}s</span> Please wait ${remaining}s...`:`Continue to Reviewer ${icon('arrow')}`}</button></div></div></div>`;
}

function openDonationModal(type='initial'){
 if(donationModalActive)return;
 donationModalActive={type,remaining:3};
 if(donationCountdownInterval){clearInterval(donationCountdownInterval);donationCountdownInterval=null}
 document.querySelector('.donation-overlay')?.remove();
 app.insertAdjacentHTML('beforeend',donationModalView(type,3));
 document.body.style.overflow='hidden';
 donationCountdownInterval=setInterval(()=>{
  if(!donationModalActive){clearInterval(donationCountdownInterval);donationCountdownInterval=null;return}
  donationModalActive.remaining-=1;
  const r=donationModalActive.remaining;
  const overlay=document.querySelector('.donation-overlay');
  if(!overlay){clearInterval(donationCountdownInterval);donationCountdownInterval=null;return}
  const closeBtn=overlay.querySelector('.donation-close-btn');
  const topClose=overlay.querySelector('.donation-top-close');
  if(r>0){
   if(closeBtn){
    closeBtn.innerHTML=`<span class="donation-countdown-badge">${r}s</span> Please wait ${r}s...`;
    closeBtn.disabled=true;
   }
   if(topClose)topClose.disabled=true;
  }else{
   clearInterval(donationCountdownInterval);
   donationCountdownInterval=null;
   if(closeBtn){
    closeBtn.disabled=false;
    closeBtn.className='btn primary donation-close-btn';
    closeBtn.innerHTML=`Continue to Reviewer ${icon('arrow')}`;
    closeBtn.focus();
   }
   if(topClose)topClose.disabled=false;
  }
 },1000);
}

function closeDonationModal(){
 if(!donationModalActive||donationModalActive.remaining>0)return;
 if(donationCountdownInterval){clearInterval(donationCountdownInterval);donationCountdownInterval=null}
 donationModalActive=null;
 document.querySelector('.donation-overlay')?.remove();
 document.body.style.overflow='';
 nextDonationTime=Date.now()+DONATION_RECURRING_INTERVAL_MS;
 try{localStorage.setItem('sunroom-next-donation',String(nextDonationTime))}catch{}
}

 function tick(){
  if(!donationModalActive&&Date.now()>=nextDonationTime){
   openDonationModal('recurring');
  }
  if(!timer.running)return;
  const seconds=remaining();
  if(seconds<=0){timer.running=false;timer.remaining=0;timer.end=null;timer.finished=true;if(timer.phase==='study')timer.sessions++;timerSave();chime();if('Notification'in window&&Notification.permission==='granted')try{new Notification(timer.phase==='study'?'Study session complete':'Rest complete',{body:timer.phase==='study'?'Time for a little rest.':'Ready when you are.',icon:'/sun.svg'})}catch{}toast(timer.phase==='study'?'Focus session complete. Time for a little rest.':'Rest complete. Ready for another little step?');renderTimer()}else{const digits=document.querySelector('#timer-digits');if(digits)digits.textContent=timeLabel(seconds);const fab=document.querySelector('.timer-fab span');if(fab)fab.textContent=timeLabel(seconds);document.querySelector('[data-timer="subtract"]')?.toggleAttribute('disabled',seconds<=60)}}
setInterval(tick,500);
document.addEventListener('visibilitychange',tick);
render();renderTimer();tick();

const isAutomatedTest=typeof navigator!=='undefined'&&navigator.webdriver&&!window.__FORCE_DONATION_POPUP__&&!location.search.includes('donation=');
if(!isAutomatedTest){
 openDonationModal('initial');
}

window.__openDonationModal=openDonationModal;
window.__closeDonationModal=closeDonationModal;
window.__getDonationState=()=>({donationModalActive,nextDonationTime});
window.__setNextDonationTime=(t)=>{nextDonationTime=t};
