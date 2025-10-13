import type { BaseOptions } from './options'
import { cyan } from 'ansis'
import consola from 'consola'
import fs from 'fs-extra'
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

  await updateIndex(opts)
  consola.success(`Successfully update ${cyan`index`} file.`)
}
