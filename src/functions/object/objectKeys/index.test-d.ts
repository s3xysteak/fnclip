import { describe, expectTypeOf, it } from 'vitest'
import { objectKeys } from '.'

describe('objectEntries', () => {
  it('should work', () => {
    expectTypeOf(objectKeys({ a: 1, b: 2 })).toEqualTypeOf<('a' | 'b')[]>()
    expectTypeOf(objectKeys<Record<string, number>>({ a: 1, b: 2 })).toEqualTypeOf<string[]>()
  })
})
