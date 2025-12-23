"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const RETURNS = [
  { id: 'RET-7783-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', orderRef: 'ORD-7783-XJ', items: '2 Items', reason: '"Size Issue"', status: 'PICKUP SCHEDULED', date: '17 DEC 2023', time: '13:53' },
  { id: 'RET-7782-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', orderRef: 'ORD-7782-XJ', items: '2 Items', reason: '"Size Issue"', status: 'RECEIVED AT WAREHOUSE', date: '17 DEC 2023', time: '13:53' },
  { id: 'RET-7781-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', orderRef: 'ORD-7781-XJ', items: '2 Items', reason: '"Size Issue"', status: 'RECEIVED AT WAREHOUSE', date: '17 DEC 2023', time: '13:53' },
  { id: 'RET-7780-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', orderRef: 'ORD-7780-XJ', items: '2 Items', reason: '"Size Issue"', status: 'RECEIVED AT WAREHOUSE', date: '17 DEC 2023', time: '13:53' },
  { id: 'RET-7779-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', orderRef: 'ORD-7779-XJ', items: '2 Items', reason: '"Size Issue"', status: 'RECEIVED AT WAREHOUSE', date: '17 DEC 2023', time: '13:53' },
]

export function ReturnsTable({ onReturnClick }) {
  const getStatusColor = (status) => {
    switch (status) {
      case 'PICKUP SCHEDULED': return 'text-orange-500'
      case 'RECEIVED AT WAREHOUSE': return 'text-red-500'
      default: return 'text-slate-500'
    }
  }

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow className="bg-slate-50/50">
            <TableHead className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Return ID</TableHead>
            <TableHead className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Customer</TableHead>
            <TableHead className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Order Reference</TableHead>
            <TableHead className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Items</TableHead>
            <TableHead className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Reason</TableHead>
            <TableHead className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Status</TableHead>
            <TableHead className="px-6 py-4 text-[11px] font-semibold text-slate-500 uppercase tracking-wider text-right">Req. Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {RETURNS.map((item, i) => (
            <TableRow 
              key={i} 
              className="hover:bg-slate-50/80 transition-colors cursor-pointer"
              onClick={() => onReturnClick(item)}
            >
              <TableCell className="px-6 py-5">
                <span className="text-sm font-bold text-[#084d54]">{item.id}</span>
              </TableCell>
              <TableCell className="px-6 py-5">
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-slate-900">{item.customer}</span>
                  <span className="text-xs text-slate-500">{item.phone}</span>
                </div>
              </TableCell>
              <TableCell className="px-6 py-5">
                <span className="text-sm font-bold text-[#084d54]">{item.orderRef}</span>
              </TableCell>
              <TableCell className="px-6 py-5">
                <span className="text-sm text-slate-600">{item.items}</span>
              </TableCell>
              <TableCell className="px-6 py-5">
                <span className="text-sm text-slate-600 italic">{item.reason}</span>
              </TableCell>
              <TableCell className="px-6 py-5">
                <span className={cn("text-[10px] font-bold tracking-widest uppercase", getStatusColor(item.status))}>
                  {item.status}
                </span>
              </TableCell>
              <TableCell className="px-6 py-5 text-right">
                <div className="flex flex-col items-end">
                  <span className="text-sm text-slate-900">{item.date}</span>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
