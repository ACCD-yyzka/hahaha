# 解决上级目录导入问题
import sys
from pathlib import Path
sys.path.append(str(Path(__file__).parent.parent))

# 导入配置
from config import LLM_BASE_URL, LLM_MODEL_NAME, LLM_API_KEY

from openai import OpenAI  # 本地大模型通用兼容接口

class LLMService:
    def __init__(self):
        # 从配置文件读取模型地址 + 模型名
        self.base_url = LLM_BASE_URL
        self.model_name = LLM_MODEL_NAME
        
        # 初始化本地大模型客户端
        self.client = OpenAI(
            base_url=self.base_url,
            api_key=LLM_API_KEY  # 本地模型随便填
        )

    def get_reply(self, question):
        # 调用本地 Qwen3.5 模型
        try:
            response = self.client.chat.completions.create(
                model=self.model_name,
                messages=[
                    {"role": "user", "content": question}
                ],
                temperature=0.7  # 温度参数，越高越随机
            )

            # 返回模型真正的回答
            return str(response.choices[0].message.content)

        except Exception as e:
            return f"模型调用失败：{str(e)}"