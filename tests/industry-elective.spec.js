import { test, expect } from '@playwright/test';
import { industryElectiveLessons, subjects } from '../src/data.js';

test('industry elective lesson 1 data conforms to academic curriculum specifications', () => {
  expect(subjects['industry-elective']).toBeDefined();
  expect(subjects['industry-elective'].name).toBe('Industry Elective');
  expect(subjects['industry-elective'].icon).toBe('code');
  expect(industryElectiveLessons.length).toBeGreaterThanOrEqual(1);

  const lesson = industryElectiveLessons[0];
  expect(lesson.id).toBe(1);
  expect(lesson.title).toContain('Introduction to ReactJS');
  expect(lesson.sourceTitle).toBe('Introduction to ReactJS');
  expect(lesson.pages).toBe(51);
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

  // Ensure tables exist for comparative sections
  const tables = lesson.sections.filter(s => s.table);
  expect(tables.length).toBeGreaterThanOrEqual(5);

  // Ensure slide figures exist for DOM Tree and Virtual DOM diffing
  const figures = lesson.sections
    .filter(s => s.figure)
    .map(s => Array.isArray(s.figure) ? s.figure : [s.figure])
    .flat();
  expect(figures.length).toBeGreaterThanOrEqual(2);
  expect(figures.some(f => f.src.includes('dom-tree-diagram'))).toBe(true);
  expect(figures.some(f => f.src.includes('virtual-dom-diffing'))).toBe(true);

  // 25 flashcards
  expect(lesson.cards).toHaveLength(25);
  for (const c of lesson.cards) {
    expect(c.id).toMatch(/^ie1-q\d+$/);
    expect(c.front).toBeTruthy();
    expect(c.back).toBeTruthy();
    expect(c.detail).toBeTruthy();
    expect(c.page).toBeGreaterThanOrEqual(1);
    expect(c.page).toBeLessThanOrEqual(51);
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
  }

  for (const q of ids) {
    expect(q.answer).toBeTruthy();
    expect(Array.isArray(q.aliases)).toBe(true);
    expect(q.explanation).toBeTruthy();
    expect(q.page).toBeGreaterThanOrEqual(1);
  }

  for (const q of essays) {
    expect(q.model).toBeTruthy();
    expect(q.rubric).toHaveLength(3);
    expect(q.page).toBeGreaterThanOrEqual(1);
  }
});

test('industry elective lesson 1 notes render diagrams, tables, and interactive lightbox zoom', async ({ page }) => {
  await page.goto('/#industry-elective/lesson-1/notes');

  // Verify header, hero, and breadcrumb
  await expect(page.locator('.course-label')).toContainText('INDUSTRY ELECTIVE');
  await expect(page.locator('h1')).toContainText('Introduction to ReactJS');
  await expect(page.locator('.breadcrumb')).toContainText('Industry Elective');
  await expect(page.locator('.hero-meta')).toContainText('Lecture 1 · 51 source pages');

  // Verify PDF download link
  const pdfDownload = page.locator('.pdf-download');
  await expect(pdfDownload).toHaveAttribute('href', '/lessons/Industry-Elective-1.pdf');
  await expect(pdfDownload).toContainText('Industry Elective 1 · 51 pages');

  // Verify 12 note sections rendered
  const noteSections = page.locator('.note-section');
  await expect(noteSections).toHaveCount(12);

  // Verify figures rendered (DOM Tree and Virtual DOM)
  const figures = page.locator('.note-figure');
  await expect(figures).toHaveCount(2);

  const domTreeImg = page.locator('.note-figure img[src*="dom-tree-diagram"]');
  await domTreeImg.scrollIntoViewIfNeeded();
  await expect(domTreeImg).toBeVisible();

  // Test interactive lightbox zoom
  const domTreeWrap = page.locator('.figure-img-wrap[data-fig-src*="dom-tree-diagram"]');
  await domTreeWrap.click();

  const lightbox = page.locator('.lightbox-overlay');
  await expect(lightbox).toBeVisible();
  await expect(page.locator('.lightbox-image')).toBeVisible();
  await expect(page.locator('.lightbox-notes-panel')).toBeVisible();
  await expect(page.locator('.lightbox-caption')).toContainText('DOM Tree');

  // Close lightbox
  await page.locator('.lightbox-close').click();
  await expect(lightbox).toHaveCount(0);

  // Test notes search
  await page.fill('#notes-search', 'Virtual DOM');
  await expect(page.locator('.search-results')).toContainText('matching “Virtual DOM”');
  await page.click('[data-action="clear-search"]');
  await expect(page.locator('.note-section')).toHaveCount(12);

  // Test bookmarking
  const firstBookmark = page.locator('.note-bookmark').first();
  await firstBookmark.click();
  await expect(firstBookmark).toHaveClass(/active/);
  await page.click('.bookmark-filter');
  await expect(page.locator('.note-section')).toHaveCount(1);
  await page.click('.bookmark-filter');
  await expect(page.locator('.note-section')).toHaveCount(12);
});

test('industry elective lesson 1 flashcards practice flow', async ({ page }) => {
  await page.goto('/#industry-elective/lesson-1/flashcards');

  // Verify cards loaded
  await expect(page.locator('.learned-pill')).toContainText('0 / 25 learned');
  await expect(page.locator('.flash-progress')).toContainText('Card 1 of 25');

  // Flip card
  const flashcard = page.locator('.flashcard');
  await expect(flashcard).not.toHaveClass(/flipped/);
  await flashcard.click();
  await expect(flashcard).toHaveClass(/flipped/);
  await expect(page.locator('.flash-detail')).toBeVisible();

  // Rate card as learned
  await page.click('[data-rating="learned"]');
  await expect(page.locator('.learned-pill')).toContainText('1 / 25 learned');

  // Next card
  await expect(page.locator('.flash-progress')).toContainText('Card 2 of 25');

  // Shuffle deck
  await page.click('[data-action="shuffle"]');
  await expect(page.locator('#toast')).toContainText('Deck shuffled');
});

test('industry elective lesson 1 quiz flow and scoring', async ({ page }) => {
  await page.goto('/#industry-elective/lesson-1/quiz');

  // Quiz intro screen
  await expect(page.locator('.quiz-intro')).toBeVisible();
  await expect(page.locator('.quiz-breakdown')).toContainText('15');
  await expect(page.locator('.quiz-breakdown')).toContainText('10');
  await expect(page.locator('.quiz-breakdown')).toContainText('05');

  // Start quiz
  await page.click('[data-action="start-quiz"]');
  await expect(page.locator('.quiz-workspace')).toBeVisible();

  const lesson = industryElectiveLessons[0];

  // Answer all 30 questions
  for (let i = 0; i < 30; i++) {
    const q = lesson.questions[i];
    await page.locator(`.question-grid [data-id="${i}"]`).click();

    if (q.type === 'mcq') {
      const radio = page.locator(`input[name="answer"][value="${q.answer}"]`);
      await radio.check();
    } else if (q.type === 'identification') {
      const input = page.locator('#written-answer');
      await input.fill(q.answer);
    } else if (q.type === 'essay') {
      const textarea = page.locator('#written-answer');
      await textarea.fill('React uses an in-memory Virtual DOM and declarative component paradigm to solve manual synchronization.');
    }
  }

  // Verify all 30 answered
  await expect(page.locator('#answered-count')).toContainText('30 of 30 answered');

  // Finish quiz
  await page.click('[data-action="submit-quiz"]');
  const dialog = page.locator('.confirm-dialog');
  await expect(dialog).toBeVisible();
  await page.click('.confirm-dialog button[value="confirm"]');

  // Verify results
  await expect(page.locator('.results')).toBeVisible();
  await expect(page.locator('.score-circle strong')).toContainText('25/25');
  await expect(page.locator('.results-stats')).toContainText('100% objective accuracy');

  // Verify essay rubric
  const essayReview = page.locator('.essay-review').first();
  await essayReview.scrollIntoViewIfNeeded();
  await essayReview.locator('summary').click();
  await expect(essayReview.locator('.rubric')).toBeVisible();
  const firstRubricPoint = essayReview.locator('.rubric input[type="checkbox"]').first();
  await firstRubricPoint.check();
  await expect(essayReview.locator('.rubric-score')).toContainText('1 / 3 points covered');
});

test('sidebar displays all 3 subjects and supports switching', async ({ page }) => {
  await page.goto('/#endocrinology/lesson-1/notes');

  // Check sidebar subject count
  await expect(page.locator('.subject-label span')).toContainText('03');

  // Verify Industry Elective folder in sidebar
  const ieToggle = page.locator('[data-id="industry-elective"].subject-folder-toggle');
  await expect(ieToggle).toBeVisible();
  await expect(ieToggle).toContainText('Industry Elective');

  // Click on Lesson 1 under Industry Elective
  const ieLessonLink = page.locator('#subject-collection-2 [data-id="1"]');
  await ieLessonLink.click();

  // URL should update to industry elective
  await expect(page).toHaveURL(/#industry-elective\/lesson-1\/notes/);
  await expect(page.locator('.course-label')).toContainText('INDUSTRY ELECTIVE');

  // Toggle Industry Elective folder accordion
  await ieToggle.click();
  await expect(page.locator('#subject-collection-2')).toBeHidden();
  await ieToggle.click();
  await expect(page.locator('#subject-collection-2')).toBeVisible();
});

test('captures screenshots of Industry Elective notes, diagrams, lightbox, flashcards, and quiz', async ({ page }) => {
  const artifactDir = 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b';

  // 1. Notes view (Light mode)
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto('/#industry-elective/lesson-1/notes');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${artifactDir}/industry-elective-notes-light.png` });

  // 2. Notes view (Dark mode)
  await page.click('.theme-btn');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${artifactDir}/industry-elective-notes-dark.png` });
  await page.click('.theme-btn'); // back to light mode

  // 3. Lightbox zoom view
  const domTreeWrap = page.locator('.figure-img-wrap[data-fig-src*="dom-tree-diagram"]');
  await domTreeWrap.scrollIntoViewIfNeeded();
  await domTreeWrap.click();
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${artifactDir}/industry-elective-lightbox.png` });
  await page.click('.lightbox-close');

  // 4. Flashcards view (Flipped)
  await page.goto('/#industry-elective/lesson-1/flashcards');
  await page.waitForTimeout(300);
  await page.click('.flashcard');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${artifactDir}/industry-elective-flashcards.png` });

  // 5. Quiz results view
  await page.goto('/#industry-elective/lesson-1/quiz');
  await page.click('[data-action="start-quiz"]');
  const lesson = industryElectiveLessons[0];
  for (let i = 0; i < 30; i++) {
    const q = lesson.questions[i];
    await page.locator(`.question-grid [data-id="${i}"]`).click();
    if (q.type === 'mcq') {
      const radio = page.locator(`input[name="answer"][value="${q.answer}"]`);
      await radio.check();
    } else if (q.type === 'identification') {
      await page.fill('#written-answer', q.answer);
    } else if (q.type === 'essay') {
      await page.fill('#written-answer', 'React uses an in-memory Virtual DOM and declarative component paradigm to solve manual synchronization.');
    }
  }
  await page.click('[data-action="submit-quiz"]');
  await page.click('.confirm-dialog button[value="confirm"]');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${artifactDir}/industry-elective-quiz.png` });

  // 6. Mobile view
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/#industry-elective/lesson-1/notes');
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${artifactDir}/industry-elective-mobile.png` });
});

