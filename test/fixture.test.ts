import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import { join } from 'pathe'
import { x } from 'tinyexec'
import { describe, expect, it } from 'vitest'

const p = (path: string) => join(fileURLToPath(new URL('.', import.meta.url)), 'fixture', path)
const cwd = './test/fixture'

describe('fnclip cli', () => {
  it('clear', async () => {
    await run(`pnpm fnclip clear`)
    expect(await fs.pathExists(p('src/utils/fnclip'))).toBe(false)
  })

  it('add', async () => {
    await run('pnpm fnclip add pipe')
    expect(await fs.pathExists(p('src/utils/fnclip'))).toBe(true)
  })

  it('remove', async () => {
    await run('pnpm fnclip add isPromise')
    expect(await fs.pathExists(p('src/utils/fnclip/isPromise.js'))).toBe(true)
    expect(await fs.pathExists(p('src/utils/fnclip/pipe.js'))).toBe(true)

    await run('pnpm fnclip rm isPromise')
    expect(await fs.pathExists(p('src/utils/fnclip/isPromise.js'))).toBe(false)
    expect(await fs.pathExists(p('src/utils/fnclip/pipe.js'))).toBe(true)
  })

  it('index-path', async () => {
    await run('pnpm fnclip add isPromise --index-path ../fnclip')
    expect(await fs.pathExists(p('src/utils/fnclip.js'))).toBe(true)
    expect(await fs.readFile(p('src/utils/fnclip.js'), 'utf8')).toContain(`export * from './isPromise';`)

    await fs.remove(p('src/utils/fnclip.js'))
    await run('pnpm fnclip rm isPromise')
  })
})

async function run(command: string, args: string[] = []) {
  return await x(command, args, { nodeOptions: { cwd } })
}
