<script setup lang="ts">
import { makeDestructurable } from '.'

const raw = { name: 'John', age: 18 }
const val = makeDestructurable(raw, [raw.name, raw.age])

const { name, age } = val
const [nameArr, ageArr] = val
</script>

<template>
  <div>
    <p>{{ name }} / {{ age }}</p>
    <p>{{ nameArr }} / {{ ageArr }}</p>
  </div>
</template>
