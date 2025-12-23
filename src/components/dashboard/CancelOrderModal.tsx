"use client"

import React from 'react'
import { X, AlertTriangle, ChevronDown } from 'lucide-react'

interface CancelOrderModalProps {
  isOpen: boolean
  onClose: () => void
}

export function CancelOrderModal({ isOpen, onClose }: CancelOrderModalProps) {
  if (!isOpen) return null

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
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl font-bold text-red-500">Cancel Order</h2>
          </div>

          <div className="p-4 bg-red-50 rounded-xl mb-8">
            <p className="text-sm text-red-700 leading-relaxed font-medium">
              Warning: This action cannot be undone. Inventory will be restacked automatically.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Reason for Cancellation</label>
              <button className="w-full flex items-center justify-between px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm text-slate-400">
                <span>Select a reason...</span>
                <ChevronDown className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Notes</label>
              <textarea 
                rows={4}
                placeholder="Add any additional notes about the cancellation..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 resize-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-10">
            <button 
              onClick={onClose}
              className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-700"
            >
              Back
            </button>
            <button className="px-8 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold hover:bg-red-600 shadow-lg shadow-red-200">
              Confirm Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
