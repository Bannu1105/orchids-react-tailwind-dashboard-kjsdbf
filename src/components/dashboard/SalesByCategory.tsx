"use client"

import React from 'react'

interface Category {
  name: string
  value: number
  color: string
}

const categories: Category[] = [
  { name: 'Fashion & Apparel', value: 45, color: 'bg-indigo-500' },
  { name: 'Electronics', value: 30, color: 'bg-emerald-500' },
  { name: 'Home & Kitchen', value: 25, color: 'bg-amber-500' },
  { name: 'Beauty & Personal Care', value: 20, color: 'bg-rose-500' },
  { name: 'Accessories', value: 15, color: 'bg-sky-500' },
]

export function SalesByCategory() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
      <h3 className="text-sm font-bold text-slate-900 mb-6">Sales by Category</h3>
      <div className="space-y-5">
        {categories.map((cat) => (
          <div key={cat.name} className="space-y-1.5">
            <div className="flex justify-between items-center text-[10px] font-medium">
              <span className="text-slate-600">{cat.name}</span>
              <span className="text-slate-900">{cat.value}%</span>
            </div>
            <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
              <div 
                className={`h-full ${cat.color} rounded-full transition-all duration-500`}
                style={{ width: `${cat.value}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
