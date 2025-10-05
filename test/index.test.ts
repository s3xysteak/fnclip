import { describe, expect, it } from 'vitest'
import { ensureExt } from '../src/cli/options'

describe('options', () => {
  it('ensureExt', () => {
    expect(ensureExt('abc', '.js')).toBe('abc.js')
    expect(ensureExt('abc.js', '.js')).toBe('abc.js')
    expect(ensureExt('abc.js', '.d')).toBe('abc.js')
  })
})
