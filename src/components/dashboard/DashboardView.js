"use client"

import React from 'react'
import { StatCard } from './StatCard'
import { RevenueTrend } from './RevenueTrend'
import { OrdersTrend } from './OrdersTrend'
import { SalesByCategory } from './SalesByCategory'
import { RecentOrders } from './RecentOrders'
import { LowStockAlerts } from './LowStockAlerts'
import { ReturnsRefunds } from './ReturnsRefunds'
import { 
  ShoppingBag, 
  DollarSign, 
  ArrowUpRight, 
  Users, 
  Percent, 
  Clock, 
  AlertTriangle,
  RotateCcw,
  Calendar,
  Layers
} from 'lucide-react'
import { Button } from '@/components/ui/button'

export function DashboardView() {
  const stats = [
    { title: 'Total Orders', value: '1298', trend: '12.5%', icon: <ShoppingBag className="w-4 h-4" /> },
    { title: 'Revenue Gross', value: '₹ 142.90k', trend: '8.2%', icon: <DollarSign className="w-4 h-4" /> },
    { title: 'Revenue Net', value: '₹ 123.89k', trend: '5.4%', icon: <ArrowUpRight className="w-4 h-4" /> },
    { title: 'Avg Order Value', value: '₹ 1,378', trend: '2.1%', icon: <Users className="w-4 h-4" /> },
    { title: 'Conversion Rate', value: '2.85%', trend: '1.2%', icon: <Percent className="w-4 h-4" /> },
    { title: 'Pending Orders', value: '25', trend: '4.5%', icon: <Clock className="w-4 h-4" /> },
    { title: 'Low Stock SKUs', value: '08', trend: '0.5%', isPositive: false, icon: <AlertTriangle className="w-4 h-4" /> },
    { title: 'Refunds Pending', value: '₹ 1,378', trend: '3.2%', isPositive: false, icon: <RotateCcw className="w-4 h-4" /> },
  ]

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col gap-6">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
        <h1 className="text-xl font-bold text-slate-900">Dashboard Overview</h1>
        
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 text-amber-700 rounded-full border border-amber-100 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
            <span className="hidden xs:inline">6 Orders ready for dispatch</span>
            <span className="xs:hidden">6 Dispatch</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-50 text-rose-700 rounded-full border border-rose-100 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 bg-rose-500 rounded-full" />
            <span className="hidden xs:inline">4 Returns Pending</span>
            <span className="xs:hidden">4 Returns</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 bg-sky-50 text-sky-700 rounded-full border border-sky-100 text-[10px] font-semibold">
            <span className="w-1.5 h-1.5 bg-sky-500 rounded-full" />
            <span className="hidden xs:inline">4 SKUs Low Stock</span>
            <span className="xs:hidden">4 Low Stock</span>
          </div>
          
          <div className="hidden sm:block h-6 w-px bg-slate-200 mx-2" />
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-2 text-[11px] h-8">
              <Calendar className="w-3 h-3" />
              Last 7 Days
            </Button>
            <Button variant="outline" size="sm" className="flex-1 sm:flex-none gap-2 text-[11px] h-8">
              <Layers className="w-3 h-3" />
              Category
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <StatCard key={i} {...stat} />
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RevenueTrend />
        <OrdersTrend />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-1">
          <SalesByCategory />
        </div>
        <div className="lg:col-span-1">
          <LowStockAlerts />
        </div>
        <div className="lg:col-span-1 flex flex-col gap-6">
          <div className="flex-1">
            <RecentOrders />
          </div>
          <div className="h-40">
            <ReturnsRefunds />
          </div>
        </div>
      </div>
    </main>
  )
}
