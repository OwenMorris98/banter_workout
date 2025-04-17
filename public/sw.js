const CACHE_NAME = 'workout-app-v1';

// Basic assets to cache during installation
const urlsToCache = [
  '/',
  '/workouts',
  '/workouts/add-workout',
  '/manifest.json',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/img/horse_bant.jpg'  // Logo image
];

// Function to determine if a request is an API call
const isApiRequest = (url) => {
  return url.includes('/api/');
};

// Function to determine if a request is for an image
const isImageRequest = (url) => {
  return url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i);
};

// Function to determine if a request is for a static asset
const isStaticAsset = (url) => {
  return url.match(/\.(css|js|woff2|woff|ttf)$/i);
};

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
  
  // Activate the service worker immediately without waiting
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  
  // Take control of all clients immediately
  self.clients.claim();
});

// Fetch event - handle different types of requests
self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  
  // Skip cross-origin requests
  if (url.origin !== self.location.origin) {
    return;
  }
  
  // Handle API requests - network first, then cache
  if (isApiRequest(url.pathname)) {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          // Clone the response for caching
          const responseToCache = response.clone();
          
          // Only cache successful responses
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          
          return response;
        })
        .catch(() => {
          // If network fails, try to return from cache
          return caches.match(event.request);
        })
    );
    return;
  }
  
  // Handle images - cache first, then network
  if (isImageRequest(url.pathname)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).then((response) => {
          // Clone the response for caching
          const responseToCache = response.clone();
          
          // Only cache successful responses
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, responseToCache);
            });
          }
          
          return response;
        });
      })
    );
    return;
  }
  
  // Handle navigation requests - network first, fallback to offline page
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          return caches.match('/offline.html');
        })
    );
    return;
  }
  
  // Handle all other requests - stale-while-revalidate strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Return cached response immediately
      if (cachedResponse) {
        // In the background, fetch and update cache
        fetch(event.request).then((response) => {
          if (response.ok) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, response.clone());
            });
          }
        }).catch(() => {
          // Silently fail if update fetch fails
        });
        return cachedResponse;
      }
      
      // If not in cache, fetch from network
      return fetch(event.request).then((response) => {
        // Clone the response for caching
        const responseToCache = response.clone();
        
        // Only cache successful responses
        if (response.ok) {
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        
        return response;
      });
    })
  );
}); 