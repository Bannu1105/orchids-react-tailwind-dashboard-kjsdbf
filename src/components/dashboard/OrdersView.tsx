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

const ORDERS = [
  { id: 'ORD-7783-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', quantity: '2 Items', amount: '₹ 3459.00', status: 'PLACED', date: '17 DEC 2023', time: '13:53' },
  { id: 'ORD-7782-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', quantity: '2 Items', amount: '₹ 3459.00', status: 'PLACED', date: '17 DEC 2023', time: '13:53' },
  { id: 'ORD-7781-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', quantity: '2 Items', amount: '₹ 3459.00', status: 'PLACED', date: '17 DEC 2023', time: '13:53' },
  { id: 'ORD-7780-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', quantity: '2 Items', amount: '₹ 3459.00', status: 'CONFIRMED', date: '17 DEC 2023', time: '13:53' },
  { id: 'ORD-7779-XJ', customer: 'Lokesh Jami', phone: '+91 790180 19515', quantity: '2 Items', amount: '₹ 3459.00', status: 'CANCELLED', date: '17 DEC 2023', time: '13:53' },
]

export function OrdersView() {
  const [activeTab, setActiveTab] = useState('All Orders')
  const [selectedOrder, setSelectedOrder] = useState<any>(null)
  const [selectedReturn, setSelectedReturn] = useState<any>(null)
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PLACED': return 'text-blue-500'
      case 'CONFIRMED': return 'text-teal-600'
      case 'CANCELLED': return 'text-red-500'
      case 'SHIPPED': return 'text-orange-500'
      case 'DELIVERED': return 'text-green-600'
      default: return 'text-slate-500'
    }
  }

  const handleOrderClick = (order: any) => {
    setSelectedOrder(order)
    setIsOrderDrawerOpen(true)
  }

  const handleReturnClick = (returnItem: any) => {
    setSelectedReturn(returnItem)
    setIsReturnDrawerOpen(true)
  }

  return (
    <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 lg:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header Section */}
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
                <input 
                  type="text" 
                  placeholder="Search orders, SKUs, Customers..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/20 transition-all shadow-sm"
                />
              </div>
            </div>

        </div>

        {/* Filters and Search Table Section */}
        <div className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
          <div className="p-4 md:p-6 border-b border-slate-100 space-y-6">
              <div className="flex flex-wrap items-center gap-3">
                <div className="relative flex-1 min-w-[200px] md:max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by Product, SKU, Variant"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/10"
                  />
                </div>
                
                <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                  <Calendar className="w-4 h-4" />
                  <span className="hidden sm:inline">Last 7 Days</span>
                  <ChevronDown className="w-4 h-4" />
                </button>

                <select 
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors outline-none"
                >
                  <option>Payment: All</option>
                  <option>Paid</option>
                  <option>Unpaid</option>
                </select>

                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="px-3 py-2 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 hover:bg-slate-50 transition-colors outline-none"
                >
                  <option value="All">Status: All</option>
                  <option value="PLACED">Placed</option>
                  <option value="CONFIRMED">Confirmed</option>
                  <option value="CANCELLED">Cancelled</option>
                </select>

                <div className="flex items-center gap-2 md:ml-auto">
                  <button className="p-2 text-slate-400 hover:text-green-600 transition-colors rounded-lg hover:bg-slate-50">
                    <FileText className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-red-500 transition-colors rounded-lg hover:bg-slate-50">
                    <Download className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => {
                      setSearchQuery('')
                      setStatusFilter('All')
                    }}
                    className="text-xs text-orange-500 font-bold hover:underline ml-2"
                  >
                    Clear All
                  </button>
                </div>
              </div>


            {/* Tabs */}
            <div className="flex gap-8 border-b border-slate-100 overflow-x-auto scrollbar-hide">
              {tabs.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={cn(
                    "pb-4 text-sm font-bold transition-all relative whitespace-nowrap",
                    activeTab === tab 
                      ? "text-[#084d54]" 
                      : "text-slate-400 hover:text-slate-600"
                  )}
                >
                  {tab}
                  {activeTab === tab && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-teal-500 rounded-full" />
                  )}
                </button>
              ))}
            </div>
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
                    {ORDERS.map((order, i) => (
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

          {/* Pagination */}
          <div className="p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="relative">
                <select className="bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-xs font-bold text-slate-600 appearance-none focus:outline-none focus:ring-2 focus:ring-teal-500/10 min-w-[60px]">
                  <option>05</option>
                  <option>10</option>
                  <option>20</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3 h-3 text-slate-400 pointer-events-none" />
              </div>
              <span className="text-xs text-slate-400">entries per page</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="p-2 hover:bg-slate-50 rounded-lg transition-colors text-slate-400">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#084d54] text-white text-xs font-bold">1</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors">2</button>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors">3</button>
              <span className="text-slate-300 px-1 text-xs">...</span>
              <button className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-50 text-slate-600 text-xs font-bold transition-colors">10</button>
              <button className="flex items-center gap-1 px-3 py-1.5 ml-2 text-xs font-bold text-[#084d54] hover:bg-teal-50 rounded-lg transition-colors">
                Next
                <ChevronRight className="w-4 h-4" />
              </button>
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
