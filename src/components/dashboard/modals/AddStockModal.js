"use client"

import React from 'react'
import { X, Plus, Minus, ChevronDown } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function AddStockModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl bg-white rounded-3xl p-0 overflow-hidden border-none">
        <DialogHeader className="px-8 py-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-[#084d54]">Add Single Stock Item</DialogTitle>
          <p className="text-xs text-slate-400 mt-0.5 font-medium uppercase tracking-wider text-left">Create one variant entry and set initial stock quantity.</p>
        </DialogHeader>

        <div className="p-8 space-y-8 max-h-[70vh] overflow-y-auto">
          <section>
            <h3 className="text-[11px] font-bold text-[#084d54] uppercase tracking-widest mb-4">Product Identifiers</h3>
            <div className="grid grid-cols-1 gap-5">
              <div className="space-y-1.5">
                <Label className="text-xs font-semibold text-slate-500">Product Title</Label>
                <Input 
                  placeholder="eg. ZENZ Oversized Cotton Shirt" 
                  className="bg-slate-50 border-slate-100 rounded-xl focus-visible:ring-teal-500"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-500">SKU ID</Label>
                  <Input 
                    placeholder="eg. ZNZ-MN-OCS-BLK-M" 
                    className="bg-slate-50 border-slate-100 rounded-xl focus-visible:ring-teal-500"
                  />
                  <p className="text-[10px] text-slate-400 font-medium italic">Unique identifier per variant</p>
                </div>
                <div className="space-y-1.5 text-left">
                  <Label className="text-xs font-semibold text-slate-500">Brand</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-50 border-slate-100 rounded-xl">
                      <SelectValue placeholder="Select Brand" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zenz">Zenz</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-[11px] font-bold text-[#084d54] uppercase tracking-widest mb-4">Variant & Style Attributes</h3>
            <div className="grid grid-cols-2 gap-5">
              {[
                { label: 'Size', placeholder: 'Select Size' },
                { label: 'Fit', placeholder: 'Select Fit' },
                { label: 'Color', placeholder: 'Select Color' },
                { label: 'Pattern', placeholder: 'Select Pattern' },
                { label: 'Material', placeholder: 'Select Material' },
                { label: 'Season', placeholder: 'Select Season' }
              ].map((field) => (
                <div key={field.label} className="space-y-1.5">
                  <Label className="text-xs font-semibold text-slate-500">{field.label}</Label>
                  <Select>
                    <SelectTrigger className="bg-slate-50 border-slate-100 rounded-xl">
                      <SelectValue placeholder={field.placeholder} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="option1">Option 1</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              ))}
            </div>
          </section>

          <div className="bg-sky-50/50 border border-sky-100 rounded-2xl p-6 flex items-center justify-between">
            <div>
              <h4 className="text-[13px] font-bold text-[#084d54]">Inventory Details</h4>
              <p className="text-[10px] text-slate-500 font-medium mt-0.5">Set your initial stock level for this variant.</p>
            </div>
            <div className="text-right">
              <Label className="text-[10px] font-bold text-[#084d54] uppercase block mb-2">Total Stock Quantity*</Label>
              <div className="flex items-center gap-4 bg-white border border-slate-200 rounded-lg px-3 py-1.5">
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-teal-600">
                  <Minus className="w-4 h-4" />
                </Button>
                <span className="text-sm font-bold text-slate-900 w-8 text-center">100</span>
                <Button variant="ghost" size="icon" className="h-6 w-6 text-slate-400 hover:text-teal-600">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 border-t border-slate-100 flex items-center justify-between">
          <button className="text-sm font-bold text-[#084d54] underline underline-offset-4 decoration-2">
            Save & Add Another
          </button>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline"
              onClick={onClose}
              className="px-8 py-3 border-slate-200 rounded-xl text-sm font-bold text-slate-600 h-auto"
            >
              Cancel
            </Button>
            <Button className="px-8 py-3 bg-[#084d54] text-white rounded-xl text-sm font-bold hover:bg-teal-900 h-auto shadow-lg shadow-teal-900/10">
              Save Item
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
