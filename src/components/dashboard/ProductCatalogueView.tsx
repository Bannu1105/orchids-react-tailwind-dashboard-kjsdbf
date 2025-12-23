"use client"

import React, { useState } from 'react'
import { 
  Search, 
  Plus, 
  Download, 
  FileText, 
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Filter,
  RefreshCw,
  X
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Badge } from '@/components/ui/badge'
import { CreateProductWizard } from './CreateProductWizard'
import { ProductDetailView } from './ProductDetailView'

const products = [
  {
    id: 1,
    name: 'Essential Linen Shirt',
    sku: 'ZN-LIN-101',
    category: 'Men > Shirts',
    variants: 4,
    stock: 150,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?w=100&h=100&fit=crop'
  },
  {
    id: 2,
    name: 'Essential Linen Shirt',
    sku: 'ZN-LIN-101',
    category: 'Men > Shirts',
    variants: 4,
    stock: 150,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?w=100&h=100&fit=crop'
  },
  {
    id: 3,
    name: 'Essential Linen Shirt',
    sku: 'ZN-LIN-101',
    category: 'Men > Shirts',
    variants: 4,
    stock: 150,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?w=100&h=100&fit=crop'
  },
  {
    id: 4,
    name: 'Essential Linen Shirt',
    sku: 'ZN-LIN-101',
    category: 'Men > Shirts',
    variants: 4,
    stock: 150,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?w=100&h=100&fit=crop'
  },
  {
    id: 5,
    name: 'Essential Linen Shirt',
    sku: 'ZN-LIN-101',
    category: 'Men > Shirts',
    variants: 4,
    stock: 150,
    status: 'ACTIVE',
    image: 'https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?w=100&h=100&fit=crop'
  }
]

export function ProductCatalogueView() {
  const [showCreateWizard, setShowCreateWizard] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  if (showCreateWizard) {
    return (
      <CreateProductWizard 
        onBack={() => setShowCreateWizard(false)} 
        onComplete={(product) => {
          setSelectedProduct(product)
          setShowCreateWizard(false)
        }}
      />
    )
  }

  if (selectedProduct) {
    return (
      <ProductDetailView 
        product={selectedProduct} 
        onBack={() => setSelectedProduct(null)} 
      />
    )
  }

  return (
    <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 lg:p-8">
      <div className="max-w-[1400px] mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
              <span>Operations</span>
              <span>/</span>
              <span className="text-[#084d54] font-medium">Product Catalogue</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">Product Catalogue</h1>
            <p className="text-xs text-slate-500 mt-1">Products are created by grouping inventory variants.</p>
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" className="gap-2 text-slate-600 border-slate-200">
              <RefreshCw className="w-4 h-4" />
              Sync Inventory
            </Button>
            <Button 
              onClick={() => setShowCreateWizard(true)}
              className="gap-2 bg-[#084d54] hover:bg-[#063a40] text-white"
            >
              <Plus className="w-4 h-4" />
              Create Product
            </Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label: 'Total Products', value: '1240' },
            { label: 'Active Products', value: '1140' },
            { label: 'Drafts', value: '45' },
            { label: 'With Issues', value: '12' },
            { label: 'Low Stock', value: '83' },
          ].map((stat) => (
            <div key={stat.label} className="bg-white p-6 rounded-xl border border-slate-100 shadow-sm">
              <p className="text-sm font-medium text-slate-500 mb-2">{stat.label}</p>
              <p className="text-3xl font-bold text-slate-900">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="bg-white p-4 rounded-xl border border-slate-100 shadow-sm flex flex-wrap items-center gap-4">
          <div className="relative flex-1 min-w-[300px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input 
              placeholder="Search by Product, SKU, Variant" 
              className="pl-10 bg-slate-50 border-none h-10"
            />
          </div>
          
          <div className="flex flex-wrap items-center gap-2">
            <Select defaultValue="all">
              <SelectTrigger className="w-[140px] h-10 border-slate-200 text-[#084d54] font-medium">
                <SelectValue placeholder="Category: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Category: All</SelectItem>
                <SelectItem value="men">Men</SelectItem>
                <SelectItem value="women">Women</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] h-10 border-slate-200 text-[#084d54] font-medium">
                <SelectValue placeholder="Brand" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Brand: All</SelectItem>
                <SelectItem value="brand1">Brand A</SelectItem>
                <SelectItem value="brand2">Brand B</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[120px] h-10 border-slate-200 text-[#084d54] font-medium">
                <SelectValue placeholder="Status: All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Status: All</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2 px-2">
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <div className="w-5 h-5 bg-green-100 flex items-center justify-center rounded text-green-700">
                  <span className="text-[10px] font-bold">X</span>
                </div>
              </button>
              <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <div className="w-5 h-5 bg-red-100 flex items-center justify-center rounded text-red-700">
                  <span className="text-[10px] font-bold">P</span>
                </div>
              </button>
            </div>

            <Button variant="ghost" className="text-orange-500 hover:text-orange-600 font-medium h-10 px-2">
              Clear All
            </Button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Base SKU</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Variants</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-center">Stock</th>
                  <th className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Status</th>
                </tr>
              </thead>
                <tbody className="divide-y divide-slate-50">
                  {products.map((product) => (
                    <tr 
                      key={product.id} 
                      onClick={() => setSelectedProduct(product)}
                      className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                    >
                      <td className="px-6 py-4">

                      <div className="flex items-center gap-3">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-10 h-10 rounded-lg object-cover bg-slate-100"
                        />
                        <span className="font-semibold text-slate-900 group-hover:text-[#084d54]">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-600">{product.sku}</td>
                    <td className="px-6 py-4 text-sm text-slate-600">{product.category}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-center font-medium">{product.variants.toString().padStart(2, '0')}</td>
                    <td className="px-6 py-4 text-sm text-slate-600 text-center font-medium">{product.stock}</td>
                    <td className="px-6 py-4 text-right">
                      <span className="text-[10px] font-bold text-teal-600 tracking-wider">
                        {product.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-slate-100 flex items-center justify-between">
            <Select defaultValue="05">
              <SelectTrigger className="w-[80px] h-8 border-slate-200 text-slate-600 text-xs">
                <SelectValue placeholder="05" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="05">05</SelectItem>
                <SelectItem value="10">10</SelectItem>
                <SelectItem value="25">25</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-500 mr-2">Prev</span>
              {[1, 2, 3, '...', 10].map((page, i) => (
                <button
                  key={i}
                  className={cn(
                    "w-8 h-8 rounded-lg flex items-center justify-center text-xs font-medium transition-colors",
                    page === 1 ? "bg-[#084d54] text-white" : "text-slate-600 hover:bg-slate-100"
                  )}
                >
                  {page}
                </button>
              ))}
              <span className="text-xs text-slate-500 ml-2">Next</span>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
