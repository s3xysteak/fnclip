import fs from 'fs-extra'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import { rootJoin, run } from './shared'

describe('update', () => {
  const BASE = 'test-update'
  const join = rootJoin.createJoin(BASE)

  beforeAll(async () => {
    await run(`pnpm fnclip add objectKeys isInRange --dir ${BASE}`)
    const files = await fs.readdir(join())
    await Promise.all(files.map(async (pathname) => {
      await fs.writeFile(join(pathname), `// ${pathname}`)
    }))
  })
  afterAll(async () => {
    await fs.rm(join(), { recursive: true, force: true })
  })

  it('should work', async () => {
    const funcs = await fs.readdir(join())
    const map = (await Promise.all(
      funcs.map(async pathname => ({
        pathname,
        content: await fs.readFile(join(pathname), 'utf8'),
      })),
    )).sort((a, b) => a.pathname.localeCompare(b.pathname))

    await run(`pnpm fnclip update --dir ${join()}`)

    for (const { pathname } of map) {
      const content = await fs.readFile(join(pathname), 'utf8')
      expect(content).toMatchSnapshot()
    }

    await Promise.all(map.map(async ({ pathname, content: rawContent }) => {
      await fs.writeFile(join(pathname), rawContent)
    }))
  })
})
