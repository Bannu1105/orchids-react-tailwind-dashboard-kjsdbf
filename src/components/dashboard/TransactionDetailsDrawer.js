"use client"

import React from 'react'
import { 
  X, 
  Clock, 
  CheckCircle2, 
  User, 
  CreditCard, 
  FileText,
  ChevronRight,
  ExternalLink
} from 'lucide-react'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function TransactionDetailsDrawer({ open, onOpenChange, transaction }) {
  if (!transaction) return null

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] sm:w-[540px] p-0 border-none">
        <div className="h-full flex flex-col bg-white">
          <SheetHeader className="p-6 border-b border-slate-100 flex-row items-center justify-between space-y-0">
            <SheetTitle className="text-xl font-bold text-slate-800">Transaction Details</SheetTitle>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Transaction ID</p>
                <h3 className="text-lg font-bold text-slate-800">{transaction.id}</h3>
                <div className="mt-4">
                  <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-1">Amount Paid</p>
                  <p className="text-2xl font-black text-slate-900">{transaction.amount}</p>
                </div>
              </div>
              <Badge className="bg-emerald-50 text-emerald-600 border border-emerald-100 px-3 py-1 rounded-full font-bold text-[10px] uppercase">
                Success
              </Badge>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Method</p>
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 bg-slate-800 rounded flex items-center justify-center text-[10px] text-white font-bold italic">
                    UPI
                  </div>
                  <span className="text-sm font-bold text-slate-700">UPI</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-2">Settlement</p>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-bold text-slate-700">Settled</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Linked Order</p>
                <Badge className="bg-teal-900 text-white border-none rounded-md px-2 py-0.5 text-[10px] font-bold">NEW</Badge>
              </div>
              <div className="p-4 border border-slate-100 rounded-xl flex items-center justify-between group cursor-pointer hover:border-teal-100 transition-colors">
                <div>
                  <p className="text-xs font-bold text-slate-800">ORD-5541</p>
                  <p className="text-[10px] text-slate-400 font-medium">Customer: Aman Sharma</p>
                </div>
                <ExternalLink className="w-4 h-4 text-slate-300 group-hover:text-teal-600 transition-colors" />
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">Activity Log</p>
              <div className="space-y-8 relative before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                <TimelineItem 
                  title="Payment link generated"
                  time="14:20 PM"
                  user="System"
                  isFirst
                />
                <TimelineItem 
                  title="Customer initiated UPI payment"
                  time="14:22 PM"
                  user="Customer"
                />
                <TimelineItem 
                  title="Payment Successful"
                  time="14:23 PM"
                  user="Razorpay"
                  isSuccess
                />
                <TimelineItem 
                  title="Admin viewed record"
                  time="16:45 PM"
                  user="Raghav Mehra"
                />
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 bg-slate-50/50">
            <Button className="w-full bg-[#084d54] hover:bg-[#063a3f] text-white font-bold h-12 rounded-xl shadow-lg shadow-teal-900/10">
              Mark as Reconciled
            </Button>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}

function TimelineItem({ title, time, user, isFirst, isSuccess }) {
  return (
    <div className="flex gap-4 relative">
      <div className={cn(
        "w-4 h-4 rounded-full border-2 border-white ring-2 z-10 shrink-0 mt-1",
        isSuccess ? "bg-emerald-500 ring-emerald-100" : "bg-slate-300 ring-slate-100"
      )} />
      <div className="space-y-1">
        <p className="text-sm font-bold text-slate-800">{title}</p>
        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
          <span>{time}</span>
          <span>•</span>
          <span>{user}</span>
        </div>
      </div>
    </div>
  )
}
