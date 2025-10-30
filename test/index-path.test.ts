import fs from 'fs-extra'
import { afterAll, describe, expect, it } from 'vitest'
import { rootJoin, run } from './shared'

describe('index-path', () => {
  const BASE = 'test-index-path'
  const testJoin = rootJoin.createJoin(BASE)

  afterAll(async () => {
    await fs.rm(testJoin(), { recursive: true, force: true })
  })

  it('index-path', async () => {
    await run(`pnpm fnclip add get --dir ${testJoin('funcs')} --index-path ${testJoin('fnclip.js')}`)
    expect(await fs.pathExists(testJoin('fnclip.js'))).toBe(true)
    expect(await fs.readFile(testJoin('fnclip.js'), 'utf8')).toContain(`export * from './funcs/get';`)
    expect(await fs.pathExists(testJoin('funcs', 'get.js'))).toBe(true)
  })
})
