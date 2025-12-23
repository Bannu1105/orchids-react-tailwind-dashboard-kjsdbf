"use client"

import React, { useState } from 'react'
import { X, ChevronDown, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'

interface AdjustStockModalProps {
  isOpen: boolean
  onClose: () => void
}

export const AdjustStockModal: React.FC<AdjustStockModalProps> = ({ isOpen, onClose }) => {
  const [operation, setOperation] = useState('add') // 'add', 'remove', 'set'
  const [quantity, setQuantity] = useState(100)
  const [skuSearch, setSkuSearch] = useState('')
  
  if (!isOpen) return null

  const currentStock = 120
  const newStock = operation === 'add' ? currentStock + quantity : 
                   operation === 'remove' ? currentStock - quantity : 
                   quantity

  return (
    <div className="fixed inset-0 z-[60] flex justify-end bg-black/40 backdrop-blur-[2px]">
      <div 
        className="w-full max-w-[400px] bg-white h-screen shadow-2xl animate-in slide-in-from-right duration-300 overflow-y-auto"
      >
        <div className="p-6 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white z-10">
          <h2 className="text-lg font-bold text-slate-900">Adjust Stock</h2>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-slate-100 rounded-full transition-colors text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-8">
          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search SKU Code</label>
            <div className="relative">
              <input 
                type="text"
                placeholder="Search SKU Code..."
                value={skuSearch}
                onChange={(e) => setSkuSearch(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-lg px-4 py-2.5 text-xs font-medium text-slate-900 focus:bg-white focus:ring-1 focus:ring-teal-500 outline-none transition-all"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <ChevronDown className="w-4 h-4 text-slate-400" />
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operation</label>
            <div className="flex flex-wrap gap-4">
              {[
                { id: 'add', label: 'Add Stock' },
                { id: 'remove', label: 'Remove Stock' },
                { id: 'set', label: 'Set Absolute' }
              ].map((op) => (
                <label key={op.id} className="flex items-center gap-2 cursor-pointer group">
                  <div className="relative flex items-center justify-center">
                    <input 
                      type="radio" 
                      name="operation"
                      checked={operation === op.id}
                      onChange={() => setOperation(op.id)}
                      className="peer appearance-none w-4 h-4 border-2 border-slate-200 rounded-full checked:border-[#084d54] transition-all"
                    />
                    <div className="w-2 h-2 bg-[#084d54] rounded-full scale-0 peer-checked:scale-100 transition-transform absolute" />
                  </div>
                  <span className={cn(
                    "text-[11px] font-bold transition-colors",
                    operation === op.id ? "text-[#084d54]" : "text-slate-500"
                  )}>
                    {op.label}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stock Quantity</label>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className="w-10 h-10 border border-slate-200 rounded-l-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <Minus className="w-4 h-4" />
              </button>
              <input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="w-full h-10 border-y border-slate-200 text-center text-sm font-bold text-slate-900 focus:outline-none"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="w-10 h-10 border border-slate-200 rounded-r-lg flex items-center justify-center text-slate-500 hover:bg-slate-50 transition-colors"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Notes</label>
            <textarea 
              placeholder="Enter PO number or details..."
              className="w-full bg-white border border-slate-200 rounded-xl px-4 py-3 text-xs font-medium text-slate-900 focus:ring-1 focus:ring-teal-500 outline-none min-h-[100px] resize-none transition-all placeholder:text-slate-300 shadow-sm"
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-50">
            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Impact Preview</label>
            <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">Current: {currentStock}</p>
              </div>
              <div className="h-px flex-1 mx-4 bg-slate-200 relative">
                <div className="absolute right-0 -top-1 border-t-4 border-l-4 border-transparent border-l-slate-200" />
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[9px] text-teal-600 font-bold uppercase tracking-tight">New: {newStock}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex gap-4 sticky bottom-0 bg-white">
          <button 
            onClick={onClose}
            className="flex-1 py-3 border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="flex-1 py-3 bg-[#084d54] text-white rounded-lg text-xs font-bold hover:bg-teal-900 transition-all shadow-md shadow-teal-100"
          >
            Save Adjustment
          </button>
        </div>
      </div>
    </div>
  )
}
