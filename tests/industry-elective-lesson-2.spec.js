import { test, expect } from '@playwright/test';
import { industryElectiveLessons, subjects } from '../src/data.js';

test('industry elective lesson 2 data conforms to academic curriculum specifications', () => {
  expect(industryElectiveLessons.length).toBeGreaterThanOrEqual(2);

  const lesson = industryElectiveLessons.find(l => l.id === 2);
  expect(lesson).toBeDefined();
  expect(lesson.title).toContain('Anatomy of ReactJS');
  expect(lesson.sourceTitle).toBe('Anatomy of ReactJS');
  expect(lesson.pages).toBe(27);
  expect(lesson.objectives.length).toBeGreaterThanOrEqual(4);

  // 12 sections
  expect(lesson.sections).toHaveLength(12);
  for (const s of lesson.sections) {
    expect(s.title).toBeTruthy();
    expect(s.summary).toBeTruthy();
    expect(s.points.length).toBeGreaterThanOrEqual(2);
    expect(s.takeaway).toBeTruthy();
    expect(s.pages.length).toBeGreaterThanOrEqual(1);
  }

  // Ensure tables exist
  const tables = lesson.sections.filter(s => s.table);
  expect(tables.length).toBeGreaterThanOrEqual(6);

  // Ensure figures exist
  const figures = lesson.sections
    .filter(s => s.figure)
    .map(s => Array.isArray(s.figure) ? s.figure : [s.figure])
    .flat();
  expect(figures.length).toBeGreaterThanOrEqual(3);
  expect(figures.some(f => f.src.includes('react-project-structure'))).toBe(true);
  expect(figures.some(f => f.src.includes('index-html-entrypoint'))).toBe(true);
  expect(figures.some(f => f.src.includes('main-jsx-bootstrap'))).toBe(true);
  expect(figures.some(f => f.src.includes('app-jsx-component'))).toBe(true);

  // 25 flashcards
  expect(lesson.cards).toHaveLength(25);
  for (const c of lesson.cards) {
    expect(c.id).toMatch(/^ie2-q\d+$/);
    expect(c.front).toBeTruthy();
    expect(c.back).toBeTruthy();
    expect(c.detail).toBeTruthy();
    expect(c.page).toBeGreaterThanOrEqual(1);
    expect(c.page).toBeLessThanOrEqual(27);
  }

  // 30 questions: 15 MCQ, 10 Identification, 5 Essay
  expect(lesson.questions).toHaveLength(30);
  const mcqs = lesson.questions.filter(q => q.type === 'mcq');
  const ids = lesson.questions.filter(q => q.type === 'identification');
  const essays = lesson.questions.filter(q => q.type === 'essay');

  expect(mcqs).toHaveLength(15);
  expect(ids).toHaveLength(10);
  expect(essays).toHaveLength(5);

  for (const q of mcqs) {
    expect(q.options).toHaveLength(4);
    expect(q.options).toContain(q.answer);
    expect(q.explanation).toBeTruthy();
    expect(q.page).toBeGreaterThanOrEqual(1);
    expect(q.page).toBeLessThanOrEqual(27);
  }

  for (const q of ids) {
    expect(q.answer).toBeTruthy();
    expect(Array.isArray(q.aliases)).toBe(true);
    expect(q.explanation).toBeTruthy();
    expect(q.page).toBeGreaterThanOrEqual(1);
    expect(q.page).toBeLessThanOrEqual(27);
  }

  for (const q of essays) {
    expect(q.model).toBeTruthy();
    expect(q.rubric).toHaveLength(3);
    expect(q.page).toBeGreaterThanOrEqual(1);
    expect(q.page).toBeLessThanOrEqual(27);
  }
});

test('industry elective lesson 2 notes render diagrams, tables, and interactive lightbox zoom', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/#industry-elective/lesson-2/notes');

  // Verify page title and header
  await expect(page.locator('h1')).toContainText('Anatomy of ReactJS');
  await expect(page.locator('.hero-meta')).toContainText('Lecture 2 · 27 source pages');

  // Verify PDF download link
  const pdfLink = page.locator('a.pdf-download');
  await expect(pdfLink).toHaveAttribute('href', '/lessons/Industry-Elective-2.pdf');
  await expect(pdfLink).toContainText('Industry Elective 2 · 27 pages');

  // Verify sections count
  const articles = page.locator('article.note-section');
  await expect(articles).toHaveCount(12);

  // Verify table existence
  const tables = page.locator('.note-table-wrap table');
  expect(await tables.count()).toBeGreaterThanOrEqual(6);

  // Search filtering test
  const searchInput = page.locator('#notes-search');
  await searchInput.fill('createRoot');
  await page.waitForTimeout(300);
  const searchResults = page.locator('article.note-section');
  expect(await searchResults.count()).toBeGreaterThan(0);
  expect(await searchResults.count()).toBeLessThan(12);

  // Clear search
  await page.locator('[data-action="clear-search"]').click();
  await expect(page.locator('article.note-section')).toHaveCount(12);

  // Lightbox Zoom Test
  const firstFigureWrap = page.locator('.figure-img-wrap').first();
  await firstFigureWrap.click();

  // Verify lightbox modal is opened
  const lightbox = page.locator('.lightbox-overlay');
  await expect(lightbox).toBeVisible();
  await expect(page.locator('.lightbox-image')).toBeVisible();
  await expect(page.locator('.lightbox-notes-panel')).toBeVisible();
  await expect(page.locator('.lightbox-notes-header')).toContainText('Figure Notes');

  // Close lightbox via close button
  await page.locator('.lightbox-close').click();
  await expect(lightbox).not.toBeVisible();
});

test('industry elective lesson 2 flashcards practice flow', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/#industry-elective/lesson-2/flashcards');

  await expect(page.locator('.practice-heading h2')).toContainText('Small cards. Lasting knowledge.');
  await expect(page.locator('.learned-pill')).toContainText('0 / 25 learned');

  // Verify initial card is face up (not flipped)
  const card = page.locator('.flashcard');
  await expect(card).not.toHaveClass(/flipped/);

  // Flip card
  await card.click();
  await expect(card).toHaveClass(/flipped/);
  await expect(page.locator('.flash-detail')).toBeVisible();

  // Rate as learned
  const gotItBtn = page.locator('[data-action="rate-card"][data-rating="learned"]');
  await expect(gotItBtn).toBeEnabled();
  await gotItBtn.click();

  // Verify learned count increments
  await expect(page.locator('.learned-pill')).toContainText('1 / 25 learned');

  // Rating automatically advances to next card (Card 2)
  await expect(page.locator('.flash-progress')).toContainText('Card 2 of 25');
  await expect(page.locator('.flash-navigation')).toContainText('02 / 25');

  // Shuffle deck
  await page.click('[data-action="shuffle"]');
  await expect(page.locator('#toast')).toContainText('Deck shuffled');
});

test('industry elective lesson 2 quiz flow and scoring (25/25 objective + essay rubric)', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/#industry-elective/lesson-2/quiz');

  // Check intro view
  await expect(page.locator('.quiz-intro h2')).toContainText('A check-in, not a finish line.');
  await expect(page.locator('.quiz-intro .eyebrow')).toContainText('INDUSTRY ELECTIVE · LESSON 2');

  // Start quiz
  await page.locator('[data-action="start-quiz"]').click();
  await expect(page.locator('.question-panel')).toBeVisible();

  const lesson = industryElectiveLessons.find(l => l.id === 2);

  // Answer all 30 questions
  for (let i = 0; i < 30; i++) {
    const q = lesson.questions[i];
    await page.locator(`.question-grid [data-id="${i}"]`).click();

    if (q.type === 'mcq') {
      const inputs = page.locator('input[name="answer"]');
      const count = await inputs.count();
      for (let j = 0; j < count; j++) {
        const val = await inputs.nth(j).getAttribute('value');
        if (val === q.answer) {
          await inputs.nth(j).check();
          break;
        }
      }
    } else if (q.type === 'identification') {
      await page.locator('#written-answer').fill(q.answer);
    } else if (q.type === 'essay') {
      await page.locator('#written-answer').fill('Comprehensive essay response covering all key architectural aspects, contracts, and lifecycle behaviors.');
    }
  }

  // Submit quiz
  await page.locator('[data-action="submit-quiz"]').first().click();

  // Confirm dialog
  const confirmBtn = page.locator('dialog.confirm-dialog button[value="confirm"]');
  await expect(confirmBtn).toBeVisible();
  await confirmBtn.click();

  // Results view
  await expect(page.locator('.results-banner h2')).toContainText('You showed up. That counts.');
  await expect(page.locator('.score-circle strong')).toContainText('25/25');
  await expect(page.locator('.results-stats')).toContainText('100% objective accuracy');

  // Self-review rubric test on first essay
  const firstEssayDetails = page.locator('.review-card.essay-review details.model-answer').first();
  await firstEssayDetails.click();
  const firstRubricCheckbox = firstEssayDetails.locator('input[type="checkbox"]').first();
  await firstRubricCheckbox.check();
  await expect(firstEssayDetails.locator('.rubric-score')).toContainText('1 / 3 points covered');
});

test('sidebar displays Industry Elective lessons 1 and 2 with switching', async ({ page }) => {
  await page.goto('http://127.0.0.1:5173/#industry-elective/lesson-1/notes');

  // Open sidebar if not visible
  const sidebar = page.locator('#subject-sidebar');
  await expect(page.locator('.subject-label')).toContainText('Subjects 03');

  // Verify Industry Elective folder has 2 lessons
  const ieFolder = page.locator('#subject-collection-2');
  const lessonLinks = ieFolder.locator('button.lesson-link');
  await expect(lessonLinks).toHaveCount(2);

  await expect(lessonLinks.nth(0)).toContainText('Lesson 1');
  await expect(lessonLinks.nth(1)).toContainText('Lesson 2');

  // Switch to Lesson 2 via sidebar
  await lessonLinks.nth(1).click();
  await expect(page).toHaveURL(/#industry-elective\/lesson-2\/notes/);
  await expect(page.locator('h1')).toContainText('Anatomy of ReactJS');

  // Switch back to Lesson 1 via unit tabs
  const unitTabs = page.locator('.unit-tab');
  await expect(unitTabs).toHaveCount(2);
  await unitTabs.nth(0).click();
  await expect(page).toHaveURL(/#industry-elective\/lesson-1\/notes/);
  await expect(page.locator('h1')).toContainText('Introduction to ReactJS');
});

test('captures visual screenshots of Industry Elective Lesson 2', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1000 });

  // 1. Notes view in Light mode
  await page.goto('http://127.0.0.1:5173/#industry-elective/lesson-2/notes');
  await page.waitForSelector('.note-section');
  await page.screenshot({ path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/industry-elective-2-notes-light.png' });

  // 2. Notes view in Dark mode
  await page.locator('[data-action="theme"]').click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/industry-elective-2-notes-dark.png' });

  // 3. Lightbox zoom
  const figure = page.locator('.figure-img-wrap').first();
  await figure.click();
  await page.waitForSelector('.lightbox-overlay');
  await page.screenshot({ path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/industry-elective-2-lightbox.png' });
  await page.locator('.lightbox-close').click();

  // 4. Switch back to light mode and visit Flashcards
  await page.locator('[data-action="theme"]').click();
  await page.goto('http://127.0.0.1:5173/#industry-elective/lesson-2/flashcards');
  await page.waitForSelector('.flashcard');
  await page.locator('.flashcard').click(); // flip to reveal answer
  await page.waitForTimeout(300);
  await page.screenshot({ path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/industry-elective-2-flashcards.png' });

  // 5. Quiz view
  await page.goto('http://127.0.0.1:5173/#industry-elective/lesson-2/quiz');
  await page.waitForSelector('.quiz-intro');
  await page.screenshot({ path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/industry-elective-2-quiz.png' });

  // 6. Mobile viewport
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('http://127.0.0.1:5173/#industry-elective/lesson-2/notes');
  await page.waitForSelector('.note-section');
  await page.screenshot({ path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/industry-elective-2-mobile.png' });
});
