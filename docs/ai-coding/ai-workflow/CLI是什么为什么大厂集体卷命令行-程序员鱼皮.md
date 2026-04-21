> 来源：[既然 AI Coding 有了 IDE，为什么还要有 CLI？](https://www.zhihu.com/question/1954908418063185706/answer/2029156876449792078)
> 作者：程序员鱼皮（知乎：[@程序员鱼皮](https://www.zhihu.com/people/coder_yupi)）
>
> 说明：知乎网页端接口对该回答返回 `content_need_truncated=true` 的截断正文；为保留完整技术细节，正文以作者站点同文为准整理，并附交叉引用：[CLI 是什么？为什么大厂突然集体卷命令行？](https://www.codefather.cn/post/2045392231212281858)

# CLI 是什么？为什么大厂突然集体卷命令行？

大家好，我是程序员鱼皮。

最近不知道大家有没有注意到，互联网大厂的风向又变了。

Google 率先开源了 Workspace CLI，紧接着短短一周之内，飞书、钉钉、企业微信不约而同地在 GitHub 上开源了自己的 CLI 工具。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/CcrsQK0v34QSZCuV.jpg)

一时间，CLI 这个计算机世界里最古老的交互方式，突然又火了。

奇了怪了，CLI 不就是黑不拉几的命令行窗口吗？都什么年代了，各大厂不去卷更漂亮的界面，反而集体开起了倒车？

![](https://pic.code-nav.cn/post_picture/1601072287388278786/9zP4AXeuZt85CGGi.jpg)

这篇文章，我会依次分享：

- 什么是 CLI？
- 怎么用 CLI？
- 为什么大厂都在卷 CLI？
- 有哪些 CLI 开源项目？
- 怎么自己做个 CLI？

一次性把 CLI 给你讲明白，建议收藏~

## 什么是 CLI？

CLI 全称 Command Line Interface，翻译过来就是命令行界面。

说白了，就是你在一个小黑框里敲文字命令来操作电脑。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/p4iX1Z9hEYt24Fbu.jpg)

和它对应的，是我们每天都在用的 GUI（Graphical User Interface），也就是图形界面。你平时在手机上看到的那些图标、在电脑上看到的那些窗口和按钮，这些都是 GUI。

举个例子，假设你想把电脑桌面上的一张图片移动到另一个文件夹。用 GUI 的话，你会打开文件管理器，找到图片，用鼠标拖过去放进目标文件夹。

使用 CLI 的话，你打开终端，敲一行命令就搞定了：

```bash
mv ~/yupidog.png ~/Downloads
```

![](https://pic.code-nav.cn/post_picture/1601072287388278786/X95trGx12EAUeYVo.jpg)

再比如切视频、批量改文件名、查服务器日志，这些用 GUI 要点好多步的操作，CLI 往往一行命令就搞定了。

显然，CLI 的特点就是 **简洁直接** ，一条命令干一件事，干净利落。

但是，如果想用好 CLI，要求你记住大量命令和参数，这对普通用户来说门槛太高了。

想象一下我那只会用电脑玩斗地主和捕鱼的爸妈，让他们打开终端敲命令？玩呢？

![](https://pic.code-nav.cn/post_picture/1601072287388278786/AqvW8iBWU1TBPApk.jpg)

其实 CLI 是计算机最原始的交互方式。在很久以前，电脑压根儿就没有图形界面，所有操作全靠命令行完成。后来 GUI 出现了，普通用户才终于告别了小黑框。从那以后，GUI 一路高歌猛进，成了绝对的主流。厂商们想方设法把界面做得更好看、更好用，按钮越做越大，交互越做越顺滑，一切都是为了让人类用起来更舒服。

但 CLI 从来没有消失，很多程序员朋友们都在用命令行管理服务器、部署项目。而且有些学编程的朋友写的第一行代码 Hello World，可能就是在命令行里跑起来的。

长期以来，CLI 一直是程序员的专属技能，甚至熟不熟悉命令行是区分老手和新手的标志之一。

不过现在 AI 时代来了，技术越来越大众化，CLI 正在重新站到聚光灯下。

## 上手试试 CLI

使用 CLI 最简单的方式，就是打开你电脑自带的终端。

Mac 用户在应用程序里找到 “终端”，Windows 用户搜索 “PowerShell” 或者 “命令提示符”，打开之后你会看到一个等待输入的光标。

试着敲一行：

```bash
date
```

电脑会直接返回当前的日期和时间。

这就是最简单的 CLI 交互了，你输入一条命令，电脑返回一个结果，没有花里胡哨的界面。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/pKH7b7fnNDuuhlpD.jpg)

但这只是最基础的用法，现代 CLI 能做的事情远远不止这些。

比如最近飞书刚开源的 [Lark CLI](https://www.feishu.cn/feishu-cli)，这个工具可以让你在终端里直接操作飞书的消息、日历、文档等功能。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/ixSCbvRX1Zr2UMBI.jpg)

首先输入一行命令安装：

```bash
npm install -g @larksuite/cli
```

![](https://pic.code-nav.cn/post_picture/1601072287388278786/lDcOKZAAmO0T3OiK.jpg)

装好之后，先配置一下应用信息：

```bash
lark-cli config init --new
```

![](https://pic.code-nav.cn/post_picture/1601072287388278786/72lRVYbCVuRIjmwd.jpg)

打开链接配置飞书 CLI 应用：

![](https://pic.code-nav.cn/post_picture/1601072287388278786/LCLa8tpOUtqrZkDL.jpg)

创建应用成功后，需要登录授权，按需选择你允许通过 CLI 操作的业务：

```bash
lark-cli auth login
```

![](https://pic.code-nav.cn/post_picture/1601072287388278786/LLial4RNRGx0FbxC.jpg)

跟着 CLI 的引导一步步操作就好：

![](https://pic.code-nav.cn/post_picture/1601072287388278786/yq7wyawPmByt1zvY.jpg)

授权过程中，记得要在飞书管理后台审核应用：

![](https://pic.code-nav.cn/post_picture/1601072287388278786/RxyKUOXfSET3ozyu.jpg)

审核应用通过后，可以再重新执行登录命令，直到你看到「授权成功」：

![](https://pic.code-nav.cn/post_picture/1601072287388278786/VzAKfbtfm4UqYKxt.jpg)

之后，你就可以用命令行来操作飞书了。

比如查看今天的日程安排：

```bash
lark-cli calendar +agenda
```

![](https://pic.code-nav.cn/post_picture/1601072287388278786/Hzoq87y7y6uE4XRz.jpg)

查看我的待办任务：

```bash
lark-cli task +get-my-tasks
```

![](https://pic.code-nav.cn/post_picture/1601072287388278786/RjBGGPCGQIyFWqav.jpg)

甚至直接创建一篇文档：

```bash
lark-cli docs +create --title "周报" --markdown "# 本周进展"
```

![](https://pic.code-nav.cn/post_picture/1601072287388278786/tjhJz6bCo9ubjkrW.jpg)

以前这些操作你要打开飞书 App，点好几下才能完成，现在一行命令就搞定了。

CLI 有这么多命令和参数，使用过程中，如果忘了某个命令怎么用，怎么办呢？

只需要记住一个万能口诀：**不会就加`--help`**。

比如：

```bash
lark-cli --help
lark-cli calendar --help
```

相当于随时翻说明书，CLI 会把所有可用的命令和参数列出来给你看。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/NcmNXnfSb45QQhhc.jpg)

对了，如果你觉得传统的终端使用起来不方便，可以试试 [Warp](https://www.warp.dev/) 这种现代终端工具，内置了 AI 辅助和命令自动补全，对新手友好很多。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/1jpyOe6Ff1kczcgN.jpg)

## 为什么大厂都在卷 CLI？

前面我们体验了用 CLI 操作飞书，对程序员来说，用习惯了确实还挺方便的。

但你有没有想过一个问题，大厂们费这么大劲把产品做成 CLI，难道只是为了让我们少点几下鼠标吗？为什么大厂都在卷 CLI？

答案就 2 个字：**AI** 。

大厂们不是在给人类做 CLI，而是在给 AI 做 CLI。

AI 大模型从诞生那天起就在学习海量的代码、命令行操作、终端输出。可以说 **CLI 就是 AI 的母语** ，让它读一行命令、执行一个操作，跟喝水一样自然。

反过来，你让 AI 去操作一个图形界面那可就难了。

还是拿飞书举例。假设你想让 AI 帮你搜一下最近同事提到过的 “周报” 相关消息。

假设使用飞书的网页版，AI 需要先打开浏览器，等页面加载完，找到搜索框，输入 “周报”，等结果出来，再一条条翻看消息内容。中间要处理一堆网页元素，导致上下文信息又长又杂，有很多和内容无关的干扰信息。而且万一网页改版了，AI 之前学到的操作方式可能就全废了。

但是飞书提供了 CLI 后，AI 只需要执行一行命令，就能完成任务：

```bash
lark-cli im +messages-search --query "周报"
```

![](https://pic.code-nav.cn/post_picture/1601072287388278786/R51e3smaM0l43V4k.jpg)

有人做过测试，让 AI 通过浏览器完成真实任务，成功率只有 35.8%；换成 CLI 来完成同样的任务，成功率接近 100%！

所以你会看到一个很有意思的现象。以前大厂做产品，想方设法把 UI 做得好看好用，给人类使用。现在是返璞归真，**面向 AI 做产品，给 AI 使用，越简单直接越好** 。谁先把自己的产品 CLI 化，谁就能先被 AI Agent 接入，谁就能在 AI 时代继续保持竞争力。

国外科技博主 Shawn Yeager 甚至写了一篇文章叫《CLI is the new API》，引起了很大反响。意思是以前产品之间的互通靠 API，现在 AI 时代产品和 AI 之间的互通靠 CLI。

说到 API，你可能会有个疑问：API 接口不也是给程序调用的吗？为什么还需要 CLI 呢？

![](https://pic.code-nav.cn/post_picture/1601072287388278786/RaQMFAVaF9cdHOyK.jpg)

答案很简单，API 虽然也是程序接口，但调用它需要编写代码。而 CLI 就是一行命令的事，AI 大模型在训练过程中学习了大量命令行语料，理解和生成命令对它来说驾轻就熟，再加上 AI 编程工具可以很方便地执行终端命令，所以 CLI 对 AI 来说几乎是零门槛。

而且 CLI 自带 `--help` 说明书，AI 用到哪个命令就查一下用法，不需要你提前把整本 API 文档都塞给它，能节省 Token 消耗。

你可能又问了：之前很火的 MCP 不也是连接 AI 和工具的协议吗？为什么还需要 CLI？

MCP 协议要求把所有工具的名称和参数格式全部注入到 AI 的上下文里，工具一多 Token 消耗就很夸张。ScaleKit 做过一组基准测试，同样的任务，MCP 的 Token 消耗可能是 CLI 的几十倍！

![](https://pic.code-nav.cn/post_picture/1601072287388278786/2YQPkdkUYHfetYnG.jpg)

而且 MCP 的运行过程对人类来说就像个黑盒，出了问题很难排查；CLI 就不一样了，如果出错了，就直接把命令复制到终端里跑一遍，报错信息一目了然。

知名 AI 搜索引擎 Perplexity 的 CTO 公开宣布放弃 MCP 转向 CLI，可见这个趋势已经很明显了。

当然这不是说 MCP 就过时了，在需要统一权限管控的企业场景下，MCP 的标准化鉴权规范依然很有价值。而且 Cursor 最近就上线了按需加载 MCP 的功能，不再一股脑把所有工具定义塞进上下文，而是等 AI 需要用到某个工具时再加载。

## CLI 开源项目

既然 CLI 这么火，GitHub 上必然少不了和 CLI 相关的开源项目。

目前飞书、钉钉、企业微信、Google 等大厂的 CLI 基本都覆盖了消息、日历、文档、通讯录等核心业务，而且都内置了 AI Agent Skills，可以直接被 Claude Code、Cursor 等 AI 工具调用。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/Z4hsm7mQM2j1gpSF.jpg)

除了大厂官方出品，社区里也涌现了很多有意思的项目。

比如 [OpenCLI](https://github.com/jackwener/opencli) 能把 **任意网站、Electron 应用、甚至本地工具** 统统变成命令行接口。

> 开源指路：<https://github.com/jackwener/opencli>

![](https://pic.code-nav.cn/post_picture/1601072287388278786/BEQppce4XnaFQabb.jpg)

如果你想让 AI 帮你查 B 站热门、知乎热榜，装上 OpenCLI 后输入一行命令就搞定了。它内置了几十个适配器，覆盖了 B 站、知乎、Twitter、Reddit 等一大堆平台，就像给 AI 装了一个万能遥控器。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/2NrEmJXJZgRUfE5G.jpg)

还有 [CLI-Anything](https://github.com/HKUDS/CLI-Anything)，它能自动分析一个开源软件的源码，找出每个功能背后的 API 逻辑，然后自动生成对应的 CLI 命令。

> 开源指路：<https://github.com/HKUDS/CLI-Anything>

![](https://pic.code-nav.cn/post_picture/1601072287388278786/Y7hYIT7ejVMFbAA9.jpg)

## 怎么自己做一个 CLI？

如果你有自己的产品或工具，其实可以做个 CLI，让用户通过 AI 更方便地使用。

开发 CLI 的技术方案有很多。之前我在 [编程导航](https://codefather.cn) 带大家做代码生成器项目的时候，就用过 Java 的 Picocli 框架来开发命令行交互。我还做过极客范浏览器主页的 Web 端 CLI，直接在网页里自主实现了命令行界面。对这些方案感兴趣的同学可以去看我之前的教程。

![YuIndex Web 终端项目](https://pic.code-nav.cn/post_picture/1601072287388278786/dVIrs22reMoRNR1V.jpg)

但下面我要重点介绍一个最近发现的宝藏技术，叫 **Ink** 。

这还得感谢前段时间 Claude Code 的源码意外泄露，我扒了一下发现，它是通过一个叫 Ink 的库来开发的。

简单来说，我们平时用 React 写网页，React 会把组件渲染成浏览器里的页面。而 React Ink 做的事情是把同样的 React 组件渲染成终端界面。这个库在 GitHub 上已经有几万 Star，Gatsby CLI、Prisma CLI 等知名项目都在用，非常成熟。

> 开源指路：<https://github.com/vadimdemedes/ink>

举个例子，比如编写下面这段代码，就能渲染出一个简易的终端，会显示一个每秒自动加 1 的计数器。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/T2TQnjSnuwkL3ELn.jpg)

了解了 React Ink 之后，我们用它来做一个 CLI 试试。

以我的 [编程导航](https://codefather.cn) 为例，这是一个程序员学习交流社区。做成 CLI 工具之后，用户就可以直接在终端里搜索编程教程、查看热门内容，也方便 AI Agent 调用。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/EU2Fo5Q3NdCRtHag.jpg)

我先为这个 CLI 开发 2 个核心功能：**搜索编程导航的内容** 和 **查看热榜** 。

整个开发过程其实就跟写网页差不多，简单的 CLI 工具直接让 AI 一把梭就行。

这里我就用 AI 来开发这个 CLI，先编写给 AI 的提示词：

```markdown
帮我用 React Ink 开发一个名为 codefather-cli 的命令行工具，实现以下功能：

1）codefather search <关键词>
获取编程导航搜索结果 https://www.codefather.cn/search/all?searchText=<关键词>
在终端中展示搜索结果列表，包括标题、作者、点赞数

2）codefather hot
获取编程导航热榜 https://www.codefather.cn/hot/all_hot
在终端中展示热榜 TOP20，包括排名、标题、作者、热度

要求：支持 --help 查看帮助信息
```

把这段提示词丢给 Claude Code 或者 Cursor 等 AI 编程工具，AI 就能帮你生成完整的项目代码。

![](https://pic.code-nav.cn/post_picture/1601072287388278786/vrxXH0DPUGAsosot.jpg)

最终运行效果大概长这样，还不错吧~

![](https://pic.code-nav.cn/post_picture/1601072287388278786/TruhD2pcZVSWGDo0.jpg)

可以试试让 AI 使用这个工具，AI 通过 `--help` 就能快速了解这个工具怎么用，准确地给出了回答，嘎嘎快！

![](https://pic.code-nav.cn/post_picture/1601072287388278786/SXoCAepRP7mwx585.jpg)

这就是 CLI 的魅力，对人类来说是一个好用的效率工具，对 AI 来说更是一个天然的操作接口。

## 最后哔哔

CLI 的回归不是技术的倒退，恰恰说明产品设计的思路在进化。

以前做个产品，只需要考虑人类用户怎么用，现在还得想想 AI 怎么用。

未来的产品可能会有两套前端，一套给人类看的 GUI，一套给 AI 用的 CLI，殊途同归。

建议正在使用 AI 工具的朋友们，多关注一下 CLI 的生态。不管是用 CLI 工具提升自己的效率，还是给自己的产品做一个 CLI 让 AI 能调用，都很有价值。

我是鱼皮，持续分享 AI 编程干货，这篇文章也会收录到我免费开源的 [《AI 编程零基础入门教程》](https://ai.codefather.cn/vibe)，GitHub Star 数已经破万，从零开始带你学会用 AI 开发上线自己的产品。

> 开源仓库：<https://github.com/liyupi/ai-guide>

![鱼皮AI导航开源教程](https://pic.code-nav.cn/post_picture/1601072287388278786/nlE0CAle34apQ3Ht.jpg)

学会的话欢迎点赞收藏关注哦，也欢迎评论区聊聊：你用过哪些 CLI？对 CLI 有什么看法？
