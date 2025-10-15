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
 *
 * @see {@link https://s3xysteak.github.io/fnclip/functions/object/createMeta/}
 */
export function createMeta<Meta = any>(__for_type_infer?: Meta, META_KEY: PropertyKey = Symbol('createMeta')) {
  const getEntry = (target: any): { value?: any } => target?.[META_KEY]

  const set = (target: any, meta: Meta) => {
    const entry = getEntry(target)
    if (!entry) {
      Object.defineProperty(target, META_KEY, {
        value: { value: meta },
        writable: true,
        enumerable: true,
        configurable: true,
      })
    }
    else {
      entry.value = meta
    }
  }

  const get = (target: any) => {
    const entry = getEntry(target)
    return entry?.value as Meta | undefined
  }

  return [set, get] as const
}
