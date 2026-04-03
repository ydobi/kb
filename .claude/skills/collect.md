# collect

将链接内容收纳到知识库，自动分类并创建文档。

## 使用方法

```
/collect <链接URL>
```

## 执行步骤

### 1. 获取内容

使用 WebFetch 工具获取用户提供的链接内容，提取：
- 标题
- 作者
- 正文完整内容（保留所有技术细节、代码示例、配置示例）

### 2. 分析分类

根据内容主题判断应放入哪个分类：

**AI Coding 相关**：
- `ai-editors` - AI 编辑器/IDE（Cursor、Copilot、Claude Code 等）
- `prompt-skills` - Prompt 技巧
- `ai-workflow` - AI 辅助工作流
- `ai-frameworks` - AI 开发框架

**前端开发相关**：
- `frameworks` - 框架（React、Vue 等）
- `languages` - 语言基础（TypeScript、JavaScript、CSS）
- `build-tools` - 构建工具（Vite、Webpack）
- `engineering` - 工程化实践

**工具相关**：
- `editors` - 编辑器（VS Code 等）
- `debugging` - 调试工具
- `version-control` - 版本控制（Git）
- `productivity` - 效率提升

**其他**：
- `best-practices` - 最佳实践

### 3. 确认分类

使用 AskUserQuestion 让用户确认：
- 分类是否正确
- 如有多个可能的分类，让用户选择

### 4. 创建文档

- 文件名使用中文命名（如 `渐进式AI编码框架.md`）
- 文档开头添加来源信息：`> 来源：[链接标题](链接URL)`
- 保留原文完整内容，不删减
- 适当添加 Markdown 格式优化可读性

### 5. 更新配置

更新 `docs/.vitepress/config.mts` 的侧边栏配置，添加新文档链接。

### 6. 提交变更

```bash
git add .
git commit -m "docs: 收录文章 <文章标题>"
```

## 知识库路径

```
/Users/didi/projects/kb/docs/
```

## 注意事项

- 如果链接无法获取（如微信公众号），提示用户粘贴内容
- 保持原文完整性，不删减技术细节
- 自动生成合适的文档标题和文件名
