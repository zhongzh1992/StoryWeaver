import json
import os
from utils.prompt import OUTLINE_PROMPT
from utils.models import call_llm
import copy

def generate_novel_outline(config, save_path):
    """
    调用大模型生成小说大纲，并保存到json文件
    """
    # 调用大模型生成大纲
    print(config)
    print('\n\n')
    prompt = OUTLINE_PROMPT.format(
        title=config.get('title'),
        type=config.get('type'),
        background=config.get('background'),
        roles=config.get('roles'),
        chapters=config.get('chapters'),
        summary=config.get('summary'),
        style=config.get('style'),
        words=config.get('words')
    )
    outline = call_llm(prompt)
    
    try:
        # 假设生成的大纲是json格式，实际可能需要解析文本
        outline_data = json.loads(outline)
    except json.JSONDecodeError:
        # 如果不是json格式，简单处理
        outline_data = {"outline": outline}
    
    # 保存大纲到json文件
    with open(save_path, "w", encoding="utf-8") as f:
        json.dump(outline_data, f, ensure_ascii=False, indent=4)
    
    return outline_data

if __name__ == "__main__":
    config = {
        "title": "都市修仙传",
        "type": "玄幻",
        "background": "一个普通的大学生，意外获得了上古修真系统的知识。",
        "roles": "男主角：张天宇 女主角：周甜雅 女配角：刘晓倩",                                  
        "chapters": 3,
        "summary": "一个普通的大学生，意外获得了上古修真系统的知识。他被家族重视，但是在家族的安排下，他的人生似乎没有什么意义。他想知道，是否有什么办法可以改变自己的命运？",
        "style": "爽文",
        "words": 1000
    }
    generate_novel_outline(config,"./output/outline.json")  
