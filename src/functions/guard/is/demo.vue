<script setup lang="ts">
import { createTest } from './createTest'

const test = Object.entries(createTest())
</script>

<template>
  <div>
    <div v-for="([key, value]) in test" :key>
      <h3>{{ key }}</h3>
      <div v-for="([input, expect], i) in value" :key="i" flex="~ gap-2 items-center">
        <code>{{ input.toString().replace('() => is.', '') }}</code>
        ->
        <span
          b="1 solid" :class="expect ? 'bg-green/15 b-green' : 'bg-red/15 b-red'"
          leading-none rounded-full p="x-2 y-1" text-sm
        >
          {{ expect }}
        </span>
      </div>
    </div>
  </div>
</template>
