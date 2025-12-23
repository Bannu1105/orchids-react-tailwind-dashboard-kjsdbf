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

interface OrderDetailsDrawerProps {
  order: any
  isOpen: boolean
  onClose: () => void
}

export function OrderDetailsDrawer({ order, isOpen, onClose }: OrderDetailsDrawerProps) {
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
      <div 
        className={cn(
          "fixed inset-0 bg-black/20 z-[60] transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />
      
      <div className={cn(
        "fixed inset-y-0 right-0 w-full max-w-md bg-white shadow-2xl z-[70] transition-transform duration-300 transform flex flex-col",
        isOpen ? "translate-x-0" : "translate-x-full"
      )}>
        {/* Header */}
        <div className="p-6 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-bold text-[#084d54]">{order.id}</h2>
            <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold rounded uppercase tracking-wider">
              {order.status}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-[#084d54] bg-[#084d54]/5 rounded-lg hover:bg-[#084d54]/10">
              <Trash2 className="w-5 h-5" />
            </button>
            <button 
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          {/* Timeline */}
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

          {/* Customer Info */}
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

          {/* Delivery Partner */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold text-slate-900">Select Delivery Partner</h3>
            <button className="w-full flex items-center justify-between px-4 py-2 bg-teal-50 border border-teal-100 rounded-lg text-sm text-teal-700">
              <span className="font-medium">Blue Dart Express</span>
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>

          {/* Product Info */}
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
              <p className="text-xs text-slate-500 mt-1">Self Design Henley Neck T-shirt</p>
              <p className="text-xs font-bold text-slate-700 mt-1">Size: XL</p>
            </div>
          </div>

          {/* Invoice */}
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

        {/* Actions */}
        <div className="p-6 border-t border-slate-100 flex gap-3">
          <button 
            onClick={() => setShowCancelModal(true)}
            className="flex-1 py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50"
          >
            Cancel Order
          </button>
          <button 
            onClick={() => setShowUpdateModal(true)}
            className="flex-1 py-3 bg-[#084d54] text-white rounded-xl text-sm font-bold hover:bg-[#063a3f]"
          >
            Update Status
          </button>
        </div>
      </div>

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
