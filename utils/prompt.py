# 小说大纲生成提示词
OUTLINE_PROMPT = """
请你担任一名专业的小说作者，我需要你根据我提供的信息，来为我写一个小说大纲。
小说标题是：{title}
小说类型是：{type}
小说背景是：{background}
小说主角是：{roles}
小说概要是：{summary}
小说风格是：{style}
小说字数是：{words}
请帮我构思一个合理的大纲，总共划分{chapters}个章节。
请以JSON格式输出(无需'''json''')，包含以下字段：
{{
  "title": "小说标题",
  "chapters": [
    {{
      "title": "章节标题",
      "summary": "章节摘要"
    }}
    ...
  ]
}}

"""

# 小说扩展提示词模板
CHAPTER_EXTEND_PROMPT_TEMPLATE = """
根据以下小说大纲，扩展第 {chapter_index} 章。
#章节概要：
{chapter_summary}
#扩展规则：
1.直接输出小说章节内容,不要输出其他内容。
2.上下文逻辑一致，避免重复啰嗦。
#小说大纲：
{outline}\n
"""