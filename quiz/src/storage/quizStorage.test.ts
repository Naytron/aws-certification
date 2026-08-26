import { beforeEach, describe, expect, it, vi } from 'vitest'
import { questions } from '@/data/questions'
import type { PersistedQuizState } from '@/domain/quiz'
import {
  makePersistableAttempt,
  makeResult,
  MemoryStorage,
} from '@/test/fixtures'
import {
  loadQuizState,
  MAX_RESULT_HISTORY,
  QUIZ_STORAGE_KEY,
  resetQuizState,
  saveQuizState,
} from './quizStorage'

function throwingStorage(method: 'getItem' | 'setItem' | 'removeItem'): Storage {
  return {
    clear: vi.fn(),
    getItem:
      method === 'getItem'
        ? vi.fn(() => {
            throw new Error('read denied')
          })
        : vi.fn(() => null),
    key: vi.fn(() => null),
    removeItem:
      method === 'removeItem'
        ? vi.fn(() => {
            throw new Error('remove denied')
          })
        : vi.fn(),
    setItem:
      method === 'setItem'
        ? vi.fn(() => {
            throw new Error('quota exceeded')
          })
        : vi.fn(),
    length: 0,
  }
}

describe('quiz state persistence', () => {
  let storage: Storage

  beforeEach(() => {
    storage = new MemoryStorage()
  })

  it('round trips a valid attempt and result', () => {
    const question = questions[0]!
    const currentAttempt = makePersistableAttempt(100)
    const state: PersistedQuizState = {
      schemaVersion: 1,
      currentAttempt: {
        ...currentAttempt,
        answers: {
          ...currentAttempt.answers,
          [question.id]: [question.correctOptionIds[0]!],
        },
      },
      results: [makeResult('result-one')],
    }

    expect(saveQuizState(state, storage)).toBeNull()
    expect(loadQuizState(storage)).toEqual({
      state,
      recoveryNotice: null,
    })
  })

  it('recovers from corrupt JSON and incompatible schemas', () => {
    storage.setItem(QUIZ_STORAGE_KEY, '{not-json')
    expect(loadQuizState(storage)).toEqual({
      state: { schemaVersion: 1, currentAttempt: null, results: [] },
      recoveryNotice: 'Saved quiz data was corrupt and was safely ignored.',
    })

    storage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({ schemaVersion: 2, currentAttempt: null, results: [] }),
    )
    expect(loadQuizState(storage)).toEqual({
      state: { schemaVersion: 1, currentAttempt: null, results: [] },
      recoveryNotice:
        'Saved quiz data was incomplete or from an incompatible version and was safely ignored.',
    })
  })

  it('caps result history at ten when saving and loading', () => {
    const results = Array.from({ length: 12 }, (_, index) =>
      makeResult(`result-${index}`),
    )
    const state: PersistedQuizState = {
      schemaVersion: 1,
      currentAttempt: null,
      results,
    }

    saveQuizState(state, storage)
    expect(
      JSON.parse(storage.getItem(QUIZ_STORAGE_KEY) ?? '').results,
    ).toHaveLength(MAX_RESULT_HISTORY)

    storage.setItem(QUIZ_STORAGE_KEY, JSON.stringify(state))
    expect(loadQuizState(storage).state.results).toEqual(
      results.slice(0, MAX_RESULT_HISTORY),
    )
  })

  it('rejects semantically invalid timers and contradictory result totals', () => {
    const invalidTimedAttempt = {
      ...makePersistableAttempt(100),
      config: { kind: 'level', level: 100, timed: true },
    }
    storage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 1,
        currentAttempt: invalidTimedAttempt,
        results: [],
      }),
    )
    expect(loadQuizState(storage).recoveryNotice).toContain('incompatible version')

    const contradictoryResult = {
      ...makeResult('contradictory'),
      percentage: 0,
    }
    storage.setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify({
        schemaVersion: 1,
        currentAttempt: null,
        results: [contradictoryResult],
      }),
    )
    expect(loadQuizState(storage).state.results).toEqual([])
    expect(loadQuizState(storage).recoveryNotice).toContain('incompatible version')
  })

  it('reports storage read, write, and remove failures precisely', () => {
    expect(loadQuizState(throwingStorage('getItem'))).toEqual({
      state: { schemaVersion: 1, currentAttempt: null, results: [] },
      recoveryNotice:
        'Saved quiz data could not be read (read denied). A new session is available.',
    })

    expect(
      saveQuizState(
        { schemaVersion: 1, currentAttempt: null, results: [] },
        throwingStorage('setItem'),
      ),
    ).toBe('Progress could not be saved: quota exceeded')
    expect(resetQuizState(throwingStorage('removeItem'))).toBe(
      'Saved data could not be removed: remove denied',
    )
  })

  it('recovers when browser policy blocks the localStorage getter', () => {
    const descriptor = Object.getOwnPropertyDescriptor(window, 'localStorage')
    Object.defineProperty(window, 'localStorage', {
      configurable: true,
      get() {
        throw new DOMException('blocked by policy', 'SecurityError')
      },
    })

    try {
      expect(loadQuizState()).toEqual({
        state: { schemaVersion: 1, currentAttempt: null, results: [] },
        recoveryNotice:
          'Saved quiz data could not be read. A new session is available.',
      })
      expect(
        saveQuizState({
          schemaVersion: 1,
          currentAttempt: null,
          results: [],
        }),
      ).toBe('Progress could not be saved')
      expect(resetQuizState()).toBe(
        'Saved data could not be removed',
      )
    } finally {
      if (descriptor) {
        Object.defineProperty(window, 'localStorage', descriptor)
      }
    }
  })

  it('removes all persisted quiz state on reset', () => {
    storage.setItem(QUIZ_STORAGE_KEY, 'saved')

    expect(resetQuizState(storage)).toBeNull()
    expect(storage.getItem(QUIZ_STORAGE_KEY)).toBeNull()
  })
})
