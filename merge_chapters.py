import os
import json

def merge_novel(outline_path, chapters_dir, output_dir):
    # 读取小说大纲
    with open(outline_path, 'r', encoding='utf-8') as f:
        outline = json.load(f)

    # 初始化输出内容
    merged_content = outline['title'] + "\n\n"
    output_path = os.path.join(output_dir, f"《{outline['title']}》.txt")
    # 添加目录
    merged_content += "目录\n"
    for index, chapter in enumerate(outline['chapters']):
        if 'title' in chapter:
            merged_content += f"第{index+1}章 - {chapter['title']}\n"
    merged_content += "\n"

    # 按大纲顺序添加各章节内容
    for index, chapter in enumerate(outline['chapters']):
        if 'title' in chapter:
            chapter_filename = f'chapter_{index}.md'
            chapter_path = os.path.join(chapters_dir, chapter_filename)
            if os.path.exists(chapter_path):
                # 添加章节标题
                merged_content += f"第{index+1}章 {chapter['title']}\n\n"
                # 添加章节内容
                with open(chapter_path, 'r', encoding='utf-8') as f:
                    chapter_content = f.read()
                    # 移除Markdown格式（简单处理，移除#等）
                    for line in chapter_content.splitlines():
                        line = line.lstrip('# ')
                        merged_content += line + '\n'
                    merged_content += '\n'

    # 写入输出文件
    with open(output_path, 'w', encoding='utf-8') as f:
        f.write(merged_content)

if __name__ == "__main__":
    outline_path = "./output/outline.json"  # 替换为实际的大纲文件路径
    chapters_dir = "./output/chapters"     # 替换为实际的章节目录路径
    output_dir = "./output/"       # 替换为实际的输出文件路径
    merge_novel(outline_path, chapters_dir, output_dir)
