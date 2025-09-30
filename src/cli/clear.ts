import type { ClearOptions } from './options'
import consola from 'consola'
import fs from 'fs-extra'
import { join } from 'pathe'
import { handleClearOptions } from './options'

export async function clear(options: Partial<ClearOptions> = {}) {
  const { dir, cwd } = handleClearOptions(options)

  await fs.remove(join(cwd, dir))
  consola.success('Successfully clear fnclip.')
}
