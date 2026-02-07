'use client'

import { useState, useMemo } from 'react'
import { DEFAULT_INPUTS, PRICE_POINT_INTERVAL, PRICE_POINTS_COUNT, MAX_LVR_PERCENT } from '@/lib/defaults'
import { calcMaxLoan, calcMonthlyRepayment, calcTotalRepayment, calcLvr, calcDti, calcUpfrontCash } from '@/lib/calculators/loan'
import { calcStampDuty } from '@/lib/calculators/stampDuty'
import { calcLmi } from '@/lib/calculators/lmi'
import { calcSchemes } from '@/lib/schemes'
import type { CalculatorInputs, PricePointResult, CalculatorResults } from '@/lib/types'

export function useCalculator() {
  const [state, setState] = useState(DEFAULT_INPUTS.state)
  const [propertyType, setPropertyType] = useState(DEFAULT_INPUTS.propertyType)
  const [buyerType, setBuyerType] = useState(DEFAULT_INPUTS.buyerType)
  const [region, setRegion] = useState(DEFAULT_INPUTS.region)
  const [dependents, setDependents] = useState(DEFAULT_INPUTS.dependents)
  const [annualIncome, setAnnualIncome] = useState(DEFAULT_INPUTS.annualIncome)
  const [deposit, setDeposit] = useState(DEFAULT_INPUTS.deposit)
  const [monthlyExpenses, setMonthlyExpenses] = useState(DEFAULT_INPUTS.monthlyExpenses)
  const [hecsDebt, setHecsDebt] = useState(DEFAULT_INPUTS.hecsDebt)
  const [interestRate, setInterestRate] = useState(DEFAULT_INPUTS.interestRate)
  const [loanTermYears, setLoanTermYears] = useState(DEFAULT_INPUTS.loanTermYears)
  const [isFirstHomeBuyer, setIsFirstHomeBuyer] = useState(DEFAULT_INPUTS.isFirstHomeBuyer)

  const inputs: CalculatorInputs = {
    state,
    propertyType,
    buyerType,
    region,
    dependents,
    annualIncome,
    deposit,
    monthlyExpenses,
    hecsDebt,
    interestRate,
    loanTermYears,
    isFirstHomeBuyer,
  }

  const results: CalculatorResults = useMemo(() => {
    const maxBorrowingCapacity = calcMaxLoan(
      annualIncome,
      monthlyExpenses,
      hecsDebt,
      interestRate,
      loanTermYears,
      buyerType,
      dependents
    )

    if (maxBorrowingCapacity <= 0) {
      return { maxBorrowingCapacity: 0, pricePoints: [], inputs }
    }

    const maxPrice =
      Math.ceil((maxBorrowingCapacity + deposit) / PRICE_POINT_INTERVAL) * PRICE_POINT_INTERVAL

    const pricePoints: PricePointResult[] = []

    for (let i = 0; i < PRICE_POINTS_COUNT; i++) {
      const purchasePrice = maxPrice - i * PRICE_POINT_INTERVAL
      if (purchasePrice <= 0) break

      const loanAmount = purchasePrice - deposit
      if (loanAmount <= 0) break

      const lvr = calcLvr(loanAmount, purchasePrice)
      if (lvr > MAX_LVR_PERCENT) continue

      const dti = calcDti(loanAmount, annualIncome)
      const monthlyRepayment = calcMonthlyRepayment(loanAmount, interestRate, loanTermYears)
      const totalRepayment = calcTotalRepayment(loanAmount, interestRate, loanTermYears)
      const stampDuty = calcStampDuty(purchasePrice, state, propertyType, isFirstHomeBuyer)
      const schemes = calcSchemes(state, propertyType, region, purchasePrice, isFirstHomeBuyer)
      const lmi = calcLmi(purchasePrice, lvr, schemes.fhds.eligible)
      const upfrontCash = calcUpfrontCash(
        deposit,
        stampDuty.effectiveDuty,
        lmi.premium > 0 ? lmi.premium : 0,
        schemes.fhog.amount
      )

      pricePoints.push({
        purchasePrice,
        loanAmount,
        lvr,
        dti,
        monthlyRepayment,
        totalRepayment,
        stampDuty,
        lmi,
        upfrontCash,
        schemes,
      })
    }

    return { maxBorrowingCapacity, pricePoints, inputs }
  }, [
    state, propertyType, buyerType, region, dependents,
    annualIncome, deposit, monthlyExpenses, hecsDebt,
    interestRate, loanTermYears, isFirstHomeBuyer,
  ])

  const onChange = <K extends keyof CalculatorInputs>(
    field: K,
    value: CalculatorInputs[K]
  ) => {
    const setters: Record<keyof CalculatorInputs, (v: never) => void> = {
      state: setState as (v: never) => void,
      propertyType: setPropertyType as (v: never) => void,
      buyerType: setBuyerType as (v: never) => void,
      region: setRegion as (v: never) => void,
      dependents: setDependents as (v: never) => void,
      annualIncome: setAnnualIncome as (v: never) => void,
      deposit: setDeposit as (v: never) => void,
      monthlyExpenses: setMonthlyExpenses as (v: never) => void,
      hecsDebt: setHecsDebt as (v: never) => void,
      interestRate: setInterestRate as (v: never) => void,
      loanTermYears: setLoanTermYears as (v: never) => void,
      isFirstHomeBuyer: setIsFirstHomeBuyer as (v: never) => void,
    }
    setters[field](value as never)
  }

  return { inputs, results, onChange }
}
