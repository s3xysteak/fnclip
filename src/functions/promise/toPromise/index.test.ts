import { describe, expect, it } from 'vitest'
import { toPromise } from '.'

describe('toPromise', () => {
  it('should work', async () => {
    expect(await toPromise('hi')).toBe('hi')
    expect(await toPromise(1)).toBe(1)
    expect(await toPromise(Promise.resolve(1))).toBe(1)
    expect(await toPromise(() => 1)).toBe(1)
    expect(await toPromise(async () => 1)).toBe(1)
  })
})
