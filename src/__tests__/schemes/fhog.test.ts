import { describe, it, expect } from 'vitest'
import { calcFhog } from '@/lib/schemes/fhog'
import { State } from '@/lib/data/states'

describe('fhog', () => {
  it('returns $10K for NSW new home under $600K', () => {
    const result = calcFhog(State.NSW, 'new', 500_000, true)
    expect(result.eligible).toBe(true)
    expect(result.amount).toBe(10_000)
  })

  it('returns 0 for NSW existing home', () => {
    const result = calcFhog(State.NSW, 'existing', 500_000, true)
    expect(result.eligible).toBe(false)
    expect(result.amount).toBe(0)
  })

  it('returns 0 for NSW new home above $600K', () => {
    const result = calcFhog(State.NSW, 'new', 700_000, true)
    expect(result.eligible).toBe(false)
  })

  it('returns $10K for VIC new home under $750K', () => {
    const result = calcFhog(State.VIC, 'new', 700_000, true)
    expect(result.eligible).toBe(true)
    expect(result.amount).toBe(10_000)
  })

  it('returns $30K for QLD new home under $750K', () => {
    const result = calcFhog(State.QLD, 'new', 600_000, true)
    expect(result.eligible).toBe(true)
    expect(result.amount).toBe(30_000)
  })

  it('returns 0 for QLD existing home', () => {
    const result = calcFhog(State.QLD, 'existing', 500_000, true)
    expect(result.eligible).toBe(false)
  })

  it('returns $10K for WA new home under $750K', () => {
    const result = calcFhog(State.WA, 'new', 600_000, true)
    expect(result.eligible).toBe(true)
    expect(result.amount).toBe(10_000)
  })

  it('returns $15K for SA new home (no price cap)', () => {
    const result = calcFhog(State.SA, 'new', 1_000_000, true)
    expect(result.eligible).toBe(true)
    expect(result.amount).toBe(15_000)
  })

  it('returns $30K for TAS new home (no price cap)', () => {
    const result = calcFhog(State.TAS, 'new', 800_000, true)
    expect(result.eligible).toBe(true)
    expect(result.amount).toBe(30_000)
  })

  it('returns 0 for ACT (no FHOG)', () => {
    const result = calcFhog(State.ACT, 'new', 500_000, true)
    expect(result.eligible).toBe(false)
    expect(result.amount).toBe(0)
  })

  it('returns $50K for NT new home under $650K', () => {
    const result = calcFhog(State.NT, 'new', 600_000, true)
    expect(result.eligible).toBe(true)
    expect(result.amount).toBe(50_000)
  })

  it('returns $10K for NT existing home under $650K', () => {
    const result = calcFhog(State.NT, 'existing', 600_000, true)
    expect(result.eligible).toBe(true)
    expect(result.amount).toBe(10_000)
  })

  it('returns 0 for NT existing home above $650K', () => {
    const result = calcFhog(State.NT, 'existing', 700_000, true)
    expect(result.eligible).toBe(false)
  })

  it('returns 0 if not first home buyer', () => {
    const result = calcFhog(State.NSW, 'new', 500_000, false)
    expect(result.eligible).toBe(false)
  })
})
