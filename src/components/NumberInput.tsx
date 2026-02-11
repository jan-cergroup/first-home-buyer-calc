import { useState, useCallback } from 'react'

interface NumberInputProps {
  value: number
  onChange: (value: number) => void
  label: string
  subtitle?: string
  suffix?: string
  min?: number
  max?: number
  step?: number
}

export function NumberInput({ value, onChange, label, subtitle, suffix, min, max, step = 0.1 }: NumberInputProps) {
  const [isFocused, setIsFocused] = useState(false)
  const [inputValue, setInputValue] = useState(String(value))

  const handleFocus = useCallback(() => {
    setIsFocused(true)
    setInputValue(String(value))
  }, [value])

  const handleBlur = useCallback(() => {
    setIsFocused(false)
    const parsed = parseFloat(inputValue)
    if (!isNaN(parsed)) {
      const clamped = Math.max(min ?? -Infinity, Math.min(max ?? Infinity, parsed))
      onChange(clamped)
    } else {
      setInputValue(String(value))
    }
  }, [inputValue, onChange, value, min, max])

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    setInputValue(raw)
    const parsed = parseFloat(raw)
    if (!isNaN(parsed)) {
      const clamped = Math.max(min ?? -Infinity, Math.min(max ?? Infinity, parsed))
      onChange(clamped)
    }
  }, [onChange, min, max])

  const displayValue = isFocused ? inputValue : `${value}${suffix ? suffix : ''}`

  return (
    <div>
      <label className="block text-sm font-bold text-gray-900 mb-1">
        {label}
        {subtitle && <span className="text-gray-400 font-normal ml-1">{subtitle}</span>}
      </label>
      <input
        type="text"
        inputMode="decimal"
        value={displayValue}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onChange={handleChange}
        step={step}
        className={`w-full py-2 border-0 border-b-2 rounded-none bg-transparent text-base outline-none transition-colors ${
          isFocused ? 'border-accent' : 'border-gray-300'
        }`}
      />
    </div>
  )
}
