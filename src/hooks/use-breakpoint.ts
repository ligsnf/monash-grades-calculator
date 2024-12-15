import { useCallback, useEffect, useMemo, useState } from 'react'

const BREAKPOINTS = {
  mobile: '(max-width: 639px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
} as const

type Breakpoint = keyof typeof BREAKPOINTS

export function useBreakpoint() {
  const mediaQueries = useMemo(() => 
    Object.entries(BREAKPOINTS).map(([key, query]) => ({
      key: key as Breakpoint,
      query,
      mq: window.matchMedia(query)
    }))
  , [])

  const getCurrentBreakpoint = useCallback((): Breakpoint => {
    const match = mediaQueries
      .reverse()
      .find(({ mq }) => mq.matches)
    return match?.key || 'mobile'
  }, [mediaQueries])

  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getCurrentBreakpoint())

  useEffect(() => {
    const cleanup = mediaQueries.map(({ mq, key }) => {
      const handler = () => {
        if (mq.matches) {
          setBreakpoint(key)
        }
      }
      mq.addEventListener('change', handler)
      return () => mq.removeEventListener('change', handler)
    })

    return () => cleanup.forEach(fn => fn())
  }, [mediaQueries])

  const utils = useMemo(() => ({
    breakpoint,
    isMobile: breakpoint === 'mobile',
    isSmaller: (bp: Breakpoint) => !mediaQueries.find(m => m.key === bp)?.mq.matches,
    isLarger: (bp: Breakpoint) => mediaQueries.find(m => m.key === bp)?.mq.matches
  }), [breakpoint, mediaQueries])

  return utils
}