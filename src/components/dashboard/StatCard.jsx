"use client"

import React from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card, CardContent } from '@/components/ui/card'

export function StatCard({ title, value, trend, icon, isPositive = true }) {
  return (
    <Card className="border-slate-200 shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="p-2 bg-slate-50 rounded-lg text-slate-600">
            {icon}
          </div>
          <div className={cn(
            "flex items-center gap-1 text-[10px] font-bold px-2 py-0.5 rounded-full",
            isPositive 
              ? "bg-emerald-50 text-emerald-600" 
              : "bg-rose-50 text-rose-600"
          )}>
            {isPositive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500 mb-1">{title}</p>
          <h3 className="text-xl font-bold text-slate-900">{value}</h3>
        </div>
      </CardContent>
    </Card>
  )
}
