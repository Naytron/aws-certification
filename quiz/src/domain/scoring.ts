import type {
  AttemptResult,
  LevelScore,
  QuestionResult,
  QuizAttempt,
  QuizQuestion,
  TopicScore,
} from './quiz'

function sameOptionSet(selected: readonly string[], correct: readonly string[]): boolean {
  return (
    selected.length === correct.length &&
    selected.every((optionId) => correct.includes(optionId))
  )
}

export function scoreQuestion(
  question: QuizQuestion,
  selectedOptionIds: readonly string[] = [],
): QuestionResult {
  return {
    questionId: question.id,
    correct:
      selectedOptionIds.length > 0 &&
      sameOptionSet(selectedOptionIds, question.correctOptionIds),
    answered: selectedOptionIds.length > 0,
    selectedOptionIds: [...selectedOptionIds],
    correctOptionIds: [...question.correctOptionIds],
  }
}

export function scoreAttempt(
  attempt: QuizAttempt,
  allQuestions: readonly QuizQuestion[],
  submittedAt = new Date(),
): AttemptResult {
  const questionById = new Map(allQuestions.map((question) => [question.id, question]))
  const questionResults = attempt.questionIds
    .map((id) => questionById.get(id))
    .filter((question) => question !== undefined)
    .map((question) => scoreQuestion(question, attempt.answers[question.id]))
  const correct = questionResults.filter((result) => result.correct).length
  const answered = questionResults.filter((result) => result.answered).length
  const total = questionResults.length

  return {
    attemptId: attempt.id,
    config: { ...attempt.config },
    status: attempt.status === 'expired' ? 'expired' : 'submitted',
    submittedAt: submittedAt.toISOString(),
    elapsedSeconds: attempt.elapsedSeconds,
    correct,
    total,
    answered,
    percentage: total === 0 ? 0 : Math.round((correct / total) * 100),
    questionResults,
    flaggedQuestionIds: [...attempt.flaggedQuestionIds],
    levels: aggregateLevels(questionResults, questionById),
    topics: aggregateTopics(questionResults, questionById),
  }
}

function aggregateLevels(
  results: readonly QuestionResult[],
  questions: ReadonlyMap<string, QuizQuestion>,
): LevelScore[] {
  const totals = new Map<number, LevelScore>()
  for (const result of results) {
    const question = questions.get(result.questionId)
    if (!question) continue
    const score = totals.get(question.level) ?? {
      level: question.level,
      correct: 0,
      total: 0,
    }
    score.total += 1
    if (result.correct) score.correct += 1
    totals.set(question.level, score)
  }
  return [...totals.values()].sort((first, second) => first.level - second.level)
}

function aggregateTopics(
  results: readonly QuestionResult[],
  questions: ReadonlyMap<string, QuizQuestion>,
): TopicScore[] {
  const totals = new Map<string, TopicScore>()
  for (const result of results) {
    const question = questions.get(result.questionId)
    if (!question) continue
    const score = totals.get(question.topic) ?? {
      topic: question.topic,
      correct: 0,
      total: 0,
    }
    score.total += 1
    if (result.correct) score.correct += 1
    totals.set(question.topic, score)
  }
  return [...totals.values()].sort((first, second) =>
    first.topic.localeCompare(second.topic),
  )
}

export function readinessLabel(percentage: number): string {
  if (percentage >= 80) return 'Strong result'
  if (percentage >= 70) return 'Developing result'
  return 'Keep building'
}
