"use client"

import React, { useState } from 'react'
import { X, ChevronDown, Plus, Minus } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Textarea } from '@/components/ui/textarea'

export function AdjustStockModal({ isOpen, onClose }) {
  const [operation, setOperation] = useState('add') // 'add', 'remove', 'set'
  const [quantity, setQuantity] = useState(100)
  const [skuSearch, setSkuSearch] = useState('')
  
  const currentStock = 120
  const newStock = operation === 'add' ? currentStock + quantity : 
                   operation === 'remove' ? currentStock - quantity : 
                   quantity

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-[400px] p-0 border-none bg-white overflow-y-auto">
        <SheetHeader className="p-6 border-b border-slate-100 flex-row items-center justify-between sticky top-0 bg-white z-10 space-y-0">
          <SheetTitle className="text-lg font-bold text-slate-900">Adjust Stock</SheetTitle>
        </SheetHeader>

        <div className="p-6 space-y-8">
          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Search SKU Code</Label>
            <div className="relative">
              <Input 
                placeholder="Search SKU Code..."
                value={skuSearch}
                onChange={(e) => setSkuSearch(e.target.value)}
                className="bg-slate-50 border-slate-200 rounded-lg focus:bg-white focus-visible:ring-teal-500"
              />
            </div>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Operation</Label>
            <RadioGroup value={operation} onValueChange={setOperation} className="flex flex-wrap gap-4">
              {[
                { id: 'add', label: 'Add Stock' },
                { id: 'remove', label: 'Remove Stock' },
                { id: 'set', label: 'Set Absolute' }
              ].map((op) => (
                <div key={op.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={op.id} id={op.id} />
                  <Label htmlFor={op.id} className={cn(
                    "text-[11px] font-bold cursor-pointer",
                    operation === op.id ? "text-[#084d54]" : "text-slate-500"
                  )}>{op.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div className="space-y-3">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Stock Quantity</Label>
            <div className="flex items-center">
              <Button 
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(0, quantity - 1))}
                className="rounded-r-none h-10 border-slate-200"
              >
                <Minus className="w-4 h-4" />
              </Button>
              <Input 
                type="number" 
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                className="rounded-none h-10 border-x-0 text-center text-sm font-bold text-slate-900"
              />
              <Button 
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
                className="rounded-l-none h-10 border-slate-200"
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Notes</Label>
            <Textarea 
              placeholder="Enter PO number or details..."
              className="bg-white border-slate-200 rounded-xl min-h-[100px] focus-visible:ring-teal-500"
            />
          </div>

          <div className="space-y-3 pt-4 border-t border-slate-50">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Impact Preview</Label>
            <div className="p-4 bg-slate-50 rounded-xl flex items-center justify-between text-[9px] font-bold uppercase">
              <p className="text-slate-400">Current: {currentStock}</p>
              <div className="h-px flex-1 mx-4 bg-slate-200 relative">
                <div className="absolute right-0 -top-1 border-t-4 border-l-4 border-transparent border-l-slate-200" />
              </div>
              <p className="text-teal-600">New: {newStock}</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 flex gap-4 sticky bottom-0 bg-white">
          <Button 
            variant="outline"
            onClick={onClose}
            className="flex-1 py-3 h-auto"
          >
            Cancel
          </Button>
          <Button 
            onClick={onClose}
            className="flex-1 py-3 bg-[#084d54] text-white hover:bg-teal-900 h-auto shadow-md"
          >
            Save Adjustment
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
