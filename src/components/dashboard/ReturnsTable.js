"use client"

import React from 'react'
import { cn } from '@/lib/utils'

const RETURNS = [
  { id: 'RET-7783-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', orderRef: 'ORD-7783-XJ', items: '2 Items', reason: '"Size Issue"', status: 'PICKUP SCHEDULED', date: '17 DEC 2023', time: '13:53' },
  { id: 'RET-7782-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', orderRef: 'ORD-7782-XJ', items: '2 Items', reason: '"Size Issue"', status: 'RECEIVED AT WAREHOUSE', date: '17 DEC 2023', time: '13:53' },
  { id: 'RET-7781-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', orderRef: 'ORD-7781-XJ', items: '2 Items', reason: '"Size Issue"', status: 'RECEIVED AT WAREHOUSE', date: '17 DEC 2023', time: '13:53' },
  { id: 'RET-7780-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', orderRef: 'ORD-7780-XJ', items: '2 Items', reason: '"Size Issue"', status: 'RECEIVED AT WAREHOUSE', date: '17 DEC 2023', time: '13:53' },
  { id: 'RET-7779-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', orderRef: 'ORD-7779-XJ', items: '2 Items', reason: '"Size Issue"', status: 'RECEIVED AT WAREHOUSE', date: '17 DEC 2023', time: '13:53' },
]

interface ReturnsTableProps {
  onReturnClick: (returnItem: any) => void
}

export function ReturnsTable({ onReturnClick }: ReturnsTableProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PICKUP SCHEDULED': return 'text-orange-500'
      case 'RECEIVED AT WAREHOUSE': return 'text-red-500'
      default: return 'text-slate-500'
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-slate-50/50">
            <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Return ID</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Customer</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Order Reference</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Items</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Reason</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</th>
            <th className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Req. Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {RETURNS.map((item, i) => (
            <tr 
              key={i} 
              className="hover:bg-slate-50/80 transition-colors cursor-pointer"
              onClick={() => onReturnClick(item)}
            >
              <td className="px-6 py-5">
                <span className="text-sm font-bold text-[#084d54]">{item.id}</span>
              </td>
              <td className="px-6 py-5">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">{item.customer}</span>
                  <span className="text-xs text-slate-500">{item.phone}</span>
                </div>
              </td>
              <td className="px-6 py-5">
                <span className="text-sm font-bold text-[#084d54]">{item.orderRef}</span>
              </td>
              <td className="px-6 py-5">
                <span className="text-sm text-slate-600">{item.items}</span>
              </td>
              <td className="px-6 py-5">
                <span className="text-sm text-slate-600 italic">{item.reason}</span>
              </td>
              <td className="px-6 py-5">
                <span className={cn("text-[10px] font-bold tracking-widest uppercase", getStatusColor(item.status))}>
                  {item.status}
                </span>
              </td>
              <td className="px-6 py-5 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-slate-900">{item.date}</span>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
