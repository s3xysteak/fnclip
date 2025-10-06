import type { BaseOptions } from './options'
import { cyan } from 'ansis'
import consola from 'consola'
import defu from 'defu'
import fs from 'fs-extra'
import * as path from 'pathe'
import { baseOptions, ensureExt, exportContent, fnclipPath, getMeta, isTypescript } from './options'

export interface AddOptions extends BaseOptions {
  ts: boolean
  index: boolean
  indexPath: string
}

export async function add(funcs: string[], options: Partial<AddOptions> = {}) {
  const cwd = options.cwd || baseOptions.cwd
  const opts = defu(
    options,
    <AddOptions>{
      dir: baseOptions.dir,
      cwd,
      ts: await isTypescript(cwd) ?? false,
      index: true,
      indexPath: './index',
    },
    baseOptions,
  )

  const dirPath = path.join(opts.cwd, opts.dir)

  const meta = await getMeta()

  // handle function files
  await fs.ensureDir(dirPath)
  for (const func of funcs) {
    const exts = opts.ts ? ['.ts'] : ['.js', '.d.ts']

    for (const ext of exts) {
      const targetPath = ensureExt(func, ext)
      await fs.copy(
        path.join(fnclipPath, ensureExt(meta[func], ext)),
        path.join(dirPath, targetPath),
      )

      // add comments to disable eslint/prettier etc.
      const content = await fs.readFile(path.join(dirPath, targetPath), 'utf-8')
      await fs.writeFile(path.join(dirPath, targetPath), addIgnoreToContent(content))
    }
  }
  consola.success(`Successfully add ${funcs.map(cyan).join(', ')}.`)

  if (!opts.index)
    return
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

  indexRealPath ??= indexPathMaybeExt + (opts.ts ? '.ts' : '.js')

  await fs.ensureFile(indexRealPath)
  const indexContent = await fs.readFile(indexRealPath, 'utf-8')

  await fs.writeFile(
    indexRealPath,
    addIgnoreToContent(indexContent + funcs.map((f) => {
      const val = exportContent(f)
      return indexContent.includes(val) ? '' : val
    }).join('\n')),
  )
  consola.success(`Successfully update ${cyan`index`} file.`)
}

function addIgnoreToContent(content: string) {
  const comments = `/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

`
  return content.includes(comments) ? content : comments + content
}
