import { Calculator } from './components/Calculator'
import { InfoSection } from './components/InfoSection'
import { FAQAccordion } from './components/FAQAccordion'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header>
        {/* Logo bar */}
        <div className="bg-navy">
          <div className="max-w-5xl mx-auto px-4 py-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-6 h-6">
              <path d="M16 3L2 15h4v12h8v-8h4v8h8V15h4L16 3z" fill="white"/>
            </svg>
            <span className="text-white font-semibold text-lg">
              First Home Buyer Calculator
            </span>
          </div>
        </div>

        {/* Hero section */}
        <div className="bg-navy-light text-white py-10 px-4 text-center">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            First Home Buyers & Owners Grant Calculator
          </h1>
          <p className="text-green-200 text-sm md:text-base leading-relaxed max-w-3xl mx-auto">
            Looking to buy or build your first home? You may be eligible for a one-off government grant
            to help make your homeownership dream a reality. Learn how the First Home Owner Grant (FHOG)
            can help you move into your new home sooner.
          </p>
        </div>
      </header>

      {/* Calculator section */}
      <main className="max-w-5xl mx-auto px-4 -mt-6 flex-1">
        <Calculator />

        {/* Info sections */}
        <div className="mt-16 space-y-16 pb-20">
          <InfoSection />
          <FAQAccordion />
        </div>
      </main>

      <footer className="bg-navy text-white/70 text-sm py-8 px-4 mt-16">
        <div className="max-w-5xl mx-auto text-center space-y-2">
          <p>&copy; 2025 firsthomebuyercalculator.com.au</p>
          <p>This calculator provides estimates only. Contact your state revenue office for exact figures.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
