#!/usr/bin/env python3
"""
正しく抽出されたスタンプを適切なファイル名にマッピング
"""

import os
import shutil
from PIL import Image

def resize_and_save_stamp(input_path, output_path, stamp_name):
    """
    スタンプを128x128にリサイズして保存
    """
    try:
        # 画像を読み込み
        image = Image.open(input_path)
        
        # 128x128にサムネイル化（アスペクト比を維持）
        image.thumbnail((110, 110), Image.Resampling.LANCZOS)
        
        # 最終画像を作成（128x128の透明背景）
        final_image = Image.new('RGBA', (128, 128), (255, 255, 255, 0))
        
        # 中央配置
        x_pos = (128 - image.width) // 2
        y_pos = (128 - image.height) // 2
        final_image.paste(image, (x_pos, y_pos), image)
        
        # 保存
        final_image.save(output_path, 'PNG', optimize=True)
        
        file_size = os.path.getsize(output_path)
        print(f"✅ {stamp_name}: {file_size} bytes")
        
        return True
    except Exception as e:
        print(f"❌ {stamp_name} エラー: {e}")
        return False

def main():
    # 抽出されたスタンプのパス
    test_stamps_dir = '../test_stamps'
    output_dir = '../public/images/stamps/ao'
    
    # グリッド位置からファイル名へのマッピング
    # 実際の画像の内容を確認する必要がありますが、とりあえず推測でマッピング
    stamp_mapping = {
        # 1行目
        'stamp_r1_c1.png': 'ao_yummy.png',      # 左上
        'stamp_r1_c2.png': 'ao_no.png',         # 中央上
        # 'stamp_r1_c3.png': 'ao_birthday.png',  # 右上（存在しない）
        
        # 2行目
        'stamp_r2_c1.png': 'ao_yes.png',        # 左
        'stamp_r2_c2.png': 'ao_love.png',       # 中央
        # 'stamp_r2_c3.png': 'ao_???.png',       # 右（存在しない）
        
        # 3行目
        'stamp_r3_c1.png': 'ao_surprise.png',   # 左
        'stamp_r3_c2.png': 'ao_ok.png',         # 中央
        'stamp_r3_c3.png': 'ao_good.png',       # 右
        
        # 4行目
        'stamp_r4_c1.png': 'ao_happy.png',      # 左下
        'stamp_r4_c2.png': 'ao_sad.png',        # 中央下
        'stamp_r4_c3.png': 'ao_sleepy.png',     # 右下
    }
    
    print("🔄 スタンプのマッピングと保存を開始...")
    
    successful_count = 0
    
    for test_file, output_file in stamp_mapping.items():
        input_path = os.path.join(test_stamps_dir, test_file)
        output_path = os.path.join(output_dir, output_file)
        
        if os.path.exists(input_path):
            if resize_and_save_stamp(input_path, output_path, output_file):
                successful_count += 1
        else:
            print(f"⚠️ {test_file} が見つかりません")
    
    print(f"\n🎉 {successful_count}/{len(stamp_mapping)} スタンプを正常に処理しました")
    
    # 不足している2つのスタンプについてメッセージ
    missing_stamps = ['ao_birthday.png', 'ao_thinking.png']  # 推測
    print("\n📝 不足スタンプ（元画像に存在しない）:")
    for stamp in missing_stamps:
        print(f"  - {stamp}")
        
        # 既存のスタンプをコピーして placeholder として使用
        placeholder_source = os.path.join(output_dir, 'ao_happy.png')
        placeholder_target = os.path.join(output_dir, stamp)
        
        if os.path.exists(placeholder_source) and not os.path.exists(placeholder_target):
            shutil.copy2(placeholder_source, placeholder_target)
            print(f"    → {stamp} に placeholder を作成しました")

if __name__ == '__main__':
    main()