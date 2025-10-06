import type { PackageJson } from 'pkg-types'
import * as pkg from 'empathic/package'
import fs from 'fs-extra'
import * as path from 'pathe'

import { fnclipPath } from '..'

export { fnclipPath }

export const baseOptions: Readonly<BaseOptions> = {
  dir: 'src/utils/fnclip',
  cwd: '.',
}

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

export async function isTypescript(cwd?: string) {
  const packageJsonPath = pkg.up({ cwd: cwd ?? baseOptions.cwd })
  if (!packageJsonPath)
    return

  const obj: PackageJson = await fs.readJson(packageJsonPath)
  return !!(obj.dependencies?.typescript || obj.devDependencies?.typescript)
}
