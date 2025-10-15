import {
  defineConfig,
  presetAttributify,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    'btn': [
      'py-2 px-4 font-semibold rounded-lg transition b-(1 solid dark/10)',
      'shadow-md',
      'hover:(shadow-lg translate-y--0.5)',
      'active:(shadow-sm translate-y-0)',
      'dark:(b-(1 solid white/10) shadow-gray/10)',
    ],
    'input': [
      'p-2 b-(1 solid slate-300) rounded focus-(outline-(2 offset-2) b-slate-400)',
      'dark-(b-slate-600 focus-b-slate-300 outline-slate-300)',
    ],
    'flex-center': 'flex-items-center flex-justify-center',
  },
  presets: [
    presetWind4(),
    presetAttributify(),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
})
