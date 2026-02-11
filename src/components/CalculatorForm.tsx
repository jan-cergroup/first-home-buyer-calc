import type { FormState, PropertyPurpose, AustralianState, PropertyType, ChildrenCount, BuyerType, LoanTerm } from '../types'
import { STATE_FORM_CONFIG, STATE_LOCATION_LABELS, AUSTRALIAN_STATES } from '../types'
import { SelectInput } from './SelectInput'
import { CheckboxInput } from './CheckboxInput'
import { CurrencyInput } from './CurrencyInput'
import { NumberInput } from './NumberInput'
import { CollapsibleSection } from './CollapsibleSection'

interface CalculatorFormProps {
  formState: FormState
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void
}

export function CalculatorForm({ formState, updateField }: CalculatorFormProps) {
  const config = STATE_FORM_CONFIG[formState.state]
  const locationLabels = STATE_LOCATION_LABELS[formState.state]

  return (
    <div className="space-y-10">
      {/* Property Details */}
      <div>
        <h3 className="text-xl text-gray-900">Property Details</h3>
        <div className="w-8 h-0.5 bg-accent mt-2 mb-6" />

        <div className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <SelectInput
              label="State"
              value={formState.state}
              options={AUSTRALIAN_STATES.map((s) => ({ value: s.value, label: s.label }))}
              onChange={(v) => updateField('state', v as AustralianState)}
            />
            <SelectInput
              label="Location"
              value={formState.isMetro ? 'metro' : 'regional'}
              options={[
                { value: 'metro', label: locationLabels.metro },
                { value: 'regional', label: locationLabels.regional },
              ]}
              onChange={(v) => updateField('isMetro', v === 'metro')}
            />
          </div>

          <CurrencyInput
            label="Property value"
            value={formState.propertyValue}
            onChange={(v) => updateField('propertyValue', v)}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
            <SelectInput
              label="Property purpose"
              value={formState.propertyPurpose}
              options={[
                { value: 'home', label: 'Home' },
                { value: 'investment', label: 'Investment' },
              ]}
              onChange={(v) => updateField('propertyPurpose', v as PropertyPurpose)}
            />
            <SelectInput
              label="Property type"
              value={formState.propertyType}
              options={[
                { value: 'established', label: 'Established home' },
                { value: 'newlyConstructed', label: 'Newly constructed' },
                { value: 'vacantLand', label: 'Vacant land' },
              ]}
              onChange={(v) => updateField('propertyType', v as PropertyType)}
            />
          </div>
        </div>
      </div>

      {/* About You */}
      <div>
        <h3 className="text-xl text-gray-900">About You</h3>
        <div className="w-8 h-0.5 bg-accent mt-2 mb-6" />

        <div className="space-y-5">
          <SelectInput
            label="Buyer type"
            value={formState.buyerType}
            options={[
              { value: 'single', label: 'Single' },
              { value: 'couple', label: 'Couple' },
            ]}
            onChange={(v) => updateField('buyerType', v as BuyerType)}
          />

          <div className="space-y-3 pt-1">
            <CheckboxInput
              label="I am a first home buyer"
              checked={formState.isFirstHomeBuyer}
              onChange={(v) => updateField('isFirstHomeBuyer', v)}
            />

            {config.showForeignPurchaser && (
              <CheckboxInput
                label="I am a foreign purchaser"
                checked={formState.isForeignPurchaser}
                onChange={(v) => updateField('isForeignPurchaser', v)}
              />
            )}

            {config.showPensioner && (
              <CheckboxInput
                label="I am an eligible pensioner"
                checked={formState.isEligiblePensioner}
                onChange={(v) => updateField('isEligiblePensioner', v)}
              />
            )}
          </div>

          {config.showNumberOfChildren && (
            <SelectInput
              label="Number of children"
              value={String(formState.childrenCount)}
              options={[
                { value: '0', label: '0' },
                { value: '1', label: '1' },
                { value: '2', label: '2' },
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5+' },
              ]}
              onChange={(v) => updateField('childrenCount', parseInt(v) as ChildrenCount)}
            />
          )}
        </div>
      </div>

      {/* Your Finances */}
      <CollapsibleSection title="Your Finances" defaultOpen>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <CurrencyInput
            label="Deposit savings"
            value={formState.depositSavings}
            onChange={(v) => updateField('depositSavings', v)}
          />
          <CurrencyInput
            label="Yearly income"
            subtitle="gross, all purchasers"
            value={formState.yearlyIncome}
            onChange={(v) => updateField('yearlyIncome', v)}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <CurrencyInput
            label="Monthly expenses"
            value={formState.monthlyExpenses}
            onChange={(v) => updateField('monthlyExpenses', v)}
          />
          <CurrencyInput
            label="HECS/HELP debt"
            value={formState.hecsDebt}
            onChange={(v) => updateField('hecsDebt', v)}
          />
        </div>
      </CollapsibleSection>

      {/* Advanced Settings */}
      <CollapsibleSection title="Advanced Settings">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-5">
          <NumberInput
            label="Interest rate"
            value={formState.interestRate}
            onChange={(v) => updateField('interestRate', v)}
            suffix="%"
            min={0.1}
            max={20}
            step={0.1}
          />
          <SelectInput
            label="Loan term"
            value={String(formState.loanTerm)}
            options={[
              { value: '15', label: '15 years' },
              { value: '20', label: '20 years' },
              { value: '25', label: '25 years' },
              { value: '30', label: '30 years' },
            ]}
            onChange={(v) => updateField('loanTerm', parseInt(v) as LoanTerm)}
          />
        </div>
        <CurrencyInput
          label="Transaction fees"
          subtitle="conveyancing, inspections, etc."
          value={formState.transactionFees}
          onChange={(v) => updateField('transactionFees', v)}
        />
      </CollapsibleSection>
    </div>
  )
}
