"use client"

import React, { useState } from 'react'
import { 
  X, 
  Check, 
  Clock, 
  MapPin, 
  Truck, 
  Package, 
  ChevronDown,
  Trash2,
  FileText
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { UpdateStatusModal } from './UpdateStatusModal'
import { CancelOrderModal } from './CancelOrderModal'
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

export function OrderDetailsDrawer({ order, isOpen, onClose }) {
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [showCancelModal, setShowCancelModal] = useState(false)

  if (!order) return null

  const steps = [
    { name: 'Order Placed', date: '24/11/2023', time: '14:02', completed: true },
    { name: 'Order Confirmed', date: '24/11/2023', time: '14:22', completed: true },
    { name: 'Order Shipped', date: '24/11/2023', time: '16:02', completed: true },
    { name: 'Order Delivered', date: 'Expected by 10/11/2023', completed: false },
  ]

  return (
    <>
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="w-full sm:max-w-md p-0 flex flex-col bg-white">
          <SheetHeader className="p-6 border-b border-slate-100 flex-row items-center justify-between space-y-0">
            <div className="flex items-center gap-4">
              <SheetTitle className="text-xl font-bold text-[#084d54]">{order.id}</SheetTitle>
              <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded uppercase tracking-wider">
                {order.status}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-[#084d54] bg-[#084d54]/5">
                <Trash2 className="w-5 h-5" />
              </Button>
            </div>
          </SheetHeader>

          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            <div className="space-y-4">
              {steps.map((step, i) => (
                <div key={i} className="flex gap-4 relative">
                  {i !== steps.length - 1 && (
                    <div className={cn(
                      "absolute left-3 top-6 bottom-0 w-[1px]",
                      step.completed ? "bg-teal-600" : "bg-slate-200"
                    )} />
                  )}
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center shrink-0 z-10",
                    step.completed ? "bg-teal-600 text-white" : "bg-white border-2 border-slate-200"
                  )}>
                    {step.completed ? <Check className="w-3.5 h-3.5" /> : null}
                  </div>
                  <div className="flex-1 -mt-0.5">
                    <div className="flex items-center justify-between">
                      <span className={cn("text-sm font-medium", step.completed ? "text-slate-900" : "text-slate-400")}>
                        {step.name}
                      </span>
                      {step.date && (
                        <span className="text-[10px] text-slate-400 font-mono">
                          {step.date} | {step.time}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Customer Info</h3>
              <div className="space-y-1">
                <p className="text-sm font-semibold text-slate-800">Mr. Sudheer Reddy</p>
                <p className="text-sm text-slate-500 leading-relaxed">
                  N504, Likitha Pride Appartments, Near APIC,<br />
                  Mangalagiri, Guntur, Andhra Pradesh - 522503
                </p>
              </div>
            </div>

            <div className="space-y-3">
              <h3 className="text-sm font-bold text-slate-900">Select Delivery Partner</h3>
              <Select defaultValue="blue-dart">
                <SelectTrigger className="w-full bg-teal-50 border-teal-100 text-teal-700 font-medium">
                  <SelectValue placeholder="Select Delivery Partner" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="blue-dart">Blue Dart Express</SelectItem>
                  <SelectItem value="delhivery">Delhivery</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
              <div className="w-16 h-16 bg-white rounded-lg border border-slate-200 overflow-hidden shrink-0">
                <img 
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&h=200&fit=crop" 
                  alt="Product"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="text-sm font-bold text-slate-900">T-Shirts</h4>
                <p className="text-xs text-slate-500 mt-1">Soft Design Henley Neck T-shirt</p>
                <p className="text-xs font-bold text-slate-700 mt-1">Size: XL</p>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <h3 className="text-sm font-bold text-slate-900">Invoice</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between text-slate-500">
                  <span>Sub Total</span>
                  <span className="text-slate-900 font-medium">₹ 1490</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Discount (WINTER20)</span>
                  <span className="text-teal-600 font-medium">- ₹ 400</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Tax</span>
                  <span className="text-slate-900 font-medium">₹ 32</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Platform Fee</span>
                  <span className="text-slate-900 font-medium">₹ 20</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping Fee</span>
                  <span className="text-slate-900 font-medium">₹ 50</span>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-slate-100 flex gap-3">
            <Button 
              variant="outline"
              onClick={() => setShowCancelModal(true)}
              className="flex-1 py-6 rounded-xl"
            >
              Cancel Order
            </Button>
            <Button 
              onClick={() => setShowUpdateModal(true)}
              className="flex-1 py-6 bg-[#084d54] text-white rounded-xl"
            >
              Update Status
            </Button>
          </div>
        </SheetContent>
      </Sheet>

      <UpdateStatusModal 
        isOpen={showUpdateModal} 
        onClose={() => setShowUpdateModal(false)} 
      />
      <CancelOrderModal 
        isOpen={showCancelModal} 
        onClose={() => setShowCancelModal(false)} 
      />
    </>
  )
}
