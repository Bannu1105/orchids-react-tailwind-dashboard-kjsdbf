"use client"

import React from 'react'
import { AlertCircle } from 'lucide-react'

interface AlertItem {
  name: string
  sku: string
  stock: number
  min: number
}

const alerts: AlertItem[] = [
  { name: 'Wireless Headphones', sku: 'WH-100-B', stock: 4, min: 10 },
  { name: 'Smart Watch Series 5', sku: 'SW-S5-44', stock: 2, min: 5 },
  { name: 'Leather Wallet Brown', sku: 'LW-BR-01', stock: 0, min: 8 },
  { name: 'USB-C Cable 2m', sku: 'UC-2M-W', stock: 12, min: 20 },
]

export function LowStockAlerts() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-full">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900">Low Stock Alerts</h3>
        <span className="px-2 py-0.5 bg-rose-50 text-rose-600 text-[10px] font-bold rounded-full">
          {alerts.length} Items
        </span>
      </div>
      
      <div className="space-y-4">
        {alerts.map((item) => (
          <div key={item.sku} className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg group hover:bg-slate-100 transition-colors">
            <div className={`p-2 rounded-md ${item.stock === 0 ? 'bg-rose-100 text-rose-600' : 'bg-amber-100 text-amber-600'}`}>
              <AlertCircle className="w-4 h-4" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <p className="text-[11px] font-bold text-slate-900">{item.name}</p>
                <span className="text-[10px] text-slate-400 font-mono">{item.sku}</span>
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-1 bg-slate-200 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${item.stock === 0 ? 'bg-rose-500' : 'bg-amber-500'}`}
                    style={{ width: `${Math.min((item.stock / item.min) * 100, 100)}%` }}
                  />
                </div>
                <span className="text-[10px] font-bold text-slate-600">
                  {item.stock}/{item.min}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button className="w-full mt-6 py-2 bg-white border border-slate-200 text-slate-600 text-[11px] font-bold rounded-lg hover:bg-slate-50 transition-colors">
        Manage Inventory
      </button>
    </div>
  )
}
