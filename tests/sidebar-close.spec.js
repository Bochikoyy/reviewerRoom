import { test, expect } from '@playwright/test';

test('desktop sidebar stays open and close button is mobile-only', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/');

  const sidebar = page.locator('.sidebar');
  await expect(sidebar).toBeVisible();

  // Desktop sidebar has no edge tab
  await expect(page.locator('.sidebar-edge-tab')).toHaveCount(0);

  // Close button inside sidebar is mobile-only, so hidden on desktop
  const closeBtn = sidebar.locator('[data-action="close-menu"]');
  await expect(closeBtn).toBeHidden();

  // Header mobile menu button is hidden on desktop
  const headerMenuBtn = page.locator('.site-header [data-action="menu"]');
  await expect(headerMenuBtn).toBeHidden();

  await page.screenshot({ path: 'test-results/sidebar-desktop.png' });
});

test('endocrinology subject folder can be closed (collapsed) and reopened (expanded)', async ({ page }) => {
  await page.goto('/');

  const subjectToggle = page.locator('[data-id="endocrinology"].subject-folder-toggle');
  const lessonNav = page.locator('#subject-collection-0 .lesson-nav');

  // Initially open
  await expect(subjectToggle).toHaveAttribute('aria-expanded', 'true');
  await expect(lessonNav).toBeVisible();

  // Click to close Endocrinology subject
  await subjectToggle.click();
  await expect(subjectToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(lessonNav).toBeHidden();
  await page.screenshot({ path: 'test-results/endocrinology-collapsed.png' });

  // Persists across reload
  await page.reload();
  await expect(page.locator('[data-id="endocrinology"].subject-folder-toggle')).toHaveAttribute('aria-expanded', 'false');
  await expect(page.locator('#subject-collection-0 .lesson-nav')).toBeHidden();

  // Click to reopen Endocrinology subject
  await page.locator('[data-id="endocrinology"].subject-folder-toggle').click();
  await expect(page.locator('[data-id="endocrinology"].subject-folder-toggle')).toHaveAttribute('aria-expanded', 'true');
  await expect(page.locator('#subject-collection-0 .lesson-nav')).toBeVisible();
});

test('both subjects can be collapsed with distinct active highlight and spacing in dark and light mode', async ({ page }) => {
  await page.goto('/');

  const endoToggle = page.locator('[data-id="endocrinology"].subject-folder-toggle');
  const pathToggle = page.locator('[data-id="pathology"].subject-folder-toggle');

  // Collapse both
  await endoToggle.click();
  await pathToggle.click();

  await expect(endoToggle).toHaveAttribute('aria-expanded', 'false');
  await expect(pathToggle).toHaveAttribute('aria-expanded', 'false');

  // Verify only active subject has selected-subject / subject-active
  await expect(endoToggle).toHaveClass(/selected-subject/);
  await expect(pathToggle).not.toHaveClass(/selected-subject/);

  // Switch to dark mode to match user view
  const themeBtn = page.locator('[data-action="theme"]');
  await themeBtn.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');

  const sidebar = page.locator('.sidebar');
  await sidebar.screenshot({ path: 'test-results/sidebar-both-collapsed-dark.png' });

  // Switch back to light mode and screenshot
  await themeBtn.click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await sidebar.screenshot({ path: 'test-results/sidebar-both-collapsed-light.png' });
});
