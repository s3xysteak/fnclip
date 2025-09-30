import { describe, expectTypeOf, it } from 'vitest'
import { objectMap } from '.'

describe('objectEntries', () => {
  it('should work', () => {
    expectTypeOf(
      objectMap({ a: 1, b: 2 }, (k, v) => [k, v]),
    ).toEqualTypeOf<{ a: number, b: number }>()

    expectTypeOf(
      objectMap({ a: 1, b: 2 }, (k, v) => [v.toString(), k]),
    ).toEqualTypeOf<Record<string, 'a' | 'b'>>()
  })
})
