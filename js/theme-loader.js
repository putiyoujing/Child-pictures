// 主题加载器 - 从themes.json加载主题数据
class ThemeLoader {
    constructor() {
        this.themes = null;
        this.loaded = false;
        this.callbacks = [];
    }

    // 加载主题数据
    async loadThemes() {
        if (this.loaded) {
            return Promise.resolve(this.themes);
        }

        try {
            // 尝试多个可能的路径
            const possiblePaths = [
                'ai-docs/themes.json',
                './ai-docs/themes.json',
                '../ai-docs/themes.json',
                '/ai-docs/themes.json'
            ];

            let response = null;
            for (const path of possiblePaths) {
                try {
                    response = await fetch(path);
                    if (response.ok) {
                        console.log(`成功从 ${path} 加载主题数据`);
                        break;
                    }
                } catch (e) {
                    continue;
                }
            }

            if (!response || !response.ok) {
                // 如果无法加载JSON文件，使用内置的默认数据
                console.warn('无法加载themes.json，使用内置主题数据');
                this.themes = this.getDefaultThemes();
                this.loaded = true;

                // 执行所有等待的回调
                this.callbacks.forEach(callback => callback(this.themes));
                this.callbacks = [];

                return this.themes;
            }

            const data = await response.json();
            this.themes = data;
            this.loaded = true;

            // 执行所有等待的回调
            this.callbacks.forEach(callback => callback(this.themes));
            this.callbacks = [];

            return this.themes;
        } catch (error) {
            console.error('加载主题失败:', error);
            // 如果所有尝试都失败，使用内置数据
            console.warn('加载主题失败，使用内置主题数据');
            this.themes = this.getDefaultThemes();
            this.loaded = true;
            return this.themes;
        }
    }

    // 默认主题数据（备用）
    getDefaultThemes() {
        return {
            categories: {
                daily: {
                    name: "生活场景",
                    icon: "🏠",
                    themes: {
                        "超市": {
                            icon: "🛒",
                            titles: ["《走进超市》", "《快乐购物》", "《超市大探索》", "《购物小达人》", "《超市寻宝记》"],
                            description: "超市购物场景，包含各种商品和购物体验"
                        },
                        "家庭": {
                            icon: "🏡",
                            titles: ["《我的家》", "《温馨的家》", "《家人的爱》", "《家的小帮手》", "《幸福一家人》"],
                            description: "家庭生活场景，展现家人之间的温馨互动"
                        },
                        "学校": {
                            icon: "🏫",
                            titles: ["《美丽的校园》", "《上学路上》", "《课堂时光》", "《学习真快乐》", "《校园生活》"],
                            description: "学校学习场景，包含教室、操场等校园元素"
                        },
                        "公园": {
                            icon: "🌳",
                            titles: ["《公园一角》", "《春天的公园》", "《快乐的公园》", "《公园游玩记》", "《美丽的大自然》"],
                            description: "公园休闲场景，展现自然风光和娱乐设施"
                        }
                    }
                },
                social: {
                    name: "社会场所",
                    icon: "🏢",
                    themes: {
                        "医院": {
                            icon: "🏥",
                            titles: ["《快乐医院》", "《医生阿姨》", "《看病不怕》", "《健康小卫士》", "《医院见闻》"],
                            description: "医院医疗场景，帮助孩子了解医生和看病流程"
                        },
                        "消防站": {
                            icon: "🚒",
                            titles: ["《英勇的消防员》", "《消防安全》", "《消防车来了》", "《防火小知识》", "《消防英雄》"],
                            description: "消防站场景，普及消防安全知识"
                        },
                        "警察局": {
                            icon: "👮",
                            titles: ["《警察叔叔》", "《平安守护》", "《交通警察》", "《警察抓小偷》", "《为人民服务》"],
                            description: "警察局场景，培养孩子的安全意识"
                        },
                        "图书馆": {
                            icon: "📚",
                            titles: ["《知识的海洋》", "《安静的图书馆》", "《读书真快乐》", "《书的世界》", "《阅读好习惯》"],
                            description: "图书馆场景，鼓励孩子养成阅读习惯"
                        }
                    }
                },
                nature: {
                    name: "自然动物",
                    icon: "🌿",
                    themes: {
                        "动物园": {
                            icon: "🦁",
                            titles: ["《动物朋友》", "《动物园游记》", "《可爱的动物》", "《动物之家》", "《探秘动物园》"],
                            description: "动物园场景，认识各种可爱的动物"
                        },
                        "农场": {
                            icon: "🚜",
                            titles: ["《美丽的农场》", "《农场的一天》", "《丰收的喜悦》", "《农场小帮手》", "《乡村生活》"],
                            description: "农场场景，了解农作物的生长过程"
                        },
                        "海洋": {
                            icon: "🐠",
                            titles: ["《海底世界》", "《海洋生物》", "《奇妙的海底》", "《海洋探秘》", "《保护海洋》"],
                            description: "海洋场景，探索神秘的海底世界"
                        },
                        "森林": {
                            icon: "🌲",
                            titles: ["《森林探险》", "《森林里的家》", "《保护森林》", "《森林动物》", "《大自然的奥秘》"],
                            description: "森林场景，感受大自然的魅力"
                        }
                    }
                },
                transport: {
                    name: "交通工具",
                    icon: "🚗",
                    themes: {
                        "汽车": {
                            icon: "🚙",
                            titles: ["《汽车总动员》", "《马路上的车》", "《交通安全》", "《各种各样的汽车》", "《小小司机》"],
                            description: "汽车交通场景，学习交通安全知识"
                        },
                        "火车": {
                            icon: "🚂",
                            titles: ["《火车之旅》", "《火车飞驰》", "《坐火车去旅行》", "《火车轰隆隆》", "《铁路沿线》"],
                            description: "火车场景，体验铁路旅行的乐趣"
                        },
                        "飞机": {
                            icon: "✈️",
                            titles: ["《蓝天飞翔》", "《飞机场》", "《坐飞机》", "《飞向天空》", "《空中旅行》"],
                            description: "飞机场景，了解航空知识"
                        },
                        "轮船": {
                            icon: "🚢",
                            titles: ["《海上航行》", "《大轮船》", "《港口风光》", "《乘风破浪》", "《水上交通》"],
                            description: "轮船场景，了解水上交通工具"
                        }
                    }
                },
                culture: {
                    name: "节日文化",
                    icon: "🎉",
                    themes: {
                        "春节": {
                            icon: "🧧",
                            titles: ["《过新年》", "《春节快乐》", "《红红火火过大年》", "《新年新气象》", "《春节习俗》"],
                            description: "春节场景，了解中国传统新年习俗"
                        },
                        "中秋节": {
                            icon: "🥮",
                            titles: ["《月亮圆圆》", "《中秋赏月》", "《团圆的节日》", "《月饼香甜》", "《月光下的故事》"],
                            description: "中秋节场景，感受团圆的温馨"
                        },
                        "端午节": {
                            icon: "🚣",
                            titles: ["《粽叶飘香》", "《赛龙舟》", "《端午节》", "《屈原的故事》", "《端午习俗》"],
                            description: "端午节场景，了解传统节日文化"
                        },
                        "国庆节": {
                            icon: "🇨🇳",
                            titles: ["《我爱祖国》", "《国庆快乐》", "《五星红旗》", "《祖国在我心中》", "《欢庆国庆》"],
                            description: "国庆节场景，培养爱国情怀"
                        }
                    }
                }
            },
            version: "1.0.0",
            lastUpdated: "2025-01-09"
        };
    }

    // 获取所有分类
    getCategories() {
        if (!this.themes) return [];
        return Object.keys(this.themes.categories);
    }

    // 获取分类信息
    getCategoryInfo(categoryKey) {
        if (!this.themes || !this.themes.categories[categoryKey]) return null;
        return {
            key: categoryKey,
            name: this.themes.categories[categoryKey].name,
            icon: this.themes.categories[categoryKey].icon
        };
    }

    // 获取某个分类下的所有主题
    getThemesInCategory(categoryKey) {
        if (!this.themes || !this.themes.categories[categoryKey]) return [];
        return Object.keys(this.themes.categories[categoryKey].themes);
    }

    // 获取主题信息
    getThemeInfo(categoryKey, themeKey) {
        if (!this.themes || !this.themes.categories[categoryKey] || !this.themes.categories[categoryKey].themes[themeKey]) {
            return null;
        }
        return this.themes.categories[categoryKey].themes[themeKey];
    }

    // 获取主题标题
    getThemeTitles(categoryKey, themeKey) {
        const themeInfo = this.getThemeInfo(categoryKey, themeKey);
        return themeInfo ? themeInfo.titles : [];
    }

    // 获取主题图标
    getThemeIcon(categoryKey, themeKey) {
        const themeInfo = this.getThemeInfo(categoryKey, themeKey);
        return themeInfo ? themeInfo.icon : '📚';
    }

    // 获取主题描述
    getThemeDescription(categoryKey, themeKey) {
        const themeInfo = this.getThemeInfo(categoryKey, themeKey);
        return themeInfo ? themeInfo.description : '';
    }

    // 添加加载完成回调
    onLoad(callback) {
        if (this.loaded) {
            callback(this.themes);
        } else {
            this.callbacks.push(callback);
        }
    }

    // 搜索主题
    searchThemes(keyword) {
        if (!this.themes || !keyword) return [];

        const results = [];
        const lowerKeyword = keyword.toLowerCase();

        for (const [categoryKey, category] of Object.entries(this.themes.categories)) {
            for (const [themeKey, theme] of Object.entries(category.themes)) {
                // 搜索主题名称
                if (themeKey.includes(keyword) || themeKey.toLowerCase().includes(lowerKeyword)) {
                    results.push({
                        category: categoryKey,
                        categoryName: category.name,
                        theme: themeKey,
                        icon: theme.icon,
                        titles: theme.titles
                    });
                    continue;
                }

                // 搜索标题
                const matchingTitles = theme.titles.filter(title =>
                    title.includes(keyword) || title.toLowerCase().includes(lowerKeyword)
                );
                if (matchingTitles.length > 0) {
                    results.push({
                        category: categoryKey,
                        categoryName: category.name,
                        theme: themeKey,
                        icon: theme.icon,
                        titles: matchingTitles
                    });
                }
            }
        }

        return results;
    }
}

// 创建全局实例
window.themeLoader = new ThemeLoader();