# VS Code

Visual Studio Code 是最流行的代码编辑器之一。

## 常用快捷键

### 通用

| 快捷键 | 功能 |
|--------|------|
| `Cmd+P` | 快速打开文件 |
| `Cmd+Shift+P` | 命令面板 |
| `Cmd+B` | 切换侧边栏 |
| `Cmd+J` | 切换终端 |
| `Cmd+,` | 打开设置 |

### 编辑

| 快捷键 | 功能 |
|--------|------|
| `Opt+↑/↓` | 移动行 |
| `Shift+Opt+↑/↓` | 复制行 |
| `Cmd+D` | 选中下一个相同词 |
| `Cmd+Shift+K` | 删除行 |
| `Cmd+/` | 注释 |

### 多光标

| 快捷键 | 功能 |
|--------|------|
| `Cmd+Opt+↑/↓` | 添加光标 |
| `Cmd+Shift+L` | 选中所有相同词 |
| `Cmd+F2` | 重命名符号 |

## 推荐插件

### 通用增强

| 插件 | 说明 |
|------|------|
| Error Lens | 行内显示错误 |
| GitLens | Git 增强 |
| Todo Tree | TODO 高亮 |
| Code Spell Checker | 拼写检查 |
| EditorConfig | 编辑器配置 |

### 代码质量

| 插件 | 说明 |
|------|------|
| ESLint | JS/TS 检查 |
| Prettier | 代码格式化 |
| Biome | 快速 linter |

### 开发效率

| 插件 | 说明 |
|------|------|
| GitHub Copilot | AI 补全 |
| Cursor | AI IDE |
| Tabnine | AI 补全 |

### 前端开发

| 插件 | 说明 |
|------|------|
| ES7+ React Snippets | React 代码片段 |
| Vue - Official | Vue 语言支持 |
| Tailwind CSS IntelliSense | Tailwind 智能提示 |
| Auto Rename Tag | 自动重命名标签 |

## 配置优化

### settings.json

```json
{
  // 编辑器
  "editor.fontSize": 14,
  "editor.tabSize": 2,
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },

  // 文件
  "files.autoSave": "afterDelay",
  "files.autoSaveDelay": 1000,

  // 搜索排除
  "search.exclude": {
    "**/node_modules": true,
    "**/dist": true,
    "**/.git": true
  },

  // 性能
  "files.watcherExclude": {
    "**/node_modules/**": true,
    "**/dist/**": true
  }
}
```

### 键盘快捷方式

```json
// keybindings.json
[
  {
    "key": "cmd+shift+r",
    "command": "editor.action.rename",
    "when": "editorHasRenameProvider"
  },
  {
    "key": "ctrl+cmd+f",
    "command": "editor.action.formatDocument"
  }
]
```

## 工作区配置

```json
// .vscode/settings.json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "typescript.tsdk": "node_modules/typescript/lib"
}

// .vscode/extensions.json
{
  "recommendations": [
    "esbenp.prettier-vscode",
    "dbaeumer.vscode-eslint"
  ]
}
```

## 调试配置

```json
// .vscode/launch.json
{
  "version": "0.2.0",
  "configurations": [
    {
      "type": "chrome",
      "request": "launch",
      "name": "Launch Chrome",
      "url": "http://localhost:5173",
      "webRoot": "${workspaceFolder}/src"
    }
  ]
}
```