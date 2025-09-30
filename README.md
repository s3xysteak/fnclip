<h1 align="center">fnclip</h1>

<p align="center">
Use functions only what you want.
</p>

> 🔨 Still WIP bro plz do not use it.

Just like many other tool libraries, but **you can use only the functions you need** through the clipboard or CLI.

Sometimes I just want maybe one tool function, but I had to install a whole library. When I tried to just copy what I want, I found a lots of complex dependencies... Which is so annoying. Thus this library was born.

## ✨ Features

1. Each single file under `src/functions/` represents an independent function without any dependencies, you can copy and use it directly!
2. And also there is a cli for your convenience, check below.
3. Both support js/ts. It will automatically find out what you are using, but you can still indicate it manually. For js, it will provide `d.ts`.
4. The cli only support nodejs currently. But you can still just copy the file you want!

## 🚀 example (quick start!)

To check all details, please use `--help`!

```sh
pnpx fnclip -h
pnpx fnclip add -h
```

### basic

Add a function to `src/utils/fnclip/pipe.ts`.

Add or update `src/utils/fnclip/index.ts` `->` like `export * from './xxx.ts'`.

```sh
pnpx fnclip add pipe
```

(Or use alias `add|i|install`)

### change target path

Add a function to `packages/other/fnclip/pipe.ts`.

Add or update index like above.

```sh
pnpx fnclip add pipe --cwd packages/other --dir fnclip
```

### if you do not want `index`

This will prevent adding/updating index file.

```sh
pnpx fnclip add pipe --no-index
```

### typescript or javascript

Manually choose ts or js.

```sh
pnpx fnclip add pipe --ts
pnpx fnclip add pipe --no-ts
```

### add a lot of functions at once

Mostly use it while starting a new project.

```sh
pnpx fnclip add objectKeys objectMap nonNullable
```

### Pre configuration (✨Recommend!)

Just prepare for it in `package.json/scripts`.

```json
{
  "scripts": {
    "fnclip:add": "pnpx fnclip@v0.0.2 add --no-index --ts --dir src/utils/my-fn",
    "fnclip:clear": "pnpx fnclip@v0.0.2 clear --dir src/utils/my-fn"
  }
}
```

To use it:

```sh
pnpm fnclip:add pipe # add pipe function
```

## License

[MIT](/LICENSE) License © 2025-PRESENT [s3xysteak](https://github.com/s3xysteak/)
