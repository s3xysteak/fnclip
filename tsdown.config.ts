import { glob } from 'tinyglobby'
import { defineConfig } from 'tsdown'

export default defineConfig(async () => {
  const files = await glob('src/functions/*.ts')

  return {
    entry: [
      ...files,
      'src/{index,run}.ts',
    ],
    copy: files.map(path => ({ from: path, to: path.replace('src', 'dist') })),
    publint: true,
  }
})
