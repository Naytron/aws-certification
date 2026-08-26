import type { QuizLevel, QuizQuestion } from '@/domain/quiz'
import { level100Questions } from './level100'
import { level200Questions } from './level200'
import { level300Questions } from './level300'
import { level400Questions } from './level400'

export const questions: QuizQuestion[] = [
  ...level100Questions,
  ...level200Questions,
  ...level300Questions,
  ...level400Questions,
]

export const questionsById = new Map(
  questions.map((question) => [question.id, question]),
)

export function getQuestionsForLevel(level: QuizLevel): QuizQuestion[] {
  return questions.filter((question) => question.level === level)
}
