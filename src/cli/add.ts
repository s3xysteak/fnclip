import type { PackageJson } from 'pkg-types'
import type { BaseOptions } from './options'
import { cyan } from 'ansis'
import consola from 'consola'
import { up as findPackage } from 'empathic/package'
import fs from 'fs-extra'
import { join } from 'pathe'
import { DEFAULT_CWD, DEFAULT_DIR, ensureExt, exportContent, fnclipPath, getMeta } from './options'

export interface AddOptions extends BaseOptions {
  ts: boolean
  index: boolean
  indexPath: string
}

export async function add(funcs: string[], options: Partial<AddOptions> = {}) {
  const opt = await handleAddOptions(options)
  const ctx = createCtx(funcs, opt)

  await ctx.handleFunctions()
  consola.success(`Successfully add ${funcs.map(cyan).join(', ')}.`)

  if (!opt.index)
    return
  await ctx.handleIndex()
  consola.success(`Successfully update ${cyan`index`} file.`)
}

function createCtx(funcs: string[], options: AddOptions) {
  const {
    dir,
    cwd,
    ts,
    indexPath,
  } = options
  const dirPath = join(cwd, dir)

  return {
    handleFunctions: async () => {
      const meta = await getMeta()

      // handle function files
      await fs.ensureDir(dirPath)
      for (const func of funcs) {
        const exts = ts ? ['.ts'] : ['.js', '.d.ts']

        for (const ext of exts) {
          await fs.copy(
            join(fnclipPath, ensureExt(meta[func], ext)),
            join(dirPath, ensureExt(func, ext)),
          )

          // add comments to disable eslint/prettier etc.
          const content = await fs.readFile(join(dirPath, ensureExt(func, ext)), 'utf-8')
          await fs.writeFile(join(dirPath, ensureExt(func, ext)), addIgnoreToContent(content))
        }
      }
    },

    handleIndex: async () => {
      const indexPathMaybeExt = join(dirPath, indexPath)

      // check exist index file
      let indexRealPath: string
      for (const ext of ['.ts', '.js']) {
        if (await fs.exists(ensureExt(indexPathMaybeExt, ext))) {
          indexRealPath = ensureExt(indexPathMaybeExt, ext)
          break
        }
      }

      indexRealPath ??= indexPathMaybeExt + (ts ? '.ts' : '.js')

      await fs.ensureFile(indexRealPath)
      const indexContent = await fs.readFile(indexRealPath, 'utf-8')

      await fs.writeFile(
        indexRealPath,
        addIgnoreToContent(indexContent + funcs.map((f) => {
          const val = exportContent(f)
          return indexContent.includes(val) ? '' : val
        }).join('\n')),
      )
    },
  }
}

function addIgnoreToContent(content: string) {
  const comments = `/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

`
  return content.includes(comments) ? content : comments + content
}

export async function handleAddOptions(options: Partial<AddOptions>): Promise<AddOptions> {
  const cwd = options.cwd || DEFAULT_CWD

  let ts = false
  const packageJsonPath = findPackage({ cwd })
  if (packageJsonPath) {
    const contents = await fs.readFile(packageJsonPath, 'utf8')
    const obj: PackageJson = JSON.parse(contents)
    if (obj?.dependencies?.typescript || obj?.devDependencies?.typescript) {
      ts = true
    }
  }

  const defaultOptions: AddOptions = {
    dir: DEFAULT_DIR,
    cwd,
    ts,
    index: true,
    indexPath: './index',
  }
  return Object.assign(defaultOptions, options)
}
