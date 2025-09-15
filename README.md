<h1 align="center">fnclip</h1>

<p align="center">
Use functions only what you want.
</p>

> 🔨 Still WIP bro plz do not use it.

## ✨ Features

Just like so many other tool libraries, but **you can use functions only what you want** by cli.

Sometimes I just want maybe one tool function, by I had to install a whole library. When I tried to just copy what I want, I found a lots of complex dependencies... Which is so annoying. Thus this library was born.

1. Each single file under `src/functions/` represents an independent function without any dependencies, you can copy and use it directly!
2. And also there is a cli for your convenience, check below.
3. Both support js/ts. It will automatically find out what you are using but you can still indicate it manually. For js, it will provide `d.ts`.
4. Only support nodejs currently. But you can still just copy the file you want!

## 🚀 example (quick start!)

### basic

Add a function to `src/utils/fnclip/pipe.ts`.

Add or update `src/utils/fnclip/index.ts` `->` like `export * from './xxx.ts'`.

```sh
pnpx fnclip add pipe
```

### change target path

Add a function to `packages/other/fnclip/pipe.ts`.

...

```sh
pnpx fnclip add pipe --cwd packages/other --dir fnclip
```

### if you do not want `index`

Do not add/update index file.

```sh
pnpx fnclip add pipe --no-index
```

### typescript or javascript

Manually choose ts or js.

```sh
pnpx fnclip add pipe --ts
pnpx fnclip add pipe --no-ts
```

## License

[MIT](/LICENSE) License © 2025-PRESENT [s3xysteak](https://github.com/s3xysteak/)
