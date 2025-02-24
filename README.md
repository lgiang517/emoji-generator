# AI表情包生成器

一个简单易用的AI表情包生成工具，可以根据情绪关键词快速生成表情包。

## 功能特点

- 🎨 一键生成表情包
- 😊 提供多种情绪关键词快速选择
- 💾 支持表情包下载
- 📱 响应式设计，支持移动端
- 🚀 简单直观的用户界面

## 快速开始

1. 打开网页
2. 在输入框中输入关键词，或点击下方情绪标签
3. 点击"生成表情包"按钮
4. 等待图片生成
5. 点击"下载图片"按钮保存表情包

## 可用情绪标签

- 开心
- 震惊
- 疑惑
- 暴躁
- 酸了
- 害怕
- 期待
- 无语
- 委屈
- 嘚瑟
- 尴尬
- 愤怒

## 技术栈

- HTML5
- CSS3
- JavaScript
- Coze API

## 如何使用

1. 克隆本仓库到本地
2. 复制 `config.example.js` 文件并重命名为 `config.js`
3. 在 `config.js` 中填入你的 API 密钥和机器人ID：
   ```javascript
   const config = {
       API_KEY: "你的API密钥",
       BOT_ID: "你的机器人ID"
   };
   ```
4. 打开 `index.html` 即可使用

## 注意事项

1. 请确保网络连接正常
2. 建议使用现代浏览器访问（Chrome、Firefox、Edge等）
3. 如遇到图片生成失败，请稍后重试
- 请确保已经正确设置了 API 密钥和机器人ID
- API 密钥请妥善保管，不要分享给他人
- 如果遇到问题，请检查浏览器控制台是否有错误信息

## 更新日志

### 版本 1.0.0 (2025-01-21)
- 初始版本发布
- 支持基本的表情包生成功能
- 提供12种情绪标签快速选择
- 支持表情包下载功能
