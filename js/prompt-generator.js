// 提示词生成器类
class PromptGenerator {
    constructor() {
        this.template = `请生成一张儿童识字小报《{{主题}}》，竖版 A4，学习小报版式，适合 5–9 岁孩子 认字与看图识物。

# 一、小报标题区（顶部）

**顶部居中大标题**：《{{标题}}》
* **风格**：十字小报 / 儿童学习报感
* **文本要求**：大字、醒目、卡通手写体、彩色描边
* **装饰**：周围添加与{{主题}}相关的贴纸风装饰，颜色鲜艳

# 二、小报主体（中间主画面）

画面中心是一幅 **卡通插画风的「{{主题}}」场景**：
* **整体气氛**：明亮、温暖、积极
* **构图**：物体边界清晰，方便对应文字，不要过于拥挤。

**场景分区与核心内容**
1.  **核心区域 A（主要对象）**：表现{{主题}}的核心活动。
2.  **核心区域 B（配套设施）**：展示相关的工具或物品。
3.  **核心区域 C（环境背景）**：体现环境特征（如墙面、指示牌等）。

**主题人物**
* **角色**：1 位可爱卡通人物（职业/身份：与{{主题}}匹配）。
* **动作**：正在进行与场景相关的自然互动。

# 三、必画物体与识字清单（Generated Content）

**请务必在画面中清晰绘制以下物体，并为其预留贴标签的位置：**

**1. 核心角色与设施：**
{{核心词汇}}

**2. 常见物品/工具：**
{{物品词汇}}

**3. 环境与装饰：**
{{环境词汇}}

*(注意：画面中的物体数量不限于此，但以上列表必须作为重点描绘对象)*

# 四、识字标注规则

对上述清单中的物体，贴上中文识字标签：
* **格式**：两行制（第一行拼音带声调，第二行简体汉字）。
* **样式**：彩色小贴纸风格，白底黑字或深色字，清晰可读。
* **排版**：标签靠近对应的物体，不遮挡主体。

# 五、画风参数
* **风格**：儿童绘本风 + 识字小报风
* **色彩**：高饱和、明快、温暖 (High Saturation, Warm Tone)
* **质量**：8k resolution, high detail, vector illustration style, clean lines.`;
    }

    // 生成完整提示词
    generatePrompt(theme, title, customWords = null) {
        // 获取主题相关词汇
        const words = this.getThemeWords(theme, customWords);

        if (!words) {
            console.error(`未找到主题"${theme}"的词汇`);
            return null;
        }

        // 处理词汇列表
        const coreWords = this.formatWords(words.core || []);
        const itemWords = this.formatWords(words.items || []);
        const envWords = this.formatWords(words.env || []);

        // 替换模板中的占位符
        let prompt = this.template
            .replace(/\{\{主题\}\}/g, theme)
            .replace(/\{\{标题\}\}/g, title)
            .replace(/\{\{核心词汇\}\}/g, coreWords)
            .replace(/\{\{物品词汇\}\}/g, itemWords)
            .replace(/\{\{环境词汇\}\}/g, envWords);

        // 清理多余的空行和格式
        prompt = this.cleanPrompt(prompt);

        // 检查长度
        if (prompt.length > 10000) {
            console.warn('提示词长度超过10000字符，尝试精简');
            prompt = this.shortenPrompt(prompt);
        }

        return prompt;
    }

    // 获取主题相关词汇
    getThemeWords(theme, customWords = null) {
        try {
            // 如果有自定义词汇，优先使用自定义词汇
            if (customWords) {
                return customWords;
            }

            // 检查WORD_BANK是否存在
            if (typeof WORD_BANK === 'undefined') {
                console.error('WORD_BANK未定义，请确保word-bank.js已正确加载');
                console.log('使用默认词汇库...');
                // 提供一个基础的词汇库作为fallback
                return this.generateFallbackWords(theme);
            }

            if (WORD_BANK && WORD_BANK[theme]) {
                return WORD_BANK[theme];
            }

            // 如果没有找到对应主题，也使用fallback
            console.log(`未找到主题"${theme}"的词汇，使用默认词汇...`);
            return this.generateFallbackWords(theme);
        } catch (error) {
            console.error('获取主题词汇时出错:', error);
            return this.generateFallbackWords(theme);
        }
    }

    // 解析自定义词汇
    parseCustomWords(coreText, itemText, envText) {
        const parseWords = (text) => {
            if (!text || !text.trim()) {
                return [];
            }
            // 按行分割，过滤空行
            const lines = text.trim().split('\n').filter(line => line.trim());
            return lines;
        };

        return {
            core: parseWords(coreText),
            items: parseWords(itemText),
            env: parseWords(envText)
        };
    }

    // 生成fallback词汇（当WORD_BANK未加载或主题不存在时使用）
    generateFallbackWords(theme) {
        return {
            core: [
                `${theme} ${theme}`,
                'zhǔ tǐ 主体',
                'běn shēn 本身',
                'hé xīn 核心'
            ],
            items: [
                'wù pǐn 物品',
                'gōng jù 工具',
                'shè bèi 设备',
                'qì tā 其他'
            ],
            env: [
                'huán jìng 环境',
                'bèi jǐng 背景',
                'zhuāng shì 装饰',
                'wèi zhì 位置'
            ]
        };
    }

    // 格式化词汇列表
    formatWords(words) {
        if (!words || words.length === 0) {
            return '暂无词汇';
        }

        // 每行显示3-4个词汇，保持美观
        const formatted = [];
        for (let i = 0; i < words.length; i += 3) {
            const chunk = words.slice(i, i + 3);
            formatted.push(chunk.join('，'));
        }
        return formatted.join('，\n');
    }

    // 清理提示词格式
    cleanPrompt(prompt) {
        // 移除多余的空行
        prompt = prompt.replace(/\n{3,}/g, '\n\n');
        // 移除行尾空格
        prompt = prompt.replace(/[ \t]+$/gm, '');
        return prompt.trim();
    }

    // 精简提示词
    shortenPrompt(prompt) {
        // 保留核心部分，精简描述
        const sections = prompt.split('\n# ');
        const essentialSections = [];

        sections.forEach(section => {
            const title = section.split('\n')[0];
            // 保留标题、核心内容、词汇清单、标注规则和画风
            if (title.includes('小报标题区') ||
                title.includes('小报主体') ||
                title.includes('必画物体与识字清单') ||
                title.includes('识字标注规则') ||
                title.includes('画风参数')) {
                essentialSections.push('# ' + section);
            }
        });

        return essentialSections.join('\n\n');
    }

    // 验证主题和标题
    validateInput(theme, title) {
        const errors = [];

        if (!theme || theme.trim().length === 0) {
            errors.push('请输入主题');
        } else if (theme.length > 10) {
            errors.push('主题名称不能超过10个字符');
        }

        if (!title || title.trim().length === 0) {
            errors.push('请输入标题');
        } else if (title.length > 20) {
            errors.push('标题不能超过20个字符');
        }

        return {
            isValid: errors.length === 0,
            errors: errors
        };
    }

    // 获取所有可用的主题列表
    getAllThemes() {
        try {
            // 检查THEME_CATEGORIES是否存在
            if (typeof THEME_CATEGORIES === 'undefined') {
                console.error('THEME_CATEGORIES未定义，请确保word-bank.js已正确加载');
                return [];
            }

            const themes = [];
            for (let category in THEME_CATEGORIES) {
                const categoryThemes = Object.keys(THEME_CATEGORIES[category].themes);
                themes.push(...categoryThemes);
            }
            return themes;
        } catch (error) {
            console.error('获取主题列表时出错:', error);
            return [];
        }
    }

    // 获取主题的分类
    getThemeCategory(theme) {
        try {
            // 检查THEME_CATEGORIES是否存在
            if (typeof THEME_CATEGORIES === 'undefined') {
                console.error('THEME_CATEGORIES未定义，请确保word-bank.js已正确加载');
                return null;
            }

            for (let category in THEME_CATEGORIES) {
                if (THEME_CATEGORIES[category].themes[theme]) {
                    return category;
                }
            }
            return null;
        } catch (error) {
            console.error('获取主题分类时出错:', error);
            return null;
        }
    }

    // 检查是否为预制主题
    isPresetTheme(theme) {
        return this.getAllThemes().includes(theme);
    }

    // 为自定义主题生成基础词汇
    generateCustomWords(theme) {
        // 这是一个简化的实现，实际应用中可以更智能
        const commonWords = {
            core: ['zhǔ tǐ 主体', 'běn shēn 本身', 'zhōng xīn 中心'],
            items: ['wù pǐn 物品', 'gōng jù 工具', 'shè bèi 设备'],
            env: ['huán jìng 环境', 'bèi jǐng 背景', 'zhuāng shì 装饰']
        };

        // 尝试根据主题名称生成一些相关词汇
        const customWords = { ...commonWords };

        // 添加主题相关词汇
        customWords.core.unshift(`${theme} ${theme}`);

        return customWords;
    }
}

// 暴露到全局作用域
window.PromptGenerator = PromptGenerator;