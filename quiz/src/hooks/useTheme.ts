import { useEffect, useState } from 'react'

export type Theme = 'dark' | 'light'
export const THEME_STORAGE_KEY = 'aws-quiz-theme'

interface ThemeState {
  theme: Theme
  warning: string | null
}

function getInitialTheme(): ThemeState {
  try {
    const queryTheme = new URLSearchParams(window.location.search).get('scoutTheme')
    const theme =
      queryTheme === 'light' || queryTheme === 'dark'
        ? queryTheme
        : localStorage.getItem(THEME_STORAGE_KEY) === 'light'
          ? 'light'
          : 'dark'
    document.documentElement.dataset.theme = theme
    return { theme, warning: null }
  } catch (error) {
    document.documentElement.dataset.theme = 'dark'
    const detail = error instanceof Error ? `: ${error.message}` : ''
    return { theme: 'dark', warning: `Theme preference could not be read${detail}` }
  }
}

export function useTheme() {
  const [themeState, setThemeState] = useState<ThemeState>(getInitialTheme)
  const { theme } = themeState

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    try {
      localStorage.setItem(THEME_STORAGE_KEY, theme)
    } catch (error) {
      const detail = error instanceof Error ? `: ${error.message}` : ''
      queueMicrotask(() =>
        setThemeState((current) => ({
          ...current,
          warning: `Theme preference could not be saved${detail}`,
        })),
      )
    }
  }, [theme])

  return {
    theme,
    themeWarning: themeState.warning,
    toggleTheme: () =>
      setThemeState((current) => ({
        theme: current.theme === 'dark' ? 'light' : 'dark',
        warning: null,
      })),
  }
}
