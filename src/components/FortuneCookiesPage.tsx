import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Button } from './ui/button';
import { fortunes } from '../data/fortunes';
import { translations, type Language } from '../lib/translations';
import bgImage from 'figma:asset/ff9f276a279bbca6bb5349e235732b4ac69c6be7.png';
import cookieImage from 'figma:asset/1a33877d7f3a5f590d639a5cb7f5fa8bbb95fdf9.png';

interface FortuneCookiesPageProps {
  language: Language;
}

// Fortune Cookie SVG Component for broken pieces
function FortuneCookie({ className = "", broken = false, half = "full" }: { className?: string, broken?: boolean, half?: "full" | "left" | "right" }) {
  if (broken && half === "left") {
    return (
      <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cookieGradLeft" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4D19B" />
            <stop offset="40%" stopColor="#E8C589" />
            <stop offset="100%" stopColor="#D4A574" />
          </linearGradient>
          <radialGradient id="highlightLeft">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Left half of broken cookie */}
        <path
          d="M 100 60 Q 60 70 40 95 Q 30 110 35 130 Q 40 145 55 155 L 100 140 L 100 60 Z"
          fill="url(#cookieGradLeft)"
          stroke="#C89557"
          strokeWidth="2"
        />
        
        {/* Inner fold shadow */}
        <path
          d="M 100 60 Q 80 80 100 100 L 100 60 Z"
          fill="#B8864E"
          opacity="0.5"
        />
        
        {/* Highlight */}
        <ellipse cx="65" cy="90" rx="20" ry="15" fill="url(#highlightLeft)" />
        
        {/* Texture spots */}
        <circle cx="60" cy="100" r="2" fill="#C89557" opacity="0.6" />
        <circle cx="75" cy="120" r="1.5" fill="#C89557" opacity="0.6" />
        <circle cx="50" cy="130" r="1.5" fill="#C89557" opacity="0.6" />
      </svg>
    );
  }
  
  if (broken && half === "right") {
    return (
      <svg viewBox="0 0 200 200" className={className} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="cookieGradRight" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4D19B" />
            <stop offset="40%" stopColor="#E8C589" />
            <stop offset="100%" stopColor="#D4A574" />
          </linearGradient>
          <radialGradient id="highlightRight">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </radialGradient>
        </defs>
        
        {/* Right half of broken cookie */}
        <path
          d="M 100 60 Q 140 70 160 95 Q 170 110 165 130 Q 160 145 145 155 L 100 140 L 100 60 Z"
          fill="url(#cookieGradRight)"
          stroke="#C89557"
          strokeWidth="2"
        />
        
        {/* Inner fold shadow */}
        <path
          d="M 100 60 Q 120 80 100 100 L 100 60 Z"
          fill="#B8864E"
          opacity="0.5"
        />
        
        {/* Highlight */}
        <ellipse cx="135" cy="90" rx="20" ry="15" fill="url(#highlightRight)" />
        
        {/* Texture spots */}
        <circle cx="140" cy="100" r="2" fill="#C89557" opacity="0.6" />
        <circle cx="125" cy="120" r="1.5" fill="#C89557" opacity="0.6" />
        <circle cx="150" cy="130" r="1.5" fill="#C89557" opacity="0.6" />
      </svg>
    );
  }
  
  return null;
}

export function FortuneCookiesPage({ language }: FortuneCookiesPageProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentFortune, setCurrentFortune] = useState('');
  const t = translations[language];

  const handleCookieClick = () => {
    if (!isOpen) {
      const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
      setCurrentFortune(randomFortune);
      setIsOpen(true);
    }
  };

  const handleGetAnother = () => {
    setIsOpen(false);
    setCurrentFortune('');
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated cherry blossoms falling from sakura trees */}
      {[...Array(20)].map((_, i) => {
        const startX = Math.random() * 100;
        const startY = -5;
        return (
          <motion.div
            key={i}
            className="absolute drop-shadow-lg"
            style={{
              left: `${startX}%`,
              top: `${startY}%`,
              fontSize: `${20 + Math.random() * 15}px`,
            }}
            initial={{ 
              x: 0,
              y: 0,
              rotate: 0,
              opacity: 0.9,
            }}
            animate={{ 
              y: [0, window.innerHeight + 50],
              x: [0, (Math.random() - 0.5) * 400],
              rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
              opacity: [0.9, 0.7, 0]
            }}
            transition={{
              duration: 7 + Math.random() * 5,
              repeat: Infinity,
              delay: i * 0.6,
              ease: "linear"
            }}
          >
            <span className="text-[#FFB7C5]">🌸</span>
          </motion.div>
        );
      })}

      {/* Main content */}
      <div className="relative z-10 container mx-auto px-4 py-16 flex flex-col items-center justify-center min-h-[calc(100vh-120px)]">
        <AnimatePresence mode="wait">
          {!isOpen ? (
            <motion.div
              key="closed"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col items-center gap-8"
            >
              <motion.h2 
                className="text-3xl md:text-4xl font-serif text-[#D32F2F] text-center mb-4 bg-white/80 backdrop-blur-md px-10 py-5 rounded-full shadow-2xl border-2 border-[#FFB7C5]"
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {t.clickCookie}
              </motion.h2>
              
              {/* Fortune Cookie - Closed */}
              <motion.button
                onClick={handleCookieClick}
                className="relative cursor-pointer focus:outline-none group"
                whileHover={{ scale: 1.15 }}
                whileTap={{ scale: 0.9 }}
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
              >
                <div className="relative w-80 h-80">
                  {/* Cookie shadow */}
                  <div className="absolute inset-0 bg-[#8B4513]/30 blur-3xl translate-y-12 scale-75" />
                  
                  {/* Cookie Image */}
                  <motion.img
                    src={cookieImage}
                    alt="Fortune Cookie"
                    className="w-full h-full object-contain drop-shadow-2xl relative z-10"
                    animate={{ rotate: [0, 3, -3, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  />

                  {/* Sparkle effects with Japanese style */}
                  <motion.div
                    className="absolute -top-6 -right-6 text-5xl"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [1, 0.6, 1],
                      rotate: [0, 180, 360]
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    ✨
                  </motion.div>
                  
                  <motion.div
                    className="absolute -bottom-6 -left-6 text-4xl"
                    animate={{
                      scale: [1, 1.4, 1],
                      opacity: [0.7, 1, 0.7],
                      rotate: [360, 180, 0]
                    }}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 0.5
                    }}
                  >
                    ✨
                  </motion.div>
                  
                  <motion.div
                    className="absolute top-1/2 -right-8 text-3xl"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.8, 1, 0.8],
                    }}
                    transition={{
                      duration: 1.8,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: 1
                    }}
                  >
                    ⭐
                  </motion.div>
                </div>
              </motion.button>

              <motion.div
                className="flex gap-3 text-5xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0 }}
                >
                  🥠
                </motion.span>
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0], y: [0, -8, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
                >
                  🥠
                </motion.span>
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.6 }}
                >
                  🥠
                </motion.span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="open"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col items-center gap-8 max-w-3xl w-full"
            >
              {/* Broken Cookie Animation */}
              <motion.div className="relative w-96 h-56 mb-8">
                {/* Left half */}
                <motion.div
                  className="absolute left-0 top-0 w-64 h-64 overflow-hidden"
                  initial={{ x: 0, rotate: 0 }}
                  animate={{ x: -80, rotate: -30 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <img 
                    src={cookieImage}
                    alt="Fortune Cookie Left Half"
                    className="w-full h-full object-contain"
                    style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0 100%)' }}
                  />
                </motion.div>
                
                {/* Right half */}
                <motion.div
                  className="absolute right-0 top-0 w-64 h-64 overflow-hidden"
                  initial={{ x: 0, rotate: 0 }}
                  animate={{ x: 80, rotate: 30 }}
                  transition={{ duration: 0.7, ease: "easeOut" }}
                >
                  <img 
                    src={cookieImage}
                    alt="Fortune Cookie Right Half"
                    className="w-full h-full object-contain"
                    style={{ clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)' }}
                  />
                </motion.div>

                {/* Paper strip with fortune */}
                <motion.div
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
                  initial={{ y: -30, opacity: 0, scaleY: 0, rotate: -5 }}
                  animate={{ y: 0, opacity: 1, scaleY: 1, rotate: 2 }}
                  transition={{ delay: 0.4, duration: 0.6, ease: "easeOut" }}
                >
                  <div className="w-64 h-12 bg-gradient-to-br from-white to-gray-50 shadow-2xl rounded-sm border border-gray-200 flex items-center justify-center">
                    <span className="text-xs text-gray-400 font-serif italic">Your fortune awaits...</span>
                  </div>
                </motion.div>
                
                {/* Crumb particles */}
                {[...Array(8)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="absolute w-3 h-3 bg-[#D4A574] rounded-full shadow"
                    style={{
                      left: '50%',
                      top: '50%',
                    }}
                    initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                    animate={{
                      x: (Math.random() - 0.5) * 150,
                      y: Math.random() * 80 + 20,
                      opacity: 0,
                      scale: 0.5,
                    }}
                    transition={{ duration: 0.9, delay: 0.2 + i * 0.05 }}
                  />
                ))}
              </motion.div>

              {/* Fortune text with Japanese styling */}
              <motion.div
                className="bg-white/70 backdrop-blur-xl p-10 rounded-3xl shadow-2xl border-4 border-[#D32F2F]/30 w-full relative overflow-hidden"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                {/* Decorative corner elements */}
                <div className="absolute top-2 left-2 w-8 h-8 border-t-4 border-l-4 border-[#D32F2F] rounded-tl-lg" />
                <div className="absolute top-2 right-2 w-8 h-8 border-t-4 border-r-4 border-[#D32F2F] rounded-tr-lg" />
                <div className="absolute bottom-2 left-2 w-8 h-8 border-b-4 border-l-4 border-[#D32F2F] rounded-bl-lg" />
                <div className="absolute bottom-2 right-2 w-8 h-8 border-b-4 border-r-4 border-[#D32F2F] rounded-br-lg" />
                
                <p className="text-2xl md:text-3xl text-center text-[#1A237E] font-serif leading-relaxed relative z-10">
                  "{currentFortune}"
                </p>
                
                {/* Subtle sakura decoration */}
                <div className="absolute bottom-4 right-4 text-3xl opacity-20">🌸</div>
              </motion.div>

              {/* Get another button with Japanese style */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
              >
                <Button
                  onClick={handleGetAnother}
                  className="bg-gradient-to-r from-[#D32F2F] to-[#B71C1C] hover:from-[#B71C1C] hover:to-[#D32F2F] text-white px-10 py-7 text-xl font-semibold rounded-full shadow-2xl transition-all duration-300 hover:shadow-3xl hover:scale-110 border-2 border-white/50"
                >
                  {t.getAnotherPrediction}
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}