"use client"

import React, { useState } from 'react'
import { X, Download, FileText, Upload, Trash2, Info, Check, ChevronDown, AlertCircle } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog"
import { Button } from '@/components/ui/button'

export function BulkUploadModal({ isOpen, onClose }) {
  const [step, setStep] = useState(1)
  const [file, setFile] = useState(null)
  const [isValidated, setIsValidated] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const steps = [
    { id: 1, label: 'TEMPLATE' },
    { id: 2, label: 'UPLOAD' },
    { id: 3, label: 'MAP FIELDS' },
    { id: 4, label: 'PREVIEW' }
  ]

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1)
    } else {
      setIsSubmitted(true)
    }
  }

  const handleBack = () => {
    if (isSubmitted) {
      setIsSubmitted(false)
      setStep(4)
    } else if (step > 1) {
      setStep(step - 1)
    }
  }

  const handleFileUpload = (e) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
      setTimeout(() => setIsValidated(true), 1000)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[800px] bg-white rounded-2xl p-0 overflow-hidden border-none">
        <div className="p-6 pb-2">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-xl font-bold text-slate-900">Bulk Stock Upload</h2>
              <p className="text-xs text-slate-500 mt-1">Import a CSV to add/update variant stock and reorder levels.</p>
            </div>
          </div>
        </div>

        <div className="px-12 py-6 border-b border-slate-50">
          <div className="flex items-center justify-between relative">
            <div className="absolute top-[18px] left-0 w-full h-[1px] bg-slate-100 z-0" />
            
            {steps.map((s) => (
              <div key={s.id} className="relative z-10 flex flex-col items-center gap-2 group">
                <div className={cn(
                  "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                  (isSubmitted || step > s.id) ? "bg-[#084d54] text-white" : 
                  step === s.id ? "bg-[#084d54] text-white shadow-lg shadow-teal-100 scale-110" : 
                  "bg-white border border-slate-200 text-slate-400"
                )}>
                  {(isSubmitted || step > s.id) ? <Check className="w-5 h-5" /> : s.id}
                </div>
                <span className={cn(
                  "text-[10px] font-bold tracking-wider",
                  (isSubmitted || step === s.id) ? "text-[#084d54]" : "text-slate-400"
                )}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p-8 min-h-[360px] max-h-[500px] overflow-y-auto">
          {isSubmitted ? (
            <div className="flex flex-col items-center justify-center py-8">
              <div className="grid grid-cols-4 gap-4 w-full mb-12">
                {[
                  { label: 'TOTAL ROWS', value: '1,250' },
                  { label: 'UPDATES', value: '1,080' },
                  { label: 'NEW RECORDS', value: '678' },
                  { label: 'SKIPPED', value: '20' }
                ].map((stat, i) => (
                  <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                    <p className="text-lg font-bold text-slate-900 mt-1">{stat.value}</p>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col items-center gap-6">
                <div className="w-20 h-20 bg-teal-50 rounded-full flex items-center justify-center text-teal-600">
                  <Check className="w-10 h-10 stroke-[3]" />
                </div>
                <h2 className="text-2xl font-black text-teal-600 tracking-tight uppercase">Inventory Successfully Updated!</h2>
              </div>
            </div>
          ) : (
            <>
              {step === 1 && (
                <div className="space-y-6">
                  <div className="p-6 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-between group hover:border-teal-100 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-all">
                        <FileText className="w-6 h-6" />
                      </div>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Download CSV Template</h3>
                        <p className="text-[11px] text-slate-500 mt-1">Contains all required columns formatted correctly.</p>
                        <button className="text-[11px] text-teal-600 font-semibold mt-1 hover:underline">Download sample filled file</button>
                      </div>
                    </div>
                    <Button variant="outline" className="gap-2 border-[#084d54] text-[#084d54] rounded-lg text-xs font-bold hover:bg-teal-50">
                      <Download className="w-4 h-4" />
                      Download Template
                    </Button>
                  </div>

                  <div className="p-4 bg-teal-50/50 rounded-xl border border-teal-50 flex gap-3">
                    <Info className="w-5 h-5 text-teal-600 shrink-0" />
                    <div className="space-y-2">
                      <h4 className="text-[11px] font-bold text-teal-900 uppercase tracking-tight">Instructions</h4>
                      <ul className="text-[11px] text-teal-700 space-y-1.5 list-disc pl-4">
                        <li>Use the template below to ensure correct mapping.</li>
                        <li><span className="font-bold">SKU</span> is the unique identifier; do not change it.</li>
                        <li><span className="font-bold">Available Stock</span> must be a non-negative integer.</li>
                      </ul>
                    </div>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  {!file ? (
                    <div className="border-2 border-dashed border-slate-200 rounded-2xl p-12 flex flex-col items-center justify-center gap-4 hover:border-teal-300 hover:bg-teal-50/20 transition-all group cursor-pointer relative">
                      <input 
                        type="file" 
                        className="absolute inset-0 opacity-0 cursor-pointer" 
                        accept=".csv"
                        onChange={handleFileUpload}
                      />
                      <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-teal-600 group-hover:scale-110 transition-transform">
                        <Upload className="w-8 h-8" />
                      </div>
                      <div className="text-center">
                        <h3 className="text-sm font-bold text-slate-900">Drag & drop your CSV here</h3>
                        <p className="text-[11px] text-slate-400 mt-1 italic font-medium">or click to browse from your computer</p>
                      </div>
                      <Button variant="secondary" size="sm" className="mt-2 text-[11px] font-bold">Browse Files</Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 bg-teal-50 rounded flex items-center justify-center text-teal-600">
                            <FileText className="w-5 h-5" />
                          </div>
                          <div>
                            <h3 className="text-sm font-bold text-slate-900">{file.name}</h3>
                            <p className="text-[10px] text-slate-400 mt-0.5">{(file.size / 1024).toFixed(2)} KB • Uploaded just now</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon" onClick={() => {setFile(null); setIsValidated(false)}} className="text-rose-400 hover:bg-rose-50 rounded-full">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>

                      {isValidated && (
                        <div className="p-5 bg-teal-50/50 border border-teal-100 rounded-xl">
                          <div className="flex items-start gap-3">
                            <div className="w-6 h-6 bg-teal-100 rounded-full flex items-center justify-center text-teal-600 shrink-0">
                              <Check className="w-4 h-4" />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-bold text-teal-900">File validated successfully</h4>
                              <p className="text-[11px] text-teal-700 mt-1 font-medium">Ready for mapping. Found 1250 rows and 5 columns.</p>
                              <div className="flex gap-4 mt-4">
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-teal-100 rounded-full">
                                  <span className="w-2 h-2 bg-teal-500 rounded-full" />
                                  <span className="text-[10px] font-bold text-teal-900">1248 Valid Rows</span>
                                </div>
                                <div className="flex items-center gap-2 px-3 py-1.5 bg-white border border-amber-100 rounded-full">
                                  <span className="w-2 h-2 bg-[#f59e0b] rounded-full" />
                                  <span className="text-[10px] font-bold text-[#f59e0b]">2 Warnings</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">Map Fields</h3>
                      <p className="text-[11px] text-slate-400">Match your CSV columns to the system inventory fields.</p>
                    </div>
                  </div>

                  <div className="border border-slate-100 rounded-xl overflow-hidden text-sm">
                    <table className="w-full text-left">
                      <thead>
                        <tr className="bg-slate-50 text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100">
                          <th className="px-6 py-3">System Field</th>
                          <th className="px-6 py-3">Required?</th>
                          <th className="px-6 py-3">Your CSV Header</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { field: 'SKU ID', required: true, mapped: 'SKU ID' },
                          { field: 'PRODUCT NAME', required: true, mapped: 'Product Name' },
                          { field: 'VARIANT', required: true, mapped: 'Variant' },
                          { field: 'AVAILABLE STOCK', required: true, mapped: 'Stock' }
                        ].map((row, i) => (
                          <tr key={i} className="hover:bg-slate-50/30">
                            <td className="px-6 py-4 text-xs font-bold text-slate-700">{row.field}</td>
                            <td className="px-6 py-4">
                              <span className="text-[10px] font-bold text-rose-500 uppercase">Required</span>
                            </td>
                            <td className="px-6 py-4">
                              <select className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-xs font-medium text-slate-600 outline-none">
                                <option>{row.mapped}</option>
                                <option>Select Column</option>
                              </select>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div className="grid grid-cols-4 gap-4">
                    {[
                      { label: 'TOTAL ROWS', value: '1,250' },
                      { label: 'UPDATES', value: '1,080' },
                      { label: 'NEW RECORDS', value: '678' },
                      { label: 'SKIPPED', value: '20' }
                    ].map((stat, i) => (
                      <div key={i} className="p-4 bg-white border border-slate-100 rounded-xl shadow-sm">
                        <p className="text-[9px] font-bold text-slate-400 uppercase tracking-wider">{stat.label}</p>
                        <p className="text-lg font-bold text-slate-900 mt-1">{stat.value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="border border-slate-100 rounded-xl overflow-hidden">
                    <div className="bg-slate-50 px-6 py-3 border-b border-slate-100 flex items-center justify-between">
                       <h3 className="text-xs font-bold text-slate-900">Preview Changes (First 5 Rows)</h3>
                    </div>
                    <table className="w-full text-left">
                      <thead>
                        <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                          <th className="px-6 py-3">SKUID</th>
                          <th className="px-6 py-3">Current Stock</th>
                          <th className="px-6 py-3 text-teal-600">New Stock</th>
                          <th className="px-6 py-3">Delta</th>
                          <th className="px-6 py-3">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-50">
                        {[
                          { id: 'VNT-TSH-001', current: '45', new: '120', delta: '+75', status: 'Update', type: 'update' },
                          { id: 'VNT-TSH-002', current: '12', new: '0', delta: '-12', status: 'Update', type: 'update', warn: true },
                          { id: 'VNT-JNS-009', current: '-', new: '50', delta: '-', status: 'New Record', type: 'new' },
                          { id: 'ACC-BLT-004', current: '100', new: '80', delta: '-20', status: 'Update', type: 'update', warn: true },
                          { id: 'ACC-HAT-012', current: '25', new: '25', delta: '0', status: 'Update', type: 'update' }
                        ].map((row, i) => (
                          <tr key={i} className="text-xs hover:bg-slate-50/30">
                            <td className="px-6 py-4 font-medium text-slate-600">{row.id}</td>
                            <td className="px-6 py-4 text-slate-400">{row.current}</td>
                            <td className="px-6 py-4 font-bold text-slate-900">{row.new}</td>
                            <td className="px-6 py-4 font-bold">
                              <span className={cn(
                                row.delta.startsWith('+') ? "text-teal-600" : 
                                row.delta === '0' ? "text-slate-400" : "text-[#f59e0b]",
                                "flex items-center gap-1"
                              )}>
                                {row.delta}
                                {row.warn && <AlertCircle className="w-3 h-3" />}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <span className={cn(
                                "px-2 py-0.5 rounded-full text-[9px] font-bold border",
                                row.type === 'new' ? "bg-teal-50 text-teal-600 border-teal-100" : "bg-slate-50 text-slate-500 border-slate-100"
                              )}>
                                {row.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </>
          )}
        </div>

        <div className="p-6 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <Button 
            variant="outline"
            onClick={isSubmitted ? onClose : step === 1 ? onClose : handleBack}
            className="px-8 py-2.5 bg-white rounded-lg text-xs font-bold text-slate-500 h-auto"
          >
            {isSubmitted ? 'Close' : step === 1 ? 'Cancel' : 'Back'}
          </Button>
          
          {!isSubmitted && (
            <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
              Step {step} of 4
            </div>
          )}

          <Button 
            onClick={isSubmitted ? onClose : handleNext}
            className={cn(
              "px-10 py-2.5 rounded-lg text-xs font-bold transition-all shadow-md h-auto",
              (isSubmitted || step === 4) ? "bg-[#084d54] text-white hover:bg-teal-900" : 
              step === 2 && !file ? "bg-slate-200 text-slate-400 cursor-not-allowed" :
              "bg-[#084d54] text-white hover:bg-teal-900"
            )}
            disabled={!isSubmitted && step === 2 && !file}
          >
            {isSubmitted ? 'DONE' : step === 4 ? 'SUBMIT' : 'NEXT'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
