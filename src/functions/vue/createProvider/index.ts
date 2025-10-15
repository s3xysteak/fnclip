import type { InjectionKey } from 'vue'
import { inject, provide } from 'vue'

/**
 * A utility function to simplify the creation of Vue `provide` / `inject` pairs.
 * It internally maintains a symbol as the injection key and exposes composables using provide/inject externally.
 *
 * `const [provider, injector] = createProvider(setup)`
 *
 * It returns two composables. The first one is the provider which is for the father component, and the other one is injector.
 * These functions return their values as-is without performing any additional processing.
 *
 * It receives a setup function, which has the same param as the provider, and the same return as the provider and injector.
 * This function will be called in provider.
 *
 * @example
 * ```js
 * export const [useCountProvider, useCount] = createProvider(() => {
 *   const count = ref(0)
 *   return count
 * })
 *
 * // in father component
 * const count = useCountProvider()
 *
 * // in child component
 * const count = useCount()
 * ```
 *
 * @see {@link https://s3xysteak.github.io/fnclip/functions/vue/createProvider/}
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
