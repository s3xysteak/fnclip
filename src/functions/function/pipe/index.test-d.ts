import { describe, expectTypeOf, it } from 'vitest'
import { pipe } from '.'

describe('pipe', () => {
  it('should work', () => {
    const sum = pipe((a: number) => a + 1, b => `${b}`, (c) => {
      expectTypeOf(c).toBeString()
      return c
    })

    expectTypeOf(sum).parameter(0).toBeNumber()
    expectTypeOf(sum).returns.toBeString()
  })
})
