import { zodResolver } from "@hookform/resolvers/zod"
import { cn } from "@/lib/utils"
import { useForm } from "react-hook-form"
import { useBreakpoint } from '@/hooks/use-breakpoint'
import { resultSchema, type Result } from "@/schemas/result-schema"
import { CORE_GRADES, EXCLUDED_GRADES } from '@/constants/grades'
import { Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ResultFormRowProps {
  defaultValues?: Result
  onDelete?: () => void
  onChange?: (values: Result) => void
  gridCols?: string
}

export function ResultFormRow({ defaultValues, onDelete, onChange, gridCols }: ResultFormRowProps) {
  const { isMobile } = useBreakpoint()

  const form = useForm<Result>({
    resolver: zodResolver(resultSchema),
    defaultValues: defaultValues || {
      unitCode: "",
      creditPoints: 0,
      mark: 0,
      grade: "",
    },
  })

  const handleChange = (e: React.FormEvent) => {
    void form.handleSubmit((values) => {
      onChange?.(values)
    })(e)
  }

  return (
    <Form {...form}>
      <form onChange={handleChange} className="border-b hover:bg-muted/50 font-mono">
        <div className={cn("grid px-1 md:px-2 py-2 md:py-3 items-start", gridCols)}>
          <FormField
            control={form.control}
            name="unitCode"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormControl>
                  <Input 
                    {...field} 
                    className="text-sm md:text-base h-8 md:h-10 uppercase"
                  />
                </FormControl>
                <FormMessage className="text-xs px-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creditPoints"
            render={({ field }) => (
              <FormItem className="px-1">
                <Select 
                  onValueChange={(value) => field.onChange(Number(value))} 
                  value={field.value.toString()}
                  name={`creditPoints-${defaultValues?.id}`}
                >
                  <FormControl>
                    <SelectTrigger className="text-sm md:text-base h-8 md:h-10">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="0">0</SelectItem>
                    <SelectItem value="6">6</SelectItem>
                    <SelectItem value="12">12</SelectItem>
                    <SelectItem value="18">18</SelectItem>
                    <SelectItem value="24">24</SelectItem>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mark"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormControl>
                  {isMobile ? (
                    <Input 
                      type="text"
                      inputMode="numeric"
                      pattern="[0-9]*"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                      className="text-sm md:text-base h-8 md:h-10" 
                    />
                  ) : (
                    <Input 
                      type="number"
                      {...field}
                      onChange={e => field.onChange(Number(e.target.value))}
                      className="text-sm md:text-base h-8 md:h-10" 
                    />
                  )}
                </FormControl>
                <FormMessage className="text-xs px-1" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="grade"
            render={({ field }) => (
              <FormItem className="px-1">
                <Select 
                  onValueChange={field.onChange}
                  value={field.value}
                  name={`grade-${defaultValues?.id}`}
                >
                  <FormControl>
                    <SelectTrigger className="text-sm md:text-base h-8 md:h-10">
                      <SelectValue placeholder="..." />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="max-h-72">
                    <SelectGroup>
                      <SelectLabel>Common Grades</SelectLabel>
                      {Object.keys(CORE_GRADES).map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                    <SelectGroup>
                      <SelectLabel>Other Grades</SelectLabel>
                      {Object.keys(EXCLUDED_GRADES).map((grade) => (
                        <SelectItem key={grade} value={grade}>
                          {grade}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FormItem>
            )}
          />
          <Button 
            type="button" 
            variant="ghost" 
            onClick={onDelete}
            className="h-8 px-2 md:h-10 md:px-3"
          >
            <Trash2 className="text-destructive" />
          </Button>
        </div>
      </form>
    </Form>
  )
}