"use client"

import React, { useState } from 'react'
import { X, CheckCircle2, Circle, ChevronRight, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ReturnDetailsDrawerProps {
  returnItem: any
  isOpen: boolean
  onClose: () => void
  onApproveRefund: () => void
}

export function ReturnDetailsDrawer({ returnItem, isOpen, onClose, onApproveRefund }: ReturnDetailsDrawerProps) {
  if (!returnItem) return null

  const timeline = [
    { status: 'REQUESTED', date: 'Oct 22, 10:00 AM', completed: true },
    { status: 'APPROVED', date: 'Oct 23, 05:00 PM', completed: true },
    { status: 'PICKUP SCHEDULED', date: 'Oct 24, 09:00 AM', completed: true },
    { status: 'RECEIVED AT WAREHOUSE', date: 'Pending', completed: true, current: true },
    { status: 'QC CHECK', date: 'Pending', completed: false },
    { status: 'REFUND INITIATED', date: 'Pending', completed: false },
  ]

  return (
    <>
      {/* Backdrop */}
      <div 
        className={cn(
          "fixed inset-0 bg-slate-900/40 backdrop-blur-[2px] z-40 transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Drawer */}
      <div className={cn(
        "fixed right-0 top-0 h-screen w-full md:w-[600px] bg-white z-50 shadow-2xl transition-transform duration-300 ease-in-out flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-[#084d54]">ORD-9893</h2>
            <p className="text-xs text-slate-400">Linked to Order ORD-7250</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] h-full">
            {/* Timeline Column */}
            <div className="p-6 border-r border-slate-50 bg-slate-50/30">
              <h3 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-6">Timeline</h3>
              <div className="space-y-8 relative">
                {/* Vertical Line */}
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-200" />
                
                {timeline.map((step, i) => (
                  <div key={i} className="relative pl-8">
                    <div className={cn(
                      "absolute left-0 top-0 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center z-10",
                      step.completed ? "border-teal-500 bg-teal-50" : "border-slate-200",
                      step.current && "border-teal-500 ring-4 ring-teal-500/10"
                    )}>
                      {step.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      ) : (
                        <Circle className="w-3 h-3 text-slate-300" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-[10px] font-bold tracking-tight",
                        step.completed ? "text-slate-900" : "text-slate-400"
                      )}>
                        {step.status}
                      </span>
                      <span className="text-[10px] text-slate-400">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Details Column */}
            <div className="p-6 space-y-8">
              {/* Product Card */}
              <div className="flex gap-4 p-4 bg-white border border-slate-100 rounded-xl">
                <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden flex-shrink-0">
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">T-Shirts</h4>
                      <p className="text-xs text-slate-500">Soft Design Henley Neck T-shirt</p>
                      <p className="text-xs font-medium text-slate-700 mt-1">Size: XL</p>
                    </div>
                    <img src="https://upload.wikimedia.org/wikipedia/commons/2/20/Adidas_Logo.svg" alt="Brand" className="h-4 w-auto grayscale opacity-50" />
                  </div>
                </div>
              </div>

              {/* Quality Check Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Quality Check</h3>
                  <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[9px] font-bold rounded uppercase">Required</span>
                </div>
                
                <div className="space-y-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 mb-1.5 block uppercase tracking-tight">Condition upon receipt</label>
                    <div className="relative">
                      <select className="w-full pl-3 pr-10 py-2.5 bg-white border border-slate-200 rounded-lg text-xs appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/10">
                        <option>Select condition...</option>
                        <option>Mint Condition</option>
                        <option>Slightly Used</option>
                        <option>Damaged</option>
                      </select>
                      <ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90" />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-medium text-slate-600 block uppercase tracking-tight">Admin Remarks</label>
                      <span className="text-[9px] text-teal-600 font-bold flex items-center gap-1 cursor-pointer">
                        <HelpCircle className="w-3 h-3" />
                        AI Assist
                      </span>
                    </div>
                    <textarea 
                      placeholder="Notes for finance team..."
                      className="w-full p-3 bg-white border border-slate-200 rounded-lg text-xs min-h-[80px] focus:outline-none focus:ring-2 focus:ring-teal-500/10"
                    />
                  </div>
                </div>
              </div>

              {/* Refund Summary */}
              <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Est. Refund Amount</p>
                    <p className="text-xl font-bold text-[#084d54]">₹ 3,500.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Original Pay Mode</p>
                    <p className="text-xs font-medium text-slate-700">UPI (PhonePe)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-slate-100 bg-white">
          <div className="flex gap-4">
            <button 
              className="flex-1 px-6 py-3 border border-red-200 text-red-600 font-bold text-sm rounded-xl hover:bg-red-50 transition-colors"
            >
              Return Reject
            </button>
            <button 
              onClick={onApproveRefund}
              className="flex-1 px-6 py-3 bg-[#084d54] text-white font-bold text-sm rounded-xl hover:bg-[#063b41] transition-shadow shadow-lg shadow-teal-900/10"
            >
              Approve & Refund
            </button>
          </div>
        </div>
      </div>
    </>
  )
}
