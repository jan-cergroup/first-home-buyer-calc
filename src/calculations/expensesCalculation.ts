/**
 * HEM (Household Expenditure Measure) benchmark lookup.
 *
 * Banks use the higher of self-reported expenses or HEM
 * when assessing borrowing capacity.
 *
 * Values are monthly amounts based on income bracket and household type.
 * Approximate figures from Melbourne Institute HEM data.
 */

import type { BuyerType } from '../types'

interface HemBracket {
  maxIncome: number
  single: number
  couple: number
}

// Monthly HEM values by gross annual income bracket
const HEM_TABLE: HemBracket[] = [
  { maxIncome: 40000, single: 1200, couple: 1800 },
  { maxIncome: 60000, single: 1400, couple: 2100 },
  { maxIncome: 80000, single: 1600, couple: 2400 },
  { maxIncome: 100000, single: 1800, couple: 2700 },
  { maxIncome: 120000, single: 2000, couple: 3000 },
  { maxIncome: 150000, single: 2200, couple: 3300 },
  { maxIncome: 200000, single: 2500, couple: 3750 },
  { maxIncome: Infinity, single: 2800, couple: 4200 },
]

/**
 * Get HEM benchmark monthly expense for a given income and buyer type.
 */
export function getHemBenchmark(yearlyIncome: number, buyerType: BuyerType): number {
  const bracket = HEM_TABLE.find(b => yearlyIncome <= b.maxIncome) ?? HEM_TABLE[HEM_TABLE.length - 1]
  return buyerType === 'single' ? bracket.single : bracket.couple
}

/**
 * Get the effective monthly expenses used in borrowing power calculations.
 * Banks use the higher of self-reported expenses or HEM benchmark.
 */
export function getEffectiveExpenses(
  selfReportedMonthly: number,
  yearlyIncome: number,
  buyerType: BuyerType,
): number {
  const hem = getHemBenchmark(yearlyIncome, buyerType)
  return Math.max(selfReportedMonthly, hem)
}
