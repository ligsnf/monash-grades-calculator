import { useState, useEffect, useMemo } from 'react'

const defaultBreakpoints = {
  'mobile': 0,
  'tablet': 768,
  'desktop': 1024,
  'wide': 1280,
} as const

type BreakpointConfig = typeof defaultBreakpoints
type BreakpointKey = keyof BreakpointConfig

export function useBreakpoints() {
  const breakpoints = useMemo(() => {
    return Object.entries(defaultBreakpoints)
      .sort(([, a], [, b]) => a - b)
      .map(([key, value], index) => ({
        key: key as BreakpointKey,
        minWidth: value,
        maxWidth: index < Object.keys(defaultBreakpoints).length - 1 
          ? Object.values(defaultBreakpoints)[index + 1] - 1 
          : Infinity
      }))
  }, [])

  const [currentBreakpoint, setCurrentBreakpoint] = useState<BreakpointKey>('mobile')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      const match = breakpoints.find(
        bp => width >= bp.minWidth && width <= bp.maxWidth
      )
      if (match) {
        setCurrentBreakpoint(match.key)
      }
    }

    // Initial check
    updateBreakpoint()

    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [breakpoints])

  return {
    breakpoint: currentBreakpoint,
    isMobile: currentBreakpoint === 'mobile',
    isTablet: currentBreakpoint === 'tablet',
    isDesktop: currentBreakpoint === 'desktop',
    isWide: currentBreakpoint === 'wide',
  }
}
