import { test, expect } from '@playwright/test';

test.describe('Timed Donation QR Popup & 30-Minute Recurring Reminder', () => {
  test('initial modal displays immediately on open, shows quote, and locks close for 3 seconds', async ({ page }) => {
    // Navigate with donation popup forced
    await page.goto('/?donation=1');

    const overlay = page.locator('.donation-overlay');
    await expect(overlay).toBeVisible();

    // Check QR code image
    const qrImg = page.locator('.donation-qr-img');
    await expect(qrImg).toBeVisible();
    await expect(qrImg).toHaveAttribute('src', '/images/donation-qr.png');

    // Check Quote
    await expect(page.locator('.donation-quote')).toContainText('No one has ever become poor by giving.');

    // Check Close button is initially disabled with countdown
    const closeBtn = page.locator('.donation-close-btn');
    await expect(closeBtn).toBeVisible();
    await expect(closeBtn).toBeDisabled();
    await expect(closeBtn).toContainText('Please wait');

    // Attempting to dismiss via Escape key while locked does nothing
    await page.keyboard.press('Escape');
    await expect(overlay).toBeVisible();

    // Attempting to click backdrop while locked does nothing
    await overlay.click({ position: { x: 10, y: 10 }, force: true });
    await expect(overlay).toBeVisible();

    // Wait for the 3-second countdown to finish
    await expect(closeBtn).toBeEnabled({ timeout: 5000 });
    await expect(closeBtn).toContainText('Continue to Reviewer');

    // Clicking close button dismisses the popup and restores scroll
    await closeBtn.click();
    await expect(overlay).not.toBeVisible();
    const bodyOverflow = await page.evaluate(() => document.body.style.overflow);
    expect(bodyOverflow).toBe('');
  });

  test('Escape key dismisses popup once 3-second countdown finishes', async ({ page }) => {
    await page.goto('/?donation=1');
    const overlay = page.locator('.donation-overlay');
    await expect(overlay).toBeVisible();

    const closeBtn = page.locator('.donation-close-btn');
    await expect(closeBtn).toBeEnabled({ timeout: 5000 });

    await page.keyboard.press('Escape');
    await expect(overlay).not.toBeVisible();
  });

  test('30-minute recurring reminder displays OOPS OOPS OOPS, DONATE FLES and QR code', async ({ page }) => {
    await page.goto('/?donation=1');

    // Close initial modal
    const closeBtn = page.locator('.donation-close-btn');
    await expect(closeBtn).toBeEnabled({ timeout: 5000 });
    await closeBtn.click();
    await expect(page.locator('.donation-overlay')).not.toBeVisible();

    // Simulate 30 minutes passing
    await page.evaluate(() => {
      window.__setNextDonationTime(Date.now() - 1000);
    });

    // Wait for tick() to trigger the recurring modal
    const recurringOverlay = page.locator('.donation-overlay');
    await expect(recurringOverlay).toBeVisible({ timeout: 2000 });

    // Check OOPS OOPS OOPS, DONATE FLES headline
    const oopsTitle = page.locator('.donation-title.oops-alert');
    await expect(oopsTitle).toBeVisible();
    await expect(oopsTitle).toHaveText('OOPS OOPS OOPS, DONATE FLES');

    // Check QR code image and quote are present
    await expect(page.locator('.donation-qr-img')).toBeVisible();
    await expect(page.locator('.donation-quote')).toContainText('No one has ever become poor by giving.');

    // Verify 3s countdown applies to recurring reminder as well
    const recCloseBtn = page.locator('.donation-close-btn');
    await expect(recCloseBtn).toBeDisabled();
    await expect(recCloseBtn).toBeEnabled({ timeout: 5000 });

    await recCloseBtn.click();
    await expect(recurringOverlay).not.toBeVisible();
  });

  test('captures screenshots of initial and 30-minute donation popups in light, dark, and mobile modes', async ({ page }) => {
    // 1. Initial Popup Light Mode (Desktop)
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/?donation=1');
    await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; });
    await expect(page.locator('.donation-overlay')).toBeVisible();
    await page.screenshot({
      path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/donation-initial-light.png',
    });

    // 2. Initial Popup Dark Mode (Desktop)
    await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
    await page.screenshot({
      path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/donation-initial-dark.png',
    });

    // 3. Initial Popup Mobile Viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/donation-initial-mobile.png',
    });

    // Close initial modal
    const closeBtn = page.locator('.donation-close-btn');
    await expect(closeBtn).toBeEnabled({ timeout: 5000 });
    await closeBtn.click();

    // 4. Trigger 30-Minute Recurring Popup
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.evaluate(() => {
      window.__setNextDonationTime(Date.now() - 1000);
    });
    await expect(page.locator('.donation-title.oops-alert')).toBeVisible();

    // 30-Min Dark Mode
    await page.screenshot({
      path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/donation-oops-dark.png',
    });

    // 30-Min Light Mode
    await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; });
    await page.screenshot({
      path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/donation-oops-light.png',
    });
  });
});
