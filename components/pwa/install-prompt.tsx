'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { usePathname } from 'next/navigation'

export function InstallPrompt() {
  const [showIOSPrompt, setShowIOSPrompt] = useState(false)
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null)
  const pathname = usePathname()
  
  // Only show on the /workouts page
  const shouldShowPrompt = pathname === '/workouts'
  
  useEffect(() => {
    if (!shouldShowPrompt) return
    
    // Check if on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    const isStandalone = 'standalone' in window.navigator && (window.navigator as any).standalone
    
    if (isIOS && !isStandalone) {
      // Show iOS install instructions after user interaction
      const timer = setTimeout(() => setShowIOSPrompt(true), 30000) // Show after 30 seconds on workouts page
      return () => clearTimeout(timer)
    }
    
    // For other browsers using beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [shouldShowPrompt, pathname])
  
  const handleInstallClick = async () => {
    if (!installPrompt) return
    
    // Show the install prompt
    const promptEvent = installPrompt as any
    promptEvent.prompt()
    
    // Wait for the user to respond to the prompt
    const { outcome } = await promptEvent.userChoice
    console.log(`User response to install prompt: ${outcome}`)
    
    // Clear the saved prompt
    setInstallPrompt(null)
  }
  
  // Don't render anything if not on the workouts page
  if (!shouldShowPrompt) return null
  
  if (installPrompt) {
    return (
      <div className="fixed bottom-4 right-4 bg-black p-4 rounded-lg shadow-lg z-50">
        <p className="text-white mb-2">Install this app to use workouts offline!</p>
        <Button onClick={handleInstallClick}>Install App</Button>
      </div>
    )
  }
  
  if (showIOSPrompt) {
    return (
      <div className="fixed bottom-4 right-4 bg-black p-4 rounded-lg shadow-lg z-50 max-w-xs">
        <p className="text-white mb-2">
          Install this workout app on your iPhone: tap
          <svg className="inline-block h-5 w-5 mx-1" fill="currentColor" viewBox="0 0 20 20">
            <path d="M13 5l3 3-3 3V8H4V6h9V5z" />
          </svg>
          then "Add to Home Screen"
        </p>
        <Button onClick={() => setShowIOSPrompt(false)}>Dismiss</Button>
      </div>
    )
  }
  
  return null
} 