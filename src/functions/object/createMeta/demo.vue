<script setup lang="ts">
import { createMeta } from '.'

// assume this is a very complex object
const obj = ref({ hello: 'world' })

const [set, get] = createMeta<'set!' | 'not yet'>()
set(obj.value, 'not yet')

const val = computed(() => get(obj.value))
const hasSet = computed(() => val.value === 'set!')
</script>

<template>
  <div>
    <button btn @click="set(obj, hasSet ? 'not yet' : 'set!')">
      {{ hasSet ? 'Reverse' : 'Set' }}
    </button>

    <p>{{ val }}</p>
  </div>
</template>
