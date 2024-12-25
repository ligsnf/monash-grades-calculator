import { Download, ExternalLink, FileText, Info } from "lucide-react"
import { siteConfig } from "@/config/site"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"

export function CSVInformationDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="min-w-10">
          <Info className="text-primary" strokeWidth={2.5} />
          <span className="hidden sm:inline">Import Results Guide</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>
            <span className="sm:hidden">How to Export Your Academic Record</span>
            <span className="hidden sm:inline">How to Export Your Academic Record as CSV</span>
          </DialogTitle>
          <DialogDescription>
            <span className="sm:hidden">Steps to prepare your record for upload</span>
            <span className="hidden sm:inline">Follow these steps to prepare your academic record for upload</span>
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[calc(80vh-8rem)]">
          <div className="grid gap-4 py-1 pr-4">
            <section className="space-y-1">
              <h3 className="font-medium">1. Access Your Academic Record</h3>
              <p className="text-sm text-muted-foreground">
                Navigate to WES → <a href="https://my.monash.edu/wes/exam/results/" className="underline hover:text-primary" target="_blank" rel="noreferrer">Unofficial Academic Record</a>
              </p>
            </section>

            <section className="space-y-1">
              <h3 className="font-medium">2. Select Your Results</h3>
              <p className="text-sm text-muted-foreground">
                Highlight the entire results table <span className="sm:hidden">with</span> <span className="hidden sm:inline">including the</span> headers
              </p>
              <img
                src={`${siteConfig.basePath}img/select-results.png`}
                alt="Selecting academic results table in WES"
                className="rounded-md border w-full aspect-[26/9] object-cover object-bottom"
              />
            </section>

            <section className="space-y-1">
              <h3 className="font-medium">3. Copy to Spreadsheet</h3>
              <p className="text-sm text-muted-foreground">
                Copy and paste into <a href="https://docs.google.com/spreadsheets/" className="underline hover:text-primary" target="_blank" rel="noreferrer">Google Sheets</a> or <span className="hidden sm:inline">Microsoft</span> Excel
              </p>
              <img 
                src={`${siteConfig.basePath}img/spreadsheet-view.png`}
                alt="Pasted data in Google Sheets"
                className="hidden sm:block rounded-md border w-full h-auto object-cover"
              />
            </section>

            <section className="space-y-1">
              <h3 className="font-medium">4. Export as CSV</h3>
              <p className="text-sm text-muted-foreground">
                File → Download → <span className="hidden sm:inline">Comma-separated values</span> (.csv)
              </p>
              <img
                src={`${siteConfig.basePath}img/save-dialog.png`}
                alt="Saving as CSV in Google Sheets"
                className="rounded-md border w-full aspect-video object-cover"
              />
            </section>

            <section>
              <p className="text-xs text-muted-foreground mb-2">Sample file showing the expected format</p>
              <div className="flex items-center gap-2 rounded-lg border p-2">
                <FileText className="h-6 w-6 text-muted-foreground" />
                <div className="flex flex-1 flex-col">
                  <p className="text-sm font-medium">example_results.csv</p>
                  {/* <p className="text-xs text-muted-foreground">2.5 KB</p> */}
                </div>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`${siteConfig.links.github}/blob/main/public/example_results.csv`, '_blank')}
                >
                  <ExternalLink />
                  <span className="hidden sm:inline">View</span>
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => window.open(`${siteConfig.basePath}example_results.csv`, '_blank')}
                >
                  <Download />
                  <span className="hidden sm:inline">Download</span>
                </Button>
              </div>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}