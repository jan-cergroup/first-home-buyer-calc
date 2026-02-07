import { State } from './data/states'
import type { CalculatorInputs } from './types'

export const DEFAULT_INPUTS: CalculatorInputs = {
  state: State.NSW,
  propertyType: 'existing',
  buyerType: 'single',
  region: 'capital',
  dependents: 0,
  annualIncome: 85000,
  deposit: 50000,
  monthlyExpenses: 2000,
  hecsDebt: 0,
  interestRate: 6.2,
  loanTermYears: 30,
  isFirstHomeBuyer: true,
}

export const PRICE_POINT_INTERVAL = 25000
export const PRICE_POINTS_COUNT = 15
export const SERVICEABILITY_BUFFER = 3.0
export const MAX_DTI = 6
export const MAX_LVR_PERCENT = 95
