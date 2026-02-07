import { describe, it, expect } from 'vitest'
import {
  calcMonthlyRepayment,
  calcTotalRepayment,
  calcLvr,
  calcDti,
  calcMaxLoan,
  calcUpfrontCash,
} from '@/lib/calculators/loan'

describe('loan', () => {
  describe('calcMonthlyRepayment', () => {
    it('calculates standard mortgage repayment', () => {
      const monthly = calcMonthlyRepayment(500_000, 6.0, 30)
      expect(monthly).toBeCloseTo(2997.75, 0)
    })

    it('returns 0 for zero principal', () => {
      expect(calcMonthlyRepayment(0, 6.0, 30)).toBe(0)
    })

    it('handles 0% interest rate', () => {
      const monthly = calcMonthlyRepayment(360_000, 0, 30)
      expect(monthly).toBe(1_000)
    })

    it('calculates for 25 year term', () => {
      const monthly = calcMonthlyRepayment(400_000, 6.2, 25)
      const monthly30 = calcMonthlyRepayment(400_000, 6.2, 30)
      expect(monthly).toBeGreaterThan(monthly30)
    })

    it('matches known values for $400K at 6.2% over 30yr', () => {
      const monthly = calcMonthlyRepayment(400_000, 6.2, 30)
      expect(monthly).toBeCloseTo(2450, -2)
    })
  })

  describe('calcTotalRepayment', () => {
    it('calculates total over loan life', () => {
      const total = calcTotalRepayment(500_000, 6.0, 30)
      expect(total).toBeCloseTo(1_079_190, -3)
    })
  })

  describe('calcLvr', () => {
    it('calculates 80% LVR', () => {
      expect(calcLvr(400_000, 500_000)).toBe(80)
    })

    it('calculates 95% LVR', () => {
      expect(calcLvr(475_000, 500_000)).toBe(95)
    })

    it('returns 0 for zero purchase price', () => {
      expect(calcLvr(400_000, 0)).toBe(0)
    })
  })

  describe('calcDti', () => {
    it('calculates DTI ratio', () => {
      expect(calcDti(500_000, 100_000)).toBe(5.0)
    })

    it('returns Infinity for zero income', () => {
      expect(calcDti(500_000, 0)).toBe(Infinity)
    })

    it('calculates DTI of 6 at the limit', () => {
      expect(calcDti(600_000, 100_000)).toBe(6.0)
    })
  })

  describe('calcMaxLoan', () => {
    it('calculates positive max loan for typical inputs', () => {
      const max = calcMaxLoan(85_000, 2_000, 0, 6.2, 30, 'single', 0)
      expect(max).toBeGreaterThan(0)
      expect(max).toBeLessThan(1_000_000)
    })

    it('returns 0 for zero income', () => {
      expect(calcMaxLoan(0, 2_000, 0, 6.2, 30, 'single', 0)).toBe(0)
    })

    it('reduces max loan when HECS debt exists', () => {
      const withoutHecs = calcMaxLoan(120_000, 5_000, 0, 6.2, 30, 'single', 0)
      const withHecs = calcMaxLoan(120_000, 5_000, 50_000, 6.2, 30, 'single', 0)
      expect(withHecs).toBeLessThan(withoutHecs)
    })

    it('reduces max loan for higher expenses', () => {
      const low = calcMaxLoan(85_000, 1_500, 0, 6.2, 30, 'single', 0)
      const high = calcMaxLoan(85_000, 3_000, 0, 6.2, 30, 'single', 0)
      expect(high).toBeLessThan(low)
    })

    it('reduces max loan for higher interest rates', () => {
      const lowRate = calcMaxLoan(120_000, 6_000, 0, 5.0, 30, 'single', 0)
      const highRate = calcMaxLoan(120_000, 6_000, 0, 7.0, 30, 'single', 0)
      expect(highRate).toBeLessThan(lowRate)
    })

    it('respects DTI cap', () => {
      const max = calcMaxLoan(500_000, 2_000, 0, 6.2, 30, 'single', 0)
      expect(max).toBeLessThanOrEqual(3_000_000)
    })

    it('uses HEM floor when declared expenses are too low', () => {
      const lowExpenses = calcMaxLoan(85_000, 500, 0, 6.2, 30, 'single', 0)
      const hemExpenses = calcMaxLoan(85_000, 1_400, 0, 6.2, 30, 'single', 0)
      expect(lowExpenses).toBe(hemExpenses)
    })

    it('adjusts for couple vs single', () => {
      const single = calcMaxLoan(60_000, 1_000, 0, 6.2, 30, 'single', 0)
      const couple = calcMaxLoan(60_000, 1_000, 0, 6.2, 30, 'couple', 0)
      expect(couple).toBeLessThan(single)
    })

    it('adjusts for dependents', () => {
      const noDeps = calcMaxLoan(60_000, 1_000, 0, 6.2, 30, 'single', 0)
      const twoDeps = calcMaxLoan(60_000, 1_000, 0, 6.2, 30, 'single', 2)
      expect(twoDeps).toBeLessThan(noDeps)
    })
  })

  describe('calcUpfrontCash', () => {
    it('calculates total upfront costs', () => {
      const result = calcUpfrontCash(100_000, 20_000, 5_000, 0)
      expect(result).toBe(125_000)
    })

    it('subtracts FHOG from upfront costs', () => {
      const result = calcUpfrontCash(100_000, 20_000, 5_000, 10_000)
      expect(result).toBe(115_000)
    })

    it('ignores negative LMI (ineligible)', () => {
      const result = calcUpfrontCash(100_000, 20_000, -1, 0)
      expect(result).toBe(120_000)
    })
  })
})
