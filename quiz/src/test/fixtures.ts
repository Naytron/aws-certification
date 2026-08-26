import { createQuizAttempt } from '@/domain/attempts'
import { questions as questionBank } from '@/data/questions'
import type {
  AttemptResult,
  QuizAttempt,
  QuizLevel,
  QuizQuestion,
  QuestionType,
} from '@/domain/quiz'
import { scoreAttempt } from '@/domain/scoring'

export class MemoryStorage implements Storage {
  readonly #values = new Map<string, string>()

  get length() {
    return this.#values.size
  }

  clear() {
    this.#values.clear()
  }

  getItem(key: string) {
    return this.#values.get(key) ?? null
  }

  key(index: number) {
    return [...this.#values.keys()][index] ?? null
  }

  removeItem(key: string) {
    this.#values.delete(key)
  }

  setItem(key: string, value: string) {
    this.#values.set(key, String(value))
  }
}

export function makeQuestion(
  id: string,
  {
    level = 100,
    topic = 'Storage',
    type = 'single',
  }: {
    level?: QuizLevel
    topic?: string
    type?: QuestionType
  } = {},
): QuizQuestion {
  return {
    id,
    level,
    topic,
    type,
    prompt: `Prompt for ${id}`,
    options: [
      { id: 'a', text: `${id} option A` },
      { id: 'b', text: `${id} option B` },
      { id: 'c', text: `${id} option C` },
      { id: 'd', text: `${id} option D` },
    ],
    correctOptionIds: type === 'multiple' ? ['a', 'b'] : ['a'],
    explanation: `Explanation for ${id}`,
    strongestDistractor: `${id} option B is the strongest distractor.`,
    whenToUse: `Use the correct pattern for ${id}.`,
    featureSelection: false,
    reference: { label: `Reference for ${id}`, path: `course/${id}.md` },
  }
}

export function makeAttempt(
  questions: readonly QuizQuestion[],
  answers: Record<string, string[]> = {},
): QuizAttempt {
  return {
    ...createQuizAttempt(
      questions,
      { kind: 'mixed', timed: false },
      1234,
      new Date('2026-01-02T03:04:05.000Z'),
    ),
    answers,
  }
}

export function makeResult(
  attemptId: string,
  level: QuizLevel = 100,
): AttemptResult {
  const selectedQuestions = questionBank.filter((question) => question.level === level)
  const answers = Object.fromEntries(
    selectedQuestions.map((question) => [
      question.id,
      [...question.correctOptionIds],
    ]),
  )
  const attempt = {
    ...createQuizAttempt(
      questionBank,
      { kind: 'level' as const, level, timed: false },
      1234,
      new Date('2026-01-02T03:04:05.000Z'),
    ),
    id: attemptId,
    answers,
    status: 'submitted' as const,
    submittedAt: '2026-01-02T03:05:05.000Z',
    elapsedSeconds: 60,
  }
  return scoreAttempt(attempt, questionBank, new Date(attempt.submittedAt))
}

export function makePersistableAttempt(level: QuizLevel = 100): QuizAttempt {
  return createQuizAttempt(
    questionBank,
    { kind: 'level', level, timed: false },
    1234,
    new Date('2026-01-02T03:04:05.000Z'),
  )
}
