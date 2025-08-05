import requests

url = "https://api.siliconflow.cn/v1/chat/completions"
model = "Qwen/QwQ-32B"

def call_llm(prompt):
    payload = {
        "model": model,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ]
    }
    headers = {
        "Authorization": "Bearer sk-ofnojwfcqirgzpjakneprsymnuizuxrmmayyafoosfawcwkt",
        "Content-Type": "application/json"
    }
    print(payload)
    response = requests.request("POST", url, json=payload, headers=headers)
    print(response.text)
    response = response.json()
    answer = response.get("choices")[0]['message']['content']
    return answer

if __name__ == "__main__":
    prompt = "你好"
    ans = call_llm(prompt)
    print(ans)