import type { BaseOptions } from './options'
import { cyan } from 'ansis'
import consola from 'consola'
import fs from 'fs-extra'
import { join } from 'pathe'
import { getMeta, groupBy } from '../utils'
import { handleOptions } from './options'

export interface ListOptions extends BaseOptions {
  remote: boolean
}

export async function list(options: Partial<ListOptions>) {
  const opts = await handleOptions(options)

  const funcs = Object.entries(await getMeta()).map(([name, path]) => ({ name, type: path.split('/')[1] }))

  if (opts.remote) {
    format(funcs)
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
    // remove index.js
    list.delete('index')

    if (list.size === 0) {
      infoCount()
    }
    else {
      infoCount(list.size)
      format(funcs.filter(({ name }) => list.has(name)))
    }
  }
}

function format(data: { name: string, type: string }[]) {
  const grouped = groupBy(data, item => item.type)
  Object.entries(grouped)
    .filter(([type, items]) => !!items && type !== 'config')
    .forEach(([type, items]) => {
      consola.info(cyan`${type}`)
      consola.info(items!.map(({ name }) => name).join(', '))
    })
}
