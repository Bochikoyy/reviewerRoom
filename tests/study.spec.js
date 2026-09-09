import { test, expect } from '@playwright/test';
import { lessons } from '../src/data.js';

test('every unit has complete, distinct, sourced practice content',()=>{
 for(const l of lessons){
  expect(l.sections.length).toBe(l.id===1?13:l.id===2?11:14);expect(l.cards.length).toBe(25);expect(l.questions.length).toBe(30);
  expect(new Set(l.questions.map(q=>q.prompt)).size).toBe(30);
  expect(l.questions.filter(q=>q.type==='mcq')).toHaveLength(15);
  expect(l.questions.filter(q=>q.type==='identification')).toHaveLength(10);
  expect(l.questions.filter(q=>q.type==='essay')).toHaveLength(5);
  for(const q of l.questions){expect(q.page).toBeGreaterThan(0);expect(q.page).toBeLessThanOrEqual(l.pages);if(q.options){expect(new Set(q.options).size).toBe(4);expect(q.options).toContain(q.answer)}if(q.type==='essay')expect(q.rubric).toHaveLength(3)}
 }
});

test('notes search, bookmarks, reading progress, themes, and source PDFs',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));await page.goto('/');
 await expect(page.getByRole('heading',{name:'The language of hormones.'})).toBeVisible();
 await expect(page.locator('.note-table-wrap')).toHaveCount(7);
 await page.getByRole('searchbox').fill('somatomedins');await expect(page.locator('.note-section')).toHaveCount(1);
 await page.getByRole('searchbox').fill('xyz-nothing');await expect(page.getByText('No matching concepts.')).toBeVisible();
 await page.getByRole('button',{name:'Clear filters'}).click();
 await page.getByRole('button',{name:/Bookmark 4\. Hormone classes and protein \/ peptide synthesis/}).click();
 await page.getByRole('button',{name:'Show bookmarked sections'}).click();await expect(page.locator('.note-section')).toHaveCount(1);
 await page.reload();await page.getByRole('button',{name:'Show bookmarked sections'}).click();await expect(page.locator('.note-section')).toHaveCount(1);
 await page.getByRole('button',{name:'Mark as read',exact:true}).click();await expect(page.getByText('Lesson marked as read')).toBeVisible();
 await page.getByRole('button',{name:'Switch to dark mode'}).click();await page.reload();await expect(page.locator('html')).toHaveAttribute('data-theme','dark');
 for(let i=1;i<=3;i++){const r=await page.request.get(`/lessons/Unit-${i}.pdf`);expect(r.ok()).toBeTruthy();expect(r.headers()['content-type']).toContain('pdf')}
 expect(errors).toEqual([]);
});

test('flashcards flip, self-assess, filter, shuffle, and persist',async({page})=>{
 await page.goto('/#lesson-2/flashcards');await expect(page.locator('.flashcard')).toBeVisible();
 await expect(page.getByRole('button',{name:'Got it!',exact:true})).toBeDisabled();
 await page.locator('.flashcard').click();await expect(page.locator('.flash-question')).toHaveText('Hypothalamus');
 await page.getByRole('button',{name:'Got it!',exact:true}).click();await expect(page.locator('.learned-pill')).toContainText('1 / 25 learned');
 await page.getByRole('button',{name:/Still learning 24/}).click();await expect(page.locator('.flash-progress')).toContainText('of 24');
 await page.getByRole('button',{name:'Shuffle',exact:true}).click();await page.reload();await expect(page.locator('.learned-pill')).toContainText('1 / 25 learned');
});

test('quiz draft persists, mixed grading is correct, essays are self-reviewed',async({page})=>{
 await page.goto('/#lesson-1/quiz');await page.getByRole('button',{name:'Let’s give it a try'}).click();
 await page.getByRole('radio',{name:/Paracrine/}).check();await page.reload();await expect(page.getByRole('radio',{name:/Paracrine/})).toBeChecked();
 await page.getByRole('button',{name:'Question 16',exact:true}).click();await page.getByLabel('Your answer',{exact:true}).fill('  AUTO-crine  ');
 await page.getByRole('button',{name:'Question 26',exact:true}).click();await page.getByLabel('Explain it in your own words').fill('Peptide hormones are stored in granules. Steroids derive from cholesterol.');
 await page.reload();await expect(page.getByLabel('Explain it in your own words')).toHaveValue(/Peptide hormones/);
 await page.getByRole('button',{name:'Finish & review',exact:true}).click();await expect(page.getByRole('dialog')).toContainText('27 questions are still unanswered.');
 await page.getByRole('dialog').getByRole('button',{name:'Finish & review'}).click();await expect(page.locator('.score-circle strong')).toHaveText('2/25');
 await expect(page.locator('.review-card.correct')).toHaveCount(2);await expect(page.locator('.essay-review')).toHaveCount(5);
 await page.locator('.essay-review').first().locator('summary').click();await page.locator('.essay-review').first().getByRole('checkbox').first().check();
 await expect(page.locator('#rubric-u1-q26')).toContainText('1 / 3');await page.reload();await page.locator('.essay-review').first().locator('summary').click();await expect(page.locator('.essay-review').first().getByRole('checkbox').first()).toBeChecked();
 await page.getByRole('button',{name:'Needs review',exact:true}).click();await expect(page.locator('.review-card')).toHaveCount(28);
 await page.getByRole('button',{name:'Retake quiz'}).click();await page.getByRole('dialog').getByRole('button',{name:'Start again'}).click();await expect(page.locator('#answered-count')).toHaveText('0 of 30 answered');
 const best=await page.evaluate(()=>JSON.parse(localStorage.getItem('sunroom-progress-v1')).best[1]);expect(best).toBe(2);
});

test('all lesson keys score 25 and essay responses never enter automatic score',async({page})=>{
 for(const l of lessons){
  await page.goto(`/#lesson-${l.id}/quiz`);
  await page.evaluate(({l})=>{const p={learned:{},review:{},read:{},bookmarks:{},best:{},quizzes:{}};p.quizzes[l.id]={answers:Object.fromEntries(l.questions.map(q=>[q.id,q.type==='essay'?'An essay cannot be automatically graded.':q.answer])),index:29,submitted:false,options:Object.fromEntries(l.questions.filter(q=>q.options).map(q=>[q.id,q.options])),rubrics:{}};localStorage.setItem('sunroom-progress-v1',JSON.stringify(p))},{l});
  await page.reload();await page.getByRole('button',{name:'Finish quiz',exact:true}).click();await page.getByRole('dialog').getByRole('button',{name:'Finish & review'}).click();await expect(page.locator('.score-circle strong')).toHaveText('25/25');await expect(page.locator('.essay-review')).toHaveCount(5);
 }
});

test('timer presets, custom duration, pause, refresh, expiry, and rest transition',async({page})=>{
 await page.clock.install();await page.goto('/');await page.getByRole('button',{name:'Open focus timer',exact:true}).click();await expect(page.getByRole('button',{name:'Test alarm sound'})).toBeVisible();
 await page.getByRole('button',{name:'50/10',exact:true}).click();await expect(page.locator('#timer-digits')).toHaveText('50:00');
 await page.getByRole('button',{name:'Custom',exact:true}).click();await page.getByRole('spinbutton',{name:'Study minutes'}).fill('1');await page.getByRole('spinbutton',{name:'Study minutes'}).press('Tab');await expect(page.locator('#timer-digits')).toHaveText('01:00');
 await page.getByRole('button',{name:'Start study',exact:true}).click();await page.clock.fastForward(10000);await expect(page.locator('#timer-digits')).toHaveText('00:50');
 await page.getByRole('button',{name:'Pause',exact:true}).click();await page.clock.fastForward(10000);await expect(page.locator('#timer-digits')).toHaveText('00:50');
 await page.getByRole('button',{name:'Resume',exact:true}).click();await page.reload();await page.getByRole('button',{name:'Open focus timer',exact:true}).click();await expect(page.getByRole('button',{name:'Pause',exact:true})).toBeVisible();
 await page.clock.fastForward(51000);await expect(page.locator('.timer-panel-head p')).toContainText('1 study session completed');await expect(page.locator('.timer-finished')).toContainText('Study complete');
 await page.getByRole('button',{name:'Start 10m rest'}).click();await expect(page.locator('.timer-display')).toContainText('TIME TO RECHARGE');await expect(page.locator('#timer-digits')).toHaveText('10:00');
 await page.getByRole('button',{name:'Reset current timer'}).click();await expect(page.getByRole('button',{name:'Start rest',exact:true})).toBeVisible();
});

test('mobile navigation and every mode fit narrow screens',async({page})=>{
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 for(const width of [390,320,768]){
  await page.setViewportSize({width,height:844});await page.goto('/');
  if(width<760){await page.getByRole('button',{name:'Open subjects'}).click();await page.locator('.lesson-nav').getByRole('button',{name:/Lesson 3/}).click();await expect(page.getByRole('heading',{name:'Small gland, wide-reaching effects.'})).toBeVisible()}
  for(const m of ['Notes','Flashcards','Quiz']){await page.getByRole('tab',{name:m,exact:true}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy()}
  await page.getByRole('button',{name:'Let’s give it a try'}).click();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  await page.getByRole('button',{name:'Open focus timer',exact:true}).click();await expect(page.locator('.timer-panel')).toBeVisible();expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBeTruthy();
  await page.evaluate(()=>localStorage.clear());
 }
 expect(errors).toEqual([]);
});

test('capture desktop and mobile notes for visual review',async({page})=>{
 await page.goto('/');await page.evaluate(()=>document.fonts.ready);await page.screenshot({path:'test-results/sunroom-desktop.png',fullPage:false,animations:'disabled'});
 await page.setViewportSize({width:390,height:844});await page.goto('/');await expect(page.locator('.sidebar')).toBeHidden();await page.screenshot({path:'test-results/sunroom-mobile.png',fullPage:false,animations:'disabled'});
 await page.getByRole('button',{name:'Open subjects'}).click();await expect(page.locator('.main')).toHaveAttribute('inert','');await page.keyboard.press('Escape');await expect(page.locator('.sidebar')).toBeHidden();await expect(page.getByRole('button',{name:'Open subjects'})).toBeFocused();
 await page.getByRole('button',{name:'Switch to dark mode'}).click();await page.getByRole('button',{name:'Open focus timer',exact:true}).click();await page.screenshot({path:'test-results/sunroom-mobile-timer-dark.png',fullPage:false,animations:'disabled'});
});

test('an open mobile menu releases content when resized to desktop',async({page})=>{
 await page.setViewportSize({width:390,height:844});await page.goto('/');
 await page.getByRole('button',{name:'Open subjects'}).click();await expect(page.locator('.main')).toHaveAttribute('inert','');
 await page.setViewportSize({width:1440,height:1000});await expect(page.locator('.main')).not.toHaveAttribute('inert','');await expect(page.locator('body')).not.toHaveClass('menu-open');
});
