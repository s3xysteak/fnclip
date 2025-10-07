import { describe, expect, it } from 'vitest'
import { ensureExt, relativeImportPath } from '../src/cli/shared/utils'

describe('utils', () => {
  it('ensureExt', () => {
    expect(ensureExt('abc', '.js')).toBe('abc.js')
    expect(ensureExt('abc.js', '.js')).toBe('abc.js')
    expect(ensureExt('abc.js', '.d')).toBe('abc.js')
  })

  it('relativeImportPath', () => {
    expect(relativeImportPath('c:/a/b', 'c:/a/b/c')).toBe('./c')
  })
})
