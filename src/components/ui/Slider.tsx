interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  formatValue: (value: number) => string
  onChange: (value: number) => void
  tooltip?: string
}

export function Slider({
  label,
  value,
  min,
  max,
  step,
  formatValue,
  onChange,
  tooltip,
}: SliderProps) {
  return (
    <div className="py-3">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <label className="text-sm font-medium text-foreground">{label}</label>
          {tooltip && (
            <span className="group relative">
              <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-border text-muted text-[10px] font-bold cursor-help">
                ?
              </span>
              <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-foreground rounded-lg
                             opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                             transition-opacity whitespace-nowrap z-10">
                {tooltip}
              </span>
            </span>
          )}
        </div>
        <span className="text-sm font-semibold text-primary tabular-nums">
          {formatValue(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  )
}
