// 1. 加载页面结构
async function loadChatPage() {
    const container = document.getElementById('chat-container');
    // 加载 pages/chat.html 结构（相对路径，FastAPI 托管后自动生效）
    const res = await fetch('./pages/chat.html');
    const html = await res.text();
    container.innerHTML = html;
    // 2. 绑定事件
    bindEvents();
}

// 2. 绑定发送事件
function bindEvents() {
    const sendBtn = document.getElementById('sendBtn');
    const msgInput = document.getElementById('msgInput');

    // 按钮点击发送
    sendBtn.addEventListener('click', sendMsg);
    // 回车发送
    msgInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMsg();
    });
}

// 3. 发送消息核心逻辑（100% 适配你的结构）
async function sendMsg() {
    const msgInput = document.getElementById('msgInput');
    const msgBox = document.getElementById('msgBox');
    const content = msgInput.value.trim();

    if (!content) return;

    // 显示用户消息
    appendMessage('user', content);
    msgInput.value = '';

    try {
        // ✅ 关键：自动获取当前域名，本地/公网/手机全通
        const apiUrl = `${window.location.origin}/chat`;
        const res = await fetch(apiUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ content: content })
        });

        // 检查响应状态，解决 405/500 等问题
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        // 显示AI回复
        appendMessage('ai', data.reply);
    } catch (err) {
        appendMessage('ai', '请求失败，请检查后端服务是否启动');
        console.error('请求错误:', err);
    }

    // 滚动到底部
    msgBox.scrollTop = msgBox.scrollHeight;
}

// 4. 工具函数：添加消息到聊天框
function appendMessage(type, text) {
    const msgBox = document.getElementById('msgBox');
    const msgDiv = document.createElement('div');
    msgDiv.className = `msg ${type}-msg`;
    msgDiv.textContent = text;
    msgBox.appendChild(msgDiv);
}

// 页面加载完成后初始化
window.onload = loadChatPage;