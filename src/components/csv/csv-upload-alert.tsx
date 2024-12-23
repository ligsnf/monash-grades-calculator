import { cn } from "@/lib/utils"
import { TriangleAlert } from "lucide-react"

export function CSVUploadAlert({ className }: { className?: string }) {
  return (
    <div className={cn("flex h-full items-center gap-2 p-2 border rounded-md text-sm border-[#fdf5d3] dark:border-[#3d3d00] text-[#dc7609] dark:text-[#f3cf58] [&>svg]:text-[#dc7609] [&>svg]:dark:text-[#f3cf58]", className)}>
      <TriangleAlert className="h-4 w-4 !top-auto" />
      Uploading CSV will replace all current data.
    </div>
  )
}