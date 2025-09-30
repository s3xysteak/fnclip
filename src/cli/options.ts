import type { PackageJson } from 'pkg-types'
import { up as findPackage } from 'empathic/package'
import fs from 'fs-extra'

const DEFAULT_DIR = 'src/utils/fnclip'
const DEFAULT_CWD = '.'

export interface BaseOptions {
  dir: string
  cwd: string
}

export function handleClearOptions(options: Partial<ClearOptions>): ClearOptions {
  return Object.assign(
    {},
    {
      dir: DEFAULT_DIR,
      cwd: DEFAULT_CWD,
    },
    options,
  )
}
export interface ClearOptions extends BaseOptions {}

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
  }
  return Object.assign(defaultOptions, options)
}

export interface AddOptions extends BaseOptions {
  ts: boolean
  index: boolean
}
