<h1 align="center">fnclip</h1>

<p align="center">
Use only the functions you need.
</p>

<br>
<p align="center">
<a href="https://s3xysteak.github.io/fnclip/">📚 Documentation</a>
</p>
<br>

`fnclip` lets you copy and use only the functions you need, without installing entire libraries or worrying about dependencies.

## QUICK START!

```sh
npx fnclip add pipe
```

This will add the `pipe` function to `src/utils/fnclip/pipe.ts` (or `.js` and `.d.ts`) and update `src/utils/fnclip/index.ts` to export it.

## ✨ Features

1. Each single file under `src/functions/` represents an independent function without any dependencies, you can copy and use it directly!
2. Provide a convenient cli for quick access (see below).
3. Automatically detects whether you are using JavaScript or TypeScript, but you can specify manually if needed.
4. The cli only support nodejs currently. But you can still just copy the file you want!

## 🚀 Usage

To check all details, please use `--help`!

Now have commands `add`, `clear`, `list`.

```sh
npx fnclip -h
npx fnclip add -h
```

### Adding functions

```sh
npx fnclip add pipe
```

This will add `pipe` to `src/utils/fnclip/pipe.ts`, and automatically add or update `src/utils/fnclip/index.ts` which contains `export * from './pipe.ts'`.

You can also use the following aliases: `add`, `i`, `install`.

```sh
npx fnclip i objectKeys objectMap nonNullable
```

This will add multiple functions to your project, which may be useful when you start a new project.

### Changing target path

Add a function to a custom directory, for example:

```sh
npx fnclip add pipe --cwd packages/other --dir fnclip
```

### About `index` file

This will prevent adding/updating index file.

```sh
npx fnclip add pipe --no-index
```

Or specify a path of index file

```sh
npx fnclip add pipe --index-path ../fnclip.js
```

It will specify index path in `src/utils/fnclip.js` instead of `src/utils/fnclip/index.js`

You can also omit extension and it will automatically add it for you `--index-path ../fnclip`

### Typescript or Javascript

By default it will automatically choose ts or js. Or you can manually specify it:

```sh
npx fnclip add pipe --ts
npx fnclip add pipe --no-ts
```

### Pre-configuration

You can use `npx fnclip config` to add a config file to your project:

`<root>/fnclip.config.js`

It looks like:

```js
export default defineConfig({})
```

The option can also be a function/async function. It supports all options which cli provided.

Or just prepare for it in `package.json/scripts`.

```json
{
  "scripts": {
    "fnclip:add": "npx fnclip add --no-index --ts --dir src/utils/my-fn",
    "fnclip:clear": "npx fnclip clear --dir src/utils/my-fn"
  }
}
```

Now you can run `npm fnclip:add pipe` to add functions easily.

### ... and more!

Please refer to `npx fnclip --help` `npx fnclip <command> --help`

```sh
npx fnclip add pipe

npx fnclip remove pipe

npx fnclip clear # remove all fnclip functions

npx fnclip list # list all installed functions
npx fnclip list --remote # list all fnclip functions
```

## License

[MIT](/LICENSE) License © 2025-PRESENT [s3xysteak](https://github.com/s3xysteak/)
