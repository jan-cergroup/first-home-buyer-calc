import { useCalculator } from '../hooks/useCalculator'
import { STATE_FORM_CONFIG } from '../types'
import { CalculatorForm } from './CalculatorForm'
import { CalculatorResults } from './CalculatorResults'

export function Calculator() {
  const { formState, results, updateField } = useCalculator()

  const stateConfig = STATE_FORM_CONFIG[formState.state]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 lg:p-10">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        <CalculatorForm
          formState={formState}
          updateField={updateField}
        />
        <CalculatorResults results={results} stateConfig={stateConfig} formState={formState} />
      </div>
    </div>
  )
}
