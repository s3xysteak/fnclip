export default defineConfig()

interface ConfigOptions {
  ts: boolean
  index: boolean
  indexPath: string
  dir: string
  cwd: string
  remote: boolean
}
type Callable<T> = T | ((...args: any[]) => T)
function defineConfig(opts: Callable<Partial<ConfigOptions>> = {}) {
  return opts
}
