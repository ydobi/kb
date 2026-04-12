> 来源：[Google 藏大招！AndroidX 悄悄上线 Remote Compose：服务端直接下发原生 UI，再也不用发版了](https://mp.weixin.qq.com/s/cChnHus8VqGnDwmqAY-aOw)
> 转载/出处：微信公众号「Android技术圈HPro」（原文标题含推广语气，收录时保留原标题链接便于检索）

# AndroidX Remote Compose：服务端下发原生绘制指令

Google 发布了 `androidx.compose.remote`：在服务端用 Compose 编写 UI，序列化为二进制文档，由客户端 **Playback** 原生渲染。思路不是「JSON → 预置组件映射」，而是传输 **绘制操作**，客户端只需通用播放器，新增 UI 形态可不经发版由服务端下发。

## 什么是 Remote Compose？

一句话：在服务端用 Compose 写 UI，序列化成二进制文档，传给客户端原生渲染。

**传统服务端驱动 UI（SDUI）** 常见路径：

```text
服务端返回 JSON → 客户端解析 JSON → 映射到预定义组件 → 渲染
```

客户端须内置所有可能组件类型；新组件往往依赖发版。

**Remote Compose** 路径：

```text
服务端写 Compose 代码 → 捕获绘制操作 → 序列化为二进制 → 客户端播放渲染
```

区别在于：传输的不是「用哪个组件」的描述，而是 **实际绘制指令**。客户端不必理解「按钮」等业务语义，只需执行指令。

## 架构：Creation + Playback

### 1. Creation（创建端 / 服务端）

创建端运行在 **普通 JVM**，不需要 Android SDK。使用 `@Composable` 编写 UI，框架捕获布局层级、修饰符、文本样式、图片、动画、触摸处理等，序列化为紧凑二进制文档。

```kotlin
// 服务端代码 — 运行在普通 JVM 上
fun buildHomeScreen(): ByteArray {
    val writer = RemoteComposeWriter()
    writer.column(
        modifier = RecordingModifier()
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        text(
            text = "Welcome to Remote Compose",
            style = RemoteTextStyle(
                fontSize = 24.sp,
                fontWeight = FontWeight.Bold
            )
        )
        spacer(height = 8.dp)
        text(
            text = "This UI was built on the server",
            style = RemoteTextStyle(fontSize = 16.sp)
        )
        button(
            text = "Click Me",
            onClick = RemoteAction("navigate", "/detail")
        )
    }
    return writer.encodeToByteArray()
}
```

也可使用更高层 `remote-creation-compose` 的 Compose 风格 API：

```kotlin
// 使用 remote-creation-compose 库
@Composable
fun RemoteHomeScreen() {
    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(16.dp)
    ) {
        RemoteText(
            "Today's Deals",
            style = RemoteTextStyle(fontSize = 20.sp)
        )
        RemoteSpacer(height = 12.dp)
        FlowLayout {
            items.forEach { item ->
                ProductCard(item)
            }
        }
    }
}
```

### 2. Playback（播放端 / 客户端）

客户端下载字节交给 Player 渲染；通过 `onAction` 处理导航、埋点等：

```kotlin
// Android 客户端代码
@Composable
fun HomeScreen(viewModel: HomeViewModel = viewModel()) {
    val uiDocument by viewModel.uiDocument.collectAsState()
    RemoteComposePlayer(
        modifier = Modifier.fillMaxSize(),
        content = uiDocument,
        onAction = { action ->
            when (action.type) {
                "navigate" -> navController.navigate(action.payload)
                "analytics" -> tracker.log(action.payload)
            }
        }
    )
}
```

## 能力范围（操作类型）

Remote Compose 定义 **93+** 种操作，涵盖：

| 类别 | 能力 |
| --- | --- |
| 绘制 | 矩形、圆角矩形、圆形、文本、位图、动画路径 |
| 布局 | Column、Row、FlowLayout、修饰符（背景、边框、内边距、点击） |
| 状态 | RemoteState、RemoteBoolean、RemoteString、RemoteFloat |
| 交互 | 触摸区域、点击区域、粒子系统 |
| 动画 | 路径变形、着色器、基于时间的动画 |
| 样式 | RemoteTextStyle（可复用）、RemoteColor、RemoteShape |
| Canvas | 完整 Canvas 绘制操作 |

## 与传统 SDUI 对比

| 对比维度 | 传统 SDUI | Remote Compose |
| --- | --- | --- |
| 传输内容 | JSON/组件描述 | 原生绘制操作（二进制） |
| 组件注册 | 客户端需预注册所有组件 | 客户端零组件知识 |
| 新增组件 | 通常需客户端发版 | 服务端直接下发 |
| UI 表达力 | 受预定义模板限制 | 接近完整 Compose |
| 自定义绘制 | 几乎不支持 | 完整 Canvas |
| 动画 | 有限 | 路径变形、着色器、粒子等 |
| 包体积 | 需内置组件代码 | 主要保留播放器核心 |
| 版本同步 | 服务端/客户端模板强对齐 | 操作级兼容策略 |

核心差异：传统 SDUI 描述「渲染什么组件」，Remote Compose 描述 **怎么画**。

## 应用场景

1. **快速 A/B 测试**：不同用户组可下发完全不同的布局与交互，即时生效。  
2. **实时运营页**：大促、热点、活动页等高频变更界面由服务端控制。  
3. **Android 16 Widgets**：可向 `RemoteView` 传递 Remote Compose 二进制，用 Compose 写 Widget。  
4. **跨设备**：同一份文档在手机、平板、折叠屏、Wear OS 等由框架适配尺寸与密度。

## Gradle 依赖（示例版本）

收录时依赖版本为 **1.0.0-alpha06**；集成前请在 Android 开发者文档或 AndroidX 仓库中核对当前 artifact 与版本号。

```kotlin
dependencies {
    implementation("androidx.compose.remote:remote-core:1.0.0-alpha06")
    implementation("androidx.compose.remote:remote-creation-core:1.0.0-alpha06")
    implementation("androidx.compose.remote:remote-creation-jvm:1.0.0-alpha06")
    implementation("androidx.compose.remote:remote-creation-compose:1.0.0-alpha06")
    implementation("androidx.compose.remote:remote-player-core:1.0.0-alpha06")
    implementation("androidx.compose.remote:remote-player-view:1.0.0-alpha06")
    implementation("androidx.compose.remote:remote-tooling-preview:1.0.0-alpha06")
}
```

## 注意事项

### 安全性

服务端控制屏幕绘制内容；后端被入侵可能推送恶意 UI。应在服务端校验 payload，客户端对 **action 白名单** 过滤。

### 版本兼容

若服务端下发客户端不识别的操作，需降级策略：跳过未知节点、占位符或引导升级。

### 无障碍

服务端驱动 UI 易缺失读屏语义，需在文档中保留无障碍标签。

### 当前局限（原文所述）

- 仍为 **alpha**，API 可能变动。  
- `creation-compose` 目前主要面向 **Android**；JVM 端需偏底层 API。  
- **iOS** 支持计划约在 **2026 年下半年**。  
- 工具链仍在完善。

## 推荐架构模式

Google 建议 **混合架构**：核心路径与稳定页面用 **本地 Compose**，强运营、强实验区域用 **Remote Compose**，并配合缓存支持离线。

```text
┌─────────────────────────────────────────┐
│              你的 App                      │
├──────────────────┬──────────────────────┤
│   核心页面        │   动态内容区域         │
│   (本地 Compose)  │   (Remote Compose)    │
│                  │                      │
│   登录 / 设置     │   首页推荐流           │
│   个人中心        │   运营活动 / A/B 区域   │
└──────────────────┴──────────────────────┘
```

## 总结

- 范式从「描述渲染什么」转向「描述怎么画」。  
- 服务端具备接近完整 Compose 的表达力，客户端以播放器为主。  
- UI 更新节奏可从「周级发版」缩短到「分钟级下发」。  
- 仍处于 alpha，适合有强动态 UI 需求的业务提前关注与试验。
