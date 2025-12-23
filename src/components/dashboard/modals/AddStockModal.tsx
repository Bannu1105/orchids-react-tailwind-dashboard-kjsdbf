"use client"

import React from 'react'
import { X, Plus, Minus, ChevronDown } from 'lucide-react'

interface AddStockModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddStockModal({ isOpen, onClose }: AddStockModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <div>
            <h2 className="text-xl font-bold text-[#084d54]">Add Single Stock Item</h2>
            <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wider">Create one variant entry and set initial stock quantity.</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
          <section>
            <h3 className="text-[11px] font-bold text-[#084d54] uppercase tracking-widest mb-4">Product Identifiers</h3>
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Product Title</label>
                <input 
                  type="text" 
                  placeholder="eg. ZENZ Oversized Cotton Shirt" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500">SKU ID</label>
                  <input 
                    type="text" 
                    placeholder="eg. ZNZ-MN-OCS-BLK-M" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-300"
                  />
                  <p className="text-[10px] text-slate-400 font-medium italic">Unique identifier per variant</p>
                </div>
                <div className="space-y-1.5 text-left">
                  <label className="text-xs font-semibold text-slate-500">Brand</label>
                  <div className="relative">
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none text-slate-400">
                      <option>Select Brand</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-bold text-[#084d54] uppercase tracking-widest mb-4">Variant & Style Attributes</h3>
            <div className="grid grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Size</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none text-slate-400 font-medium">
                    <option>Select Size</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Fit</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none text-slate-400 font-medium">
                    <option>Select Size</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Color</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none text-slate-400 font-medium">
                    <option>Select Color</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Pattern</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none text-slate-400 font-medium">
                    <option>Select Pattern</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Material</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none text-slate-400 font-medium">
                    <option>Select Material</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500">Season</label>
                <div className="relative">
                  <select className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 appearance-none text-slate-400 font-medium">
                    <option>Select Season</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </section>

          <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h4 className="text-[13px] font-bold text-[#084d54]">Inventory Details</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Set your initial stock level for this variant.</p>
            </div>
            <div className="text-right">
              <label className="text-[10px] font-bold text-[#084d54] uppercase block mb-2">Total Stock Quantity*</label>
              <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
                <button className="text-slate-400 hover:text-teal-600 transition-colors">
                  <Minus className="w-4 h-4" />
                </button>
                <span className="text-sm font-bold text-slate-900 w-8 text-center">100</span>
                <button className="text-slate-400 hover:text-teal-600 transition-colors">
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between">
          <button className="text-sm font-bold text-[#084d54] underline underline-offset-4 decoration-2">
            Save & Add Another
          </button>
          <div className="flex items-center gap-3">
            <button 
              onClick={onClose}
              className="px-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button className="px-8 py-3 bg-[#084d54] text-white rounded-xl text-sm font-bold hover:bg-teal-900 transition-colors shadow-lg shadow-teal-900/10">
              Save Item
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
