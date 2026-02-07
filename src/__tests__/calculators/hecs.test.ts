import { describe, it, expect } from 'vitest'
import { calcHecsRepayment, calcMonthlyHecsRepayment } from '@/lib/calculators/hecs'

describe('hecs', () => {
  it('returns 0 when no HECS debt', () => {
    expect(calcHecsRepayment(85_000, 0)).toBe(0)
  })

  it('returns 0 when income is 0', () => {
    expect(calcHecsRepayment(0, 30_000)).toBe(0)
  })

  it('returns 0 when income below threshold ($54,435)', () => {
    expect(calcHecsRepayment(50_000, 30_000)).toBe(0)
  })

  it('calculates 1% for income $60,000 (band: $54,435-$62,850)', () => {
    const result = calcHecsRepayment(60_000, 30_000)
    expect(result).toBe(600) // 60000 * 0.01
  })

  it('calculates 4.5% for income $85,000 (band: $84,107-$89,154)', () => {
    const result = calcHecsRepayment(85_000, 30_000)
    expect(result).toBe(3_825) // 85000 * 0.045
  })

  it('calculates 5% for income $90,000 (band: $89,154-$94,503)', () => {
    const result = calcHecsRepayment(90_000, 30_000)
    expect(result).toBe(4_500) // 90000 * 0.05
  })

  it('calculates 10% for income $200,000 (highest band)', () => {
    const result = calcHecsRepayment(200_000, 50_000)
    expect(result).toBe(20_000) // 200000 * 0.10
  })

  it('caps repayment at outstanding debt amount', () => {
    // Income $200K -> 10% = $20K, but only $5K debt remaining
    const result = calcHecsRepayment(200_000, 5_000)
    expect(result).toBe(5_000)
  })

  it('calculates monthly HECS repayment', () => {
    const monthly = calcMonthlyHecsRepayment(85_000, 30_000)
    expect(monthly).toBeCloseTo(3_825 / 12)
  })
})
