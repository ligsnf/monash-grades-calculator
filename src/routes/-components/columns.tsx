import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Result = {
  year: number
  unitCode: string
  unitTitle?: string
  teachingPeriod?: string
  creditPoints: number
  mark: number
  grade: string
}

export const columns: ColumnDef<Result>[] = [
  {
    accessorKey: "unitCode",
    header: "Unit Code",
  },
  {
    accessorKey: "creditPoints",
    header: "Credit Points",
  },
  {
    accessorKey: "mark",
    header: "Mark",
  },
  {
    accessorKey: "grade",
    header: "Grade",
  },
]
