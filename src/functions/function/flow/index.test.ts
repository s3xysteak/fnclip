import { describe, expect, it } from 'vitest'
import { flow } from '.'

describe('flow', () => {
  it('should work', () => {
    const f = flow((n: number) => n + 1, n => n * n, String)
    expect(f(1)).toBe('4')
  })

  it('1 param', () => {
    expect(
      flow((n: number) => n + 1)(1),
    ).toBe(2)
  })

  it('2 params', () => {
    expect(
      flow((n: number) => n + 1, n => n * n)(1),
    ).toBe(4)
  })
})
