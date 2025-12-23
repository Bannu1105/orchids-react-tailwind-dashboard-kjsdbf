"use client"

import React from 'react'
import { 
  X, 
  CheckCircle2, 
  AlertCircle,
  ChevronDown
} from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function ApproveRefundModal({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl p-0 overflow-hidden border-none rounded-2xl shadow-2xl">
        <DialogHeader className="px-8 py-6 border-b border-slate-100 flex-row items-center justify-between space-y-0 bg-white">
          <DialogTitle className="text-xl font-bold text-slate-800">Approve Refund</DialogTitle>
        </DialogHeader>

        <div className="p-8 space-y-8 bg-white">
          <div className="bg-teal-50/30 border border-teal-100/50 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-[10px] uppercase font-bold text-teal-700/60 tracking-wider">Order #5530 Summary</p>
              <p className="text-xs font-bold text-slate-400">Paid: <span className="text-slate-800">₹ 2,499</span></p>
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-800">Linen Cotton Trousers (Olive) x 1</h4>
              <p className="text-[10px] text-slate-400 font-medium">Request by: Karan Johar • 2 hrs ago</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Refund Type</label>
              <div className="grid grid-cols-2 gap-3 p-1 bg-slate-100 rounded-xl">
                <Button variant="ghost" className="bg-white text-slate-800 font-bold shadow-sm hover:bg-white rounded-lg h-10">Full Refund</Button>
                <Button variant="ghost" className="text-slate-500 font-medium hover:bg-slate-200/50 rounded-lg h-10">Partial Refund</Button>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Refund Amount (₹)</label>
              <div className="relative">
                <input 
                  type="text" 
                  defaultValue="500"
                  className="w-full h-12 bg-slate-50 border border-slate-100 rounded-xl px-4 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-teal-500/10"
                />
                <p className="mt-2 text-[10px] text-slate-400 font-medium">Refund will be credited to original payment method (UPI).</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Reason for Refund</label>
              <Select defaultValue="size-mismatch">
                <SelectTrigger className="w-full h-12 bg-white border-slate-200 rounded-xl font-medium text-slate-800 focus:ring-teal-500/10">
                  <SelectValue placeholder="Select reason" />
                </SelectTrigger>
                <SelectContent className="rounded-xl border-slate-100 shadow-xl">
                  <SelectItem value="size-mismatch">Size Mismatch</SelectItem>
                  <SelectItem value="defective">Defective Item</SelectItem>
                  <SelectItem value="not-as-described">Not as described</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-3 pt-2">
              <Checkbox id="notify" defaultChecked className="w-5 h-5 rounded-md border-slate-300 data-[state=checked]:bg-teal-600 data-[state=checked]:border-teal-600" />
              <label htmlFor="notify" className="text-xs font-bold text-slate-700 cursor-pointer">
                Notify customer via WhatsApp & Email
              </label>
            </div>
          </div>
        </div>

        <div className="px-8 py-6 bg-slate-50/50 border-t border-slate-100 flex items-center gap-4">
          <Button variant="outline" className="flex-1 h-12 rounded-xl font-bold border-slate-200 text-slate-600 hover:bg-white transition-all" onClick={() => onOpenChange(false)}>
            Reject Request
          </Button>
          <Button className="flex-1 h-12 rounded-xl font-bold bg-[#084d54] hover:bg-[#063a3f] text-white shadow-lg shadow-teal-900/10 transition-all">
            Approve & Initiate
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
