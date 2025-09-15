import process from 'node:process'
import { cac } from 'cac'
import { consola } from 'consola'
import { version } from '../package.json'
import { add, clear } from './index'

const cli = cac('tsdown')
cli.help().version(version)

cli
  .command('add [...funcs]', 'Add functions to the project', { ignoreOptionDefaultValue: true })
  .option('-d, --dir <path>', 'The target folder')
  .option('--cwd <path>', 'The base path')
  .option('--ts', 'Enable TypeScript mode')
  .option('--index', 'Generate index file to export functions')
  .action(async (funcs: string[], options) => {
    if (funcs.length === 0)
      return consola.warn('At least one function must be provided or nothing will happen')

    await add(funcs, options)
  })

cli
  .command('clear', 'Clear the project', { ignoreOptionDefaultValue: true })
  .option('-d, --dir <path>', 'The target folder')
  .option('--cwd <path>', 'The base path')
  .action(async (options) => {
    await clear(options)
  })

export async function runCLI() {
  cli.parse(process.argv, { run: false })

  try {
    await cli.runMatchedCommand()
  }
  catch (error) {
    consola.error(error)
    process.exit(1)
  }
}
