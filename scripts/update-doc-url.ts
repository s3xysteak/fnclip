import fs from 'fs-extra'
import { glob } from 'tinyglobby'

async function run() {
  const files = await glob('src/functions/*/*/index.ts')
  await Promise.all(files.map(async (file) => {
    const [_, __, type, name] = file.split('/')

    const code = await fs.readFile(file, 'utf8')
    await fs.writeFile(
      file,
      code.replace(
        /(@see\s*\{@link\s*)(?:doc-url|https:.*\/)(\s*\})/,
        `$1https://s3xysteak.github.io/fnclip/functions/${type}/${name}/$2`,
      ),
    )
  }))
}

await run()
