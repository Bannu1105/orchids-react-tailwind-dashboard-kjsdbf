"use client"

import React from 'react'
import { RotateCcw } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function ReturnsRefunds() {
  return (
    <Card className="border-slate-200 shadow-sm h-full bg-slate-50/50">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-semibold text-slate-800">Returns & Refunds</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center py-4">
        <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm mb-3">
          <RotateCcw className="w-6 h-6 text-teal-600" />
        </div>
        <div className="text-center">
          <h4 className="text-lg font-bold text-slate-900">4 Pending</h4>
          <p className="text-[10px] text-slate-500 font-medium">Refunds awaiting approval</p>
        </div>
      </CardContent>
    </Card>
  )
}
