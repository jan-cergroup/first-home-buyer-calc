import { useState, useCallback } from 'react'

interface CurrencyInputProps {
  value: number
  onChange: (value: number) => void
  label: string
  subtitle?: string
}

function formatDisplay(value: number): string {
  return new Intl.NumberFormat('en-AU').format(value)
}

export function CurrencyInput({ value, onChange, label, subtitle }: CurrencyInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState(String(value))

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    setInputValue(String(value))
  }, [value])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    const parsed = parseInt(inputValue.replace(/[^0-9]/g, ''), 10)
    if (!isNaN(parsed) && parsed >= 0) {
      onChange(parsed)
    } else {
      setInputValue(String(value))
    }
  }, [inputValue, onChange, value])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, '')
    setInputValue(raw)
    const parsed = parseInt(raw, 10)
    if (!isNaN(parsed) && parsed >= 0) {
      onChange(parsed)
    }
  }, [onChange])

  return (
    <div>
      <label className="block text-sm font-bold text-gray-900 mb-1">
        {label}
        {subtitle && <span className="text-gray-400 font-normal ml-1">{subtitle}</span>}
      </label>
      <div
        className={`flex items-center border-0 border-b-2 transition-colors ${
          isFocused ? 'border-accent' : 'border-gray-300'
        }`}
      >
        <span className="text-gray-400 text-base shrink-0">$</span>
        <input
          type="text"
          inputMode="numeric"
          value={isFocused ? inputValue : formatDisplay(value)}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange}
          className="w-full py-2 pl-1 text-base bg-transparent outline-none border-none"
        />
      </div>
    </div>
  )
}
