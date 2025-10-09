import { describe, expect, it } from 'vitest'
import { groupBy } from '.'

describe('groupBy', () => {
  const data = [
    { type: 'apple', size: 2 },
    { type: 'banana', size: 3 },
    { type: 'pear', size: 2 },
    { type: 'mango', size: 1 },
    { type: 'apple', size: 4 },
    { type: 'banana', size: 6 },
    { type: 'pear', size: 6, special: true },
  ]

  it('should work', () => {
    expect(groupBy(data, item => item.type)).toEqual({
      apple: [
        { type: 'apple', size: 2 },
        { type: 'apple', size: 4 },
      ],
      banana: [
        { type: 'banana', size: 3 },
        { type: 'banana', size: 6 },
      ],
      pear: [
        { type: 'pear', size: 2 },
        { type: 'pear', size: 6, special: true },
      ],
      mango: [
        { type: 'mango', size: 1 },
      ],
    })
  })

  it('should work custom key', () => {
    expect(groupBy(data, item => item.size >= 3 ? 'big' : 'small')).toEqual(
      {
        big: [
          { size: 3, type: 'banana' },
          { size: 4, type: 'apple' },
          { size: 6, type: 'banana' },
          { size: 6, special: true, type: 'pear' },
        ],
        small: [
          { size: 2, type: 'apple' },
          { size: 2, type: 'pear' },
          { size: 1, type: 'mango' },
        ],
      },
    )
  })
})
