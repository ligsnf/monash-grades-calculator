import { z } from 'zod';
import { Result, resultSchema } from '@/schemas/result-schema';
import Papa from 'papaparse';

const CSV_DEFAULTS = {
  CREDIT_POINTS: 6,
  MARK: 0,
  GRADE: '',
};

const WARNING_TYPES = {
  MISSING: 'missing',
  INCOMPLETE: 'incomplete',
  INVALID: 'invalid',
};

type WarningType = (typeof WARNING_TYPES)[keyof typeof WARNING_TYPES];

interface FieldWarning {
  field: string;
  type: WarningType;
}

const CSV_HEADERS = {
  'Unit code': 'unitCode',
  'Unit title': 'unitTitle',
  'Teaching period': 'teachingPeriod',
  'Credit points': 'creditPoints',
  Mark: 'mark',
  Grade: 'grade',
  Year: 'year',
};
const REQUIRED_HEADERS = ['Unit code', 'Credit points', 'Mark', 'Grade'];

export type CSVRow = {
  [K in keyof typeof CSV_HEADERS]: string;
};

export interface ProcessingResult {
  success: boolean;
  results?: Result[];
  warnings?: string[];
  error?: string;
}

const cleanHeader = (header: string): string => {
  return header
    .replace(/[\uFEFF\u200B]/g, '') // Remove BOM and zero-width spaces
    .replace(/[^\x20-\x7E]/g, ' ') // Replace non-printable chars with space
    .replace(/\s+/g, ' ') // Normalize multiple spaces
    .trim();
};

const generateWarning = (
  field: string,
  rawValue: string | undefined | null
): FieldWarning | null => {
  if (!rawValue?.trim()) {
    return { field, type: WARNING_TYPES.MISSING };
  }
  const isDefaulted = (field: string, value: string) => {
    switch (field) {
      case 'mark':
        return parseInt(value) === CSV_DEFAULTS.MARK;
      case 'grade':
        return value === CSV_DEFAULTS.GRADE;
      default:
        return false;
    }
  };
  if (isDefaulted(field, rawValue.trim())) {
    return { field, type: WARNING_TYPES.INVALID };
  }
  return null;
};

export function processCSVData(
  parsedData: Papa.ParseResult<CSVRow>
): ProcessingResult {
  try {
    if (parsedData.errors.length > 0) {
      return {
        success: false,
        error:
          'Failed to parse CSV: ' +
          parsedData.errors.map((e) => e.message).join(', '),
      };
    }

    // Clean and validate headers
    const cleanedFields = parsedData.meta.fields?.map(cleanHeader) || [];
    const missingHeaders = REQUIRED_HEADERS.filter(
      (header) => !cleanedFields.includes(cleanHeader(header))
    );

    if (missingHeaders.length > 0) {
      return {
        success: false,
        error: `Missing required columns: ${missingHeaders.join(', ')}. Please check your CSV headers match the expected format.`,
      };
    }

    const warnings: string[] = [];
    const results: Result[] = [];
    let currentId = 0;

    for (const [index, dirtyRow] of parsedData.data.entries()) {
      try {
        // Clean row headers
        const row: CSVRow = Object.entries(dirtyRow).reduce(
          (acc, [key, value]) => {
            const cleanedKey = cleanHeader(key);
            return { ...acc, [cleanedKey]: value };
          },
          {} as CSVRow
        );

        // Credit points processing
        const creditPoints = (() => {
          const rawValue = row['Credit points']?.trim();
          if (!rawValue) return CSV_DEFAULTS.CREDIT_POINTS;
          const parsed = parseInt(rawValue);
          return isNaN(parsed) ? CSV_DEFAULTS.CREDIT_POINTS : parsed;
        })();

        // Mark processing
        const mark = (() => {
          const rawValue = row['Mark']?.trim();
          try {
            return resultSchema.shape.mark.parse(parseInt(rawValue));
          } catch {
            return CSV_DEFAULTS.MARK;
          }
        })();

        // Grade processing
        const grade = (() => {
          const rawValue = row['Grade']?.trim().toUpperCase();
          try {
            resultSchema.shape.grade.parse(rawValue);
            return rawValue;
          } catch {
            return CSV_DEFAULTS.GRADE;
          }
        })();

        const result = resultSchema.parse({
          id: currentId++,
          unitCode: row['Unit code'].trim().toUpperCase(),
          creditPoints,
          mark,
          grade,
        });

        results.push(result);

        // Generate warnings for each row
        const warnings_for_row: FieldWarning[] = [];
        const markWarning = generateWarning('mark', row['Mark']);
        const gradeWarning = generateWarning('grade', row['Grade']);

        if (markWarning) warnings_for_row.push(markWarning);
        if (gradeWarning) warnings_for_row.push(gradeWarning);

        if (warnings_for_row.length > 0) {
          warnings.push(
            `${row['Unit code']}: ${warnings_for_row.map((w) => `${w.field} ${w.type}`).join(', ')}`
          );
        }
      } catch (error) {
        if (error instanceof z.ZodError) {
          const firstError = error.errors[0];
          const schemaField = firstError.path.join('.');
          const csvField = Object.entries(CSV_HEADERS).find(
            ([, schema]) => schema === schemaField
          )?.[0];

          return {
            success: false,
            error: `Row ${index + 1}: ${schemaField} "${dirtyRow[csvField as keyof CSVRow]}" is invalid: ${firstError.message}`,
          };
        }
        throw error;
      }
    }

    return {
      success: true,
      results,
      warnings: warnings.length > 0 ? warnings : undefined,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}
