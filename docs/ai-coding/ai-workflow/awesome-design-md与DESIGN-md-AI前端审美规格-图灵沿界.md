> 来源：[「Claude Code 写前端有多丑？」一个 Markdown 文件夹几天狂揽近 2 万 Star，把 Apple、Stripe 的审美直接灌进 AI](https://mp.weixin.qq.com/s/ozcGDpFnnQUU9oJVxVPcWA)  
> 公众号：图灵沿界

# awesome-design-md 与 DESIGN.md：把设计系统写成 AI 可读的审美规格

导读：Claude Code 写前端的审美一直被开发者吐槽。开源仓库 [VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 在短时间里获得大量 Star：它从 Stripe、Linear、Apple 等 31+ 个真实网站提取设计系统，做成 Markdown 文件（`DESIGN.md`）直接喂给 AI agent。Google Stitch 提出的 DESIGN.md 概念，正在影响 AI 时代的前端协作方式。

## Claude Code 的 UI，丑到「人尽皆知」

「Claude Code is terrible at UI design and everyone knows it.」

这句话来自推特用户 @Ihtesham2005，获得了 1400+ 点赞、3000+ 收藏、近 16 万次浏览。

如果你用过 Claude Code、Cursor 这类 AI coding agent 做前端，你可能经历过：你说「做一个漂亮的 dashboard」，它给出颜色随机、间距混乱的页面；同一按钮在不同页面长得不一样；hover、active、disabled 状态缺失。看起来「能用」，但品牌感和精致度不足。

需求描述再详细，AI 仍可能在配色上「自由发挥」——因为它缺少一份稳定的审美约束。

## 一个文件夹，暴涨大量 Star

[VoltAgent/awesome-design-md](https://github.com/VoltAgent/awesome-design-md) 仓库内主要是 Markdown 文件。文章写作时数据点为约 17900+ Star、2200+ Fork（随时间变化以 GitHub 为准）。

它做的事可以概括为：

从 Stripe、Vercel、Notion、Linear、Supabase、Apple、NVIDIA 等 31+ 个真实网站提取设计系统，转化为 `DESIGN.md`。

每个文件大约 300–400 行，典型包含：

- 色彩体系：主色、强调色、背景色、成功色、错误色等，精确到 hex
- 字体层级：从 H1 到 caption 的规范
- 组件样式：按钮、卡片、输入框、导航栏及交互状态
- 间距系统：spacing scale 与栅格规则
- 阴影与层级：elevation 系统
- Do's and Don'ts：明确约束 AI 可做与不可做

使用方式示例：把文件放在项目根目录，对 Claude Code 说：

> "Use DESIGN.md, build me a page that looks like this."

目标是生成风格一致、接近目标站点气质的 UI。

## DESIGN.md：Stitch 提出的「AI 可读设计规格」

`DESIGN.md` 由 Google 旗下设计工具 **Stitch** 率先推广为一种给 **AI agent** 阅读的、纯文本设计系统文档。

对照关系（概念表）：

| 文件 | 谁来读 | 定义什么 |
| --- | --- | --- |
| `AGENTS.md` | Coding agents | 如何构建项目 |
| `DESIGN.md` | Design agents | 项目应该长什么样 |

思路变化：从「让 AI 看图猜审美」到「把审美写成规格书」。

文中以 Cursor 风格的 `DESIGN.md` 为例，说明「Visual Theme & Atmosphere」一类段落如何把氛围与色值写成可执行描述，例如强调暖色画布与文字色的 hex。纯文本、结构化、歧义相对小，便于 LLM 遵循。

## 开发者社区的反馈

文章引用了多条英文社区的推文观点，大意包括：

- 短时间大量 Star 说明开发者厌倦「默认模板脸」的 AI 生成 UI。
- 有观点称 Claude Code 可原生读取项目根目录的 `DESIGN.md` 以约束 UI（具体行为以工具版本与文档为准）。
- 有榜单将 awesome-design-md 的 Star 增速排在 AI Agent 相关工具前列；GitHub Projects Community 等账号有转发（以当时信息为准）。

中文社区方面，有用户试用 Notion 风格 preview 后认为「概念很好，效果仍有提升空间」。

## 三步上手：给 AI 加「审美护栏」

1. 在 awesome-design-md 仓库中选一个偏好的站点风格（Stripe / Linear / Vercel / Apple / Notion 等）。
2. 将对应的 `DESIGN.md` 复制到项目根目录。
3. 在 `CLAUDE.md`（或项目的 agent 配置）中加入约束，例如：

> "All UI must follow DESIGN.md. Do not invent new colors/typography outside the spec."

进阶用法可包括：在不改业务逻辑的前提下按 `DESIGN.md` 逐页重构 UI；同一页面用不同风格 `DESIGN.md` 做对照实验；把间距、按钮状态、字体层级等写入 review 检查清单；用 Stitch 等工具从自家产品提取并固化成 `DESIGN.md` 再迭代。

## 局限：能做什么，不能做什么

**有助于：** 压低 AI 生成 UI 的「随机漂移」，让配色、字体、间距、组件状态更稳定。

**仍需注意：**

- 审美上限仍依赖 spec 质量与人类判断。
- 仓库提取的是公开站点的视觉 token，学习、原型与商业使用需自行评估版权与合规。
- 约束不够硬时，agent 仍可能局部偏离 spec，Do/Don't 宜写明确。
- `DESIGN.md` 描述的是视觉规则，落地到 Tailwind、Chakra、MUI 等仍有映射成本。

## 结语：代码成本下降，审美约束更显价值

写代码的门槛在降低，但「做出好看、一致的产品」仍依赖设计与约束。awesome-design-md 类项目的关注度高，反映开发者希望有一份 **AI 能执行的审美规格**；`DESIGN.md` 把「好看」的定义尽量转成可读、可检的文本规范。

## 参考链接

- [VoltAgent/awesome-design-md（GitHub）](https://github.com/VoltAgent/awesome-design-md)
- [原文（微信公众号）](https://mp.weixin.qq.com/s/ozcGDpFnnQUU9oJVxVPcWA)
