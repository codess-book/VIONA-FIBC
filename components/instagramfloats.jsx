'use client'
import { useState } from 'react'

export default function ContactFloat() {
  const [hovered, setHovered] = useState(false)
  
  // Replace with your actual phone number (with country code)
  const phoneNumber = '+917992392070'  // Example: India +91 9876543210
  const url = `tel:${phoneNumber}`

  return (
    <a
      href={url}
      aria-label="Call us"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="fixed bottom-[5.5rem] right-4 sm:bottom-24 sm:right-6 z-[999] flex items-center gap-2 sm:gap-3 group"
      style={{ 
        filter: hovered ? 'drop-shadow(0 8px 24px rgba(34,197,94,0.45))' : 'drop-shadow(0 4px 12px rgba(34,197,94,0.2))', 
        transition: 'filter 0.3s ease' 
      }}
    >
      {/* Tooltip */}
      <div
        className="hidden sm:block font-['DM_Sans',sans-serif] text-[13px] font-[500] text-white px-4 py-2 rounded-full whitespace-nowrap transition-all duration-300"
        style={{
          background: 'rgba(18,35,63,0.92)',
          border: '1px solid rgba(34,197,94,0.25)',
          backdropFilter: 'blur(12px)',
          opacity: hovered ? 1 : 0,
          transform: hovered ? 'translateX(0) scale(1)' : 'translateX(8px) scale(0.95)',
          pointerEvents: 'none',
        }}
      >
        Call us now
      </div>

      {/* Button - Phone icon with green gradient */}
      <div
        className="relative w-11 h-11 sm:w-14 sm:h-14 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-300"
        style={{
          background: 'linear-gradient(135deg, #22c55e, #16a34a, #15803d)',
          transform: hovered ? 'scale(1.1)' : 'scale(1)',
          boxShadow: '0 4px 15px rgba(34,197,94,0.4)'
        }}
      >
        {/* Ping ring */}
        <span className="absolute inset-0 rounded-full bg-[#22c55e] animate-ping opacity-30" />

        {/* Phone SVG icon */}
        <svg
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          className="w-5 h-5 sm:w-7 sm:h-7 relative z-10"
          fill="none"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
        </svg>
      </div>
    </a>
  )
}