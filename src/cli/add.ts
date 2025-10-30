import type { BaseOptions } from './options'
import * as fs from 'node:fs/promises'
import { cyan } from 'ansis'

import consola from 'consola'
import * as path from 'pathe'
import { fnclipPath } from '..'
import { addIgnoreToContent, ensureExt, getMeta, updateIndex } from '../utils'
import { handleOptions } from './options'

export interface AddOptions extends BaseOptions {
  ts: boolean
  index: boolean
  indexPath: string
}

export async function add(funcs: string[], options: Partial<AddOptions> = {}) {
  const opts = await handleOptions(options)

  const dirPath = path.join(opts.cwd, opts.dir)

  const meta = await getMeta()
  const allFuncsSet = new Set(Object.keys(meta))

  // handle function files
  await fs.mkdir(dirPath, { recursive: true })
  for (const func of funcs) {
    if (!allFuncsSet.has(func)) {
      consola.warn(`Function ${cyan(func)} not exist, skip it.`)
      continue
    }

    const exts = opts.ts ? ['.ts'] : ['.js', '.d.ts']

    for (const ext of exts) {
      const targetPath = ensureExt(func, ext)
      await fs.cp(
        path.join(fnclipPath, ensureExt(meta[func], ext)),
        path.join(dirPath, targetPath),
        { recursive: true, force: true },
      )

      // add comments to disable eslint/prettier etc.
      const content = await fs.readFile(path.join(dirPath, targetPath), 'utf-8')
      await fs.writeFile(path.join(dirPath, targetPath), addIgnoreToContent(content))
    }
  }
  consola.success(`Successfully add ${funcs.map(cyan).join(', ')}.`)

  await updateIndex(opts)
  consola.success(`Successfully update ${cyan`index`} file.`)
}
