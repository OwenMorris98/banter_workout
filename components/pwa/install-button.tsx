'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface InstallButtonProps {
  isDesktop?: boolean;
}

export function InstallButton({ isDesktop = false }: InstallButtonProps) {
  const [installPrompt, setInstallPrompt] = useState<Event | null>(null)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalled, setIsInstalled] = useState(false)

  useEffect(() => {
    // Check if already installed as PWA
    if (window.matchMedia('(display-mode: standalone)').matches) {
      setIsInstalled(true)
      return
    }

    // Check if on iOS
    const iosDevice = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
    const iosStandalone = 'standalone' in window.navigator && (window.navigator as any).standalone
    
    setIsIOS(iosDevice && !iosStandalone)

    // For other browsers using beforeinstallprompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault()
      setInstallPrompt(e)
    }
    
    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    
    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt)
    }
  }, [])
  
  const handleInstallClick = async () => {
    if (!installPrompt) return
    
    // Show the install prompt
    const promptEvent = installPrompt as any
    promptEvent.prompt()
    
    // Wait for the user to respond to the prompt
    const { outcome } = await promptEvent.userChoice
    console.log(`User response to install prompt: ${outcome}`)
    
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    
    // Clear the saved prompt
    setInstallPrompt(null)
  }
  
  if (isInstalled) {
    return null // Hide button if already installed
  }

  if (installPrompt) {
    return (
      <Button 
        onClick={handleInstallClick}
        className="w-full max-w-md bg-gray-800 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-white 
                 font-semibold py-3 px-6 border-2 border-black dark:border-gray-900
                 rounded-lg shadow-lg transition duration-200"
      >
        {isDesktop ? 'Install Desktop App' : 'Install on Device'}
      </Button>
    )
  }
  
  if (isIOS) {
    return (
      <div className="w-full max-w-md">
        <Button 
          className="w-full bg-gray-800 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-white 
                   font-semibold py-3 px-6 border-2 border-black dark:border-gray-900
                   rounded-lg shadow-lg transition duration-200"
          onClick={() => {
            alert('To install: tap the share icon and then "Add to Home Screen"')
          }}
        >
          Install on iOS
        </Button>
      </div>
    )
  }
  
  // Desktop browsers without install prompt detected (Chrome/Edge older versions, Firefox, etc)
  if (isDesktop && !installPrompt && !isIOS) {
    return (
      <div className="w-full max-w-md">
        <Button 
          className="w-full bg-gray-800 hover:bg-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700 text-white 
                   font-semibold py-3 px-6 border-2 border-black dark:border-gray-900
                   rounded-lg shadow-lg transition duration-200"
          onClick={() => {
            alert('To install this app on your desktop:\n\n' + 
                  '• Chrome/Edge: Click the install icon (⊕) in the address bar or menu\n' +
                  '• Firefox: Currently does not support PWA installation\n' + 
                  '• Safari: You can add to dock from the Share menu (...)')
          }}
        >
          How to Install on Desktop
        </Button>
      </div>
    )
  }
  
  return null
} 