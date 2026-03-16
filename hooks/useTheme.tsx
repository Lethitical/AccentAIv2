import React, { createContext, useCallback, useContext, useMemo, useState } from 'react'

type ThemeContextValue = {
  isDark: boolean
  toggleTheme: () => void
  setIsDark: (next: boolean) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  // Default should be dark mode.
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = useCallback(() => {
    setIsDark((prev) => !prev)
  }, [])

  const value = useMemo<ThemeContextValue>(
    () => ({ isDark, toggleTheme, setIsDark }),
    [isDark, toggleTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return ctx
}

