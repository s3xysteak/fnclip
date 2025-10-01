<h1 align="center">fnclip</h1>

<p align="center">
Use functions only what you want.
</p>

> 🔨 Still WIP bro plz do not use it.

Just like many other tool libraries, but **you can use only the functions you need** through the clipboard or CLI.

Sometimes I just want maybe one tool function, but I had to install a whole library. When I tried to just copy what I want, I found a lots of complex dependencies... Which is so annoying. Thus this library was born.

## QUICK START!

```sh
npx fnclip add pipe
```

This will add `pipe` function to your `src/utils/fnclip/pipe.js`, add generate `src/utils/fnclip/index.js` to export it.

## ✨ Features

1. Each single file under `src/functions/` represents an independent function without any dependencies, you can copy and use it directly!
2. And also there is a **z** for your convenience, check below.
3. Both support js/ts. It will automatically find out what you are using, but you can still indicate it manually. For js, it will provide `d.ts`.
4. The cli only support nodejs currently. But you can still just copy the file you want!

## 🚀 Usage

To check all details, please use `--help`!

Now have commands `add`, `clear`, `list`.

```sh
npx fnclip -h
npx fnclip add -h
```

### basic

Add a function to `src/utils/fnclip/pipe.ts`.

Add or update `src/utils/fnclip/index.ts` like `export * from './xxx.ts'`.

```sh
npx fnclip add pipe
```

(Or use alias `add|i|install`)

### change target path

Add a function to `packages/other/fnclip/pipe.ts`.

Add or update index like above.

```sh
npx fnclip add pipe --cwd packages/other --dir fnclip
```

### if you do not want `index`

This will prevent adding/updating index file.

```sh
npx fnclip add pipe --no-index
```

### typescript or javascript

By default it will automatically choose ts or js. Or you can manually specify it:

```sh
npx fnclip add pipe --ts
npx fnclip add pipe --no-ts
```

### add a lot of functions at once

Mostly use it while starting a new project.

```sh
npx fnclip add objectKeys objectMap nonNullable
```

### Pre configuration (✨Recommend!)

Just prepare for it in `package.json/scripts`.

```json
{
  "scripts": {
    "fnclip:add": "npx fnclip add --no-index --ts --dir src/utils/my-fn",
    "fnclip:clear": "npx fnclip clear --dir src/utils/my-fn"
  }
}
```

To use it:

```sh
npm fnclip:add pipe # add pipe function
```

### ... and more!

Please refer to `--help`

```sh
npx fnclip add pipe

npx fnclip remove pipe

npx fnclip clear # remove all fnclip functions

npx fnclip list # list all installed functions
npx fnclip list --remote # list all fnclip functions
```

## License

[MIT](/LICENSE) License © 2025-PRESENT [s3xysteak](https://github.com/s3xysteak/)
