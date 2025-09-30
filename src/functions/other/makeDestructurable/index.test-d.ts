import { describe, expectTypeOf, it } from 'vitest'
import { makeDestructurable } from '.'

describe('makeDestructurable', () => {
  it('should work', () => {
    const a = 1
    const b = '2'
    const result = makeDestructurable({ a, b }, [a, b] as const)
    const { a: a1, b: b1 } = result
    expectTypeOf(a1).toBeNumber()
    expectTypeOf(b1).toBeString()

    const [a2, b2] = result
    expectTypeOf(a2).toBeNumber()
    expectTypeOf(b2).toBeString()
  })
})
