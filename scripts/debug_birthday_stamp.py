#!/usr/bin/env python3
"""
誕生日スタンプのデバッグと修正
"""

import os
import sys
from PIL import Image
import numpy as np

def debug_area(original_image, x, y, w, h, name):
    """
    指定エリアをデバッグ
    """
    print(f"🔍 {name} エリアをデバッグ中...")
    
    # 該当エリアを切り出し
    area = original_image.crop((x, y, x + w, y + h))
    
    # 統計情報を表示
    if area.mode != 'RGB':
        area_rgb = area.convert('RGB')
    else:
        area_rgb = area
    
    data = np.array(area_rgb)
    
    print(f"  エリアサイズ: {area.size}")
    print(f"  色の範囲:")
    print(f"    R: {data[:,:,0].min()} - {data[:,:,0].max()}")
    print(f"    G: {data[:,:,1].min()} - {data[:,:,1].max()}")
    print(f"    B: {data[:,:,2].min()} - {data[:,:,2].max()}")
    
    # 色の分布を確認
    rgb_mean = np.mean(data, axis=2)
    print(f"    平均輝度: {rgb_mean.min()} - {rgb_mean.max()}")
    
    # 少し大きめの範囲で切り出し
    margin = 50
    x_start = max(0, x - margin)
    y_start = max(0, y - margin)
    x_end = min(original_image.width, x + w + margin)
    y_end = min(original_image.height, y + h + margin)
    
    larger_area = original_image.crop((x_start, y_start, x_end, y_end))
    
    # より保守的な背景除去
    if larger_area.mode != 'RGBA':
        larger_area = larger_area.convert('RGBA')
    
    data = np.array(larger_area)
    
    # 非常に保守的な閾値（本当に白い部分のみ）
    very_white = (data[:, :, 0] >= 248) & \
                 (data[:, :, 1] >= 248) & \
                 (data[:, :, 2] >= 248)
    
    data[very_white] = [255, 255, 255, 0]
    
    result = Image.fromarray(data, 'RGBA')
    
    # 非透明部分をチェック
    alpha = np.array(result)[:, :, 3]
    non_transparent = np.where(alpha > 10)
    
    print(f"  非透明ピクセル数: {len(non_transparent[0])}")
    
    if len(non_transparent[0]) > 0:
        top = non_transparent[0].min()
        bottom = non_transparent[0].max()
        left = non_transparent[1].min()
        right = non_transparent[1].max()
        
        print(f"  コンテンツ範囲: ({left}, {top}) - ({right}, {bottom})")
        
        # コンテンツを切り出し
        padding = 20
        content = result.crop((
            max(0, left - padding),
            max(0, top - padding),
            min(result.width, right + padding + 1),
            min(result.height, bottom + padding + 1)
        ))
        
        return content
    
    return None

def main():
    input_file = '../temporary_upload/名称未設定.png'
    output_dir = '../public/images/stamps/ao'
    
    try:
        original_image = Image.open(input_file)
        print(f"✅ 画像を読み込みました: {original_image.size}")
    except Exception as e:
        print(f"❌ 画像の読み込みに失敗しました: {e}")
        sys.exit(1)
    
    # 誕生日スタンプの位置（右上）
    birthday_content = debug_area(original_image, 1875, 0, 625, 360, "誕生日")
    
    if birthday_content:
        # 128x128にリサイズ
        birthday_content.thumbnail((110, 110), Image.Resampling.LANCZOS)
        
        # 最終画像
        final_image = Image.new('RGBA', (128, 128), (255, 255, 255, 0))
        x_pos = (128 - birthday_content.width) // 2
        y_pos = (128 - birthday_content.height) // 2
        final_image.paste(birthday_content, (x_pos, y_pos), birthday_content)
        
        # 保存
        output_path = os.path.join(output_dir, 'ao_birthday.png')
        final_image.save(output_path, 'PNG', optimize=True)
        
        file_size = os.path.getsize(output_path)
        print(f"✅ 誕生日スタンプ修正完了: {file_size} bytes")
    else:
        print("❌ 誕生日スタンプの修正に失敗しました")
    
    # 全体的にもう一度他の位置も試してみる
    print("\n🔍 他の可能性のある位置も確認...")
    
    # 最後の列のスタンプ位置を調整して確認
    alternative_positions = [
        {'name': '右上(調整1)', 'x': 1850, 'y': 10, 'w': 650, 'h': 340},
        {'name': '右上(調整2)', 'x': 1900, 'y': 20, 'w': 600, 'h': 320},
    ]
    
    for pos in alternative_positions:
        content = debug_area(original_image, pos['x'], pos['y'], pos['w'], pos['h'], pos['name'])
        if content:
            print(f"  ✅ {pos['name']} で有効なコンテンツを発見")

if __name__ == '__main__':
    main()