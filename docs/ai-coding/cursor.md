# Cursor

Cursor 是一款基于 VS Code 的 AI IDE，深度集成了多种 AI 模型。

## 安装配置

### 下载安装

访问 [cursor.sh](https://cursor.sh) 下载对应平台安装包。

### 登录配置

1. 打开 Cursor，使用 GitHub 或 Google 账号登录
2. 进入设置选择 AI 模型（推荐 Claude 3.5 Sonnet）
3. 配置快捷键和规则

## 核心功能

### Cmd+K - 内联编辑

选中代码后按 `Cmd+K`，输入指令进行内联修改：

```
// 示例：将函数改为 TypeScript
将这个函数添加 TypeScript 类型注解
```

### Cmd+L - Chat 模式

与 AI 进行对话，支持：
- 代码解释
- Bug 分析
- 方案讨论
- 文档生成

### @ 符号上下文

使用 `@` 引入上下文：
- `@Files` - 引入文件
- `@Codebase` - 搜索代码库
- `@Docs` - 引入文档
- `@Web` - 网络搜索

## 最佳实践

### 1. 编写清晰的指令

```markdown
# 好的指令
将 getUserData 函数重构为使用 async/await，
添加错误处理，返回类型改为 Result<User, Error>

# 不好的指令
改一下这个函数
```

### 2. 分步骤处理复杂任务

将大任务拆分为小步骤，逐步完成。

### 3. 利用 .cursorrules

在项目根目录创建 `.cursorrules` 文件定义项目规则：

```
本项目使用 React + TypeScript
优先使用函数组件和 Hooks
样式使用 Tailwind CSS
```

## 快捷键速查

| 快捷键 | 功能 |
|--------|------|
| `Cmd+K` | 内联编辑 |
| `Cmd+L` | 打开 Chat |
| `Cmd+Shift+L` | 新建 Chat |
| `Cmd+I` | Composer 模式 |