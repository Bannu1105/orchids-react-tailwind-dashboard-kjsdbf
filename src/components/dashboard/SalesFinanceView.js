"use client"

import React, { useState } from 'react'
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  Info, 
  AlertTriangle,
  ChevronRight,
  MoreVertical,
  Calendar,
  Download,
  Filter,
  Search,
  ExternalLink
} from 'lucide-react'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { TransactionDetailsDrawer } from './TransactionDetailsDrawer'
import { ApproveRefundModal } from './ApproveRefundModal'

const revenueData = [
  { name: 'Monday', gross: 60, net: 45 },
  { name: 'Tuesday', gross: 85, net: 65 },
  { name: 'Wednesday', gross: 75, net: 55 },
  { name: 'Thursday', gross: 100, net: 80 },
  { name: 'Friday', gross: 80, net: 60 },
  { name: 'Saturday', gross: 65, net: 45 },
  { name: 'Sunday', gross: 90, net: 70 },
]

const paymentMethodsData = [
  { name: 'UPI', value: 68, color: '#084d54' },
  { name: 'COD', value: 32, color: '#f59e0b' },
]

const recentTransactions = [
  { id: '#TXN-9021', customer: 'Aman Sharma', amount: '₹2499', status: 'Success' },
  { id: '#TXN-9022', customer: 'Priya Verma', amount: '₹1299', status: 'Success' },
  { id: '#TXN-9023', customer: 'Rohan Das', amount: '₹4599', status: 'Pending' },
  { id: '#TXN-9024', customer: 'Sneha Rao', amount: '₹899', status: 'Failed' },
]

const recentRefunds = [
  { id: '#RFD-101', reason: 'Size Mismatch', amount: '₹1499', status: 'Pending Approval' },
  { id: '#RFD-102', reason: 'Defective Item', amount: '₹500', status: 'Completed' },
]

export function SalesFinanceView() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedTransaction, setSelectedTransaction] = useState(null)

  return (
    <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 md:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6 md:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">Sales & Finance</h1>
            <p className="text-sm text-slate-500 mt-1">Track revenue, payments, and refunds.</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="outline" className="gap-2 w-full sm:w-auto justify-between sm:justify-center">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                Last 7 Days
              </div>
              <ChevronRight className="w-4 h-4 rotate-90" />
            </Button>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-transparent border-b border-slate-200 rounded-none w-full justify-start h-auto p-0 gap-4 md:gap-8 overflow-x-auto no-scrollbar">
            {['Overview', 'Transactions', 'Settlements', 'Refunds', 'Invoices', 'Taxes (GST)', 'Reports'].map((tab) => (
              <TabsTrigger 
                key={tab} 
                value={tab.toLowerCase()}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-600 data-[state=active]:bg-transparent data-[state=active]:text-teal-700 pb-4 px-0 font-medium whitespace-nowrap"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>

          <TabsContent value="overview" className="space-y-6 outline-none">
            {/* Alert Banner */}
            <div className="bg-orange-50 border border-orange-200 rounded-xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-orange-600 border border-orange-100 shrink-0">
                  <AlertTriangle className="w-5 h-5" />
                </div>
                <p className="text-sm text-orange-900 font-medium leading-tight">
                  Attention: You have <span className="font-bold">₹45,000 in settlements pending</span> and 12 refunds awaiting approval.
                </p>
              </div>
              <Button size="sm" className="bg-[#f59e0b] hover:bg-[#d97706] text-white rounded-lg px-6 font-semibold shadow-sm transition-all w-full md:w-auto">
                Resolve Now
              </Button>
            </div>

            {/* KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              <KpiCard title="Gross Sales" value="₹ 123.4k" trend="+12.5%" isUp />
              <KpiCard title="Net Sales" value="₹ 98.4k" trend="-8.5%" />
              <KpiCard title="Discounts Burn" value="₹ 14.2k" trend="-2.4%" />
              <KpiCard title="Failed Payments" value="421" trend="-5.4%" />
              <KpiCard title="Refunds Pending" value="₹ 12,859" trend="-5.4%" />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              {/* Revenue Trend */}
              <Card className="xl:col-span-2 border-slate-200/60 shadow-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-50 mb-4 bg-slate-50/30">
                  <CardTitle className="text-base font-semibold text-slate-800">Revenue Trend</CardTitle>
                  <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-lg">
                    <Button variant="ghost" size="sm" className="h-7 px-3 bg-teal-900 text-white hover:bg-teal-800 hover:text-white text-[10px] md:text-xs">Gross</Button>
                    <Button variant="ghost" size="sm" className="h-7 px-3 text-slate-500 text-[10px] md:text-xs">Net</Button>
                  </div>
                </CardHeader>
                <CardContent className="h-[250px] md:h-[300px] pt-4 px-2 md:px-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                      <defs>
                        <linearGradient id="colorGross" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#084d54" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#084d54" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                      <XAxis 
                        dataKey="name" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: '#94a3b8', fontSize: 10 }}
                        tickFormatter={(value) => `${value}k`}
                      />
                      <Tooltip 
                        contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="gross" 
                        stroke="#084d54" 
                        strokeWidth={3}
                        fillOpacity={1} 
                        fill="url(#colorGross)" 
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Payment Methods */}
              <Card className="border-slate-200/60 shadow-sm relative">
                <CardHeader className="border-b border-slate-50 mb-4 bg-slate-50/30">
                  <CardTitle className="text-base font-semibold text-slate-800">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="h-[250px] md:h-[300px] relative pb-12">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={paymentMethodsData}
                        cx="50%"
                        cy="50%"
                        innerRadius={50}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {paymentMethodsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                  <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-6">
                    {paymentMethodsData.map((item) => (
                      <div key={item.name} className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: item.color }} />
                        <div className="flex items-baseline gap-1.5">
                          <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider">{item.name}</p>
                          <p className="text-[10px] text-slate-400 font-medium">{item.value}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Tables Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Transactions */}
              <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-semibold text-slate-800">Recent Transactions</CardTitle>
                  <Button variant="link" className="text-teal-700 text-xs font-bold">View All</Button>
                </CardHeader>
                <div className="overflow-x-auto no-scrollbar">
                  <Table className="min-w-[500px]">
                    <TableHeader className="bg-slate-50/50">
                      <TableRow className="border-none">
                        <TableHead className="text-[10px] uppercase font-bold text-slate-400 px-6">ID</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold text-slate-400 px-6">Customer</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold text-slate-400 px-6">Amount</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold text-slate-400 px-6">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentTransactions.map((tx) => (
                        <TableRow 
                          key={tx.id} 
                          className="border-slate-50 hover:bg-slate-50/50 cursor-pointer transition-colors"
                          onClick={() => {
                            setSelectedTransaction(tx)
                            setIsDrawerOpen(true)
                          }}
                        >
                          <TableCell className="text-sm font-medium text-slate-600 px-6 py-4">{tx.id}</TableCell>
                          <TableCell className="text-sm font-bold text-slate-800 px-6 py-4">{tx.customer}</TableCell>
                          <TableCell className="text-sm font-bold text-slate-800 px-6 py-4">{tx.amount}</TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge 
                              variant="secondary" 
                              className={cn(
                                "text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap",
                                tx.status === 'Success' && "bg-emerald-50 text-emerald-600 border border-emerald-100",
                                tx.status === 'Pending' && "bg-orange-50 text-orange-600 border border-orange-100",
                                tx.status === 'Failed' && "bg-rose-50 text-rose-600 border border-rose-100"
                              )}
                            >
                              {tx.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>

              {/* Recent Refunds */}
              <Card className="border-slate-200/60 shadow-sm overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-semibold text-slate-800">Recent Refunds</CardTitle>
                  <Button variant="link" className="text-teal-700 text-xs font-bold">View All</Button>
                </CardHeader>
                <div className="overflow-x-auto no-scrollbar">
                  <Table className="min-w-[500px]">
                    <TableHeader className="bg-slate-50/50">
                      <TableRow className="border-none">
                        <TableHead className="text-[10px] uppercase font-bold text-slate-400 px-6">ID</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold text-slate-400 px-6">Reason</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold text-slate-400 px-6">Amount</TableHead>
                        <TableHead className="text-[10px] uppercase font-bold text-slate-400 px-6">Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentRefunds.map((refund) => (
                        <TableRow 
                          key={refund.id} 
                          className="border-slate-50 hover:bg-slate-50/50 cursor-pointer transition-colors"
                          onClick={() => setIsModalOpen(true)}
                        >
                          <TableCell className="text-sm font-medium text-slate-600 px-6 py-4">{refund.id}</TableCell>
                          <TableCell className="text-sm font-bold text-slate-800 px-6 py-4">{refund.reason}</TableCell>
                          <TableCell className="text-sm font-bold text-slate-800 px-6 py-4">{refund.amount}</TableCell>
                          <TableCell className="px-6 py-4">
                            <Badge 
                              variant="secondary" 
                              className={cn(
                                "text-[10px] font-bold px-3 py-1 rounded-full whitespace-nowrap",
                                refund.status === 'Pending Approval' && "bg-orange-50 text-orange-600 border border-orange-100",
                                refund.status === 'Completed' && "bg-emerald-50 text-emerald-600 border border-emerald-100"
                              )}
                            >
                              {refund.status}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      <TransactionDetailsDrawer 
        open={isDrawerOpen} 
        onOpenChange={setIsDrawerOpen}
        transaction={selectedTransaction}
      />

      <ApproveRefundModal
        open={isModalOpen}
        onOpenChange={setIsModalOpen}
      />
    </main>
  )
}

function KpiCard({ title, value, trend, isUp = false }) {
  return (
    <Card className="border-slate-200/60 shadow-sm">
      <CardContent className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">{title}</p>
          <Info className="w-3.5 h-3.5 text-slate-300" />
        </div>
        <div className="flex items-end justify-between gap-2">
          <p className="text-xl font-bold text-slate-900 tracking-tight">{value}</p>
          <div className={cn(
            "flex items-center text-[10px] font-bold px-1.5 py-0.5 rounded-sm",
            isUp ? "text-emerald-600 bg-emerald-50" : "text-rose-600 bg-rose-50"
          )}>
            {trend}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function cn(...inputs) {
  return inputs.filter(Boolean).join(' ')
}
