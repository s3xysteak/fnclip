import * as fs from 'node:fs/promises'
import { x } from 'tinyexec'

await fs.rm('tsc-types', { recursive: true, force: true })
await x('pnpm tsc -p tsconfig.build.json')
