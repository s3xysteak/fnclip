import * as fs from 'node:fs/promises'
import { afterAll, describe, expect, it } from 'vitest'
import { exists, rootJoin, run } from './shared'

describe('remove', () => {
  const BASE = 'test-remove'
  const join = rootJoin.createJoin(BASE)

  afterAll(() => fs.rm(join(), { recursive: true }))

  it('should work', async () => {
    await run(`pnpm fnclip add get --dir ${BASE}`)
    expect(await exists(join('get.js'))).toBe(true)

    await run(`pnpm fnclip rm get --dir ${BASE}`)
    expect(await exists(join('get.js'))).toBe(false)
  })
})
