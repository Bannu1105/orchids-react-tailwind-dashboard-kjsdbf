"use client"

import React from 'react'
import { X, CheckCircle2, Circle, ChevronRight, HelpCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from '@/components/ui/textarea'

export function ReturnDetailsDrawer({ returnItem, isOpen, onClose, onApproveRefund }) {
  if (!returnItem) return null

  const timeline = [
    { status: 'REQUESTED', date: 'Oct 22, 10:00 AM', completed: true },
    { status: 'APPROVED', date: 'Oct 23, 05:00 PM', completed: true },
    { status: 'PICKUP SCHEDULED', date: 'Oct 24, 09:00 AM', completed: true },
    { status: 'RECEIVED AT WAREHOUSE', date: 'Pending', completed: true, current: true },
    { status: 'QC CHECK', date: 'Pending', completed: false },
    { status: 'REFUND INITIATED', date: 'Pending', completed: false },
  ]

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full md:max-w-[600px] p-0 flex flex-col bg-white">
        <SheetHeader className="p-6 border-b border-slate-100 flex-row items-center justify-between space-y-0">
          <div>
            <SheetTitle className="text-xl font-bold text-[#084d54]">ORD-9893</SheetTitle>
            <p className="text-xs text-slate-400">Linked to Order ORD-7250</p>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-[180px_1fr] h-full">
            <div className="p-6 border-r border-slate-50 bg-slate-50/30">
              <h3 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mb-6">Timeline</h3>
              <div className="space-y-8 relative">
                <div className="absolute left-[11px] top-2 bottom-2 w-[2px] bg-slate-200" />
                
                {timeline.map((step, i) => (
                  <div key={i} className="relative pl-8">
                    <div className={cn(
                      "absolute left-0 top-0 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center z-10",
                      step.completed ? "border-teal-500 bg-teal-50" : "border-slate-200",
                      step.current && "border-teal-500 ring-4 ring-teal-500/10"
                    )}>
                      {step.completed ? (
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      ) : (
                        <Circle className="w-3 h-3 text-slate-300" />
                      )}
                    </div>
                    <div className="flex flex-col">
                      <span className={cn(
                        "text-[10px] font-bold tracking-tight",
                        step.completed ? "text-slate-900" : "text-slate-400"
                      )}>
                        {step.status}
                      </span>
                      <span className="text-[10px] text-slate-400">{step.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 space-y-8">
              <div className="flex gap-4 p-4 bg-white border border-slate-100 rounded-xl">
                <div className="w-20 h-20 bg-slate-100 rounded-lg overflow-hidden shrink-0">
                  <img src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 truncate">T-Shirts</h4>
                      <p className="text-xs text-slate-500">Soft Design Henley Neck T-shirt</p>
                      <p className="text-xs font-medium text-slate-700 mt-1">Size: XL</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Quality Check</h3>
                  <span className="px-2 py-0.5 bg-red-50 text-red-600 text-[9px] font-bold rounded uppercase">Required</span>
                </div>
                
                <div className="space-y-4 p-4 bg-slate-50/50 rounded-xl border border-slate-100">
                  <div>
                    <label className="text-[11px] font-medium text-slate-600 mb-1.5 block uppercase tracking-tight">Condition upon receipt</label>
                    <Select>
                      <SelectTrigger className="w-full bg-white">
                        <SelectValue placeholder="Select condition..." />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="mint">Mint Condition</SelectItem>
                        <SelectItem value="used">Slightly Used</SelectItem>
                        <SelectItem value="damaged">Damaged</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-[11px] font-medium text-slate-600 block uppercase tracking-tight">Admin Remarks</label>
                    </div>
                    <Textarea 
                      placeholder="Notes for finance team..."
                      className="bg-white min-h-[80px]"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-teal-50/30 rounded-xl border border-teal-50">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Est. Refund Amount</p>
                    <p className="text-xl font-bold text-[#084d54]">₹ 3,500.00</p>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Original Pay Mode</p>
                    <p className="text-xs font-medium text-slate-700">UPI (PhonePe)</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100 bg-white">
          <div className="flex gap-4">
            <Button 
              variant="outline"
              className="flex-1 py-6 border-red-200 text-red-600 font-bold"
            >
              Return Reject
            </Button>
            <Button 
              onClick={onApproveRefund}
              className="flex-1 py-6 bg-[#084d54] text-white font-bold shadow-lg shadow-teal-900/10"
            >
              Approve & Refund
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
