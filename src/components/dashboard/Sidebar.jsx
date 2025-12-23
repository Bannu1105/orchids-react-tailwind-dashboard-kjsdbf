"use client"

import React from 'react'
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  ChevronDown,
  Clock,
  TrendingUp,
  Truck
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Logo } from './Logo'
import { Button } from '@/components/ui/button'

export function Sidebar({ activeItem = 'Dashboard', onNavigate, isOpen, onClose }) {
  const sections = [
    {
      title: 'Operations',
      items: [
        { name: 'Dashboard', icon: LayoutDashboard },
        { name: 'Inventory', icon: Clock },
        { name: 'Product Catalogue', icon: Package },
        { name: 'Orders', icon: ShoppingBag },
        { name: 'Sales & Finance', icon: TrendingUp },
        { name: 'Delivery Partners', icon: Truck },
      ]
    },
    {
      title: 'Growth',
      items: []
    },
    {
      title: 'People',
      items: []
    },
    {
      title: 'System',
      items: []
    }
  ]

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={cn(
          "fixed inset-0 bg-black/50 z-40 lg:hidden transition-opacity duration-300",
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
        onClick={onClose}
      />

      {/* Sidebar Container */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-64 bg-[#084d54] text-slate-300 flex flex-col border-r border-teal-900/20 z-50 transition-transform duration-300 lg:relative lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6">
          <div className="bg-white rounded-lg p-2 flex items-center justify-center cursor-pointer" onClick={() => onNavigate?.('Dashboard')}>
            <Logo className="w-32 h-auto" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto py-2">
          <nav className="px-4 space-y-6">
            {sections.map((section) => (
              <div key={section.title} className="space-y-1">
                <div className="flex items-center justify-between text-[11px] uppercase tracking-wider font-semibold text-teal-100/50 px-3 py-2">
                  <span>{section.title}</span>
                  <ChevronDown className="w-3 h-3" />
                </div>
                
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = activeItem === item.name;
                    return (
                      <button
                        key={item.name}
                        onClick={() => onNavigate(item.name)}
                        className={cn(
                          "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors group",
                          isActive 
                            ? "bg-[#f59e0b] text-[#084d54]" 
                            : "text-white/80 hover:bg-white/10 hover:text-white"
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <item.icon className={cn("w-4 h-4", isActive ? "text-[#084d54]" : "text-white/60 group-hover:text-white")} />
                          <span>{item.name}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        <div className="p-4 mt-auto">
          <div className="text-[10px] text-white/40 text-center">
            Version 1.0.0
          </div>
        </div>
      </div>
    </>
  )
}
