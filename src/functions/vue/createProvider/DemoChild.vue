<script setup lang="ts">
import { useCount } from './demo'

const count = useCount()
</script>

<template>
  <div>
    <button btn @click="count++">
      count plus!
    </button>
  </div>
</template>
