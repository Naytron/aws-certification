import type {
  AttemptConfig,
  QuizAttempt,
  QuizQuestion,
  QuizLevel,
} from './quiz'

export const DEFAULT_LEVEL_DURATION_SECONDS = 50 * 60
export const DEFAULT_MIXED_DURATION_SECONDS = 210 * 60

function seededRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let value = state
    value = Math.imul(value ^ (value >>> 15), value | 1)
    value ^= value + Math.imul(value ^ (value >>> 7), value | 61)
    return ((value ^ (value >>> 14)) >>> 0) / 4_294_967_296
  }
}

export function shuffleWithSeed<T>(values: readonly T[], seed: number): T[] {
  const random = seededRandom(seed)
  const shuffled = [...values]

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const otherIndex = Math.floor(random() * (index + 1))
    ;[shuffled[index], shuffled[otherIndex]] = [
      shuffled[otherIndex],
      shuffled[index],
    ]
  }

  return shuffled
}

function nextSeed(random: () => number): number {
  return Math.floor(random() * 0x1_0000_0000) >>> 0
}

export function defaultDurationSeconds(config: Pick<AttemptConfig, 'kind'>): number {
  return config.kind === 'mixed'
    ? DEFAULT_MIXED_DURATION_SECONDS
    : DEFAULT_LEVEL_DURATION_SECONDS
}

export function createAttemptSeed(): number {
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    return crypto.getRandomValues(new Uint32Array(1))[0] ?? Date.now() >>> 0
  }
  return Date.now() >>> 0
}

export function createQuizAttempt(
  allQuestions: readonly QuizQuestion[],
  config: AttemptConfig,
  seed = createAttemptSeed(),
  startedAt = new Date(),
): QuizAttempt {
  const selectedQuestions =
    config.kind === 'level'
      ? allQuestions.filter((question) => question.level === config.level)
      : [...allQuestions]
  const random = seededRandom(seed)
  const questionIds = shuffleWithSeed(selectedQuestions.map(({ id }) => id), nextSeed(random))
  const optionOrderByQuestion = Object.fromEntries(
    selectedQuestions.map((question) => [
      question.id,
      shuffleWithSeed(
        question.options.map(({ id }) => id),
        nextSeed(random),
      ),
    ]),
  )
  const durationSeconds = config.timed
    ? Math.max(60, Math.floor(config.durationSeconds ?? defaultDurationSeconds(config)))
    : undefined

  return {
    schemaVersion: 1,
    id: `${startedAt.getTime().toString(36)}-${seed.toString(36)}`,
    config: {
      kind: config.kind,
      ...(config.kind === 'level' ? { level: config.level } : {}),
      timed: config.timed,
      ...(durationSeconds === undefined ? {} : { durationSeconds }),
    },
    status: 'in-progress',
    seed,
    questionIds,
    optionOrderByQuestion,
    answers: {},
    flaggedQuestionIds: [],
    currentQuestionIndex: 0,
    startedAt: startedAt.toISOString(),
    elapsedSeconds: 0,
    ...(durationSeconds === undefined ? {} : { remainingSeconds: durationSeconds }),
  }
}

export function findAttemptQuestion(
  attempt: QuizAttempt,
  allQuestions: readonly QuizQuestion[],
  index = attempt.currentQuestionIndex,
): QuizQuestion | undefined {
  const id = attempt.questionIds[index]
  return allQuestions.find((question) => question.id === id)
}

export function orderedOptions(
  attempt: QuizAttempt,
  question: QuizQuestion,
) {
  const optionById = new Map(question.options.map((option) => [option.id, option]))
  return (attempt.optionOrderByQuestion[question.id] ?? [])
    .map((id) => optionById.get(id))
    .filter((option) => option !== undefined)
}

export function formatDuration(totalSeconds: number): string {
  const safeSeconds = Math.max(0, Math.floor(totalSeconds))
  const hours = Math.floor(safeSeconds / 3600)
  const minutes = Math.floor((safeSeconds % 3600) / 60)
  const seconds = safeSeconds % 60
  return hours > 0
    ? `${hours}:${minutes.toString().padStart(2, '0')}:${seconds
        .toString()
        .padStart(2, '0')}`
    : `${minutes}:${seconds.toString().padStart(2, '0')}`
}

export function levelLabel(level: QuizLevel | undefined): string {
  return level === undefined ? 'Mixed' : `Level ${level}`
}
