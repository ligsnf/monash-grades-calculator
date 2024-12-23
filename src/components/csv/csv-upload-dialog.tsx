import { Upload } from "lucide-react"
import { CSVUploadAlert } from "@/components/csv/csv-upload-alert"
import { CSVUploader } from "@/components/csv/csv-uploader"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ProcessingResult } from "@/lib/csv-parser"

interface CSVUploadDialogProps {
  onCSVUpload: (csvProcessor: (data: string) => ProcessingResult, csvData: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function CSVUploadDialog({ onCSVUpload, open, onOpenChange }: CSVUploadDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Upload className="" strokeWidth={2.5} />
          <span className="sm:hidden">CSV</span>
          <span className="hidden sm:inline">Upload CSV</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload CSV</DialogTitle>
        </DialogHeader>
        <CSVUploadAlert />
        <DialogDescription className="hidden">
          Upload a CSV file to replace all current data
        </DialogDescription>
        <CSVUploader onCSVUpload={onCSVUpload} />
      </DialogContent>
    </Dialog>
  )
}