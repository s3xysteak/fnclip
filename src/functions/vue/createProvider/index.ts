import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

/**
 * A utility function to simplify the creation of Vue `provide` / `inject` pairs.
 *
 * It internally maintains a symbol as the injection key and exposes composables using provide/inject externally.
 *
 * It receives a function, which has the same param as the provider, and the same return as the provider and injector.
 *
 * @example
 * ```js
 * export const [useCountProvider, useCount] = createProvider((initial) => {
 *   const count = ref(initial)
 *   return count
 * })
 *
 * // in father component
 * const count = useCountProvider(0)
 *
 * // in child component
 * const count = useCount()
 * ```
 */
export function createProvider<Fn extends (...args: any[]) => any, ProviderR = ReturnType<Fn>, InjectR = ProviderR>(
  onProvider: Fn,
  onInject?: (key: InjectionKey<ProviderR>) => InjectR,
): [(...args: Parameters<Fn>) => ProviderR, () => InjectR] {
  const injectKey = Symbol('createProvider') as InjectionKey<InjectR>

  const useInject = onInject
    ? () => onInject(injectKey)
    : () => inject(injectKey)!

  const useProvide = (...args: Parameters<Fn>): ProviderR => {
    const val = onProvider(...args)
    provide(injectKey, val)
    return val
  }

  return [useProvide, useInject]
}
