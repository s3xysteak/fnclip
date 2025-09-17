import type { PackageJson } from 'pkg-types'
import { cyan } from 'ansis'
import consola from 'consola'
import { up as findPackage } from 'empathic/package'
import fs from 'fs-extra'
import { resolveModule } from 'local-pkg'
import { dirname, join } from 'pathe'
import { name } from '../package.json'

export interface Options {
  dir: string
  cwd: string
  ts: boolean
  index: boolean
}

export async function add(funcs: string[], options: Partial<Options> = {}) {
  const opt = await handleOptions(options)
  const ctx = createCtx(funcs, opt)

  await ctx.handleFunctions()
  consola.success(`Successfully add ${funcs.map(cyan).join(', ')}.`)

  // handle index
  if (!opt.index)
    return
  await ctx.handleIndex()
  consola.success(`Successfully update ${cyan`index`} file.`)
}

export async function clear(options: Partial<Options> = {}) {
  const { dir, cwd } = await handleOptions(options)

  await fs.remove(join(cwd, dir))
  consola.success('Successfully clear fnclip.')
}

function addIgnoreToContent(content: string) {
  const comments = `/* eslint-disable */
/* prettier-ignore */
// @ts-nocheck

`
  return content.includes(comments) ? content : comments + content
}

async function handleOptions(options: Partial<Options>): Promise<Options> {
  const cwd = options.cwd || '.'

  let ts = false
  const packageJsonPath = findPackage({ cwd })
  if (packageJsonPath) {
    const contents = await fs.readFile(packageJsonPath, 'utf8')
    const obj: PackageJson = JSON.parse(contents)
    if (obj?.dependencies?.typescript || obj?.devDependencies?.typescript) {
      ts = true
    }
  }

  const defaultOptions: Options = {
    dir: 'src/utils/fnclip',
    cwd,
    ts,
    index: true,
  }
  return Object.assign(defaultOptions, options)
}

function createCtx(funcs: string[], options: Options) {
  const {
    dir,
    cwd,
    ts,
  } = options
  const dirPath = join(cwd, dir)

  return {
    handleFunctions: async () => {
      const fnclipPath = dirname(resolveModule(name)!)
      const meta: Record<string, string> = await fs.readJSON(join(fnclipPath, 'funcs-meta.json'))

      // handle function files
      await fs.ensureDir(dirPath)
      for (const func of funcs) {
        const exts = ts ? ['.ts'] : ['.js', '.d.ts']

        for (const ext of exts) {
          await fs.copy(
            join(fnclipPath, `${meta[func]}${ext}`),
            join(dirPath, `${func}${ext}`),
          )

          // add comments to disable eslint/prettier etc.
          const content = await fs.readFile(join(dirPath, `${func}${ext}`), 'utf-8')
          await fs.writeFile(join(dirPath, `${func}${ext}`), addIgnoreToContent(content))
        }
      }
    },

    handleIndex: async () => {
      const indexPathNoExt = join(dirPath, 'index')

      // check exist index file
      let indexPath: string
      for (const ext of ['.ts', '.js']) {
        if (await fs.exists(indexPathNoExt + ext)) {
          indexPath = indexPathNoExt + ext
          break
        }
      }

      indexPath ??= indexPathNoExt + (ts ? '.ts' : '.js')

      await fs.ensureFile(indexPath)
      const indexContent = await fs.readFile(indexPath, 'utf-8')

      const exportContent = (f: string) => `export * from './${f}';\n`
      await fs.writeFile(
        indexPath,
        addIgnoreToContent(indexContent + funcs.map((f) => {
          const val = exportContent(f)
          return indexContent.includes(val) ? '' : val
        }).join('\n')),
      )
    },
  }
}
