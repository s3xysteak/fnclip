A utility function to simplify the creation of Vue `provide` / `inject` pairs. It internally maintains a symbol as the injection key and exposes composables using provide/inject externally.

`const [provider, injector] = createProvider(setup)`

It returns two composables. The first one is the provider which is for the father component, and the other one is injector. These functions return their values as-is without performing any additional processing.

It receives a setup function, which has the same param as the provider, and the same return as the provider and injector. This function will be called in provider.

```ts
// basically
export const [useCountProvider, useCount] = createProvider(() => {
  const count = ref(0)
  return count
})

// receive params from provider
createProvider((initial: number) => {
  return ref(initial)
})
```

In father component:

```ts
// basically
// It is using `provide` inside so you should use it in setup context
useCountProvider()

// return value, and pass params
const count = useCountProvider(0)
```

In child component:

```ts
// It is using `inject` inside so you should use it in setup context
const count = useCount()
watchEffect(() => console.log(count.value))
```

Complex usage:

```ts
export const [useTestProvider] = createProvider(() => {
  // this function will be called in provider function, so you can use composables inside.
  const { x, y } = useMouse()

  // you can return a object, map, set...anything you want.
  return {
    x,
    y,
    fixed: computed(() => `left: ${x}px; top: ${y}px;`)
  }
})

// father component
const { x } = useTestProvider()
```

You can also customize inject function. You should rarely use it; it's typically employed only when you need to process the inject function. For data processing similar to the example, the handling should be completed within the setup function.

```ts
createProvider(() => ref(0), (key) => {
  const result = inject(key)
  return result === 0 ? 'no value!' : 'has value!'
})
```

## For the demo below

```ts
// demo.ts
export const [useCountProvider, useCount] = createProvider((initial = 0) => {
  const count = ref(initial)

  return {
    count,
    doubleCount: computed(() => count.value * 2),
    increment: () => { count.value++ },
  }
})
```

```vue
<script setup lang="ts">
// DemoChild.vue
import { useCount } from './demo'

const { increment, count } = useCount()
</script>

<template>
  <div>
    <button btn @click="increment()">
      Increment {{ count }}
    </button>
  </div>
</template>
```

About `demo.vue` please check below chapter.
