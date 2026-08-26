import { cleanup, render, screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryStorage } from '@/test/fixtures'
import App from './App'

describe('critical quiz flow', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new MemoryStorage())
    vi.spyOn(window, 'scrollTo').mockImplementation(() => undefined)
    vi.spyOn(window, 'confirm').mockReturnValue(true)
    vi.stubGlobal(
      'crypto',
      { getRandomValues: (values: Uint32Array) => (values[0] = 123_456, values) },
    )
  })

  afterEach(() => {
    cleanup()
    vi.restoreAllMocks()
    vi.unstubAllGlobals()
  })

  it('starts, confirms submission, and reveals results only after submit', async () => {
    const user = userEvent.setup()
    render(<App />)

    const questionSet = screen.getByRole('group', { name: 'Question set' })
    expect(
      within(questionSet).getAllByRole('radio'),
    ).toHaveLength(5)
    expect(within(questionSet).getByRole('radio', { name: /Level 100.*25 questions/ })).toBeChecked()
    expect(within(questionSet).getByRole('radio', { name: /Mixed.*100 questions/ })).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Export JSON' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Reset all' })).toBeEnabled()

    await user.click(screen.getByRole('button', { name: 'Start new attempt' }))

    expect(screen.getByText('Question 1 of 25')).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Explanation' })).not.toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: /Flag for review/ }),
    )

    await user.click(screen.getByRole('button', { name: 'Submit' }))
    const dialog = screen.getByRole('alertdialog', { name: 'Submit this attempt?' })
    expect(dialog).toHaveTextContent(
      'You answered 0 of 25 questions. Unanswered questions will be scored as incorrect.',
    )
    expect(screen.queryByRole('heading', { name: 'Explanation' })).not.toBeInTheDocument()

    await user.click(within(dialog).getByRole('button', { name: 'Submit attempt' }))

    expect(screen.getByText('Attempt complete')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Keep building' })).toBeInTheDocument()
    expect(screen.getAllByRole('heading', { name: 'Explanation' })).toHaveLength(25)
    expect(screen.getByRole('button', { name: 'Export JSON' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'Start screen' })).toBeEnabled()
    expect(screen.getByRole('button', { name: 'New attempt' })).toBeEnabled()
    expect(
      screen.getByRole('button', { name: 'Flagged (1)' }),
    ).toBeEnabled()
  })

  it('keeps an unfinished attempt while an older result is reviewed', async () => {
    const user = userEvent.setup()
    const firstRender = render(<App />)

    await user.click(screen.getByRole('button', { name: 'Start new attempt' }))
    await user.click(screen.getByRole('button', { name: 'Submit' }))
    await user.click(
      within(screen.getByRole('alertdialog')).getByRole('button', {
        name: 'Submit attempt',
      }),
    )
    await user.click(screen.getByRole('button', { name: 'Start screen' }))
    await user.click(screen.getByRole('button', { name: 'Start new attempt' }))

    firstRender.unmount()
    render(<App />)

    expect(
      screen.getByRole('heading', { name: 'Resume Level 100' }),
    ).toBeInTheDocument()
    await user.click(
      screen.getByRole('button', { name: /Latest.*Level 100/i }),
    )
    await user.click(screen.getByRole('button', { name: 'New attempt' }))

    expect(
      screen.getByRole('heading', { name: 'Resume Level 100' }),
    ).toBeInTheDocument()
  })
})
