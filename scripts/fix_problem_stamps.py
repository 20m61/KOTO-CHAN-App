#!/usr/bin/env python3
"""
問題のあるスタンプ（ao_birthday, ao_love）を手動で修正
"""

import os
import sys
from PIL import Image
import numpy as np

def process_specific_stamp(original_image, x, y, w, h, name, output_path):
    """
    特定のスタンプを慎重に処理
    """
    print(f"🔄 {name} スタンプを処理中...")
    
    # より大きな範囲で切り出し（余白を多めに）
    margin = 20
    cropped = original_image.crop((
        max(0, x - margin), 
        max(0, y - margin), 
        min(original_image.width, x + w + margin), 
        min(original_image.height, y + h + margin)
    ))
    
    print(f"  切り出しサイズ: {cropped.size}")
    
    # RGBAに変換
    if cropped.mode != 'RGBA':
        cropped = cropped.convert('RGBA')
    
    data = np.array(cropped)
    
    # より緩い条件で背景除去（白の閾値を下げる）
    threshold = 220  # より緩い閾値
    
    # RGB値の平均を計算
    rgb_mean = np.mean(data[:, :, :3], axis=2)
    
    # 非常に明るい色（白っぽい）のみを透過に
    white_mask = rgb_mean >= threshold
    
    # マスクを適用
    data[white_mask] = [255, 255, 255, 0]
    
    # 画像に戻す
    result = Image.fromarray(data, 'RGBA')
    
    # 非透明部分を検出
    alpha = np.array(result)[:, :, 3]
    non_transparent = np.where(alpha > 50)  # より高い閾値で検出
    
    if len(non_transparent[0]) == 0:
        print(f"  ⚠️ 警告: {name} で非透明部分が見つかりません。閾値を調整します。")
        
        # より緩い条件で再試行
        data = np.array(cropped)
        threshold = 200  # さらに緩い閾値
        rgb_mean = np.mean(data[:, :, :3], axis=2)
        white_mask = rgb_mean >= threshold
        data[white_mask] = [255, 255, 255, 0]
        result = Image.fromarray(data, 'RGBA')
        
        alpha = np.array(result)[:, :, 3]
        non_transparent = np.where(alpha > 30)
    
    # コンテンツ部分をクロップ
    if len(non_transparent[0]) > 0:
        top = non_transparent[0].min()
        bottom = non_transparent[0].max()
        left = non_transparent[1].min()
        right = non_transparent[1].max()
        
        # 余白を追加
        padding = 15
        top = max(0, top - padding)
        bottom = min(result.height - 1, bottom + padding)
        left = max(0, left - padding)
        right = min(result.width - 1, right + padding)
        
        content_cropped = result.crop((left, top, right + 1, bottom + 1))
        print(f"  コンテンツサイズ: {content_cropped.size}")
    else:
        content_cropped = result
        print(f"  ⚠️ 自動クロップできませんでした。元のサイズを使用: {result.size}")
    
    # 128x128にリサイズ
    content_cropped.thumbnail((110, 110), Image.Resampling.LANCZOS)
    
    # 最終画像を作成
    final_image = Image.new('RGBA', (128, 128), (255, 255, 255, 0))
    x_pos = (128 - content_cropped.width) // 2
    y_pos = (128 - content_cropped.height) // 2
    final_image.paste(content_cropped, (x_pos, y_pos), content_cropped)
    
    # 保存
    final_image.save(output_path, 'PNG', optimize=True)
    file_size = os.path.getsize(output_path)
    print(f"✅ {name} 保存完了: {file_size} bytes")
    
    return file_size > 1000  # 1KB以上なら成功

def main():
    input_file = '../temporary_upload/名称未設定.png'
    output_dir = '../public/images/stamps/ao'
    
    try:
        original_image = Image.open(input_file)
        print(f"✅ 画像を読み込みました: {original_image.size}")
    except Exception as e:
        print(f"❌ 画像の読み込みに失敗しました: {e}")
        sys.exit(1)
    
    # 問題のあるスタンプの座標
    problem_stamps = [
        {
            'name': 'birthday',
            'x': 1875,  # 4列目
            'y': 0,     # 1行目
            'w': 625,
            'h': 360,
            'filename': 'ao_birthday.png'
        },
        {
            'name': 'love',
            'x': 1875,  # 4列目
            'y': 360,   # 2行目
            'w': 625,
            'h': 360,
            'filename': 'ao_love.png'
        }
    ]
    
    for stamp in problem_stamps:
        output_path = os.path.join(output_dir, stamp['filename'])
        success = process_specific_stamp(
            original_image,
            stamp['x'],
            stamp['y'],
            stamp['w'],
            stamp['h'],
            stamp['name'],
            output_path
        )
        
        if not success:
            print(f"❌ {stamp['name']} の処理に失敗しました。手動確認が必要です。")
    
    print("\n🎉 問題スタンプの修正完了!")

if __name__ == '__main__':
    main()