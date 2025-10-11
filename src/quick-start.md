# Quick Start

This page walks you through adding your first function and customizing your setup.

## Prerequisites

- Node.js and `npx` (or use `pnpx` etc.).

## Add Your First Function

```sh
npx fnclip add pipe
```

Done!

This will:
- Add the `pipe` function to your default directory (`src/utils/fnclip/pipe.ts` or `.js + .d.ts`).
- Automatically create or update `src/utils/fnclip/index.ts` with `export * from './pipe'`.

## Common CLI Commands

- `npx fnclip add <name>` (aliases: `i`, `install`) — Add a function
- `npx fnclip remove <name>` (aliases: `rm`, `delete`, `del`) — Remove a function
- `npx fnclip list` (aliases: `l`) — List installed functions (`--remote` for remote list)
- `npx fnclip clear` — Remove all fnclip functions
- `npx fnclip config` — Create a `fnclip.config.js` file in your project root

## Add Multiple Functions

```sh
npx fnclip i objectKeys objectMap nonNullable
```

## Custom Target Path

Add a function to a different directory:

```sh
npx fnclip add pipe --cwd packages/other --dir fnclip
```

- `--cwd`: Working directory (default: current directory)
- `--dir`: Target folder relative to cwd

## Controlling the Index File

By default, fnclip maintains an export index file (`src/utils/fnclip/index.ts`).

- Use `--no-index` to disable index updates.
- Use `--index-path` to specify a custom index file (extension optional).

```sh
# Disable index
npx fnclip add pipe --no-index

# Custom index path
npx fnclip add pipe --index-path ../fnclip.js
```

## TypeScript or JavaScript

fnclip auto-detects project type (via `tsconfig.json`, `.ts` files, etc.). You can override manually:

```sh
npx fnclip add pipe --ts       # Force TypeScript
npx fnclip add pipe --no-ts    # Force JavaScript (.js + .d.ts)
```

## Pre-configuration

Create a project-level `fnclip.config.js` with:

```js
// fnclip.config.js
export default {
  dir: 'src/utils/my-fn',
  index: 'src/utils/my-fn/index.ts',
  ts: true
}
```

And also there is a helper command for that, to create a file like that above with better type hints:

```sh
npx fnclip config
```

`fnclip` will automatically detect the config file while running.

Or define npm scripts for convenience:

```json
{
  "scripts": {
    "fnclip:add": "npx fnclip add --no-index --ts --dir src/utils/my-fn",
    "fnclip:clear": "npx fnclip clear --dir src/utils/my-fn"
  }
}
```

Now you can simply run:

```sh
npm run fnclip:add -- pipe
```

## Listing Functions

- `npx fnclip list` — Show installed functions.
- `npx fnclip list --remote` — Show all available functions from the remote repository.

## Tips & Troubleshooting

**Q: I don’t want an index file.**

A: Just use `--no-index`.

**Q: I am using nuxt and it cannot auto-import those functions.**

A: Because nuxt only auto-import the top level files in `utils` directory. To support it, just change the index path:

```sh
npx fnclip add pipe --index-path ../fnclip.js
```

This will add `index.js` to `src/utils/fnclip.js`, and function files still in `src/utils/fnclip/*`
