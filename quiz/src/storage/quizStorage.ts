import {
  EMPTY_PERSISTED_STATE,
  QUIZ_LEVELS,
  type AttemptResult,
  type PersistedQuizState,
  type QuizAttempt,
  type QuestionResult,
  type QuizQuestion,
} from '@/domain/quiz'
import { questionsById } from '@/data/questions'

export const QUIZ_STORAGE_KEY = 'aws-certification-quiz-state'
export const MAX_RESULT_HISTORY = 10

export interface LoadedQuizState {
  state: PersistedQuizState
  recoveryNotice: string | null
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((item) => typeof item === 'string')
}

function isStringArrayRecord(value: unknown): value is Record<string, string[]> {
  return (
    isRecord(value) &&
    Object.values(value).every((entry) => isStringArray(entry))
  )
}

function isValidDate(value: unknown): value is string {
  return typeof value === 'string' && Number.isFinite(Date.parse(value))
}

function isNonNegativeNumber(value: unknown): value is number {
  return typeof value === 'number' && Number.isFinite(value) && value >= 0
}

function isAttempt(value: unknown): value is QuizAttempt {
  if (!isRecord(value) || value.schemaVersion !== 1 || !isRecord(value.config)) {
    return false
  }
  const config = value.config
  const validKind =
    config.kind === 'mixed' ||
    (config.kind === 'level' &&
      typeof config.level === 'number' &&
      QUIZ_LEVELS.includes(config.level as (typeof QUIZ_LEVELS)[number]))
  const validStatus = ['in-progress', 'submitted', 'expired'].includes(
    String(value.status),
  )
  const validTimingConfig =
    typeof config.timed === 'boolean' &&
    (config.timed
      ? isNonNegativeNumber(config.durationSeconds) &&
        config.durationSeconds >= 60 &&
        isNonNegativeNumber(value.remainingSeconds) &&
        value.remainingSeconds <= config.durationSeconds
      : config.durationSeconds === undefined && value.remainingSeconds === undefined)
  const validStatusTiming =
    (value.status === 'in-progress' && value.submittedAt === undefined) ||
    (value.status === 'submitted' &&
      isValidDate(value.submittedAt) &&
      (!config.timed || (value.remainingSeconds as number) > 0)) ||
    (value.status === 'expired' &&
      isValidDate(value.submittedAt) &&
      config.timed === true &&
      value.remainingSeconds === 0)
  if (!(
    validKind &&
    validTimingConfig &&
    validStatusTiming &&
    validStatus &&
    typeof value.id === 'string' &&
    isNonNegativeNumber(value.seed) &&
    isStringArray(value.questionIds) &&
    value.questionIds.length > 0 &&
    new Set(value.questionIds).size === value.questionIds.length &&
    isStringArrayRecord(value.optionOrderByQuestion) &&
    value.questionIds.every(
      (id) => (value.optionOrderByQuestion as Record<string, string[]>)[id]?.length > 0,
    ) &&
    isStringArrayRecord(value.answers) &&
    isStringArray(value.flaggedQuestionIds) &&
    isNonNegativeNumber(value.currentQuestionIndex) &&
    Number.isInteger(value.currentQuestionIndex) &&
    value.currentQuestionIndex < value.questionIds.length &&
    isValidDate(value.startedAt) &&
    isNonNegativeNumber(value.elapsedSeconds)
  )) {
    return false
  }
  const questionIds = new Set(value.questionIds)
  const optionOrders = value.optionOrderByQuestion
  return (
    Object.keys(value.answers).every((id) => questionIds.has(id)) &&
    Object.entries(value.answers).every(([id, selected]) =>
      selected.every((optionId) => optionOrders[id]?.includes(optionId)),
    ) &&
    value.flaggedQuestionIds.every((id) => questionIds.has(id)) &&
    new Set(value.flaggedQuestionIds).size === value.flaggedQuestionIds.length
  )
}

function isBreakdown(value: unknown, key: 'level' | 'topic'): boolean {
  return (
    Array.isArray(value) &&
    value.every(
      (entry) =>
        isRecord(entry) &&
        (key === 'level'
          ? typeof entry.level === 'number'
          : typeof entry.topic === 'string') &&
        isNonNegativeNumber(entry.correct) &&
        isNonNegativeNumber(entry.total),
    )
  )
}

function isResult(value: unknown): value is AttemptResult {
  return (
    isRecord(value) &&
    typeof value.attemptId === 'string' &&
    isRecord(value.config) &&
    (value.config.kind === 'mixed' ||
      (value.config.kind === 'level' &&
        typeof value.config.level === 'number' &&
        QUIZ_LEVELS.includes(
          value.config.level as (typeof QUIZ_LEVELS)[number],
        ))) &&
    typeof value.config.timed === 'boolean' &&
    (value.config.timed
      ? isNonNegativeNumber(value.config.durationSeconds) &&
        value.config.durationSeconds >= 60
      : value.config.durationSeconds === undefined) &&
    (value.status === 'submitted' || value.status === 'expired') &&
    isValidDate(value.submittedAt) &&
    isNonNegativeNumber(value.elapsedSeconds) &&
    isNonNegativeNumber(value.correct) &&
    isNonNegativeNumber(value.total) &&
    isNonNegativeNumber(value.answered) &&
    isNonNegativeNumber(value.percentage) &&
    value.correct <= value.answered &&
    value.answered <= value.total &&
    value.percentage <= 100 &&
    Array.isArray(value.questionResults) &&
    value.questionResults.length === value.total &&
    value.questionResults.every(
      (result) =>
        isRecord(result) &&
        typeof result.questionId === 'string' &&
        typeof result.correct === 'boolean' &&
        typeof result.answered === 'boolean' &&
        isStringArray(result.selectedOptionIds) &&
        isStringArray(result.correctOptionIds),
    ) &&
    isStringArray(value.flaggedQuestionIds) &&
    isBreakdown(value.levels, 'level') &&
    isBreakdown(value.topics, 'topic')
  )
}

function optionSetsMatch(first: readonly string[], second: readonly string[]): boolean {
  return (
    first.length === second.length &&
    first.every((optionId) => second.includes(optionId))
  )
}

function attemptMatchesQuestionBank(attempt: QuizAttempt): boolean {
  const expectedQuestions = [...questionsById.values()].filter(
    (question) =>
      attempt.config.kind === 'mixed' || question.level === attempt.config.level,
  )
  if (
    attempt.questionIds.length !== expectedQuestions.length ||
    !optionSetsMatch(
      attempt.questionIds,
      expectedQuestions.map((question) => question.id),
    )
  ) {
    return false
  }

  return attempt.questionIds.every((questionId) => {
    const question = questionsById.get(questionId)
    if (!question) return false
    const savedOptionOrder = attempt.optionOrderByQuestion[questionId] ?? []
    return optionSetsMatch(
      savedOptionOrder,
      question.options.map((option) => option.id),
    )
  })
}

function resultMatchesQuestionBank(result: AttemptResult): boolean {
  const questionIds = result.questionResults.map(
    (questionResult) => questionResult.questionId,
  )
  if (
    new Set(questionIds).size !== questionIds.length ||
    new Set(result.flaggedQuestionIds).size !== result.flaggedQuestionIds.length ||
    !result.flaggedQuestionIds.every((questionId) =>
      questionIds.includes(questionId),
    )
  ) {
    return false
  }

  const expectedTotal = result.config.kind === 'mixed' ? 100 : 25
  if (
    result.total !== expectedTotal ||
    result.questionResults.length !== expectedTotal ||
    (result.config.timed &&
      (result.elapsedSeconds > (result.config.durationSeconds ?? 0) ||
        (result.status === 'expired' &&
          result.elapsedSeconds !== result.config.durationSeconds))) ||
    (result.status === 'expired' && !result.config.timed)
  ) {
    return false
  }

  const questionsForResult: QuizQuestion[] = []
  const canonicalResults: QuestionResult[] = []
  for (const questionResult of result.questionResults) {
    const question = questionsById.get(questionResult.questionId)
    if (
      !question ||
      (result.config.kind === 'level' && question.level !== result.config.level) ||
      new Set(questionResult.selectedOptionIds).size !==
        questionResult.selectedOptionIds.length ||
      !optionSetsMatch(questionResult.correctOptionIds, question.correctOptionIds) ||
      !questionResult.selectedOptionIds.every((optionId) =>
        question.options.some((option) => option.id === optionId),
      )
    ) {
      return false
    }

    const answered = questionResult.selectedOptionIds.length > 0
    const correct =
      answered &&
      optionSetsMatch(
        questionResult.selectedOptionIds,
        question.correctOptionIds,
      )
    if (
      questionResult.answered !== answered ||
      questionResult.correct !== correct
    ) {
      return false
    }
    questionsForResult.push(question)
    canonicalResults.push(questionResult)
  }

  const expectedCorrect = canonicalResults.filter((item) => item.correct).length
  const expectedAnswered = canonicalResults.filter((item) => item.answered).length
  const expectedPercentage = Math.round((expectedCorrect / expectedTotal) * 100)
  if (
    result.correct !== expectedCorrect ||
    result.answered !== expectedAnswered ||
    result.percentage !== expectedPercentage
  ) {
    return false
  }

  const expectedLevels = aggregateCanonicalBreakdown(
    canonicalResults,
    questionsForResult,
    'level',
  )
  const expectedTopics = aggregateCanonicalBreakdown(
    canonicalResults,
    questionsForResult,
    'topic',
  )
  return (
    JSON.stringify(result.levels) === JSON.stringify(expectedLevels) &&
    JSON.stringify(result.topics) === JSON.stringify(expectedTopics)
  )
}

function aggregateCanonicalBreakdown(
  results: readonly QuestionResult[],
  sourceQuestions: readonly QuizQuestion[],
  key: 'level' | 'topic',
) {
  const totals = new Map<string | number, { correct: number; total: number }>()
  for (let index = 0; index < results.length; index += 1) {
    const question = sourceQuestions[index]
    const result = results[index]
    if (!question || !result) continue
    const value = key === 'level' ? question.level : question.topic
    const score = totals.get(value) ?? { correct: 0, total: 0 }
    score.total += 1
    if (result.correct) score.correct += 1
    totals.set(value, score)
  }

  if (key === 'level') {
    return [...totals.entries()]
      .map(([level, score]) => ({ level, ...score }))
      .sort((first, second) => Number(first.level) - Number(second.level))
  }
  return [...totals.entries()]
    .map(([topic, score]) => ({ topic, ...score }))
    .sort((first, second) => String(first.topic).localeCompare(String(second.topic)))
}

export function validatePersistedQuizState(value: unknown): value is PersistedQuizState {
  if (
    !isRecord(value) ||
    value.schemaVersion !== 1 ||
    !(value.currentAttempt === null || isAttempt(value.currentAttempt)) ||
    !Array.isArray(value.results) ||
    !value.results.every(isResult)
  ) {
    return false
  }

  return (
    (value.currentAttempt === null ||
      attemptMatchesQuestionBank(value.currentAttempt)) &&
    value.results.every(resultMatchesQuestionBank)
  )
}

function emptyState(): PersistedQuizState {
  return { ...EMPTY_PERSISTED_STATE, results: [] }
}

export function loadQuizState(storage?: Storage): LoadedQuizState {
  let raw: string | null
  try {
    raw = (storage ?? window.localStorage).getItem(QUIZ_STORAGE_KEY)
  } catch (error) {
    const detail = error instanceof Error ? ` (${error.message})` : ''
    return {
      state: emptyState(),
      recoveryNotice: `Saved quiz data could not be read${detail}. A new session is available.`,
    }
  }
  if (raw === null) return { state: emptyState(), recoveryNotice: null }

  let parsed: unknown
  try {
    parsed = JSON.parse(raw)
  } catch {
    return {
      state: emptyState(),
      recoveryNotice: 'Saved quiz data was corrupt and was safely ignored.',
    }
  }
  if (!validatePersistedQuizState(parsed)) {
    return {
      state: emptyState(),
      recoveryNotice:
        'Saved quiz data was incomplete or from an incompatible version and was safely ignored.',
    }
  }
  return {
    state: { ...parsed, results: parsed.results.slice(0, MAX_RESULT_HISTORY) },
    recoveryNotice: null,
  }
}

export function saveQuizState(
  state: PersistedQuizState,
  storage?: Storage,
): string | null {
  const sanitized: PersistedQuizState = {
    schemaVersion: 1,
    currentAttempt: state.currentAttempt,
    results: state.results.slice(0, MAX_RESULT_HISTORY),
  }
  try {
    ;(storage ?? window.localStorage).setItem(
      QUIZ_STORAGE_KEY,
      JSON.stringify(sanitized),
    )
    return null
  } catch (error) {
    const detail = error instanceof Error ? `: ${error.message}` : ''
    return `Progress could not be saved${detail}`
  }
}

export function resetQuizState(storage?: Storage): string | null {
  try {
    ;(storage ?? window.localStorage).removeItem(QUIZ_STORAGE_KEY)
    return null
  } catch (error) {
    const detail = error instanceof Error ? `: ${error.message}` : ''
    return `Saved data could not be removed${detail}`
  }
}

export function exportQuizState(state: PersistedQuizState): void {
  const exportState: PersistedQuizState = {
    schemaVersion: 1,
    currentAttempt: state.currentAttempt,
    results: state.results.slice(0, MAX_RESULT_HISTORY),
  }
  const blob = new Blob([JSON.stringify(exportState, null, 2)], {
    type: 'application/json',
  })
  const url = URL.createObjectURL(blob)
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = `aws-quiz-results-${new Date().toISOString().slice(0, 10)}.json`
  anchor.click()
  URL.revokeObjectURL(url)
}
