"use client"

import React from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

export function AddToCampaignDrawer({ isOpen, onClose }) {
  if (!isOpen) return null

  const placements = [
    "Home Banner", "Right Side", "Category Ribbon", "Men", "Women", "Kids", "ZENZ", "Home & Furniture", "Footer"
  ]

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div 
        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300" 
        onClick={onClose} 
      />
      
      <div className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col animate-in slide-in-from-right duration-500 ease-out">
        <div className="flex items-center justify-between p-6 border-b border-slate-100">
          <h2 className="text-xl font-bold text-slate-900">Add to Campaign</h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="rounded-full">
            <X className="w-5 h-5 text-slate-400" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Campaign</label>
            <Select>
              <SelectTrigger className="w-full h-12 bg-slate-50 border-none font-bold text-slate-900">
                <SelectValue placeholder="Select Campaign" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="summer">Summer Collection 2024</SelectItem>
                <SelectItem value="festive">Festive Sale</SelectItem>
                <SelectItem value="clearance">Clearance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-4">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Placements</label>
            <div className="space-y-3">
              {placements.map((placement) => (
                <div 
                  key={placement}
                  className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl border border-slate-100 hover:border-slate-200 transition-all cursor-pointer group"
                >
                  <span className="text-sm font-bold text-slate-700">{placement}</span>
                  <Checkbox className="w-5 h-5 rounded border-slate-300 data-[state=checked]:bg-[#084d54] data-[state=checked]:border-[#084d54]" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Discount Overlay</label>
            <Input 
              placeholder="Enter discount percentage %" 
              className="h-12 bg-slate-50 border-none font-bold placeholder:text-slate-400"
            />
          </div>

          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Banner</label>
            <Select>
              <SelectTrigger className="w-full h-12 bg-slate-50 border-none font-bold text-slate-900">
                <SelectValue placeholder="Select Banner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="banner1">Hero Slider Banner</SelectItem>
                <SelectItem value="banner2">Secondary Grid Banner</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="p-6 border-t border-slate-100">
          <Button 
            className="w-full h-12 bg-[#084d54] hover:bg-[#063a40] text-white font-bold rounded-xl"
            onClick={onClose}
          >
            Save & Add
          </Button>
        </div>
      </div>
    </div>
  )
}
