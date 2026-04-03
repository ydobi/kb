# 版本控制

Git 工作流和版本管理最佳实践。

## Git 基础

### 常用命令

| 命令 | 说明 |
|------|------|
| `git status` | 查看状态 |
| `git add .` | 暂存所有 |
| `git commit -m "msg"` | 提交 |
| `git push` | 推送 |
| `git pull` | 拉取 |
| `git branch <name>` | 创建分支 |
| `git checkout <branch>` | 切换分支 |
| `git merge <branch>` | 合并分支 |

## 分支策略

### Git Flow

```
main (生产)
  └── develop (开发)
        ├── feature/xxx
        ├── feature/yyy
        └── hotfix/xxx
```

### GitHub Flow

```
main
  └── feature/xxx → PR → main
```

## Commit 规范

```
<type>(<scope>): <subject>

type:
- feat: 新功能
- fix: 修复
- docs: 文档
- style: 格式
- refactor: 重构
- test: 测试
- chore: 构建/工具
```

### 示例

```
feat(auth): 添加用户登录功能
fix(api): 修复请求超时问题
docs(readme): 更新安装说明
```

## Git 钩子

使用 Husky 配置 Git 钩子：

```json
// package.json
{
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"]
  }
}
```

## 常见问题

### 撤销最后一次提交

```bash
git reset --soft HEAD~1
```

### 合并冲突解决

```bash
# 使用 VS Code 打开冲突文件
# 手动解决后
git add .
git commit
```

### 回退到某个提交

```bash
git reset --hard <commit-hash>
```