import type { BaseOptions } from './options'

import fs from 'fs-extra'
import * as path from 'pathe'
import { fnclipPath } from '..'
import { getMeta } from '../utils'
import { handleOptions } from './options'

export interface ConfigOptions extends BaseOptions {
  ts: boolean
}

export async function config(options: Partial<ConfigOptions> = {}) {
  const opts = await handleOptions(options)

  const meta = await getMeta()
  const ext = opts.ts ? '.ts' : '.js'
  const configPath = path.join(fnclipPath, `${meta.config}${ext}`)
  await fs.copy(configPath, path.join(opts.cwd, `fnclip.config${ext}`))
}
