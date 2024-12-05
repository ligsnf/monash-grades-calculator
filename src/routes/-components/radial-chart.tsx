import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts"

import {
  ChartConfig,
  ChartContainer,
} from "@/components/ui/chart"

const chartData = [
  { 
    name: "value",
    remainingValue: 16.652,
    value: 73.348,
  }
]

const chartConfig = {
  value: {
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig

export function RadialChart() {
  return (
    <ChartContainer
      config={chartConfig}
      className="mx-auto h-28 w-full"
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
              if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                return (
                  <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                    <tspan
                      x={viewBox.cx}
                      y={(viewBox.cy || 0) - 6}
                      className="fill-foreground text-3xl font-bold"
                    >
                      {chartData[0].value}
                    </tspan>
                  </text>
                )
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
          fill="hsl(var(--chart-2))"
          cornerRadius={10}
          cornerIsExternal
          className="stroke-transparent stroke-2"
          stackId="a"
        />
      </RadialBarChart>
    </ChartContainer>
  )
}