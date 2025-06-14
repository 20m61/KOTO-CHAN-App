#!/usr/bin/env python3
"""
手動座標指定によるスタンプ切り出しスクリプト
小さすぎるファイルを手動で正確に切り出します。
"""

import os
import sys
from PIL import Image
import numpy as np

def remove_background_smart(image, threshold=235):
    """
    スマートな背景除去
    """
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    data = np.array(image)
    
    # 白に近い色を透過に
    # より厳密な条件: RGBすべてが閾値以上
    white_mask = (data[:, :, 0] >= threshold) & \
                 (data[:, :, 1] >= threshold) & \
                 (data[:, :, 2] >= threshold)
    
    data[white_mask] = [255, 255, 255, 0]
    
    return Image.fromarray(data, 'RGBA')

def crop_with_coordinates(image, x, y, width, height):
    """
    指定座標でクロップ
    """
    return image.crop((x, y, x + width, y + height))

def main():
    input_file = '../temporary_upload/名称未設定.png'
    output_dir = '../public/images/stamps/ao'
    
    if not os.path.exists(input_file):
        print(f"エラー: 入力ファイルが見つかりません: {input_file}")
        sys.exit(1)
    
    try:
        original_image = Image.open(input_file)
        print(f"✅ 画像を読み込みました: {original_image.size}")
    except Exception as e:
        print(f"❌ 画像の読み込みに失敗しました: {e}")
        sys.exit(1)
    
    # 手動で正確な座標を指定
    # 画像サイズ: 2500x1080
    # 各スタンプのおおよそのサイズ: 625x360
    stamps_coordinates = [
        # 1行目
        {'name': 'hello', 'x': 0, 'y': 0, 'w': 625, 'h': 360, 'filename': 'ao_hello.png'},
        {'name': 'sleeping', 'x': 625, 'y': 0, 'w': 625, 'h': 360, 'filename': 'ao_sleeping.png'},
        {'name': 'celebration', 'x': 1250, 'y': 0, 'w': 625, 'h': 360, 'filename': 'ao_celebration.png'},
        {'name': 'birthday', 'x': 1875, 'y': 0, 'w': 625, 'h': 360, 'filename': 'ao_birthday.png'},
        
        # 2行目
        {'name': 'angry', 'x': 0, 'y': 360, 'w': 625, 'h': 360, 'filename': 'ao_angry.png'},
        {'name': 'playing', 'x': 625, 'y': 360, 'w': 625, 'h': 360, 'filename': 'ao_playing.png'},
        {'name': 'thanks', 'x': 1250, 'y': 360, 'w': 625, 'h': 360, 'filename': 'ao_thanks.png'},
        {'name': 'love', 'x': 1875, 'y': 360, 'w': 625, 'h': 360, 'filename': 'ao_love.png'},
        
        # 3行目
        {'name': 'happy', 'x': 0, 'y': 720, 'w': 625, 'h': 360, 'filename': 'ao_happy.png'},
        {'name': 'shy', 'x': 625, 'y': 720, 'w': 625, 'h': 360, 'filename': 'ao_shy.png'},
        {'name': 'present', 'x': 1250, 'y': 720, 'w': 625, 'h': 360, 'filename': 'ao_present.png'},
        {'name': 'ok', 'x': 1875, 'y': 720, 'w': 625, 'h': 360, 'filename': 'ao_ok.png'},
    ]
    
    for i, stamp in enumerate(stamps_coordinates):
        try:
            print(f"🔄 スタンプ {i+1}/12 を処理中: {stamp['name']}")
            
            # 指定座標で切り出し
            cropped = crop_with_coordinates(
                original_image, 
                stamp['x'], 
                stamp['y'], 
                stamp['w'], 
                stamp['h']
            )
            
            # 余白を削除（30pixel程度の余白）
            margin = 30
            cropped_trimmed = cropped.crop((
                margin, 
                margin, 
                stamp['w'] - margin, 
                stamp['h'] - margin
            ))
            
            # 背景を透過に
            transparent = remove_background_smart(cropped_trimmed, threshold=230)
            
            # コンテンツ部分を自動検出してトリミング
            # アルファチャンネルから非透明部分を検出
            alpha = np.array(transparent)[:, :, 3]
            non_transparent = np.where(alpha > 10)
            
            if len(non_transparent[0]) > 0:
                top = non_transparent[0].min()
                bottom = non_transparent[0].max()
                left = non_transparent[1].min()
                right = non_transparent[1].max()
                
                # 少し余白を追加
                padding = 10
                top = max(0, top - padding)
                bottom = min(transparent.height - 1, bottom + padding)
                left = max(0, left - padding)
                right = min(transparent.width - 1, right + padding)
                
                content_cropped = transparent.crop((left, top, right + 1, bottom + 1))
            else:
                content_cropped = transparent
            
            # 128x128にリサイズ（アスペクト比保持）
            content_cropped.thumbnail((120, 120), Image.Resampling.LANCZOS)
            
            # 128x128の透明背景に中央配置
            final_image = Image.new('RGBA', (128, 128), (255, 255, 255, 0))
            x = (128 - content_cropped.width) // 2
            y = (128 - content_cropped.height) // 2
            final_image.paste(content_cropped, (x, y), content_cropped)
            
            # ファイル保存
            output_path = os.path.join(output_dir, stamp['filename'])
            final_image.save(output_path, 'PNG', optimize=True)
            
            file_size = os.path.getsize(output_path)
            print(f"✅ 保存完了: {stamp['filename']} ({file_size} bytes)")
            
        except Exception as e:
            print(f"❌ スタンプ {stamp['name']} の処理に失敗: {e}")
            import traceback
            traceback.print_exc()
    
    print("\n🎉 手動処理完了!")
    
    # ファイル一覧表示
    print("\n📁 最終的なスタンプファイル:")
    for filename in sorted(os.listdir(output_dir)):
        if filename.startswith('ao_') and filename.endswith('.png'):
            filepath = os.path.join(output_dir, filename)
            file_size = os.path.getsize(filepath)
            print(f"  {filename} ({file_size} bytes)")

if __name__ == '__main__':
    main()