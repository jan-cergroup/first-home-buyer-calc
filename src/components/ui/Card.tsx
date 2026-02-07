interface CardProps {
  title?: string
  children: React.ReactNode
  className?: string
}

export function Card({ title, children, className = '' }: CardProps) {
  return (
    <div className={`rounded-xl bg-surface shadow-card p-5 ${className}`}>
      {title && (
        <h3 className="text-sm font-semibold text-muted uppercase tracking-wide mb-4">
          {title}
        </h3>
      )}
      {children}
    </div>
  )
}
