// 主应用类
class ChildPictureApp {
    constructor() {
        // 初始化各个模块
        this.promptGenerator = new PromptGenerator();
        this.apiClient = new NanoBananaClient();

        // 应用状态
        this.currentCategory = 'daily';
        this.currentTheme = '';
        this.currentTitle = '';
        this.isGenerating = false;

        // DOM元素
        this.elements = {};

        // 初始化应用
        this.init();
    }

    // 初始化
    init() {
        // 获取DOM元素
        this.getElements();

        // 绑定事件
        this.bindEvents();

        // 加载保存的API密钥
        this.loadSavedApiKey();

        // 加载历史记录
        this.loadHistory();

        // 加载主题数据
        this.loadThemes();
    }

    // 加载主题数据
    async loadThemes() {
        try {
            // 显示加载状态
            this.showMessage('正在加载主题数据...', 'info');

            // 加载主题
            await window.themeLoader.loadThemes();

            // 渲染初始主题卡片
            this.renderThemeCards(this.currentCategory);

            // 默认选择第一个主题
            this.selectDefaultTheme();

            this.showMessage('', '');
        } catch (error) {
            console.error('加载主题失败:', error);
            this.showMessage('加载主题数据失败，请刷新页面重试', 'error');
        }
    }

    // 获取DOM元素
    getElements() {
        this.elements = {
            // 分类标签
            categoryTabs: document.querySelectorAll('.tab-btn'),

            // 主题相关
            themeCards: document.getElementById('themeCards'),
            titleSelect: document.getElementById('titleSelect'),
            customTheme: document.getElementById('customTheme'),
            customTitle: document.getElementById('customTitle'),

            // 自定义词汇
            customCoreWords: document.getElementById('customCoreWords'),
            customItemWords: document.getElementById('customItemWords'),
            customEnvWords: document.getElementById('customEnvWords'),
            clearCustomWords: document.getElementById('clearCustomWords'),

            // API相关
            apiKey: document.getElementById('apiKey'),
            toggleApiKey: document.getElementById('toggleApiKey'),
            testApiBtn: document.getElementById('testApiBtn'),
            saveApiKey: document.getElementById('saveApiKey'),
            apiStatus: document.getElementById('apiStatus'),

            // 生成控制
            generateBtn: document.getElementById('generateBtn'),
            progressContainer: document.getElementById('progressContainer'),
            progressFill: document.getElementById('progressFill'),
            progressText: document.getElementById('progressText'),
            progressDetail: document.getElementById('progressDetail'),
            statusMessage: document.getElementById('statusMessage'),

            // 结果展示
            previewContainer: document.getElementById('previewContainer'),
            previewPlaceholder: document.querySelector('.preview-placeholder'),
            resultContainer: document.getElementById('resultContainer'),
            resultImage: document.getElementById('resultImage'),
            downloadBtn: document.getElementById('downloadBtn'),
            newTabBtn: document.getElementById('newTabBtn'),

            // 历史记录
            historySection: document.getElementById('historySection'),
            historyList: document.getElementById('historyList')
        };
    }

    // 绑定事件
    bindEvents() {
        // 分类标签切换
        this.elements.categoryTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const category = e.target.dataset.category;
                this.switchCategory(category);
            });
        });

        // 标题选择
        this.elements.titleSelect.addEventListener('change', (e) => {
            this.currentTitle = e.target.value;
            this.clearCustomInput();
        });

        // 自定义输入
        this.elements.customTheme.addEventListener('input', (e) => {
            this.currentTheme = e.target.value;
            if (e.target.value) {
                this.elements.titleSelect.value = '';
                this.clearThemeSelection();
            }
        });

        this.elements.customTitle.addEventListener('input', (e) => {
            this.currentTitle = e.target.value;
        });

        // API密钥显示/隐藏
        this.elements.toggleApiKey.addEventListener('click', () => {
            this.toggleApiKeyVisibility();
        });

        // API密钥测试
        this.elements.testApiBtn.addEventListener('click', () => {
            this.testApiKey();
        });

        // API密钥保存
        this.elements.saveApiKey.addEventListener('change', (e) => {
            if (e.target.checked) {
                this.saveApiKey();
            } else {
                this.clearSavedApiKey();
            }
        });

        // 生成按钮
        this.elements.generateBtn.addEventListener('click', () => {
            this.generatePicture();
        });

        // 下载按钮
        this.elements.downloadBtn.addEventListener('click', () => {
            this.downloadPicture();
        });

        // 新标签查看按钮
        this.elements.newTabBtn.addEventListener('click', () => {
            this.openInNewTab();
        });

        // 清空自定义词汇按钮
        this.elements.clearCustomWords.addEventListener('click', () => {
            this.clearCustomWords();
        });
    }

    // 切换分类
    switchCategory(category) {
        // 更新标签状态
        this.elements.categoryTabs.forEach(tab => {
            tab.classList.remove('active');
            if (tab.dataset.category === category) {
                tab.classList.add('active');
            }
        });

        // 更新当前分类
        this.currentCategory = category;

        // 渲染主题卡片
        this.renderThemeCards(category);

        // 清空选择
        this.clearSelection();
    }

    // 渲染主题卡片
    renderThemeCards(category) {
        if (!window.themeLoader.loaded) {
            console.error('主题数据尚未加载');
            return;
        }

        const themes = window.themeLoader.getThemesInCategory(category);
        this.elements.themeCards.innerHTML = '';

        themes.forEach(themeKey => {
            const themeInfo = window.themeLoader.getThemeInfo(category, themeKey);
            const card = document.createElement('div');
            card.className = 'theme-card';
            card.dataset.theme = themeKey;
            card.innerHTML = `
                <div class="icon">${themeInfo.icon}</div>
                <div class="name">${themeKey}</div>
            `;

            card.addEventListener('click', () => {
                this.selectTheme(themeKey);
            });

            this.elements.themeCards.appendChild(card);
        });
    }

    // 选择主题
    selectTheme(theme) {
        console.log('选择主题:', theme);

        // 清除自定义输入
        this.clearCustomInput();

        // 更新选中状态
        document.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('selected');
        });

        const selectedCard = document.querySelector(`[data-theme="${theme}"]`);
        if (selectedCard) {
            selectedCard.classList.add('selected');
        }

        // 更新当前主题
        this.currentTheme = theme;

        // 加载标题选项
        this.loadTitleOptions(theme);

        // 选择第一个标题
        const titles = window.themeLoader.getThemeTitles(this.currentCategory, theme);
        console.log('主题标题列表:', titles);

        if (titles && titles.length > 0) {
            this.elements.titleSelect.value = titles[0];
            this.currentTitle = titles[0];
            console.log('选择的标题:', titles[0]);
        }
    }

    // 加载标题选项
    loadTitleOptions(theme) {
        if (!window.themeLoader || !window.themeLoader.loaded) {
            console.error('主题加载器未就绪');
            return;
        }

        const titles = window.themeLoader.getThemeTitles(this.currentCategory, theme);
        console.log('加载主题标题:', theme, titles);
        console.log('当前分类:', this.currentCategory);

        // 清空现有选项
        this.elements.titleSelect.innerHTML = '';

        // 添加默认选项
        const defaultOption = document.createElement('option');
        defaultOption.value = '';
        defaultOption.textContent = '选择标题';
        this.elements.titleSelect.appendChild(defaultOption);

        // 添加标题选项
        if (titles && titles.length > 0) {
            titles.forEach(title => {
                const option = document.createElement('option');
                option.value = title;
                option.textContent = title;
                this.elements.titleSelect.appendChild(option);
            });
            console.log(`成功加载 ${titles.length} 个标题`);
        } else {
            console.warn('没有找到标题');
        }

        // 检查select元素
        console.log('标题选择框选项数量:', this.elements.titleSelect.options.length);
    }

    // 清除选择
    clearSelection() {
        this.currentTheme = '';
        this.currentTitle = '';
        this.elements.titleSelect.innerHTML = '<option value="">请先选择主题</option>';
        this.clearThemeSelection();
        this.clearCustomInput();
    }

    // 清除主题选择状态
    clearThemeSelection() {
        document.querySelectorAll('.theme-card').forEach(card => {
            card.classList.remove('selected');
        });
    }

    // 清除自定义输入
    clearCustomInput() {
        this.elements.customTheme.value = '';
        this.elements.customTitle.value = '';
    }

    // 切换API密钥可见性
    toggleApiKeyVisibility() {
        const input = this.elements.apiKey;
        const button = this.elements.toggleApiKey;

        if (input.type === 'password') {
            input.type = 'text';
            button.textContent = '👁️‍🗨️';
        } else {
            input.type = 'password';
            button.textContent = '👁️';
        }
    }

    // 加载保存的API密钥
    loadSavedApiKey() {
        const savedKey = this.apiClient.getApiKeyFromStorage();
        if (savedKey) {
            this.elements.apiKey.value = savedKey;
            this.elements.saveApiKey.checked = true;
            this.apiClient.setApiKey(savedKey);
        }
    }

    // 默认选择第一个主题
    selectDefaultTheme() {
        if (!window.themeLoader || !window.themeLoader.loaded) {
            // 如果主题还没加载完，等待加载完成后再选择
            console.log('等待主题加载完成...');

            // 设置一个监听器
            if (window.themeLoader) {
                const originalLoadThemes = window.themeLoader.loadThemes;
                window.themeLoader.loadThemes = async function() {
                    await originalLoadThemes.call(this);
                    // 加载完成后触发主题选择
                    setTimeout(() => {
                        if (window.app) {
                            window.app.selectDefaultTheme();
                        }
                    }, 100);
                };
            }
            return;
        }

        const themes = window.themeLoader.getThemesInCategory(this.currentCategory);
        console.log(`默认主题选择 - 分类: ${this.currentCategory}, 主题:`, themes);

        if (themes.length > 0) {
            // 延迟一下确保DOM已更新
            setTimeout(() => {
                const themeCards = document.querySelectorAll('.theme-card');
                if (themeCards.length > 0) {
                    console.log('触发第一个主题选择');
                    themeCards[0].click();
                } else {
                    console.log('主题卡片未找到，手动选择主题');
                    this.selectTheme(themes[0]);
                }
            }, 200);
        }
    }

    // 测试API密钥
    async testApiKey() {
        const apiKey = this.elements.apiKey.value.trim();

        if (!apiKey) {
            this.elements.apiStatus.textContent = '请输入API密钥';
            this.elements.apiStatus.className = 'api-status error';
            return;
        }

        if (!this.apiClient.validateApiKey(apiKey)) {
            this.elements.apiStatus.textContent = 'API密钥格式不正确';
            this.elements.apiStatus.className = 'api-status error';
            return;
        }

        // 显示测试中状态
        this.elements.testApiBtn.disabled = true;
        this.elements.testApiBtn.textContent = '测试中...';
        this.elements.apiStatus.textContent = '测试中...';

        // 设置API密钥并创建一个简单的测试任务
        this.apiClient.setApiKey(apiKey);

        try {
            const testPrompt = 'Test prompt for API key validation';
            const taskResult = await this.apiClient.createTask(testPrompt);

            // 恢复按钮状态
            this.elements.testApiBtn.disabled = false;
            this.elements.testApiBtn.textContent = '测试';

            if (taskResult.success) {
                this.elements.apiStatus.textContent = '✓ API密钥可用';
                this.elements.apiStatus.className = 'api-status success';
            } else {
                // 提供更详细的错误信息
                let errorMsg = '✗ API密钥无效';
                if (taskResult.error) {
                    if (taskResult.error.includes('获取可用模型失败')) {
                        errorMsg = '✗ API端点错误：无法获取模型';
                    } else if (taskResult.error.includes('401') || taskResult.error.includes('403')) {
                        errorMsg = '✗ API密钥无效或已过期';
                    } else if (taskResult.error.includes('网络')) {
                        errorMsg = '✗ 网络连接错误';
                    } else {
                        errorMsg = `✗ ${taskResult.error}`;
                    }
                }
                this.elements.apiStatus.textContent = errorMsg;
                this.elements.apiStatus.className = 'api-status error';
            }
        } catch (error) {
            // 恢复按钮状态
            this.elements.testApiBtn.disabled = false;
            this.elements.testApiBtn.textContent = '测试';

            console.error('API测试异常:', error);
            this.elements.apiStatus.textContent = '✗ 测试失败：' + error.message;
            this.elements.apiStatus.className = 'api-status error';
        }
    }

    // 保存API密钥
    saveApiKey() {
        const apiKey = this.elements.apiKey.value.trim();
        if (apiKey && this.apiClient.validateApiKey(apiKey)) {
            this.apiClient.saveApiKeyToStorage(apiKey);
            this.apiClient.setApiKey(apiKey);
            this.showMessage('API密钥已保存', 'success');
        }
    }

    // 清除保存的API密钥
    clearSavedApiKey() {
        this.apiClient.clearApiKeyFromStorage();
        this.showMessage('已清除保存的API密钥', 'info');
    }

    // 生成图片
    async generatePicture() {
        console.log('=== 开始生成图片 ===');

        // 获取输入
        const theme = this.currentTheme || this.elements.customTheme.value.trim();
        const title = this.currentTitle || this.elements.customTitle.value.trim();

        console.log('主题:', theme);
        console.log('标题:', title);

        // 验证输入
        const validation = this.promptGenerator.validateInput(theme, title);
        if (!validation.isValid) {
            console.error('输入验证失败:', validation.errors);
            this.showMessage(validation.errors.join(', '), 'error');
            return;
        }

        // 验证API密钥
        const apiKey = this.elements.apiKey.value.trim();
        if (!apiKey) {
            console.error('API密钥为空');
            this.showMessage('请输入kie.ai的API密钥', 'error');
            return;
        }

        if (!this.apiClient.validateApiKey(apiKey)) {
            console.error('API密钥格式无效');
            this.showMessage('API密钥格式不正确', 'error');
            return;
        }

        console.log('API密钥验证通过');

        // 获取自定义词汇
        const customWords = this.getCustomWords();

        // 设置生成状态
        this.setGeneratingState(true);
        this.showMessage('', '');

        // 生成提示词
        const prompt = this.promptGenerator.generatePrompt(theme, title, customWords);
        console.log('提示词生成完成，长度:', prompt.length);

        if (!prompt) {
            console.error('提示词生成失败');
            this.showMessage('生成提示词失败', 'error');
            this.setGeneratingState(false);
            return;
        }

        // 设置API密钥
        this.apiClient.setApiKey(apiKey);

        // 创建任务
        this.updateProgress(10, '正在创建生成任务...');
        console.log('开始创建任务...');

        try {
            const taskResult = await this.apiClient.createTask(prompt);
            console.log('创建任务响应:', taskResult);

            if (!taskResult.success) {
                console.error('创建任务失败:', taskResult.error);
                this.showMessage(taskResult.error, 'error');
                this.setGeneratingState(false);
                return;
            }

            console.log('任务创建成功，ID:', taskResult.taskId);

            // 开始轮询
            this.updateProgress(20, '任务已创建，开始生成...');
            const startTime = Date.now();

            this.apiClient.pollTask(
                taskResult.taskId,
                // onProgress
                (state, data) => {
                    const elapsed = Date.now() - startTime;
                    const seconds = Math.floor(elapsed / 1000);

                    console.log(`任务状态更新: ${state}, 已用时: ${seconds}秒`);

                    if (state === 'waiting') {
                        // 模拟进度增长，从20%到90%
                        const progress = Math.min(20 + Math.floor((elapsed / 10000) * 70), 90);
                        this.updateProgress(progress, `正在生成中... (${seconds}秒)`);
                    } else if (state === 'running') {
                        // 处理running状态
                        const progress = Math.min(20 + Math.floor((elapsed / 10000) * 70), 90);
                        this.updateProgress(progress, `AI正在绘制... (${seconds}秒)`);
                    }
                },
                // onComplete
                (imageUrl) => {
                    console.log('生成完成，图片URL:', imageUrl);
                    this.updateProgress(100, '生成完成！');
                    this.showResult(imageUrl);
                    this.saveToHistory(theme, title, imageUrl);
                    this.setGeneratingState(false);
                    this.showMessage('生成成功！', 'success');
                },
                // onError
                (error) => {
                    console.error('生成过程出错:', error);
                    this.updateProgress(0, '生成失败');
                    this.showMessage(`生成失败: ${error}`, 'error');
                    this.setGeneratingState(false);
                }
            );
        } catch (error) {
            console.error('创建任务异常:', error);
            this.showMessage(`创建任务失败: ${error.message}`, 'error');
            this.setGeneratingState(false);
        }
    }

    // 设置生成状态
    setGeneratingState(isGenerating) {
        this.isGenerating = isGenerating;
        this.elements.generateBtn.disabled = isGenerating;

        if (isGenerating) {
            this.elements.progressContainer.style.display = 'block';
            this.elements.previewPlaceholder.style.display = 'none';
            this.elements.resultContainer.style.display = 'none';
            this.updateProgress(0, '准备生成...');
        } else {
            this.elements.progressContainer.style.display = 'none';
        }
    }

    // 更新进度
    updateProgress(percent, detail) {
        this.elements.progressFill.style.width = `${percent}%`;
        this.elements.progressText.textContent = `${percent}%`;
        this.elements.progressDetail.textContent = detail;
    }

    // 显示结果
    showResult(imageUrl) {
        console.log('显示图片URL:', imageUrl);

        // 确保URL有效
        if (!imageUrl) {
            console.error('图片URL为空');
            this.showMessage('生成失败：未获取到图片URL', 'error');
            return;
        }

        // 设置图片源
        this.elements.resultImage.onload = () => {
            console.log('图片加载成功');
            // 显示结果容器
            this.elements.previewPlaceholder.style.display = 'none';
            this.elements.resultContainer.style.display = 'block';
        };

        this.elements.resultImage.onerror = () => {
            console.error('图片加载失败');
            this.showMessage('图片加载失败，请重试', 'error');
        };

        this.elements.resultImage.src = imageUrl;
        this.elements.downloadBtn.dataset.url = imageUrl;
        this.elements.newTabBtn.dataset.url = imageUrl;
    }

    // 在新标签中打开图片
    openInNewTab() {
        const imageUrl = this.elements.newTabBtn.dataset.url;
        if (imageUrl) {
            window.open(imageUrl, '_blank');
        }
    }

    // 下载图片
    downloadPicture() {
        const theme = this.currentTheme || this.elements.customTheme.value.trim();
        const title = this.currentTitle || this.elements.customTitle.value.trim();
        const imageUrl = this.elements.downloadBtn.dataset.url;

        if (imageUrl) {
            const filename = this.apiClient.generateFilename(theme, title);
            this.apiClient.downloadImage(imageUrl, filename);
        }
    }

    // 保存到历史记录
    saveToHistory(theme, title, imageUrl) {
        this.apiClient.saveToHistory(theme, title, imageUrl);
        this.loadHistory();
    }

    // 加载历史记录
    loadHistory() {
        const history = this.apiClient.getHistory();

        if (history.length > 0) {
            this.elements.historySection.style.display = 'block';
            this.elements.historyList.innerHTML = '';

            history.forEach((item, index) => {
                const historyItem = document.createElement('div');
                historyItem.className = 'history-item';

                const date = new Date(item.timestamp);
                const dateStr = `${date.getMonth() + 1}/${date.getDate()} ${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}`;

                historyItem.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.title}">
                    <div class="title">${item.title}</div>
                    <div class="date">${dateStr}</div>
                `;

                historyItem.addEventListener('click', () => {
                    this.showResult(item.imageUrl);
                });

                this.elements.historyList.appendChild(historyItem);
            });
        } else {
            this.elements.historySection.style.display = 'none';
        }
    }

    // 显示消息
    showMessage(message, type = 'info') {
        this.elements.statusMessage.textContent = message;
        this.elements.statusMessage.className = `status-message ${type}`;
        this.elements.statusMessage.style.display = message ? 'block' : 'none';
    }

    // 获取自定义词汇
    getCustomWords() {
        const coreText = this.elements.customCoreWords.value.trim();
        const itemText = this.elements.customItemWords.value.trim();
        const envText = this.elements.customEnvWords.value.trim();

        // 如果没有任何自定义词汇，返回null
        if (!coreText && !itemText && !envText) {
            return null;
        }

        // 解析自定义词汇
        return this.promptGenerator.parseCustomWords(coreText, itemText, envText);
    }

    // 清空自定义词汇
    clearCustomWords() {
        this.elements.customCoreWords.value = '';
        this.elements.customItemWords.value = '';
        this.elements.customEnvWords.value = '';
        this.showMessage('已清空自定义词汇', 'info');
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', () => {
    new ChildPictureApp();
});