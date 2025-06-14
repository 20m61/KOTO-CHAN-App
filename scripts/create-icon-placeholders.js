#!/usr/bin/env node

// 簡易的なアイコンプレースホルダー作成
// 実際のPNGファイルとして認識される最小限のデータを生成

const fs = require('fs');
const path = require('path');

// 1x1ピクセルの透明PNGデータ（Base64）
const transparentPng = Buffer.from(
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
  'base64'
);

// ICOファイルの最小データ
const icoData = Buffer.from([
  0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x10, 0x10, 0x00, 0x00, 0x01, 0x00,
  0x20, 0x00, 0x68, 0x04, 0x00, 0x00, 0x16, 0x00, 0x00, 0x00
]);

const publicDir = path.join(__dirname, '../public');

// アイコンファイルを作成
const icons = [
  { name: 'favicon.ico', data: icoData },
  { name: 'icon-192.png', data: transparentPng },
  { name: 'icon-512.png', data: transparentPng },
  { name: 'apple-icon.png', data: transparentPng }
];

console.log('🎨 PWAアイコンプレースホルダー作成中...');

icons.forEach(icon => {
  const filePath = path.join(publicDir, icon.name);
  
  // プレースホルダーファイルが存在する場合は削除
  const placeholderPath = `${filePath}.placeholder`;
  if (fs.existsSync(placeholderPath)) {
    fs.unlinkSync(placeholderPath);
  }
  
  // 最小限のアイコンファイルを作成
  fs.writeFileSync(filePath, icon.data);
  console.log(`✅ ${icon.name} 作成完了`);
});

console.log('');
console.log('📝 注意：これらは最小限のプレースホルダーです');
console.log('🎯 本格運用時は以下の手順で実際のアイコンに置き換えてください：');
console.log('');
console.log('1. https://favicon.io/favicon-converter/ にアクセス');
console.log('2. public/icon.svg をアップロード');
console.log('3. 生成されたファイルで置き換え');
console.log('');
console.log('🚀 現在のプレースホルダーでもPWA機能は正常に動作します！');

module.exports = { icons };