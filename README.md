# 儿童识字小报生成器

🎨 一个基于AI的儿童识字小报生成工具，专为5-9岁儿童设计，帮助孩子们在有趣的场景中学习汉字。

![儿童识字小报生成器](https://img.shields.io/badge/年龄-5--9岁-blue)
![AI驱动](https://img.shields.io/badge/驱动-AI-orange)
![教育工具](https://img.shields.io/badge/类型-教育工具-green)

## ✨ 功能特点

- 🎯 **主题丰富**：涵盖生活场景、社会场所、自然动物、交通工具、节日文化等5大类别
- 🎨 **AI生成**：基于kie.ai API生成精美的识字小报图片
- ✏️ **自定义支持**：支持自定义主题、标题和词汇
- 📱 **响应式设计**：适配各种屏幕尺寸
- 💾 **历史记录**：保存生成历史，方便查看和下载
- 🔒 **本地存储**：API密钥可选择本地保存，方便下次使用

## 🚀 在线体验

访问在线演示：[https://child-pictures.pages.dev](https://child-pictures.pages.dev)

## 📦 本地运行

### 环境要求

- 现代浏览器（Chrome、Firefox、Safari、Edge等）
- Node.js 14+ 或 Python 3.6+
- 稳定的网络连接

### 快速开始

1. **克隆项目**
```bash
git clone https://github.com/putiyoujing/Child-pictures.git
cd Child-pictures
```

2. **启动本地服务器**

**Windows用户（推荐）：**
```bash
# 双击运行
start.bat
```

**使用Node.js：**
```bash
node start-server.js
```

**使用Python：**
```bash
python start-server.py
```

3. **访问应用**
打开浏览器访问：http://localhost:8080

### 获取API密钥

1. 访问 [kie.ai](https://kie.ai) 注册账号
2. 获取API密钥
3. 在应用中输入API密钥即可开始使用

## 🎯 使用指南

### 基本使用

1. **输入API密钥**：在左侧API设置区域输入有效的kie.ai API密钥
2. **选择主题和标题**：
   - 选择分类标签（生活场景、社会场所等）
   - 点击主题卡片选择主题
   - 从下拉列表选择标题
3. **生成小报**：点击"生成小报"按钮，等待AI生成完成
4. **保存图片**：生成完成后可下载或在新标签中查看

### 高级功能

#### 自定义词汇
在自定义输入区域，可以填写特定的词汇：
- **核心角色与设施**：如"收银员"、"货架"等
- **常见物品/工具**：如"苹果"、"牛奶"等
- **环境与装饰**：如"出口"、"灯"等

格式说明：每行一个词汇，格式为"拼音 中文"，例如：
```
shōu yín yuán 收银员
huò jià 货架
píng guǒ 苹果
```

#### 自定义主题
如果预设主题不能满足需求，可以：
1. 在"或自定义输入"区域输入自定义主题和标题
2. 可选填写相关词汇
3. 系统会根据输入生成相应的小报

## 🛠 技术栈

- **前端技术**：HTML5, CSS3, JavaScript (ES6+)
- **AI服务**：kie.ai API
- **部署平台**：GitHub, Cloudflare Pages

## 📁 项目结构

```
Child-pictures/
├── index.html              # 主页面
├── css/
│   └── style.css          # 样式文件
├── js/
│   ├── api-client.js      # API客户端
│   ├── app.js             # 主应用逻辑
│   ├── prompt-generator.js # 提示词生成器
│   ├── theme-loader.js    # 主题加载器
│   └── word-bank.js       # 词汇库
├── ai-docs/               # AI提示词文档
├── start-server.js        # Node.js服务器
├── start-server.py        # Python服务器
├── start.bat              # Windows启动脚本
└── README.md              # 项目说明
```

## 🔧 开发指南

### 本地开发

1. 克隆项目
2. 使用HTTP服务器运行（避免直接打开HTML文件）
3. 修改代码后刷新浏览器即可

### API集成

项目使用kie.ai API生成图片，主要参数：
- 模型：nano-banana-pro
- 宽高比：2:3（竖版A4）
- 分辨率：4K
- 格式：PNG

### 自定义主题

在`js/word-bank.js`中可以添加新主题和词汇：

```javascript
// 添加新主题
'新主题': {
    core: ['核心词汇1', '核心词汇2', ...],
    items: ['物品词汇1', '物品词汇2', ...],
    env: ['环境词汇1', '环境词汇2', ...]
}
```

## 🤝 贡献指南

欢迎提交Issue和Pull Request！

1. Fork 本仓库
2. 创建您的特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交您的更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开一个Pull Request

## 📝 更新日志

### v1.0.0 (2025-01-09)
- ✨ 初始版本发布
- 🎨 支持多种主题的识字小报生成
- ✏️ 支持自定义主题和词汇
- 💾 添加历史记录功能
- 📱 响应式设计适配

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- [kie.ai](https://kie.ai) - 提供AI图片生成服务
- 所有为儿童教育做出贡献的开发者和教育工作者

## 📞 联系方式

- GitHub: [@putiyoujing](https://github.com/putiyoujing)
- 项目链接: [https://github.com/putiyoujing/Child-pictures](https://github.com/putiyoujing/Child-pictures)

---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！