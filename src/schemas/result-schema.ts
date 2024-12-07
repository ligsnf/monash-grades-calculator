import { z } from "zod"

export const resultSchema = z.object({
  id: z.number(),
  unitCode: z.string().length(7),
  creditPoints: z.number().min(0).max(24),
  mark: z.number().min(0).max(100),
  grade: z.enum(["HD", "D", "C", "P", "N", "NH", "NSR", "SFR", "WN"]),
})

export type Result = z.infer<typeof resultSchema>
