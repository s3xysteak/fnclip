import { describe, expect, it } from 'vitest'

import { handleOptions } from '../src/cli/shared/options'

describe('options', () => {
  it('handleOptions', async () => {
    expect(await handleOptions()).toMatchInlineSnapshot(`
      {
        "cwd": ".",
        "dir": "src/utils/fnclip",
        "index": true,
        "indexPath": "./index",
        "remote": false,
        "ts": true,
      }
    `)
  })
})
