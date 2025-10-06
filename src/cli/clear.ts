import type { BaseOptions } from './options'
import consola from 'consola'
import defu from 'defu'
import fs from 'fs-extra'
import { join } from 'pathe'
import { baseOptions } from './options'

export interface ClearOptions extends BaseOptions {}

export async function clear(options: Partial<ClearOptions> = {}) {
  const { dir, cwd } = handleClearOptions(options)

  await fs.remove(join(cwd, dir))
  consola.success('Successfully clear fnclip.')
}

export function handleClearOptions(options: Partial<ClearOptions>): ClearOptions {
  return defu(
    options,
    {},
    baseOptions,
  )
  return Object.assign(
    {},
    baseOptions,
    {},
    options,
  )
}
