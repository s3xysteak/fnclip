import { describe, expect, it } from 'vitest'
import { pipe } from '.'

describe('pipe', () => {
  it('should work', () => {
    const run = pipe((n: number) => n + 1, n => n * n, String)
    expect(run(1)).toBe('4')
  })
})
