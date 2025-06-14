#!/usr/bin/env python3
"""
ao-chanスタンプ画像の切り出しと透過処理スクリプト
12個のスタンプを個別に切り出し、背景を透過にして保存します。
"""

import os
import sys
from PIL import Image, ImageOps
import numpy as np

def remove_background(image, threshold=240):
    """
    白い背景を透過にする関数
    
    Args:
        image: PIL Image オブジェクト
        threshold: 白色の閾値（この値以上は透過にする）
    
    Returns:
        背景が透過になったPIL Image
    """
    # RGBAモードに変換
    if image.mode != 'RGBA':
        image = image.convert('RGBA')
    
    # NumPy配列に変換
    data = np.array(image)
    
    # 白い背景を透過にする
    # RGB値がすべて閾値以上の場合、アルファチャンネルを0（透明）にする
    white_areas = (data[:, :, 0] >= threshold) & \
                  (data[:, :, 1] >= threshold) & \
                  (data[:, :, 2] >= threshold)
    
    data[white_areas] = [255, 255, 255, 0]  # 完全透明
    
    # PIL Imageに戻す
    return Image.fromarray(data, 'RGBA')

def crop_stamp(image, row, col, rows=3, cols=4):
    """
    グリッド状に配置されたスタンプから個別のスタンプを切り出す
    
    Args:
        image: 元のPIL Image
        row: 行番号（0から始まる）
        col: 列番号（0から始まる）
        rows: 総行数
        cols: 総列数
    
    Returns:
        切り出されたPIL Image
    """
    width, height = image.size
    
    # 各スタンプのサイズを計算
    stamp_width = width // cols
    stamp_height = height // rows
    
    # 切り出し座標を計算
    left = col * stamp_width
    top = row * stamp_height
    right = left + stamp_width
    bottom = top + stamp_height
    
    # 切り出し
    cropped = image.crop((left, top, right, bottom))
    
    # 余白を少し削除して、スタンプ部分のみを抽出
    # 端から10%の余白を削除
    margin_x = stamp_width * 0.1
    margin_y = stamp_height * 0.1
    
    final_left = margin_x
    final_top = margin_y
    final_right = stamp_width - margin_x
    final_bottom = stamp_height - margin_y
    
    return cropped.crop((final_left, final_top, final_right, final_bottom))

def resize_stamp(image, target_size=(128, 128)):
    """
    スタンプを指定サイズにリサイズ（アスペクト比を保持）
    
    Args:
        image: PIL Image
        target_size: 目標サイズ (width, height)
    
    Returns:
        リサイズされたPIL Image
    """
    # アスペクト比を保持してリサイズ
    image.thumbnail(target_size, Image.Resampling.LANCZOS)
    
    # 透明な背景で中央寄せ
    new_image = Image.new('RGBA', target_size, (255, 255, 255, 0))
    
    # 中央に配置
    x = (target_size[0] - image.width) // 2
    y = (target_size[1] - image.height) // 2
    new_image.paste(image, (x, y), image)
    
    return new_image

def main():
    # パス設定
    input_file = '../temporary_upload/名称未設定.png'
    output_dir = '../public/images/stamps/ao'
    
    # 入力ファイルの存在確認
    if not os.path.exists(input_file):
        print(f"エラー: 入力ファイルが見つかりません: {input_file}")
        sys.exit(1)
    
    # 出力ディレクトリの作成
    os.makedirs(output_dir, exist_ok=True)
    
    print("🎨 ao-chanスタンプの処理を開始します...")
    
    # 元画像を読み込み
    try:
        original_image = Image.open(input_file)
        print(f"✅ 画像を読み込みました: {original_image.size}")
    except Exception as e:
        print(f"❌ 画像の読み込みに失敗しました: {e}")
        sys.exit(1)
    
    # スタンプの配置情報
    # 画像を見ると3行4列に配置されている
    stamp_info = [
        # 1行目
        {'row': 0, 'col': 0, 'name': 'hello', 'filename': 'aochan_stamp_0_0.png'},
        {'row': 0, 'col': 1, 'name': 'sleeping', 'filename': 'aochan_stamp_0_1.png'},
        {'row': 0, 'col': 2, 'name': 'celebration', 'filename': 'aochan_stamp_1_0.png'},
        {'row': 0, 'col': 3, 'name': 'birthday', 'filename': 'aochan_stamp_1_1.png'},
        
        # 2行目
        {'row': 1, 'col': 0, 'name': 'angry', 'filename': 'aochan_stamp_2_0.png'},
        {'row': 1, 'col': 1, 'name': 'playing', 'filename': 'aochan_stamp_2_1.png'},
        {'row': 1, 'col': 2, 'name': 'thanks', 'filename': 'aochan_stamp_3_0.png'},
        {'row': 1, 'col': 3, 'name': 'love', 'filename': 'aochan_stamp_3_1.png'},
        
        # 3行目
        {'row': 2, 'col': 0, 'name': 'happy', 'filename': 'aochan_stamp_0_0.png'},  # 既存ファイル名で上書き
        {'row': 2, 'col': 1, 'name': 'shy', 'filename': 'aochan_stamp_0_1.png'},    # 既存ファイル名で上書き
        {'row': 2, 'col': 2, 'name': 'present', 'filename': 'aochan_stamp_1_0.png'}, # 既存ファイル名で上書き
        {'row': 2, 'col': 3, 'name': 'ok', 'filename': 'aochan_stamp_1_1.png'},      # 既存ファイル名で上書き
    ]
    
    processed_count = 0
    
    for i, stamp in enumerate(stamp_info):
        try:
            print(f"🔄 スタンプ {i+1}/12 を処理中: {stamp['name']}")
            
            # スタンプを切り出し
            cropped = crop_stamp(original_image, stamp['row'], stamp['col'], rows=3, cols=4)
            
            # 背景を透過にする
            transparent = remove_background(cropped, threshold=235)
            
            # サイズを調整
            resized = resize_stamp(transparent, target_size=(128, 128))
            
            # ファイルを保存
            output_path = os.path.join(output_dir, stamp['filename'])
            resized.save(output_path, 'PNG', optimize=True)
            
            print(f"✅ 保存完了: {output_path}")
            processed_count += 1
            
        except Exception as e:
            print(f"❌ スタンプ {stamp['name']} の処理に失敗: {e}")
    
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