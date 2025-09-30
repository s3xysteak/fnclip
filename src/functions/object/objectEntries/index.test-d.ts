import { describe, expectTypeOf, it } from 'vitest'
import { objectEntries } from '.'

describe('objectEntries', () => {
  it('should work', () => {
    expectTypeOf(objectEntries({ a: 1, b: 2 })).toEqualTypeOf<['a' | 'b', number][]>()
    expectTypeOf(objectEntries<Record<string, number>>({ a: 1, b: 2 })).toEqualTypeOf<[string, number][]>()
  })
})
