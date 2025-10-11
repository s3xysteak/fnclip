<script setup lang="ts">
import { flow } from '.'

const increaseThenDouble: (x: number) => number
  = flow((x: number) => x + 1, x => x * 2)
</script>

<template>
  <div>
    {{ increaseThenDouble(1) }}
  </div>
</template>
