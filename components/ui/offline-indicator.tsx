'use client'

import { useState, useEffect } from 'react'

export function OfflineIndicator() {
  const [isOffline, setIsOffline] = useState(false)
  
  useEffect(() => {
    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)
    
    // Set initial state
    if (typeof navigator !== 'undefined') {
      setIsOffline(!navigator.onLine)
    }
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])
  
  if (!isOffline) return null
  
  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white py-2 text-center z-50">
      You are offline. Some features may be limited.
    </div>
  )
} 