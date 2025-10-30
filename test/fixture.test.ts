import { fileURLToPath } from 'node:url'
import fs from 'fs-extra'
import * as path from 'pathe'
import { x } from 'tinyexec'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

function createJoin(...base: string[]) {
  const fn = (...paths: string[]) => path.join(...base, ...(paths.length ? paths : ['.']))
  return Object.assign(fn, {
    createJoin: (...paths: string[]) => createJoin(...base, ...paths),
  })
}
const rootJoin = createJoin(fileURLToPath(new URL('.', import.meta.url)), 'fixture')
const cwd = './test/fixture'

describe('fnclip cli', () => {
  it('clear', async () => {
    await run(`pnpm fnclip clear`)
    expect(await fs.pathExists(rootJoin('src/utils/fnclip'))).toBe(false)
  })

  it('add', async () => {
    await run('pnpm fnclip add pipe')
    expect(await fs.pathExists(rootJoin('src/utils/fnclip'))).toBe(true)

    expect(await fs.readFile(rootJoin('src/utils/fnclip/pipe.js'), 'utf8')).toMatchSnapshot()
    expect(await fs.readFile(rootJoin('src/utils/fnclip/index.js'), 'utf8')).toMatchSnapshot()
  })

  describe('config', () => {
    const configPath = rootJoin('./fnclip.config.js')

    let prepareContent = ''
    beforeAll(async () => {
      prepareContent = await fs.readFile(configPath, 'utf8')
    })
    afterAll(async () => {
      await fs.ensureFile(configPath)
      await fs.writeFile(configPath, prepareContent)
    })

    it('should work', async () => {
      await fs.remove(configPath)
      await run('pnpm fnclip config')

      expect(await fs.pathExists(configPath)).toBe(true)

      const content = await fs.readFile(configPath, 'utf8')
      await fs.writeFile(configPath, content.replace('defineConfig({})', `defineConfig({ dir: 'src/test', ts: true })`))

      await run('pnpm fnclip add pipe')
      expect(await fs.pathExists(rootJoin('src/test/pipe.ts'))).toBe(true)
      await fs.remove(rootJoin('src/test'))

      await run('pnpm fnclip add pipe --no-ts')
      expect(await fs.pathExists(rootJoin('src/test/pipe.js'))).toBe(true)
      await fs.remove(rootJoin('src/test'))

      await fs.remove(configPath)
    })
  })

  it('remove', async () => {
    await run('pnpm fnclip add get')
    expect(await fs.pathExists(rootJoin('src/utils/fnclip/get.js'))).toBe(true)
    expect(await fs.pathExists(rootJoin('src/utils/fnclip/pipe.js'))).toBe(true)

    await run('pnpm fnclip rm get')
    expect(await fs.pathExists(rootJoin('src/utils/fnclip/get.js'))).toBe(false)
    expect(await fs.pathExists(rootJoin('src/utils/fnclip/pipe.js'))).toBe(true)
  })

  it('index-path', async () => {
    await run('pnpm fnclip add get --index-path src/utils/fnclip.js')
    expect(await fs.pathExists(rootJoin('src/utils/fnclip.js'))).toBe(true)
    expect(await fs.readFile(rootJoin('src/utils/fnclip.js'), 'utf8')).toContain(`export * from './fnclip/get';`)

    await fs.remove(rootJoin('src/utils/fnclip.js'))
    await run('pnpm fnclip rm get')
  })

  describe('update', () => {
    const TEST_UPDATE_DIR = 'test-update'
    const testUpJoin = rootJoin.createJoin(TEST_UPDATE_DIR)

    beforeAll(async () => {
      await run(`pnpm fnclip add objectKeys isInRange --dir ${TEST_UPDATE_DIR}`)
      const files = await fs.readdir(testUpJoin())
      await Promise.all(files.map(async (pathname) => {
        await fs.writeFile(testUpJoin(pathname), `// ${pathname}`)
      }))
    })
    afterAll(async () => {
      await fs.rm(testUpJoin(), { recursive: true, force: true })
    })

    it('should work', async () => {
      const map = Object.fromEntries(await Promise.all(
        (await fs.readdir(testUpJoin())).map(async name => [
          name,
          await fs.readFile(testUpJoin(name), 'utf8'),
        ] as const),
      ))

      await run(`pnpm fnclip update --dir ${testUpJoin()}`)

      const mapEntries = Object.entries(map).sort((a, b) => a[0].localeCompare(b[0]))

      for (const [pathname] of mapEntries) {
        const content = await fs.readFile(testUpJoin(pathname), 'utf8')
        expect(content).toMatchSnapshot()
      }

      await Promise.all(mapEntries.map(async ([pathname, rawContent]) => {
        await fs.writeFile(testUpJoin(pathname), rawContent)
      }))
    })
  })
})

async function run(command: string, args?: string[]) {
  const splittedCommand = command.split(' ')
  const result = await x(args ? command : splittedCommand[0], args ?? splittedCommand.slice(1), { nodeOptions: { cwd } })

  /* eslint-disable no-console */
  result.stdout && console.log(result.stdout)
  result.stderr && console.error(result.stderr)

  return result
}
