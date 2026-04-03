# 构建工具

前端构建工具配置和优化。

## 工具对比

| 工具 | 特点 | 适用场景 |
|------|------|----------|
| Vite | 极速开发体验 | 现代项目首选 |
| Webpack | 功能全面 | 复杂企业项目 |
| Rollup | 打包体积小 | 库开发 |
| Turbopack | 增量编译 | Next.js 项目 |
| esbuild | 极快编译 | 工具链底层 |

## Vite 配置示例

```typescript
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: { '@': '/src' }
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom']
        }
      }
    }
  }
})
```

## 常用插件

### Vite 插件

- `@vitejs/plugin-react` - React 支持
- `@vitejs/plugin-vue` - Vue 支持
- `vite-plugin-svgr` - SVG 转 React 组件
- `vite-plugin-compression` - 构建压缩

### Webpack 插件

- `html-webpack-plugin` - HTML 生成
- `mini-css-extract-plugin` - CSS 提取
- `webpack-bundle-analyzer` - 包分析