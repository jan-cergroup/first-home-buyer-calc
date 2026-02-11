interface SelectOption {
  value: string
  label: string
}

interface SelectInputProps {
  label: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
}

export function SelectInput({ label, value, options, onChange }: SelectInputProps) {
  return (
    <div>
      <label className="block text-sm font-bold text-gray-900 mb-1">{label}</label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full py-2 pr-8 border-0 border-b-2 border-gray-300 rounded-none bg-transparent text-base text-gray-700 appearance-none cursor-pointer outline-none focus:border-accent transition-colors"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <svg
          className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}
