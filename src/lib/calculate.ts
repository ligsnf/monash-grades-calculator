import { Result } from "@/schemas/result-schema"

function calculateWAM(results: Result[]): number {
  const excludedGrades = [
    'SFR', // satisfied faculty requirements
    'NSR', // not satisfied faculty requirements
    'NE',  // not examinable
    'NAS', // not assessed
    'WDN', // withdrawn
    'WI',  // withdrawn incomplete
    'PGO', // pass grade only
    'NGO', // fail grade
    'DEF', // deferred assessment
    'NS',  // supplementary assessment
    'WH'   // withheld
  ];
  
  // Calculate weighted marks and credit points
  const { weightedMarksSum, weightedCreditPointsSum } = results.reduce((acc, unit) => {
    // Skip excluded grades
    if (excludedGrades.includes(unit.grade)) {
      return acc;
    }
    
    // Get year level from unit code (4th character)
    const yearLevel = parseInt(unit.unitCode[3])
    // First year units have weight 0.5, others have weight 1.0
    const yearLevelWeight = yearLevel === 1 ? 0.5 : 1.0
    
    // Calculate weighted mark: mark × credit points × year level weight
    const weightedMark = unit.mark * unit.creditPoints * yearLevelWeight
    // Calculate weighted credit points: credit points × year level weight
    const weightedCreditPoints = unit.creditPoints * yearLevelWeight
    
    return {
      weightedMarksSum: acc.weightedMarksSum + weightedMark,
      weightedCreditPointsSum: acc.weightedCreditPointsSum + weightedCreditPoints
    }
  }, { weightedMarksSum: 0, weightedCreditPointsSum: 0 })

  // Calculate WAM to 3 decimal places
  const wam = weightedMarksSum / weightedCreditPointsSum
  return Number(wam.toFixed(3))
}

function getGradeValue(grade: string): number | null {
  switch (grade) {
    case 'HD':
      return 4.0;
    case 'D':
      return 3.0;
    case 'C':
      return 2.0;
    case 'P':
      return 1.0;
    case 'NP':  // Near pass
      return 0.7;
    case 'N':    // Fail
      return 0.3;
    case 'NH':   // Hurdle fail
      return 0.3;
    case 'WN':   // Withdrawn fail
      return 0.0;
    // Grades that should be excluded return null
    case 'SFR':  // satisfied faculty requirements
    case 'NE':   // not examinable
    case 'NAS':  // not assessed
    case 'WI':   // withdrawn incomplete
    case 'PGO':  // pass grade only
    case 'NPGO':
    case 'WNGO':
      return null;
    default:
      return 0.0;
  }
}

function calculateGPA(results: Result[]): number {
  // Filter out results with excluded grades and calculate sums
  const { weightedGPASum, totalCreditPoints } = results.reduce((acc, unit) => {
    const gradeValue = getGradeValue(unit.grade)
    
    // Skip this unit if the grade should be excluded
    if (gradeValue === null) {
      return acc;
    }
    
    const weightedGPA = gradeValue * unit.creditPoints
    
    return {
      weightedGPASum: acc.weightedGPASum + weightedGPA,
      totalCreditPoints: acc.totalCreditPoints + unit.creditPoints
    }
  }, { weightedGPASum: 0, totalCreditPoints: 0 })

  // Calculate GPA to 3 decimal places
  const gpa = weightedGPASum / totalCreditPoints
  return Number(gpa.toFixed(3))
}

function calculateColor(value: number, maxValue: number, isDarkMode: boolean = false) {
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

export { calculateWAM, calculateGPA, calculateColor }
