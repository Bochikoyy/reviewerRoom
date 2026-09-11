import { test, expect } from '@playwright/test';
import { pathologyLessons, subjects } from '../src/data.js';

test('pathology lesson 1 data conforms to exact academic curriculum specifications', () => {
  expect(subjects.pathology).toBeDefined();
  expect(subjects.pathology.name).toBe('Pathology');
  expect(pathologyLessons).toHaveLength(1);

  const lesson = pathologyLessons[0];
  expect(lesson.id).toBe(1);
  expect(lesson.title).toBe('Introductory concepts in clinical pathology');
  expect(lesson.sourceTitle).toBe('Introductory concepts');
  expect(lesson.subtitle).toContain('clinical diagnostic reasoning');
  expect(lesson.pages).toBe(19);
  expect(lesson.objectives.length).toBeGreaterThanOrEqual(3);

  // 15 sections
  expect(lesson.sections).toHaveLength(15);
  for (const s of lesson.sections) {
    expect(s.title).toBeTruthy();
    expect(s.summary).toBeTruthy();
    expect(s.points.length).toBeGreaterThanOrEqual(2);
    expect(s.takeaway).toBeTruthy();
    expect(s.pages.length).toBeGreaterThanOrEqual(1);
  }

  // Ensure tables exist for key comparative sections
  const tables = lesson.sections.filter(s => s.table);
  expect(tables.length).toBeGreaterThanOrEqual(5);

  // 25 flashcards
  expect(lesson.cards).toHaveLength(25);
  for (const c of lesson.cards) {
    expect(c.id).toMatch(/^p1-q\d+$/);
    expect(c.front).toBeTruthy();
    expect(c.back).toBeTruthy();
    expect(c.detail).toBeTruthy();
    expect(c.page).toBeGreaterThanOrEqual(1);
    expect(c.page).toBeLessThanOrEqual(19);
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

test('pathology notes render comprehensive curriculum, tables, search, and bookmarks', async ({ page }) => {
  await page.goto('/#pathology/lesson-1/notes');

  // Verify header and hero
  await expect(page.locator('.course-label')).toContainText('PATHOLOGY');
  await expect(page.locator('h1')).toContainText('Introductory concepts in clinical pathology');
  await expect(page.locator('.breadcrumb')).toContainText('Pathology');

  // Verify note sections rendered
  const noteSections = page.locator('.note-section');
  await expect(noteSections).toHaveCount(15);

  // Verify comparative tables are rendered
  const tables = page.locator('.note-table-wrap table');
  await expect(tables.first()).toBeVisible();
  const tableCount = await tables.count();
  expect(tableCount).toBeGreaterThanOrEqual(5);

  // Test search filtering
  const searchInput = page.locator('#notes-search');
  await searchInput.fill('fibrinogen');
  await expect(page.locator('.search-results')).toContainText('section');
  await expect(page.locator('.note-section h2').first()).toContainText('Plasma vs serum');

  // Clear search
  await page.locator('[data-action="clear-search"]').click();
  await expect(page.locator('.note-section')).toHaveCount(15);

  // Bookmark a section
  const firstBookmarkBtn = page.locator('.note-section').first().locator('[data-action="bookmark"]');
  await firstBookmarkBtn.click();
  await expect(firstBookmarkBtn).toHaveClass(/active/);

  // Filter bookmarks only
  await page.locator('[data-action="filter-bookmarks"]').click();
  await expect(page.locator('.note-section')).toHaveCount(1);

  // Unfilter bookmarks
  await page.locator('[data-action="filter-bookmarks"]').click();
  await expect(page.locator('.note-section')).toHaveCount(15);

  // Mark lesson as read and verify sidebar indicator
  const markReadBtn = page.locator('[data-action="mark-read"]');
  await markReadBtn.click();
  await expect(markReadBtn).toContainText('Mark unread');
  await expect(page.locator('[data-subject="pathology"][data-id="1"] .read-check')).toBeVisible();

  // Verify PDF download link points to Pathology-1.pdf
  const pdfLink = page.locator('.pdf-download');
  await expect(pdfLink).toHaveAttribute('href', '/lessons/Pathology-1.pdf');
});

test('pathology flashcards support 25-card active recall, flipping, and rating', async ({ page }) => {
  await page.goto('/#pathology/lesson-1/flashcards');

  // Verify deck size
  await expect(page.locator('.learned-pill')).toContainText('0 / 25 learned');
  await expect(page.locator('.flash-toolbar')).toContainText('All cards 25');

  // First card
  const card = page.locator('.flashcard');
  await expect(card).toBeVisible();
  await expect(card).not.toHaveClass(/flipped/);

  // Flip card
  await card.click();
  await expect(card).toHaveClass(/flipped/);
  await expect(page.locator('.flash-detail')).toBeVisible();

  // Rate as Got it (learned)
  const gotItBtn = page.locator('[data-action="rate-card"][data-rating="learned"]');
  await gotItBtn.click();

  // Progress updates
  await expect(page.locator('.learned-pill')).toContainText('1 / 25 learned');
  await expect(page.locator('.flash-navigation')).toContainText('02 / 25');

  // Persistence across reload
  await page.reload();
  await expect(page.locator('.learned-pill')).toContainText('1 / 25 learned');
});

test('pathology 30-question quiz scores 25/25 on key with essay rubric self-review', async ({ page }) => {
  await page.goto('/#pathology/lesson-1/quiz');

  // Intro view
  await expect(page.locator('.quiz-intro h2')).toContainText('A check-in, not a finish line');
  await expect(page.locator('.quiz-breakdown')).toContainText('15');
  await expect(page.locator('.quiz-breakdown')).toContainText('10');
  await expect(page.locator('.quiz-breakdown')).toContainText('05');

  // Start quiz
  await page.locator('[data-action="start-quiz"]').click();
  await expect(page.locator('.quiz-workspace')).toBeVisible();

  const lesson = pathologyLessons[0];

  // Fill in all 30 questions
  for (let i = 0; i < 30; i++) {
    const q = lesson.questions[i];
    // Jump to question i
    await page.locator(`.question-grid [data-id="${i}"]`).click();

    if (q.type === 'mcq') {
      const radio = page.locator(`input[name="answer"][value="${q.answer}"]`);
      await radio.check();
    } else if (q.type === 'identification') {
      const input = page.locator('#written-answer');
      await input.fill(q.answer);
    } else if (q.type === 'essay') {
      const textarea = page.locator('#written-answer');
      await textarea.fill('Veterinary clinical pathology detailed essay synthesis answer covering all model criteria.');
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

  // Retake confirmation
  await page.locator('[data-action="retake"]').click();
  await expect(page.locator('.confirm-dialog')).toBeVisible();
  await page.locator('.confirm-dialog [value="confirm"]').click();

  // Back to start of quiz, previous best preserved
  await expect(page.locator('.quiz-workspace')).toBeVisible();
});

test('subject folder accordion toggle and inter-subject navigation work seamlessly', async ({ page }) => {
  await page.goto('/#endocrinology/lesson-1/notes');

  const endoToggle = page.locator('[data-id="endocrinology"].subject-folder-toggle');
  const pathToggle = page.locator('[data-id="pathology"].subject-folder-toggle');

  await expect(endoToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(pathToggle).toHaveAttribute('aria-expanded', 'true');

  // Collapse pathology folder
  await pathToggle.click();
  await expect(pathToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#subject-collection-1')).toBeHidden();

  // Re-expand pathology folder
  await pathToggle.click();
  await expect(pathToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#subject-collection-1')).toBeVisible();

  // Click Pathology Lesson 1 link in sidebar
  const pathLesson1 = page.locator('#subject-collection-1 [data-action="lesson"][data-id="1"]');
  await pathLesson1.click();

  // URL updates and content switches
  await expect(page).toHaveURL(/#pathology\/lesson-1\/notes/);
  await expect(page.locator('.course-label')).toContainText('PATHOLOGY');
  await expect(page.locator('h1')).toContainText('Introductory concepts in clinical pathology');
  await expect(page.locator('[data-id="pathology"].subject-folder-toggle')).toHaveClass(/selected-subject/);
  await expect(page.locator('[data-id="endocrinology"].subject-folder-toggle')).not.toHaveClass(/selected-subject/);
  await page.locator('.sidebar').screenshot({ path: 'test-results/sidebar-pathology-selected.png' });
  await page.locator('[data-action="theme"]').click();
  await page.locator('.sidebar').screenshot({ path: 'test-results/sidebar-pathology-selected-dark.png' });
  await page.locator('[data-action="theme"]').click();

  // Click Endocrinology Lesson 2 link in sidebar
  const endoLesson2 = page.locator('#subject-collection-0 [data-action="lesson"][data-id="2"]');
  await endoLesson2.click();

  await expect(page).toHaveURL(/#lesson-2\/notes/);
  await expect(page.locator('.course-label')).toContainText('ENDOCRINOLOGY');
});
