/**
 * HECS/HELP repayment calculation based on ATO compulsory repayment thresholds.
 * 2024–25 financial year rates.
 */

interface HecsThreshold {
  min: number
  max: number
  rate: number
}

const HECS_THRESHOLDS: HecsThreshold[] = [
  { min: 0, max: 54435, rate: 0 },
  { min: 54436, max: 62850, rate: 0.01 },
  { min: 62851, max: 66620, rate: 0.02 },
  { min: 66621, max: 70618, rate: 0.025 },
  { min: 70619, max: 74855, rate: 0.03 },
  { min: 74856, max: 79346, rate: 0.035 },
  { min: 79347, max: 84107, rate: 0.04 },
  { min: 84108, max: 89154, rate: 0.045 },
  { min: 89155, max: 94503, rate: 0.05 },
  { min: 94504, max: 100174, rate: 0.055 },
  { min: 100175, max: 106185, rate: 0.06 },
  { min: 106186, max: 112557, rate: 0.065 },
  { min: 112558, max: 119309, rate: 0.07 },
  { min: 119310, max: 126467, rate: 0.075 },
  { min: 126468, max: 134056, rate: 0.08 },
  { min: 134057, max: 142105, rate: 0.085 },
  { min: 142106, max: 150642, rate: 0.09 },
  { min: 150643, max: 159695, rate: 0.095 },
  { min: 159696, max: Infinity, rate: 0.10 },
]

/**
 * Calculate monthly HECS repayment amount.
 * Returns 0 if no HECS debt or income below threshold.
 */
export function calcHecsMonthlyRepayment(yearlyIncome: number, hecsBalance: number): number {
  if (hecsBalance <= 0 || yearlyIncome <= 0) return 0

  const threshold = HECS_THRESHOLDS.find(t => yearlyIncome >= t.min && yearlyIncome <= t.max)
  const rate = threshold?.rate ?? 0.10

  if (rate === 0) return 0

  const yearlyRepayment = Math.min(yearlyIncome * rate, hecsBalance)
  return Math.round(yearlyRepayment / 12 * 100) / 100
}
