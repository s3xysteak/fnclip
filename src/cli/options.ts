import type { PackageJson } from 'pkg-types'
import type { AddOptions, ClearOptions, ConfigOptions, ListOptions, RemoveOptions } from '..'
import defu from 'defu'
import * as pkg from 'empathic/package'
import fs from 'fs-extra'
import * as path from 'pathe'
import { loadConfig } from 'unconfig'
import { fnclipPath } from '..'

export { fnclipPath }

export interface BaseOptions {
  dir: string
  cwd: string
}

// for dev
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

type Options = AddOptions & ClearOptions & ConfigOptions & ListOptions & RemoveOptions

// for dev
type _ = Expand<Options>
export async function handleOptions(options: Partial<Options> = {}) {
  return defu(
    options,

    // load config
    (await loadConfig<Partial<Options>>({
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
    })).config,

    // default options
    <Options>{
      index: true,
      indexPath: './index',
      remote: false,
      dir: 'src/utils/fnclip',
      cwd: '.',
    },
  )
}

export async function getMeta() {
  const res: Record<string, string> = await fs.readJson(path.join(fnclipPath, 'funcs-meta.json'))
  return res
}

export const exportContent = (f: string) => `export * from './${f}';\n`

export function ensureExt(fullname: string, ext: string) {
  return path.extname(fullname) ? fullname : `${fullname}${ext}`
}

export async function isTypescript(cwd: string) {
  const packageJsonPath = pkg.up({ cwd })
  if (!packageJsonPath)
    return

  const obj: PackageJson = await fs.readJson(packageJsonPath)
  return !!(obj.dependencies?.typescript || obj.devDependencies?.typescript)
}
