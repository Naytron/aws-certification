export const QUIZ_LEVELS = [100, 200, 300, 400] as const

export type QuizLevel = (typeof QUIZ_LEVELS)[number]
export type QuestionType = 'single' | 'multiple'
export type AttemptKind = 'level' | 'mixed'
export type AttemptStatus = 'in-progress' | 'submitted' | 'expired'
export type ReviewFilter = 'all' | 'incorrect' | 'unanswered' | 'flagged'

export interface QuestionOption {
  id: string
  text: string
}

export interface QuestionReference {
  label: string
  path: string
}

export interface QuizQuestion {
  id: string
  level: QuizLevel
  topic: string
  type: QuestionType
  prompt: string
  options: QuestionOption[]
  correctOptionIds: string[]
  explanation: string
  strongestDistractor: string
  whenToUse: string
  featureSelection: boolean
  reference: QuestionReference
}

export interface AttemptConfig {
  kind: AttemptKind
  level?: QuizLevel
  timed: boolean
  durationSeconds?: number
}

export interface QuizAnswer {
  questionId: string
  selectedOptionIds: string[]
}

export interface QuizAttempt {
  schemaVersion: 1
  id: string
  config: AttemptConfig
  status: AttemptStatus
  seed: number
  questionIds: string[]
  optionOrderByQuestion: Record<string, string[]>
  answers: Record<string, string[]>
  flaggedQuestionIds: string[]
  currentQuestionIndex: number
  startedAt: string
  submittedAt?: string
  elapsedSeconds: number
  remainingSeconds?: number
}

export interface QuestionResult {
  questionId: string
  correct: boolean
  answered: boolean
  selectedOptionIds: string[]
  correctOptionIds: string[]
}

export interface TopicScore {
  topic: string
  correct: number
  total: number
}

export interface LevelScore {
  level: QuizLevel
  correct: number
  total: number
}

export interface AttemptResult {
  attemptId: string
  config: AttemptConfig
  status: Extract<AttemptStatus, 'submitted' | 'expired'>
  submittedAt: string
  elapsedSeconds: number
  correct: number
  total: number
  answered: number
  percentage: number
  questionResults: QuestionResult[]
  flaggedQuestionIds: string[]
  levels: LevelScore[]
  topics: TopicScore[]
}

export interface PersistedQuizState {
  schemaVersion: 1
  currentAttempt: QuizAttempt | null
  results: AttemptResult[]
}

export const EMPTY_PERSISTED_STATE: PersistedQuizState = {
  schemaVersion: 1,
  currentAttempt: null,
  results: [],
}
