import { glob } from 'tinyglobby'
import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default async () => {
  const funcs = (await glob('src/functions/*/*/index.ts'))
    .map((fullPath) => {
      const [_, __, type, name] = fullPath.split('/')
      return { type, name }
    })

  return defineConfig({
    title: 'fnclip',
    description: 'Use only the functions you need.',
    themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Examples', link: '/markdown-examples' },
      ],

      sidebar: [
        {
          text: 'Examples',
          items: [
            { text: 'Markdown Examples', link: '/markdown-examples' },
            { text: 'Runtime API Examples', link: '/api-examples' },
          ],
        },
      ],

      socialLinks: [
        { icon: 'github', link: 'https://github.com/vuejs/vitepress' },
      ],
    },
  })
}
