import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from 'recharts';
import { cn } from '@/lib/utils';

import { ChartConfig, ChartContainer } from '@/components/ui/chart';

interface RadialChartProps extends React.HTMLAttributes<HTMLDivElement> {
  value: number;
  maxValue: number;
  label?: string | null;
  color?: string;
}

export function RadialChart({
  className,
  value,
  maxValue,
  label,
  color,
  ...props
}: RadialChartProps) {
  const chartData = [
    {
      name: 'value',
      remainingValue: maxValue - value,
      value: value,
    },
  ];

  const chartConfig = {
    value: {
      label: label,
      color: color || 'hsl(var(--chart-1))',
    },
  } satisfies ChartConfig;

  return (
    <ChartContainer
      config={chartConfig}
      className={cn('mx-auto h-28 w-full', className)}
      {...props}
    >
      <RadialBarChart
        data={chartData}
        endAngle={180}
        innerRadius={80}
        outerRadius={110}
        startAngle={0}
        cy="80%"
      >
        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
          <Label
            content={({ viewBox }) => {
              if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 6}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {value}
                    </tspan>
                    {label && (
                      <tspan
                        x={viewBox.cx}
                        y={(viewBox.cy || 0) + 18}
                        className="fill-muted-foreground text-base"
                      >
                        {label}
                      </tspan>
                    )}
                  </text>
                );
              }
            }}
          />
        </PolarRadiusAxis>
        <RadialBar
          dataKey="remainingValue"
          fill="hsl(var(--muted-foreground))"
          cornerRadius={10}
          cornerIsExternal
          className="stroke-transparent stroke-2"
          stackId="a"
        />
        <RadialBar
          dataKey="value"
          fill={chartConfig.value.color}
          cornerRadius={10}
          cornerIsExternal
          className="stroke-transparent stroke-2"
          stackId="a"
        />
      </RadialBarChart>
    </ChartContainer>
  );
}
