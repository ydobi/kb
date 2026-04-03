# 调试工具

前端调试工具使用指南。

## Chrome DevTools

### 常用面板

| 面板 | 用途 |
|------|------|
| Elements | DOM 结构和样式 |
| Console | 日志输出和调试 |
| Network | 网络请求 |
| Sources | 源码和断点 |
| Performance | 性能分析 |
| Memory | 内存分析 |

### 调试技巧

```javascript
// 条件断点：右键断点添加条件
data.length > 10

// 日志点：不暂停执行，只输出日志
console.log('data:', data)

// 监视表达式
// 在 Sources 面板添加监视变量
```

## React DevTools

- 组件树查看
- Props/State 检查
- 性能分析
- 高亮更新组件

## Vue DevTools

- 组件树查看
- Pinia 状态检查
- 路由信息
- 性能时间线

## 网络调试

### 请求拦截

```javascript
// 在 Console 中重写 fetch
const originalFetch = window.fetch
window.fetch = async (...args) => {
  console.log('Fetch:', args)
  return originalFetch(...args)
}
```

### 请求模拟

使用 Chrome DevTools 的 Network overrides 功能模拟响应。