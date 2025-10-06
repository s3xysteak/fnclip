import type { BaseOptions } from './shared/options'
import { cyan } from 'ansis'
import consola from 'consola'
import fs from 'fs-extra'
import { join } from 'pathe'
import { handleOptions } from './shared/options'
import { getMeta, updateIndex } from './shared/utils'

export interface RemoveOptions extends BaseOptions { }

export async function remove(funcs: string[], options: Partial<RemoveOptions>) {
  const opts = await handleOptions(options)

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
    await updateIndex(opts)

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
