import { Card } from './ui/Card'
import { Select } from './ui/Select'
import { Slider } from './ui/Slider'
import { ALL_STATES, STATE_LABELS } from '@/lib/data/states'
import { formatCurrency, formatPercent } from '@/lib/formatters'
import type { CalculatorInputs } from '@/lib/types'

interface InputFormProps {
  inputs: CalculatorInputs
  onChange: <K extends keyof CalculatorInputs>(field: K, value: CalculatorInputs[K]) => void
}

const STATE_OPTIONS = ALL_STATES.map((s) => ({ value: s, label: STATE_LABELS[s] }))
const PROPERTY_TYPE_OPTIONS = [
  { value: 'existing', label: 'Existing Home' },
  { value: 'new', label: 'New Home' },
  { value: 'land', label: 'Vacant Land' },
]
const BUYER_TYPE_OPTIONS = [
  { value: 'single', label: 'Single' },
  { value: 'couple', label: 'Couple' },
]
const REGION_OPTIONS = [
  { value: 'capital', label: 'Capital City' },
  { value: 'regional', label: 'Regional' },
]
const DEPENDENTS_OPTIONS = Array.from({ length: 7 }, (_, i) => ({
  value: String(i),
  label: i === 0 ? 'None' : String(i),
}))
const LOAN_TERM_OPTIONS = [
  { value: '25', label: '25 years' },
  { value: '30', label: '30 years' },
]

export function InputForm({ inputs, onChange }: InputFormProps) {
  return (
    <div className="flex flex-col gap-4">
      <Card title="Your Details">
        <div className="flex flex-col gap-3">
          <Select
            label="State"
            value={inputs.state}
            options={STATE_OPTIONS}
            onChange={(v) => onChange('state', v as CalculatorInputs['state'])}
          />
          <Select
            label="Property Type"
            value={inputs.propertyType}
            options={PROPERTY_TYPE_OPTIONS}
            onChange={(v) => onChange('propertyType', v as CalculatorInputs['propertyType'])}
          />
          <Select
            label="Buyer Type"
            value={inputs.buyerType}
            options={BUYER_TYPE_OPTIONS}
            onChange={(v) => onChange('buyerType', v as CalculatorInputs['buyerType'])}
          />
          <Select
            label="Region"
            value={inputs.region}
            options={REGION_OPTIONS}
            onChange={(v) => onChange('region', v as CalculatorInputs['region'])}
          />
          <Select
            label="Dependents"
            value={String(inputs.dependents)}
            options={DEPENDENTS_OPTIONS}
            onChange={(v) => onChange('dependents', Number(v))}
          />
        </div>
      </Card>

      <Card title="Finances">
        <div className="flex flex-col">
          <Slider
            label="Annual Income"
            value={inputs.annualIncome}
            min={0}
            max={500000}
            step={5000}
            formatValue={(v) => formatCurrency(v)}
            onChange={(v) => onChange('annualIncome', v)}
            tooltip="Combined gross annual income before tax"
          />
          <Slider
            label="Deposit"
            value={inputs.deposit}
            min={0}
            max={500000}
            step={5000}
            formatValue={(v) => formatCurrency(v)}
            onChange={(v) => onChange('deposit', v)}
            tooltip="Total savings available for the deposit"
          />
          <Slider
            label="Monthly Expenses"
            value={inputs.monthlyExpenses}
            min={0}
            max={10000}
            step={100}
            formatValue={(v) => formatCurrency(v)}
            onChange={(v) => onChange('monthlyExpenses', v)}
            tooltip="Ongoing monthly living expenses (excl. rent)"
          />
          <Slider
            label="HECS/HELP Debt"
            value={inputs.hecsDebt}
            min={0}
            max={150000}
            step={1000}
            formatValue={(v) => formatCurrency(v)}
            onChange={(v) => onChange('hecsDebt', v)}
            tooltip="Outstanding HECS/HELP student loan balance"
          />
        </div>
      </Card>

      <Card title="Loan Settings">
        <div className="flex flex-col">
          <Slider
            label="Interest Rate"
            value={inputs.interestRate}
            min={2}
            max={12}
            step={0.1}
            formatValue={(v) => formatPercent(v)}
            onChange={(v) => onChange('interestRate', v)}
          />
          <div className="py-3">
            <Select
              label="Loan Term"
              value={String(inputs.loanTermYears)}
              options={LOAN_TERM_OPTIONS}
              onChange={(v) => onChange('loanTermYears', Number(v))}
            />
          </div>
          <label className="flex items-center gap-3 py-3 cursor-pointer">
            <input
              type="checkbox"
              checked={inputs.isFirstHomeBuyer}
              onChange={(e) => onChange('isFirstHomeBuyer', e.target.checked)}
              className="w-5 h-5 rounded border-border text-primary focus:ring-primary/20 cursor-pointer"
            />
            <span className="text-sm font-medium text-foreground">First Home Buyer</span>
          </label>
        </div>
      </Card>
    </div>
  )
}
