<script setup lang="ts">
import { toArray } from '.'

const raw = [
  'hello',
  ['world'],
]
const before = ref(true)
const data = computed(() => before.value ? raw : raw.map(toArray))
</script>

<template>
  <div>
    <button mb-4 btn @click="before = !before">
      Now {{ before ? 'before' : 'after' }}
    </button>

    <div v-for="item, key in data" :key>
      {{ item }}
    </div>
  </div>
</template>
