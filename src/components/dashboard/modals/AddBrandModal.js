"use client"

import React from 'react'
import { X, Upload } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export function AddBrandModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white rounded-3xl p-0 overflow-hidden border-none">
        <DialogHeader className="px-8 py-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-[#084d54]">Add Brand</DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-6">
          <div className="grid grid-cols-2 gap-6">
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500">Brand Name</Label>
              <Input 
                placeholder="Enter brand name" 
                className="bg-slate-50 border-slate-200 rounded-xl focus-visible:ring-teal-500"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs font-semibold text-slate-500">Brand Icon</Label>
              <div className="relative group">
                <Input 
                  placeholder="Upload Brand Icon" 
                  className="bg-slate-50 border-slate-200 rounded-xl pr-10 text-[11px]"
                  readOnly
                />
                <Button variant="ghost" size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8 text-slate-400 hover:text-teal-600">
                  <Upload className="w-4 h-4" />
                </Button>
              </div>
              <p className="text-[10px] text-amber-500 font-medium">Icon should be 50px X 50px</p>
            </div>
          </div>

          <button className="text-sm font-bold text-[#084d54] underline underline-offset-4 decoration-2">
            Save & Add Another
          </button>
        </div>

        <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-end gap-3">
          <Button 
            variant="outline"
            onClick={onClose}
            className="px-8 py-3 border-slate-200 rounded-xl text-sm font-bold text-slate-600 h-auto"
          >
            Cancel
          </Button>
          <Button className="px-8 py-3 bg-[#084d54] text-white rounded-xl text-sm font-bold hover:bg-teal-900 h-auto shadow-lg shadow-teal-900/10">
            Save Brand
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
