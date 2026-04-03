# Claude Code

Claude Code 是 Anthropic 官方的 CLI 编程助手，具备强大的代码理解和生成能力。

## 安装

```bash
npm install -g @anthropic-ai/claude-code
```

## 基本使用

### 启动会话

```bash
claude
```

### 常用命令

| 命令 | 说明 |
|------|------|
| `/help` | 查看帮助 |
| `/clear` | 清除对话 |
| `/compact` | 压缩对话历史 |
| `/cost` | 查看消耗统计 |
| `/permissions` | 管理权限 |

## 核心能力

### 1. 代码理解

Claude Code 可以：
- 读取和分析整个代码库
- 理解项目结构和依赖关系
- 追踪代码调用链

### 2. 代码生成

支持生成：
- 函数和类
- 测试代码
- 文档注释
- 配置文件

### 3. 代码重构

可以进行：
- 提取函数/组件
- 重命名
- 类型添加
- 代码优化

## 使用技巧

### 1. 提供清晰的任务描述

```markdown
# 好的描述
在 src/components 目录下创建一个 UserCard 组件：
- 使用 TypeScript
- 接收 User 类型 props
- 显示用户头像、姓名、邮箱
- 支持点击跳转到用户详情

# 不好的描述
创建一个用户卡片组件
```

### 2. 分步处理复杂任务

```
第一步：帮我分析 src/api 目录的 API 结构
第二步：根据分析结果，生成 TypeScript 类型定义
第三步：为每个 API 编写调用函数
```

### 3. 利用 CLAUDE.md

在项目根目录创建 `CLAUDE.md` 文件，记录项目上下文：

```markdown
# 项目说明

## 技术栈
- React 18 + TypeScript
- 状态管理：Zustand
- 样式：Tailwind CSS

## 代码规范
- 组件使用 PascalCase 命名
- 文件使用 kebab-case 命名
- 优先使用函数组件
```

## 权限管理

Claude Code 采用权限确认机制：
- 读取文件：自动允许
- 写入文件：需要确认
- 执行命令：需要确认

使用 `/permissions` 管理权限规则。

## 最佳实践

1. **保持对话简洁** - 及时使用 `/compact` 压缩历史
2. **明确工作目录** - 在正确的项目目录启动
3. **善用 CLAUDE.md** - 记录项目上下文和规范
4. **分步骤执行** - 复杂任务拆分为小步骤