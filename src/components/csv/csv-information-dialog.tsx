import { Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function CSVInformationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="min-w-10">
          <Info className="text-primary" strokeWidth={2.5} />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Instructions for preparing CSV</DialogTitle>
          <DialogDescription>
            yeah mate
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}