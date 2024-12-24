import { useCallback, useEffect, useMemo, useState } from 'react'
import { toast } from "sonner"
import { createLazyFileRoute } from '@tanstack/react-router'
import { addResult, deleteResult, updateResult, restoreResult, setResults } from '@/api/results'
import { db } from "@/db/local-storage"
import { Result } from "@/schemas/result-schema"
import { calculateWAM, calculateGPA, calculateTotalCredits } from "@/lib/calculate"
import { ProcessingResult } from '@/lib/csv-parser'

import { StatCard } from "@/components/stat-card"
import { CSVUploadAlert } from "@/components/csv/csv-upload-alert"
import { CSVUploadDialog } from '@/components/csv/csv-upload-dialog'
import { CSVInformationDialog } from '@/components/csv/csv-information-dialog'
import { ResultTable } from "@/components/results/result-table"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardHeader,
} from "@/components/ui/card"

export const Route = createLazyFileRoute('/')({
  component: Index,
})

function Index() {
  const [data, setData] = useState<Result[]>(() => db.getData())
  const [tableKey, setTableKey] = useState(0)
  const [, setDeletedItems] = useState<Map<number, Result>>(() => new Map<number, Result>())
  const [uploadDialogOpen, setUploadDialogOpen] = useState(false);

  useEffect(() => {
    setData(db.getData())
  }, [])

  const handleResultDelete = (id: number) => {
    const itemToDelete = data.find(item => item.id === id)
    if (!itemToDelete) return

    const newData = deleteResult(id)
    setData(newData)

    setDeletedItems((prev: Map<number, Result>) => {
      const newMap = new Map(prev)
      newMap.set(id, itemToDelete)
      return newMap
    })

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
              const newData = restoreResult(itemToRestore)
              setData(newData)
              newMap.delete(id)
            }
            return newMap
          })
        },
      },
    })
  }

  const handleCSVUpload = useCallback((csvProcessor: (data: string) => ProcessingResult, csvData: string) => {
    const result = csvProcessor(csvData);
    
    if (result.success && result.results) {
      setData(setResults(result.results));
      setTableKey(prev => prev + 1);
      setUploadDialogOpen(false);
      
      if (result.warnings) {
        result.warnings.forEach(warning => {
          console.warn('CSV upload warning:', warning);
          toast.warning(warning);
        });
      }

      console.log('CSV upload successful:', {
        count: result.results.length,
        data: result.results
      });

      toast.success("CSV uploaded successfully", {
        description: `Imported ${result.results.length} results`
      });
    } else {
      setUploadDialogOpen(false);
      console.error('CSV upload failed:', result.error);
      toast.error("Failed to process CSV", {
        description: result.error
      });
    }
  }, []);

  const totalCredits = useMemo(() => calculateTotalCredits(data), [data])
  const gpa = useMemo(() => calculateGPA(data), [data])
  const wam = useMemo(() => calculateWAM(data), [data])

  const stats = [
    {
      title: "GPA",
      subtitle: "Grade Point Average",
      value: gpa,
      maxValue: 4,
    },
    {
      title: "WAM",
      subtitle: "Weighted Average Mark",
      value: wam,
      maxValue: 100,
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
            <div className="flex justify-between">
              <div className="flex items-center gap-2 font-medium">
                <p className="md:hidden text-muted-foreground">Credits:</p>
                <p className="hidden md:inline lg:hidden text-muted-foreground">Credit points:</p>
                <p className="hidden lg:inline text-muted-foreground">Total credit points:</p>
                <span className="font-mono font-semibold text-lg sm:text-xl">{totalCredits}</span>
              </div>
              <div className="flex items-center gap-2">
                <CSVUploadAlert className="hidden md:flex" />
                <CSVUploadDialog 
                  onCSVUpload={handleCSVUpload}
                  open={uploadDialogOpen}
                  onOpenChange={setUploadDialogOpen}
                />
                <CSVInformationDialog />
              </div>
            </div>
          </CardHeader>
        </Card>
      </div>
      <div className="container mx-auto py-4">
        <ResultTable
          key={tableKey}
          data={data} 
          onResultUpdate={(id, result) => setData(updateResult(id, result))}
          onResultDelete={handleResultDelete}
        />
      </div>
      <div className="container mx-auto md:mt-2">
        <Button onClick={() => setData(addResult())}>Add Unit</Button>
      </div>
    </div>
  )
}