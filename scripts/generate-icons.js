#!/usr/bin/env node

// PWAアイコン生成スクリプト
// SVGファイルからPNGアイコンを生成します

const fs = require('fs');
const path = require('path');

// アイコンサイズの定義
const iconSizes = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-icon.png' },
  { size: 32, name: 'favicon.png' }
];

// Base64エンコードされたファビコン用SVG（シンプル版）
const faviconSvg = `<svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="6" fill="#FFF8DC"/>
  <circle cx="16" cy="14" r="8" fill="#FFDBAC"/>
  <circle cx="13" cy="12" r="1.5" fill="#333"/>
  <circle cx="19" cy="12" r="1.5" fill="#333"/>
  <path d="M 13 16 Q 16 18 19 16" stroke="#333" stroke-width="1" fill="none"/>
  <path d="M 10 10 Q 16 6 22 10" fill="#8B4513"/>
  <path d="M 12 10 L 16 4 L 20 10" fill="#FF6B6B"/>
  <text x="16" y="30" font-size="4" text-anchor="middle" fill="#8B4513">KO</text>
</svg>`;

console.log('🎨 PWAアイコン生成ガイド');
console.log('='.repeat(50));
console.log('');
console.log('このスクリプトでは、以下のアイコンファイルが必要です：');
console.log('');

iconSizes.forEach(icon => {
  console.log(`📱 ${icon.name} (${icon.size}x${icon.size}px)`);
});

console.log('');
console.log('🛠️  手動生成手順：');
console.log('1. public/icon.svg をWebブラウザで開く');
console.log('2. ブラウザの開発者ツールでスクリーンショット撮影');
console.log('3. 画像編集ソフトで各サイズにリサイズ');
console.log('4. public/ フォルダに保存');
console.log('');

// ファビコン用のシンプルなSVGを生成
const faviconPath = path.join(__dirname, '../public/favicon.svg');
fs.writeFileSync(faviconPath, faviconSvg);
console.log('✅ favicon.svg を生成しました');

// プレースホルダーファイルを作成（実際の画像ファイルの代わり）
const publicDir = path.join(__dirname, '../public');

iconSizes.forEach(icon => {
  const placeholderPath = path.join(publicDir, `${icon.name}.placeholder`);
  const content = `# ${icon.name} プレースホルダー
サイズ: ${icon.size}x${icon.size}px
説明: ことちゃんアプリのPWAアイコン

このファイルを実際の${icon.name}に置き換えてください。
public/icon.svg を参考に画像を生成してください。
`;
  fs.writeFileSync(placeholderPath, content);
});

console.log('📝 プレースホルダーファイルを生成しました');
console.log('');
console.log('🌐 オンラインツールでアイコン生成：');
console.log('- https://favicon.io/favicon-converter/');
console.log('- https://realfavicongenerator.net/');
console.log('');
console.log('💡 SVGファイルをアップロードして、全サイズを一括生成できます。');

module.exports = { iconSizes, faviconSvg };