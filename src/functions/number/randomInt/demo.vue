<script setup lang="ts">
import { randomInt } from '.'

const data = ref(-1)
</script>

<template>
  <div>
    <button btn @click="data = randomInt(0, 100)">
      Roll!
    </button>
    <p>{{ data }}</p>
  </div>
</template>
