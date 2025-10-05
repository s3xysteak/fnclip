import fs from 'fs-extra'
import * as path from 'pathe'
import { fnclipPath } from '..'

export { fnclipPath }

export const DEFAULT_DIR = 'src/utils/fnclip'
export const DEFAULT_CWD = '.'

export interface BaseOptions {
  dir: string
  cwd: string
}

export async function getMeta() {
  const res: Record<string, string> = await fs.readJson(path.join(fnclipPath, 'funcs-meta.json'))
  return res
}

export const exportContent = (f: string) => `export * from './${f}';\n`

export function ensureExt(fullname: string, ext: string) {
  return path.extname(fullname) ? fullname : `${fullname}${ext}`
}
