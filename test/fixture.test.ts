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

    expect(await fs.readFile(p('src/utils/fnclip/pipe.js'), 'utf8')).toMatchSnapshot()
    expect(await fs.readFile(p('src/utils/fnclip/index.js'), 'utf8')).toMatchSnapshot()
  })

  it('config', async () => {
    const configPath = p('./fnclip.config.js')

    const prepare = () => {
      let content = ''

      return {
        save: async () => {
          content = await fs.readFile(configPath, 'utf8')
        },
        load: async () => {
          await fs.ensureFile(configPath)
          await fs.writeFile(configPath, content)
        },
      }
    }
    const preparedConfig = prepare()
    await preparedConfig.save()

    await fs.remove(configPath)
    await run('pnpm fnclip config')

    expect(await fs.pathExists(configPath)).toBe(true)

    const content = await fs.readFile(configPath, 'utf8')
    await fs.writeFile(configPath, content.replace('defineConfig({})', `defineConfig({ dir: 'src/test', ts: true })`))

    await run('pnpm fnclip add pipe')
    expect(await fs.pathExists(p('src/test/pipe.ts'))).toBe(true)
    await fs.remove(p('src/test'))

    await run('pnpm fnclip add pipe --no-ts')
    expect(await fs.pathExists(p('src/test/pipe.js'))).toBe(true)
    await fs.remove(p('src/test'))

    await fs.remove(configPath)
    await preparedConfig.load()
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
    await run('pnpm fnclip add isPromise --index-path ../fnclip.js')
    expect(await fs.pathExists(p('src/utils/fnclip.js'))).toBe(true)
    expect(await fs.readFile(p('src/utils/fnclip.js'), 'utf8')).toContain(`export * from './isPromise';`)

    await fs.remove(p('src/utils/fnclip.js'))
    await run('pnpm fnclip rm isPromise')
  })
})

async function run(command: string, args: string[] = []) {
  return await x(command, args, { nodeOptions: { cwd } })
}
