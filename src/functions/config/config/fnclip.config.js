export default defineConfig()

/**
 * @typedef {object} ConfigOptions
 * @property {boolean} ts -
 * @property {boolean} index -
 * @property {string} indexPath -
 * @property {string} dir -
 * @property {string} cwd -
 * @property {boolean} remote -
 */

/**
 * @template T
 * @typedef {T | ((...args: any[]) => T)} Callable
 */

/**
 * @param {Callable<Partial<ConfigOptions>>} [opts]
 */
function defineConfig(opts = {}) {
  return opts
}
