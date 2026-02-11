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

  const displayValue = isFocused ? inputValue : `${value}${suffix ? ` ${suffix}` : ''}`

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">
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
        className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg text-base focus:outline-none focus:border-accent transition-colors"
      />
    </div>
  )
}
