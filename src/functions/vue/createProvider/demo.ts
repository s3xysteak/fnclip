import { ref } from 'vue'
import { createProvider } from '.'

export const [useCountProvider, useCount] = createProvider((initial = 0) => {
  return ref(initial)
})
