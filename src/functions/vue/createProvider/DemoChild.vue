<script setup lang="ts">
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
