// Performance optimization utilities for TechXDoz website
class PerformanceOptimizer {
    constructor() {
        this.criticalResourcesLoaded = false;
        this.performanceMetrics = {};
        this.init();
    }

    init() {
        this.measurePerformance();
        this.optimizeResourceLoading();
        this.setupIntersectionObserver();
        this.preloadCriticalResources();
    }

    // Measure Core Web Vitals and other performance metrics
    measurePerformance() {
        // Measure First Contentful Paint (FCP)
        if ('PerformanceObserver' in window) {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        this.performanceMetrics.fcp = entry.startTime;
                        console.log('First Contentful Paint:', entry.startTime + 'ms');
                    }
                }
            });
            observer.observe({ entryTypes: ['paint'] });

            // Measure Largest Contentful Paint (LCP)
            const lcpObserver = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                this.performanceMetrics.lcp = lastEntry.startTime;
                console.log('Largest Contentful Paint:', lastEntry.startTime + 'ms');
            });
            lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

            // Measure Cumulative Layout Shift (CLS)
            let clsValue = 0;
            const clsObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!entry.hadRecentInput) {
                        clsValue += entry.value;
                    }
                }
                this.performanceMetrics.cls = clsValue;
                console.log('Cumulative Layout Shift:', clsValue);
            });
            clsObserver.observe({ entryTypes: ['layout-shift'] });

            // Measure First Input Delay (FID)
            const fidObserver = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    this.performanceMetrics.fid = entry.processingStart - entry.startTime;
                    console.log('First Input Delay:', this.performanceMetrics.fid + 'ms');
                }
            });
            fidObserver.observe({ entryTypes: ['first-input'] });
        }

        // Measure Time to Interactive (TTI) approximation
        window.addEventListener('load', () => {
            setTimeout(() => {
                const navigationTiming = performance.getEntriesByType('navigation')[0];
                this.performanceMetrics.tti = navigationTiming.loadEventEnd - navigationTiming.fetchStart;
                console.log('Time to Interactive (approx):', this.performanceMetrics.tti + 'ms');
                
                // Report performance metrics (could be sent to analytics)
                this.reportMetrics();
            }, 1000);
        });
    }

    // Optimize resource loading order and priority
    optimizeResourceLoading() {
        // Preload next page resources on hover
        this.setupLinkPreloading();
        
        // Optimize font loading
        this.optimizeFontLoading();
        
        // Defer non-critical JavaScript
        this.deferNonCriticalJS();
    }

    // Setup intelligent link preloading
    setupLinkPreloading() {
        const links = document.querySelectorAll('a[href^="/"], a[href^="./"]');
        const preloadedUrls = new Set();

        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                const href = link.getAttribute('href');
                if (href && !preloadedUrls.has(href)) {
                    this.preloadPage(href);
                    preloadedUrls.add(href);
                }
            });
        });
    }

    // Preload page resources
    preloadPage(url) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    }

    // Optimize font loading with font-display: swap fallback
    optimizeFontLoading() {
        if ('fonts' in document) {
            // Load critical fonts first
            const criticalFonts = [
                'Raleway',
                'Barlow'
            ];

            criticalFonts.forEach(fontFamily => {
                const font = new FontFace(fontFamily, `local('${fontFamily}')`);
                font.load().then(() => {
                    document.fonts.add(font);
                }).catch(err => {
                    console.warn(`Failed to load font: ${fontFamily}`, err);
                });
            });
        }
    }

    // Defer non-critical JavaScript execution
    deferNonCriticalJS() {
        // Defer chatbot initialization
        setTimeout(() => {
            this.initializeChatbot();
        }, 2000);

        // Defer analytics and tracking scripts
        setTimeout(() => {
            this.initializeAnalytics();
        }, 3000);
    }

    // Setup Intersection Observer for advanced lazy loading
    setupIntersectionObserver() {
        if ('IntersectionObserver' in window) {
            // Enhanced image lazy loading
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        this.loadImage(img);
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px 0px',
                threshold: 0.01
            });

            // Observe all images with data-src attribute
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });

            // Section-based lazy loading
            const sectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const section = entry.target;
                        this.loadSectionContent(section);
                        sectionObserver.unobserve(section);
                    }
                });
            }, {
                rootMargin: '100px 0px',
                threshold: 0.1
            });

            // Observe sections for progressive loading
            document.querySelectorAll('.lazy-section').forEach(section => {
                sectionObserver.observe(section);
            });
        }
    }

    // Enhanced image loading with WebP support
    loadImage(img) {
        const src = img.dataset.src;
        if (!src) return;

        // Check for WebP support and load appropriate format
        if (this.supportsWebP()) {
            const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');
            this.loadImageWithFallback(img, webpSrc, src);
        } else {
            img.src = src;
            img.removeAttribute('data-src');
        }

        // Add fade-in effect
        img.onload = () => {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            requestAnimationFrame(() => {
                img.style.opacity = '1';
            });
        };
    }

    // Load image with fallback
    loadImageWithFallback(img, primarySrc, fallbackSrc) {
        const testImg = new Image();
        testImg.onload = () => {
            img.src = primarySrc;
            img.removeAttribute('data-src');
        };
        testImg.onerror = () => {
            img.src = fallbackSrc;
            img.removeAttribute('data-src');
        };
        testImg.src = primarySrc;
    }

    // Check WebP support
    supportsWebP() {
        const canvas = document.createElement('canvas');
        canvas.width = 1;
        canvas.height = 1;
        return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
    }

    // Load section content progressively
    loadSectionContent(section) {
        // Load any deferred content in the section
        const deferredElements = section.querySelectorAll('[data-defer]');
        deferredElements.forEach(element => {
            const content = element.dataset.defer;
            if (content) {
                element.innerHTML = content;
                element.removeAttribute('data-defer');
            }
        });

        // Initialize section-specific features
        section.classList.add('loaded');
    }

    // Preload critical resources
    preloadCriticalResources() {
        const criticalResources = [
            { href: '/css/style.css', as: 'style' },
            { href: '/js/script.js', as: 'script' },
            { href: '/Images/logo.png', as: 'image' }
        ];

        criticalResources.forEach(resource => {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.href = resource.href;
            link.as = resource.as;
            if (resource.type) link.type = resource.type;
            document.head.appendChild(link);
        });
    }

    // Initialize chatbot (deferred)
    initializeChatbot() {
        // Chatbot initialization code here
        console.log('Chatbot initialized (deferred)');
    }

    // Initialize analytics (deferred)
    initializeAnalytics() {
        // Analytics initialization code here
        console.log('Analytics initialized (deferred)');
    }

    // Report performance metrics
    reportMetrics() {
        const metrics = {
            ...this.performanceMetrics,
            userAgent: navigator.userAgent,
            connectionType: navigator.connection?.effectiveType || 'unknown',
            timestamp: Date.now()
        };

        // Could send to analytics service
        console.log('Performance Metrics:', metrics);
        
        // Store in sessionStorage for debugging
        sessionStorage.setItem('performanceMetrics', JSON.stringify(metrics));
    }

    // Optimize scroll performance
    optimizeScrollPerformance() {
        let ticking = false;

        function updateScrollPosition() {
            // Scroll-based optimizations
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Hide/show header based on scroll direction
            this.handleHeaderScroll(scrollTop);
            
            ticking = false;
        }

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateScrollPosition.bind(this));
                ticking = true;
            }
        }, { passive: true });
    }

    // Handle header scroll behavior
    handleHeaderScroll(scrollTop) {
        const header = document.querySelector('header');
        if (header) {
            if (scrollTop > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // Resource hints for better performance
    addResourceHints() {
        const hints = [
            { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
            { rel: 'dns-prefetch', href: '//fonts.gstatic.com' },
            { rel: 'dns-prefetch', href: '//cdnjs.cloudflare.com' },
            { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: true }
        ];

        hints.forEach(hint => {
            const link = document.createElement('link');
            Object.assign(link, hint);
            document.head.appendChild(link);
        });
    }
}

// Initialize performance optimizer when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        window.performanceOptimizer = new PerformanceOptimizer();
    });
} else {
    window.performanceOptimizer = new PerformanceOptimizer();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PerformanceOptimizer;
} 