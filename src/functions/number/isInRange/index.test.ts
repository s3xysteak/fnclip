import { describe, expect, it } from 'vitest'
import { isInRange } from '.'

describe('isInRange', () => {
  it('should work', () => {
    expect(isInRange(5, [1, 10])).toBe(true)
    expect(isInRange(5, [10, 1])).toBe(true)

    expect(isInRange(15, [1, 10])).toBe(false)
  })
})
