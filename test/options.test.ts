import { describe, expect, it } from 'vitest'

import { handleOptions } from '../src/cli/options'

describe('options', () => {
  it('handleOptions', async () => {
    expect(await handleOptions()).toMatchInlineSnapshot(`
      {
        "cwd": ".",
        "dir": "src/utils/fnclip",
        "index": true,
        "indexPath": "src/utils/fnclip/index",
        "remote": false,
        "ts": true,
      }
    `)
  })
})
