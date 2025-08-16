const CACHE_NAME = 'techxdoz-v1.2';
const STATIC_CACHE = 'techxdoz-static-v1.2';
const DYNAMIC_CACHE = 'techxdoz-dynamic-v1.2';

// Resources to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/css/style.css',
  '/css/responsive.css',
  '/css/easy.css',
  '/css/slick.min.css',
  '/js/script.js',
  '/js/performance.js',
  '/Images/logo.png',
  '/Images/loading.png',
  '/Images/fave_icon.png',
  '/manifest.json'
];

// Critical images to cache
const CRITICAL_IMAGES = [
  '/Images/bg/hero_bg.png',
  '/Images/home/about.png',
  '/Images/icon/feature1.png',
  '/Images/icon/feature2.png',
  '/Images/icon/feature3.png',
  '/Images/icon/feature4.png'
];

// Install event - cache static assets
self.addEventListener('install', event => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      caches.open(STATIC_CACHE).then(cache => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      caches.open(DYNAMIC_CACHE).then(cache => {
        console.log('Service Worker: Caching critical images');
        return cache.addAll(CRITICAL_IMAGES);
      })
    ]).then(() => {
      console.log('Service Worker: Installation complete');
      return self.skipWaiting();
    })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
            console.log('Service Worker: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', event => {
  const { request } = event;
  
  // Skip non-GET requests
  if (request.method !== 'GET') return;
  
  // Skip external requests
  if (!request.url.startsWith(self.location.origin)) return;
  
  event.respondWith(
    caches.match(request).then(cachedResponse => {
      // Return cached version if available
      if (cachedResponse) {
        console.log('Service Worker: Serving from cache:', request.url);
        
        // For static assets, also fetch in background to update cache
        if (isStaticAsset(request.url)) {
          fetchAndCache(request);
        }
        
        return cachedResponse;
      }
      
      // Fetch from network and cache if successful
      return fetchAndCache(request);
    }).catch(() => {
      // Fallback for offline scenarios
      if (request.destination === 'document') {
        return caches.match('/index.html');
      }
      
      // Return a simple offline response for other requests
      return new Response('Offline', { 
        status: 503, 
        statusText: 'Service Unavailable' 
      });
    })
  );
});

// Fetch and cache helper function
async function fetchAndCache(request) {
  try {
    const response = await fetch(request);
    
    // Only cache successful responses
    if (response.status === 200) {
      const cache = await caches.open(
        isStaticAsset(request.url) ? STATIC_CACHE : DYNAMIC_CACHE
      );
      
      // Clone response before caching (response can only be consumed once)
      cache.put(request, response.clone());
      console.log('Service Worker: Cached:', request.url);
    }
    
    return response;
  } catch (error) {
    console.error('Service Worker: Fetch failed:', error);
    throw error;
  }
}

// Check if URL is a static asset
function isStaticAsset(url) {
  const staticExtensions = ['.css', '.js', '.png', '.jpg', '.jpeg', '.svg', '.gif', '.webp', '.ico', '.woff', '.woff2'];
  return staticExtensions.some(ext => url.includes(ext));
}

// Background sync for form submissions
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    event.waitUntil(syncContactForm());
  }
});

// Sync contact form submissions when back online
async function syncContactForm() {
  const formData = await getStoredFormData();
  if (formData.length > 0) {
    console.log('Service Worker: Syncing stored form submissions');
    
    for (const data of formData) {
      try {
        await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(data)
        });
        
        // Remove from storage after successful submission
        await removeFormData(data.id);
      } catch (error) {
        console.error('Service Worker: Failed to sync form data:', error);
      }
    }
  }
}

// Helper functions for form data storage
async function getStoredFormData() {
  // Implementation would depend on IndexedDB or other storage mechanism
  return [];
}

async function removeFormData(id) {
  // Implementation would depend on storage mechanism
}

// Push notification handler
self.addEventListener('push', event => {
  const options = {
    body: event.data ? event.data.text() : 'New update from TechXDoz',
    icon: '/Images/logo.png',
    badge: '/Images/fave_icon.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore',
        icon: '/Images/icon/feature1.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/Images/icon/feature2.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('TechXDoz', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Performance monitoring
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'GET_CACHE_SIZE') {
    getCacheSize().then(size => {
      event.ports[0].postMessage({ cacheSize: size });
    });
  }
});

// Get total cache size
async function getCacheSize() {
  const cacheNames = await caches.keys();
  let totalSize = 0;
  
  for (const name of cacheNames) {
    const cache = await caches.open(name);
    const requests = await cache.keys();
    
    for (const request of requests) {
      const response = await cache.match(request);
      if (response) {
        const blob = await response.blob();
        totalSize += blob.size;
      }
    }
  }
  
  return totalSize;
} 