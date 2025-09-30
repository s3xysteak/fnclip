import { describe, expect, it, vi } from 'vitest'
import { createPromiseQueue } from '.'

describe('createPromiseQueue', () => {
  // TODO: improve test

  it('should work', async () => {
    const p3 = vi.fn()
    const p2 = vi.fn()
    const p10 = vi.fn()

    let timeStart: number

    const timeOffset = () => Math.abs(timestamp() - timeStart)

    const queue = createPromiseQueue()

    queue
      .run(async () => {
        await sleep(30)
        return 3
      }, (v) => {
        expect(v).toBe(3)
        timeStart = timestamp()
        p3()
      })
      .run(async () => {
        await sleep(20)
        return 2
      }, (v) => {
        expect(v).toBe(2)
        p2(timeOffset() < 3)
      })
      .run(async () => {
        await sleep(100)
        return 'ten'
      }, (v) => {
        expect(v).toBe('ten')
        p10(timeOffset() > 50)
      })

    await queue.wait()
    expect(p3).toHaveBeenCalled()
    expect(p2).toHaveBeenCalledWith(true)
    expect(p10).toHaveBeenCalledWith(true)
  })

  it('should work with forEach', async () => {
    const p3 = vi.fn()
    const p2 = vi.fn()
    const p10 = vi.fn()

    let timeStart: number

    const timeOffset = () => Math.abs(timestamp() - timeStart)

    const queue = createPromiseQueue()

    const arr = [3, 2, 10]

    arr.forEach((v) => {
      queue.run(async () => {
        await sleep(v * 10)
        return v
      }, (val) => {
        if (val === 3)
          timeStart = timestamp()

        if (val === 2)
          p3()
        if (val === 3)
          p2(timeOffset() < 3)
        if (val === 10)
          p10(timeOffset() > 50)
      })
    })

    await queue.wait()
    expect(p3).toHaveBeenCalled()
    expect(p2).toHaveBeenCalledWith(true)
    expect(p10).toHaveBeenCalledWith(true)
  })

  it('should work with async callback', async () => {
    const p3 = vi.fn()
    const p2 = vi.fn()
    const p10 = vi.fn()

    let timeStart: number

    const timeOffset = () => Math.abs(timestamp() - timeStart)

    const queue = createPromiseQueue()

    const arr = [3, 2, 10]

    arr.forEach((v) => {
      queue.run(async () => {
        await sleep(v * 10)
        return v
      }, async (val) => {
        if (val === 3)
          timeStart = timestamp()

        if (val === 2)
          p3()
        if (val === 3)
          p2(timeOffset() < 3)
        if (val === 10)
          p10(timeOffset() > 50)
      })
    })

    await queue.wait()
    expect(p3).toHaveBeenCalled()
    expect(p2).toHaveBeenCalledWith(true)
    expect(p10).toHaveBeenCalledWith(true)
  })
})

function timestamp() {
  return +Date.now()
}

function sleep(ms: number, callback?: () => any) {
  return new Promise<void>(resolve =>

    setTimeout(async () => {
      await callback?.()
      resolve()
    }, ms),
  )
}
