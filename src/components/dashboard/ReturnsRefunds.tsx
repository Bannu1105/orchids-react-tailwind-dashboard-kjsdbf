"use client"

import React from 'react'
import { RotateCcw, CreditCard } from 'lucide-react'

export function ReturnsRefunds() {
  return (
    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-bold text-slate-900">Returns & Refunds</h3>
        <RotateCcw className="w-4 h-4 text-slate-400" />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 font-medium">Pending Returns</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900">14</span>
            <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-1 rounded">-2.5%</span>
          </div>
        </div>
        
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 font-medium">Refund Amount</p>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-slate-900">₹ 8,420</span>
            <span className="text-[9px] font-bold text-rose-600 bg-rose-50 px-1 rounded">+12%</span>
          </div>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-slate-100 rounded-md">
            <CreditCard className="w-3 h-3 text-slate-600" />
          </div>
          <span className="text-[10px] text-slate-600">Avg Refund Time: <span className="font-bold text-slate-900">3.2 Days</span></span>
        </div>
      </div>
    </div>
  )
}
