import * as fs from 'node:fs/promises'
import { afterAll, describe, expect, it } from 'vitest'
import { exists, rootJoin, run } from './shared'

describe('config', () => {
  const BASE = 'test-config'
  const join = rootJoin.createJoin(BASE)

  const configPath = join('fnclip.config.js')

  afterAll(async () => {
    await fs.rm(join(), { recursive: true })
  })

  it('should work', async () => {
    await run(`pnpm fnclip config --cwd ${BASE}`)

    expect(await exists(configPath)).toBe(true)

    const content = await fs.readFile(configPath, 'utf8')
    await fs.writeFile(configPath, content.replace('defineConfig({})', `defineConfig({ dir: 'fnclip', ts: true })`))

    await run(`pnpm fnclip add pipe --cwd ${BASE}`)
    expect(await exists(join('fnclip/pipe.ts'))).toBe(true)
    await fs.rm(join('fnclip'), { recursive: true })

    await run(`pnpm fnclip add pipe --no-ts --cwd ${BASE}`)
    expect(await exists(join('fnclip/pipe.js'))).toBe(true)
    await fs.rm(join('fnclip'), { recursive: true })
  })
})
