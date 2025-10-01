import { describe, expectTypeOf, it } from 'vitest'
import { createMeta } from '.'

describe('createMeta', () => {
  it('should work', () => {
    const [_, get] = createMeta<{ a: number }>()
    expectTypeOf(get({})).toEqualTypeOf<{ a: number } | undefined>()
  })

  it('should work with infer type', () => {
    const [_, get] = createMeta({ a: 1 })
    expectTypeOf(get({})).toEqualTypeOf<{ a: number } | undefined>()
  })
})
