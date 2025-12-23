"use client"

import React from 'react'
import { X, AlertCircle, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ProcessRefundModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ProcessRefundModal({ isOpen, onClose }: ProcessRefundModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="p-6 border-b border-slate-100">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-xl font-bold text-[#084d54]">Process Refund</h2>
            <button 
              onClick={onClose}
              className="p-1 hover:bg-slate-100 rounded-full text-slate-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">REF-NEW-901</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Alert */}
          <div className="flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <p className="text-xs text-blue-700 font-medium leading-relaxed">
              Full Refund Advised. Customer returned item in original condition.
            </p>
          </div>

          {/* Refund Type & Amount */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Refund Type</label>
              <div className="relative">
                <select className="w-full pl-3 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all">
                  <option>Partial Refund</option>
                  <option>Full Refund</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount (₹)</label>
              <input 
                type="number" 
                defaultValue="3500"
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
              />
            </div>
          </div>

          {/* Refund Destination */}
          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Refund Destination</label>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-between p-4 border-2 border-teal-500 bg-teal-50/30 rounded-2xl text-left group transition-all">
                <div>
                  <p className="text-xs font-bold text-[#084d54]">Original Source</p>
                  <p className="text-[10px] text-slate-500">HDFC Bank ...8892</p>
                </div>
                <div className="w-4 h-4 rounded-full border-4 border-teal-500 bg-white" />
              </button>
              <button className="flex items-center justify-between p-4 border border-slate-200 hover:border-slate-300 rounded-2xl text-left transition-all">
                <div>
                  <p className="text-xs font-bold text-slate-900">Store Wallet</p>
                  <p className="text-[10px] text-slate-500">Instant credit</p>
                </div>
                <div className="w-4 h-4 rounded-full border border-slate-200" />
              </button>
            </div>
          </div>

          {/* Internal Note */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal Note / Transaction Ref</label>
            <input 
              type="text" 
              placeholder="Optional reference..."
              className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-teal-500/10 transition-all"
            />
          </div>

          {/* Action Button */}
          <button 
            className="w-full py-4 bg-[#084d54] text-white font-bold text-sm rounded-2xl hover:bg-[#063b41] transition-shadow shadow-lg shadow-teal-900/20 active:scale-[0.98]"
          >
            Initiate Refund
          </button>
        </div>
      </div>
    </div>
  )
}
