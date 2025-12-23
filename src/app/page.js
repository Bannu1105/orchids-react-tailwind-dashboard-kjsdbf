"use client"

import React, { useState } from 'react'
import { Sidebar } from '../components/dashboard/Sidebar'
import { TopBar } from '../components/dashboard/TopBar'
import { DashboardView } from '../components/dashboard/DashboardView'
import { InventoryView } from '../components/dashboard/InventoryView'
import { SalesFinanceView } from '../components/dashboard/SalesFinanceView'
import { OrdersView } from '../components/dashboard/OrdersView'
import { ProductCatalogueView } from '../components/dashboard/ProductCatalogueView'

export default function DashboardPage() {
  const [activeItem, setActiveItem] = useState('Dashboard')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeItem) {
      case 'Dashboard':
        return <DashboardView />
      case 'Inventory':
        return <InventoryView />
      case 'Product Catalogue':
        return <ProductCatalogueView />
      case 'Orders':
        return <OrdersView />
      case 'Sales & Finance':
        return <SalesFinanceView />
      default:
        return (
          <main className="flex-1 flex items-center justify-center text-slate-400">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">{activeItem}</h2>
              <p>This section is under development.</p>
            </div>
          </main>
        )
    }
  }

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden relative">
      <Sidebar 
        activeItem={activeItem} 
        onNavigate={(item) => {
          setActiveItem(item)
          setIsSidebarOpen(false)
        }} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopBar activeItem={activeItem} onMenuClick={() => setIsSidebarOpen(true)} />
        {renderContent()}
      </div>
    </div>
  )
}
