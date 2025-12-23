"use client"

import React from 'react'
import { Search, Bell, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

export function TopBar({ activeItem = 'Inventory', onMenuClick }) {
  return (
    <header className="h-20 bg-white flex items-center justify-between px-4 md:px-8 shrink-0 border-b border-slate-100">
      <div className="flex items-center gap-4">
        <Button 
          variant="ghost"
          size="icon"
          onClick={onMenuClick}
          className="text-slate-500 lg:hidden"
        >
          <Menu className="w-6 h-6" />
        </Button>
        <div className="hidden md:flex items-center gap-2 text-sm">
          <span className="text-slate-400">Operations</span>
          <span className="text-slate-300">/</span>
          <span className="text-teal-700 font-medium">{activeItem}</span>
        </div>
        <div className="md:hidden text-sm font-bold text-teal-700">
          {activeItem}
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-8">
        <div className="relative hidden sm:block">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 z-10" />
          <Input 
            placeholder="Search..." 
            className="pl-12 pr-6 py-2.5 bg-slate-100 border-none rounded-full text-sm focus-visible:ring-teal-600/10 w-48 lg:w-96"
          />
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <Button variant="ghost" size="icon" className="text-slate-500 rounded-full relative">
            <Bell className="w-5 h-5 md:w-6 h-6" />
          </Button>
          
          <button className="flex items-center gap-2 p-1 bg-teal-50 rounded-full transition-colors border border-teal-100">
            <div className="w-7 h-7 md:w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-800 text-[10px] md:text-xs font-bold border border-teal-200">
              ST
            </div>
          </button>
        </div>
      </div>
    </header>
  )
}
