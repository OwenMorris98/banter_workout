'use client'

import { useState, useEffect } from 'react'

export function PWAStatus({ isStandalone }: { isStandalone: boolean }) {
  const [isCompatible, setIsCompatible] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  
  useEffect(() => {
    // Check if browser supports PWA installation
    const isBeforeInstallPromptSupported = 'BeforeInstallPromptEvent' in window
    const isIOSDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    
    setIsCompatible(isBeforeInstallPromptSupported || isIOSDevice)
    
    // Detect if device is desktop
    const isDesktopDevice = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    setIsDesktop(isDesktopDevice);
  }, [])
  
  if (!isCompatible) {
    return null // Don't show any status if browser doesn't support PWAs
  }
  
  if (isStandalone) {
    return (
      <div className="inline-flex items-center text-xs text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-full py-1 px-3">
        <span className="mr-1 text-sm">{isDesktop ? '💻' : '📱'}</span> 
        App Mode
      </div>
    )
  }
  
  return (
    <div className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
      <span className="mr-1 text-sm">🌐</span> 
      Browser Mode
    </div>
  )
} 