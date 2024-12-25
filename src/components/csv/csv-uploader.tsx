import * as React from 'react';
import { FileText, Upload, X } from 'lucide-react';
import Dropzone, {
  DropzoneRootProps,
  DropzoneInputProps,
} from 'react-dropzone';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { processCSV, ProcessingResult } from '@/lib/csv-parser';
import { Button } from '@/components/ui/button';

interface CSVUploaderProps extends React.HTMLAttributes<HTMLDivElement> {
  onCSVUpload: (
    csvProcessor: (data: string) => ProcessingResult,
    csvData: string
  ) => void;
  disabled?: boolean;
  className?: string;
}

export function CSVUploader({
  onCSVUpload,
  disabled = false,
  className,
}: CSVUploaderProps) {
  const [file, setFile] = React.useState<File | null>(null);

  const onDrop = React.useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        toast.error('Please upload a CSV file');
        return;
      }

      const csvFile = acceptedFiles[0];
      setFile(csvFile);

      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const csvData = event.target.result as string;
          onCSVUpload(processCSV, csvData);
        }
      };
      reader.readAsText(csvFile);
    },
    [onCSVUpload]
  );

  function onRemove() {
    setFile(null);
  }

  return (
    <div className="relative flex flex-col gap-4">
      <Dropzone
        onDrop={onDrop}
        accept={{ 'text/csv': ['.csv'] }}
        maxFiles={1}
        multiple={false}
        disabled={disabled}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
        }: {
          getRootProps: () => DropzoneRootProps;
          getInputProps: () => DropzoneInputProps;
          isDragActive: boolean;
        }) => (
          <div
            {...getRootProps()}
            className={cn(
              'group relative grid h-40 w-full cursor-pointer place-items-center rounded-lg border-2 border-dashed border-muted-foreground/25 px-5 py-2.5 text-center transition hover:bg-muted/25',
              isDragActive && 'border-muted-foreground/50',
              disabled && 'pointer-events-none opacity-60',
              className
            )}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center gap-4">
              <Upload
                className="h-8 w-8 text-muted-foreground"
                aria-hidden="true"
              />
              <div className="flex flex-col gap-1">
                <p className="hidden sm:inline font-medium text-muted-foreground">
                  {isDragActive
                    ? 'Drop the CSV file here'
                    : 'Drag and drop a CSV file, or click to select'}
                </p>
                <p className="sm:hidden font-medium text-muted-foreground">
                  Click to select a CSV file
                </p>
                {/* <p className="text-sm text-muted-foreground/70">
                  You can only upload one file
                </p> */}
              </div>
            </div>
          </div>
        )}
      </Dropzone>

      {file && (
        <div className="flex items-center gap-2 rounded-lg border p-2">
          <FileText className="h-6 w-6 text-muted-foreground" />
          <div className="flex flex-1 flex-col">
            <p className="text-sm font-medium">{file.name}</p>
            <p className="text-xs text-muted-foreground">
              {(file.size / 1024).toFixed(2)} KB
            </p>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={onRemove}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Remove file</span>
          </Button>
        </div>
      )}
    </div>
  );
}
