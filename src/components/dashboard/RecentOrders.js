"use client"

import React from 'react'
import { MoreVertical, ExternalLink } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const orders = [
  { id: 'ORD001', customer: 'John Doe', product: 'Cotton Tee', amount: '₹1,200', status: 'Delivered' },
  { id: 'ORD002', customer: 'Jane Smith', product: 'Linen Pants', amount: '₹2,500', status: 'Pending' },
  { id: 'ORD003', customer: 'Bob Wilson', product: 'Silk Scarf', amount: '₹800', status: 'Shipped' },
]

export function RecentOrders() {
  return (
    <Card className="border-slate-200 shadow-sm h-full">
      <CardHeader className="pb-2 flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-sm font-semibold text-slate-800">Recent Orders</CardTitle>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="w-4 h-4 text-slate-400" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {orders.map((order) => (
            <div key={order.id} className="p-3 hover:bg-slate-50 transition-colors flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-slate-900">{order.id}</span>
                <span className="text-[10px] text-slate-500">{order.customer}</span>
              </div>
              <div className="text-right">
                <p className="text-xs font-bold text-slate-900">{order.amount}</p>
                <p className="text-[10px] text-slate-500">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
        <Button variant="ghost" className="w-full text-[10px] h-8 text-teal-700 font-bold border-t border-slate-100 rounded-none">
          View All Orders
          <ExternalLink className="w-3 h-3 ml-1" />
        </Button>
      </CardContent>
    </Card>
  )
}
