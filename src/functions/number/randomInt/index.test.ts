import { describe, expect, it } from 'vitest'
import { randomInt } from '.'

describe('randomInt', () => {
  it('should work', () => {
    expect(randomInt(1, 10)).toBeGreaterThanOrEqual(1)
    expect(randomInt(1, 10)).toBeLessThanOrEqual(10)
  })

  it('should return a integer', () => {
    const val = randomInt(1, 10)
    expect(val === Math.floor(val) && val === Math.ceil(val)).toBeTruthy()
  })
})
