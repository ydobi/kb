# React

React 是用于构建用户界面的 JavaScript 库。

## 核心概念

### 组件

```tsx
// 函数组件
function Welcome({ name }: { name: string }) {
  return <h1>Hello, {name}</h1>
}
```

### Hooks

```tsx
// useState - 状态管理
const [count, setCount] = useState(0)

// useEffect - 副作用
useEffect(() => {
  document.title = `Count: ${count}`
}, [count])

// useCallback - 回调缓存
const handleClick = useCallback(() => {
  setCount(c => c + 1)
}, [])

// useMemo - 值缓存
const doubled = useMemo(() => count * 2, [count])
```

## 最佳实践

### 1. 组件拆分

```tsx
// ✅ 好：职责单一
function UserCard({ user }: { user: User }) {
  return (
    <div className="card">
      <UserAvatar user={user} />
      <UserInfo user={user} />
    </div>
  )
}

// ❌ 不好：职责混杂
function UserCard({ user }: { user: User }) {
  // 200 行混杂逻辑
}
```

### 2. 状态管理选择

| 场景 | 推荐方案 |
|------|----------|
| 组件内状态 | useState |
| 跨组件共享 | Context + useReducer |
| 复杂全局状态 | Zustand / Jotai |
| 服务端状态 | TanStack Query |

### 3. 性能优化

```tsx
// 使用 React.memo 避免不必要渲染
const UserAvatar = memo(function UserAvatar({ user }: { user: User }) {
  return <img src={user.avatar} alt={user.name} />
})

// 使用 useTransition 处理低优先级更新
const [isPending, startTransition] = useTransition()
startTransition(() => {
  // 低优先级更新
})
```

### 4. 错误处理

```tsx
// Error Boundary
class ErrorBoundary extends Component {
  state = { hasError: false }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>
    }
    return this.props.children
  }
}
```

## 常用模式

### 自定义 Hook

```tsx
function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : initialValue
  })

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value))
  }, [key, value])

  return [value, setValue] as const
}
```

### Compound Components

```tsx
function Tabs({ children }: { children: ReactNode }) {
  const [active, setActive] = useState(0)
  return (
    <TabsContext.Provider value={{ active, setActive }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.List = function List({ children }) { /* ... */ }
Tabs.Panel = function Panel({ children }) { /* ... */ }

// 使用
<Tabs>
  <Tabs.List>...</Tabs.List>
  <Tabs.Panel>...</Tabs.Panel>
</Tabs>
```

## 推荐工具

- **状态管理**: Zustand, Jotai, TanStack Query
- **路由**: TanStack Router, React Router
- **表单**: React Hook Form, Formik
- **UI 库**: shadcn/ui, Radix UI, Ant Design