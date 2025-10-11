import {
  defineConfig,
  presetAttributify,
  presetWind4,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  shortcuts: {
    btn: 'py-2 px-4 font-semibold rounded-lg shadow-md transition hover:(shadow-lg translate-y--0.5) active:(shadow-sm translate-y-0)',
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
