<script setup lang="ts">
import { get } from '.'

const data = [
  { one: 1 },
  {
    two: 2,
    three: {
      data: 3,
    },
    other: [
      4,
      { value: 5 },
    ],
  },
]

const input = ref('[0].one')
const show = computed(() => get(data, input.value))
</script>

<template>
  <div>
    <p font-bold text-xl>
      Try it!
    </p>
    <p>data:</p>
    <pre>
      {{ data }}
    </pre>

    <input v-model="input" input>
    <p>{{ show }}</p>
  </div>
</template>
