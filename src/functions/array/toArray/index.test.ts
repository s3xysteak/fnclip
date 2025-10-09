import { describe, expect, it } from 'vitest'
import { toArray } from '.'

describe('toArray', () => {
  it('should work', () => {
    expect(toArray()).toEqual([])
    expect(toArray(null)).toEqual([])
    expect(toArray([null])).toEqual([null])
  })
})
