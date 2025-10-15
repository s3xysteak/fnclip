<script setup lang="ts">
import { isInRange } from '.'

const left = ref(0)
const right = ref(10)

const middle = ref(5)

const show = computed(() => isInRange(middle.value, [left.value, right.value]))
</script>

<template>
  <div>
    <div flex="~ gap-2">
      <input v-model="left" w-30 input type="number">
      <span flex="~ center">
        {{ '<=' }}
      </span>
      <input v-model="middle" w-30 input type="number">
      <span flex="~ center">
        {{ '<=' }}
      </span>
      <input v-model="right" w-30 input type="number">
    </div>
    <p :class="show ? 'c-green' : 'c-red'">
      {{ show }}
    </p>
  </div>
</template>
