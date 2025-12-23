"use client"

import React from 'react'
import { X, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'

export function UpdateStatusModal({ isOpen, onClose }) {
  const steps = [
    { label: 'Confirmed', completed: true },
    { label: 'Packed', current: true },
    { label: 'Shipped', pending: true },
    { label: 'Delivered', pending: true },
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-white rounded-[32px] p-0 overflow-hidden border-none">
        <div className="p-8 md:p-10">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-slate-900 mb-8">Update Order Status</DialogTitle>
          </DialogHeader>

          <div className="flex items-center justify-between mb-10 relative">
            <div className="absolute left-0 right-0 top-4 h-[2px] bg-slate-100 -z-10" />
            {steps.map((step, i) => (
              <div key={i} className="flex flex-col items-center gap-2">
                <div className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold transition-all border-2",
                  step.completed ? "bg-teal-600 border-teal-600 text-white" : 
                  step.current ? "bg-teal-50 border-teal-600 text-teal-600" :
                  "bg-white border-slate-200 text-slate-400"
                )}>
                  {step.completed ? <Check className="w-4 h-4" /> : i + 1}
                </div>
                <span className={cn(
                  "text-[10px] font-bold uppercase tracking-wider",
                  step.completed || step.current ? "text-teal-600" : "text-slate-400"
                )}>
                  {step.label}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-left">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Package Count</Label>
              <Input 
                type="number" 
                defaultValue={1}
                className="bg-slate-50 border-slate-200 rounded-xl"
              />
            </div>

            <div className="space-y-2 text-left">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Packing Notes (Optional)</Label>
              <Textarea 
                placeholder="Add any specific instructions for packing..."
                className="bg-slate-50 border-slate-200 rounded-xl min-h-[100px]"
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 mt-10">
            <Button 
              variant="ghost"
              onClick={onClose}
              className="text-sm font-bold text-slate-500"
            >
              Cancel
            </Button>
            <Button className="px-8 py-2.5 bg-[#084d54] text-white rounded-xl text-sm font-bold">
              Mark
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
