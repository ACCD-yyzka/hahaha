# EduAgentHub
## 如何运行项目

### 1.激活conda环境
```bash
conda activate ai
```
### 2.安装依赖
```bash
pip install -r requirements.txt
```
### 3.进入到backend
```bash
cd backend
```
### 4.运行指令
```bash
uvicorn main:app --reload --port 8000
```
### 5.浏览器访问
```bash
http:/127.0.0.1:8000
```
## 我给ai发消息,ai 不回我
### 1.检查lm studio的后端服务是否打开
记得要看下lmstudio中的ip地址是不是正确的，还有那个 “v1”不要忘记
```bash
#  这是王婧琦的配置，其他人请勿乱动！
LLM_BASE_URL = "http://169.254.138.246:1234/v1" # v1不要漏了
LLM_MODEL_NAME = "qwen3.5-0.8b"  #名字自己去lm studio复制
LLM_API_KEY = "dummy"
```

### 2.修改backend/config.py中的模型接口配置
不要随别动别人的配置，尽可以注释别人的注释

### 3.我电脑上部署的模型，其他人能访问吗？

不可以，除非你使用内网穿透（我用的是cpolar）
