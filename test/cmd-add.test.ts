import * as fs from 'node:fs/promises'
import { afterAll, describe, expect, it } from 'vitest'
import { exists, rootJoin, run } from './shared'

describe('add', () => {
  const BASE = 'test-add'
  const join = rootJoin.createJoin(BASE)

  afterAll(() => fs.rm(join(), { recursive: true }))

  it('should work', async () => {
    await run(`pnpm fnclip add get --dir ${BASE}`)
    expect(await exists(join('get.js'))).toBe(true)
    expect(await exists(join('index.js'))).toBe(true)

    expect(await fs.readFile(join('get.js'), 'utf8')).toMatchSnapshot()
  })
})
