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
  isTypescript: boolean
  indexFile: boolean
}

export async function add(funcs: string[], options: Partial<Options> = {}) {
  const {
    dir,
    cwd,
    isTypescript,
    indexFile,
  } = await handleOptions(options)

  const dirPath = join(cwd, dir)
  const fnclipPath = dirname(resolveModule(name)!)

  await fs.ensureDir(dirPath)

  // handle function files
  for (const func of funcs) {
    const exts = isTypescript ? ['.ts'] : ['.js', '.d.ts']

    for (const ext of exts) {
      await fs.copy(
        join(fnclipPath, `./functions/${func}${ext}`),
        join(dirPath, `${func}${ext}`),
      )

      // add comments to disable eslint/prettier etc.
      const content = await fs.readFile(join(dirPath, `${func}${ext}`), 'utf-8')
      await fs.writeFile(join(dirPath, `${func}${ext}`), addIgnoreToContent(content))
    }
  }
  consola.success(`Successfully add ${funcs.map(cyan).join(', ')}.`)

  // handle index
  if (!indexFile)
    return
  const indexPath = join(dirPath, `index${isTypescript ? '.ts' : '.js'}`)
  await fs.ensureFile(indexPath)
  const indexContent = await fs.readFile(indexPath, 'utf-8')

  const exportContent = (f: string) => `export * from './${f}';`
  await fs.writeFile(
    indexPath,
    addIgnoreToContent(indexContent + funcs.map((f) => {
      const val = exportContent(f)
      return indexContent.includes(val) ? '' : val
    }).join('\n')),
  )
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

  let isTypescript = false
  const packageJsonPath = findPackage({ cwd })
  if (packageJsonPath) {
    const contents = await fs.readFile(packageJsonPath, 'utf8')
    const obj: PackageJson = JSON.parse(contents)
    if (obj?.dependencies?.typescript || obj?.devDependencies?.typescript) {
      isTypescript = true
    }
  }

  const defaultOptions: Options = {
    dir: 'src/utils/fnclip',
    cwd,
    isTypescript,
    indexFile: true,
  }
  return Object.assign(defaultOptions, options)
}
