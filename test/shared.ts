import * as fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import * as path from 'pathe'
import { x } from 'tinyexec'

export function createJoin(...base: string[]) {
  const fn = (...paths: string[]) => path.join(...base, ...(paths.length ? paths : ['.']))
  return Object.assign(fn, {
    createJoin: (...paths: string[]) => createJoin(...base, ...paths),
  })
}

export const rootJoin = createJoin(fileURLToPath(new URL('.', import.meta.url)), 'fixture')
export const cwd = './test/fixture'

export async function run(command: string, args?: string[]) {
  const splittedCommand = command.split(' ')
  const result = await x(args ? command : splittedCommand[0], args ?? splittedCommand.slice(1), { nodeOptions: { cwd } })

  /* eslint-disable no-console */
  result.stdout && console.log(result.stdout)
  result.stderr && console.error(result.stderr)

  return result
}

export async function exist(pathname: string) {
  try {
    await fs.access(pathname)
    return true
  }
  catch {
    return false
  }
}
