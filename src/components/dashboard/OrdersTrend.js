"use client"

import React from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const data = [
  { name: 'Mon', orders: 40 },
  { name: 'Tue', orders: 30 },
  { name: 'Wed', orders: 20 },
  { name: 'Thu', orders: 27 },
  { name: 'Fri', orders: 18 },
  { name: 'Sat', orders: 23 },
  { name: 'Sun', orders: 34 },
]

export function OrdersTrend() {
  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-800">Orders Trend</CardTitle>
      </CardHeader>
      <CardContent className="h-[250px] pt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <Tooltip />
            <Bar dataKey="orders" fill="#084d54" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
