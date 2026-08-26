import { useEffect, useRef, useState } from 'react'
import type { QuizAttempt } from '@/domain/quiz'

export interface AttemptTiming {
  elapsedSeconds: number
  remainingSeconds: number | undefined
}

export function getAttemptTiming(attempt: QuizAttempt, now = Date.now()): AttemptTiming {
  const startedAt = Date.parse(attempt.startedAt)
  const observedElapsed = Number.isFinite(startedAt)
    ? Math.max(attempt.elapsedSeconds, Math.floor((now - startedAt) / 1000))
    : attempt.elapsedSeconds
  const durationSeconds = attempt.config.durationSeconds
  const elapsedSeconds =
    attempt.config.timed && durationSeconds !== undefined
      ? Math.min(observedElapsed, durationSeconds)
      : observedElapsed
  const remainingSeconds =
    attempt.config.timed && durationSeconds !== undefined
      ? Math.max(0, durationSeconds - elapsedSeconds)
      : undefined
  return { elapsedSeconds, remainingSeconds }
}

export function useAttemptClock(
  attempt: QuizAttempt | null,
  active: boolean,
  onTick: (timing: AttemptTiming) => void,
) {
  const attemptRef = useRef(attempt)
  const [snapshot, setSnapshot] = useState<{
    attemptId: string | null
    timing: AttemptTiming
  }>(() => ({
    attemptId: attempt?.id ?? null,
    timing: attempt
      ? getAttemptTiming(attempt)
      : { elapsedSeconds: 0, remainingSeconds: undefined },
  }))

  useEffect(() => {
    attemptRef.current = attempt
  }, [attempt])

  useEffect(() => {
    const initialAttempt = attemptRef.current
    if (
      !active ||
      !initialAttempt ||
      initialAttempt.status !== 'in-progress'
    ) {
      return undefined
    }
    const tick = () => {
      const currentAttempt = attemptRef.current
      if (
        !currentAttempt ||
        currentAttempt.id !== initialAttempt.id ||
        currentAttempt.status !== 'in-progress'
      ) {
        return
      }
      const nextTiming = getAttemptTiming(currentAttempt)
      setSnapshot({ attemptId: currentAttempt.id, timing: nextTiming })
      onTick(nextTiming)
    }
    tick()
    const interval = window.setInterval(tick, 1000)
    return () => window.clearInterval(interval)
  }, [
    active,
    attempt?.config.durationSeconds,
    attempt?.config.timed,
    attempt?.id,
    attempt?.startedAt,
    attempt?.status,
    onTick,
  ])

  if (!attempt) return { elapsedSeconds: 0, remainingSeconds: undefined }
  return snapshot.attemptId === attempt.id
    ? snapshot.timing
    : getAttemptTiming(attempt)
}
