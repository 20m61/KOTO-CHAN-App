#!/usr/bin/env python3
"""
元画像のグリッド構造を分析し、実際のスタンプ位置を特定
"""

import os
import sys
from PIL import Image
import numpy as np

def analyze_full_image(image_path):
    """
    画像全体を分析してスタンプの実際の位置を特定
    """
    try:
        original_image = Image.open(image_path)
        print(f"✅ 画像を読み込みました: {original_image.size}")
    except Exception as e:
        print(f"❌ 画像の読み込みに失敗しました: {e}")
        return
    
    # RGB変換
    if original_image.mode != 'RGB':
        original_image = original_image.convert('RGB')
    
    data = np.array(original_image)
    
    # 白でない部分（コンテンツ）を検出
    white_threshold = 240
    non_white = np.where(
        (data[:, :, 0] < white_threshold) |
        (data[:, :, 1] < white_threshold) |
        (data[:, :, 2] < white_threshold)
    )
    
    if len(non_white[0]) == 0:
        print("❌ コンテンツが見つかりませんでした")
        return
    
    # コンテンツのバウンディングボックス
    min_y, max_y = non_white[0].min(), non_white[0].max()
    min_x, max_x = non_white[1].min(), non_white[1].max()
    
    print(f"コンテンツ範囲: ({min_x}, {min_y}) - ({max_x}, {max_y})")
    print(f"コンテンツサイズ: {max_x - min_x + 1} x {max_y - min_y + 1}")
    
    # グリッドを推定
    content_width = max_x - min_x + 1
    content_height = max_y - min_y + 1
    
    # 3列4行のグリッドと仮定
    cols = 3
    rows = 4
    
    cell_width = content_width // cols
    cell_height = content_height // rows
    
    print(f"推定セルサイズ: {cell_width} x {cell_height}")
    
    # 各セルを分析
    stamps_found = []
    
    for row in range(rows):
        for col in range(cols):
            x_start = min_x + col * cell_width
            y_start = min_y + row * cell_height
            x_end = x_start + cell_width
            y_end = y_start + cell_height
            
            # セル内のコンテンツを確認
            cell_data = data[y_start:y_end, x_start:x_end]
            
            # コンテンツがあるかチェック
            cell_non_white = np.where(
                (cell_data[:, :, 0] < white_threshold) |
                (cell_data[:, :, 1] < white_threshold) |
                (cell_data[:, :, 2] < white_threshold)
            )
            
            if len(cell_non_white[0]) > 100:  # 十分なコンテンツがある
                stamps_found.append({
                    'row': row + 1,
                    'col': col + 1,
                    'x': x_start,
                    'y': y_start,
                    'w': cell_width,
                    'h': cell_height,
                    'pixels': len(cell_non_white[0])
                })
                print(f"スタンプ発見: 行{row+1}列{col+1} at ({x_start}, {y_start}) - {len(cell_non_white[0])} pixels")
    
    print(f"\n発見されたスタンプ数: {len(stamps_found)}")
    
    # 各スタンプを保存してテスト
    output_dir = '../test_stamps'
    os.makedirs(output_dir, exist_ok=True)
    
    for i, stamp in enumerate(stamps_found):
        # スタンプを切り出し
        stamp_area = original_image.crop((
            stamp['x'], stamp['y'], 
            stamp['x'] + stamp['w'], stamp['y'] + stamp['h']
        ))
        
        # 背景除去
        if stamp_area.mode != 'RGBA':
            stamp_area = stamp_area.convert('RGBA')
        
        stamp_data = np.array(stamp_area)
        
        # 白い背景を透過に
        white_mask = (stamp_data[:, :, 0] >= 240) & \
                     (stamp_data[:, :, 1] >= 240) & \
                     (stamp_data[:, :, 2] >= 240)
        stamp_data[white_mask] = [255, 255, 255, 0]
        
        result = Image.fromarray(stamp_data, 'RGBA')
        
        # 保存
        filename = f"stamp_r{stamp['row']}_c{stamp['col']}.png"
        output_path = os.path.join(output_dir, filename)
        result.save(output_path, 'PNG')
        
        file_size = os.path.getsize(output_path)
        print(f"保存: {filename} - {file_size} bytes")

def main():
    input_file = '../temporary_upload/名称未設定.png'
    analyze_full_image(input_file)

if __name__ == '__main__':
    main()