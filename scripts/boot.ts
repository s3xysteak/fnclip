import { x } from 'tinyexec'

await Promise.all([
  x('pnpm', ['update-funcs-meta']),
  x('pnpm', ['update-doc-url']),
  x('pnpm', ['build:types']),
])
