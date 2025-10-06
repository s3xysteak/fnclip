import type { PackageJson } from 'pkg-types'
import type { FnclipOptions } from './options'
import * as pkg from 'empathic/package'
import fs from 'fs-extra'
import * as path from 'pathe'
import { fnclipPath } from '../..'

export async function getMeta() {
  const res: Record<string, string> = await fs.readJson(path.join(fnclipPath, 'funcs-meta.json'))
  return res
}

export const exportContent = (f: string) => `export * from './${f}';\n`

export function ensureExt(fullname: string, ext: string) {
  return path.extname(fullname) ? fullname : `${fullname}${ext}`
}

export async function isTypescript(cwd: string) {
  const packageJsonPath = pkg.up({ cwd })
  if (!packageJsonPath)
    return

  const obj: PackageJson = await fs.readJson(packageJsonPath)
  return !!(obj.dependencies?.typescript || obj.devDependencies?.typescript)
}

export async function updateIndex(opts: FnclipOptions) {
  if (!opts.index)
    return

  const dirPath = path.join(opts.cwd, opts.dir)
  const indexPathMaybeExt = path.join(dirPath, opts.indexPath)

  // check exist index file
  let indexRealPath: string
  for (const ext of ['.ts', '.js']) {
    const targetPath = ensureExt(indexPathMaybeExt, ext)
    if (await fs.exists(targetPath)) {
      indexRealPath = targetPath
      break
    }
  }

  indexRealPath ??= ensureExt(indexPathMaybeExt, (opts.ts ? '.ts' : '.js'))
  await fs.ensureFile(indexRealPath)

  const funcs = await fs.readdir(dirPath)
  await fs.writeFile(indexRealPath, addIgnoreToContent(funcs.map(exportContent).join('')))
}

export function addIgnoreToContent(content: string) {
  const comments = `/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

`
  return content.includes(comments) ? content : comments + content
}
