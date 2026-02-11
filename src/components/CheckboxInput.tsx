interface CheckboxInputProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export function CheckboxInput({ label, checked, onChange }: CheckboxInputProps) {
  return (
    <label className="flex items-center gap-3 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="sr-only"
      />
      <div
        className={`w-5 h-5 rounded border-2 flex items-center justify-center shrink-0 transition-colors ${
          checked
            ? 'bg-accent border-accent'
            : 'border-gray-300 group-hover:border-gray-400'
        }`}
      >
        {checked && (
          <svg
            className="w-3 h-3 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={3}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>
      <span className="text-base text-gray-700 select-none">{label}</span>
    </label>
  )
}
