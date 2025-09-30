import { describe, expect, it } from 'vitest'
import { makeDestructurable } from '.'

describe('makeDestructurable', () => {
  it('should work', () => {
    const a = 1
    const b = '2'
    const result = makeDestructurable({ a, b }, [a, b])
    const { a: a1, b: b1 } = result
    expect(a1).toBe(1)
    expect(b1).toBe('2')

    const [a2, b2] = result
    expect(a2).toBe(1)
    expect(b2).toBe('2')
  })
})
