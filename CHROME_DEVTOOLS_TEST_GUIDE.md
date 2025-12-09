# Chrome DevTools 功能测试指南

本指南将帮助您使用 Chrome DevTools 对儿童识字小报生成器进行全面的功能测试。

## 测试步骤

### 1. 打开测试页面

在 Chrome 浏览器中打开以下页面：

1. **主应用页面**: `file:///f:/Project/Claude/Child pictures/index.html`
2. **测试页面**: `file:///f:/Project/Claude/Child pictures/test.html`
3. **测试报告页面**: `file:///f:/Project/Claude/Child pictures/test-report.html`

### 2. 打开 Chrome DevTools

按 `F12` 或右键点击页面选择"检查"打开开发者工具。

### 3. 运行自动化测试

#### 方法一：使用测试报告页面
1. 在 `test-report.html` 页面点击"运行完整测试"按钮
2. 系统会自动运行所有测试并显示结果
3. 可以导出测试报告为 JSON 文件

#### 方法二：在主页面运行控制台脚本
1. 在 `index.html` 页面打开 DevTools Console
2. 复制 `run-chrome-tests.js` 中的代码粘贴到控制台
3. 按 Enter 运行
4. 查看控制台输出的测试结果

#### 方法三：手动测试各功能

### 4. 手动测试清单

#### 4.1 脚本加载测试
```javascript
// 在 Console 中运行
console.log('Scripts:', document.querySelectorAll('script'));
```
✅ 检查所有 js 文件是否已加载

#### 4.2 API 密钥功能测试
1. 输入有效的 API 密钥格式（如：nb-xxxxx）
2. 点击"测试"按钮
3. ✅ 应显示绿色"✓ API密钥可用"或红色错误信息
4. 勾选"保存密钥到本地"
5. ✅ 刷新页面后密钥应该自动填充

#### 4.3 主题选择功能测试
1. 点击不同的分类标签（生活场景、社会场所等）
2. ✅ 应显示对应分类的主题卡片
3. 点击任意主题卡片
4. ✅ 卡片应变为选中状态
5. ✅ 标题下拉框应显示对应标题选项
6. ✅ 应能从下拉框选择不同标题

#### 4.4 提示词生成测试
在 Console 中运行：
```javascript
const gen = new PromptGenerator();
const prompt = gen.generatePrompt('超市', '《走进超市》');
console.log(prompt.length > 0 ? '✅ 提示词生成成功' : '❌ 提示词生成失败');
```

#### 4.5 图片生成功能测试
1. 确保 API 密钥已输入并测试通过
2. 选择主题和标题
3. 点击"生成小报"按钮
4. ✅ 应显示进度条和百分比
5. ✅ 等待生成完成后右侧应显示图片
6. ✅ 应能点击"下载图片"和"新标签查看"

#### 4.6 响应式布局测试
1. 在 Chrome DevTools 中切换设备模拟器
2. 测试不同屏幕尺寸：
   - ✅ 桌面端（左右布局）
   - ✅ 平板端（可能上下布局）
   - ✅ 手机端（单列布局）

### 5. 常见问题排查

#### 5.1 主题数据未加载
错误：`themeLoader is not defined`
解决：检查 `theme-loader.js` 是否正确加载，查看网络标签页是否有 404 错误

#### 5.2 API 调用失败
错误：API 返回错误信息
解决：
1. 检查 API 密钥格式是否正确
2. 检查网络连接
3. 查看 Console 中的具体错误信息

#### 5.3 图片不显示
错误：生成后右侧无图片
解决：
1. 检查 Console 是否有图片加载错误
2. 检查图片 URL 是否有效
3. 尝试在新标签中打开图片 URL

#### 5.4 标题下拉框为空
错误：选择主题后下拉框无选项
解决：
1. 检查 `themes.json` 是否正确加载
2. 检查主题数据结构是否正确
3. 查看 Console 中的错误信息

### 6. 性能测试

#### 6.1 页面加载性能
在 Network 标签页：
1. 刷新页面
2. 查看 Load 时间
3. ✅ 应在 3 秒内完成加载

#### 6.2 API 响应性能
在 Network 标签页：
1. 生成图片时查看 API 请求
2. ✅ API 响应时间应在合理范围内
3. ✅ 应没有失败的请求

### 7. 控制台命令参考

#### 获取当前应用实例
```javascript
const app = window.app || document.querySelector('#app')?.__vue__ || document.app;
```

#### 手动触发主题加载
```javascript
await window.themeLoader.loadThemes();
console.log('主题加载状态:', window.themeLoader.loaded);
```

#### 测试 API 客户端
```javascript
const client = new NanoBananaClient();
client.setApiKey('your-api-key');
const result = await client.createTask('test prompt');
console.log('API测试结果:', result);
```

#### 查看历史记录
```javascript
const history = client.getHistory();
console.log('历史记录:', history);
```

### 8. 测试报告模板

```markdown
## 测试报告
- 测试时间: [日期时间]
- 测试环境: [浏览器版本]
- 测试结果: [通过/失败]
- 发现问题:
  1. [问题描述]
  2. [问题描述]
- 建议改进:
  1. [改进建议]
  2. [改进建议]
```

### 9. 快速测试脚本

复制以下代码到 Console 运行快速检查：

```javascript
// 快速健康检查
const checks = [
  () => window.themeLoader ? '✅ ThemeLoader' : '❌ ThemeLoader',
  () => window.PromptGenerator ? '✅ PromptGenerator' : '❌ PromptGenerator',
  () => window.NanoBananaClient ? '✅ NanoBananaClient' : '❌ NanoBananaClient',
  () => document.getElementById('generateBtn') ? '✅ 生成按钮' : '❌ 生成按钮',
  () => document.querySelector('.theme-card') ? '✅ 主题卡片' : '❌ 主题卡片'
];

console.log('=== 快速健康检查 ===');
checks.forEach(check => console.log(check()));
```

### 10. 完成测试后

1. 确保所有功能正常工作
2. 记录任何发现的问题
3. 如有必要，修复问题并重新测试
4. 导出并保存测试报告

## 注意事项

1. 测试时确保网络连接正常
2. 使用有效的 API 密钥进行测试
3. 清除浏览器缓存以确保测试准确性
4. 在不同浏览器中测试兼容性（Chrome、Firefox、Edge）

## 联系支持

如果遇到无法解决的问题，请：
1. 保存错误截图
2. 记录控制台错误信息
3. 记录重现步骤
4. 提供测试环境信息（浏览器版本等）