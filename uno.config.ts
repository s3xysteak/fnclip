import {
  defineConfig,
  presetAttributify,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    btn: [
      'py-2 px-4 font-semibold rounded-lg transition b-(1 solid dark/10)',
      'shadow-md',
      'hover:(shadow-lg translate-y--0.5)',
      'active:(shadow-sm translate-y-0)',
      'dark:(b-(1 solid white/10) shadow-gray/10)',
    ],
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
