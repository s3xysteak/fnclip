import { describe, expect, it } from 'vitest'
import { createTest } from './createTest'

describe.concurrent('is', () => {
  Object.entries(createTest()).forEach(([key, value]) => {
    it(key, () => {
      value.forEach(([input, expected]) => {
        expect(input).toBe(expected)
      })
    })
  })
})
