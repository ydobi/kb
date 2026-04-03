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
├── .vitepress/     # VitePress 配置
├── ai-coding/      # AI Coding 知识
├── frontend/       # 前端开发知识
├── tools/          # 工具使用
└── best-practices/ # 最佳实践
```