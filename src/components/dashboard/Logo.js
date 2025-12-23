import React from 'react'

export function Logo({ className }) {
  return (
    <svg 
      className={className} 
      viewBox="0 0 100 30" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <text 
        x="0" 
        y="22" 
        fontFamily="sans-serif" 
        fontWeight="bold" 
        fontSize="24" 
        fill="#084d54"
      >
        ORCHIDS
      </text>
    </svg>
  )
}
