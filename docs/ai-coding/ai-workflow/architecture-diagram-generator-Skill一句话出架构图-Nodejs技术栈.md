> 来源：[强烈推荐！这个 Skill 画架构图质量超高，一句话出图](https://mp.weixin.qq.com/s/qzevOsuhez1Q0T9Ae2B_Kw)
>
> 作者：Nodejs技术栈（微信公众号）

# 强烈推荐！这个 Skill 画架构图质量超高，一句话出图

做技术这行，总有些事是真心懒得做的，画架构图算一个。

不是不重要，是太麻烦。要么打开 draw.io 从头拖组件，要么用 Mermaid 写一堆语法还要反复调位置，最后搞出来的效果差强人意，发给别人一看，「就这？」。更多时候干脆跳过这一步，直接在文档里写「架构如下图所示」，然后图是空白的。

最近发现一个 Skill 把这件事解决了，效果出乎意料地好，顺手写篇文章给大家也安利一下。

## 先看效果

这是用它帮 Skills Hub 项目生成的架构图：

整体是深色主题，组件按前端、后端、数据库、外部服务分颜色标注，层级关系清晰，连接箭头干净，底部还有三栏信息卡片做补充说明。最重要的是，它输出的是一个独立的 HTML 文件，浏览器直接打开，不依赖任何第三方工具。

用的字体是 JetBrains Mono，整体风格偏工程审美，我个人比较喜欢这种调性，比那种糖果色的 UI 图要耐看。

顺手又让它画了一张微服务架构图，用的提示词是「微服务应用的典型架构是什么？」，不到 1 分钟出图：

图里涵盖了接入层、安全层、治理层、业务层、数据层、消息层、下游服务、基础设施完整的八个层次，Kafka/RabbitMQ 消息总线、Service Mesh（Istio/Envoy）、每个微服务独享数据库，该有的细节全在。这张图我一字没改，就是给了一句话，直接生成的。

## 这个 Skill 是什么

Skill 来自 GitHub 仓库 [Cocoon-AI/architecture-diagram-generator](https://github.com/Cocoon-AI/architecture-diagram-generator)，是一个专门用于生成架构图的 Claude Skill。

核心机制不复杂：`SKILL.md` 定义了一套完整的设计系统，包括颜色规范、组件样式、排版规则、SVG 布局约定，然后让 AI 按这套系统生成 HTML + 内联 SVG 代码。AI 输出的不是一张图片，而是完整的 HTML 文件，里面的 SVG 全部内联，样式全部嵌入，打开即用。

设计系统里的细节挺多，举几个例子：

- **语义色彩分层**：Frontend 用 Cyan（青色），Backend 用 Emerald（翠绿），Database 用 Violet（紫色），Cloud 用 Amber（琥珀），安全相关用 Rose（玫瑰红）。颜色有对应的语义，不是随便选的。
- **箭头渲染顺序**：连接线先于组件框绘制，保证箭头在视觉上位于组件之后，避免箭头盖住文字。组件框还会在半透明色块下面额外画一个纯色遮罩层，防止箭头「透过」半透明区域。这种细节在 draw.io 里需要手动处理，这里 Skill 直接内置了。
- **图例位置约束**：Legend 必须放在所有边界框的外面，并计算最低边界再加 20px 距离，防止标注被区域框遮住。

这些约定说起来都是「应该的」，但真正让 AI 稳定执行，靠的是 `SKILL.md` 里非常明确的规则描述，这也是为什么它比直接让 AI「画个架构图」效果要好很多。

## 怎么安装

有两种方式，按自己习惯选。

### 方式一：手动安装

去仓库下载 `architecture-diagram.zip`，然后：

- **Claude.ai**：Settings → Capabilities → Skills → + Add，上传 zip 文件，开启即可
- **Claude Code CLI**：

```bash
# 全局安装
unzip architecture-diagram.zip -d ~/.claude/skills/

# 项目级安装（只对当前项目生效）
unzip architecture-diagram.zip -d ./.claude/skills/
```

### 方式二：通过 Skills Hub 安装

我用的是这种方式，一键搞定。Skills Hub 是之前介绍过的桌面应用，用来统一管理各 AI 编程工具的 Skill 文件，装一次自动同步到 Cursor、Claude Code、Codex 等一堆工具里。

- 仓库：[qufei1993/skills-hub](https://github.com/qufei1993/skills-hub)

打开 Skills Hub，切到 Explore 页面，搜索 `architecture-diagram`，找到 `cocoon-ai/architecture-diagram-generator` 那条，点安装就行。或者点右上角的「手动添加」，直接粘贴 GitHub 仓库地址安装。

安装完在 My Skills 页能看到这个 Skill 已经同步到对应工具了。

## 怎么用

装好之后，使用方式很简单，不需要复杂的提示词。

### 最推荐的用法：分析代码仓库后生成架构图

用 Cursor、Claude Code 或 Windsurf 打开你的项目，输入：

```text
Analyze this codebase and describe the architecture. Include all major
components, how they connect, what technologies they use, and any cloud
services or integrations. Format as a list for an architecture diagram.
```

AI 会输出一个完整的 HTML 文件，在浏览器打开就行。

还支持迭代：生成之后不满意，直接在聊天框说「把 Redis 移到左边」、「把数据库层换成蓝色」、「加一个消息队列节点」，Claude 会按你的要求更新 HTML 文件，不用重新生成整张图。这个特性挺实用的，一次出不了满意的图很正常，几轮对话就能调整到位。

### 其他场景：直接描述架构

如果不是要分析现有代码，直接描述一个架构也行，比如：

```text
Create an architecture diagram for:
- React frontend
- Node.js/Express API
- PostgreSQL database
- Redis cache
- JWT authentication
```

或者让它画一个「典型的 SaaS 架构」当模板，再按需修改。

---

画架构图这件事，以前是能拖就拖，因为太费时间。有了这个 Skill 之后，1 分钟内能出一张质量不错的图，是 HTML 形式，改起来也方便，有不合适的就让 AI 直接改喽。如果你的项目文档里正好缺这块，值得试一下。

- Skill 仓库：[Cocoon-AI/architecture-diagram-generator](https://github.com/Cocoon-AI/architecture-diagram-generator)
