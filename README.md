# 知识库

AI Coding & 前端开发知识沉淀

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run docs:dev

# 构建
npm run docs:build

# 预览构建结果
npm run docs:preview
```

## 部署

推送到 main 分支后，GitHub Actions 会自动构建并部署到 GitHub Pages。

## 目录结构

```
docs/
├── .vitepress/         # VitePress 配置
├── ai-coding/          # AI Coding
│   ├── ai-editors/     # AI 编辑器/IDE
│   ├── prompt-skills/  # Prompt 技巧
│   ├── ai-workflow/    # AI 辅助工作流
│   └── ai-frameworks/  # AI 开发框架
├── frontend/           # 前端开发
│   ├── frameworks/     # 框架
│   ├── languages/      # 语言基础
│   ├── build-tools/    # 构建工具
│   └── engineering/    # 工程化实践
├── tools/              # 工具
│   ├── editors/        # 编辑器
│   ├── debugging/      # 调试工具
│   ├── version-control/# 版本控制
│   └── productivity/   # 效率提升
└── best-practices/     # 最佳实践
```