import { createLazyFileRoute } from '@tanstack/react-router'
import { Result, columns } from "./-components/columns"
import { DataTable } from "./-components/data-table"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
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

function Index() {
  const data = getData()

  return (
    <div className="p-2">
      <div className="container mx-auto grid gap-6 grid-cols-2 mb-4">
        <Card>
          <CardHeader>
            <CardTitle>WAM <span className="hidden md:inline text-xl text-muted-foreground">(Weighted Average Mark)</span></CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-mono">75.50</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>GPA <span className="hidden md:inline text-xl text-muted-foreground">(Grade Point Average)</span></CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-4xl font-bold font-mono">3.25</p>
          </CardContent>
        </Card>
      </div>
      {/* <div className="container mx-auto mb-4">
        <Card>
          <CardHeader>
            <CardTitle>Add Unit</CardTitle>
          </CardHeader>
          <CardContent>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-6">
            <Input placeholder="Unit Code" />
            <Input placeholder="Credit Points" type="number" />
            <Input placeholder="Mark" type="number" />
            <Button>Add Unit</Button>
          </div>
          </CardContent>
        </Card>
      </div> */}
      <div className="container mx-auto py-4">
        <DataTable columns={columns} data={data} />
      </div>
    </div>
  )
}