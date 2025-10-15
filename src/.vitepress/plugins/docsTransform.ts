import type { Plugin } from 'vite'
import fs from 'fs-extra'

const FUNCTIONS_MARKDOWN_REGEX = /src\/functions\/.*\.md$/
const isFunctionsMarkdown = (filepath: string) => FUNCTIONS_MARKDOWN_REGEX.test(filepath)

export default function (): Plugin {
  return {
    name: 'docs-transform',
    enforce: 'pre',
    transform: async (code, id) => {
      if (!isFunctionsMarkdown(id))
        return

      const [type, name] = id.replace(/.*\/src\/functions\//, '').split('/')

      const demoPath = `src/functions/${type}/${name}/demo.vue`
      const demoCode = await fs.pathExists(demoPath)
        ? await fs.readFile(demoPath, 'utf-8')
        : null
      const hasDemo = !!demoCode

      const typePath = `tsc-types/${type}/${name}/index.d.ts`
      const typeContent = await fs.readFile(typePath, 'utf-8')

      const links = [
        ['Source', `https://github.com/s3xysteak/fnclip/blob/main/src/functions/${type}/${name}/index.ts`],
        hasDemo ? ['Demo', `https://github.com/s3xysteak/fnclip/blob/main/src/functions/${type}/${name}/demo.vue`] : null,
      ]
        .filter(i => !!i)
        .map(([name, url]) => `[${name}](${url})`)
        .join(' • ')

      const result = createCodeChain(code)
        .prepend(`# ${name}`)
        .when(
          hasDemo,
          code => code
            .append(`## Demo`)
            .append(`\`\`\`vue\n${demoCode}\n\`\`\``)
            .append(`---`)
            .script()
            .append(`import { defineAsyncComponent } from 'vue'`)
            .append(`const Comp = defineAsyncComponent(() => import('./demo.vue'))`)
            .back()
            .append('<Suspense>')
            .append(`<Comp />`)
            .append(`</Suspense>\n`),
        )
        .append(`## Type Declarations`)
        .append(`
<details>
<summary>Show Type Declarations</summary>

\`\`\`ts
${typeContent}
\`\`\`
</details>
`)
        .append(`## Source`)
        .append(links)
        .toString()

      return result
    },
  }
}

function createCodeChain(_code: string) {
  let code = _code

  const extractScript = () => {
    const doMatch = () => code.match(/(<script setup>)([\s\S]*?)(<\/script>)/)
    let match = doMatch()
    if (!match) {
      code = `${code}\n<script setup>\n</script>\n`
      match = doMatch()
    }
    if (!match) {
      throw new Error('never')
    }
    const [full, tagOpen, scriptContent, tagClose] = match
    const before = code.slice(0, match.index) + tagOpen
    const after = tagClose + code.slice((match.index ?? 0) + full.length)
    return { before, content: scriptContent, after }
  }
  const updateScript = (newCode: string) => {
    const { before, after } = extractScript()
    code = `${before}${newCode}${after}`
  }

  interface Chainable<T> {
    prepend: (content: string) => T
    append: (content: string) => T
    replace: (search: string | RegExp, replacement: string) => T
    when: (condition: boolean | (() => boolean), fn: (self: T) => T) => T
    toString: () => string
  }

  interface Api extends Chainable<Api> {
    script: () => ApiScript
  }
  interface ApiScript extends Chainable<ApiScript> {
    back: () => Api
  }

  const api: Api = {
    prepend: (content: string) => {
      code = `${content}\n${code}`
      return api
    },
    append: (content: string) => {
      code = `${code}${content}\n`
      return api
    },
    replace: (search: string | RegExp, replacement: string) => {
      code = code.replace(search, replacement)
      return api
    },
    script: () => {
      const handler = createCodeChain(extractScript().content)

      return Object.assign(handler, {
        back: () => {
          updateScript(handler.toString())
          return api
        },
      }) as any
    },
    when: (condition: boolean | (() => boolean), fn: (self: typeof api) => typeof api) =>
      (typeof condition === 'function' ? condition() : condition) ? fn(api) : api,
    toString: () => code,
  }

  return api
}
