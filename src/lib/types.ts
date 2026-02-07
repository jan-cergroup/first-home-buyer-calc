import { State } from './data/states'

export type PropertyType = 'existing' | 'new' | 'land'
export type BuyerType = 'single' | 'couple'
export type Region = 'capital' | 'regional'

export interface CalculatorInputs {
  state: State
  propertyType: PropertyType
  buyerType: BuyerType
  region: Region
  dependents: number
  annualIncome: number
  deposit: number
  monthlyExpenses: number
  hecsDebt: number
  interestRate: number
  loanTermYears: number
  isFirstHomeBuyer: boolean
}

export interface StampDutyBand {
  min: number
  max: number
  rate: number
  base: number
}

export interface StampDutyResult {
  duty: number
  concession: number
  effectiveDuty: number
}

export interface LmiResult {
  premium: number
  eligible: boolean
  reason?: string
}

export interface SchemeEligibility {
  fhog: { eligible: boolean; amount: number; reason?: string }
  fhds: { eligible: boolean; reason?: string }
  fhbConcession: { eligible: boolean; savings: number; reason?: string }
}

export interface PricePointResult {
  purchasePrice: number
  loanAmount: number
  lvr: number
  dti: number
  monthlyRepayment: number
  totalRepayment: number
  stampDuty: StampDutyResult
  lmi: LmiResult
  upfrontCash: number
  schemes: SchemeEligibility
}

export interface CalculatorResults {
  maxBorrowingCapacity: number
  pricePoints: PricePointResult[]
  inputs: CalculatorInputs
}
