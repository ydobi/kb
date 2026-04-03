# 工程化实践

前端工程化的最佳实践和经验总结。

## 性能优化

### 加载优化

- 代码分割
- 懒加载
- 预加载
- 资源压缩

### 运行时优化

- 虚拟列表
- 防抖节流
- 缓存策略
- Web Worker

### 监控指标

| 指标 | 说明 |
|------|------|
| FCP | 首次内容绘制 |
| LCP | 最大内容绘制 |
| FID | 首次输入延迟 |
| CLS | 累积布局偏移 |

## 架构设计

### 目录结构

```
src/
├── components/     # 通用组件
├── features/       # 功能模块
├── hooks/          # 自定义 Hooks
├── stores/         # 状态管理
├── api/            # API 请求
├── utils/          # 工具函数
└── types/          # 类型定义
```

### 模块划分

- 按功能模块划分
- 按业务领域划分
- 共享组件独立

## 代码规范

### 工具链

- ESLint - 代码检查
- Prettier - 代码格式化
- Husky - Git 钩子
- lint-staged - 暂存区检查

### 配置示例

```json
// .eslintrc.json
{
  "extends": [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended"
  ]
}
```