import React from 'react'
import Image from 'next/image'

export function Logo({ className = 'h-8 w-auto' }) {
  return (
    <div className={className}>
      <Image
        src="/logo.svg"
        alt="Orchids Logo"
        width={100}
        height={30}
        priority
        className="h-full w-auto"
      />
    </div>
  )
}