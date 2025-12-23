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
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const inventoryData = [
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

const lowStockData = [
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
    return matchesSearch && matchesCategory
  })

  return (
    <main className="flex-1 overflow-y-auto p-4 md:p-8 flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Inventory</h1>
          <p className="text-sm text-slate-500 mt-1">Track variant-level stock, adjust inventory, and manage reorders.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:flex items-center gap-3">
          <Button 
            variant="outline"
            onClick={() => setIsAddStockOpen(true)}
            className="border-[#f59e0b] text-[#f59e0b] hover:bg-amber-50"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Stock Item
          </Button>
          <Button 
            onClick={() => setIsBulkUploadOpen(true)}
            className="bg-[#f59e0b] text-white hover:bg-amber-600 shadow-sm shadow-amber-200"
          >
            <Upload className="w-4 h-4 mr-2" />
            Bulk Upload
          </Button>
          <Button 
            onClick={() => setIsAdjustStockOpen(true)}
            className="bg-[#084d54] text-white hover:bg-teal-900"
          >
            <Settings2 className="w-4 h-4 mr-2" />
            Adjust Stock
          </Button>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 gap-4">
        <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="bg-transparent border-none gap-4 md:gap-8">
            {tabs.map(tab => (
              <TabsTrigger 
                key={tab} 
                value={tab}
                className="rounded-none border-b-2 border-transparent data-[state=active]:border-teal-700 data-[state=active]:bg-transparent data-[state=active]:text-teal-700 pb-4 px-0 font-medium"
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
        <div className="flex items-center gap-3 pb-4 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-2 shrink-0">
            <FileSpreadsheet className="w-5 h-5 text-green-600 cursor-pointer" />
            <FileText className="w-5 h-5 text-red-500 cursor-pointer" />
          </div>
          <Button 
            variant="outline"
            size="sm"
            onClick={() => setIsViewBrandsOpen(true)}
            className="text-xs font-medium text-slate-600 hover:bg-slate-50 shrink-0 h-8"
          >
            <ShieldCheck className="w-4 h-4 text-teal-600 mr-2" />
            View Brands
          </Button>
          <Button 
            size="sm"
            onClick={() => setIsAddBrandOpen(true)}
            className="bg-[#084d54] text-white hover:bg-teal-900 shrink-0 h-8"
          >
            <Plus className="w-3.5 h-3.5 mr-1.5" />
            Add Brand
          </Button>
        </div>
      </div>

      {activeTab === 'Stock Overview' && (
        <div className="flex flex-col gap-6">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
                <div className="relative flex-1 lg:max-w-sm">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <Input 
                    placeholder="Search by Product, SKU, Variant" 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 bg-slate-50 border-slate-200"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                    <SelectTrigger className="w-[160px] bg-white border-slate-200">
                      <SelectValue placeholder="Category: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">Category: All</SelectItem>
                      <SelectItem value="Zenz">Zenz</SelectItem>
                      <SelectItem value="Women">Women</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[160px] bg-white border-slate-200">
                      <SelectValue placeholder="Status: All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="All">Status: All</SelectItem>
                      <SelectItem value="STATUS">Active</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
            </div>
            <Button 
              onClick={() => setShowAIInsights(!showAIInsights)}
              className="bg-[#084d54] text-white hover:bg-teal-900 w-full lg:w-auto"
            >
              <Sparkles className="w-4 h-4 mr-2" />
              AI Insights
            </Button>
          </div>

          {showAIInsights && (
            <div className="relative bg-teal-50/50 border border-teal-100 rounded-2xl p-4 md:p-6">
              <Button 
                variant="ghost"
                size="icon"
                onClick={() => setShowAIInsights(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 h-8 w-8"
              >
                <X className="w-4 h-4" />
              </Button>
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
              <Table className="min-w-[800px]">
                <TableHeader className="bg-slate-50/50">
                  <TableRow>
                    <TableHead className="w-12 text-center">
                      <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                    </TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Product</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">SKU</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Variant</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Avail. Stock</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Reserved</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">Velocity(7d)</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Status</TableHead>
                    <TableHead className="text-[11px] font-bold text-slate-500 uppercase tracking-wider text-center">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredInventory.map((item, i) => (
                    <TableRow key={i} className="hover:bg-slate-50/30 transition-colors">
                      <TableCell className="text-center">
                        <input type="checkbox" className="rounded border-slate-300 text-teal-600 focus:ring-teal-500" />
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="text-sm font-semibold text-slate-900">{item.product}</span>
                          <span className="text-[11px] text-slate-400 uppercase font-medium">{item.brand}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm text-slate-600">{item.sku}</TableCell>
                      <TableCell className="text-sm text-slate-600 font-medium">{item.variant}</TableCell>
                      <TableCell className="text-sm text-slate-900 font-bold">{item.availStock}</TableCell>
                      <TableCell className="text-sm text-slate-900 font-bold">{item.reserved}</TableCell>
                      <TableCell className="text-sm text-slate-500 italic">{item.velocity}</TableCell>
                      <TableCell>
                        <div className="flex justify-center">
                          <Badge variant="secondary" className="bg-teal-50 text-teal-600 text-[10px] font-bold border border-teal-100">
                            {item.status}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-3">
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-teal-600">
                            <Edit2 className="w-3.5 h-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-400 hover:text-teal-600">
                            <History className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
                <Button variant="ghost" size="sm" className="text-[11px] font-medium text-slate-400 hover:text-slate-600 h-8">Prev</Button>
                <div className="flex gap-1">
                  <Button size="sm" className="w-8 h-8 rounded bg-[#084d54] text-white text-[11px] font-bold">1</Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50">2</Button>
                  <Button variant="ghost" size="sm" className="w-8 h-8 rounded text-slate-400 text-[11px] font-medium hover:bg-slate-50">3</Button>
                  <span className="text-slate-300 px-1">...</span>
                </div>
                <Button variant="ghost" size="sm" className="text-[11px] font-medium text-slate-600 hover:text-teal-700 h-8 font-bold">Next</Button>
              </div>
            </div>
          </div>
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
