# GitHub Copilot

GitHub Copilot 是 GitHub 推出的 AI 编程助手，支持多种 IDE。

## 安装配置

### VS Code 安装

1. 打开扩展市场搜索 "GitHub Copilot"
2. 安装并登录 GitHub 账号
3. 完成订阅授权

### JetBrains 安装

1. 打开 Settings > Plugins
2. 搜索 "GitHub Copilot" 并安装
3. 重启 IDE 并登录

## 核心功能

### 代码补全

编写代码时 Copilot 会自动建议：
- 函数实现
- 参数类型
- 文档注释
- 测试代码

### Copilot Chat

使用 `Cmd+Shift+P` 输入 "Copilot Chat" 打开对话窗口：
- 代码解释
- 单元测试生成
- 代码修复
- 文档生成

### Copilot Edits

选择代码后，可以请求修改：
```
添加输入验证
优化性能
添加错误处理
```

## 使用技巧

### 1. 编写清晰的注释

```javascript
// 好的注释：生成符合预期的代码
// 根据用户 ID 获取用户信息，包含错误重试机制，最多重试 3 次
async function getUserById(id: string) {
  // Copilot 会生成符合描述的代码
}

// 不好的注释：生成模糊的代码
// 获取用户
async function getUser(id) {
}
```

### 2. 提供上下文

打开相关文件，Copilot 会参考已打开文件的上下文。

### 3. 使用 Copilot Labs

安装 Copilot Labs 扩展获得更多功能：
- 代码解释
- 测试生成
- 代码翻译

## 快捷键

| 快捷键 | 功能 |
|--------|------|
| `Tab` | 接受建议 |
| `Esc` | 拒绝建议 |
| `Alt+]` | 下一个建议 |
| `Alt+[` | 上一个建议 |