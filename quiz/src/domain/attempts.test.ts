import { describe, expect, it } from 'vitest'
import { questions } from '@/data/questions'
import {
  createQuizAttempt,
  orderedOptions,
  shuffleWithSeed,
} from './attempts'
import { makeQuestion } from '@/test/fixtures'

describe('seeded attempts', () => {
  it('shuffles deterministically without mutating the source', () => {
    const source = ['a', 'b', 'c', 'd', 'e', 'f']

    expect(shuffleWithSeed(source, 42)).toEqual(shuffleWithSeed(source, 42))
    expect(source).toEqual(['a', 'b', 'c', 'd', 'e', 'f'])
    expect(shuffleWithSeed(source, 43)).not.toEqual(shuffleWithSeed(source, 42))
  })

  it('uses the seed for stable question and option orders', () => {
    const fixture = Array.from({ length: 12 }, (_, index) =>
      makeQuestion(`q-${index}`),
    )
    const config = { kind: 'mixed', timed: false } as const
    const startedAt = new Date('2026-02-03T04:05:06.000Z')
    const first = createQuizAttempt(fixture, config, 99, startedAt)
    const repeated = createQuizAttempt(fixture, config, 99, startedAt)
    const changed = createQuizAttempt(fixture, config, 100, startedAt)

    expect(repeated).toEqual(first)
    expect({
      questions: changed.questionIds,
      options: changed.optionOrderByQuestion,
    }).not.toEqual({
      questions: first.questionIds,
      options: first.optionOrderByQuestion,
    })
  })

  it('selects 25 questions for a level and all 100 for mixed practice', () => {
    const level = createQuizAttempt(
      questions,
      { kind: 'level', level: 300, timed: false },
      10,
    )
    const mixed = createQuizAttempt(
      questions,
      { kind: 'mixed', timed: false },
      10,
    )

    expect(level.questionIds).toHaveLength(25)
    expect(
      level.questionIds.every((id) => id.startsWith('l300-')),
    ).toBe(true)
    expect(mixed.questionIds).toHaveLength(100)
    expect(new Set(mixed.questionIds)).toHaveLength(100)
  })

  it('keeps each option order stable throughout an attempt', () => {
    const question = makeQuestion('stable-options')
    const attempt = createQuizAttempt(
      [question],
      { kind: 'mixed', timed: false },
      500,
    )
    const initialIds = orderedOptions(attempt, question).map(({ id }) => id)
    const progressedAttempt = {
      ...attempt,
      answers: { [question.id]: ['a'] },
      flaggedQuestionIds: [question.id],
    }

    expect(orderedOptions(progressedAttempt, question).map(({ id }) => id)).toEqual(
      initialIds,
    )
    expect(initialIds).toEqual(attempt.optionOrderByQuestion[question.id])
  })
})
