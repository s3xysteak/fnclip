import type { BaseOptions } from './options'
import * as fs from 'node:fs/promises'
import consola from 'consola'
import { join } from 'pathe'
import { handleOptions } from './options'

export interface ClearOptions extends BaseOptions {}

export async function clear(options: Partial<ClearOptions> = {}) {
  const { dir, cwd } = await handleOptions(options)

  await fs.rm(join(cwd, dir), { recursive: true, force: true })
  consola.success('Successfully clear fnclip.')
}
