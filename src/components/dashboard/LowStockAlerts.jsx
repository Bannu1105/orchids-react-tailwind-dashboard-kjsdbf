"use client"

import React from 'react'
import { AlertCircle } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const alerts = [
  { name: 'Organic Cotton Tee', sku: 'OCT-M-BLK', stock: 2 },
  { name: 'Linen Trousers', sku: 'LT-S-SND', stock: 0 },
  { name: 'Silk Scarf', sku: 'SS-ONE-BLU', stock: 5 },
]

export function LowStockAlerts() {
  return (
    <Card className="border-slate-200 shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-800">Low Stock Alerts</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {alerts.map((alert) => (
          <Alert key={alert.sku} variant={alert.stock === 0 ? "destructive" : "default"} className="py-2 px-3">
            <AlertCircle className="h-4 w-4" />
            <div className="ml-2">
              <AlertTitle className="text-[11px] font-bold leading-none mb-1">{alert.name}</AlertTitle>
              <AlertDescription className="text-[10px] text-slate-500 flex justify-between items-center">
                <span>SKU: {alert.sku}</span>
                <span className="font-bold">{alert.stock} left</span>
              </AlertDescription>
            </div>
          </Alert>
        ))}
      </CardContent>
    </Card>
  )
}
