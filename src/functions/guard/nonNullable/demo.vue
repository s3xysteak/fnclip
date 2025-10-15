<script setup lang="ts">
import { nonNullable } from '.'

const raw = ['hello', null, 'world']
const filtered = raw.filter(nonNullable)
</script>

<template>
  <div>
    <p>{{ raw }}</p>
    <p>{{ filtered }}</p>

    <p>{{ nonNullable(0) }}</p>
    <p>{{ nonNullable(null) }}</p>
    <p>{{ nonNullable(undefined) }}</p>
  </div>
</template>
