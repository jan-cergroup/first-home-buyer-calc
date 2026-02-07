import { describe, it, expect } from 'vitest'
import { calcFhds } from '@/lib/schemes/fhds'
import { State } from '@/lib/data/states'

describe('fhds', () => {
  it('is eligible for NSW capital under cap ($900K)', () => {
    const result = calcFhds(State.NSW, 'capital', 800_000, true)
    expect(result.eligible).toBe(true)
  })

  it('is not eligible for NSW capital above cap', () => {
    const result = calcFhds(State.NSW, 'capital', 950_000, true)
    expect(result.eligible).toBe(false)
  })

  it('is eligible for NSW regional under cap ($750K)', () => {
    const result = calcFhds(State.NSW, 'regional', 700_000, true)
    expect(result.eligible).toBe(true)
  })

  it('is not eligible for NSW regional above cap', () => {
    const result = calcFhds(State.NSW, 'regional', 800_000, true)
    expect(result.eligible).toBe(false)
  })

  it('is eligible for VIC capital under cap ($800K)', () => {
    const result = calcFhds(State.VIC, 'capital', 750_000, true)
    expect(result.eligible).toBe(true)
  })

  it('is eligible for QLD capital under cap ($700K)', () => {
    const result = calcFhds(State.QLD, 'capital', 650_000, true)
    expect(result.eligible).toBe(true)
  })

  it('is eligible for WA capital under cap ($600K)', () => {
    const result = calcFhds(State.WA, 'capital', 550_000, true)
    expect(result.eligible).toBe(true)
  })

  it('is eligible for ACT capital under cap ($750K)', () => {
    const result = calcFhds(State.ACT, 'capital', 700_000, true)
    expect(result.eligible).toBe(true)
  })

  it('is not eligible if not first home buyer', () => {
    const result = calcFhds(State.NSW, 'capital', 500_000, false)
    expect(result.eligible).toBe(false)
  })

  it('checks all states have reasonable caps', () => {
    const states = Object.values(State)
    for (const state of states) {
      const result = calcFhds(state, 'capital', 100_000, true)
      expect(result.eligible).toBe(true)
    }
  })
})
