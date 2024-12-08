import { useEffect, useState } from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { resultSchema, type Result } from "@/schemas/result-schema"
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
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface ResultFormRowProps {
  defaultValues?: Result
  onDelete?: () => void
  onChange?: (values: Result) => void
}

export function ResultFormRow({ defaultValues, onDelete, onChange }: ResultFormRowProps) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    setIsMobile(mediaQuery.matches)

    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mediaQuery.addEventListener('change', handler)
    
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  const form = useForm<Result>({
    resolver: zodResolver(resultSchema),
    defaultValues: defaultValues || {
      unitCode: "",
      creditPoints: 0,
      mark: 0,
      grade: "N",
    },
  })

  const handleChange = form.handleSubmit((values) => {
    onChange?.(values)
  })

  return (
    <Form {...form}>
      <form onChange={handleChange} className="border-b transition-colors hover:bg-muted/50">
        <div className="grid grid-cols-[1.5fr,1fr,1fr,1.2fr,auto] px-1 md:px-2 py-2 md:py-3 items-start">
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
                >
                  <FormControl>
                    <SelectTrigger className="text-sm md:text-base h-8 md:h-10">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
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
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="text-sm md:text-base h-8 md:h-10">
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="HD">HD</SelectItem>
                    <SelectItem value="D">D</SelectItem>
                    <SelectItem value="C">C</SelectItem>
                    <SelectItem value="P">P</SelectItem>
                    <SelectItem value="N">N</SelectItem>
                    <SelectItem value="NH">NH</SelectItem>
                    <SelectItem value="NSR">NSR</SelectItem>
                    <SelectItem value="SFR">SFR</SelectItem>
                    <SelectItem value="WN">WN</SelectItem>
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
            <Trash2 className="h-4 w-4 text-destructive" />
          </Button>
        </div>
      </form>
    </Form>
  )
}