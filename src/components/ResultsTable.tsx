import { formatCurrency, formatPercent } from '@/lib/formatters'
import type { CalculatorResults, PricePointResult } from '@/lib/types'

interface ResultsTableProps {
  results: CalculatorResults
}

function dtiColor(dti: number): string {
  if (dti <= 4.5) return 'border-l-accent'
  if (dti <= 6) return 'border-l-warning'
  return 'border-l-danger'
}

function SchemeBadges({ point }: { point: PricePointResult }) {
  const badges: React.ReactNode[] = []

  if (point.schemes.fhog.eligible && point.schemes.fhog.amount > 0) {
    badges.push(
      <span key="fhog" className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full bg-scheme-fhog/15 text-scheme-fhog">
        FHOG {formatCurrency(point.schemes.fhog.amount)}
      </span>
    )
  }
  if (point.schemes.fhds.eligible) {
    badges.push(
      <span key="fhds" className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full bg-scheme-fhds/15 text-scheme-fhds">
        FHDS
      </span>
    )
  }
  if (point.schemes.fhbConcession.eligible && point.schemes.fhbConcession.savings > 0) {
    badges.push(
      <span key="duty" className="inline-block px-2 py-0.5 text-[11px] font-semibold rounded-full bg-scheme-duty/15 text-scheme-duty">
        Duty
      </span>
    )
  }

  if (badges.length === 0) {
    return <span className="text-muted">&mdash;</span>
  }

  return <div className="flex flex-wrap gap-1">{badges}</div>
}

export function ResultsTable({ results }: ResultsTableProps) {
  if (results.maxBorrowingCapacity === 0) {
    return (
      <div className="rounded-xl bg-surface shadow-card p-8 text-center">
        <p className="text-muted text-sm">
          Adjust your income or expenses to see results.
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-xl bg-primary/5 border border-primary/10 px-5 py-4">
        <p className="text-sm text-muted">Estimated borrowing capacity</p>
        <p className="text-2xl font-bold text-primary tabular-nums">
          {formatCurrency(results.maxBorrowingCapacity)}
        </p>
      </div>

      <div className="rounded-xl bg-surface shadow-card overflow-x-auto">
        <table className="w-full min-w-[800px] text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Price</th>
              <th className="text-right px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Loan</th>
              <th className="text-right px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">LVR</th>
              <th className="text-right px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">DTI</th>
              <th className="text-right px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Monthly</th>
              <th className="text-right px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Stamp Duty</th>
              <th className="text-right px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">LMI</th>
              <th className="text-right px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Upfront</th>
              <th className="text-left px-4 py-3 font-semibold text-muted text-xs uppercase tracking-wide">Schemes</th>
            </tr>
          </thead>
          <tbody>
            {results.pricePoints.map((point) => (
              <tr
                key={point.purchasePrice}
                className={`border-b border-border/50 last:border-b-0 border-l-4 ${dtiColor(point.dti)} hover:bg-background/50 transition-colors`}
              >
                <td className="px-4 py-3 font-semibold tabular-nums">{formatCurrency(point.purchasePrice)}</td>
                <td className="text-right px-4 py-3 tabular-nums">{formatCurrency(point.loanAmount)}</td>
                <td className="text-right px-4 py-3 tabular-nums">{formatPercent(point.lvr)}</td>
                <td className="text-right px-4 py-3 tabular-nums">{point.dti.toFixed(1)}x</td>
                <td className="text-right px-4 py-3 tabular-nums">{formatCurrency(Math.round(point.monthlyRepayment))}</td>
                <td className="text-right px-4 py-3 tabular-nums">{formatCurrency(point.stampDuty.effectiveDuty)}</td>
                <td className="text-right px-4 py-3 tabular-nums">
                  {point.lmi.premium > 0
                    ? formatCurrency(point.lmi.premium)
                    : point.lmi.premium === 0
                      ? <span className="text-muted">&mdash;</span>
                      : <span className="text-danger text-xs">N/A</span>
                  }
                </td>
                <td className="text-right px-4 py-3 tabular-nums">{formatCurrency(point.upfrontCash)}</td>
                <td className="px-4 py-3"><SchemeBadges point={point} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
