import { describe, expect, it } from 'vitest'

import { handleOptions } from '../src/cli/options'

describe.concurrent('options', () => {
  it('handleOptions', async () => {
    const config = await handleOptions()
    expect(config).toMatchInlineSnapshot(`
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

  it('change dir', async () => {
    await Promise.all([
      handleOptions({ dir: 'src' }).then((result) => {
        expect(result).toMatchObject({ indexPath: 'src/index' })
      }),
      handleOptions({ dir: 'src', indexPath: 'index' }).then((result) => {
        expect(result).toMatchObject({ indexPath: 'index' })
      }),
    ])
  })
})
