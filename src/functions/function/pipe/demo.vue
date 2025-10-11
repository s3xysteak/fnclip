<script setup lang="ts">
import { pipe } from '.'

const increaseThenDoubleOne: number
  = pipe(1, x => x + 1, x => x * 2)
</script>

<template>
  <div>
    {{ increaseThenDoubleOne }}
  </div>
</template>
