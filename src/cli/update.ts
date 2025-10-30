import type { AddOptions } from './add'
import * as fs from 'node:fs/promises'
import * as path from 'pathe'
import { add } from './add'
import { handleOptions } from './options'

export interface UpdateOptions extends AddOptions {}

export async function update(options: UpdateOptions) {
  const opts = await handleOptions(options)

  const dirPath = path.join(opts.cwd, opts.dir)

  const set = new Set(
    (await fs.readdir(dirPath)).map(
      p => p.replace(/\.(?:ts|js|d\.ts)$/, ''),
    ),
  )
  set.delete('index')

  await add([...set], opts)
}
