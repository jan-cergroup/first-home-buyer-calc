/**
 * LMI (Lenders Mortgage Insurance) estimation.
 *
 * Uses a lookup table based on LVR bands and loan amount buckets.
 * Rates are approximate percentages of the loan amount, based on
 * typical Genworth/QBE LMI premium schedules.
 *
 * Returns:
 *   0   — no LMI required (LVR <= 80%)
 *  -1   — unknown / not available (LVR > 95% or loan > $1M)
 *  >0   — estimated LMI premium in dollars
 */

// LMI rate as % of loan amount, indexed by [lvrBand][priceBucket]
// LVR bands: 80.01-85, 85.01-90, 90.01-95
// Price buckets: up to $300k, $500k, $600k, $750k, $1M
const LMI_RATES: number[][] = [
  // LVR 80.01–85%
  [0.61, 0.82, 0.94, 1.05, 1.25],
  // LVR 85.01–90%
  [1.25, 1.78, 2.01, 2.30, 2.65],
  // LVR 90.01–95%
  [2.10, 2.90, 3.20, 3.50, 4.00],
]

function getLvrBandIndex(lvr: number): number {
  if (lvr <= 85) return 0
  if (lvr <= 90) return 1
  return 2 // 90.01–95
}

function getPriceBucketIndex(propertyValue: number): number {
  if (propertyValue <= 300000) return 0
  if (propertyValue <= 500000) return 1
  if (propertyValue <= 600000) return 2
  if (propertyValue <= 750000) return 3
  return 4 // up to $1M
}

export function calcLMI(propertyValue: number, loanAmount: number, lvr: number): number {
  if (lvr <= 80) return 0
  if (lvr > 95) return -1
  if (propertyValue > 1000000) return -1
  if (loanAmount <= 0) return 0

  const lvrIndex = getLvrBandIndex(lvr)
  const priceIndex = getPriceBucketIndex(propertyValue)
  const rate = LMI_RATES[lvrIndex][priceIndex]

  return Math.round(loanAmount * rate / 100)
}
