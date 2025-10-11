<script setup lang="ts">
import { createMeta } from '.'

// assume this is a very complex object
const obj = ref({ hello: 'world' })

const [set, get] = createMeta<boolean>()
set(obj.value, false)

const val = computed(() => get(obj.value))
</script>

<template>
  <div>
    <button btn @click="set(obj, !val)">
      {{ val ? 'Set' : 'Reverse' }}
    </button>
    <p>{{ val }}</p>
  </div>
</template>
