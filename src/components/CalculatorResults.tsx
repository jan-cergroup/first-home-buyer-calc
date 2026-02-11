import type { EnhancedCalculatorResults, StateFormConfig, FormState } from '../types'
import { useState } from 'react'
import { formatCurrency, formatPercentage } from '../utils/format'

interface CalculatorResultsProps {
  results: EnhancedCalculatorResults
  stateConfig: StateFormConfig
  formState: FormState
}

function SchemeStatusIcon({ eligible }: { eligible: boolean }) {
  if (eligible) {
    return (
      <svg className="w-5 h-5 text-accent shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
      </svg>
    )
  }
  return (
    <svg className="w-5 h-5 text-gray-300 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  )
}


export function CalculatorResults({ results, stateConfig, formState }: CalculatorResultsProps) {
  const [showAssumptions, setShowAssumptions] = useState(false)

  const loanAmount = results.loan.loanAmount

  return (
    <div className="space-y-4">
      {/* Hero Card */}
      <div className="bg-navy rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 lg:p-8">
          <p className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-5">
            Your First Home Estimate
          </p>

          <p className="text-sm text-white/60 mb-1">Your monthly repayment</p>
          <p className="text-4xl lg:text-5xl font-bold text-white">
            {formatCurrency(results.loan.monthlyRepayment)}
            <span className="text-xl font-normal text-white/40 ml-1">/mo</span>
          </p>
          <p className="text-sm text-white/40 mt-2">{formState.loanTerm}yr @ {formatPercentage(formState.interestRate)}</p>

          <div className="border-t border-white/10 my-5" />

          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-white/50 mb-1">Total upfront</p>
              <p className="text-xl font-bold text-white">{formatCurrency(results.upfrontCosts.total)}</p>
            </div>
            <div>
              <p className="text-sm text-white/50 mb-1">Loan amount</p>
              <p className="text-xl font-bold text-white">{formatCurrency(loanAmount)}</p>
            </div>
          </div>

          <div className="flex items-center gap-2 mt-4">
            <span className="text-xs font-medium text-white/70 bg-white/10 rounded-full px-3 py-1">
              LVR {formatPercentage(results.loan.lvr)}
            </span>
            <HeroBadgeLmi lmiEstimate={results.loan.lmiEstimate} fhdsEligible={results.fhds.eligible} />
          </div>
        </div>
      </div>

      {/* Borrowing power warning */}
      {results.borrowingPower.estimatedMax < results.loan.loanAmount && results.loan.loanAmount > 0 && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3">
          <p className="text-sm text-amber-800">
            Estimated max borrowing: <strong>{formatCurrency(results.borrowingPower.estimatedMax)}</strong>
            <span className="text-xs ml-1">(at {formatPercentage(results.borrowingPower.assessmentRate)})</span>
          </p>
        </div>
      )}

      {/* Detail Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="p-6 lg:p-8">
        {/* Government Schemes */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Government Schemes</p>
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <SchemeStatusIcon eligible={results.fhds.eligible} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">First Home Guarantee (FHDS)</p>
                <p className="text-xs text-gray-500 mt-0.5">{results.fhds.reason}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <SchemeStatusIcon eligible={results.stampDutyConcession.status !== 'fullRate'} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  Stamp Duty {results.stampDutyConcession.status === 'exempt' ? 'Exemption' : results.stampDutyConcession.status === 'concession' ? 'Concession' : '— Full Rate'}
                  {results.stampDutyConcession.savings > 0 && (
                    <span className="text-accent ml-1.5">saving {formatCurrency(results.stampDutyConcession.savings)}</span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{results.stampDutyConcession.description}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <SchemeStatusIcon eligible={results.concessions.eligible} />
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-900">
                  First Home Owners Grant
                  {results.concessions.eligible && results.concessions.grantAmount > 0 && (
                    <span className="text-accent ml-1.5">{formatCurrency(results.concessions.grantAmount)}</span>
                  )}
                </p>
                <p className="text-xs text-gray-500 mt-0.5">{results.concessions.message}</p>
              </div>
            </div>
          </div>
        </div>

        <hr className="border-gray-100 my-6" />

        {/* Upfront Costs */}
        <div className="mb-6">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Upfront Costs</p>
          <div className="space-y-2.5">
            <CostRow label="Deposit" value={results.upfrontCosts.deposit} />
            <CostRow label="Stamp duty" value={results.upfrontCosts.stampDuty} />
            {results.upfrontCosts.lmi > 0 && <CostRow label="Lenders Mortgage Insurance" value={results.upfrontCosts.lmi} />}
            <CostRow label="Mortgage registration" value={results.upfrontCosts.mortgageReg} />
            <CostRow label="Land transfer fee" value={results.upfrontCosts.landTransfer} />
            <CostRow label="Transaction fees" value={results.upfrontCosts.transactionFees} />
            {stateConfig.showForeignSurcharge && results.upfrontCosts.foreignSurcharge > 0 && (
              <CostRow label="Foreign surcharge" value={results.upfrontCosts.foreignSurcharge} />
            )}
            {results.upfrontCosts.fhogOffset > 0 && (
              <CostRow label="FHOG offset" value={-results.upfrontCosts.fhogOffset} isOffset />
            )}
            <div className="flex justify-between items-center pt-3 border-t border-gray-200">
              <span className="text-sm font-bold text-gray-900">Total upfront</span>
              <span className="text-sm font-bold text-gray-900">{formatCurrency(results.upfrontCosts.total)}</span>
            </div>
          </div>
        </div>

        {/* Loan Summary */}
        {loanAmount > 0 && (
          <>
            <hr className="border-gray-100 my-6" />
            <div>
              <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-4">Loan Summary</p>
              <div className="space-y-2.5">
                <CostRow label="Monthly repayment" value={results.loan.monthlyRepayment} />
                <CostRow label={`Total over ${formState.loanTerm} years`} value={results.loan.totalRepayment} />
                <CostRow label="Total interest" value={results.loan.totalInterest} />
              </div>
            </div>
          </>
        )}

        {/* Disclaimer */}
        <p className="mt-8 text-xs text-gray-400 leading-relaxed">
          You may be eligible for the Federal Government First Home Owner Scheme (FHOS).
          Contact Housing Australia for information. For stamp duty concessions, contact your state Revenue Office.{' '}
          <button
            onClick={() => setShowAssumptions(true)}
            className="text-accent underline cursor-pointer"
          >
            Calculator assumptions*
          </button>
        </p>
      </div>
      </div>

      {/* Assumptions modal */}
      {showAssumptions && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-8 max-w-lg w-full relative shadow-lg">
            <button
              onClick={() => setShowAssumptions(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-2xl cursor-pointer"
            >
              &times;
            </button>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Calculator Assumptions</h3>
            <div className="text-sm text-gray-600 leading-relaxed space-y-3">
              <p>
                The results from this calculator should be used as an indication only. It is
                provided for illustrative purposes only, based on the information provided.
              </p>
              <p>
                Stamp duty rates, FHOG amounts, and scheme eligibility are subject to change.
                LMI estimates are approximate and actual premiums may vary by lender.
              </p>
              <p>
                Borrowing power is estimated using a simplified assessment. Actual borrowing
                capacity will depend on your lender&apos;s specific criteria, credit history,
                and other financial commitments.
              </p>
              <p>
                FHDS (First Home Guarantee) eligibility shown is indicative only. Places are
                limited and subject to availability.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function HeroBadgeLmi({ lmiEstimate, fhdsEligible }: { lmiEstimate: number; fhdsEligible: boolean }) {
  if (fhdsEligible) {
    return <span className="text-xs font-medium text-accent-light bg-accent/20 rounded-full px-3 py-1">LMI waived</span>
  }
  if (lmiEstimate === 0) {
    return <span className="text-xs font-medium text-accent-light bg-accent/20 rounded-full px-3 py-1">No LMI</span>
  }
  if (lmiEstimate === -1) {
    return <span className="text-xs font-medium text-amber-300 bg-amber-500/20 rounded-full px-3 py-1">LMI — contact lender</span>
  }
  return <span className="text-xs font-medium text-amber-300 bg-amber-500/20 rounded-full px-3 py-1">LMI ~{formatCurrency(lmiEstimate)}</span>
}

function CostRow({ label, value, isOffset }: { label: string; value: number; isOffset?: boolean }) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={`text-sm font-semibold ${isOffset ? 'text-accent' : 'text-gray-900'}`}>
        {isOffset ? `- ${formatCurrency(Math.abs(value))}` : formatCurrency(value)}
      </span>
    </div>
  )
}
