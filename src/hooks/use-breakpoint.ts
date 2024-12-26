import { useState, useEffect } from 'react';

export const BREAKPOINTS = {
  mobile: '(max-width: 639px)',
  sm: '(min-width: 640px)',
  md: '(min-width: 768px)',
  lg: '(min-width: 1024px)',
  xl: '(min-width: 1280px)',
} as const;

export type Breakpoint = keyof typeof BREAKPOINTS;

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    function onChange(event: MediaQueryListEvent) {
      setMatches(event.matches);
    }

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

export function useBreakpoint(breakpoint: Breakpoint) {
  return useMediaQuery(BREAKPOINTS[breakpoint]);
}
