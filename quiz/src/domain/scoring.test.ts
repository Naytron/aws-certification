import { describe, expect, it } from 'vitest'
import { readinessLabel, scoreAttempt, scoreQuestion } from './scoring'
import { makeAttempt, makeQuestion } from '@/test/fixtures'

describe('quiz scoring', () => {
  const single = makeQuestion('single', { level: 200, topic: 'Compute' })
  const multiple = makeQuestion('multiple', {
    level: 100,
    topic: 'Storage',
    type: 'multiple',
  })

  it('scores single choice, multiple response, and unanswered questions', () => {
    expect(scoreQuestion(single, ['a'])).toMatchObject({
      correct: true,
      answered: true,
    })
    expect(scoreQuestion(single, ['b'])).toMatchObject({
      correct: false,
      answered: true,
    })
    expect(scoreQuestion(multiple, ['b', 'a'])).toMatchObject({
      correct: true,
      answered: true,
    })
    expect(scoreQuestion(multiple, ['a'])).toMatchObject({
      correct: false,
      answered: true,
    })
    expect(scoreQuestion(multiple, ['a', 'b', 'c'])).toMatchObject({
      correct: false,
      answered: true,
    })
    expect(scoreQuestion(single)).toMatchObject({
      correct: false,
      answered: false,
    })
  })

  it('aggregates results by sorted level and topic', () => {
    const questions = [
      single,
      multiple,
      makeQuestion('network', { level: 400, topic: 'Networking' }),
      makeQuestion('storage-two', { level: 100, topic: 'Storage' }),
    ]
    const attempt = makeAttempt(questions, {
      single: ['a'],
      multiple: ['a'],
      network: ['a'],
    })
    const result = scoreAttempt(
      attempt,
      questions,
      new Date('2026-03-01T00:00:00.000Z'),
    )

    expect(result).toMatchObject({
      correct: 2,
      answered: 3,
      total: 4,
      percentage: 50,
    })
    expect(result.levels).toEqual([
      { level: 100, correct: 0, total: 2 },
      { level: 200, correct: 1, total: 1 },
      { level: 400, correct: 1, total: 1 },
    ])
    expect(result.topics).toEqual([
      { topic: 'Compute', correct: 1, total: 1 },
      { topic: 'Networking', correct: 1, total: 1 },
      { topic: 'Storage', correct: 0, total: 2 },
    ])
  })

  it('uses clear readiness wording at each threshold', () => {
    expect(readinessLabel(0)).toBe('Keep building')
    expect(readinessLabel(69)).toBe('Keep building')
    expect(readinessLabel(70)).toBe('Developing result')
    expect(readinessLabel(79)).toBe('Developing result')
    expect(readinessLabel(80)).toBe('Strong result')
    expect(readinessLabel(100)).toBe('Strong result')
  })
})
