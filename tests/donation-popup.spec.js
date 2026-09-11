import { test, expect } from '@playwright/test';

test.describe('Timed Donation QR Popup & 30-Minute Recurring Reminder', () => {
  test('initial modal displays immediately on open, shows quote, and locks close for 3 seconds', async ({ page }) => {
    // Navigate with donation popup forced
    await page.goto('/?donation=1');

    const overlay = page.locator('.donation-overlay');
    await expect(overlay).toBeVisible();

    // Check QR code image
    const qrImg = page.locator('.donation-qr-img').first();
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
    await expect(page.locator('.donation-qr-img').first()).toBeVisible();
    await expect(page.locator('.donation-quote')).toContainText('No one has ever become poor by giving.');

    // Verify 3s countdown applies to recurring reminder as well
    const recCloseBtn = page.locator('.donation-close-btn');
    await expect(recCloseBtn).toBeDisabled();
    await expect(recCloseBtn).toBeEnabled({ timeout: 5000 });

    await recCloseBtn.click();
    await expect(recurringOverlay).not.toBeVisible();
  });

  test('allows switching between MariBank and Universal InstaPay via tabs, chevrons, keyboard, and swipe', async ({ page }) => {
    await page.goto('/?donation=1');
    const overlay = page.locator('.donation-overlay');
    await expect(overlay).toBeVisible();

    // Default slide is MariBank
    const slides = page.locator('.donation-qr-slides');
    await expect(slides).toHaveCSS('transform', /matrix\(1,\s*0,\s*0,\s*1,\s*0,\s*0\)|none/);
    await expect(page.locator('.donation-account-pill')).toContainText('MariBank (InstaPay)');

    // 1. Click "GCash" tab button
    await page.locator('.donation-switch-pill[data-tab="1"]').click();
    await expect(page.locator('.donation-account-pill')).toContainText('GCash (InstaPay)');
    const anyBankImg = page.locator('.donation-qr-slide[data-slide="1"] .donation-qr-img');
    await expect(anyBankImg).toHaveAttribute('src', '/images/donation-qr-instapay.png');

    // 2. Click "MariBank" tab button to switch back
    await page.locator('.donation-switch-pill[data-tab="0"]').click();
    await expect(page.locator('.donation-account-pill')).toContainText('MariBank (InstaPay)');

    // 3. Click next chevron button
    await page.locator('.donation-nav-btn.next').click();
    await expect(page.locator('.donation-account-pill')).toContainText('GCash (InstaPay)');

    // 4. Click prev chevron button
    await page.locator('.donation-nav-btn.prev').click();
    await expect(page.locator('.donation-account-pill')).toContainText('MariBank (InstaPay)');

    // 5. Use ArrowRight keyboard shortcut
    await page.keyboard.press('ArrowRight');
    await expect(page.locator('.donation-account-pill')).toContainText('GCash (InstaPay)');

    // 6. Use ArrowLeft keyboard shortcut
    await page.keyboard.press('ArrowLeft');
    await expect(page.locator('.donation-account-pill')).toContainText('MariBank (InstaPay)');

    // 7. Test touch swipe gesture (swipe left -> switches to slide 1)
    const carouselBox = page.locator('#donation-carousel');
    const box = await carouselBox.boundingBox();
    if (box) {
      // Dispatch touchstart and touchend to simulate swipe left
      await page.evaluate(() => {
        const c = document.querySelector('#donation-carousel');
        const startTouch = new Touch({ identifier: 1, target: c, clientX: 250, clientY: 150 });
        const endTouch = new Touch({ identifier: 1, target: c, clientX: 100, clientY: 150 });
        c.dispatchEvent(new TouchEvent('touchstart', { touches: [startTouch], changedTouches: [startTouch] }));
        c.dispatchEvent(new TouchEvent('touchend', { touches: [], changedTouches: [endTouch] }));
      });
      await expect(page.locator('.donation-account-pill')).toContainText('GCash (InstaPay)');
    }
  });

  test('captures screenshots of initial and 30-minute donation popups in light, dark, and mobile modes', async ({ page }) => {
    // 1. Initial Popup Light Mode (Desktop) - MariBank
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto('/?donation=1');
    await page.evaluate(() => { document.documentElement.dataset.theme = 'light'; });
    await expect(page.locator('.donation-overlay')).toBeVisible();
    await page.screenshot({
      path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/donation-initial-light.png',
    });

    // 2. Initial Popup - Universal InstaPay Slide (Light Mode)
    await page.locator('.donation-switch-pill[data-tab="1"]').click();
    await page.screenshot({
      path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/donation-instapay-light.png',
    });

    // 3. Initial Popup Dark Mode (Desktop) - Universal InstaPay Slide
    await page.evaluate(() => { document.documentElement.dataset.theme = 'dark'; });
    await page.screenshot({
      path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/donation-instapay-dark.png',
    });

    // Switch back to MariBank for dark mode capture
    await page.locator('.donation-switch-pill[data-tab="0"]').click();
    await page.screenshot({
      path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/donation-initial-dark.png',
    });

    // 4. Initial Popup Mobile Viewport
    await page.setViewportSize({ width: 390, height: 844 });
    await page.screenshot({
      path: 'C:/Users/USER/.gemini/antigravity/brain/8473476e-3ade-4021-899e-bf46f6541b9b/donation-initial-mobile.png',
    });

    // Close initial modal
    const closeBtn = page.locator('.donation-close-btn');
    await expect(closeBtn).toBeEnabled({ timeout: 5000 });
    await closeBtn.click();

    // 5. Trigger 30-Minute Recurring Popup
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
