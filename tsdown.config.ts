import fs from 'fs-extra'
import { glob } from 'tinyglobby'
import { defineConfig } from 'tsdown'

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
      hooks.hook('build:prepare', async () => {
        await fs.writeFile(
          'src/funcs-meta.json',
          JSON.stringify(
            Object.fromEntries(
              (files)
                .map(p => [
                  p.split('/')[3],
                  p.replace('src/', '').replace('.ts', ''),
                ])
                .sort(),
            ),
            null,
            2,
          ),
        )
      })
    },
  }
})
