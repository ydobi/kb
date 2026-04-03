# AI 开发框架

AI 应用开发相关的框架和工具。

## MCP (Model Context Protocol)

Anthropic 推出的模型上下文协议，用于连接 AI 模型与外部工具。

### 核心概念

- **Resources**: 可读取的数据源
- **Tools**: 可执行的函数
- **Prompts**: 预定义的提示模板

### 应用场景

- 连接数据库
- 调用 API
- 文件系统操作
- 自定义工具集成

## Agent SDK

构建 AI Agent 的开发框架。

### 常用框架

| 框架 | 特点 |
|------|------|
| LangChain | 多模型支持，生态丰富 |
| AutoGPT | 自主任务执行 |
| CrewAI | 多 Agent 协作 |

### 开发要点

1. **任务分解**: 将复杂任务拆分为子任务
2. **工具选择**: 为 Agent 配置合适的工具
3. **记忆管理**: 管理对话和任务历史
4. **错误处理**: 处理执行失败的情况

## AI SDK

直接调用 AI 模型的 SDK。

### Anthropic SDK

```typescript
import Anthropic from '@anthropic-ai/sdk'

const client = new Anthropic()
const response = await client.messages.create({
  model: 'claude-3-5-sonnet-20241022',
  max_tokens: 1024,
  messages: [{ role: 'user', content: 'Hello' }]
})
```

### OpenAI SDK

```typescript
import OpenAI from 'openai'

const client = new OpenAI()
const response = await client.chat.completions.create({
  model: 'gpt-4',
  messages: [{ role: 'user', content: 'Hello' }]
})
```