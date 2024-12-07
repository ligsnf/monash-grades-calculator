import { ColumnDef } from "@tanstack/react-table"
import { Trash2 } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
    header: () => <div>Unit Code</div>,
    cell: ({ row }) => {
      return (
        <Select>
          <SelectTrigger className="md:text-base">
            <SelectValue placeholder={row.getValue("unitCode")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Unit Code</SelectLabel>
              <SelectItem value="FIT1045">{row.getValue("unitCode")}</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    accessorKey: "creditPoints",
    header: () => <div>Credit <span className="hidden md:inline">Points</span></div>,
    cell: ({ row }) => {
      return <Input className="md:text-base" placeholder="Credit Points" type="number" value={row.getValue("creditPoints")} />
    },
  },
  {
    accessorKey: "mark",
    header: () => <div>Mark</div>,
    cell: ({ row }) => {
      return <Input className="md:text-base" placeholder="Mark" type="number" value={row.getValue("mark")} />
    },
  },
  {
    accessorKey: "grade",
    header: () => <div>Grade</div>,
    cell: ({ row }) => {
      return (
        <Select>
          <SelectTrigger className="md:text-base">
            <SelectValue placeholder={row.getValue("grade")} />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Grade</SelectLabel>
              <SelectItem value="HD">HD</SelectItem>
              <SelectItem value="D">D</SelectItem>
              <SelectItem value="C">C</SelectItem>
              <SelectItem value="P">P</SelectItem>
              <SelectItem value="N">N</SelectItem>
              <SelectItem value="NH">NH</SelectItem>
              <SelectItem value="NSR">NSR</SelectItem>
              <SelectItem value="SFR">SFR</SelectItem>
              <SelectItem value="WN">WN</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      )
    },
  },
  {
    accessorKey: "delete",
    header: "",
    cell: () => {
      return <Button variant="ghost" className="h-8 px-2 md:h-10 md:px-4"><Trash2 className="text-destructive" /></Button>
    },
  },
]
