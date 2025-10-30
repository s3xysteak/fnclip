import * as fs from 'node:fs/promises'

export async function exists(pathname: string) {
  try {
    await fs.access(pathname)
    return true
  }
  catch {
    return false
  }
}
