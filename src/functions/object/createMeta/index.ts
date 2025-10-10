/**
 * Create Setter and Getter for property without conflict (based on Symbol).
 *
 * It is useful when you want to add properties to a complex object.
 *
 * @example
 * ```ts
 * const [set, get] = createMeta<{one: number}>()
 *
 * const ent = new Entity() // Assume a complex object provided by other library.
 * set(ent, { one: 1 })
 * get(ent) // = { one: 1 }
 *
 * // In js, you can provide a example object to specify the type of the meta data.
 *
 * // createMeta<{ one: number }>()
 * createMeta({ one: 1 })
 * ```
 */
export function createMeta<Meta = any>(__for_type_infer?: Meta, metaSymbol: PropertyKey = Symbol('createMeta')) {
  const set = <Target = any>(target: Target, meta: Meta) =>
    Object.defineProperty(target, metaSymbol, {
      value: meta,
      writable: true,
      enumerable: true,
      configurable: true,
    })

  const get = (target: any) => target?.[metaSymbol] as Meta | undefined

  return [set, get] as const
}
