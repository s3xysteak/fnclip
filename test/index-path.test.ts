import * as fs from 'node:fs/promises'
import { afterAll, describe, expect, it } from 'vitest'
import { exists, rootJoin, run } from './shared'

describe('index-path', () => {
  const BASE = 'test-index-path'
  const testJoin = rootJoin.createJoin(BASE)

  afterAll(async () => {
    await fs.rm(testJoin(), { recursive: true, force: true })
  })

  it('index-path', async () => {
    await run(`pnpm fnclip add get --dir ${testJoin('funcs')} --index-path ${testJoin('fnclip.js')}`)
    expect(await exists(testJoin('fnclip.js'))).toBe(true)
    expect(await fs.readFile(testJoin('fnclip.js'), 'utf8')).toContain(`export * from './funcs/get';`)
    expect(await exists(testJoin('funcs', 'get.js'))).toBe(true)
  })
})
