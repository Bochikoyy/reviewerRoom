import { test, expect } from '@playwright/test';

test('verify notes tab exists and functions across Industry Elective and Digestion', async ({ page }) => {
  // 1. Visit Industry Elective Lesson 1 in flashcards mode
  await page.goto('/#industry-elective/lesson-1/flashcards');
  await page.waitForSelector('.mode-tabs');

  // Verify all 3 tabs are rendered: Notes, Flashcards, Quiz
  const tabs = page.locator('.mode-tab');
  await expect(tabs).toHaveCount(3);
  await expect(tabs.nth(0)).toContainText('Notes');
  await expect(tabs.nth(1)).toContainText('Flashcards');
  await expect(tabs.nth(2)).toContainText('Quiz');

  // Click the Notes tab
  await tabs.nth(0).click();
  await expect(page).toHaveURL(/#industry-elective\/lesson-1\/notes/);
  await expect(tabs.nth(0)).toHaveClass(/active/);

  // Verify notes content rendered
  const sectionsL1 = page.locator('.note-section');
  await expect(sectionsL1).toHaveCount(12);

  // 2. Switch to Lesson 2
  const lesson2Tab = page.locator('.unit-tab[data-id="2"]');
  await lesson2Tab.click();
  await expect(page).toHaveURL(/#industry-elective\/lesson-2\/notes/);
  const sectionsL2 = page.locator('.note-section');
  await expect(sectionsL2).toHaveCount(12);

  // 3. Switch to Digestion subject
  await page.goto('/#digestion/lesson-1/notes');
  await page.waitForSelector('.mode-tabs');
  const digestionTabs = page.locator('.mode-tab');
  await expect(digestionTabs).toHaveCount(3);
  await expect(digestionTabs.nth(0)).toContainText('Notes');
  const digestionSections = page.locator('.note-section');
  await expect(digestionSections).toHaveCount(12);

  // Verify digestion quiz has 25 questions
  const quizTab = digestionTabs.nth(2);
  await quizTab.click();
  await expect(page).toHaveURL(/#digestion\/lesson-1\/quiz/);
  await expect(page.locator('.quiz-breakdown')).toContainText('25');
});
