# TypeScript

TypeScript 是 JavaScript 的超集，提供静态类型检查。

## 基础类型

```ts
// 基本类型
let str: string = 'hello'
let num: number = 42
let bool: boolean = true

// 数组
let arr: number[] = [1, 2, 3]
let arr2: Array<number> = [1, 2, 3]

// 对象
let obj: { name: string; age: number } = { name: 'Tom', age: 20 }

// 函数
function add(a: number, b: number): number {
  return a + b
}
```

## 高级类型

### 联合与交叉

```ts
// 联合类型
type Status = 'pending' | 'success' | 'error'

// 交叉类型
type User = { name: string }
type Admin = User & { role: 'admin' }
```

### 泛型

```ts
function identity<T>(arg: T): T {
  return arg
}

// 泛型约束
function getLength<T extends { length: number }>(arg: T): number {
  return arg.length
}
```

### 工具类型

```ts
interface User {
  id: number
  name: string
  email: string
}

// Partial - 所有属性可选
type PartialUser = Partial<User>

// Required - 所有属性必需
type RequiredUser = Required<User>

// Pick - 选取部分属性
type UserName = Pick<User, 'id' | 'name'>

// Omit - 排除部分属性
type UserWithoutEmail = Omit<User, 'email'>

// Record - 记录类型
type UserMap = Record<string, User>
```

## 实用技巧

### 1. 类型守卫

```ts
function isUser(obj: unknown): obj is User {
  return typeof obj === 'object'
    && obj !== null
    && 'name' in obj
}

if (isUser(data)) {
  console.log(data.name) // 类型安全
}
```

### 2. 模板字面量类型

```ts
type EventName = 'click' | 'focus' | 'blur'
type Handler = `on${Capitalize<EventName>}`
// 'onClick' | 'onFocus' | 'onBlur'
```

### 3. 条件类型

```ts
type NonNullable<T> = T extends null | undefined ? never : T

type Flatten<T> = T extends Array<infer U> ? U : T
```

### 4. 声明文件

```ts
// types/my-lib.d.ts
declare module 'my-lib' {
  export function doSomething(input: string): number
  export interface Options {
    debug?: boolean
  }
}
```

## 最佳实践

### 1. 避免 any

```ts
// ❌ 不好
function process(data: any) {
  return data.value
}

// ✅ 好
function process<T extends { value: unknown }>(data: T) {
  return data.value
}
```

### 2. 使用 unknown 代替 any

```ts
// ❌ 不好
function parse(json: string): any {
  return JSON.parse(json)
}

// ✅ 好
function parse(json: string): unknown {
  return JSON.parse(json)
}
```

### 3. 优先使用 interface

```ts
// ✅ 好：interface 可扩展
interface User {
  name: string
}

interface Admin extends User {
  role: string
}

// type 不能重新打开
type User = { name: string }
// type User = { age: number } // Error
```

### 4. 使用 satisfies 约束类型

```ts
const routes = {
  home: '/',
  about: '/about',
} as const satisfies Record<string, string>
```

## 配置建议

```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "moduleResolution": "bundler",
    "esModuleInterop": true
  }
}
```