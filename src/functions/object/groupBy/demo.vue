<script setup lang="ts">
import { groupBy } from '.'

const data = [
  { type: 'apple', size: 2 },
  { type: 'banana', size: 3 },
  { type: 'pear', size: 2 },
  { type: 'mango', size: 1 },
  { type: 'apple', size: 4 },
  { type: 'banana', size: 6 },
  { type: 'pear', size: 6, special: true },
]
const show = JSON.stringify(
  groupBy(data, item => item.type),
  null,
  2,
)
</script>

<template>
  <pre>
    <code>
      {{ show }}
    </code>
  </pre>
</template>
