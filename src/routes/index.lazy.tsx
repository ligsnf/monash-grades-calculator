import { createLazyFileRoute } from '@tanstack/react-router'
import { useTheme } from "@/components/theme/theme-provider"
import { calculateWAM, calculateGPA, calculateColor } from "@/lib/calculate"
import { Result, columns } from "./-components/columns"
import { DataTable } from "./-components/data-table"
import { RadialChart } from "./-components/radial-chart"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function getData(): Result[] {
  return [
    {
      year: 2021,
      unitCode: "ENG1002",
      creditPoints: 6,
      mark: 75,
      grade: "D",
    },
    {
      year: 2021,
      unitCode: "ENG1003",
      creditPoints: 6,
      mark: 80,
      grade: "HD",
    },
    {
      year: 2021,
      unitCode: "ENG1090",
      creditPoints: 6,
      mark: 75,
      grade: "D",
    },
    {
      year: 2021,
      unitCode: "PHS1001",
      creditPoints: 6,
      mark: 71,
      grade: "D",
    },
    {
      year: 2021,
      unitCode: "ECE2072",
      creditPoints: 6,
      mark: 50,
      grade: "P",
    },
    {
      year: 2021,
      unitCode: "ENG1001",
      creditPoints: 6,
      mark: 70,
      grade: "D",
    },
    {
      year: 2021,
      unitCode: "ENG1005",
      creditPoints: 6,
      mark: 83,
      grade: "HD",
    },
    {
      year: 2021,
      unitCode: "ENG1060",
      creditPoints: 6,
      mark: 89,
      grade: "HD",
    },
    {
      year: 2022,
      unitCode: "FIT1045",
      creditPoints: 6,
      mark: 95,
      grade: "HD",
    },
    {
      year: 2022,
      unitCode: "FIT2085",
      creditPoints: 6,
      mark: 79,
      grade: "D",
    },
    {
      year: 2022,
      unitCode: "FIT2099",
      creditPoints: 6,
      mark: 77,
      grade: "D",
    },
    {
      year: 2022,
      unitCode: "MAT1830",
      creditPoints: 6,
      mark: 83,
      grade: "HD",
    },
    {
      year: 2022,
      unitCode: "FIT2004",
      creditPoints: 6,
      mark: 52,
      grade: "P",
    },
    {
      year: 2022,
      unitCode: "FIT2100",
      creditPoints: 6,
      mark: 79,
      grade: "D",
    },
    {
      year: 2022,
      unitCode: "FIT2101",
      creditPoints: 6,
      mark: 82,
      grade: "HD",
    },
    {
      year: 2022,
      unitCode: "FIT2107",
      creditPoints: 6,
      mark: 64,
      grade: "C",
    },
  ]
}

type StatCardProps = {
  title: string
  subtitle: string
  value: number
  maxValue: number
}

function StatCard({ title, subtitle, value, maxValue }: StatCardProps) {
  const { theme } = useTheme()
  const isDarkMode = theme === "dark"
  const color = calculateColor(value, maxValue, isDarkMode)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-center">
          {title} <span className="hidden md:inline text-xl text-muted-foreground">({subtitle})</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <RadialChart 
          className="hidden md:flex font-mono"
          value={value}
          maxValue={maxValue}
          color={color}
        />
        <p 
          className="md:hidden text-3xl sm:text-4xl font-bold font-mono"
          style={{ color: color }}
        >
          {value}
        </p>
      </CardContent>
    </Card>
  )
}

function Index() {
  const data = getData()
  const wam = calculateWAM(data)
  const maxWam = 100
  const gpa = calculateGPA(data)
  const maxGpa = 4

  const stats = [
    {
      title: "WAM",
      subtitle: "Weighted Average Mark",
      value: wam,
      maxValue: maxWam,
    },
    {
      title: "GPA",
      subtitle: "Grade Point Average",
      value: gpa,
      maxValue: maxGpa,
    }
  ]

  return (
    <div className="md:p-2">
      <div className="container mx-auto grid gap-4 md:gap-6 grid-cols-2 md:mb-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            subtitle={stat.subtitle}
            value={stat.value}
            maxValue={stat.maxValue}
          />
        ))}
      </div>
      <div className="container mx-auto py-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}