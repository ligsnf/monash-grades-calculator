export const CORE_GRADES = {
  HD: { label: "High Distinction", mark: "80-100", gpaValue: 4.0 },
  D: { label: "Distinction", mark: "70-79", gpaValue: 3.0 },
  C: { label: "Credit", mark: "60-69", gpaValue: 2.0 },
  P: { label: "Pass", mark: "50-59", gpaValue: 1.0 },
  N: { label: "Fail", mark: "0-49", gpaValue: 0.3 },
  NH: { label: "Hurdle Fail", mark: "45", gpaValue: 0.3 },
  WN: { label: "Withdrawn Fail", mark: "", gpaValue: 0.0 },
} as const

export const EXCLUDED_GRADES = {
  SFR: "Satisfied Faculty Requirements",
  NSR: "Not Satisfied Requirements",
  NE: "Not Examinable",
  NAS: "Not Assessed",
  WDN: "Withdrawn",
  WI: "Withdrawn Incomplete",
  PGO: "Pass Grade Only",
  NGO: "Fail",
  DEF: "Deferred Assessment",
  NS: "Supplementary Assessment",
  WH: "Withheld",
} as const
