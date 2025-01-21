// 当前图片URL
let currentImageUrl = '';

// 选择情绪标签
function selectEmotion(emotion) {
    document.getElementById('userInput').value = emotion;
}

// 下载图片
function downloadImage() {
    if (!currentImageUrl) {
        alert('请先生成表情包！');
        return;
    }

    // 创建一个临时的a标签
    const link = document.createElement('a');
    link.href = currentImageUrl;
    
    // 从URL中获取文件名
    const fileName = `表情包_${document.getElementById('userInput').value || '未命名'}.png`;
    
    // 设置下载文件名
    link.setAttribute('download', fileName);
    
    // 设置打开方式
    link.setAttribute('target', '_blank');
    
    // 模拟点击下载
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

async function sendMessage() {
    const userInput = document.getElementById('userInput').value;
    const responseDiv = document.getElementById('response');
    const imageContainer = document.getElementById('imageContainer');
    const loadingDiv = document.getElementById('loading');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (!userInput.trim()) {
        alert('请输入关键词！');
        return;
    }

    // 显示加载提示，清空之前的内容
    loadingDiv.style.display = 'block';
    imageContainer.innerHTML = '';
    responseDiv.textContent = '';
    downloadBtn.disabled = true;
    currentImageUrl = '';

    const requestData = {
        bot_id: config.BOT_ID,
        user_id: "123456789",
        stream: true,
        auto_save_history: true,
        additional_messages: [
            {
                role: "user",
                content: userInput,
                content_type: "text"
            }
        ]
    };

    try {
        const response = await fetch('https://api.coze.cn/v3/chat', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${config.API_KEY}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // 获取响应的可读流
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        
        let buffer = ''; // 用于存储不完整的数据

        // 循环读取流数据
        while (true) {
            const { done, value } = await reader.read();
            
            if (done) {
                break;
            }
            
            // 将接收到的数据解码并添加到缓冲区
            buffer += decoder.decode(value, { stream: true });
            
            // 处理缓冲区中的完整事件
            const lines = buffer.split('\n');
            buffer = ''; // 清空缓冲区

            for (const line of lines) {
                if (line.trim() === '') continue;
                
                // 解析事件行
                if (line.startsWith('data:')) {
                    try {
                        const eventData = line.slice(5); // 移除 'data:' 前缀
                        if (eventData.trim() === '[DONE]') {
                            loadingDiv.style.display = 'none';
                            if (currentImageUrl) {
                                downloadBtn.disabled = false;
                            }
                            continue;
                        }
                        
                        const jsonData = JSON.parse(eventData);
                        
                        // 检查是否是answer类型的消息，且内容是URL
                        if (jsonData.type === 'answer' && jsonData.content) {
                            const url = jsonData.content.trim();
                            if (url.startsWith('http') && (url.endsWith('.jpg') || url.endsWith('.png') || url.endsWith('.gif') || url.includes('coze.cn'))) {
                                // 保存当前图片URL并更新下载按钮状态
                                currentImageUrl = url;
                                downloadBtn.disabled = false;
                                
                                // 创建图片元素
                                const img = document.createElement('img');
                                img.src = url;
                                img.alt = "生成的表情包";
                                img.title = "点击下方按钮下载";
                                
                                // 清空并添加新图片
                                imageContainer.innerHTML = '';
                                imageContainer.appendChild(img);
                            }
                        }
                    } catch (e) {
                        console.error('解析事件数据时出错:', e);
                        continue;
                    }
                }
            }
        }

    } catch (error) {
        console.error('Error:', error);
        loadingDiv.style.display = 'none';
        responseDiv.textContent = `发生错误: ${error.message}`;
        downloadBtn.disabled = true;
    }
}
