# Spec Coding：渐进式 AI 编码框架

> 来源：微信公众号，作者不详

## 核心理念

**一句话定义**：在让 AI 写代码之前，先用结构化文档（Spec）把"要做什么、怎么做、有什么约束"说清楚，然后 AI 围绕这份文档编码。

### 三条铁律

1. **No Spec, No Code** — 没有文档，不准写代码
2. **Spec is Truth** — 文档和代码冲突时，错的一定是代码
3. **Reverse Sync** — 发现 Bug，先修文档，再修代码

### 经济学原理

Code is Cheap, Context is Expensive：
- 把需求、约束、代码现状写进 Spec 作为高质量输入
- AI 不用反复试错，对话轮次从 20 轮降到 3-5 轮
- 总成本反而更低，效果反而更好

## 基础认知

### 大模型能力

当前顶级模型可以独立完成中等复杂度的编码任务——理解需求、读代码、写实现、修编译错误，但仍需人审查结果。

**梯队差异**：
- T0：一次生成全链路且主动处理边界情况
- T1：多提示一两轮可达到接近效果
- T1.5：基本可用但容易漏边界
- T2：能写骨架但需要较多人工调整

### Agent 本质

```
Agent = while 循环 + Tool Use + 工具执行器
```

例子：
```
你说："把 UserService 里的 getById 方法加个缓存"
  → Agent 调用【读文件】工具，读取 UserService.java      （侦察）
  → Agent 分析代码，决定修改方案                          （思考）
  → Agent 调用【写文件】工具，插入缓存逻辑                  （行动）
  → Agent 调用【终端】工具，运行编译检查                    （验证）
  → 编译报错，Agent 读取错误信息，自动修复                   （自愈）
  → 编译通过，Agent 回复你"已完成"                        （结束）
```

### 软件复杂度视角

来自《人月神话》：
- **本质复杂度**：业务逻辑本身，不可消除
- **偶然复杂度**：工具/流程引入的额外负担，可以且应该被消除

评判标准：一个方案好不好，看它能多高效地帮你应对本质复杂度，同时自身引入的偶然复杂度有多低。

## 渐进式复杂度设计

不同复杂度的需求，暴露不同深度的流程：

| 需求复杂度 | 流程深度 |
|-----------|---------|
| 简单（改字段、修 bug） | 直接执行，Rules 约束即可 |
| 中等 | Spec 概要 + Tasks |
| 复杂 | 完整 Spec + Tasks + 两阶段 Review |

**关键原则**：
- 简单需求不承担复杂流程的成本
- 流程是可选增强，而非强制前提
- 只有本质复杂度够高时，才引入对应重量的流程

## 框架目录结构

```
code_copilot/
├── rules/                      # Project Rules（始终生效）
│   ├── project-context.md      #   工程结构、分层、核心依赖
│   ├── coding-style.md         #   编码规范
│   ├── security.md             #   安全红线
│   └── domain-rules.md         #   业务领域约束
│
├── knowledge/                  # 领域知识（按需加载）
│   ├── index.md                #   知识索引（触发关键词 + 描述）
│   └── *.md                    #   详细知识文档
│
├── agents/                     # Agent 配置与提示词
│   ├── copilot-prompt.md       #   实际提示词
│   ├── spec-reviewer.md        #   Spec 合规审查 Agent
│   └── code-quality-reviewer.md #  代码质量审查 Agent
│
├── changes/                    # 变更管理
│   ├── templates/              #   模板（spec / tasks / log）
│   └── <change-name>/          #   每个需求一个目录
│
└── archives/                   # 已完成变更的归档
```

## 工作流

### Propose（提案）— 人主导，AI 辅助

1. **Research**：分析代码现状，锁定事实（每个结论有代码出处）
2. **逐个提问**：一次只问一个问题，优先给 2-3 个选项 + 推荐
3. **分段生成文档**：每段确认后再继续
4. **生成完整 spec.md + tasks.md + log.md**
5. **HARD-GATE**：必须等用户显式确认，确认前禁止任何编码动作

### Apply（执行）— AI 主导，人审查

- 默认逐步执行：完成一个 task → 报告 → 等用户确认
- 零偏差原则：Plan 是合同，AI 是打印机
- Verification 铁律：每个 task 完成后必须展示可验证的证据
- 实时知识采集：有踩坑/发现立即写入 log.md

### Fix（修正迭代）

- 在已完成基础上做增量修正
- 文档同步是铁律——每次 /fix 必须同步更新 spec、tasks、log

### Review（审查）— 两阶段 Sub Agent

1. **Spec Compliance**：逐条比对 spec 功能点与实际代码
2. **Code Quality**：基于 rules/ 检查编码规范、安全红线

阶段一 PASS 后才启动阶段二。

### Archive（归档）

逐条展示 log.md 中的知识发现，询问是否沉淀到 knowledge/。

## 工具选型

### 两层架构

```
人（开发者）
  │
  ├─ 编排层 AI（Claude Opus / Gemini Pro）
  │   职责: 理解需求、生成 Spec、审查结果
  │       │
  │       ▼
  │   执行层 AI（Claude Code / opencode）
  │   职责: 读写代码、执行命令、运行测试
  │
  └─ 终端 ── 可随时直接接管
```

### 透明度底线

- 模型型号+版本可见
- 完整 context 可查
- 原始输出不被篡改
- Token 用量透明

### 推荐工具

| 工具 | 定位 | 特点 |
|------|------|------|
| Claude Code | 终端 AI 编码 Agent | Anthropic 官方，模型绑定 Claude |
| opencode | 终端 AI 编码 Agent | 模型自由选择，社区驱动 |
| Cursor/Windsurf | IDE 内交互式 AI | GUI 友好，上手快 |

## 人的角色

从「全干」变成「管和验」：

- **管控**：控制 AI 看什么
- **指挥**：选方案、审计划、批准执行
- **评价**：验收结果、发现偏差

### 三个常见错误

1. **讨论和命令混为一谈**：一次只给一种意图
2. **阶段产出搞混**：调研阶段要的是事实，不是代码
3. **自由度给反了**：
   - 调研：中自由度
   - 方案设计：高自由度
   - 规划：低自由度
   - 执行：零自由度
   - 验收：中自由度

## 知识底座

真正决定 AI 输出质量上限的，是喂给它的领域知识的质量。

| 知识类型 | Spec 能覆盖 | 实际重要性 |
|----------|------------|-----------|
| 编码规范 | ★★★★ | ★★★ |
| 存量代码 | ★★★ | ★★★★ |
| 领域知识 | ★ | ★★★★★ |
| 架构决策 | ★★ | ★★★★★ |
| 团队隐性经验 | ☆ | ★★★★ |

## 代价与挑战

- **心流中断**：需要适应「想→写 Spec→等→审→改→想」的新节奏
- **上下文隐性成本**：需要有意识地决定给 AI 看什么
- **持续演进**：框架价值在于随模型进步而放大收益

## 参考

- [Superpowers — agentic skills 框架](https://github.com/obra/superpowers)
- [Writing about Agentic Engineering Patterns - Simon Willison](https://simonwillison.net/2026/Feb/23/agentic-engineering-patterns/)
- [Chatbot Arena Leaderboard](https://arena.ai/)
- [opencode 官方文档](https://opencode.ai/docs/)
- [Claude Code 文档](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview)
- 《人月神话》— Frederick Brooks