# 主题配置文档说明

## 概述
`themes.json` 是儿童识字小报生成系统的主题配置文件，包含了所有预设的主题、标题和描述信息。

## 文件结构

### 1. categories（分类）
系统将主题分为5大类别：

- **daily（生活场景）**：超市、家庭、学校、公园
- **social（社会场所）**：医院、消防站、警察局、图书馆
- **nature（自然动物）**：动物园、农场、海洋、森林
- **transport（交通工具）**：汽车、火车、飞机、轮船
- **culture（节日文化）**：春节、中秋节、端午节、国庆节

### 2. 主题属性
每个主题包含以下属性：

- **icon**：主题对应的emoji图标
- **titles**：5个预设标题列表
- **description**：主题描述说明

### 3. JSON结构示例
```json
{
  "categories": {
    "daily": {
      "name": "生活场景",
      "icon": "🏠",
      "themes": {
        "超市": {
          "icon": "🛒",
          "titles": [
            "《走进超市》",
            "《快乐购物》",
            "《超市大探索》",
            "《购物小达人》",
            "《超市寻宝记》"
          ],
          "description": "超市购物场景，包含各种商品和购物体验"
        }
      }
    }
  }
}
```

## 使用方法

### 前端调用
在前端JavaScript中，可以通过以下方式加载主题数据：

```javascript
// 方法1：使用fetch API加载
fetch('ai-docs/themes.json')
  .then(response => response.json())
  .then(data => {
    console.log('主题数据:', data);
    // 使用主题数据
  });

// 方法2：直接引用（如果将JSON转换为JS）
import themes from './themes.json';
```

### 获取分类列表
```javascript
// 获取所有分类
const categories = Object.keys(themes.categories);
// ["daily", "social", "nature", "transport", "culture"]

// 获取分类名称
const categoryNames = categories.map(key => themes.categories[key].name);
// ["生活场景", "社会场所", "自然动物", "交通工具", "节日文化"]
```

### 获取某个分类下的所有主题
```javascript
const dailyThemes = Object.keys(themes.categories.daily.themes);
// ["超市", "家庭", "学校", "公园"]
```

### 获取主题的标题列表
```javascript
const supermarketTitles = themes.categories.daily.themes.超市.titles;
// ["《走进超市》", "《快乐购物》", ...]
```

## 扩展指南

### 添加新分类
```json
"new_category": {
  "name": "新分类名称",
  "icon": "🆕",
  "themes": {
    // 主题列表
  }
}
```

### 添加新主题
在对应分类的themes对象中添加：
```json
"新主题": {
  "icon": "🌟",
  "titles": [
    "《标题1》",
    "《标题2》",
    "《标题3》",
    "《标题4》",
    "《标题5》"
  ],
  "description": "主题描述"
}
```

## 更新说明
- **版本号**：1.0.0
- **最后更新**：2025-01-09
- **主题总数**：20个
- **标题总数**：100个（每个主题5个）

## 注意事项
1. 所有标题都使用《》符号包围
2. 每个主题固定5个标题
3. 主题名称使用中文，避免使用特殊字符
4. 图标建议使用emoji，保持一致性
5. 描述文字应简洁明了，适合理解