import { test, expect } from '@playwright/test';
import { pathologyLessons, subjects } from '../src/data.js';

test('pathology lesson 3 data conforms to exact academic curriculum specifications', () => {
  expect(subjects.pathology).toBeDefined();
  expect(subjects.pathology.name).toBe('Pathology');
  expect(pathologyLessons.length).toBeGreaterThanOrEqual(3);

  const lesson = pathologyLessons[2];
  expect(lesson.id).toBe(3);
  expect(lesson.title).toContain('Erythrocytes');
  expect(lesson.sourceTitle).toBe('Erythrocytes');
  expect(lesson.pages).toBe(35);
  expect(lesson.objectives.length).toBeGreaterThanOrEqual(4);

  // 16 sections
  expect(lesson.sections).toHaveLength(16);
  for (const s of lesson.sections) {
    expect(s.title).toBeTruthy();
    expect(s.summary).toBeTruthy();
    expect(s.points.length).toBeGreaterThanOrEqual(2);
    expect(s.takeaway).toBeTruthy();
    expect(s.pages.length).toBeGreaterThanOrEqual(1);
  }

  // Ensure tables exist for comparative sections
  const tables = lesson.sections.filter(s => s.table);
  expect(tables.length).toBeGreaterThanOrEqual(10);

  // Ensure cell visualization figures exist and total at least 25
  const totalFigures = lesson.sections
    .filter(s => s.figure)
    .map(s => Array.isArray(s.figure) ? s.figure.length : 1)
    .reduce((a, b) => a + b, 0);
  expect(totalFigures).toBeGreaterThanOrEqual(25);

  // 25 flashcards
  expect(lesson.cards).toHaveLength(25);
  for (const c of lesson.cards) {
    expect(c.id).toMatch(/^p3-q\d+$/);
    expect(c.front).toBeTruthy();
    expect(c.back).toBeTruthy();
    expect(c.detail).toBeTruthy();
    expect(c.page).toBeGreaterThanOrEqual(1);
    expect(c.page).toBeLessThanOrEqual(35);
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

test('pathology lesson 3 notes render cell micrographs, tables, and interactive lightbox zoom', async ({ page }) => {
  await page.goto('/#pathology/lesson-3/notes');

  // Verify header, hero, and breadcrumb
  await expect(page.locator('.course-label')).toContainText('PATHOLOGY');
  await expect(page.locator('h1')).toContainText('Erythrocytes');
  await expect(page.locator('.breadcrumb')).toContainText('Pathology');

  // Verify note sections rendered
  const noteSections = page.locator('.note-section');
  await expect(noteSections).toHaveCount(16);

  // Verify figures rendered
  const figures = page.locator('.note-figure');
  const count = await figures.count();
  expect(count).toBeGreaterThanOrEqual(25);

  // Verify first image is visible
  const firstImg = page.locator('.note-figure img').first();
  await firstImg.scrollIntoViewIfNeeded();
  await expect(firstImg).toBeVisible();

  // Test Lightbox: click figure wrapper to open zoom
  const firstWrap = page.locator('.note-figure .figure-img-wrap').first();
  await firstWrap.click();

  // Lightbox overlay should appear with image and notes panel
  const lightbox = page.locator('.lightbox-overlay');
  await expect(lightbox).toBeVisible();
  await expect(page.locator('.lightbox-image')).toBeVisible();
  await expect(page.locator('.lightbox-notes-panel')).toBeVisible();
  await expect(page.locator('.lightbox-notes-panel h3')).toContainText('Figure Notes');

  // Close lightbox via close button
  await page.locator('.lightbox-close').click();
  await expect(lightbox).not.toBeVisible();

  // Test search filter with unique term
  const searchInput = page.locator('#notes-search');
  await searchInput.fill('Alaskan Malamute');
  await expect(page.locator('.search-results')).toBeVisible();
  await expect(page.locator('.note-section')).toHaveCount(1);
  await expect(page.locator('.note-section h2')).toContainText('Spherocytes and Stomatocytes');

  // Clear search
  await page.locator('[data-action="clear-search"]').click();
  await expect(page.locator('.note-section')).toHaveCount(16);
});

test('pathology lesson 3 flashcards support 25-card active recall, flipping, and rating', async ({ page }) => {
  await page.goto('/#pathology/lesson-3/flashcards');

  await expect(page.locator('.practice-heading h2')).toContainText('Small cards. Lasting knowledge.');
  await expect(page.locator('.learned-pill')).toContainText('0 / 25 learned');
  await expect(page.locator('.flash-progress')).toContainText('Card 1 of 25');

  // Flip card
  const card = page.locator('.flashcard');
  await expect(card).not.toHaveClass(/flipped/);
  await card.click();
  await expect(card).toHaveClass(/flipped/);

  // Rate learned
  await page.locator('[data-action="rate-card"][data-rating="learned"]').click();
  await expect(page.locator('.learned-pill')).toContainText('1 / 25 learned');
  await expect(page.locator('.flash-progress')).toContainText('Card 2 of 25');
});

test('pathology lesson 3 30-question quiz scores 25/25 on key with essay rubric self-review', async ({ page }) => {
  await page.goto('/#pathology/lesson-3/quiz');

  // Intro view
  await expect(page.locator('.quiz-intro h2')).toContainText('A check-in, not a finish line');
  await expect(page.locator('.quiz-breakdown')).toContainText('15');
  await expect(page.locator('.quiz-breakdown')).toContainText('10');
  await expect(page.locator('.quiz-breakdown')).toContainText('05');

  // Start quiz
  await page.locator('[data-action="start-quiz"]').click();
  await expect(page.locator('.quiz-workspace')).toBeVisible();

  const lesson = pathologyLessons[2];

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
      await textarea.fill('Veterinary clinical pathology detailed erythrocyte essay response covering all criteria.');
    }
  }

  // Verify all 30 answered in overview
  await expect(page.locator('#answered-count')).toContainText('30 of 30 answered');

  // Submit quiz
  await page.locator('.question-panel [data-action="submit-quiz"]').click();
  const confirmBtn = page.locator('.confirm-dialog [value="confirm"]');
  await expect(confirmBtn).toBeVisible();
  await confirmBtn.click();

  // Results screen
  await expect(page.locator('.results')).toBeVisible();
  await expect(page.locator('.score-circle strong')).toHaveText('25/25');
  await expect(page.locator('.results-stats')).toContainText('100% objective accuracy');
  await expect(page.locator('.results-stats')).toContainText('Best: 25 / 25');

  // Check essay self-review rubric
  const essayCards = page.locator('.review-card.essay-review');
  await expect(essayCards).toHaveCount(5);

  const firstEssay = essayCards.first();
  await firstEssay.locator('summary').click();
  const rubricLabels = firstEssay.locator('.rubric label input[type="checkbox"]');
  await expect(rubricLabels).toHaveCount(3);

  // Check off all 3 points
  for (let p = 0; p < 3; p++) {
    await rubricLabels.nth(p).check();
  }
  await expect(firstEssay.locator('.rubric-score')).toContainText('3 / 3 points covered · self-assessed');
});
