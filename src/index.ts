import { fileURLToPath } from 'node:url'

export * from './cli/add'
export * from './cli/clear'
export * from './cli/config'
export * from './cli/list'
export * from './cli/remove'

export const fnclipPath = fileURLToPath(new URL('.', import.meta.url))
