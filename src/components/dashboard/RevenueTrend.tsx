"use client"

import React from 'react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface RevenueData {
  name: string
  revenue: number
}

const data: RevenueData[] = [
  { name: 'Mon', revenue: 4000 },
  { name: 'Tue', revenue: 3000 },
  { name: 'Wed', revenue: 5000 },
  { name: 'Thu', revenue: 2780 },
  { name: 'Fri', revenue: 1890 },
  { name: 'Sat', revenue: 2390 },
  { name: 'Sun', revenue: 3490 },
]

export function RevenueTrend() {
  return (
    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-sm font-bold text-slate-900">Revenue Trend</h3>
          <p className="text-[10px] text-slate-500">Weekly revenue performance</p>
        </div>
        <select className="text-[10px] border border-slate-200 rounded-md px-2 py-1 outline-none">
          <option>This Week</option>
          <option>Last Week</option>
        </select>
      </div>
      <div className="h-[240px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f97316" stopOpacity={0.1}/>
                <stop offset="95%" stopColor="#f97316" stopOpacity={0}/>
              </linearGradient>
            </defs>
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
              contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }}
            />
            <Area 
              type="monotone" 
              dataKey="revenue" 
              stroke="#f97316" 
              strokeWidth={2}
              fillOpacity={1} 
              fill="url(#colorRev)" 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}
