# 最佳实践

代码规范、架构设计、项目经验总结。

## 主题

### 代码规范
- 命名约定
- 目录结构
- 注释规范

### 架构设计
- 模块划分
- 状态管理
- API 设计

### 工程实践
- Git 工作流
- 代码审查
- 持续集成

## 代码规范

### 命名约定

| 类型 | 约定 | 示例 |
|------|------|------|
| 变量 | camelCase | userName |
| 常量 | UPPER_SNAKE_CASE | MAX_COUNT |
| 函数 | camelCase | getUserInfo |
| 类 | PascalCase | UserService |
| 组件 | PascalCase | UserCard |
| 文件 | kebab-case | user-card.tsx |
| 目录 | kebab-case | components/ |

### 目录结构

```
src/
├── components/     # 通用组件
├── features/       # 功能模块
├── hooks/          # 自定义 Hooks
├── stores/         # 状态管理
├── api/            # API 请求
├── utils/          # 工具函数
├── types/          # 类型定义
└── constants/      # 常量
```

## Git 工作流

### Commit 规范

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

### 分支命名

```
feature/xxx  - 新功能
fix/xxx      - 修复
refactor/xxx - 重构
docs/xxx     - 文档
```

## 代码审查清单

- [ ] 代码功能正确
- [ ] 无明显性能问题
- [ ] 错误处理完善
- [ ] 测试覆盖
- [ ] 代码风格一致
- [ ] 注释清晰
- [ ] 无安全漏洞