import type { BaseOptions } from './options'
import consola from 'consola'
import fs from 'fs-extra'
import { join } from 'pathe'
import { DEFAULT_CWD, DEFAULT_DIR } from './options'

export interface ClearOptions extends BaseOptions {}

export async function clear(options: Partial<ClearOptions> = {}) {
  const { dir, cwd } = handleClearOptions(options)

  await fs.remove(join(cwd, dir))
  consola.success('Successfully clear fnclip.')
}

export function handleClearOptions(options: Partial<ClearOptions>): ClearOptions {
  const defaultOptions: ClearOptions = {
    dir: DEFAULT_DIR,
    cwd: DEFAULT_CWD,
  }
  return Object.assign(
    {},
    defaultOptions,
    options,
  )
}
