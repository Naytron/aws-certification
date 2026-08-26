import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type Dispatch,
  type SetStateAction,
} from 'react'
import { questions } from '@/data/questions'
import {
  createQuizAttempt,
  defaultDurationSeconds,
  findAttemptQuestion,
  formatDuration,
  levelLabel,
  orderedOptions,
} from '@/domain/attempts'
import { readinessLabel, scoreAttempt } from '@/domain/scoring'
import {
  QUIZ_LEVELS,
  type AttemptConfig,
  type AttemptResult,
  type PersistedQuizState,
  type QuizAttempt,
  type QuizLevel,
  type ReviewFilter,
} from '@/domain/quiz'
import {
  getAttemptTiming,
  useAttemptClock,
  type AttemptTiming,
} from '@/hooks/useAttemptClock'
import { useTheme } from '@/hooks/useTheme'
import {
  exportQuizState,
  loadQuizState,
  resetQuizState,
  saveQuizState,
} from '@/storage/quizStorage'
import { ConfirmDialog } from '@/components/ConfirmDialog'

type View = 'home' | 'attempt' | 'results'

function percentage(correct: number, total: number): string {
  return total === 0 ? '0%' : `${Math.round((correct / total) * 100)}%`
}

function answerStatus(attempt: QuizAttempt, questionId: string): string {
  const states: string[] = []
  if ((attempt.answers[questionId]?.length ?? 0) > 0) states.push('answered')
  else states.push('unanswered')
  if (attempt.flaggedQuestionIds.includes(questionId)) states.push('flagged')
  return states.join(', ')
}

function App() {
  const [loaded] = useState(loadQuizState)
  const [quizState, setQuizState] = useState<PersistedQuizState>(loaded.state)
  const [view, setView] = useState<View>('home')
  const [kind, setKind] = useState<AttemptConfig['kind']>('level')
  const [level, setLevel] = useState<QuizLevel>(100)
  const [timed, setTimed] = useState(true)
  const [durationMinutes, setDurationMinutes] = useState(
    defaultDurationSeconds({ kind: 'level' }) / 60,
  )
  const [selectedResultId, setSelectedResultId] = useState<string | null>(null)
  const [reviewFilter, setReviewFilter] = useState<ReviewFilter>('all')
  const [confirmSubmit, setConfirmSubmit] = useState(false)
  const [liveNotice, setLiveNotice] = useState('')
  const [persistenceNotice, setPersistenceNotice] = useState<string | null>(null)
  const { theme, themeWarning, toggleTheme } = useTheme()
  const attempt = quizState.currentAttempt
  const activeAttempt =
    view === 'attempt' && attempt?.status === 'in-progress' ? attempt : null

  useEffect(() => {
    const warning = saveQuizState(quizState)
    queueMicrotask(() => setPersistenceNotice(warning))
  }, [quizState])

  const finishAttempt = useCallback(
    (expired: boolean) => {
      setQuizState((current) => {
        const currentAttempt = current.currentAttempt
        if (!currentAttempt || currentAttempt.status !== 'in-progress') return current
        const observedTiming = getAttemptTiming(currentAttempt)
        const timedOut =
          currentAttempt.config.timed && observedTiming.remainingSeconds === 0
        const finalExpired = expired || timedOut
        const submittedAt = new Date()
        const finalizedAttempt: QuizAttempt = {
          ...currentAttempt,
          status: finalExpired ? 'expired' : 'submitted',
          submittedAt: submittedAt.toISOString(),
          elapsedSeconds: observedTiming.elapsedSeconds,
          ...(observedTiming.remainingSeconds === undefined
            ? {}
            : { remainingSeconds: observedTiming.remainingSeconds }),
        }
        const result = scoreAttempt(finalizedAttempt, questions, submittedAt)
        return {
          schemaVersion: 1,
          currentAttempt: finalizedAttempt,
          results: [
            result,
            ...current.results.filter((item) => item.attemptId !== result.attemptId),
          ].slice(0, 10),
        }
      })
      setConfirmSubmit(false)
      setSelectedResultId(attempt?.id ?? null)
      setReviewFilter('all')
      setView('results')
      setLiveNotice(
        expired
          ? 'Time expired. Your attempt was submitted automatically.'
          : 'Your attempt was submitted.',
      )
      window.scrollTo({ top: 0, behavior: 'auto' })
    },
    [attempt?.id],
  )

  const handleClockTick = useCallback(
    (nextTiming: AttemptTiming) => {
      setQuizState((current) => {
        if (
          !current.currentAttempt ||
          current.currentAttempt.id !== activeAttempt?.id ||
          current.currentAttempt.status !== 'in-progress'
        ) {
          return current
        }
        return {
          ...current,
          currentAttempt: {
            ...current.currentAttempt,
            elapsedSeconds: nextTiming.elapsedSeconds,
            ...(nextTiming.remainingSeconds === undefined
              ? {}
              : { remainingSeconds: nextTiming.remainingSeconds }),
          },
        }
      })
      if (activeAttempt?.config.timed && nextTiming.remainingSeconds === 0) {
        finishAttempt(true)
      }
    },
    [activeAttempt?.config.timed, activeAttempt?.id, finishAttempt],
  )
  const timing = useAttemptClock(
    activeAttempt,
    activeAttempt !== null,
    handleClockTick,
  )

  const startAttempt = () => {
    if (
      attempt?.status === 'in-progress' &&
      !window.confirm(
        'Start a new attempt and replace the unfinished attempt? Saved result history will be kept.',
      )
    ) {
      return
    }

    const config: AttemptConfig = {
      kind,
      ...(kind === 'level' ? { level } : {}),
      timed,
      ...(timed ? { durationSeconds: Math.max(1, durationMinutes) * 60 } : {}),
    }
    const nextAttempt = createQuizAttempt(questions, config)
    if (nextAttempt.questionIds.length === 0) {
      setLiveNotice('No questions are available for this selection.')
      return
    }
    setQuizState((current) => ({ ...current, currentAttempt: nextAttempt }))
    setSelectedResultId(null)
    setView('attempt')
    setLiveNotice(`${levelLabel(config.level)} attempt started.`)
  }

  const resetAll = () => {
    if (
      !window.confirm(
        'Reset the unfinished attempt and all result history? This cannot be undone.',
      )
    ) {
      return
    }
    const warning = resetQuizState()
    setQuizState({ schemaVersion: 1, currentAttempt: null, results: [] })
    setSelectedResultId(null)
    setView('home')
    setPersistenceNotice(warning)
    setLiveNotice('Quiz progress and result history were reset.')
  }

  const latestResult = quizState.results[0]
  const selectedResult =
    quizState.results.find((result) => result.attemptId === selectedResultId) ??
    latestResult

  return (
    <main className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">AWS Solutions Architect</p>
          <h1>Architecture quiz</h1>
        </div>
        <button
          className="button button-secondary theme-button"
          type="button"
          aria-pressed={theme === 'dark'}
          onClick={toggleTheme}
        >
          {theme === 'dark' ? '☀ Light theme' : '☾ Dark theme'}
        </button>
      </header>

      <div className="sr-only" aria-live="assertive" aria-atomic="true">
        {liveNotice}
      </div>
      {(loaded.recoveryNotice || persistenceNotice || themeWarning) && (
        <div className="notice" role="status">
          {loaded.recoveryNotice ?? persistenceNotice ?? themeWarning}
        </div>
      )}

      {view === 'home' && (
        <HomeScreen
          attempt={attempt}
          results={quizState.results}
          kind={kind}
          level={level}
          timed={timed}
          durationMinutes={durationMinutes}
          onKindChange={(nextKind) => {
            setKind(nextKind)
            setDurationMinutes(defaultDurationSeconds({ kind: nextKind }) / 60)
          }}
          onLevelChange={setLevel}
          onTimedChange={setTimed}
          onDurationChange={setDurationMinutes}
          onStart={startAttempt}
          onResume={() => {
            if (!attempt || attempt.status !== 'in-progress') return
            const resumedTiming = getAttemptTiming(attempt)
            if (
              attempt.config.timed &&
              resumedTiming.remainingSeconds === 0
            ) {
              finishAttempt(true)
              return
            }
            setView('attempt')
          }}
          onViewResult={(attemptId) => {
            setSelectedResultId(attemptId)
            setView('results')
          }}
          onExport={() => exportQuizState(quizState)}
          onReset={resetAll}
        />
      )}

      {view === 'attempt' && activeAttempt && (
        <AttemptScreen
          attempt={activeAttempt}
          elapsedSeconds={timing.elapsedSeconds}
          remainingSeconds={timing.remainingSeconds}
          onChange={setQuizState}
          onRequestSubmit={() => setConfirmSubmit(true)}
        />
      )}

      {view === 'results' && selectedResult && (
        <ResultsScreen
          result={selectedResult}
          filter={reviewFilter}
          onFilterChange={setReviewFilter}
          onHome={() => setView('home')}
          onNewAttempt={() => setView('home')}
          onExport={() => exportQuizState(quizState)}
        />
      )}

      {view === 'results' && !latestResult && (
        <section className="card empty-card">
          <h2>No result available</h2>
          <button className="button" type="button" onClick={() => setView('home')}>
            Return to start
          </button>
        </section>
      )}

      <ConfirmDialog
        open={confirmSubmit}
        title="Submit this attempt?"
        description={`You answered ${
          attempt
            ? Object.values(attempt.answers).filter((answer) => answer.length > 0)
                .length
            : 0
        } of ${attempt?.questionIds.length ?? 0} questions. Unanswered questions will be scored as incorrect.`}
        confirmLabel="Submit attempt"
        onCancel={() => setConfirmSubmit(false)}
        onConfirm={() => {
          const latestTiming = attempt ? getAttemptTiming(attempt) : timing
          finishAttempt(
            attempt?.config.timed === true && latestTiming.remainingSeconds === 0,
          )
        }}
      />
    </main>
  )
}

interface HomeScreenProps {
  attempt: QuizAttempt | null
  results: AttemptResult[]
  kind: AttemptConfig['kind']
  level: QuizLevel
  timed: boolean
  durationMinutes: number
  onKindChange: (kind: AttemptConfig['kind']) => void
  onLevelChange: (level: QuizLevel) => void
  onTimedChange: (timed: boolean) => void
  onDurationChange: (minutes: number) => void
  onStart: () => void
  onResume: () => void
  onViewResult: (attemptId: string) => void
  onExport: () => void
  onReset: () => void
}

function HomeScreen({
  attempt,
  results,
  kind,
  level,
  timed,
  durationMinutes,
  onKindChange,
  onLevelChange,
  onTimedChange,
  onDurationChange,
  onStart,
  onResume,
  onViewResult,
  onExport,
  onReset,
}: HomeScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const unfinished = attempt?.status === 'in-progress' ? attempt : null
  const latestResult = results[0]
  const counts = useMemo(
    () =>
      Object.fromEntries(
        QUIZ_LEVELS.map((quizLevel) => [
          quizLevel,
          questions.filter((question) => question.level === quizLevel).length,
        ]),
      ),
    [],
  )

  useEffect(() => {
    headingRef.current?.focus()
  }, [])

  return (
    <div className="home-layout">
      {unfinished && (
        <section className="card resume-card" aria-labelledby="resume-title">
          <div>
            <p className="status-label">Unfinished attempt</p>
            <h2 id="resume-title">
              Resume {levelLabel(unfinished.config.level)}
            </h2>
            <p>
              {Object.values(unfinished.answers).filter((answer) => answer.length > 0)
                .length}{' '}
              of {unfinished.questionIds.length} answered ·{' '}
              {formatDuration(unfinished.elapsedSeconds)} elapsed
            </p>
          </div>
          <button className="button" type="button" onClick={onResume}>
            Resume attempt
          </button>
        </section>
      )}

      <section className="card setup-card" aria-labelledby="setup-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Practice your way</p>
            <h2 id="setup-title" tabIndex={-1} ref={headingRef}>
              Start a new attempt
            </h2>
          </div>
          <p>Questions and answer choices are shuffled for every new attempt.</p>
        </div>

        <fieldset className="choice-fieldset">
          <legend>Question set</legend>
          <div className="level-grid">
            {QUIZ_LEVELS.map((quizLevel) => (
              <label
                className={`selection-card ${
                  kind === 'level' && level === quizLevel ? 'selected' : ''
                }`}
                key={quizLevel}
              >
                <input
                  type="radio"
                  name="question-set"
                  checked={kind === 'level' && level === quizLevel}
                  onChange={() => {
                    onKindChange('level')
                    onLevelChange(quizLevel)
                  }}
                />
                <span className="selection-title">Level {quizLevel}</span>
                <span>{counts[quizLevel]} questions</span>
              </label>
            ))}
            <label className={`selection-card ${kind === 'mixed' ? 'selected' : ''}`}>
              <input
                type="radio"
                name="question-set"
                checked={kind === 'mixed'}
                onChange={() => onKindChange('mixed')}
              />
              <span className="selection-title">Mixed</span>
              <span>{questions.length} questions</span>
            </label>
          </div>
        </fieldset>

        <fieldset className="choice-fieldset timing-options">
          <legend>Timing</legend>
          <label className="inline-choice">
            <input
              type="radio"
              name="timing"
              checked={timed}
              onChange={() => onTimedChange(true)}
            />
            Timed
          </label>
          <label className="inline-choice">
            <input
              type="radio"
              name="timing"
              checked={!timed}
              onChange={() => onTimedChange(false)}
            />
            Untimed
          </label>
          {timed && (
            <label className="duration-input">
              Time limit (minutes)
              <input
                type="number"
                min="1"
                max="300"
                value={durationMinutes}
                onChange={(event) =>
                  onDurationChange(
                    Math.min(300, Math.max(1, Number(event.target.value) || 1)),
                  )
                }
              />
            </label>
          )}
        </fieldset>

        <button className="button button-large" type="button" onClick={onStart}>
          Start new attempt
        </button>
      </section>

      <aside className="side-stack">
        <section className="card summary-card" aria-labelledby="latest-title">
          <p className="status-label">Latest result</p>
          <h2 id="latest-title">
            {latestResult ? `${latestResult.percentage}%` : 'No attempts yet'}
          </h2>
          {latestResult ? (
            <>
              <p>
                {latestResult.correct} of {latestResult.total} correct ·{' '}
                {readinessLabel(latestResult.percentage)}
              </p>
              <p className="muted">
                {new Date(latestResult.submittedAt).toLocaleString()}
              </p>
              <ol className="result-history">
                {results.map((result, index) => (
                  <li key={result.attemptId}>
                    <button
                      className="history-button"
                      type="button"
                      onClick={() => onViewResult(result.attemptId)}
                    >
                      <span>
                        {index === 0 ? 'Latest · ' : ''}
                        {levelLabel(result.config.level)}
                      </span>
                      <strong>{result.percentage}%</strong>
                      <small>
                        {new Date(result.submittedAt).toLocaleString()}
                      </small>
                    </button>
                  </li>
                ))}
              </ol>
            </>
          ) : (
            <p>Complete an attempt to see your readiness and topic breakdown.</p>
          )}
        </section>
        <section className="card data-card" aria-labelledby="data-title">
          <h2 id="data-title">Your local data</h2>
          <p>Progress stays in this browser. Export a portable, sanitized JSON copy.</p>
          <div className="button-row">
            <button
              className="button button-secondary"
              type="button"
              onClick={onExport}
            >
              Export JSON
            </button>
            <button className="button button-danger" type="button" onClick={onReset}>
              Reset all
            </button>
          </div>
        </section>
      </aside>
    </div>
  )
}

interface AttemptScreenProps {
  attempt: QuizAttempt
  elapsedSeconds: number
  remainingSeconds: number | undefined
  onChange: Dispatch<SetStateAction<PersistedQuizState>>
  onRequestSubmit: () => void
}

function AttemptScreen({
  attempt,
  elapsedSeconds,
  remainingSeconds,
  onChange,
  onRequestSubmit,
}: AttemptScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const question = findAttemptQuestion(attempt, questions)
  const answered = Object.values(attempt.answers).filter(
    (answer) => answer.length > 0,
  ).length
  const selected = question ? attempt.answers[question.id] ?? [] : []

  useEffect(() => {
    headingRef.current?.focus()
  }, [attempt.currentQuestionIndex, question?.id])

  if (!question) {
    return (
      <section className="card empty-card" role="alert">
        <h2>Question unavailable</h2>
        <p>This attempt cannot continue because its current question is missing.</p>
      </section>
    )
  }

  const updateAttempt = (updater: (current: QuizAttempt) => QuizAttempt) => {
    onChange((current) => {
      if (!current.currentAttempt || current.currentAttempt.id !== attempt.id) {
        return current
      }
      return { ...current, currentAttempt: updater(current.currentAttempt) }
    })
  }

  const selectOption = (optionId: string) => {
    updateAttempt((current) => {
      const existing = current.answers[question.id] ?? []
      let next: string[]
      if (question.type === 'single') {
        next = [optionId]
      } else if (existing.includes(optionId)) {
        next = existing.filter((id) => id !== optionId)
      } else {
        next = [...existing, optionId]
      }
      return {
        ...current,
        answers: { ...current.answers, [question.id]: next },
      }
    })
  }

  const goTo = (index: number) => {
    updateAttempt((current) => ({ ...current, currentQuestionIndex: index }))
  }

  const flagged = attempt.flaggedQuestionIds.includes(question.id)
  const selectCount = question.correctOptionIds.length
  const progressValue = (answered / attempt.questionIds.length) * 100
  const timerAnnouncement =
    remainingSeconds === 300
      ? 'Five minutes remaining.'
      : remainingSeconds === 60
        ? 'One minute remaining.'
        : remainingSeconds === 0
          ? 'Time expired.'
          : ''

  return (
    <div className="attempt-layout">
      <section className="attempt-main">
        <div className="attempt-toolbar card">
          <div>
            <span className="status-label">{levelLabel(attempt.config.level)}</span>
            <strong>
              Question {attempt.currentQuestionIndex + 1} of{' '}
              {attempt.questionIds.length}
            </strong>
          </div>
          <div className="timer">
            <span>{attempt.config.timed ? 'Time remaining' : 'Time elapsed'}</span>
            <strong className={remainingSeconds !== undefined && remainingSeconds < 300 ? 'urgent' : ''}>
              {formatDuration(remainingSeconds ?? elapsedSeconds)}
            </strong>
          </div>
          <span className="sr-only" role="status" aria-live="polite">
            {timerAnnouncement}
          </span>
        </div>

        <div
          className="progress-track"
          role="progressbar"
          aria-label="Attempt progress"
          aria-valuemin={0}
          aria-valuemax={attempt.questionIds.length}
          aria-valuenow={answered}
        >
          <span style={{ width: `${progressValue}%` }} />
        </div>
        <p className="progress-label">
          {answered} answered · {attempt.questionIds.length - answered} unanswered
        </p>

        <article className="card question-card">
          <div className="question-meta">
            <span className="badge">{question.topic}</span>
            <button
              className={`button button-secondary flag-button ${flagged ? 'flagged' : ''}`}
              type="button"
              aria-pressed={flagged}
              onClick={() =>
                updateAttempt((current) => ({
                  ...current,
                  flaggedQuestionIds: flagged
                    ? current.flaggedQuestionIds.filter((id) => id !== question.id)
                    : [...current.flaggedQuestionIds, question.id],
                }))
              }
            >
              ⚑ {flagged ? 'Flagged' : 'Flag for review'}
            </button>
          </div>
          <h2 id="question-title" tabIndex={-1} ref={headingRef}>
            {question.prompt}
          </h2>
          <p className="instruction" id="answer-instruction">
            {question.type === 'single'
              ? 'Choose one answer.'
              : `Select exactly ${selectCount} answers.`}
          </p>
          <fieldset className="answer-list" aria-describedby="answer-instruction">
            <legend className="sr-only">Answer choices</legend>
            {orderedOptions(attempt, question).map((option, optionIndex) => (
              <label
                className={`answer-option ${
                  selected.includes(option.id) ? 'selected' : ''
                }`}
                key={option.id}
              >
                <input
                  type={question.type === 'single' ? 'radio' : 'checkbox'}
                  name={`answer-${question.id}`}
                  checked={selected.includes(option.id)}
                  onChange={() => selectOption(option.id)}
                />
                <span className="option-letter" aria-hidden="true">
                  {String.fromCharCode(65 + optionIndex)}
                </span>
                <span>{option.text}</span>
              </label>
            ))}
          </fieldset>
        </article>

        <div className="attempt-actions">
          <button
            className="button button-secondary"
            type="button"
            disabled={attempt.currentQuestionIndex === 0}
            onClick={() => goTo(attempt.currentQuestionIndex - 1)}
          >
            Previous
          </button>
          {attempt.currentQuestionIndex < attempt.questionIds.length - 1 ? (
            <button
              className="button"
              type="button"
              onClick={() => goTo(attempt.currentQuestionIndex + 1)}
            >
              Next question
            </button>
          ) : (
            <button className="button" type="button" onClick={onRequestSubmit}>
              Review and submit
            </button>
          )}
        </div>
      </section>

      <aside className="card navigator" aria-labelledby="navigator-title">
        <div className="navigator-heading">
          <h2 id="navigator-title">Questions</h2>
          <button
            className="button button-secondary submit-button"
            type="button"
            onClick={onRequestSubmit}
          >
            Submit
          </button>
        </div>
        <div className="navigator-grid">
          {attempt.questionIds.map((questionId, index) => {
            const current = index === attempt.currentQuestionIndex
            const status = answerStatus(attempt, questionId)
            return (
              <button
                className={`nav-number ${
                  (attempt.answers[questionId]?.length ?? 0) > 0 ? 'answered' : ''
                } ${
                  attempt.flaggedQuestionIds.includes(questionId) ? 'flagged' : ''
                } ${current ? 'current' : ''}`}
                type="button"
                key={questionId}
                aria-current={current ? 'step' : undefined}
                aria-label={`Question ${index + 1}: ${status}${current ? ', current' : ''}`}
                onClick={() => goTo(index)}
              >
                {index + 1}
                {attempt.flaggedQuestionIds.includes(questionId) && (
                  <span aria-hidden="true">⚑</span>
                )}
              </button>
            )
          })}
        </div>
        <ul className="legend" aria-label="Question status legend">
          <li><span className="legend-box current" /> Current</li>
          <li><span className="legend-box answered" /> Answered</li>
          <li><span className="legend-box" /> Unanswered</li>
          <li><span aria-hidden="true">⚑</span> Flagged</li>
        </ul>
      </aside>
    </div>
  )
}

interface ResultsScreenProps {
  result: AttemptResult
  filter: ReviewFilter
  onFilterChange: (filter: ReviewFilter) => void
  onHome: () => void
  onNewAttempt: () => void
  onExport: () => void
}

function ResultsScreen({
  result,
  filter,
  onFilterChange,
  onHome,
  onNewAttempt,
  onExport,
}: ResultsScreenProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)
  const questionById = new Map(questions.map((question) => [question.id, question]))
  const flaggedIds = new Set(result.flaggedQuestionIds)
  const filteredResults = result.questionResults.filter((questionResult) => {
    if (filter === 'incorrect') return !questionResult.correct
    if (filter === 'unanswered') return !questionResult.answered
    if (filter === 'flagged') return flaggedIds.has(questionResult.questionId)
    return true
  })
  const filterCounts: Record<ReviewFilter, number> = {
    all: result.questionResults.length,
    incorrect: result.questionResults.filter((item) => !item.correct).length,
    unanswered: result.questionResults.filter((item) => !item.answered).length,
    flagged: result.questionResults.filter((item) =>
      flaggedIds.has(item.questionId),
    ).length,
  }

  useEffect(() => {
    headingRef.current?.focus()
  }, [result.attemptId])

  return (
    <div className="results-page">
      <section className="card result-hero" aria-labelledby="result-title">
        <div>
          <p className="eyebrow">
            {result.status === 'expired' ? 'Time expired · ' : ''}Attempt complete
          </p>
          <h2 id="result-title" tabIndex={-1} ref={headingRef}>
            {readinessLabel(result.percentage)}
          </h2>
          <p>
            {levelLabel(result.config.level)} · {result.correct} of {result.total}{' '}
            correct · {result.answered} answered ·{' '}
            {formatDuration(result.elapsedSeconds)} elapsed
          </p>
        </div>
        <div className="score-ring" aria-label={`Score: ${result.percentage} percent`}>
          <strong>{result.percentage}%</strong>
          <span>overall</span>
        </div>
      </section>

      <div className="breakdown-grid">
        <section className="card breakdown-card" aria-labelledby="level-breakdown">
          <h2 id="level-breakdown">Level breakdown</h2>
          <ScoreRows
            rows={result.levels.map((score) => ({
              label: `Level ${score.level}`,
              correct: score.correct,
              total: score.total,
            }))}
          />
        </section>
        <section className="card breakdown-card" aria-labelledby="topic-breakdown">
          <h2 id="topic-breakdown">Topic breakdown</h2>
          <ScoreRows
            rows={result.topics.map((score) => ({
              label: score.topic,
              correct: score.correct,
              total: score.total,
            }))}
          />
        </section>
      </div>

      <section className="review-section" aria-labelledby="review-title">
        <div className="review-heading">
          <div>
            <p className="eyebrow">Learn from every answer</p>
            <h2 id="review-title">Question review</h2>
          </div>
          <div className="button-row">
            <button className="button button-secondary" type="button" onClick={onExport}>
              Export JSON
            </button>
            <button className="button button-secondary" type="button" onClick={onHome}>
              Start screen
            </button>
            <button className="button" type="button" onClick={onNewAttempt}>
              New attempt
            </button>
          </div>
        </div>

        <div className="filter-tabs" role="group" aria-label="Filter question review">
          {(['all', 'incorrect', 'unanswered', 'flagged'] as const).map(
            (filterName) => (
              <button
                className={filter === filterName ? 'active' : ''}
                type="button"
                aria-pressed={filter === filterName}
                key={filterName}
                onClick={() => onFilterChange(filterName)}
              >
                {filterName[0]?.toUpperCase()}
                {filterName.slice(1)} ({filterCounts[filterName]})
              </button>
            ),
          )}
        </div>

        <div className="review-list">
          {filteredResults.map((questionResult, index) => {
            const question = questionById.get(questionResult.questionId)
            if (!question) return null
            const optionById = new Map(
              question.options.map((option) => [option.id, option.text]),
            )
            const learnerAnswers = questionResult.selectedOptionIds
              .map((id) => optionById.get(id))
              .filter((answer) => answer !== undefined)
            const correctAnswers = questionResult.correctOptionIds
              .map((id) => optionById.get(id))
              .filter((answer) => answer !== undefined)
            return (
              <article className="card review-card" key={question.id}>
                <div className="review-status">
                  <span
                    className={`result-status ${
                      questionResult.correct ? 'correct' : 'incorrect'
                    }`}
                  >
                    {questionResult.correct
                      ? '✓ Correct'
                      : questionResult.answered
                        ? '✕ Incorrect'
                        : '— Unanswered'}
                  </span>
                  <span>
                    Question {result.questionResults.indexOf(questionResult) + 1} · Level{' '}
                    {question.level} · {question.topic}
                  </span>
                  {flaggedIds.has(question.id) && <span>⚑ Flagged</span>}
                </div>
                <h3>
                  <span className="sr-only">Review item {index + 1}: </span>
                  {question.prompt}
                </h3>
                <dl className="answer-review">
                  <div>
                    <dt>Your answer</dt>
                    <dd>
                      {learnerAnswers.length > 0
                        ? learnerAnswers.join('; ')
                        : 'No answer selected'}
                    </dd>
                  </div>
                  <div>
                    <dt>Correct answer</dt>
                    <dd>{correctAnswers.join('; ')}</dd>
                  </div>
                </dl>
                <div className="learning-grid">
                  <div>
                    <h4>Explanation</h4>
                    <p>{question.explanation}</p>
                  </div>
                  <div>
                    <h4>Strongest distractor</h4>
                    <p>{question.strongestDistractor}</p>
                  </div>
                  <div>
                    <h4>When to use</h4>
                    <p>{question.whenToUse}</p>
                  </div>
                  <div>
                    <h4>Course reference</h4>
                    <p>
                      <a
                        href={`https://github.com/Naytron/aws-certification/blob/main/${question.reference.path}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {question.reference.label}
                      </a>
                      <br />
                      <code>{question.reference.path}</code>
                    </p>
                  </div>
                </div>
              </article>
            )
          })}
          {filteredResults.length === 0 && (
            <div className="card empty-card" role="status">
              No questions match this filter.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

function ScoreRows({
  rows,
}: {
  rows: Array<{ label: string; correct: number; total: number }>
}) {
  return (
    <ul className="score-rows">
      {rows.map((row) => (
        <li key={row.label}>
          <div>
            <span>{row.label}</span>
            <strong>
              {row.correct}/{row.total} · {percentage(row.correct, row.total)}
            </strong>
          </div>
          <div
            className="mini-progress"
            role="progressbar"
            aria-label={`${row.label} score`}
            aria-valuemin={0}
            aria-valuemax={row.total}
            aria-valuenow={row.correct}
          >
            <span style={{ width: percentage(row.correct, row.total) }} />
          </div>
        </li>
      ))}
    </ul>
  )
}

export default App
