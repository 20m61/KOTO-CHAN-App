import { test, expect } from '@playwright/test';

test.describe('ホーム画面', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('ページタイトルが正しく表示される', async ({ page }) => {
    await expect(page).toHaveTitle(/ことちゃんバースデーアプリ/);
  });

  test('メインタイトルが表示される', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'ことちゃんアプリ' })).toBeVisible();
  });

  test('4つのナビゲーションボタンが表示される', async ({ page }) => {
    // おとあそびボタン
    await expect(page.getByRole('link', { name: 'おとあそび' })).toBeVisible();
    
    // おえかきボタン
    await expect(page.getByRole('link', { name: 'おえかき' })).toBeVisible();
    
    // アルバムボタン
    await expect(page.getByRole('link', { name: 'アルバム' })).toBeVisible();
    
    // おとなメニューボタン
    await expect(page.getByRole('link', { name: 'おとなメニュー' })).toBeVisible();
  });

  test('ナビゲーションボタンをクリックすると正しいページに遷移する', async ({ page }) => {
    // おとあそびページへの遷移
    await page.getByRole('link', { name: 'おとあそび' }).click();
    await expect(page).toHaveURL('/sound-play');
    
    // ホームに戻る
    await page.goto('/');
    
    // おえかきページへの遷移
    await page.getByRole('link', { name: 'おえかき' }).click();
    await expect(page).toHaveURL('/drawing');
    
    // ホームに戻る
    await page.goto('/');
    
    // アルバムページへの遷移
    await page.getByRole('link', { name: 'アルバム' }).click();
    await expect(page).toHaveURL('/album');
    
    // ホームに戻る
    await page.goto('/');
    
    // 管理ページへの遷移
    await page.getByRole('link', { name: 'おとなメニュー' }).click();
    await expect(page).toHaveURL('/admin');
  });

  test('スタンプが表示される', async ({ page }) => {
    // スタンプ画像が表示されているかチェック
    const stampImage = page.locator('img[alt*="こんにちは"], img[alt*="おたんじょうび"]');
    await expect(stampImage).toBeVisible();
  });

  test('レスポンシブデザインが機能する', async ({ page }) => {
    // モバイルサイズでテスト
    await page.setViewportSize({ width: 375, height: 667 });
    await expect(page.getByRole('heading', { name: 'ことちゃんアプリ' })).toBeVisible();
    
    // デスクトップサイズでテスト
    await page.setViewportSize({ width: 1200, height: 800 });
    await expect(page.getByRole('heading', { name: 'ことちゃんアプリ' })).toBeVisible();
  });

  test('ボタンのホバーエフェクトが動作する', async ({ page }) => {
    const soundButton = page.getByRole('link', { name: 'おとあそび' });
    
    // ホバー前
    await expect(soundButton).toBeVisible();
    
    // ホバー後（デスクトップの場合のみ）
    if (await page.evaluate(() => window.matchMedia('(hover: hover)').matches)) {
      await soundButton.hover();
      // ホバーエフェクトは視覚的なので、エラーが出ないことを確認
      await expect(soundButton).toBeVisible();
    }
  });
});