<script setup lang="ts">
import { shuffle } from '.'

const arr = ref(['🍅', '🥑', '🍇', '🌽', '🍑'])
</script>

<template>
  <div>
    <button btn @click="shuffle(arr)">
      Shuffle!
    </button>

    <div flex="~ gap-4">
      <p v-for="key in arr" :key>
        {{ key }}
      </p>
    </div>
  </div>
</template>
