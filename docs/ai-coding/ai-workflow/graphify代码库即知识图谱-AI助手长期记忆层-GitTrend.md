> 来源：[graphify：代码库即知识图谱，AI 助手的长期记忆层](https://mp.weixin.qq.com/s/ILOxflySkofmbmVIuDc2rQ)  
> 作者：Git Trend（微信公众号）

# graphify：代码库即知识图谱，AI 助手的长期记忆层

Andrej Karpathy 有个习惯：把论文、推文、截图、笔记随手丢进一个 `/raw` 文件夹。graphify 就是给这种用法做的——在 Claude Code 里输入 `/graphify .`，它读你的文件，建一张知识图谱，返回你原本不知道谁和谁有关系。

说实话，「知识图谱 + AI」这个方向项目不少，但大多数要么只在推理阶段做 RAG，要么把所有东西都丢给 LLM 处理。graphify 的做法不太一样：**代码文件走 tree-sitter 做 AST 提取，纯确定性的，一个 token 的 LLM 调用都不花**；只有文档、论文、图片才走 Claude 语义提取。文中作者翻完源码后认为这个工程取舍做得比较实在。

## 它做什么

输入是任意文件夹，输出是三个文件：

- **graph.html**——可交互的图谱可视化，点击节点、搜索、按社区筛选  
- **GRAPH_REPORT.md**——纯文本审计报告，列出核心节点、意外关联和建议问题  
- **graph.json**——持久化的图谱数据，几周后再查也不需要重读原始文件  

代码支持约 20 种语言（Python、JS/TS、Go、Rust、Java、C/C++、Ruby、C#、Kotlin、Swift 等），文档、PDF、截图、白板照片全部接得住，甚至其他语言的图片也能处理。

安装与项目内初始化：

```bash
pip install graphifyy && graphify install
```

PyPI 包名是 **graphifyy**（双 y），容易打错；装完后在项目里输入 `/graphify .` 即可。

## 两阶段架构

graphify 的核心设计：**确定性提取 + 语义提取**的双通道。

### 第一阶段：tree-sitter AST 遍历

完全不依赖 LLM。从代码文件中提取类、函数、import 关系、调用图、docstring，以及以 `# NOTE:`、`# WHY:` 等标记的设计理由注释。这一步是确定性的——同样的输入永远产出同样的节点和边，标记为 **EXTRACTED**。

### 第二阶段：Claude 子代理并行处理

非代码文件（文档、论文、截图）中的概念和关系被提取出来，标记为 **INFERRED**（带 0–1 的置信度分数）或 **AMBIGUOUS**（需要人工审查）。

两阶段的结果合并进 NetworkX 图，用 **Leiden 算法**做社区检测，最终导出 HTML、JSON 与报告。

聚类基于图的拓扑结构，**不需要向量嵌入**。Claude 提取的语义相似边（`semantically_similar_to`）已经在图里，直接参与社区划分；图结构本身就是相似度信号——不需要单独的 embedding 步骤或向量数据库。

文中将「两阶段提取 + 社区检测 + 三种输出」描述为完整管线（配图说明见原文）。

## 诚实审计

graphify 和多数 GraphRAG 方案的核心区别：**每一条边都标注了来源**。这条设计线贯穿整个项目。

| 标记 | 含义 |
|------|------|
| **EXTRACTED** | 直接从源码或文件中发现的，置信度 1.0 |
| **INFERRED** | 合理推理，带 `confidence_score` |
| **AMBIGUOUS** | 标记为需要审查 |

你永远知道哪些是事实、哪些是猜测。调用图边从 AST 直接解析，标记 EXTRACTED；跨文件的语义关联由 LLM 推理，标记如 INFERRED/0.7，不混为一谈。

报告中的「意外关联」功能：跨社区的连接按复合分数排序，代码—论文边比代码—代码边排得更高，每条结果附一段自然语言解释「为什么觉得它们有关」。**GRAPH_REPORT.md** 的典型内容包括核心节点、意外关联和置信度标注（配图见原文）。

## 约 71.5 倍的 token 压缩

graphify 每次 run 结束会自动打印 token 对比。在 Karpathy 的仓库 + 5 篇论文 + 4 张图的混合语料（52 个文件）上，文中给出 **约 71.5 倍** token 节省。

原理：第一次 run 要花 token 提取建图，但之后的每次查询读的是压缩后的图谱，不是原始文件。SHA256 缓存保证 re-run 只处理变更过的文件，增量更新用 `--update` 参数。

文中也指出：约 6 个文件的小项目压缩比接近 1:1，图的价值主要在结构清晰度而非压缩；52 个文件的混合语料才是 graphify 更「划算」的区间——越大越划算。

## 多助手平台集成

小标题原文为「九个平台全覆盖」；正文列举为 **Claude Code、Codex、OpenCode、Cursor、Gemini CLI、OpenClaw、Factory Droid、Trae** 共八个平台，各有独立的 skill 文件和安装逻辑。

「装」不是复制一段提示词就完事。以 **Claude Code** 为例，`graphify claude install` 做两件事：

1. 往 **CLAUDE.md** 写一段规则，告诉 Claude 回答架构问题时先读 **GRAPH_REPORT.md**  
2. 往 **settings.json** 装 PreToolUse hook——每次触发 Glob 或 Grep，若图谱存在，Claude 会先看到提示：`graphify: Knowledge graph exists. Read GRAPH_REPORT.md for god nodes and community structure before searching raw files.`  

其他平台（文中描述）：Codex 装 Bash 工具的 PreToolUse hook；OpenCode 装 `tool.execute.before` 插件；Cursor 写 `.cursor/rules` 并设为 `alwaysApply`；Gemini CLI 用 BeforeTool hook。**每个平台用各自原生的拦截机制**。

还有 git hooks：`graphify hook install` 装 post-commit 和 post-checkout 钩子，每次提交或切分支自动重建图谱（代码文件走 AST，不需要 LLM）。

## 实用功能点

### 命令行查询图谱

不需要 AI 助手即可查询：

```bash
graphify query "auth flow 是怎么走的" --dfs
graphify path "DigestAuth" "Response"
graphify explain "SwinTransformer"
```

`query` 支持 BFS（广度优先，适合了解上下文）和 DFS（深度优先，适合追踪特定路径），还能用 `--budget` 限制输出 token 数。

### MCP 服务器

让 AI 助手直接结构化查询图谱：

```bash
python -m graphify.serve graphify-out/graph.json
```

文中称暴露 7 个工具：`query_graph`、`get_node`、`get_neighbors`、`get_community`、`god_nodes`、`graph_stats`、`shortest_path`。

### watch 模式

后台运行：代码文件改动即时触发 AST 重建（无 LLM 消耗）；文档或图片改动提示手动 `--update`。

### Obsidian 与 Neo4j

- **Obsidian vault 导出**（`--obsidian`）：为每个社区生成一篇 Markdown 文章，附 `index.md` 入口，可直接丢进已有 vault。  
- **Neo4j**：可导出 Cypher 脚本或直接推送到运行中的实例。

## 值不值得试

若先在正在接手的项目上跑一遍，看 **god nodes** 和社区划分，往往比翻文件高效。

**适合场景（文中归纳）**

- **接手新代码库**——先跑一遍图谱，看 god nodes 和社区划分  
- **维护知识库**——论文、笔记、代码混在一起，图谱帮助找隐性关联  
- **大项目的日常导航**——装了 always-on hook 后，AI 助手每次搜索前先看图谱摘要，减少盲目 grep  

**需要注意（文中归纳）**

- 语义提取依赖 LLM API 调用：首次 run 有成本，文档/图片越多越贵；代码文件走 AST 不花钱  
- PyPI 包名 **graphifyy** 容易打错（双 y）  
- 社区检测质量依赖边密度，文件太少（文中举例 **小于 10**）效果有限  
- 项目更新快——文中举例 0.3.14 到 0.3.24 两天内发了 11 个版本，API 可能有变动  

文中补充：graphify 在 2026 年 4 月初密集迭代，两天修了 20 多个问题（Windows 兼容、NetworkX 版本适配、XSS 防护、Codex hook schema 等），处于快速成熟期。若使用 Claude Code 或其他支持的编程助手，且经常面对多文件、跨文档的理解任务，值得一试。
