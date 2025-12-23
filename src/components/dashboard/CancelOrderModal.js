"use client"

import React from 'react'
import { X, AlertTriangle, ChevronDown } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export function CancelOrderModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-xl bg-white rounded-[32px] p-0 overflow-hidden border-none">
        <div className="p-8 md:p-10">
          <DialogHeader>
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <DialogTitle className="text-xl font-bold text-red-500">Cancel Order</DialogTitle>
            </div>
          </DialogHeader>

          <div className="p-4 bg-red-50 rounded-xl mb-8">
            <p className="text-sm text-red-700 leading-relaxed font-medium">
              Warning: This action cannot be undone. Inventory will be restacked automatically.
            </p>
          </div>

          <div className="space-y-6">
            <div className="space-y-2 text-left">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Reason for Cancellation</Label>
              <Select>
                <SelectTrigger className="w-full bg-white border-slate-200 rounded-xl">
                  <SelectValue placeholder="Select a reason..." />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="out-of-stock">Out of Stock</SelectItem>
                  <SelectItem value="customer-request">Customer Request</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2 text-left">
              <Label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest">Notes</Label>
              <Textarea 
                placeholder="Add any additional notes about the cancellation..."
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
              Back
            </Button>
            <Button className="px-8 py-2.5 bg-red-500 text-white rounded-xl text-sm font-bold shadow-lg shadow-red-200">
              Confirm Cancel
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
