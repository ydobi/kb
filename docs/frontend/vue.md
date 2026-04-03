# Vue

Vue 是渐进式 JavaScript 框架，易于上手且功能强大。

## 核心概念

### 组合式 API (Composition API)

```vue
<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

// 响应式状态
const count = ref(0)

// 计算属性
const doubled = computed(() => count.value * 2)

// 方法
function increment() {
  count.value++
}

// 生命周期
onMounted(() => {
  console.log('mounted')
})
</script>

<template>
  <div>
    <p>Count: {{ count }}</p>
    <p>Doubled: {{ doubled }}</p>
    <button @click="increment">+1</button>
  </div>
</template>
```

### 响应式系统

```ts
// ref - 基本类型
const count = ref(0)

// reactive - 对象
const state = reactive({ name: '', age: 0 })

// readonly - 只读
const readonlyState = readonly(state)

// toRef / toRefs - 解构保持响应性
const { name, age } = toRefs(state)
```

## 最佳实践

### 1. 组件设计

```vue
<!-- ✅ 好：Props 定义清晰 -->
<script setup lang="ts">
interface Props {
  user: User
  onUpdate?: (user: User) => void
}

const props = defineProps<Props>()
const emit = defineEmits<{
  update: [user: User]
}>()
</script>
```

### 2. 组合式函数

```ts
// composables/useUser.ts
export function useUser(id: Ref<string>) {
  const user = ref<User | null>(null)
  const loading = ref(false)

  async function fetchUser() {
    loading.value = true
    user.value = await api.getUser(id.value)
    loading.value = false
  }

  watch(id, fetchUser, { immediate: true })

  return { user, loading, refetch: fetchUser }
}
```

### 3. 状态管理

```ts
// stores/user.ts
export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  function setUser(u: User) {
    user.value = u
  }

  return { user, setUser }
})
```

### 4. 性能优化

```vue
<script setup>
// 异步组件
const AsyncComponent = defineAsyncComponent(() =>
  import('./HeavyComponent.vue')
)

// v-once 静态内容
</script>

<template>
  <!-- 懒加载 -->
  <Suspense>
    <AsyncComponent />
  </Suspense>

  <!-- 静态提升 -->
  <div v-once>
    <h1>Static Content</h1>
  </div>
</template>
```

## 常用模式

### Provide/Inject

```ts
// 父组件
provide('theme', theme)

// 子组件
const theme = inject('theme')
```

### 自定义指令

```ts
const vFocus = {
  mounted(el: HTMLElement) {
    el.focus()
  }
}
```

## 推荐工具

- **状态管理**: Pinia
- **路由**: Vue Router
- **表单**: VeeValidate
- **UI 库**: Element Plus, Naive UI, VueUse