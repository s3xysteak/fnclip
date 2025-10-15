<script setup lang="ts">
import { useCountProvider } from './demo'
import DemoChild from './DemoChild.vue'

const { doubleCount } = useCountProvider(10)
</script>

<template>
  <div>
    <p>father double count: {{ doubleCount }}</p>
    <DemoChild />
  </div>
</template>
