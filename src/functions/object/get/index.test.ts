import { describe, expect, it } from 'vitest'
import { get } from '.'

describe('get', () => {
  it('should work', () => {
    expect(get(
      { a: 1 },
      'a',
    )).toBe(1)

    expect(get(
      { a: { b: 2 } },
      'a.b',
    )).toBe(2)

    expect(get(
      { a: { b: [2] } },
      'a.b[0]',
    )).toBe(2)

    expect(get(
      [{ a: 1 }],
      '[0].a',
    )).toBe(1)

    expect(get(
      {},
      'a.b',
      'default-value',
    )).toBe('default-value')
  })
})
