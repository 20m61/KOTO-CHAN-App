#!/usr/bin/env python3
"""
ao-chanスタンプ画像の改良版切り出しと透過処理スクリプト
より正確な位置でスタンプを切り出し、個別のファイル名で保存します。
"""

import os
import sys
from PIL import Image, ImageOps
import numpy as np

def remove_background(image, threshold=240):
    """
    白い背景を透過にする関数（改良版）
    """
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    data = np.array(image)
    
    # より厳密な白色判定
    # RGBの平均値が閾値以上で、かつ各チャンネルの差が小さい場合（白っぽい色）
    rgb_mean = np.mean(data[:, :, :3], axis=2)
    rgb_std = np.std(data[:, :, :3], axis=2)
    
    white_areas = (rgb_mean >= threshold) & (rgb_std < 20)
    
    data[white_areas] = [255, 255, 255, 0]
    
    return Image.fromarray(data, 'RGBA')

def crop_stamp_precise(image, row, col, rows=3, cols=4):
    """
    より正確にスタンプを切り出す関数
    """
    width, height = image.size
    
    # 各スタンプのサイズを計算
    stamp_width = width // cols
    stamp_height = height // rows
    
    # 基本的な切り出し座標
    left = col * stamp_width
    top = row * stamp_height
    right = left + stamp_width
    bottom = top + stamp_height
    
    # まず基本サイズで切り出し
    cropped = image.crop((left, top, right, bottom))
    
    # より小さな余白で再切り出し（5%の余白）
    margin_ratio = 0.05
    margin_x = stamp_width * margin_ratio
    margin_y = stamp_height * margin_ratio
    
    final_left = margin_x
    final_top = margin_y
    final_right = stamp_width - margin_x
    final_bottom = stamp_height - margin_y
    
    return cropped.crop((final_left, final_top, final_right, final_bottom))

def auto_crop_content(image):
    """
    透明でない部分を自動検出してクロップ
    """
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # アルファチャンネルから透明でない部分を検出
    alpha = np.array(image)[:, :, 3]
    non_transparent = np.where(alpha > 10)  # 透明度10以上
    
    if len(non_transparent[0]) == 0:
        return image  # 完全透明の場合は元の画像を返す
    
    # バウンディングボックスを計算
    top = non_transparent[0].min()
    bottom = non_transparent[0].max()
    left = non_transparent[1].min()
    right = non_transparent[1].max()
    
    # 少し余白を追加
    padding = 5
    top = max(0, top - padding)
    bottom = min(image.height - 1, bottom + padding)
    left = max(0, left - padding)
    right = min(image.width - 1, right + padding)
    
    return image.crop((left, top, right + 1, bottom + 1))

def main():
    input_file = '../temporary_upload/名称未設定.png'
    output_dir = '../public/images/stamps/ao'
    
    if not os.path.exists(input_file):
        print(f"エラー: 入力ファイルが見つかりません: {input_file}")
        sys.exit(1)
    
    os.makedirs(output_dir, exist_ok=True)
    
    print("🎨 ao-chanスタンプの改良版処理を開始します...")
    
    try:
        original_image = Image.open(input_file)
        print(f"✅ 画像を読み込みました: {original_image.size}")
    except Exception as e:
        print(f"❌ 画像の読み込みに失敗しました: {e}")
        sys.exit(1)
    
    # 新しいスタンプ情報（画像に基づいた正確な配置）
    stamp_info = [
        # 1行目: こんにちは、おやすみ〜、やった〜！、おたんじょうび
        {'row': 0, 'col': 0, 'name': 'hello', 'id': 'ao_hello', 'filename': 'ao_hello.png'},
        {'row': 0, 'col': 1, 'name': 'sleeping', 'id': 'ao_sleeping', 'filename': 'ao_sleeping.png'},
        {'row': 0, 'col': 2, 'name': 'celebration', 'id': 'ao_celebration', 'filename': 'ao_celebration.png'},
        {'row': 0, 'col': 3, 'name': 'birthday', 'id': 'ao_birthday', 'filename': 'ao_birthday.png'},
        
        # 2行目: ぷんぷん、なでて〜、ありがとう、すき
        {'row': 1, 'col': 0, 'name': 'angry', 'id': 'ao_angry', 'filename': 'ao_angry.png'},
        {'row': 1, 'col': 1, 'name': 'playing', 'id': 'ao_playing', 'filename': 'ao_playing.png'},
        {'row': 1, 'col': 2, 'name': 'thanks', 'id': 'ao_thanks', 'filename': 'ao_thanks.png'},
        {'row': 1, 'col': 3, 'name': 'love', 'id': 'ao_love', 'filename': 'ao_love.png'},
        
        # 3行目: だいすき、おめかし、Present!、OK!
        {'row': 2, 'col': 0, 'name': 'happy', 'id': 'ao_happy', 'filename': 'ao_happy.png'},
        {'row': 2, 'col': 1, 'name': 'shy', 'id': 'ao_shy', 'filename': 'ao_shy.png'},
        {'row': 2, 'col': 2, 'name': 'present', 'id': 'ao_present', 'filename': 'ao_present.png'},
        {'row': 2, 'col': 3, 'name': 'ok', 'id': 'ao_ok', 'filename': 'ao_ok.png'},
    ]
    
    processed_count = 0
    
    for i, stamp in enumerate(stamp_info):
        try:
            print(f"🔄 スタンプ {i+1}/12 を処理中: {stamp['name']} ({stamp['id']})")
            
            # スタンプを切り出し
            cropped = crop_stamp_precise(original_image, stamp['row'], stamp['col'], rows=3, cols=4)
            
            # 背景を透過にする（より緩い閾値）
            transparent = remove_background(cropped, threshold=230)
            
            # コンテンツに合わせて自動クロップ
            auto_cropped = auto_crop_content(transparent)
            
            # 最終サイズに調整（128x128、アスペクト比保持）
            auto_cropped.thumbnail((128, 128), Image.Resampling.LANCZOS)
            
            # 透明な背景で中央寄せ
            final_image = Image.new('RGBA', (128, 128), (255, 255, 255, 0))
            x = (128 - auto_cropped.width) // 2
            y = (128 - auto_cropped.height) // 2
            final_image.paste(auto_cropped, (x, y), auto_cropped)
            
            # ファイルを保存
            output_path = os.path.join(output_dir, stamp['filename'])
            final_image.save(output_path, 'PNG', optimize=True)
            
            file_size = os.path.getsize(output_path)
            print(f"✅ 保存完了: {output_path} ({file_size} bytes)")
            processed_count += 1
            
        except Exception as e:
            print(f"❌ スタンプ {stamp['name']} の処理に失敗: {e}")
            import traceback
            traceback.print_exc()
    
    print(f"\n🎉 処理完了! {processed_count}/12 個のスタンプを処理しました。")
    
    # ファイル一覧を表示
    print("\n📁 生成されたファイル:")
    for filename in sorted(os.listdir(output_dir)):
        if filename.endswith('.png'):
            filepath = os.path.join(output_dir, filename)
            file_size = os.path.getsize(filepath)
            print(f"  {filename} ({file_size} bytes)")

if __name__ == '__main__':
    main()