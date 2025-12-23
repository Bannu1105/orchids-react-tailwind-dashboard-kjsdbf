"use client"

import React from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'

interface Brand {
  name: string
  icon: string
}

interface ViewBrandsModalProps {
  isOpen: boolean
  onClose: () => void
}

const brands: Brand[] = [
  { name: 'HRX', icon: 'HRX' },
  { name: 'The Roadster', icon: 'Roadster' },
  { name: 'Bewakoof', icon: 'Bewakoof' },
  { name: 'Allen Solly', icon: 'Allen Solly' },
  { name: 'Peter England', icon: 'Peter England' },
  { name: 'Puma', icon: 'Puma' },
  { name: 'Nike', icon: 'Nike' },
  { name: 'Adidas', icon: 'Adidas' },
  { name: 'ZARA', icon: 'ZARA' },
]

export function ViewBrandsModal({ isOpen, onClose }: ViewBrandsModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-[2px]">
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
        <div className="flex items-center justify-between px-8 py-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-[#084d54]">View Brands</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-50 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </div>

        <div className="p-0">
          <div className="grid grid-cols-2 bg-slate-50/50 px-8 py-3 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Brand Name</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Brand Icon</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto custom-scrollbar">
            {brands.map((brand, i) => (
              <div key={i} className="grid grid-cols-2 px-8 py-4 border-b border-slate-50 items-center hover:bg-slate-50/30 transition-colors">
                <span className="text-sm font-semibold text-slate-600">{brand.name}</span>
                <div className="flex justify-end">
                  <div className="w-10 h-6 bg-slate-100 rounded flex items-center justify-center text-[10px] font-bold text-slate-400 italic">
                    {brand.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <button className="text-[11px] font-medium text-slate-400 hover:text-slate-600 px-2 flex items-center gap-1">
              <ChevronLeft className="w-3 h-3" /> Prev
            </button>
            <button className="w-6 h-6 flex items-center justify-center rounded bg-[#084d54] text-white text-[11px] font-bold">1</button>
            <button className="w-6 h-6 flex items-center justify-center rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50">2</button>
            <button className="w-6 h-6 flex items-center justify-center rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50">3</button>
            <span className="text-slate-300 px-1">...</span>
            <button className="w-6 h-6 flex items-center justify-center rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50">10</button>
            <button className="text-[11px] font-medium text-slate-600 hover:text-teal-700 px-2 flex items-center gap-1 font-bold">
              Next <ChevronRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
