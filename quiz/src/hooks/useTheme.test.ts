import { act, renderHook, waitFor } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { MemoryStorage } from '@/test/fixtures'
import { THEME_STORAGE_KEY, useTheme } from './useTheme'

describe('theme preference', () => {
  beforeEach(() => {
    vi.stubGlobal('localStorage', new MemoryStorage())
    window.history.replaceState({}, '', '/')
    delete document.documentElement.dataset.theme
  })

  afterEach(() => vi.unstubAllGlobals())

  it('defaults to dark and toggles to a persisted light theme', async () => {
    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('dark')
    expect(document.documentElement.dataset.theme).toBe('dark')

    act(() => result.current.toggleTheme())

    await waitFor(() => {
      expect(result.current.theme).toBe('light')
      expect(document.documentElement.dataset.theme).toBe('light')
      expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light')
    })
  })

  it('restores an explicitly stored light theme', () => {
    localStorage.setItem(THEME_STORAGE_KEY, 'light')

    const { result } = renderHook(() => useTheme())

    expect(result.current.theme).toBe('light')
    expect(document.documentElement.dataset.theme).toBe('light')
  })

  it.each(['light', 'dark'] as const)(
    'honors an explicit scoutTheme=%s query over storage',
    (queryTheme) => {
      localStorage.setItem(
        THEME_STORAGE_KEY,
        queryTheme === 'light' ? 'dark' : 'light',
      )
      window.history.replaceState({}, '', `/?scoutTheme=${queryTheme}`)

      const { result } = renderHook(() => useTheme())

      expect(result.current.theme).toBe(queryTheme)
      expect(document.documentElement.dataset.theme).toBe(queryTheme)
    },
  )
})
