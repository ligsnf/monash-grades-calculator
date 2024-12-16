import { useMemo, useState } from 'react'
import { createLazyFileRoute } from '@tanstack/react-router'
import { useLocalStorage } from '@/hooks/use-local-storage'
import { useBreakpoint } from '@/hooks/use-breakpoint'
import { STORAGE_KEYS } from '@/constants/storage-keys'
import { useTheme } from "@/components/theme/theme-provider"
import { calculateWAM, calculateGPA, calculateTotalCredits, calculateColor } from "@/lib/calculate"
import { toast } from "sonner"
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
  const { isMobile } = useBreakpoint()

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
  const [, setDeletedItems] = useState<Map<number, Result>>(() => new Map<number, Result>())

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
    const itemToDelete = data.find(item => item.id === id)
    if (!itemToDelete) return
  
    // Store deleted item with its ID
    setDeletedItems((prev: Map<number, Result>) => {
      const newMap = new Map(prev)
      newMap.set(id, itemToDelete)
      return newMap
    })
    
    setData(prev => prev.filter(item => item.id !== id))
  
    toast.warning("Unit has been deleted", {
      description: (
        <pre className="mt-1 rounded bg-muted px-2 py-1 font-mono text-sm">
          <code>{`${itemToDelete.unitCode.toUpperCase()} ${itemToDelete.creditPoints}cp ${itemToDelete.mark}% ${itemToDelete.grade}`}</code>
        </pre>
      ),
      cancel: {
        label: "Undo",
        onClick: () => {
          setDeletedItems((prev: Map<number, Result>) => {
            const newMap = new Map(prev)
            const itemToRestore = newMap.get(id)
            if (itemToRestore) {
              // Restore at original position based on ID
              setData(prevData => {
                const newData = [...prevData]
                const insertIndex = newData.findIndex(item => item.id > itemToRestore.id)
                if (insertIndex === -1) {
                  newData.push(itemToRestore)
                } else {
                  newData.splice(insertIndex, 0, itemToRestore)
                }
                return newData
              })
              newMap.delete(id)
            }
            return newMap
          })
        },
      },
    })
  }

  const totalCredits = useMemo(() => calculateTotalCredits(data), [data])
  const wam = useMemo(() => calculateWAM(data), [data])
  const gpa = useMemo(() => calculateGPA(data), [data])

  const stats = [
    {
      title: "WAM",
      subtitle: "Weighted Average Mark",
      value: wam,
      maxValue: 100,
    },
    {
      title: "GPA",
      subtitle: "Grade Point Average",
      value: gpa,
      maxValue: 4,
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
      <div className="container mx-auto mt-4">
        <Card>
          <CardHeader>
            <div className="flex gap-2 items-center font-medium">
              <p className="sm:hidden text-muted-foreground">Credits:</p>
              <p className="hidden sm:inline text-muted-foreground">Total credit points:</p>
              <span className="font-mono font-semibold text-lg sm:text-xl">{totalCredits}</span>
            </div>
          </CardHeader>
        </Card>
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