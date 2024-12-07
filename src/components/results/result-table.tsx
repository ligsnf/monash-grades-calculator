import { ResultFormRow } from "@/components/results/result-form-row"
import { Result } from "@/schemas/result-schema"

interface ResultTableProps {
  data: Result[]
  onResultUpdate: (index: number, values: Result) => void
  onResultDelete: (index: number) => void
}

export function ResultTable({ data, onResultUpdate, onResultDelete }: ResultTableProps) {
  return (
    <div className="relative w-full overflow-auto">
      <div className="w-full border rounded-md">
        <div className="h-10 md:h-12 border-b">
          <div className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] px-1 md:px-2 h-full items-center">
            <div className="px-2 text-sm md:text-base font-medium text-muted-foreground">Unit Code</div>
            <div className="px-2 text-sm md:text-base font-medium text-muted-foreground">Credit <span className="hidden md:inline">Points</span></div>
            <div className="px-2 text-sm md:text-base font-medium text-muted-foreground">Mark</div>
            <div className="px-2 text-sm md:text-base font-medium text-muted-foreground">Grade</div>
            <div className="px-2 w-8 md:w-10"></div>
          </div>
        </div>
        <div className="[&>*:last-child]:border-0">
          {data.map((result) => (
            <ResultFormRow
              key={result.id}
              defaultValues={result}
              onChange={(values) => onResultUpdate(result.id, values)}
              onDelete={() => onResultDelete(result.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}