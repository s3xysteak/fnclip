Make isomorphic destructurable for object and array at the same time, mostly use in some utility function:

```js
function func() {
  let val

  const set = newVal => val = newValue
  const get = () => val

  return makeDestructurable(
    { set, get },
    [set, get]
  )
}
```

To use it:

```js
const { set, get } = func()
```

Also worked with:

```js
const [set, get] = func()
```

Refer to [vueuse](https://vueuse.org/shared/makeDestructurable/).
