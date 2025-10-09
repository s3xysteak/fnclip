import type { BaseOptions } from './options'
import { cyan } from 'ansis'
import consola from 'consola'
import fs from 'fs-extra'
import { join } from 'pathe'
import { handleOptions } from './options'
import { getMeta } from '../utils'

export interface ListOptions extends BaseOptions {
  remote: boolean
}

export async function list(options: Partial<ListOptions>) {
  const opts = await handleOptions(options)

  const funcs = Object.keys(await getMeta())

  if (opts.remote) {
    consola.info(funcs.join(', '))
  }
  else {
    const infoCount = (n = 0) => consola.info(`Found ${cyan`${n}`} fnclip functions${n === 0 ? '.' : ':'}`)

    const dirPath = join(opts.cwd, opts.dir)
    const isExist = await fs.exists(dirPath)
    if (!isExist)
      return infoCount()

    const list = new Set(
      (await fs.readdir(dirPath)).map(path => path.replace(/\.d?\.ts|\.js$/, '')),
    )
    list.delete('index')

    if (list.size === 0) {
      infoCount()
    }
    else {
      infoCount(list.size)
      consola.info(
        funcs.filter(name => list.has(name)).join(', '),
      )
    }
  }
}
