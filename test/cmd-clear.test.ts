import { describe, expect, it } from 'vitest'
import { exist, rootJoin, run } from './shared'

describe('clear', () => {
  const BASE = 'test-clear'
  const join = rootJoin.createJoin(BASE)

  it('should work', async () => {
    await run(`pnpm fnclip add get isInRange --dir ${BASE}`)

    expect(await exist(join('get.js'))).toBe(true)
    expect(await exist(join('isInRange.js'))).toBe(true)

    await run(`pnpm fnclip clear --dir ${BASE}`)

    expect(await exist(join())).toBe(false)
  })
})
