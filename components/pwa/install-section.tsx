'use client'

import { InstallButton } from '@/components/pwa/install-button'
import { useState, useEffect } from 'react'

export function InstallSection() {
  const [isStandalone, setIsStandalone] = useState(false)
  const [showDetails, setShowDetails] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  
  useEffect(() => {
    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsStandalone(true)
    }
    
    // Detect if device is desktop
    const isDesktopDevice = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
    setIsDesktop(isDesktopDevice);
  }, [])
  
  // If already running as a PWA, don't show install section
  if (isStandalone) {
    return null
  }
  
  return (
    <div className="w-full max-w-md border border-gray-200 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 p-4 mb-4 shadow-sm">
      <div className="flex items-center justify-between cursor-pointer" onClick={() => setShowDetails(!showDetails)}>
        <h2 className="text-lg font-semibold dark:text-white">
          {isDesktop ? '💻' : '📱'} Install for {isDesktop ? 'Desktop' : 'Mobile'} Use
        </h2>
        <span className="text-xl dark:text-white">{showDetails ? '▼' : '▶'}</span>
      </div>
      
      {showDetails && (
        <div className="mt-3 text-sm text-gray-600 dark:text-gray-300 space-y-2">
          <p>Benefits of installing as an app:</p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Access workouts without internet connection</li>
            <li>Faster loading times</li>
            <li>Full-screen experience without browser elements</li>
            <li>App icon on your {isDesktop ? 'desktop/dock' : 'home screen'} for quick access</li>
            {isDesktop && <li>Dedicated window separate from your browser</li>}
          </ul>
        </div>
      )}
      
      <div className="mt-4">
        <InstallButton isDesktop={isDesktop} />
      </div>
    </div>
  )
} 