import { ResultFormRow } from "@/components/results/result-form-row"
import { Result } from "@/schemas/result-schema"
import { cn } from "@/lib/utils"

interface ResultTableProps {
  data: Result[]
  onResultUpdate: (index: number, values: Result) => void
  onResultDelete: (index: number) => void
}

const GRID_COLS = "grid-cols-[1.6fr,1.1fr,1fr,1.3fr,auto]"

export function ResultTable({ data, onResultUpdate, onResultDelete }: ResultTableProps) {
  return (
    <div className="relative w-full">
      <div className="w-full border rounded-md">
        <div className="h-10 md:h-12 border-b">
          <div className={cn("grid px-1 md:px-2 h-full items-center", GRID_COLS)}>
            <div className="px-2 text-sm md:text-base font-medium text-muted-foreground">Unit Code</div>
            <div className="px-2 text-sm md:text-base font-medium text-muted-foreground">Credit <span className="hidden md:inline">Points</span></div>
            <div className="px-2 text-sm md:text-base font-medium text-muted-foreground">Mark</div>
            <div className="px-2 text-sm md:text-base font-medium text-muted-foreground">Grade</div>
            <div className="px-2 w-8 md:w-10"></div>
          </div>
        </div>
        <div className="[&>*:last-child]:border-0">
          {data.length ? (
            data.map((result) => (
              <ResultFormRow
                key={result.id}
                defaultValues={result}
                onChange={(values) => onResultUpdate(result.id, values)}
                onDelete={() => onResultDelete(result.id)}
                gridCols={GRID_COLS}
              />
            ))
          ) : (
            <p className="px-3 md:px-4 py-2 md:py-4 text-xs md:text-sm text-muted-foreground">
              No units added. Click the button below to add a unit.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}