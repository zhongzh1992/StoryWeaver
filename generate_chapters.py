import json
import os
from utils.prompt import CHAPTER_EXTEND_PROMPT_TEMPLATE
from utils.models import call_llm   
import copy

def load_novel_outline(file_path):
    """
    加载小说大纲
    :param file_path: 大纲文件路径
    :return: 大纲数据
    """
    with open(file_path, "r", encoding="utf-8") as f:
        data = json.load(f)
    # outline_data = json.loads(data.get("choices")[0]['message']['content'] ) 
    # with open("novel_outline.json", "w", encoding="utf-8") as f:
    #     json.dump(outline_data, f, ensure_ascii=False, indent=4) 
    # return outline_data
    return data

def generate_chapters_from_outline(outline_data, save_path):
    """
    根据大纲扩展小说的各个章节，并分章节保存为md文件
    :param outline_data: 小说大纲数据
    :param save_path: 章节保存路径
    """
    # 创建保存路径
    if not os.path.exists(save_path):
        os.makedirs(save_path)

    outline_content = ''
    outline_content += f"title: {outline_data.get('title')}\n"
    for index, chapter in enumerate(outline_data['chapters']):
        outline_content+= f"chapter {index+1}: {chapter.get('title')}, summary: {chapter.get('summary')}\n"
    
    
    # 假设大纲数据中有章节列表，实际需根据生成的大纲结构调整
    if "chapters" in outline_data:
        chapters = outline_data["chapters"]
        for index, chapter in enumerate(chapters, start=0):
            # 生成章节扩展提示词
            prompt = CHAPTER_EXTEND_PROMPT_TEMPLATE.format(
                chapter_index=index+1,
                chapter_summary=chapter,
                outline=outline_content
            )
            
            # 调用大模型扩展章节
            chapter_content = call_llm(prompt)
            
            # 保存章节到md文件
            chapter_file_path = os.path.join(save_path, f"chapter_{index}.md")
            with open(chapter_file_path, "w", encoding="utf-8") as f:
                f.write(chapter_content)
    


if __name__ == "__main__":
    outline_data = load_novel_outline("./output/outline.json")
    print(outline_data)
    generate_chapters_from_outline(outline_data, "./output/chapters")
