import process from 'node:process'
import { cac } from 'cac'
import { consola } from 'consola'
import { version } from '../../package.json'

import { add } from './add'
import { clear } from './clear'
import { list } from './list'
import { remove } from './remove'

const cli = cac('fnclip')
cli.help().version(version)

cli
  .command('add [...funcs]', 'Add functions to the project (alias: i, install)', {
    ignoreOptionDefaultValue: true,
    allowUnknownOptions: true,
  })
  .alias('i')
  .alias('install')
  .option('-d, --dir <path>', 'The target folder')
  .option('--cwd <path>', 'The base path')
  .option('--ts', 'Enable TypeScript mode')
  .option('--index', 'Generate index file to export functions')
  .action(add)

cli
  .command('clear', 'Clear the project', {
    ignoreOptionDefaultValue: true,
    allowUnknownOptions: true,
  })
  .option('-d, --dir <path>', 'The target folder')
  .option('--cwd <path>', 'The base path')
  .action(clear)

cli
  .command('list', 'List available functions (alias: l)', {
    ignoreOptionDefaultValue: true,
    allowUnknownOptions: true,
  })
  .alias('l')
  .option('-d, --dir <path>', 'The target folder')
  .option('--cwd <path>', 'The base path')
  .option('--remote', 'List all functions')
  .action(list)

cli
  .command('remove [...funcs]', 'Remove exist functions (alias: rm, del, delete)', {
    ignoreOptionDefaultValue: true,
    allowUnknownOptions: true,
  })
  .alias('rm')
  .alias('delete')
  .alias('del')
  .option('-d, --dir <path>', 'The target folder')
  .option('--cwd <path>', 'The base path')
  .action(remove)

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
