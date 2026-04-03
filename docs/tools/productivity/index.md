# 效率提升

开发效率提升工具和技巧。

## 快捷键效率

### 系统级

- Alfred (macOS) - 快速启动和工作流
- Raycast (macOS) - 现代启动器
- PowerToys (Windows) - 微软效率工具

### 编辑器级

熟练掌握编辑器快捷键，减少鼠标操作。

## 自动化工具

### 脚本自动化

```bash
# 创建新组件
new-component() {
  mkdir -p src/components/$1
  touch src/components/$1/index.tsx
  touch src/components/$1/$1.module.css
}
```

### 代码片段

VS Code 代码片段配置：

```json
{
  "React Component": {
    "prefix": "rc",
    "body": [
      "import React from 'react'",
      "",
      "interface ${1:Component}Props {}",
      "",
      "export function ${1:Component}({}: ${1:Component}Props) {",
      "  return (",
      "    <div>",
      "      $0",
      "    </div>",
      "  )",
      "}"
    ]
  }
}
```

## AI 辅助

### 代码生成

使用 AI 工具快速生成重复性代码。

### 文档生成

利用 AI 自动生成代码文档和注释。

### 测试生成

让 AI 帮忙生成测试用例。

## 工作流优化

### 模板项目

创建项目模板，快速启动新项目。

### CI/CD 自动化

- 自动测试
- 自动部署
- 自动发布

### 命令别名

```bash
# ~/.zshrc 或 ~/.bashrc
alias gs='git status'
alias gp='git push'
alias gl='git pull'
alias npmdev='npm run dev'
alias npmbuild='npm run build'
```