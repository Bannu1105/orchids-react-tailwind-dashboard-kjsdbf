"use client"

import React, { useState } from 'react'
import { 
  Search, 
  Calendar, 
  ChevronDown, 
  Download, 
  FileText,
  Filter,
  MoreVertical,
  ChevronLeft,
  ChevronRight,
  Plus
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { OrderDetailsDrawer } from './OrderDetailsDrawer'
import { ReturnsTable } from './ReturnsTable'
import { ReturnDetailsDrawer } from './ReturnDetailsDrawer'
import { ProcessRefundModal } from './ProcessRefundModal'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const ORDERS = [
  { id: 'ORD-7783-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', quantity: '2 Items', amount: '₹ 3459.00', status: 'PLACED', date: '17 DEC 2023', time: '13:53' },
  { id: 'ORD-7782-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', quantity: '2 Items', amount: '₹ 3459.00', status: 'PLACED', date: '17 DEC 2023', time: '13:53' },
  { id: 'ORD-7781-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', quantity: '2 Items', amount: '₹ 3459.00', status: 'PLACED', date: '17 DEC 2023', time: '13:53' },
  { id: 'ORD-7780-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', quantity: '2 Items', amount: '₹ 3459.00', status: 'CONFIRMED', date: '17 DEC 2023', time: '13:53' },
  { id: 'ORD-7779-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', quantity: '2 Items', amount: '₹ 3459.00', status: 'CANCELLED', date: '17 DEC 2023', time: '13:53' },
]

export function OrdersView() {
  const [activeTab, setActiveTab] = useState('All Orders')
  const [selectedOrder, setSelectedOrder] = useState(null)
  const [selectedReturn, setSelectedReturn] = useState(null)
  const [isOrderDrawerOpen, setIsOrderDrawerOpen] = useState(false)
  const [isReturnDrawerOpen, setIsReturnDrawerOpen] = useState(false)
  const [isRefundModalOpen, setIsRefundModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState('All')

  const tabs = ['All Orders', 'Returns', 'Refunds']

  const filteredOrders = ORDERS.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === 'All' || order.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const getStatusColor = (status) => {
    switch (status) {
      case 'PLACED': return 'text-blue-500'
      case 'CONFIRMED': return 'text-teal-600'
      case 'CANCELLED': return 'text-red-500'
      case 'SHIPPED': return 'text-orange-500'
      case 'DELIVERED': return 'text-green-600'
      default: return 'text-slate-500'
    }
  }

  const handleOrderClick = (order) => {
    setSelectedOrder(order)
    setIsOrderDrawerOpen(true)
  }

  const handleReturnClick = (returnItem) => {
    setSelectedReturn(returnItem)
    setIsReturnDrawerOpen(true)
  }

  return (
    <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 lg:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Operations</span>
            <span>/</span>
            <span className="text-slate-900 font-medium">Orders</span>
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mt-2">
            <div>
              <h1 className="text-2xl font-bold text-[#084d54]">Order Management</h1>
              <p className="text-sm text-slate-500">Track, process, ship, invoice, and manage returns/refunds.</p>
            </div>
            
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input 
                placeholder="Search orders, SKUs, Customers..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white border-slate-200 rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 md:p-6 border-b border-slate-100 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              <Button variant="outline" className="gap-2 text-slate-600">
                <Calendar className="w-4 h-4" />
                <span className="hidden sm:inline">Last 7 Days</span>
                <ChevronDown className="w-4 h-4" />
              </Button>

              <Select defaultValue="all">
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Payment: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Payment: All</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="unpaid">Unpaid</SelectItem>
                </SelectContent>
              </Select>

              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[160px]">
                  <SelectValue placeholder="Status: All" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="All">Status: All</SelectItem>
                  <SelectItem value="PLACED">Placed</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center gap-2 md:ml-auto">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-green-600">
                  <FileText className="w-5 h-5" />
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-red-500">
                  <Download className="w-5 h-5" />
                </Button>
                <Button 
                  variant="link"
                  onClick={() => {
                    setSearchQuery('')
                    setStatusFilter('All')
                  }}
                  className="text-xs text-orange-500 font-bold"
                >
                  Clear All
                </Button>
              </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="bg-transparent border-none gap-8 h-auto p-0">
                {tabs.map(tab => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-500 data-[state=active]:bg-transparent data-[state=active]:text-[#084d54] pb-4 px-0 font-bold text-sm"
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>

          <div className="bg-white">
            {activeTab === 'All Orders' && (
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-slate-50/50">
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Order ID</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Customer</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Quantity</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Amount</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-center">Status</th>
                      <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Placed On</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredOrders.map((order, i) => (
                      <tr 
                        key={i} 
                        className="hover:bg-slate-50/80 transition-colors cursor-pointer group"
                        onClick={() => handleOrderClick(order)}
                      >
                        <td className="px-6 py-5">
                          <span className="text-sm font-bold text-[#084d54] group-hover:text-teal-600 transition-colors">{order.id}</span>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-900">{order.customer}</span>
                            <span className="text-xs text-slate-400">{order.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="text-sm text-slate-600">{order.quantity}</span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className="text-sm font-bold text-slate-900">{order.amount}</span>
                        </td>
                        <td className="px-6 py-5 text-center">
                          <span className={cn("text-[10px] font-bold tracking-widest uppercase", getStatusColor(order.status))}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-6 py-5 text-right">
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-slate-900 font-medium">{order.date}</span>
                            <span className="text-xs text-slate-400">{order.time}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'Returns' && (
              <ReturnsTable onReturnClick={handleReturnClick} />
            )}

            {activeTab === 'Refunds' && (
              <div className="p-12 text-center text-slate-400 space-y-4">
                <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto text-slate-300">
                  <FileText className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900">No Refunds Found</h3>
                  <p className="text-xs">There are no refund requests currently pending.</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Select defaultValue="10">
                <SelectTrigger className="w-[70px]">
                  <SelectValue placeholder="10" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                  <SelectItem value="20">20</SelectItem>
                </SelectContent>
              </Select>
              <span className="text-xs text-slate-400">entries per page</span>
            </div>

            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-slate-400">
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <Button size="sm" className="w-8 h-8 bg-[#084d54] text-white">1</Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 text-slate-600 font-bold">2</Button>
              <Button variant="ghost" size="sm" className="w-8 h-8 text-slate-600 font-bold">3</Button>
              <span className="text-slate-300 px-1">...</span>
              <Button variant="ghost" size="sm" className="w-8 h-8 text-slate-600 font-bold">10</Button>
              <Button variant="ghost" className="gap-1 ml-2 text-[#084d54] font-bold">
                Next
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <OrderDetailsDrawer 
        order={selectedOrder} 
        isOpen={isOrderDrawerOpen} 
        onClose={() => setIsOrderDrawerOpen(false)} 
      />

      <ReturnDetailsDrawer
        returnItem={selectedReturn}
        isOpen={isReturnDrawerOpen}
        onClose={() => setIsReturnDrawerOpen(false)}
        onApproveRefund={() => setIsRefundModalOpen(true)}
      />

      <ProcessRefundModal
        isOpen={isRefundModalOpen}
        onClose={() => setIsRefundModalOpen(false)}
      />
    </main>
  )
}
