"use client"

import React from 'react'
import { MoreVertical, ExternalLink } from 'lucide-react'

interface Order {
  id: string
  customer: string
  product: string
  amount: string
  status: 'Delivered' | 'Processing' | 'Shipped' | 'Cancelled'
  date: string
}

const orders: Order[] = [
  { id: '#ORD-7234', customer: 'John Doe', product: 'Wireless Earbuds', amount: '₹ 2,499', status: 'Delivered', date: '2023-10-24' },
  { id: '#ORD-7235', customer: 'Jane Smith', product: 'Smart Watch', amount: '₹ 5,999', status: 'Processing', date: '2023-10-24' },
  { id: '#ORD-7236', customer: 'Robert Brown', product: 'Leather Wallet', amount: '₹ 1,299', status: 'Shipped', date: '2023-10-23' },
  { id: '#ORD-7237', customer: 'Alice Wilson', product: 'Sunglasses', amount: '₹ 3,499', status: 'Delivered', date: '2023-10-23' },
]

const statusStyles: Record<Order['status'], string> = {
  'Delivered': 'bg-emerald-50 text-emerald-600',
  'Processing': 'bg-amber-50 text-amber-600',
  'Shipped': 'bg-sky-50 text-sky-600',
  'Cancelled': 'bg-rose-50 text-rose-600',
}

export function RecentOrders() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-sm font-bold text-slate-900">Recent Orders</h3>
        <button className="text-[10px] font-bold text-[#f97316] hover:underline flex items-center gap-1">
          View All <ExternalLink className="w-3 h-3" />
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-slate-100 text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              <th className="pb-3 px-2">Order ID</th>
              <th className="pb-3 px-2">Customer</th>
              <th className="pb-3 px-2">Amount</th>
              <th className="pb-3 px-2">Status</th>
              <th className="pb-3 px-2 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="text-[11px]">
            {orders.map((order) => (
              <tr key={order.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50 transition-colors group">
                <td className="py-3 px-2 font-semibold text-slate-900">{order.id}</td>
                <td className="py-3 px-2 text-slate-600">{order.customer}</td>
                <td className="py-3 px-2 font-medium text-slate-900">{order.amount}</td>
                <td className="py-3 px-2">
                  <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${statusStyles[order.status]}`}>
                    {order.status}
                  </span>
                </td>
                <td className="py-3 px-2 text-right">
                  <button className="p-1 text-slate-400 hover:text-slate-600 rounded-md transition-colors">
                    <MoreVertical className="w-3 h-3" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
