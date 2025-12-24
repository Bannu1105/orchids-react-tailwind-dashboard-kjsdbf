"use client"

import React from 'react'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { name: 'Apparel', value: 400, color: '#084d54' },
  { name: 'Electronics', value: 300, color: '#0d7c86' },
  { name: 'Home', value: 300, color: '#14a8b5' },
  { name: 'Accessories', value: 200, color: '#f59e0b' },
]

export function SalesByCategory() {
  return (
    <Card className="border-slate-200 shadow-sm h-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-800">Sales by Category</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] flex flex-col items-center justify-center">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
        <div className="flex flex-wrap justify-center gap-4 mt-2">
          {data.map((item) => (
            <div key={item.name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }} />
              <span className="text-[10px] text-slate-500 font-medium">{item.name}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
