import { describe, expect, it } from 'vitest'
import { objectKeys } from '.'

describe('objectEntries', () => {
  it('should work', () => {
    expect(objectKeys({ a: 1, b: 2 })).toEqual(['a', 'b'])
  })
})
