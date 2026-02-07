'use client'

import { useCalculator } from '@/hooks/useCalculator'
import { InputForm } from './InputForm'
import { ResultsTable } from './ResultsTable'

export function Calculator() {
  const { inputs, results, onChange } = useCalculator()

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <header className="bg-gradient-to-r from-primary-dark to-primary text-white px-6 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">
            First Home Buyer Calculator
          </h1>
          <p className="mt-2 text-blue-200 text-lg max-w-2xl">
            Estimate your borrowing capacity, stamp duty, government grants, and more across all Australian states.
          </p>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-7xl mx-auto px-4 lg:px-6 py-6 lg:py-8">
        <div className="lg:grid lg:grid-cols-[380px_1fr] lg:gap-6">
          {/* Input sidebar */}
          <aside className="lg:sticky lg:top-6 lg:self-start mb-6 lg:mb-0">
            <InputForm inputs={inputs} onChange={onChange} />
          </aside>

          {/* Results */}
          <section>
            <ResultsTable results={results} />
          </section>
        </div>
      </main>
    </div>
  )
}
