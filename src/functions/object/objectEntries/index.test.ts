import { describe, expect, it } from 'vitest'
import { objectEntries } from '.'

describe('objectEntries', () => {
  it('should work', () => {
    expect(objectEntries({ a: 1, b: 2 })).toEqual([['a', 1], ['b', 2]])
  })
})
