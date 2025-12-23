"use client"

import React, { useState } from 'react'
import { AddStockModal } from './modals/AddStockModal'
import { AddBrandModal } from './modals/AddBrandModal'
import { ViewBrandsModal } from './modals/ViewBrandsModal'
import { BulkUploadModal } from './modals/BulkUploadModal'
import { AdjustStockModal } from './modals/AdjustStockModal'
import { 
  Plus, 
  Upload, 
  Settings2, 
  Search, 
  ChevronDown, 
  FileSpreadsheet, 
  FileText, 
  ShieldCheck,
  Edit2,
  History,
  Sparkles,
  X,
  Download
} from 'lucide-react'
import { cn } from '@/lib/utils'

interface InventoryItem {
  product: string
  brand: string
  sku: string
  variant: string
  availStock: number
  reserved: number
  velocity: string
  status: string
}

interface LowStockItem {
  product: string
  brand: string
  sku: string
  variant: string
  currentStock: number
  velocity: string
  projectedStockout: string
}

const inventoryData: InventoryItem[] = [
  {
    product: "Zenz Organic Cotton Tee",
    brand: "Zenz",
    sku: "Zenz-OCT-M",
    variant: "Black / M",
    availStock: 124,
    reserved: 10,
    velocity: "8/day",
    status: "STATUS"
  },
  {
    product: "Zenz Organic Cotton Tee",
    brand: "Zenz",
    sku: "Zenz-OCT-L",
    variant: "Black / L",
    availStock: 124,
    reserved: 10,
    velocity: "8/day",
    status: "STATUS"
  },
  {
    product: "Luxe Linen Trousers",
    brand: "Women",
    sku: "PNT-LNN-S",
    variant: "Sand / S",
    availStock: 124,
    reserved: 10,
    velocity: "8/day",
    status: "STATUS"
  }
]

const lowStockData: LowStockItem[] = [
  {
    product: "Zenz Organic Cotton Tee",
    brand: "Zenz",
    sku: "Zenz-OCT-M",
    variant: "Black / M",
    currentStock: 0,
    velocity: "8/day",
    projectedStockout: "YESTERDAY"
  },
  {
    product: "Zenz Organic Cotton Tee",
    brand: "Zenz",
    sku: "Zenz-OCT-L",
    variant: "Black / L",
    currentStock: 0,
    velocity: "8/day",
    projectedStockout: "YESTERDAY"
  }
]

export function InventoryView() {
  const [activeTab, setActiveTab] = useState('Stock Overview')
  const [showAIInsights, setShowAIInsights] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  
  const [isAddStockOpen, setIsAddStockOpen] = useState(false)
  const [isAddBrandOpen, setIsAddBrandOpen] = useState(false)
  const [isViewBrandsOpen, setIsViewBrandsOpen] = useState(false)
  const [isBulkUploadOpen, setIsBulkUploadOpen] = useState(false)
  const [isAdjustStockOpen, setIsAdjustStockOpen] = useState(false)

  const tabs = ['Stock Overview', 'Low Stock', 'Inventory Logs']

  const filteredInventory = inventoryData.filter(item => {
    const matchesSearch = 
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variant.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = categoryFilter === 'All' || item.brand === categoryFilter
    // Status filter logic can be expanded if status values are more diverse
    return matchesSearch && matchesCategory
  })

  const filteredLowStock = lowStockData.filter(item => {
    const matchesSearch = 
      item.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.variant.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesSearch
  })

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
          <p className="text-sm text-slate-500 mt-1">Track variant-level stock, adjust inventory, and manage reorders.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex items-center gap-3">
          <button 
            onClick={() => setIsAddStockOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 border border-[#f59e0b] text-[#f59e0b] rounded-lg text-sm font-semibold hover:bg-amber-50 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Stock Item
          </button>
          <button 
            onClick={() => setIsBulkUploadOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#f59e0b] text-white rounded-lg text-sm font-semibold hover:bg-amber-600 transition-colors shadow-sm shadow-amber-200"
          >
            <Upload className="w-4 h-4" />
            Bulk Upload
          </button>
          <button 
            onClick={() => setIsAdjustStockOpen(true)}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-[#084d54] text-white rounded-lg text-sm font-semibold hover:bg-teal-900 transition-colors"
          >
            <Settings2 className="w-4 h-4" />
            Adjust Stock
          </button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 gap-4">
        <div className="flex gap-4 md:gap-8 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "pb-4 text-sm font-medium transition-all whitespace-nowrap",
                activeTab === tab 
                  ? "text-teal-700 font-semibold border-b-2 border-teal-700" 
                  : "text-slate-400 hover:text-slate-600"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-3 pb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <FileSpreadsheet className="w-5 h-5 text-green-600 cursor-pointer" />
            <FileText className="w-5 h-5 text-red-500 cursor-pointer" />
          </div>
          <button 
            onClick={() => setIsViewBrandsOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 border border-slate-200 rounded-lg text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors shrink-0"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600" />
            View Brands
          </button>
          <button 
            onClick={() => setIsAddBrandOpen(true)}
            className="flex items-center gap-2 px-3 py-1.5 bg-[#084d54] text-white rounded-lg text-xs font-medium hover:bg-teal-900 transition-colors shrink-0"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Brand
          </button>
        </div>
      </div>

      {activeTab === 'Stock Overview' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                <div className="relative flex-1 lg:max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder="Search by Product, SKU, Variant" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <select 
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 bg-white min-w-[140px] outline-none appearance-none cursor-pointer"
                  >
                    <option value="All">Category: All</option>
                    <option value="Zenz">Zenz</option>
                    <option value="Women">Women</option>
                  </select>
                  <select 
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    className="flex-1 sm:flex-none px-4 py-2 border border-slate-200 rounded-lg text-sm font-medium text-slate-600 bg-white min-w-[140px] outline-none appearance-none cursor-pointer"
                  >
                    <option value="All">Status: All</option>
                    <option value="STATUS">Active</option>
                  </select>
                </div>

            </div>
            <button 
              onClick={() => setShowAIInsights(!showAIInsights)}
              className="flex items-center justify-center gap-2 px-4 py-2 bg-[#084d54] text-white rounded-lg text-sm font-medium w-full lg:w-auto"
            >
              <Sparkles className="w-4 h-4" />
              AI Insights
            </button>
          </div>

          {showAIInsights && (
            <div className="relative bg-teal-50/50 border border-teal-100 rounded-2xl p-4 md:p-6">
              <button 
                onClick={() => setShowAIInsights(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex flex-col md:flex-row gap-4">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm border border-teal-50 shrink-0">
                  <Sparkles className="w-5 h-5 text-teal-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-slate-900">Inventory Intelligence</h3>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4">Executive Summary</p>
                  
                  <div className="space-y-4 max-w-4xl">
                    <p className="text-sm text-slate-600 leading-relaxed">
                      Inventory health is mixed, characterized by critical risk in high-velocity items and immediate lost sales. The <span className="font-semibold text-slate-900">Zenz Organic Cotton Tee</span> posing highest threat.
                    </p>
                    
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 uppercase mb-2">Actionable Bullet Points</h4>
                      <ul className="space-y-3">
                        <li className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                          <span><span className="font-semibold text-slate-900">Prioritize Zenz Tee Replenishment</span> to prevent a stock-out within four weeks.</span>
                        </li>
                        <li className="text-sm text-slate-600 flex items-start gap-2">
                          <span className="mt-1.5 w-1 h-1 bg-slate-400 rounded-full shrink-0" />
                          <span><span className="font-semibold text-slate-900">Address OOS Immediately</span> for Luxe Linen Trousers to recover lost sales.</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="p-4 w-12 text-center">
                      <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                    </th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Product</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">SKU</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Variant</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avail. Stock</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Reserved</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Velocity(7d)</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Status</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                  <tbody className="divide-y divide-slate-100">
                    {filteredInventory.map((item, i) => (
                      <tr key={i} className="hover:bg-slate-50/30 transition-colors">

                      <td className="p-4 text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                      </td>
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900">{item.product}</span>
                          <span className="text-[11px] text-slate-400 uppercase font-medium">{item.brand}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{item.sku}</td>
                      <td className="p-4 text-sm text-slate-600 font-medium">{item.variant}</td>
                      <td className="p-4 text-sm text-slate-900 font-bold">{item.availStock}</td>
                      <td className="p-4 text-sm text-slate-900 font-bold">{item.reserved}</td>
                      <td className="p-4 text-sm text-slate-500 italic">{item.velocity}</td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <span className="px-3 py-1 bg-teal-50 text-teal-600 text-[10px] font-bold rounded-full border border-teal-100">
                            {item.status}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex items-center justify-center gap-3">
                          <button className="p-1 text-slate-400 hover:text-teal-600 transition-colors">
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button className="p-1 text-slate-400 hover:text-teal-600 transition-colors">
                            <History className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-white gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Rows per page:</span>
                <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-medium text-slate-600 outline-none">
                  <option>05</option>
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
              
              <div className="flex items-center gap-1">
                <button className="text-[11px] font-medium text-slate-400 hover:text-slate-600 px-2">Prev</button>
                <div className="flex gap-1">
                  <button className="w-6 h-6 flex items-center justify-center rounded bg-[#084d54] text-white text-[11px] font-bold">1</button>
                  <button className="w-6 h-6 flex items-center justify-center rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50">2</button>
                  <button className="w-6 h-6 flex items-center justify-center rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50">3</button>
                  <span className="text-slate-300 px-1">...</span>
                </div>
                <button className="text-[11px] font-medium text-slate-600 hover:text-teal-700 px-2 font-bold">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Low Stock' && (
        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Low Stock SKUs</p>
              <p className="text-2xl font-bold text-rose-500">12</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Out of Stock SKUs</p>
              <p className="text-2xl font-bold text-amber-500">04</p>
            </div>
            <div className="bg-white border border-slate-200 rounded-xl p-4 shadow-sm relative overflow-hidden flex items-center justify-between sm:col-span-2 md:col-span-1">
              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">Est. Stockout (7 days)</p>
                <p className="text-2xl font-bold text-teal-600">08</p>
              </div>
              <button className="bg-[#084d54] text-white px-3 py-1.5 rounded-lg text-[10px] font-semibold flex items-center gap-2 shrink-0">
                <Download className="w-3.5 h-3.5" />
                Report
              </button>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto no-scrollbar">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-200">
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Product</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">SKU</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Variant</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Current Stock</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Velocity(7d)</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Projected Stockout</th>
                    <th className="p-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {lowStockData.map((item, i) => (
                    <tr key={i} className="hover:bg-slate-50/30 transition-colors">
                      <td className="p-4">
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900">{item.product}</span>
                          <span className="text-[11px] text-slate-400 uppercase font-medium">{item.brand}</span>
                        </div>
                      </td>
                      <td className="p-4 text-sm text-slate-600">{item.sku}</td>
                      <td className="p-4 text-sm text-slate-600 font-medium">{item.variant}</td>
                      <td className="p-4 text-sm text-rose-500 font-bold text-center">{item.currentStock}</td>
                      <td className="p-4 text-sm text-slate-500 italic text-center">{item.velocity}</td>
                      <td className="p-4 text-center">
                        <div className="flex justify-center">
                          <span className="px-4 py-1 bg-rose-50 text-rose-500 text-[10px] font-bold rounded-full border border-rose-100">
                            {item.projectedStockout}
                          </span>
                        </div>
                      </td>
                      <td className="p-4">
                        <div className="flex justify-center">
                          <button className="text-[#f59e0b] text-xs font-bold hover:underline">
                            Restock
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            <div className="p-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between bg-white gap-4">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500">Rows per page:</span>
                <select className="bg-slate-50 border border-slate-200 rounded px-2 py-1 text-xs font-medium text-slate-600 outline-none">
                  <option>05</option>
                  <option>10</option>
                  <option>20</option>
                </select>
              </div>
              
              <div className="flex items-center gap-1">
                <button className="text-[11px] font-medium text-slate-400 hover:text-slate-600 px-2">Prev</button>
                <div className="flex gap-1">
                  <button className="w-6 h-6 flex items-center justify-center rounded bg-[#084d54] text-white text-[11px] font-bold">1</button>
                  <button className="w-6 h-6 flex items-center justify-center rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50">2</button>
                  <button className="w-6 h-6 flex items-center justify-center rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50">3</button>
                </div>
                <button className="text-[11px] font-medium text-slate-600 hover:text-teal-700 px-2 font-bold">Next</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Inventory Logs' && (
        <div className="flex items-center justify-center h-64 text-slate-400 border-2 border-dashed border-slate-200 rounded-xl">
          Inventory Logs section content goes here
        </div>
      )}

      <AddStockModal isOpen={isAddStockOpen} onClose={() => setIsAddStockOpen(false)} />
      <AddBrandModal isOpen={isAddBrandOpen} onClose={() => setIsAddBrandOpen(false)} />
      <ViewBrandsModal isOpen={isViewBrandsOpen} onClose={() => setIsViewBrandsOpen(false)} />
      <BulkUploadModal isOpen={isBulkUploadOpen} onClose={() => setIsBulkUploadOpen(false)} />
      <AdjustStockModal isOpen={isAdjustStockOpen} onClose={() => setIsAdjustStockOpen(false)} />
    </main>
  )
}
