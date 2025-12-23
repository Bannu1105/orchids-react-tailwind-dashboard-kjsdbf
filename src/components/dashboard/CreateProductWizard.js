"use client"

import React, { useState } from 'react'
import { 
  X, 
  Check, 
  Upload, 
  AlertCircle
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { AddToCampaignDrawer } from './AddToCampaignDrawer'

const steps = [
  { id: 1, name: 'Select Variants' },
  { id: 2, name: 'Info & Media' },
  { id: 3, name: 'Pricing & Tax' },
  { id: 4, name: 'Review' }
]

const availableVariants = [
  { id: '1', name: 'Zen Cotton Tee', sku: 'ZN-TSH-001', variant: 'Teal / L' },
  { id: '2', name: 'Zen Cotton Tee', sku: 'ZN-TSH-001', variant: 'Teal / M' },
  { id: '3', name: 'Zen Cotton Tee', sku: 'ZN-TSH-001', variant: 'Teal / S' },
  { id: '4', name: 'Zen Cotton Tee', sku: 'ZN-TSH-001', variant: 'Teal / XS' },
  { id: '5', name: 'Zen Cotton Tee', sku: 'ZN-TSH-001', variant: 'Black / L' },
]

export function CreateProductWizard({ onBack, onComplete }) {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSuccess, setIsSuccess] = useState(false)
  const [showCampaignDrawer, setShowCampaignDrawer] = useState(false)
  const [selectedVariants, setSelectedVariants] = useState([])
  const [pricingStrategy, setPricingStrategy] = useState('single')

  const toggleVariant = (variant) => {
    if (selectedVariants.find(v => v.id === variant.id)) {
      setSelectedVariants(selectedVariants.filter(v => v.id !== variant.id))
    } else {
      setSelectedVariants([...selectedVariants, variant])
    }
  }

  const renderStep = () => {
    if (isSuccess) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="bg-white rounded-[32px] border border-slate-100 shadow-xl p-12 max-w-md w-full text-center space-y-8 animate-in fade-in zoom-in duration-500">
            <div className="w-16 h-16 bg-teal-50 rounded-full flex items-center justify-center mx-auto">
              <div className="w-10 h-10 rounded-full border-2 border-[#084d54] flex items-center justify-center">
                <Check className="w-6 h-6 text-[#084d54]" />
              </div>
            </div>
            
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-slate-900">Product Published!</h2>
              <p className="text-slate-500">"Zen Cotton Tee" is now live on the store.</p>
            </div>

            <div className="space-y-3">
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl bg-[#084d54] text-white hover:bg-[#063a40] font-bold border-none"
                onClick={() => onComplete?.({ id: 1, name: 'Zen Cotton Tee' })}
              >
                View Product
              </Button>
              <Button 
                variant="outline" 
                className="w-full h-12 rounded-xl border-slate-200 text-slate-600 font-bold"
                onClick={() => setShowCampaignDrawer(true)}
              >
                Add to Campaign
              </Button>
              <button 
                onClick={onBack}
                className="text-xs font-bold text-slate-400 hover:text-[#084d54] transition-colors pt-2"
              >
                Back to List
              </button>
            </div>
          </div>
        </div>
      )
    }

    switch (currentStep) {
      case 1:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col h-full">
              <h3 className="font-semibold text-slate-900 mb-1">Inventory Search</h3>
              <p className="text-xs text-slate-500 mb-6">Select variants to group into one product.</p>
              
              <div className="flex gap-2 mb-6">
                <Input placeholder="Search Base SKU or Name" className="bg-white" />
                <Button className="bg-[#084d54] hover:bg-[#063a40]">SEARCH</Button>
              </div>

              <div className="flex-1 overflow-y-auto space-y-3 pr-2">
                {availableVariants.map((variant) => (
                  <div 
                    key={variant.id}
                    className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between group cursor-pointer hover:border-[#084d54]/50 transition-all"
                    onClick={() => toggleVariant(variant)}
                  >
                    <div>
                      <p className="font-semibold text-slate-900">{variant.name}</p>
                      <p className="text-xs text-slate-500">{variant.sku} • {variant.variant}</p>
                    </div>
                    <div className={cn(
                      "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                      selectedVariants.find(v => v.id === variant.id) 
                        ? "bg-[#084d54] border-[#084d54] text-white" 
                        : "border-slate-300 bg-white"
                    )}>
                      {selectedVariants.find(v => v.id === variant.id) && <Check className="w-3 h-3" />}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col h-full">
              <h3 className="font-semibold text-slate-900 mb-1">Selected to Group ({selectedVariants.length})</h3>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                {selectedVariants.length === 0 ? (
                  <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-white rounded-2xl border border-dashed border-slate-300 flex items-center justify-center mx-auto" />
                    <p className="text-slate-400 font-medium">No Variants Selected</p>
                  </div>
                ) : (
                  <div className="w-full flex-1 overflow-y-auto space-y-3 pr-2 mt-4">
                    {selectedVariants.map((variant) => (
                      <div 
                        key={variant.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between"
                      >
                        <div>
                          <p className="font-semibold text-slate-900">{variant.name}</p>
                          <p className="text-xs text-slate-500">{variant.sku} • {variant.variant}</p>
                        </div>
                        <button 
                          onClick={(e) => {
                            e.stopPropagation()
                            toggleVariant(variant)
                          }}
                          className="p-1.5 text-red-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )
      case 2:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 h-[500px]">
            <div className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col h-full space-y-6 overflow-y-auto">
              <div className="space-y-4">
                <h3 className="font-semibold text-slate-900">Identity</h3>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500">Product Title</label>
                  <Input placeholder="e.g. ZENZ Oversized Cotton Shirt" className="bg-slate-50 border-none" />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-medium text-slate-500">Description</label>
                  <Textarea placeholder="Enter Product Description" className="bg-slate-50 border-none min-h-[120px]" />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-slate-900">Media</h3>
                  <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">Min 4 Required</span>
                </div>
                <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center bg-slate-50/50 hover:bg-slate-50 transition-colors cursor-pointer">
                  <Upload className="w-10 h-10 text-slate-300 mb-4" />
                  <p className="text-sm font-medium text-slate-900">Click to upload or drag & drop</p>
                </div>
              </div>
            </div>

            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-6 flex flex-col h-full space-y-6">
              <div className="flex-1 overflow-y-auto space-y-6 pr-2">
                <div>
                  <h3 className="font-semibold text-slate-900 mb-4">Selected to Group ({selectedVariants.length})</h3>
                  <div className="space-y-3">
                    {selectedVariants.map((variant) => (
                      <div key={variant.id} className="bg-white p-4 rounded-xl border border-slate-200 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-slate-900">{variant.name}</p>
                          <p className="text-xs text-slate-500">{variant.sku} • {variant.variant}</p>
                        </div>
                        <button className="p-1.5 text-red-400 hover:text-red-500">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )
      case 3:
        return (
          <div className="bg-white rounded-3xl border border-slate-200 p-8 h-[500px] flex flex-col">
            <div className="max-w-4xl mx-auto w-full space-y-8">
              <div className="bg-slate-50/50 rounded-2xl p-6 border border-slate-100 flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-slate-900 text-lg">Pricing Strategy</h3>
                  <p className="text-sm text-slate-500">Set same price for all variants or customize.</p>
                </div>
                <div className="flex bg-white rounded-xl p-1 border border-slate-200">
                  <button 
                    onClick={() => setPricingStrategy('single')}
                    className={cn(
                      "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                      pricingStrategy === 'single' ? "bg-[#084d54] text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    Single Price
                  </button>
                  <button 
                    onClick={() => setPricingStrategy('variant')}
                    className={cn(
                      "px-6 py-2 rounded-lg text-sm font-bold transition-all",
                      pricingStrategy === 'variant' ? "bg-[#084d54] text-white shadow-lg" : "text-slate-500 hover:bg-slate-50"
                    )}
                  >
                    Variant-wise
                  </button>
                </div>
              </div>

              {pricingStrategy === 'single' ? (
                <div className="grid grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">MRP (₹)</label>
                    <Input placeholder="9999" className="bg-slate-50 border-none h-12" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Sale Price (₹)</label>
                    <Input placeholder="2999" className="bg-slate-50 border-none h-12" />
                  </div>
                  <div className="space-y-2 col-span-1">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">GST %</label>
                    <Select defaultValue="12">
                      <SelectTrigger className="bg-slate-50 border-none h-12 font-bold">
                        <SelectValue placeholder="12%" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="5">5%</SelectItem>
                        <SelectItem value="12">12%</SelectItem>
                        <SelectItem value="18">18%</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <div className="border border-slate-100 rounded-2xl overflow-hidden">
                  <div className="bg-slate-50/50 px-6 py-4 grid grid-cols-3 gap-4 border-b border-slate-100">
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Variant</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">MRP</div>
                    <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Sale</div>
                  </div>
                  <div className="max-h-[250px] overflow-y-auto">
                    {selectedVariants.map((variant) => (
                      <div key={variant.id} className="px-6 py-4 grid grid-cols-3 gap-4 items-center border-b border-slate-50 last:border-none">
                        <div className="text-sm font-bold text-slate-900">{variant.variant}</div>
                        <Input placeholder="MRP" className="bg-slate-50 border-none h-10" />
                        <Input placeholder="Sale" className="bg-slate-50 border-none h-10" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )
      case 4:
        return (
          <div className="max-w-4xl mx-auto w-full space-y-8 py-4 h-[500px] overflow-y-auto">
            <div className="bg-white border border-red-100 rounded-[24px] p-6 flex items-center justify-between shadow-sm">
              <div className="flex gap-4">
                <div className="w-1 h-full bg-red-500 rounded-full" />
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-500 mt-1" />
                  <div>
                    <h4 className="font-bold text-red-600 text-lg">Publishing Blocked</h4>
                    <p className="text-sm text-red-400">Missing media images (Min 3).</p>
                  </div>
                </div>
              </div>
              <Button variant="outline" className="border-slate-200 text-slate-600 font-bold px-6">Fix</Button>
            </div>

            <div className="bg-white rounded-[24px] border border-slate-200 p-8 space-y-8">
              <h3 className="font-bold text-slate-900 text-lg">Summary</h3>
              
              <div className="grid grid-cols-2 gap-y-8 gap-x-12">
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Title</p>
                  <p className="font-bold text-slate-900">Zen Cotton Tee</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Variants</p>
                  <p className="font-bold text-slate-900">{selectedVariants.length}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price</p>
                  <p className="font-bold text-slate-900">₹2,499 (Single)</p>
                </div>
                <div className="space-y-1">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">GST</p>
                  <p className="font-bold text-slate-900">12%</p>
                </div>
              </div>
            </div>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <main className="flex-1 overflow-y-auto bg-[#f8fafc] p-4 lg:p-8">
      <div className="max-w-[1200px] mx-auto space-y-8">
        <div>
          <div className="flex items-center gap-2 text-sm text-slate-500 mb-1">
            <span>Operations</span>
            <span>/</span>
            <span className="text-[#084d54] font-medium">Product Catalogue</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-900">Create Product</h1>
        </div>

        {!isSuccess && (
          <div className="relative flex items-center justify-between max-w-4xl mx-auto px-4">
            <div className="absolute top-5 left-8 right-8 h-[2px] bg-slate-100 -z-10" />
            
            {steps.map((step) => (
              <div key={step.id} className="flex flex-col items-center gap-3">
                <div className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  currentStep >= step.id 
                    ? "bg-[#084d54] text-white shadow-lg shadow-teal-900/20" 
                    : "bg-white text-slate-300 border border-slate-200"
                )}>
                  {currentStep > step.id ? <Check className="w-5 h-5" /> : step.id}
                </div>
                <span className={cn(
                  "text-xs font-bold transition-colors duration-300",
                  currentStep >= step.id ? "text-[#084d54]" : "text-slate-400"
                )}>
                  {step.name}
                </span>
              </div>
            ))}
          </div>
        )}

        {renderStep()}

        {!isSuccess && (
          <div className="flex items-center justify-between pt-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                onClick={currentStep === 1 ? onBack : () => setCurrentStep(prev => prev - 1)}
                className="px-8 border-slate-200 text-slate-600 font-bold"
              >
                {currentStep === 1 ? 'Cancel' : 'Back'}
              </Button>
            </div>
            
            <div className="flex items-center gap-4">
              {currentStep === 4 && (
                <Button 
                  variant="outline"
                  className="px-8 border-slate-200 text-slate-600 font-bold"
                >
                  Save
                </Button>
              )}
              <Button 
                onClick={() => {
                  if (currentStep < steps.length) {
                    setCurrentStep(prev => prev + 1)
                  } else {
                    setIsSuccess(true)
                  }
                }}
                className="px-8 bg-[#084d54] hover:bg-[#063a40] text-white font-bold"
              >
                {currentStep === steps.length ? 'Publish Product' : 'Next Step'}
              </Button>
            </div>
          </div>
        )}
      </div>

      <AddToCampaignDrawer isOpen={showCampaignDrawer} onClose={() => setShowCampaignDrawer(false)} />
    </main>
  )
}
