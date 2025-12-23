"use client"

import React from 'react'
import { X, ChevronLeft, ChevronRight } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

const brands = [
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

export function ViewBrandsModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md bg-white rounded-3xl p-0 overflow-hidden border-none">
        <DialogHeader className="px-8 py-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-[#084d54]">View Brands</DialogTitle>
        </DialogHeader>

        <div className="p-0">
          <div className="grid grid-cols-2 bg-slate-50/50 px-8 py-3 border-b border-slate-100">
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Brand Name</span>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider text-right">Brand Icon</span>
          </div>
          <div className="max-h-[400px] overflow-y-auto">
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
            <Button variant="ghost" size="sm" className="text-[11px] font-medium text-slate-400 hover:text-slate-600 h-8">
              <ChevronLeft className="w-3 h-3 mr-1" /> Prev
            </Button>
            <Button size="sm" className="w-6 h-6 rounded bg-[#084d54] text-white text-[11px] font-bold p-0">1</Button>
            <Button variant="ghost" size="sm" className="w-6 h-6 rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50 p-0">2</Button>
            <Button variant="ghost" size="sm" className="w-6 h-6 rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50 p-0">3</Button>
            <span className="text-slate-300 px-1 text-[11px]">...</span>
            <Button variant="ghost" size="sm" className="w-6 h-6 rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50 p-0">10</Button>
            <Button variant="ghost" size="sm" className="text-[11px] font-medium text-slate-600 hover:text-teal-700 h-8 font-bold">
              Next <ChevronRight className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
