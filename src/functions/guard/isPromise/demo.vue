<script setup lang="ts">
import { isPromise } from '.'

const res = [
  isPromise(Promise.resolve()),
  isPromise(new Promise(() => { })),
  isPromise({ then: () => { } }),

  isPromise(1),
  isPromise(undefined),
  isPromise({}),
]
</script>

<template>
  <div>
    <p v-for="i, key in res" :key :class="i ? 'c-green' : 'c-red'">
      {{ i }}
    </p>
  </div>
</template>
