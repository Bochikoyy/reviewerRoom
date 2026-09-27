import { test, expect } from '@playwright/test';

test('Endocrinology and Pathology are completely removed from sidebar', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  await expect(page.locator('.subject-label')).toContainText('02');
  await expect(page.locator('.subject-folder-toggle')).toHaveCount(2);
  await expect(page.locator('[data-id="industry-elective"].subject-folder-toggle')).toBeVisible();
  await expect(page.locator('[data-id="digestion"].subject-folder-toggle')).toBeVisible();
  await expect(page.locator('[data-id="endocrinology"].subject-folder-toggle')).toHaveCount(0);
  await expect(page.locator('[data-id="pathology"].subject-folder-toggle')).toHaveCount(0);
});

test('removed endocrinology route falls back to valid subject', async ({ page }) => {
  await page.goto('/#endocrinology/lesson-1/notes');

  await expect(page.locator('[data-id="endocrinology"].subject-folder-toggle')).toHaveCount(0);
  await expect(page).not.toHaveURL(/endocrinology/);
});

test('Industry Elective folder can be collapsed and reopened', async ({ page }) => {
  await page.goto('/#industry-elective/lesson-1/notes');

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
