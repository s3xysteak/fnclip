A list of `is` functions.

<script setup lang="ts">
import { createTest } from './createTest'

const funcs = Object.keys(createTest()).sort()
</script>

<ul>
  <li v-for="key in funcs" :key>
    <code>{{ key }}</code>
  </li>
</ul>
