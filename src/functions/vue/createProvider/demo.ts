import { computed, ref } from 'vue'
import { createProvider } from '.'

export const [useCountProvider, useCount] = createProvider((initial = 0) => {
  const count = ref(initial)

  return {
    count,
    doubleCount: computed(() => count.value * 2),
    increment: () => { count.value++ },
  }
})
