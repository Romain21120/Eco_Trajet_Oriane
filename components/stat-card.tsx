import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

interface StatCardProps {
  label: string
  value: string
  unit?: string
  icon: LucideIcon
  color?: 'green' | 'blue' | 'amber' | 'teal'
  trend?: string
}

const colorMap = {
  green: 'bg-eco-green-light text-eco-green-dark border-eco-green/20',
  blue: 'bg-inst-blue-light/30 text-inst-blue-dark border-inst-blue/20',
  amber: 'bg-amber-50 text-amber-700 border-amber-200',
  teal: 'bg-teal-50 text-teal-700 border-teal-200',
}

const iconColorMap = {
  green: 'bg-primary text-white',
  blue: 'bg-secondary text-white',
  amber: 'bg-amber-500 text-white',
  teal: 'bg-teal-500 text-white',
}

export function StatCard({ label, value, unit, icon: Icon, color = 'green', trend }: StatCardProps) {
  return (
    <div className={cn('rounded-xl p-5 border flex flex-col gap-3', colorMap[color])}>
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium opacity-80">{label}</span>
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', iconColorMap[color])}>
          <Icon className="w-4 h-4" />
        </div>
      </div>
      <div>
        <span className="text-3xl font-bold">{value}</span>
        {unit && <span className="text-sm font-medium ml-1 opacity-70">{unit}</span>}
      </div>
      {trend && (
        <div className="text-xs opacity-70 font-medium">{trend}</div>
      )}
    </div>
  )
}
