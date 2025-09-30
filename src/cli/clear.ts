import type { BaseOptions } from './options'
import consola from 'consola'
import fs from 'fs-extra'
import { join } from 'pathe'
import { DEFAULT_CWD, DEFAULT_DIR } from './options'

export async function clear(options: Partial<ClearOptions> = {}) {
  const { dir, cwd } = handleClearOptions(options)

  await fs.remove(join(cwd, dir))
  consola.success('Successfully clear fnclip.')
}

export function handleClearOptions(options: Partial<ClearOptions>): ClearOptions {
  return Object.assign(
    {},
    {
      dir: DEFAULT_DIR,
      cwd: DEFAULT_CWD,
    },
    options,
  )
}
export interface ClearOptions extends BaseOptions {}
