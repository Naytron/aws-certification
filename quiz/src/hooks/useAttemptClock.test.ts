import { act, renderHook } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { makeAttempt, makeQuestion } from '@/test/fixtures'
import { getAttemptTiming, useAttemptClock } from './useAttemptClock'

afterEach(() => vi.useRealTimers())

describe('attempt clock', () => {
  it('calculates elapsed and remaining time from the start instant', () => {
    const attempt = {
      ...makeAttempt([makeQuestion('timing')]),
      config: {
        kind: 'mixed' as const,
        timed: true,
        durationSeconds: 120,
      },
      elapsedSeconds: 5,
    }

    expect(
      getAttemptTiming(attempt, Date.parse(attempt.startedAt) + 45_900),
    ).toEqual({ elapsedSeconds: 45, remainingSeconds: 75 })
    expect(
      getAttemptTiming(attempt, Date.parse(attempt.startedAt) + 125_000),
    ).toEqual({ elapsedSeconds: 120, remainingSeconds: 0 })
  })

  it('preserves persisted elapsed time when a resumed clock is behind it', () => {
    const attempt = {
      ...makeAttempt([makeQuestion('resumed')]),
      elapsedSeconds: 80,
    }

    expect(
      getAttemptTiming(attempt, Date.parse(attempt.startedAt) + 30_000),
    ).toEqual({ elapsedSeconds: 80, remainingSeconds: undefined })
  })

  it('ticks a timed attempt through expiry', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-02T03:04:05.000Z'))
    const attempt = {
      ...makeAttempt([makeQuestion('expires')]),
      config: {
        kind: 'mixed' as const,
        timed: true,
        durationSeconds: 2,
      },
    }
    const onTick = vi.fn()
    const { result } = renderHook(() => useAttemptClock(attempt, true, onTick))

    expect(onTick).toHaveBeenLastCalledWith({
      elapsedSeconds: 0,
      remainingSeconds: 2,
    })

    act(() => {
      vi.advanceTimersByTime(2_000)
    })

    expect(onTick).toHaveBeenLastCalledWith({
      elapsedSeconds: 2,
      remainingSeconds: 0,
    })
    expect(result.current).toEqual({
      elapsedSeconds: 2,
      remainingSeconds: 0,
    })
  })

  it('reports an expired resumed attempt immediately on activation', () => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date('2026-01-02T03:04:15.000Z'))
    const attempt = {
      ...makeAttempt([makeQuestion('expired-resume')]),
      config: {
        kind: 'mixed' as const,
        timed: true,
        durationSeconds: 2,
      },
    }
    const onTick = vi.fn()

    renderHook(() => useAttemptClock(attempt, true, onTick))

    expect(onTick).toHaveBeenCalledWith({
      elapsedSeconds: 2,
      remainingSeconds: 0,
    })
  })
})
