/**
 * P&I (Principal & Interest) monthly repayment calculation.
 * Standard amortization formula.
 */
export function calcMonthlyRepayment(principal: number, loanTermYears: number, annualRate: number): number {
  if (principal <= 0) return 0
  if (annualRate <= 0) return principal / (loanTermYears * 12)

  const monthlyRate = annualRate / 100 / 12
  const numPayments = loanTermYears * 12
  const repayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numPayments)) /
    (Math.pow(1 + monthlyRate, numPayments) - 1)

  return Math.round(repayment * 100) / 100
}

/**
 * Loan-to-Value Ratio as a percentage.
 */
export function calcLVR(purchasePrice: number, deposit: number): number {
  if (purchasePrice <= 0) return 0
  const loanAmount = purchasePrice - deposit
  if (loanAmount <= 0) return 0
  return (loanAmount / purchasePrice) * 100
}

/**
 * Estimate maximum borrowing capacity.
 * Uses a simplified DTI (debt-to-income) approach:
 * - Assessment rate = interest rate + 3% buffer
 * - Maximum 60% of gross monthly income goes to all debt repayments
 * - Subtracts existing commitments (expenses, HECS)
 */
export function calcMaxLoan(
  monthlyGrossIncome: number,
  monthlyExpenses: number,
  monthlyHecs: number,
  interestRate: number,
  loanTermYears: number,
): number {
  const assessmentRate = interestRate + 3
  const maxDebtService = monthlyGrossIncome * 0.6
  const availableForLoan = maxDebtService - monthlyExpenses - monthlyHecs
  if (availableForLoan <= 0) return 0

  const monthlyRate = assessmentRate / 100 / 12
  const numPayments = loanTermYears * 12

  if (monthlyRate <= 0) return availableForLoan * numPayments

  // Reverse the amortization formula to solve for principal
  const maxPrincipal = availableForLoan *
    (Math.pow(1 + monthlyRate, numPayments) - 1) /
    (monthlyRate * Math.pow(1 + monthlyRate, numPayments))

  return Math.max(0, Math.round(maxPrincipal))
}
