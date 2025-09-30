import fs from 'fs-extra'
import { join } from 'pathe'
import { fnclipPath } from '..'

export { fnclipPath }

export const DEFAULT_DIR = 'src/utils/fnclip'
export const DEFAULT_CWD = '.'

export interface BaseOptions {
  dir: string
  cwd: string
}

export async function getMeta() {
  const res: Record<string, string> = await fs.readJson(join(fnclipPath, 'funcs-meta.json'))
  return res
}
