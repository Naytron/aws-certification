import fs from 'node:fs'
import path from 'node:path'
import { describe, expect, it } from 'vitest'
import { QUIZ_LEVELS, type QuizLevel } from '@/domain/quiz'
import { questions } from './questions'

function normalizedPrompt(prompt: string): string {
  return prompt.toLowerCase().replace(/\s+/g, ' ').trim()
}

function countByLevel(level: QuizLevel): number {
  return questions.filter((question) => question.level === level).length
}

describe('question bank contract', () => {
  it('contains exactly 100 questions and 25 at each level', () => {
    expect(questions).toHaveLength(100)

    for (const level of QUIZ_LEVELS) {
      expect(countByLevel(level)).toBe(25)
    }
  })

  it('uses unique stable IDs and prompts', () => {
    const ids = questions.map((question) => question.id)
    const prompts = questions.map((question) => normalizedPrompt(question.prompt))

    expect(new Set(ids).size).toBe(ids.length)
    expect(new Set(prompts).size).toBe(prompts.length)

    for (const level of QUIZ_LEVELS) {
      const expectedIds = Array.from(
        { length: 25 },
        (_, index) => `l${level}-${String(index + 1).padStart(3, '0')}`,
      )
      expect(ids.filter((id) => id.startsWith(`l${level}-`))).toEqual(expectedIds)
    }
  })

  it('has valid options, answers, and multiple-response counts', () => {
    for (const question of questions) {
      const optionIds = question.options.map((option) => option.id)

      expect(question.options).toHaveLength(question.type === 'single' ? 4 : 5)
      expect(new Set(optionIds).size).toBe(optionIds.length)
      expect(question.correctOptionIds.length).toBe(
        question.type === 'single' ? 1 : question.correctOptionIds.length,
      )

      if (question.type === 'multiple') {
        expect(question.correctOptionIds.length).toBeGreaterThanOrEqual(2)
        expect(question.correctOptionIds.length).toBeLessThan(question.options.length)
        expect(question.prompt.toLowerCase()).toMatch(/\b(two|three|2|3)\b/)
      }

      for (const correctOptionId of question.correctOptionIds) {
        expect(optionIds).toContain(correctOptionId)
      }
    }
  })

  it('provides decision guidance and rejects a real distractor', () => {
    for (const question of questions) {
      const optionIds = question.options.map((option) => option.id)

      expect(question.topic.trim().length).toBeGreaterThan(2)
      expect(question.explanation.trim().length).toBeGreaterThan(40)
      expect(question.strongestDistractor.trim().length).toBeGreaterThan(35)
      expect(question.whenToUse.trim().length).toBeGreaterThan(30)
      expect(optionIds).not.toContain(question.strongestDistractor.trim())

      const rationale = [
        question.explanation,
        question.strongestDistractor,
        question.whenToUse,
      ].join(' ')
      expect(rationale).not.toMatch(/\b(?:option|answer)\s+[A-E]\b/i)
      expect(
        [...rationale].every((character) => (character.codePointAt(0) ?? 0) <= 127),
      ).toBe(true)
    }
  })

  it('meets feature-selection, format, and topic coverage per level', () => {
    for (const level of QUIZ_LEVELS) {
      const levelQuestions = questions.filter((question) => question.level === level)
      const featureQuestions = levelQuestions.filter(
        (question) => question.featureSelection,
      )
      const multipleResponse = levelQuestions.filter(
        (question) => question.type === 'multiple',
      )
      const topics = new Set(levelQuestions.map((question) => question.topic))

      expect(featureQuestions.length).toBeGreaterThanOrEqual(13)
      expect(multipleResponse.length).toBeGreaterThanOrEqual(5)
      expect(multipleResponse.length).toBeLessThanOrEqual(7)
      expect(topics.size).toBeGreaterThanOrEqual(6)
    }
  })

  it('links every item to an existing course file', () => {
    const repositoryRoot = path.resolve(process.cwd(), '..')

    for (const question of questions) {
      expect(question.reference.label.trim().length).toBeGreaterThan(4)
      expect(question.reference.path).not.toMatch(/^https?:/)
      expect(
        fs.existsSync(path.resolve(repositoryRoot, question.reference.path)),
        `${question.id} references missing path ${question.reference.path}`,
      ).toBe(true)
    }
  })
})
