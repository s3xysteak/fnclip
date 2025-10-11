<script setup lang="ts">
import { objectMap } from '.'

const obj = { one: 1, key: 'value' }
</script>

<template>
  <div>
    <p>{{ obj }}</p>
    <p>{{ objectMap(obj, (k, v) => [v, k]) }}</p>
  </div>
</template>
