from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import json
from generate_outline import generate_novel_outline
from generate_chapters import generate_chapters_from_outline, load_novel_outline
from merge_chapters import merge_novel
import tempfile
import shutil
app = Flask(__name__)
CORS(app)  # 启用CORS支持，允许所有来源访问

# 配置临时目录
TEMP_DIR = './temp'
if not os.path.exists(TEMP_DIR):
    os.makedirs(TEMP_DIR)

@app.route('/generate-novel', methods=['POST'])
def generate_novel():
    try:
        # 获取前端发送的配置数据
        config = request.json
        print('Received config:', config)

        # 为每个请求创建临时目录
        with tempfile.TemporaryDirectory(dir=TEMP_DIR) as temp_dir:
            # 生成小说大纲
            outline_path = os.path.join(temp_dir, 'outline.json')
            outline_data = generate_novel_outline(config, outline_path)

            # 生成章节
            chapters_dir = os.path.join(temp_dir, 'chapters')
            generate_chapters_from_outline(outline_data, chapters_dir)

            # 合并章节
            output_dir = os.path.join(temp_dir, 'output')
            os.makedirs(output_dir, exist_ok=True)
            merge_novel(outline_path, chapters_dir, output_dir)

            # 读取合并后的小说内容
            novel_title = outline_data.get('title', '未知标题')
            novel_path = os.path.join(output_dir, f'《{novel_title}》.txt')
            with open(novel_path, 'r', encoding='utf-8') as f:
                novel_content = f.read()

            # 返回结果
            return jsonify({
                'success': True,
                'title': novel_title,
                'content': novel_content
            })
    except Exception as e:
        print('Error generating novel:', str(e))
        return jsonify({
            'success': False,
            'error': str(e)
        })

if __name__ == '__main__':
    app.run(debug=True, port=5000)