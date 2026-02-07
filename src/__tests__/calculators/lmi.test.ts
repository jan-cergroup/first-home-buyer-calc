import { describe, it, expect } from 'vitest'
import { calcLmi } from '@/lib/calculators/lmi'

describe('lmi', () => {
  it('returns 0 premium when LVR <= 80%', () => {
    const result = calcLmi(500_000, 80)
    expect(result.premium).toBe(0)
    expect(result.eligible).toBe(true)
  })

  it('returns 0 premium when LVR is 50%', () => {
    const result = calcLmi(500_000, 50)
    expect(result.premium).toBe(0)
  })

  it('returns 0 premium when FHDS eligible', () => {
    const result = calcLmi(500_000, 95, true)
    expect(result.premium).toBe(0)
    expect(result.reason).toContain('First Home Guarantee')
  })

  it('returns -1 when LVR > 95%', () => {
    const result = calcLmi(500_000, 96)
    expect(result.premium).toBe(-1)
    expect(result.eligible).toBe(false)
  })

  it('returns -1 when price > $1M', () => {
    const result = calcLmi(1_200_000, 85)
    expect(result.premium).toBe(-1)
    expect(result.eligible).toBe(false)
  })

  it('calculates LMI for $500K at 85% LVR', () => {
    const result = calcLmi(500_000, 85)
    expect(result.premium).toBe(4_845)
    expect(result.eligible).toBe(true)
  })

  it('calculates LMI for $300K at 90% LVR', () => {
    const result = calcLmi(300_000, 90)
    expect(result.premium).toBe(4_389)
  })

  it('calculates LMI for $750K at 95% LVR', () => {
    const result = calcLmi(750_000, 95)
    expect(result.premium).toBe(34_598)
  })

  it('calculates LMI for $600K at 81% LVR', () => {
    const result = calcLmi(600_000, 81)
    expect(result.premium).toBe(5_424)
  })

  it('rounds up LVR for lookup (e.g. 84.5 -> 85)', () => {
    const result = calcLmi(500_000, 84.5)
    expect(result.premium).toBe(4_845)
  })

  it('handles price at exact bucket boundary ($300K)', () => {
    const result = calcLmi(300_000, 85)
    expect(result.premium).toBe(2_181)
  })

  it('handles price between buckets ($400K uses $500K bucket)', () => {
    const result = calcLmi(400_000, 85)
    expect(result.premium).toBe(3_876)
  })
})
