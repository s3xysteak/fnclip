import fs from 'fs-extra'
import { glob } from 'tinyglobby'

export async function updateFuncsMeta(files?: string[]) {
  await fs.writeFile(
    'src/funcs-meta.json',
    JSON.stringify(
      Object.fromEntries(
        (files ?? await glob([
          'src/functions/*/*/index.ts',
          'src/functions/config/config/fnclip.config.ts',
        ]))
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
}
