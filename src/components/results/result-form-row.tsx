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
        <div className="grid grid-cols-[2fr,1fr,1fr,1fr,auto] px-1 md:px-2 py-2 md:py-3 items-start">
          <FormField
            control={form.control}
            name="unitCode"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormControl>
                  <Input placeholder="ENG...." {...field} className="text-sm md:text-base" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="creditPoints"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormControl>
                  <Input 
                    type="number" 
                    {...field}
                    onChange={e => field.onChange(Number(e.target.value))}
                    className="text-sm md:text-base" 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="mark"
            render={({ field }) => (
              <FormItem className="px-1">
                <FormControl>
                <Input 
                  type="number" 
                  {...field}
                  onChange={e => field.onChange(Number(e.target.value))}
                  className="text-sm md:text-base" 
                />
                </FormControl>
                <FormMessage />
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
                    <SelectTrigger className="text-sm md:text-base">
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