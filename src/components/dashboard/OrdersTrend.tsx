"use client"

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'

interface ChartData {
  name: string
  orders: number
}

const data: ChartData[] = [
  { name: 'Mon', orders: 40 },
  { name: 'Tue', orders: 30 },
  { name: 'Wed', orders: 50 },
  { name: 'Thu', orders: 27 },
  { name: 'Fri', orders: 18 },
  { name: 'Sat', orders: 23 },
  { name: 'Sun', orders: 34 },
]

export function OrdersTrend() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Orders Trend</h3>
          <p className="text-[10px] text-slate-500">Daily order volume</p>
        </div>
        <div className="flex gap-2">
          <div className="flex items-center gap-1.5">
            <div className="w-2 h-2 rounded-full bg-[#f97316]" />
            <span className="text-[10px] text-slate-500">Orders</span>
          </div>
        </div>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis 
              dataKey="name" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748b' }} 
              dy={10}
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 10, fill: '#64748b' }} 
            />
            <Tooltip 
              cursor={{ fill: '#f8fafc' }}
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
            />
            <Bar dataKey="orders" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 2 ? '#f97316' : '#cbd5e1'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
