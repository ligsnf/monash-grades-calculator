import { useBreakpoint } from '@/hooks/use-breakpoint';
import { calculateColor } from '@/lib/calculate';
import { RadialChart } from '@/components/radial-chart';
import { useTheme } from '@/components/theme/theme-provider';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type StatCardProps = {
  title: string;
  subtitle: string;
  value: number;
  maxValue: number;
};

export function StatCard({ title, subtitle, value, maxValue }: StatCardProps) {
  const { theme } = useTheme();
  const isDarkMode = theme === 'dark';
  const color = calculateColor(value, maxValue, isDarkMode);
  const isMobile = useBreakpoint('mobile');

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-center">
          {title}{' '}
          <span className="hidden md:inline text-xl text-muted-foreground">
            ({subtitle})
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {!isMobile && (
          <RadialChart
            className="font-mono"
            value={value}
            maxValue={maxValue}
            color={color}
          />
        )}
        {isMobile && (
          <p
            className="text-3xl sm:text-4xl font-bold font-mono"
            style={{ color: color }}
          >
            {value}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
