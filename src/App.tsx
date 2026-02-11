import { Calculator } from './components/Calculator'
import { InfoSection } from './components/InfoSection'
import { FAQAccordion } from './components/FAQAccordion'

function App() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="relative">
        {/* Two-panel hero */}
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left panel: text on accent bg */}
          <div className="bg-accent px-6 md:px-0">
            <div className="md:ml-auto md:max-w-[540px] md:pr-12 lg:pr-16 pt-5 pb-20 md:pb-24">
              {/* Logo */}
              <div className="flex items-center gap-2 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" fill="none" className="w-5 h-5">
                  <path d="M16 3L2 15h4v12h8v-8h4v8h8V15h4L16 3z" fill="white"/>
                </svg>
                <span className="text-white/90 font-medium text-sm">
                  firsthomebuyercalculator.com.au
                </span>
              </div>

              <h1 className="text-3xl md:text-[2.75rem] md:leading-tight font-bold text-white mb-5">
                First Home Buyer Calculator
              </h1>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                Calculate how much your first home could cost and
                learn more about government grants and schemes
                available to you.
              </p>
            </div>
          </div>

          {/* Right panel: hero image */}
          <div
            className="hidden md:block bg-accent-light bg-[url('/hero-couple.png')] bg-cover bg-no-repeat bg-top"
            aria-hidden="true"
          />
        </div>
      </header>

      {/* Calculator section — overlaps the hero */}
      <main className="flex-1 w-full">
        <div className="max-w-6xl mx-auto px-6 md:px-8 -mt-20 relative z-10">
          <div className="bg-white rounded-2xl shadow-lg px-6 md:px-10 pt-10 pb-12">
            <Calculator />
          </div>
        </div>

        {/* Info sections */}
        <div className="max-w-6xl mx-auto px-6 md:px-8">
          <div className="mt-16 space-y-16 pb-20">
            <InfoSection />
            <FAQAccordion />
          </div>
        </div>
      </main>

      <footer className="bg-navy text-white/70 text-sm py-8 px-6">
        <div className="max-w-6xl mx-auto text-center space-y-2">
          <p>&copy; 2025 firsthomebuyercalculator.com.au</p>
          <p>This calculator provides estimates only. Contact your state revenue office for exact figures.</p>
        </div>
      </footer>
    </div>
  )
}

export default App
