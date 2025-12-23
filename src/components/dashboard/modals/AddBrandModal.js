"use client"

import React from 'react'
import { X, Upload } from 'lucide-react'

interface AddBrandModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AddBrandModal({ isOpen, onClose }: AddBrandModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-[#084d54]">Add Brand</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500">Brand Name</label>
              <input 
                type="text" 
                placeholder="Enter brand name" 
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-300"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-500">Brand Icon</label>
              <div className="relative group">
                <input 
                  type="text" 
                  placeholder="Upload Brand Icon in .png format" 
                  className="w-full pl-4 pr-10 py-3 bg-slate-50 border border-slate-200 rounded-xl text-[11px] focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder:text-slate-300"
                  readOnly
                />
                <button className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-teal-600">
                  <Upload className="w-4 h-4" />
                </button>
              </div>
              <p className="text-[10px] text-amber-500 font-medium">Icon should be 50px X 50px</p>
            </div>
          </div>

          <button className="text-sm font-bold text-[#084d54] underline underline-offset-4 decoration-2">
            Save & Add Another
          </button>
        </div>

        <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <button 
            onClick={onClose}
            className="px-8 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors"
          >
            Cancel
          </button>
          <button className="px-8 py-3 bg-[#084d54] text-white rounded-xl text-sm font-bold hover:bg-teal-900 transition-colors shadow-lg shadow-teal-900/10">
            Save Brand
          </button>
        </div>
      </div>
    </div>
  )
}
