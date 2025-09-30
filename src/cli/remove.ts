import type { BaseOptions } from './options'
import { cyan } from 'ansis'
import consola from 'consola'
import fs from 'fs-extra'
import { join } from 'pathe'
import { DEFAULT_CWD, DEFAULT_DIR, exportContent, getMeta } from './options'

export interface RemoveOptions extends BaseOptions { }

export async function remove(funcs: string[], options: Partial<RemoveOptions>) {
  const opts = handleRemoveOptions(options)

  const logger = createLogger()
  if (funcs.length === 0)
    return logger.count()

  const meta = await getMeta()
  const dirPath = join(opts.cwd, opts.dir)

  for (const func of funcs) {
    if (!meta[func]) {
      consola.warn(`Function ${cyan`${func}`} not exist in fnclip library.`)
      continue
    }

    // func file
    let exist = false
    for (const ext of ['.ts', '.js', '.d.ts']) {
      const path = join(dirPath, `${func}${ext}`)
      if (await fs.pathExists(path)) {
        await fs.remove(path)
        exist = true
      }
    }
    if (!exist) {
      consola.warn(`Function ${cyan`${func}`} seems to be not installed.`)
      continue
    }

    // index
    for (const ext of ['.js', '.ts']) {
      const path = join(dirPath, `index${ext}`)
      if (await fs.exists(path)) {
        const content = await fs.readFile(path, 'utf-8')
        await fs.writeFile(path, content.replace(exportContent(func), ''))
        break
      }
    }

    logger.addSuccess(func)
  }
  logger.success()
}

function createLogger() {
  const successFuncs: string[] = []

  const count = (n = 0) => consola.info(`Remove ${cyan`${n}`} fnclip functions${n === 0 ? '.' : ':'}`)

  return {
    count,
    success: () => {
      count(successFuncs.length)

      if (successFuncs.length === 0)
        return

      consola.info(`Success remove ${successFuncs.map(cyan).join(', ')}.`)
    },
    addSuccess: (func: string) => successFuncs.push(func),
  }
}

export function handleRemoveOptions(opts: Partial<RemoveOptions>): RemoveOptions {
  const defaultOptions: RemoveOptions = {
    cwd: DEFAULT_CWD,
    dir: DEFAULT_DIR,
  }

  return Object.assign(
    {},
    defaultOptions,
    opts,
  )
}
