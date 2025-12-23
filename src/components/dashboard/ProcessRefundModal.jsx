"use client"

import React from 'react'
import { X, AlertCircle, ChevronDown } from 'lucide-react'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ProcessRefundModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg bg-white rounded-3xl p-0 overflow-hidden border-none">
        <DialogHeader className="p-6 border-b border-slate-100">
          <DialogTitle className="text-xl font-bold text-[#084d54]">Process Refund</DialogTitle>
          <p className="text-[10px] font-bold text-slate-400 tracking-widest uppercase mt-1 text-left">REF-NEW-901</p>
        </DialogHeader>

        <div className="p-6 space-y-6">
          <div className="flex items-start gap-3 p-4 bg-blue-50/50 border border-blue-100 rounded-2xl">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 shrink-0" />
            <p className="text-xs text-blue-700 font-medium leading-relaxed">
              Full Refund Advised. Customer returned item in original condition.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5 text-left">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Refund Type</Label>
              <Select defaultValue="full">
                <SelectTrigger className="bg-slate-50 border-slate-200 rounded-xl">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="partial">Partial Refund</SelectItem>
                  <SelectItem value="full">Full Refund</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5 text-left">
              <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Amount (₹)</Label>
              <Input 
                type="number" 
                defaultValue="3500"
                className="bg-slate-50 border-slate-200 rounded-xl font-bold"
              />
            </div>
          </div>

          <div className="space-y-3 text-left">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Refund Destination</Label>
            <div className="grid grid-cols-2 gap-3">
              <button className="flex items-center justify-between p-4 border-2 border-teal-500 bg-teal-50/30 rounded-2xl text-left transition-all">
                <div>
                  <p className="text-xs font-bold text-[#084d54]">Original Source</p>
                  <p className="text-[10px] text-slate-500">HDFC Bank ...8892</p>
                </div>
                <div className="w-4 h-4 rounded-full border-4 border-teal-500 bg-white" />
              </button>
              <button className="flex items-center justify-between p-4 border border-slate-200 hover:border-slate-300 rounded-2xl text-left transition-all">
                <div>
                  <p className="text-xs font-bold text-slate-900">Store Wallet</p>
                  <p className="text-[10px] text-slate-500">Instant credit</p>
                </div>
                <div className="w-4 h-4 rounded-full border border-slate-200" />
              </button>
            </div>
          </div>

          <div className="space-y-1.5 text-left">
            <Label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Internal Note / Transaction Ref</Label>
            <Input 
              placeholder="Optional reference..."
              className="bg-slate-50 border-slate-200 rounded-xl"
            />
          </div>

          <Button 
            className="w-full py-6 bg-[#084d54] text-white font-bold text-sm rounded-2xl shadow-lg shadow-teal-900/20"
          >
            Initiate Refund
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
