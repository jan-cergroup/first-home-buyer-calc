interface TooltipProps {
  text: string
  children: React.ReactNode
}

export function Tooltip({ text, children }: TooltipProps) {
  return (
    <span className="group relative inline-flex">
      {children}
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 text-xs text-white bg-foreground rounded-lg
                       opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto
                       transition-opacity whitespace-nowrap z-10 max-w-xs text-center">
        {text}
      </span>
    </span>
  )
}
