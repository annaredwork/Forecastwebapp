import { useState, useEffect } from 'react';
import { AnimatedGradient } from './components/AnimatedGradient';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { HistoryPage } from './components/HistoryPage';
import { FortuneCookiesPage } from './components/FortuneCookiesPage';
import { CoffeePage } from './components/CoffeePage';
import { InstallPWA } from './components/InstallPWA';
import { type Language } from './lib/translations';
import bgImage from './assets/ff9f276a279bbca6bb5349e235732b4ac69c6be7.png';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<'home' | 'history' | 'fortune-cookies' | 'coffee'>('home');

  useEffect(() => {
    // Set page title
    document.title = 'annaredic mini apps';
    
    // Set or update favicon
    const setFavicon = () => {
      let link: HTMLLinkElement | null = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement('link');
        link.rel = 'icon';
        document.head.appendChild(link);
      }
      
      // Create a simple favicon using canvas
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        // Draw a gradient background
        const gradient = ctx.createLinearGradient(0, 0, 32, 32);
        gradient.addColorStop(0, '#A78BFA');
        gradient.addColorStop(0.5, '#EC4899');
        gradient.addColorStop(1, '#F59E0B');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
        
        // Draw a star
        ctx.fillStyle = 'white';
        ctx.font = 'bold 20px serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✨', 16, 16);
        
        link.href = canvas.toDataURL('image/png');
      }
    };
    
    setFavicon();

    // Create and add PWA icons
    const createPWAIcons = () => {
      // Create 192x192 icon
      const canvas192 = document.createElement('canvas');
      canvas192.width = 192;
      canvas192.height = 192;
      const ctx192 = canvas192.getContext('2d');
      
      if (ctx192) {
        // Gradient background
        const gradient = ctx192.createLinearGradient(0, 0, 192, 192);
        gradient.addColorStop(0, '#A78BFA');
        gradient.addColorStop(0.5, '#EC4899');
        gradient.addColorStop(1, '#F59E0B');
        ctx192.fillStyle = gradient;
        ctx192.fillRect(0, 0, 192, 192);
        
        // Star emoji
        ctx192.fillStyle = 'white';
        ctx192.font = 'bold 120px serif';
        ctx192.textAlign = 'center';
        ctx192.textBaseline = 'middle';
        ctx192.fillText('✨', 96, 96);
        
        // Download as icon-192.png (for development testing)
        canvas192.toBlob((blob) => {
          if (blob) {
            const url = URL.createObjectURL(blob);
            // Store in a way that manifest can reference it
            const link = document.createElement('link');
            link.rel = 'apple-touch-icon';
            link.sizes = '192x192';
            link.href = url;
            document.head.appendChild(link);
          }
        });
      }

      // Create 512x512 icon
      const canvas512 = document.createElement('canvas');
      canvas512.width = 512;
      canvas512.height = 512;
      const ctx512 = canvas512.getContext('2d');
      
      if (ctx512) {
        // Gradient background
        const gradient = ctx512.createLinearGradient(0, 0, 512, 512);
        gradient.addColorStop(0, '#A78BFA');
        gradient.addColorStop(0.5, '#EC4899');
        gradient.addColorStop(1, '#F59E0B');
        ctx512.fillStyle = gradient;
        ctx512.fillRect(0, 0, 512, 512);
        
        // Star emoji
        ctx512.fillStyle = 'white';
        ctx512.font = 'bold 320px serif';
        ctx512.textAlign = 'center';
        ctx512.textBaseline = 'middle';
        ctx512.fillText('✨', 256, 256);
      }
    };

    createPWAIcons();

    // Add PWA meta tags
    const addMetaTag = (name: string, content: string, isProperty = false) => {
      const attr = isProperty ? 'property' : 'name';
      let meta = document.querySelector(`meta[${attr}="${name}"]`);
      if (!meta) {
        meta = document.createElement('meta');
        meta.setAttribute(attr, name);
        document.head.appendChild(meta);
      }
      meta.setAttribute('content', content);
    };

    // Viewport meta tag
    addMetaTag('viewport', 'width=device-width, initial-scale=1, maximum-scale=5');
    
    // Theme color
    addMetaTag('theme-color', '#A78BFA');
    
    // Apple specific
    addMetaTag('apple-mobile-web-app-capable', 'yes');
    addMetaTag('apple-mobile-web-app-status-bar-style', 'black-translucent');
    addMetaTag('apple-mobile-web-app-title', 'annaredic');
    
    // General meta tags
    addMetaTag('description', 'Collection of mini apps: Advice Generator, Fortune Cookies, and Coffee Analyzer');
    addMetaTag('application-name', 'annaredic mini apps');
    
    // Open Graph
    addMetaTag('og:title', 'annaredic mini apps', true);
    addMetaTag('og:description', 'Collection of mini apps: Advice Generator, Fortune Cookies, and Coffee Analyzer', true);
    addMetaTag('og:type', 'website', true);
    
    // Add manifest link
    let manifestLink = document.querySelector('link[rel="manifest"]');
    if (!manifestLink) {
      manifestLink = document.createElement('link');
      manifestLink.setAttribute('rel', 'manifest');
      manifestLink.setAttribute('href', '/manifest.json');
      document.head.appendChild(manifestLink);
    }

    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then((registration) => {
            console.log('✅ Service Worker registered successfully:', registration.scope);
          })
          .catch((error) => {
            console.log('❌ Service Worker registration failed:', error);
          });
      });
    }
  }, []);

  return (
    <div className="min-h-screen relative">
      {/* Background - either animated gradient or Japanese landscape */}
      {currentPage === 'fortune-cookies' ? (
        <div className="fixed inset-0">
          <img 
            src={bgImage}
            alt="Japanese landscape with Mt. Fuji and pagoda"
            className="w-full h-full object-cover blur-sm scale-105"
          />
          {/* Overlay with traditional Japanese colors */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#FFB7C5]/40 via-[#9575CD]/30 to-[#FF8A80]/40" />
        </div>
      ) : (
        <AnimatedGradient />
      )}
      
      <div className="relative z-10">
        <header className={
          currentPage === 'fortune-cookies' 
            ? '' 
            : 'container mx-auto'
        }>
          <div className={`px-4 py-6 flex justify-between items-center ${
            currentPage === 'fortune-cookies' || currentPage === 'coffee' ? 'container mx-auto' : ''
          }`}
            style={{ display: currentPage === 'coffee' ? 'none' : 'flex' }}
          >
            <Navigation 
              currentPage={currentPage} 
              onPageChange={setCurrentPage}
              language={language}
            />
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={setLanguage}
            />
          </div>
        </header>

        <main>
          {currentPage === 'home' ? (
            <HomePage language={language} />
          ) : currentPage === 'history' ? (
            <HistoryPage language={language} />
          ) : currentPage === 'coffee' ? (
            <CoffeePage 
              language={language}
              onPageChange={setCurrentPage}
              onLanguageChange={setLanguage}
            />
          ) : (
            <FortuneCookiesPage language={language} />
          )}
        </main>
      </div>
      <InstallPWA />
    </div>
  );
}