> 来源：[Anthropic 说：网传的 Harness 思路过时了，做这 3 件事就够！](https://mp.weixin.qq.com/s/HCYbhLCbf61Fe9_uiRwyeQ)
> 作者：猕猴桃（公众号「探索AGI」）

# Anthropic 说：网传的 Harness 思路过时了，做这 3 件事就够！

上周写 Harness Engineering 的时候（参见 [Anthropic 说：不要在等下一代模型了，立刻马上做 Harness！](https://mp.weixin.qq.com/s?__biz=MzkxNjcyNTk2NA==&mid=2247491751&idx=1&sn=a46776aeac4344bc9b82fedb8006a582&scene=21#wechat_redirect)），Anthropic 极力想传达的结论是：真正稀缺的能力不在模型里面，在模型外面。而且它每隔几个月就得重写一次。

昨天，Anthropic 又发了一篇 Harness 相关的博客，算是第二课了，这一篇其实更重要。

这一次的核心问题变了。不再是「要不要做 Harness」，而是：你的 Harness 里，在今天的模型面前有多少东西可以扔掉了？

第二课里边给了三个模式，但串起来看，最重要的一个问题只有五个字：

**What can I stop doing?**

## 用 Claude 已经会的东西

第一个模式很直觉：用 Claude 本来就熟悉的工具来构建应用。

2024 年底，Claude 3.5 Sonnet 在 SWE-bench Verified 上拿了 49%。当时的 SOTA——只靠了两个工具：`bash` 和 text editor。Claude Code 也是基于同样的工具。

`bash` 不是为构建 agent 而设计的，但它是 Claude 真正会用的工具，而且每一代模型都在变得更会用。

更有意思的是，Anthropic 发现 Claude 会把这些通用工具组合出专用模式。Agent Skills、Programmatic Tool Calling、Memory Tool——全部都是 `bash` 和 text editor 的组合。

不是给 Claude 造新工具，而是让它用已经会的工具自己组合出解法。

## 让模型自己编排

上一篇博客里已经有过一个 case：Opus 4.5 有「上下文焦虑」，快到窗口上限时会提前收工，团队设计了 sprint + context reset 来应对。

Opus 4.6 出来后，行为消失了，sprint 直接被砍。

这篇把这个思路系统化了。

传统 agent harness 有一个默认假设：每次工具调用的结果，都要回到模型的上下文窗口，模型看完再决定下一步。

但很多时候这是浪费。读一张大表只为了分析一列，整张表的 token 都花在不需要的行上。以前的解法是在工具层加硬编码过滤器。但 Anthropic 说，这其实是 harness 在替模型做一个编排决策，而模型自己更适合做这个决策。

给 Claude 一个代码执行工具（`bash` 或 REPL），让它自己写代码来调用工具、过滤结果、串联逻辑。只有最终输出回到上下文窗口。

编排权从 harness 转移到了模型。而且因为代码本身就是一种通用的编排语言，强 coding 模型也天然是强通用 agent。

BrowseComp 是一个测试 Agent 网页搜索能力的基准。给 Opus 4.6 自过滤 tool output 的能力，准确率从 45.3% 跳到了 61.6%。

这不是一个编程任务，足以说明代码编排在非编程场景上一样有效。

## 让模型自己管上下文

任务相关的上下文引导 Claude 使用通用工具。传统做法是把任务指令全写进 system prompt 预加载。问题是指令越多，上下文窗口里的注意力预算越紧。而且大部分指令在大部分时候用不到。

解法就是 Skills。每个 skill 的 YAML frontmatter 是一段简短描述，预加载进上下文提供概览。完整内容只在需要时通过 read file 工具展开。

Skills 给了 Claude 自己组装上下文窗口的自由。Context editing 是反面——选择性删除已经过时的上下文，比如旧的工具返回结果或 thinking blocks。

Subagent 则让 Claude 知道什么时候应该分叉一个干净的上下文窗口，把子任务隔离出去。Opus 4.6 的 subagent 能力在 BrowseComp 上比最佳单 agent 运行提升了 2.8%。

## 让模型自己管记忆

长任务会超出单个上下文窗口。传统做法是围绕模型搭检索基础设施。Anthropic 一直在做的事情是给 Claude 简单的方式，让它自己选择保存什么。

Compaction 让 Claude 总结历史上下文以维持长任务的连续性。但是从结果他们发现，同样的一套 compaction 机制：Sonnet 4.5 始终卡在 43%，Opus 4.5 跑到 68%，Opus 4.6 到了 84%。说明，模型自己知道什么该记、什么该忘。

Memory folder 是另一种很好的方式，给 Claude 一个可以读写文件的文件夹，让它自己决定持久化什么。给 Sonnet 4.5 一个 memory folder，BrowseComp-Plus 从 60.4% 升到 67.2%。

博客用宝可梦做了一个记忆进化的对比。Sonnet 3.5 跑了 14000 步还在第二个镇，memory 文件夹里 31 个文件，两个是关于毛虫宝可梦的重复笔记。

Opus 4.6 同样步数，10 个文件按目录组织，三个道馆徽章，外加一个从自己的失败里提炼出的 learnings 文件：

从「记下 NPC 说了什么」到「记下自己哪里打输了」。相同的一套机制，模型变聪明了，同样适用。

## 该加的还是得加

「做减法」不等于什么都不管。

最后很大的篇幅，还在分享，什么时候应该保留 harness 的约束。

### 缓存设计

Messages API 无状态，每轮对话都要把完整历史打包发过去。缓存 token 的成本只有基础输入的 10%，所以最大化缓存命中率直接影响成本。博客中给了五条原则：

- 应该把动态的放在提示词最后
- 有新的消息，应该直接追加 messages，而不要改 prompt，当成单轮处理
- 不要在会话过程中随便切换模型，模型换了，缓存就失效了。如果想切便宜模型，用 subagent 去实现
- 谨慎管理工具，工具添加、删除都会让缓存失效
- 对于 agents 这种多轮应用，要把 breakpoint 移到最新消息

### 声明式工具做边界

如果 Claude 所有操作都走 `bash`，那从 harness 的角度看，每个动作长得一模一样，都是一串命令字符串。删一个文件和调一个外部 API，harness 看到的形状没区别。

但这两个操作的风险完全不同。

所以 Anthropic 的建议是：把需要安全管控、用户交互或审计追踪的动作，从 `bash` 里提出来，做成独立工具。

举个例子。Claude Code 里的 `edit` 工具就不是 `bash` 命令，而是一个独立工具。这样 harness 可以在编辑前检查文件有没有被别人改过（staleness check），避免覆盖。如果编辑走的是 `bash` 里的 `sed`，harness 根本不知道哪个文件被改了。

同样的道理，需要用户确认的操作（比如调用外部 API），做成独立工具后可以弹确认框。需要展示给用户看的信息（比如向用户提问），做成工具后可以渲染成专门的 UI 组件。

判断标准之一是可逆性，越难撤销的操作，越值得做成独立工具。

Claude Code 的 auto-mode 提供了另一种思路：不做独立工具，而是用第二个 Claude 来审查 `bash` 命令是否安全。这可以减少对独立工具的需求，但只适用于用户信任整体方向的场景。

是否提升为独立工具，这个决策本身也要持续重新评估。

## 写在最后

上一篇 Harness 文章里，Anthropic 给了一个判断：harness 的可能性空间不会随模型进步而缩小，它只是在不断变化。

这篇博客其实是那句话的实操版。

Sprint 被砍了。硬编码过滤器不需要了。预加载的长指令换成了按需读取的 skills。模型能自己编排、自己管上下文、自己管记忆了。

但新的空间打开了。模型能自己管记忆了，那 memory folder 怎么设计？模型能自己编排工具调用了，那安全边界画在哪？缓存打断了成本翻倍，工具加减要不要做？

所以，最后很重要的一点是：别跟模型的进化赌跑。你的 harness 里每一个组件，都要定期问一遍：

这个，模型自己能做了吗？

能做了，就扔掉吧。

（文中插图见原链接微信文章。）
