---
name: collect
description: 将链接内容收纳到知识库，自动分类并创建文档；包含 Markdown 格式检查与调整（标题、表格、列表、代码块围栏），便于 VitePress 阅读。
---

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

### 4. 创建文档（初稿）

- 文件名使用中文命名（如 `渐进式AI编码框架.md`）
- 文档开头添加来源信息：`> 来源：[链接标题](链接URL)`
- 保留原文完整内容，不删减；先写成可编辑的初稿

### 5. 格式检查与调整

定稿前通读整理（**不改技术含义**）：

- **标题**：全文一个 `#`；章节用 `##` / `###` / `####`；「一、」「1.1」等对齐为标题，避免大段无标题正文
- **表格**：将抓取导致的「每格一行」恢复为 Markdown 表格
- **列表**：要点、铁律、步骤改为有序/无序列表
- **代码块**：标注语言；目录树/示意图用 `text`；**勿在** ` ```markdown ` **内再嵌** ` ``` `，内层改用缩进代码块，避免围栏提前闭合
- **链接**：参考区用 `[标题](URL)`；删除平台尾噪（阅读原文、Scan to Follow 等）
- **VitePress**：少用裸 `<...>`，参数可用中文括号或行内代码表示

若用户说只收录不排版，可弱化结构调整，仍建议去尾噪、修坏围栏。

### 6. 更新配置

更新 `docs/.vitepress/config.mts` 的侧边栏配置，添加新文档链接。

### 7. 提交变更

```bash
git add .
git commit -m "docs: 收录文章 <文章标题>"
```

## 知识库路径

项目内使用相对路径：`docs/`（勿写死本机绝对路径）。

## 注意事项

- 如果链接无法获取（如微信公众号），提示用户粘贴内容
- 保持原文完整性，不删减技术细节；格式整理不等于删内容
- 自动生成合适的文档标题和文件名
