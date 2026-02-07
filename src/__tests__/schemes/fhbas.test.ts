import { describe, it, expect } from 'vitest'
import { calcFhbas } from '@/lib/schemes/fhbas'
import { State } from '@/lib/data/states'

describe('fhbas', () => {
  describe('NSW', () => {
    it('gives full exemption under $800K', () => {
      const result = calcFhbas(State.NSW, 'existing', 700_000, true)
      expect(result.eligible).toBe(true)
      expect(result.savings).toBeGreaterThan(0)
    })

    it('gives partial concession $800K-$1M', () => {
      const result = calcFhbas(State.NSW, 'existing', 900_000, true)
      expect(result.eligible).toBe(true)
      expect(result.savings).toBeGreaterThan(0)
    })

    it('gives no concession above $1M', () => {
      const result = calcFhbas(State.NSW, 'existing', 1_100_000, true)
      expect(result.eligible).toBe(false)
      expect(result.savings).toBe(0)
    })
  })

  describe('VIC', () => {
    it('gives full exemption under $600K', () => {
      const result = calcFhbas(State.VIC, 'existing', 500_000, true)
      expect(result.eligible).toBe(true)
      expect(result.savings).toBeGreaterThan(0)
    })

    it('gives no concession above $750K', () => {
      const result = calcFhbas(State.VIC, 'existing', 800_000, true)
      expect(result.eligible).toBe(false)
    })
  })

  describe('QLD', () => {
    it('gives full exemption for new homes (no price cap)', () => {
      const result = calcFhbas(State.QLD, 'new', 1_000_000, true)
      expect(result.eligible).toBe(true)
      expect(result.savings).toBeGreaterThan(0)
    })

    it('gives concession for existing homes under $505K', () => {
      const result = calcFhbas(State.QLD, 'existing', 400_000, true)
      expect(result.eligible).toBe(true)
      expect(result.savings).toBeGreaterThan(0)
    })
  })

  describe('SA', () => {
    it('gives full exemption for new homes', () => {
      const result = calcFhbas(State.SA, 'new', 600_000, true)
      expect(result.eligible).toBe(true)
      expect(result.savings).toBeGreaterThan(0)
    })

    it('gives no concession for existing homes', () => {
      const result = calcFhbas(State.SA, 'existing', 500_000, true)
      expect(result.eligible).toBe(false)
    })
  })

  describe('TAS', () => {
    it('gives full exemption under $750K', () => {
      const result = calcFhbas(State.TAS, 'existing', 600_000, true)
      expect(result.eligible).toBe(true)
      expect(result.savings).toBeGreaterThan(0)
    })
  })

  describe('ACT', () => {
    it('gives full exemption under $1,020,000 (HBCS)', () => {
      const result = calcFhbas(State.ACT, 'existing', 900_000, true)
      expect(result.eligible).toBe(true)
      expect(result.savings).toBeGreaterThan(0)
    })
  })

  describe('NT', () => {
    it('has no FHB stamp duty concession', () => {
      const result = calcFhbas(State.NT, 'existing', 400_000, true)
      expect(result.eligible).toBe(false)
    })
  })

  it('returns 0 if not first home buyer', () => {
    const result = calcFhbas(State.NSW, 'existing', 500_000, false)
    expect(result.eligible).toBe(false)
    expect(result.savings).toBe(0)
  })
})
