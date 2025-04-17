'use client'

import { useState, useEffect } from 'react'
import { InstallSection } from '@/components/pwa/install-section'
import { PWAStatus } from '@/components/pwa/pwa-status'
import { DesktopInstallGuide } from '@/components/pwa/desktop-install-guide'
import { InstallButton } from '@/components/pwa/install-button'

export function WorkoutsClientWrapper({ children }: { children: React.ReactNode }) {
  const [isStandalone, setIsStandalone] = useState(false)
  const [isDesktop, setIsDesktop] = useState(false)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    // Check if app is in standalone mode
    const inStandaloneMode = window.matchMedia('(display-mode: standalone)').matches
      || (window.navigator as any).standalone 
      || document.referrer.includes('android-app://')
    
    setIsStandalone(inStandaloneMode)
    
    // Check if on desktop device
    const desktopCheck = /Windows|Macintosh|Linux/i.test(navigator.userAgent) && 
      !/Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent)
    
    setIsDesktop(desktopCheck)
    setIsLoaded(true)
  }, [])

  if (!isLoaded) return null

  return (
    <div className="flex flex-col min-h-screen w-full">
      <PWAStatus isStandalone={isStandalone} />
      
      <div className="flex-1 container mx-auto px-4 py-4 md:px-6">
        {!isStandalone && (
          <div className="mb-6">
            {isDesktop ? (
              <>
                <div className="mb-4 bg-gray-100 dark:bg-gray-900 p-4 rounded-lg">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <span className="font-medium">💡 Pro tip:</span> Install this app for a better workout experience offline!
                  </p>
                </div>
                <div className="flex justify-center mb-4">
                  <InstallButton isDesktop={true} />
                </div>
                <DesktopInstallGuide />
              </>
            ) : (
              <InstallSection />
            )}
          </div>
        )}
        
        {children}
      </div>
    </div>
  )
} 