'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

export function DesktopInstallGuide() {
  const [browser, setBrowser] = useState<string>('unknown')
  const [isVisible, setIsVisible] = useState<boolean>(false)
  const [isInstalled, setIsInstalled] = useState<boolean>(false)
  
  useEffect(() => {
    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }
    
    // Detect browser type
    const userAgent = navigator.userAgent
    if (userAgent.indexOf("Chrome") > -1 || userAgent.indexOf("Chromium") > -1) {
      // Chrome, Edge (new), Opera
      if (userAgent.indexOf("Edg") > -1) {
        setBrowser('edge')
      } else if (userAgent.indexOf("OPR") > -1) {
        setBrowser('opera')
      } else {
        setBrowser('chrome')
      }
    } else if (userAgent.indexOf("Firefox") > -1) {
      setBrowser('firefox')
    } else if (userAgent.indexOf("Safari") > -1) {
      setBrowser('safari')
    }
    
    // Only show for desktop browsers
    const isDesktop = !(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent));
    setIsVisible(isDesktop);
  }, [])
  
  // Don't show if already installed or not on desktop
  if (isInstalled || !isVisible) {
    return null
  }
  
  // Get browser-specific instructions
  const getBrowserInstructions = () => {
    switch (browser) {
      case 'chrome':
        return (
          <ol className="list-decimal pl-5 text-sm space-y-2">
            <li>Look for the install icon <span className="px-1 py-0.5 bg-gray-100 dark:bg-gray-800 rounded">⊕</span> in the address bar (right side)</li>
            <li>Click "Install Banter Workout"</li>
            <li>When prompted, click "Install"</li>
          </ol>
        )
      case 'edge':
        return (
          <ol className="list-decimal pl-5 text-sm space-y-2">
            <li>Click the "..." menu in the top-right corner</li>
            <li>Select "Apps" → "Install this site as an app"</li>
            <li>When prompted, click "Install"</li>
          </ol>
        )
      case 'firefox':
        return (
          <div className="text-sm space-y-2">
            <p><span className="font-semibold text-amber-600 dark:text-amber-400">Note:</span> Firefox has limited support for installing web apps.</p>
            <p>For the best experience, consider using Chrome, Edge, or Safari.</p>
          </div>
        )
      case 'safari':
        return (
          <ol className="list-decimal pl-5 text-sm space-y-2">
            <li>Click the Share button in the toolbar</li>
            <li>Select "Add to Dock" from the menu</li>
            <li>Click "Add" when prompted</li>
          </ol>
        )
      default:
        return (
          <p className="text-sm">For the best experience, install this app using Chrome, Edge, or Safari.</p>
        )
    }
  }
  
  return (
    <div className="w-full max-w-md border border-blue-200 dark:border-blue-900 rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 mb-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">💻</span>
        <h2 className="font-semibold">Install on your {browser !== 'unknown' ? browser.charAt(0).toUpperCase() + browser.slice(1) : 'Desktop'}</h2>
      </div>
      
      <div className="mb-3">
        {getBrowserInstructions()}
      </div>
      
      <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
        <p>Installing creates a desktop app that works offline and loads faster.</p>
      </div>
    </div>
  )
} 