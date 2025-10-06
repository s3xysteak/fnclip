import { fileURLToPath } from 'node:url'
import { dirname } from 'pathe'

export * from './cli/add'
export * from './cli/clear'
export * from './cli/config'
export * from './cli/list'
export * from './cli/remove'

export const fnclipPath = dirname(fileURLToPath(new URL(import.meta.url)))
