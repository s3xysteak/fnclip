import type { AddOptions, ClearOptions, ConfigOptions, ListOptions, RemoveOptions } from '..'
import defu from 'defu'
import { loadConfig } from 'unconfig'

export interface BaseOptions {
  dir: string
  cwd: string
}

// for dev
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export type FnclipOptions = AddOptions & ClearOptions & ConfigOptions & ListOptions & RemoveOptions

// for dev
type _ = Expand<FnclipOptions>
export async function handleOptions(options: Partial<FnclipOptions> = {}) {
  const cwd = options.cwd ?? '.'

  return defu(
    options,

    // load config
    (await loadConfig<Partial<FnclipOptions>>({
      sources: [
        {
          files: 'fnclip.config',
          rewrite: config => typeof config === 'function' ? config() : config,
        },
        {
          files: 'package.json',
          extensions: [],
          rewrite: (config: any) => ({ ts: !!(config.dependencies?.typescript || config.devDependencies?.typescript) }),
        },
      ],
      merge: true,
      cwd,
    })).config,

    // default options
    <FnclipOptions>{
      index: true,
      indexPath: './index',
      remote: false,
      dir: 'src/utils/fnclip',
      cwd,
    },
  )
}
