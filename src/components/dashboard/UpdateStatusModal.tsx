"use client"

import React from 'react'
import { X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface UpdateStatusModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UpdateStatusModal({ isOpen, onClose }: UpdateStatusModalProps) {
  if (!isOpen) return null

  const steps = [
    { label: 'Confirmed', completed: true },
    { label: 'Packed', current: true },
    { label: 'Shipped', pending: true },
    { label: 'Delivered', pending: true },
  ]

  return (
    <div className="fixed inset-0 bg-black/40 z-[80] flex items-center justify-center p-4">
      <div className="bg-white rounded-[32px] w-full max-w-xl shadow-2xl overflow-hidden relative">
        <button 
          onClick={onClose}
          className="absolute right-6 top-6 p-2 text-slate-400 hover:text-slate-600"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-10">
          <h2 className="text-xl font-bold text-slate-900 mb-8">Update Order Status</h2>

          {/* Stepper */}
          <div className="flex items-center justify-between mb-10 relative">
            <div className="absolute left-0 right-0 top-4 h-[2px] bg-slate-100 -z-10" />
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all border-2",
                  step.completed ? "bg-teal-600 border-teal-600 text-white" : 
                  step.current ? "bg-teal-50 border-teal-600 text-teal-600" :
                  "bg-white border-slate-200 text-slate-400"
                )}>
                  {step.completed ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  step.completed || step.current ? "text-teal-600" : "text-slate-400"
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Package Count</label>
              <input 
                type="number" 
                defaultValue={1}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Packing Notes (Optional)</label>
              <textarea 
                rows={4}
                placeholder="Add any specific instructions for packing..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-10">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700"
            >
              Cancel
            </button>
            <button className="px-8 py-2.5 bg-[#084d54] text-white rounded-xl text-sm font-bold hover:bg-[#063a3f]">
              Mark as Packed
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
