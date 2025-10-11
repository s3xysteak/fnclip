import type { DefaultTheme } from 'vitepress'
import { glob } from 'tinyglobby'
import UnoCss from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import { defineConfig } from 'vitepress'
import { groupBy, objectEntries } from '../utils'
import DocsTransform from './plugins/docsTransform'

// https://vitepress.dev/reference/site-config
export default async () => {
  const sidebar = objectEntries(
    groupBy(
      (await glob('src/functions/*/*/index.ts'))
        .map((fullPath) => {
          const [_, __, type, name] = fullPath.split('/')
          return { type, name }
        }),
      item => item.type,
    ),
  ).map<DefaultTheme.SidebarItem>(([type, items]) => ({
    text: type,
    items: (items ?? [])?.map(({ name }) => ({
      text: name,
      link: `/functions/${type}/${name}/`,
    })).sort((a, b) => a.text.localeCompare(b.text)),
  }))

  return defineConfig({
    title: 'fnclip',
    description: 'Use only the functions you need.',
    base: '/fnclip/',
    themeConfig: {
      nav: [
        { text: 'Home', link: '/' },
        { text: 'Quick start', link: '/quick-start' },
      ],
      search: {
        provider: 'local',
      },
      sidebar: [
        { text: 'Introduction', link: '/introduction' },
        { text: 'Quick start', link: '/quick-start' },

        ...sidebar,
      ],
      socialLinks: [
        { icon: 'github', link: 'https://github.com/s3xysteak/fnclip' },
      ],
    },
    vite: {
      plugins: [
        UnoCss() as any,
        DocsTransform(),
        AutoImport({
          include: [/\.vue$/, /\.vue\?vue/, /\.vue\.[tj]sx?\?vue/, /\.md$/],
          imports: ['vue'],
        }),
      ],
    },
  })
}
