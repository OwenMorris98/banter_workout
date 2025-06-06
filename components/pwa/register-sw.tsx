'use client'

import { useEffect } from 'react'

export function RegisterSW() {
  useEffect(() => {
    if ('serviceWorker' in navigator && typeof window !== 'undefined') {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope)
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error)
          })
      })
    }
  }, [])

  return null
} 