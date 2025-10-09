import { describe, expect, it } from 'vitest'
import { pipe } from '.'

describe('pipe', () => {
  it('should work', () => {
    expect(pipe(1, n => n + 1, n => n * n, String)).toBe('4')
  })

  it('1 param', () => {
    expect(
      pipe(1, (n: number) => n + 1),
    ).toBe(2)
  })

  it('2 params', () => {
    expect(
      pipe(1, (n: number) => n + 1, n => n * n),
    ).toBe(4)
  })
})
