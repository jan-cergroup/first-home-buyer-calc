import { describe, it, expect } from 'vitest'
import { calcStampDuty } from '@/lib/calculators/stampDuty'
import { State } from '@/lib/data/states'

describe('stampDuty', () => {
  describe('NSW', () => {
    it('calculates standard duty for $500K', () => {
      const result = calcStampDuty(500_000, State.NSW, 'existing', false)
      expect(result.effectiveDuty).toBe(17_235)
      expect(result.concession).toBe(0)
    })

    it('calculates standard duty for $800K', () => {
      const result = calcStampDuty(800_000, State.NSW, 'existing', false)
      expect(result.effectiveDuty).toBe(30_735)
    })

    it('gives full exemption for FHB at $700K', () => {
      const result = calcStampDuty(700_000, State.NSW, 'existing', true)
      expect(result.effectiveDuty).toBe(0)
      expect(result.concession).toBeGreaterThan(0)
    })

    it('gives full exemption for FHB at $800K', () => {
      const result = calcStampDuty(800_000, State.NSW, 'existing', true)
      expect(result.effectiveDuty).toBe(0)
    })

    it('gives partial concession for FHB at $900K', () => {
      const result = calcStampDuty(900_000, State.NSW, 'existing', true)
      expect(result.effectiveDuty).toBeGreaterThan(0)
      expect(result.effectiveDuty).toBeLessThan(result.duty)
    })

    it('gives no concession for FHB above $1M', () => {
      const result = calcStampDuty(1_100_000, State.NSW, 'existing', true)
      expect(result.concession).toBe(0)
      expect(result.effectiveDuty).toBe(result.duty)
    })

    it('handles zero purchase price', () => {
      const result = calcStampDuty(0, State.NSW, 'existing', true)
      expect(result.effectiveDuty).toBe(0)
    })
  })

  describe('VIC', () => {
    it('calculates PPOR duty for $500K', () => {
      const result = calcStampDuty(500_000, State.VIC, 'existing', false)
      expect(result.effectiveDuty).toBe(21_970)
    })

    it('gives full exemption for FHB at $500K', () => {
      const result = calcStampDuty(500_000, State.VIC, 'existing', true)
      expect(result.effectiveDuty).toBe(0)
    })

    it('gives full exemption for FHB at $600K', () => {
      const result = calcStampDuty(600_000, State.VIC, 'existing', true)
      expect(result.effectiveDuty).toBe(0)
    })

    it('gives partial concession for FHB between $600K-$750K', () => {
      const result = calcStampDuty(675_000, State.VIC, 'existing', true)
      expect(result.effectiveDuty).toBeGreaterThan(0)
      expect(result.effectiveDuty).toBeLessThan(result.duty)
    })

    it('gives no concession for FHB above $750K', () => {
      const result = calcStampDuty(800_000, State.VIC, 'existing', true)
      expect(result.concession).toBe(0)
    })
  })

  describe('QLD', () => {
    it('calculates home concession duty for $500K existing', () => {
      const result = calcStampDuty(500_000, State.QLD, 'existing', false)
      expect(result.effectiveDuty).toBe(8_750)
    })

    it('gives full exemption for FHB on new homes (no price cap)', () => {
      const result = calcStampDuty(1_200_000, State.QLD, 'new', true)
      expect(result.effectiveDuty).toBe(0)
    })

    it('gives FHB concession for existing homes under $505K', () => {
      const result = calcStampDuty(500_000, State.QLD, 'existing', true)
      const expectedDuty = 8_750
      expect(result.effectiveDuty).toBe(Math.max(0, expectedDuty - 8_750))
    })

    it('reduces FHB concession for existing homes above $505K', () => {
      const result = calcStampDuty(530_000, State.QLD, 'existing', true)
      expect(result.effectiveDuty).toBeGreaterThan(0)
      expect(result.concession).toBe(3_500)
    })

    it('gives no FHB concession for existing homes above $550K', () => {
      const result = calcStampDuty(600_000, State.QLD, 'existing', true)
      expect(result.concession).toBe(0)
    })
  })

  describe('WA', () => {
    it('calculates standard duty for $500K', () => {
      const result = calcStampDuty(500_000, State.WA, 'existing', false)
      expect(result.effectiveDuty).toBe(17_765)
    })

    it('gives full exemption for FHB on homes up to $430K', () => {
      const result = calcStampDuty(430_000, State.WA, 'existing', true)
      expect(result.effectiveDuty).toBe(0)
    })

    it('gives partial concession for FHB on homes $430K-$530K', () => {
      const result = calcStampDuty(480_000, State.WA, 'existing', true)
      expect(result.effectiveDuty).toBeGreaterThan(0)
      expect(result.effectiveDuty).toBeLessThan(result.duty)
    })

    it('gives full exemption for FHB on land up to $300K', () => {
      const result = calcStampDuty(300_000, State.WA, 'land', true)
      expect(result.effectiveDuty).toBe(0)
    })
  })

  describe('SA', () => {
    it('calculates standard duty for $500K', () => {
      const result = calcStampDuty(500_000, State.SA, 'existing', false)
      expect(result.effectiveDuty).toBe(21_330)
    })

    it('gives full exemption for FHB on new homes (no cap)', () => {
      const result = calcStampDuty(800_000, State.SA, 'new', true)
      expect(result.effectiveDuty).toBe(0)
    })

    it('gives no concession for FHB on existing homes', () => {
      const result = calcStampDuty(500_000, State.SA, 'existing', true)
      expect(result.concession).toBe(0)
      expect(result.effectiveDuty).toBe(result.duty)
    })
  })

  describe('TAS', () => {
    it('calculates standard duty for $500K', () => {
      const result = calcStampDuty(500_000, State.TAS, 'existing', false)
      expect(result.effectiveDuty).toBe(18_248)
    })

    it('gives full exemption for FHB up to $750K', () => {
      const result = calcStampDuty(700_000, State.TAS, 'existing', true)
      expect(result.effectiveDuty).toBe(0)
    })

    it('gives no concession for FHB above $750K', () => {
      const result = calcStampDuty(800_000, State.TAS, 'existing', true)
      expect(result.concession).toBe(0)
    })
  })

  describe('ACT', () => {
    it('calculates owner-occupier duty for $500K', () => {
      const result = calcStampDuty(500_000, State.ACT, 'existing', false)
      expect(result.effectiveDuty).toBe(9_240)
    })

    it('gives full exemption for FHB up to $1,020,000 (HBCS)', () => {
      const result = calcStampDuty(900_000, State.ACT, 'existing', true)
      expect(result.effectiveDuty).toBe(0)
    })

    it('gives no concession for FHB above $1,020,000', () => {
      const result = calcStampDuty(1_100_000, State.ACT, 'existing', true)
      expect(result.concession).toBe(0)
    })
  })

  describe('NT', () => {
    it('calculates formula-based duty for $400K', () => {
      const result = calcStampDuty(400_000, State.NT, 'existing', false)
      expect(result.effectiveDuty).toBe(10_514)
    })

    it('calculates flat rate duty for $600K', () => {
      const result = calcStampDuty(600_000, State.NT, 'existing', false)
      expect(result.effectiveDuty).toBe(32_700)
    })

    it('has no FHB concession', () => {
      const result = calcStampDuty(400_000, State.NT, 'existing', true)
      expect(result.concession).toBe(0)
      expect(result.effectiveDuty).toBe(result.duty)
    })
  })
})
