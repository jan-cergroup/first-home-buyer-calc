import type { FormState, PropertyPurpose, AustralianState, PropertyType, ChildrenCount, BuyerType, LoanTerm } from '../types'
import { STATE_FORM_CONFIG, STATE_LOCATION_LABELS } from '../types'
import { RadioGroup } from './RadioGroup'
import { CurrencyInput } from './CurrencyInput'
import { NumberInput } from './NumberInput'
import { StateSelect } from './StateSelect'
import { CollapsibleSection } from './CollapsibleSection'

interface CalculatorFormProps {
  formState: FormState
  updateField: <K extends keyof FormState>(field: K, value: FormState[K]) => void
}

export function CalculatorForm({ formState, updateField }: CalculatorFormProps) {
  const config = STATE_FORM_CONFIG[formState.state]
  const locationLabels = STATE_LOCATION_LABELS[formState.state]

  return (
    <div className="space-y-5">
      {/* Property section */}
      <div className="space-y-4">
        <RadioGroup
          label="Property purpose"
          options={[
            { value: 'home' as PropertyPurpose, label: 'Home' },
            { value: 'investment' as PropertyPurpose, label: 'Investment' },
          ]}
          value={formState.propertyPurpose}
          onChange={(v) => updateField('propertyPurpose', v)}
        />

        <StateSelect value={formState.state} onChange={(v: AustralianState) => updateField('state', v)} />

        <RadioGroup
          label="Location"
          options={[
            { value: 'metro', label: locationLabels.metro },
            { value: 'regional', label: locationLabels.regional },
          ]}
          value={formState.isMetro ? 'metro' : 'regional'}
          onChange={(v) => updateField('isMetro', v === 'metro')}
        />

        <CurrencyInput
          label="Property value"
          value={formState.propertyValue}
          onChange={(v) => updateField('propertyValue', v)}
        />

        <RadioGroup
          label="Property type"
          options={[
            { value: 'established' as PropertyType, label: 'Established home' },
            { value: 'newlyConstructed' as PropertyType, label: 'Newly constructed' },
            { value: 'vacantLand' as PropertyType, label: 'Vacant land' },
          ]}
          value={formState.propertyType}
          onChange={(v) => updateField('propertyType', v)}
        />
      </div>

      <hr className="border-gray-200" />

      {/* About you section */}
      <div className="space-y-4">
        <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">About you</h3>

        <RadioGroup
          label="Buyer type"
          options={[
            { value: 'single' as BuyerType, label: 'Single' },
            { value: 'couple' as BuyerType, label: 'Couple' },
          ]}
          value={formState.buyerType}
          onChange={(v) => updateField('buyerType', v)}
        />

        <RadioGroup
          label="Are you a first home buyer?"
          options={[
            { value: 'yes', label: 'Yes' },
            { value: 'no', label: 'No' },
          ]}
          value={formState.isFirstHomeBuyer ? 'yes' : 'no'}
          onChange={(v) => updateField('isFirstHomeBuyer', v === 'yes')}
        />

        {config.showForeignPurchaser && (
          <RadioGroup
            label="Are you a foreign purchaser?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={formState.isForeignPurchaser ? 'yes' : 'no'}
            onChange={(v) => updateField('isForeignPurchaser', v === 'yes')}
          />
        )}

        {config.showPensioner && (
          <RadioGroup
            label="Are you an eligible pensioner?"
            options={[
              { value: 'yes', label: 'Yes' },
              { value: 'no', label: 'No' },
            ]}
            value={formState.isEligiblePensioner ? 'yes' : 'no'}
            onChange={(v) => updateField('isEligiblePensioner', v === 'yes')}
          />
        )}

        {config.showNumberOfChildren && (
          <RadioGroup
            label="Number of children"
            options={[
              { value: '0', label: '0' },
              { value: '1', label: '1' },
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5+' },
            ]}
            value={String(formState.childrenCount)}
            onChange={(v) => updateField('childrenCount', parseInt(v) as ChildrenCount)}
          />
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Your finances section */}
      <CollapsibleSection title="Your Finances" defaultOpen>
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

        <CurrencyInput
          label="Monthly living expenses"
          value={formState.monthlyExpenses}
          onChange={(v) => updateField('monthlyExpenses', v)}
        />

        <CurrencyInput
          label="HECS/HELP debt"
          value={formState.hecsDebt}
          onChange={(v) => updateField('hecsDebt', v)}
        />
      </CollapsibleSection>

      <hr className="border-gray-200" />

      {/* Advanced settings */}
      <CollapsibleSection title="Advanced Settings">
        <NumberInput
          label="Interest rate"
          value={formState.interestRate}
          onChange={(v) => updateField('interestRate', v)}
          suffix="%"
          min={0.1}
          max={20}
          step={0.1}
        />

        <RadioGroup
          label="Loan term"
          options={[
            { value: '15', label: '15 yrs' },
            { value: '20', label: '20 yrs' },
            { value: '25', label: '25 yrs' },
            { value: '30', label: '30 yrs' },
          ]}
          value={String(formState.loanTerm)}
          onChange={(v) => updateField('loanTerm', parseInt(v) as LoanTerm)}
        />

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
