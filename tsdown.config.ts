import { glob } from 'tinyglobby'
import { defineConfig } from 'tsdown'
import { updateFuncsMeta } from './scripts/share'

export default defineConfig(async () => {
  const files = await glob('src/functions/*/*/index.ts')

  return {
    entry: [
      ...files,
      'src/{index,run}.ts',
    ],
    copy: [
      ...files.map(path => ({ from: path, to: path.replace('src', 'dist') })),
      'src/funcs-meta.json',
    ],
    publint: true,
    hooks(hooks) {
      // update funcs-meta.json
      hooks.hook('build:prepare', () => updateFuncsMeta(files))
    },
  }
})
