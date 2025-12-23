"use client"

import React, { useState } from 'react'
import { 
  ChevronRight, 
  Button 
} from '@/components/ui/button'
import { AddToCampaignDrawer } from './AddToCampaignDrawer'
import { cn } from '@/lib/utils'

export function ProductDetailView({ product, onBack }) {
  const [showCampaignDrawer, setShowCampaignDrawer] = useState(false)

  const media = [
    "https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?w=800&q=80",
    "https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?w=400&q=80",
    "https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?w=400&q=80",
    "https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?w=400&q=80",
    "https://images.unsplash.com/photo-1594932224828-b4b059b6f68d?w=400&q=80"
  ]

  const variants = [
    { color: 'Teal', size: 'S', sku: 'ZN-LIN-101-1', price: '₹2,499', stock: 45, status: 'Normal' },
    { color: 'Teal', size: 'M', sku: 'ZN-LIN-101-2', price: '₹2,499', stock: 2, status: 'Low' },
    { color: 'Teal', size: 'L', sku: 'ZN-LIN-101-3', price: '₹2,499', stock: 45, status: 'Normal' }
  ]

  return (
    <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 lg:p-8">
      <div className="max-w-[1400px] mx-auto space-y-8">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs text-slate-400 font-bold">
              <button onClick={onBack} className="hover:text-[#084d54] transition-colors">Products</button>
              <span className="text-slate-300">/</span>
              <span className="text-slate-500">Essential Linen Shirt</span>
            </div>
            <h1 className="text-3xl font-bold text-slate-900">Essential Linen Shirt</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <Button variant="outline" className="text-red-500 border-red-200 hover:bg-red-50 font-bold px-6 h-10 rounded-lg">
              Archive
            </Button>
            <Button 
              variant="outline" 
              className="text-slate-600 border-slate-200 hover:bg-slate-50 font-bold px-6 h-10 rounded-lg"
              onClick={() => setShowCampaignDrawer(true)}
            >
              Add to Campaign
            </Button>
            <Button className="bg-[#084d54] hover:bg-[#063a40] text-white font-bold px-6 h-10 rounded-lg">
              Edit Product
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-6">
            <h3 className="text-lg font-bold text-slate-900">Media</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="col-span-2 row-span-2 aspect-[4/5] rounded-[24px] overflow-hidden bg-slate-100">
                <img src={media[0]} alt="Product" className="w-full h-full object-cover" />
              </div>
              {media.slice(1).map((img, i) => (
                <div key={i} className="aspect-square rounded-2xl overflow-hidden bg-slate-100">
                  <img src={img} alt={`Product ${i + 1}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm p-8 space-y-8">
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Category</p>
                <p className="text-lg font-bold text-slate-900">Men &gt; Shirts</p>
              </div>
              
              <div className="space-y-4">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Base SKU</p>
                <p className="text-lg font-bold text-slate-900 tracking-tight">ZN-LIN-101</p>
              </div>

              <div className="pt-8 border-t border-slate-50 flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-slate-400">Total Stock</p>
                  <p className="text-2xl font-bold text-slate-900 mt-1">120</p>
                </div>
                <button className="text-xs font-bold text-slate-400 hover:text-[#084d54] transition-colors border-b border-transparent hover:border-[#084d54]">
                  Go to Inventory
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-[32px] border border-slate-100 shadow-sm overflow-hidden p-8 space-y-8">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-slate-900">Variants (Read-Only)</h3>
            <span className="text-[10px] font-bold text-slate-400 bg-slate-100 px-3 py-1 rounded-full uppercase tracking-wider">
              Stock managed in Inventory
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-50">
                  <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Variant</th>
                  <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">SKU</th>
                  <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Price</th>
                  <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest">Stock</th>
                  <th className="pb-6 text-[10px] font-bold text-slate-400 uppercase tracking-widest text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {variants.map((variant, i) => (
                  <tr key={i} className="group">
                    <td className="py-6 flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full bg-[#084d54]" />
                      <span className="font-bold text-slate-900">{variant.color} / {variant.size}</span>
                    </td>
                    <td className="py-6 text-sm font-medium text-slate-500 tracking-tight">{variant.sku}</td>
                    <td className="py-6 text-sm font-bold text-slate-900">{variant.price}</td>
                    <td className="py-6">
                      <span className={cn(
                        "text-sm font-bold",
                        variant.status === 'Low' ? "text-red-500" : "text-slate-900"
                      )}>
                        {variant.stock} {variant.status === 'Low' && <span className="text-[10px] font-bold ml-1">(Low)</span>}
                      </span>
                    </td>
                    <td className="py-6 text-right">
                      <button className="text-xs font-bold text-teal-600 hover:text-teal-700">Adjust</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <AddToCampaignDrawer isOpen={showCampaignDrawer} onClose={() => setShowCampaignDrawer(false)} />
    </main>
  )
}
