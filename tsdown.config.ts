import { glob } from 'tinyglobby'
import { defineConfig } from 'tsdown'
import { updateFuncsMeta } from './scripts/shared'

export default defineConfig(async () => {
  const files = await glob('src/functions/*/*/index.ts')

  return {
    entry: [
      ...files,
      'src/{index,run}.ts',
    ],
    copy: [
      ...files.map(path => ({ from: path, to: path.replace('src', 'dist') })),
      'funcs-meta.json',
    ],
    publint: true,
    hooks: {
      'build:prepare': () => updateFuncsMeta(),
    },
  }
})
