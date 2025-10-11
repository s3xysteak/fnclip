# Introduction

**Use only the functions you need.** fnclip provides a collection of self-contained utility functions you can copy directly or add to your project via CLI.

## So many utility functions library, why fnclip?

- **Lightweight** — Each function is a single file with zero dependencies.
- **Copyable** — Grab only what you need, no full library installs.
- **Type-friendly** — Automatically detects TypeScript or JavaScript; generates `.d.ts` for JS users.
- **Quick to start** — Offers a simple CLI (`npx fnclip`) with commands like `add`, `remove`, `list`, and `clear`.

## How It Works

- Each utility in the repo lives as an independent file (e.g. `src/functions/pipe.ts`).
- Running the CLI (e.g. `npx fnclip add pipe`) copies the function into your target directory (default: `src/utils/fnclip/`) and optionally updates or creates an index file for unified exports.
- JS projects get `.js` + `.d.ts`, TS projects get `.ts`.

## Example Structure

```
src/
└─ utils/
   └─ fnclip/
      ├─ pipe.ts
      ├─ objectKeys.ts
      └─ index.ts
```

## Best For

- Pulling in specific utilities without installing entire libraries.
- Quickly bootstrapping a new project with essential helper functions.
- Educational or audit-friendly workflows where you want readable, standalone code.

## Design Principles

- **Single Responsibility** — Each file does one thing well.
- **Zero Dependency** — Always self-contained and easy to import.
- **Auditable** — Readable, minimal, and modifiable code.

::: tip
If you do not want to use these CLI, just copy [the codes in github repo](https://github.com/s3xysteak/fnclip/tree/main/src/functions)!
:::
