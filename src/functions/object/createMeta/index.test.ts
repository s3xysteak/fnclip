import { describe, expect, it } from 'vitest'
import { createMeta } from '.'

describe('createMeta', () => {
  it('should work', () => {
    const [set, get] = createMeta<{ a: number }>()

    const obj = {}
    const value = { a: 1 }

    set(obj, value)
    expect(get(obj)).toEqual(value)
    expect(Object.keys(obj)).toEqual([])
  })
})
