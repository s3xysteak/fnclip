import { describe, expect, it } from 'vitest'
import { createPromiseQueue } from '.'

describe.concurrent('createPromiseQueue', () => {
  it('should work', async () => {
    const logs: string[] = []
    const queue = createPromiseQueue()

    let timeBetween2and3 = 0
    queue
      .run(sleep(1), () => logs.push('1!'))
      .run(sleep(50), () => {
        logs.push('2!')
        timeBetween2and3 = performance.now()
      })
      .run(sleep(40), () => {
        logs.push('3!')
        timeBetween2and3 = performance.now() - timeBetween2and3
      })
    await queue.wait()

    // FIFO
    expect(logs).toEqual(['1!', '2!', '3!'])
    // Immediately call callback after previous callback finishing if task is done
    expect(timeBetween2and3).toBeLessThanOrEqual(1)
  })

  it('should work with forEach', async () => {
    const logs: string[] = []
    const queue = createPromiseQueue()
    ;[1, 50, 40].forEach((time, index) => {
      queue.run(sleep(time), () => logs.push(`${index + 1}!`))
    })
    await queue.wait()

    expect(logs).toEqual(['1!', '2!', '3!'])
  })

  it('should work with async callback', async () => {
    const logs: string[] = []
    const queue = createPromiseQueue()
    ;[1, 50, 40].forEach((time, index) => {
      queue.run(
        async () => {
          await sleep(time)
          return time
        },
        async (t) => {
          await sleep(t)
          logs.push(`${index + 1}!`)
        },
      )
    })
    await queue.wait()

    expect(logs).toEqual(['1!', '2!', '3!'])
  })
})

function sleep(ms: number, callback?: () => any) {
  return new Promise<void>(resolve =>

    setTimeout(async () => {
      await callback?.()
      resolve()
    }, ms),
  )
}
