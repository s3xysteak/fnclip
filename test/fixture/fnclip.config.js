export default defineConfig({})

/**
 * @typedef {object} ConfigOptions
 * @property {boolean} ts If enable TypeScript mode
 * @property {boolean} index If generate index file to export functions
 * @property {string} indexPath The path of index file
 * @property {string} dir The target folder
 * @property {string} cwd The base path
 * @property {boolean} remote For `list`: List all functions
 */

/**
 * @template T
 * @typedef {T | ((...args: any[]) => T)} Callable
 */

/**
 * @param {Callable<Partial<ConfigOptions>>} [opts]
 */
function defineConfig(opts) {
  return opts
}
