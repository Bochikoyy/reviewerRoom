import { test, expect } from '@playwright/test';

test('Industry Elective is the only subject and Notes is removed', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  await expect(page.locator('.subject-label')).toContainText('01');
  await expect(page.locator('.subject-folder-toggle')).toHaveCount(1);
  await expect(page.locator('[data-id="industry-elective"].subject-folder-toggle')).toBeVisible();
  await expect(page.locator('[data-id="endocrinology"].subject-folder-toggle')).toHaveCount(0);
  await expect(page.locator('[data-id="pathology"].subject-folder-toggle')).toHaveCount(0);
  await expect(page.getByRole('tab', { name: 'Notes', exact: true })).toHaveCount(0);
  await expect(page.locator('.course-label')).toContainText('INDUSTRY ELECTIVE');
  await expect(page).toHaveURL(/#industry-elective\/lesson-1\/flashcards$/);
});

test('removed subject routes fall back to Industry Elective flashcards', async ({ page }) => {
  await page.goto('/#endocrinology/lesson-1/notes');

  await expect(page.getByRole('tab', { name: 'Flashcards', exact: true })).toHaveAttribute('aria-selected', 'true');
  await expect(page.locator('.course-label')).toContainText('INDUSTRY ELECTIVE');
  await expect(page).toHaveURL(/#industry-elective\/lesson-1\/flashcards$/);
});

test('Industry Elective folder can be collapsed and reopened', async ({ page }) => {
  await page.goto('/');

  const subjectToggle = page.locator('[data-id="industry-elective"].subject-folder-toggle');
  const lessonNav = page.locator('#subject-collection-0 .lesson-nav');

  await expect(subjectToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(lessonNav).toBeVisible();
  await subjectToggle.click();
  await expect(subjectToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(lessonNav).toBeHidden();
  await subjectToggle.click();
  await expect(subjectToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(lessonNav).toBeVisible();
});
