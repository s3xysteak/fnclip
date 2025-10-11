<script setup lang="ts">
import { createPromiseQueue } from '.'

const val = ref('')
const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
async function update() {
  val.value = ''

  const queue = createPromiseQueue()
  queue
    .run(() => sleep(1), () => { val.value += '1 done!' })
    .run(() => sleep(1000), () => { val.value += '2 done!' })
    .run(() => sleep(500), () => { val.value += '3 done!' })

  await queue.wait()
}
</script>

<template>
  <div>
    <button btn @click="update">
      Update
    </button>

    <p>{{ val }}</p>
  </div>
</template>
