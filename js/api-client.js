// API客户端类
class NanoBananaClient {
    constructor() {
        this.config = {
            createTask: 'https://api.kie.ai/api/v1/jobs/createTask',
            queryTask: 'https://api.kie.ai/api/v1/jobs/recordInfo',
            model: 'nano-banana-pro',
            aspectRatio: '2:3',  // 竖版A4比例
            resolution: '4K',    // 高清画质
            format: 'png'        // 图片格式
        };

        this.pollingInterval = 3000; // 轮询间隔3秒
        this.maxPollingTime = 300000; // 最大轮询时间5分钟
    }

    // 设置API密钥
    setApiKey(apiKey) {
        this.apiKey = apiKey;
    }

    // 创建生成任务
    async createTask(prompt) {
        try {
            console.log('发送API请求到:', this.config.createTask);
            console.log('使用模型:', this.config.model);

            const response = await fetch(this.config.createTask, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${this.apiKey}`
                },
                body: JSON.stringify({
                    model: this.config.model,
                    input: {
                        prompt: prompt,
                        image_input: [],
                        aspect_ratio: this.config.aspectRatio,
                        resolution: this.config.resolution,
                        output_format: this.config.format
                    }
                })
            });

            console.log('API响应状态:', response.status);

            const data = await response.json();
            console.log('API响应数据:', data);

            if (response.ok && data.code === 200) {
                return {
                    success: true,
                    taskId: data.data.taskId
                };
            } else {
                // 处理不同的错误情况
                let errorMsg = data.msg || '创建任务失败';

                if (response.status === 401) {
                    errorMsg = 'API密钥无效或已过期';
                } else if (response.status === 403) {
                    errorMsg = 'API访问被拒绝，请检查权限';
                } else if (response.status === 429) {
                    errorMsg = 'API调用频率限制，请稍后重试';
                } else if (response.status >= 500) {
                    errorMsg = '服务器内部错误，请稍后重试';
                } else if (data.msg && data.msg.includes('获取可用模型失败')) {
                    errorMsg = 'API服务暂时不可用，请稍后重试';
                }

                throw new Error(errorMsg);
            }
        } catch (error) {
            console.error('创建任务失败:', error);

            // 处理网络错误
            if (error.name === 'TypeError' && error.message.includes('fetch')) {
                return {
                    success: false,
                    error: '网络连接失败，请检查网络连接'
                };
            }

            return {
                success: false,
                error: error.message || '网络错误，请检查连接'
            };
        }
    }

    // 查询任务状态
    async queryTask(taskId) {
        try {
            const response = await fetch(`${this.config.queryTask}?taskId=${taskId}`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${this.apiKey}`
                }
            });

            const data = await response.json();

            if (response.ok && data.code === 200) {
                return {
                    success: true,
                    data: data.data
                };
            } else {
                throw new Error(data.msg || '查询任务失败');
            }
        } catch (error) {
            console.error('查询任务失败:', error);
            return {
                success: false,
                error: error.message || '网络错误，请检查连接'
            };
        }
    }

    // 轮询任务状态直到完成
    async pollTask(taskId, onProgress, onComplete, onError) {
        const startTime = Date.now();

        const poll = async () => {
            const elapsed = Date.now() - startTime;

            // 检查是否超时
            if (elapsed > this.maxPollingTime) {
                onError('任务超时，请重试');
                return;
            }

            const result = await this.queryTask(taskId);

            if (!result.success) {
                onError(result.error);
                return;
            }

            const taskData = result.data;

            // 更新进度
            if (onProgress) {
                onProgress(taskData.state, taskData);
            }

            // 检查任务状态
            console.log('任务状态:', taskData.state, taskData);

            switch (taskData.state) {
                case 'success':
                    if (taskData.resultJson) {
                        try {
                            console.log('原始结果JSON:', taskData.resultJson);
                            const resultData = JSON.parse(taskData.resultJson);
                            console.log('解析后的结果:', resultData);

                            if (resultData.resultUrls && resultData.resultUrls.length > 0) {
                                onComplete(resultData.resultUrls[0]);
                            } else {
                                console.error('结果中未找到图片URL');
                                onError('结果中未找到图片URL');
                            }
                        } catch (e) {
                            console.error('解析结果失败:', e);
                            onError('解析结果失败: ' + e.message);
                        }
                    } else {
                        console.error('未找到生成结果');
                        onError('未找到生成结果');
                    }
                    break;

                case 'fail':
                    console.error('任务失败:', taskData.failMsg);
                    onError(taskData.failMsg || '生成失败');
                    break;

                case 'waiting':
                    // 继续轮询
                    setTimeout(poll, this.pollingInterval);
                    break;

                case 'running':
                    // 任务正在运行，继续轮询
                    setTimeout(poll, this.pollingInterval);
                    break;

                case 'pending':
                    // 任务等待中，继续轮询
                    setTimeout(poll, this.pollingInterval);
                    break;

                default:
                    // 未知状态，继续轮询
                    console.log('未知状态:', taskData.state);
                    setTimeout(poll, this.pollingInterval);
                    break;
            }
        };

        // 开始轮询
        poll();
    }

    // 下载图片
    async downloadImage(imageUrl, filename) {
        try {
            // 创建下载链接
            const link = document.createElement('a');
            link.href = imageUrl;
            link.download = filename || `识字小报_${new Date().getTime()}.png`;

            // 添加到页面并触发点击
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            return { success: true };
        } catch (error) {
            console.error('下载图片失败:', error);
            return {
                success: false,
                error: '下载失败，请右键图片另存为'
            };
        }
    }

    // 生成文件名
    generateFilename(theme, title) {
        // 清理文件名中的特殊字符
        const cleanTitle = title.replace(/[《》]/g, '').trim();
        const cleanTheme = theme.trim();

        // 组合文件名
        const filename = `${cleanTheme}_${cleanTitle}_${new Date().getTime()}.png`;

        // 限制长度
        return filename.length > 100 ? filename.substring(0, 100) + '.png' : filename;
    }

    // 验证API密钥格式
    validateApiKey(apiKey) {
        if (!apiKey || typeof apiKey !== 'string') {
            return false;
        }

        // 简单验证：长度应该大于20
        return apiKey.trim().length > 20;
    }

    // 保存API密钥到本地存储
    saveApiKeyToStorage(apiKey) {
        try {
            localStorage.setItem('nano_banana_api_key', apiKey);
            return true;
        } catch (e) {
            console.error('保存API密钥失败:', e);
            return false;
        }
    }

    // 从本地存储获取API密钥
    getApiKeyFromStorage() {
        try {
            return localStorage.getItem('nano_banana_api_key');
        } catch (e) {
            console.error('获取API密钥失败:', e);
            return null;
        }
    }

    // 清除本地存储的API密钥
    clearApiKeyFromStorage() {
        try {
            localStorage.removeItem('nano_banana_api_key');
            return true;
        } catch (e) {
            console.error('清除API密钥失败:', e);
            return false;
        }
    }

    // 保存生成历史到本地存储
    saveToHistory(theme, title, imageUrl) {
        try {
            const history = JSON.parse(localStorage.getItem('generation_history') || '[]');

            // 添加新的历史记录
            history.unshift({
                theme: theme,
                title: title,
                imageUrl: imageUrl,
                timestamp: new Date().toISOString()
            });

            // 限制历史记录数量（最多保存20条）
            if (history.length > 20) {
                history.splice(20);
            }

            localStorage.setItem('generation_history', JSON.stringify(history));
            return true;
        } catch (e) {
            console.error('保存历史记录失败:', e);
            return false;
        }
    }

    // 获取生成历史
    getHistory() {
        try {
            return JSON.parse(localStorage.getItem('generation_history') || '[]');
        } catch (e) {
            console.error('获取历史记录失败:', e);
            return [];
        }
    }

    // 清除生成历史
    clearHistory() {
        try {
            localStorage.removeItem('generation_history');
            return true;
        } catch (e) {
            console.error('清除历史记录失败:', e);
            return false;
        }
    }
}

// 暴露到全局作用域
window.NanoBananaClient = NanoBananaClient;