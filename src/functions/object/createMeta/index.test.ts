import { describe, expect, it } from 'vitest'
import { createMeta } from '.'

describe('createMeta', () => {
  it('should work with object', () => {
    const [set, get] = createMeta<{ a: number }>()
    const obj = {}
    const value = { a: 1 }

    expect(get(obj)).toBeUndefined()

    set(obj, value)
    expect(get(obj)).toEqual(value)

    expect(Object.keys(obj)).toEqual([])
  })

  it('boolean', () => {
    const [set, get] = createMeta<boolean>()
    const obj = {}
    expect(get(obj)).toBeUndefined()

    set(obj, true)
    expect(get(obj)).toBeTruthy()

    set(obj, false)
    expect(get(obj)).toBeFalsy()
  })
})
