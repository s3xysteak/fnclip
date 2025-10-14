<script setup lang="ts">
import { useCountProvider } from './demo'
import DemoChild from './DemoChild.vue'

const count = useCountProvider(10)
</script>

<template>
  <div>
    <p>father count: {{ count }}</p>
    <DemoChild />
  </div>
</template>
