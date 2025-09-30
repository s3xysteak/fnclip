import { describe, expect, it } from 'vitest'
import { isPromise } from '.'

describe('isPromise', () => {
  it('should work', () => {
    expect(isPromise(Promise.resolve())).toBe(true)
    expect(isPromise('not a promise')).toBe(false)
  })
})
