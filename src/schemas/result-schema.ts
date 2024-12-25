import { z } from 'zod';
import { CORE_GRADES, EXCLUDED_GRADES } from '@/constants/grades';

const createEnum = (values: string[]) => {
  if (values.length === 0) throw new Error('Enum must have at least one value');
  return values as [string, ...string[]];
};

export const resultSchema = z.object({
  id: z.number(),
  unitCode: z
    .string()
    .length(7, 'must be 7 characters long')
    .regex(
      /^[A-Za-z]{3}[0-9]{4}$/,
      'must be 3 letters followed by 4 numbers (e.g. FIT1045)'
    ),
  creditPoints: z.number().min(0).max(24),
  mark: z
    .number()
    .min(0, "can't be negative")
    .max(100, "can't be greater than 100"),
  grade: z.union([
    z.enum(
      createEnum([...Object.keys(CORE_GRADES), ...Object.keys(EXCLUDED_GRADES)])
    ),
    z.literal(''),
  ]),
});

export type Result = z.infer<typeof resultSchema>;
