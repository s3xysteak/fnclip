import process from 'node:process'
import { cac } from 'cac'
import { consola } from 'consola'
import { add, clear, config, list, remove } from '..'
import { version } from '../../package.json'
import { update } from './update'

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
  .option('--index-path', 'The path of index file')
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

cli
  .command('config', 'Add fnclip config file to your project', {
    ignoreOptionDefaultValue: true,
    allowUnknownOptions: true,
  })
  .option('--cwd <path>', 'The base path')
  .option('--ts', 'Enable TypeScript mode')
  .action(config)

cli
  .command('update', 'Update all fnclip functions to the latest version in your project', {
    ignoreOptionDefaultValue: true,
    allowUnknownOptions: true,
  })
  .alias('up')
  .option('-d, --dir <path>', 'The target folder')
  .option('--cwd <path>', 'The base path')
  .option('--ts', 'Enable TypeScript mode')
  .option('--index', 'Generate index file to export functions')
  .option('--index-path', 'The path of index file')
  .action(update)

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
