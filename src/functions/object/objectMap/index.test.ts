import { describe, expect, it } from 'vitest'
import { objectMap } from '.'

describe('objectEntries', () => {
  it('should work', () => {
    expect(objectMap({ a: 1, b: 2 }, (k, v) => [v.toString(), k])).toEqual({ 1: 'a', 2: 'b' })
  })
})
