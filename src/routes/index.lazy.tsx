import { createLazyFileRoute } from '@tanstack/react-router'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useBreakpoints } from '@/hooks/use-breakpoint'
import { STORAGE_KEYS } from '@/constants/storage-keys'
import { useTheme } from "@/components/theme/theme-provider"
import { calculateWAM, calculateGPA, calculateColor } from "@/lib/calculate"
import { Result } from "@/schemas/result-schema"
import { ResultTable } from "@/components/results/result-table"
import { RadialChart } from "@/components/results/radial-chart"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export const Route = createLazyFileRoute('/')({
  component: Index,
})

const initialData: Result[] = [
  {
    id: 0,
    unitCode: "ECE2072",
    creditPoints: 6,
    mark: 50,
    grade: "P",
  },
  {
    id: 1,
    unitCode: "FIT2107",
    creditPoints: 6,
    mark: 64,
    grade: "C",
  },
  {
    id: 2,
    unitCode: "FIT3170",
    creditPoints: 12,
    mark: 77,
    grade: "D",
  },
  {
    id: 3,
    unitCode: "FIT2095",
    creditPoints: 6,
    mark: 99,
    grade: "HD",
  },
]

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
  const { isMobile } = useBreakpoints()

  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-center">
          {title} <span className="hidden md:inline text-xl text-muted-foreground">({subtitle})</span>
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
  )
}

function Index() {
  const [data, setData] = useLocalStorage<Result[]>(STORAGE_KEYS.RESULTS, initialData)

  const handleResultAdd = () => {
    const maxId = Math.max(...data.map(item => item.id), -1)
    const newResult: Result = {
      id: maxId + 1,
      unitCode: "",
      creditPoints: 6,
      mark: 0,
      grade: "N",
    }
    setData([...data, newResult])
  }
  
  const handleResultUpdate = (id: number, updatedResult: Result) => {
    setData(data.map(item => 
      item.id === id ? { ...updatedResult, id } : item
    ))
  }

  const handleResultDelete = (id: number) => {
    setData(data.filter(item => item.id !== id))
  }

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
        <ResultTable 
          data={data} 
          onResultUpdate={handleResultUpdate}
          onResultDelete={handleResultDelete}
        />
      </div>
      <div className="container mx-auto md:mt-2">
        <Button onClick={handleResultAdd}>Add Unit</Button>
      </div>
    </div>
  )
}