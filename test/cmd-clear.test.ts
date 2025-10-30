import { describe, expect, it } from 'vitest'
import { exists, rootJoin, run } from './shared'

describe('clear', () => {
  const BASE = 'test-clear'
  const join = rootJoin.createJoin(BASE)

  it('should work', async () => {
    await run(`pnpm fnclip add get isInRange --dir ${BASE}`)

    expect(await exists(join('get.js'))).toBe(true)
    expect(await exists(join('isInRange.js'))).toBe(true)

    await run(`pnpm fnclip clear --dir ${BASE}`)

    expect(await exists(join())).toBe(false)
  })
})
