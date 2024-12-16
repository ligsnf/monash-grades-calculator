import { Result } from "@/schemas/result-schema"
import { CORE_GRADES, EXCLUDED_GRADES } from '@/constants/grades'

export function calculateWAM(results: Result[]): number {
  if (!results?.length) return 0;

  // Calculate weighted marks and credit points
  const { weightedMarksSum, weightedCreditPointsSum } = results.reduce((acc, unit) => {
    // Skip excluded grades
    if (unit.grade in EXCLUDED_GRADES) {
      return acc;
    }
    
    const yearLevel = parseInt(unit.unitCode[3])
    const yearLevelWeight = yearLevel === 1 ? 0.5 : 1.0
    
    const weightedMark = unit.mark * unit.creditPoints * yearLevelWeight
    const weightedCreditPoints = unit.creditPoints * yearLevelWeight
    
    return {
      weightedMarksSum: acc.weightedMarksSum + weightedMark,
      weightedCreditPointsSum: acc.weightedCreditPointsSum + weightedCreditPoints
    }
  }, { weightedMarksSum: 0, weightedCreditPointsSum: 0 })

  const wam = weightedMarksSum / weightedCreditPointsSum
  return Number(isNaN(wam) ? 0 : wam.toFixed(3))
}

export function calculateGPA(results: Result[]): number {
  if (!results?.length) return 0;

  const { weightedGPASum, totalCreditPoints } = results.reduce((acc, unit) => {
    // Skip if not in CORE_GRADES
    if (!(unit.grade in CORE_GRADES)) {
      return acc;
    }
    
    const gradeValue = CORE_GRADES[unit.grade as keyof typeof CORE_GRADES].gpaValue
    const weightedGPA = gradeValue * unit.creditPoints
    
    return {
      weightedGPASum: acc.weightedGPASum + weightedGPA,
      totalCreditPoints: acc.totalCreditPoints + unit.creditPoints
    }
  }, { weightedGPASum: 0, totalCreditPoints: 0 })

  const gpa = weightedGPASum / totalCreditPoints
  return Number(isNaN(gpa) ? 0 : gpa.toFixed(3))
}

export function calculateTotalCredits(results: Result[]): number {
  if (!results?.length) return 0
  return results.reduce((acc, unit) => acc + unit.creditPoints, 0)
}

export function calculateColor(value: number, maxValue: number, isDarkMode: boolean = false) {
  // Convert to percentage
  const percentage = (value / maxValue) * 100
  
  // Map percentage to hue (0-120)
  // 0% = 0 (red), 100% = 120 (green)
  const hue = Math.min(120, Math.max(0, percentage * 1.2))
  
  // Keep saturation constant
  const saturation = 100
  
  // Adjust lightness based on dark mode
  const lightness = isDarkMode ? 45 : 35
  
  return `hsl(${hue},${saturation}%,${lightness}%)`
}
