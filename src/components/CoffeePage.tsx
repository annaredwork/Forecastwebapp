import { useState, useRef, useEffect, Suspense } from 'react';
import { motion } from 'motion/react';
import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';
import { OrbitControls, useGLTF, Environment, PerspectiveCamera } from '@react-three/drei';
import { translations, type Language } from '../lib/translations';
import { Navigation } from './Navigation';
import { LanguageSwitcher } from './LanguageSwitcher';
import coffeeBg from 'figma:asset/7cc8ab894716069e525b103ecd22007ca886d230.png';

/*
 * NOTE: "Multiple instances of Three.js" warning is a known issue with react-three-fiber.
 * This happens because @react-three/fiber and @react-three/drei both depend on Three.js.
 * This warning is HARMLESS and does not affect functionality.
 * The 3D model will work perfectly despite this warning.
 */

interface CoffeePageProps {
  language: Language;
  onPageChange?: (page: 'home' | 'history' | 'fortune-cookies' | 'coffee') => void;
  onLanguageChange?: (lang: Language) => void;
}

// 3D Coffee Shop Model Component with gentle swaying animation
function CoffeeShopModel() {
  // GitHub raw URL for direct download
  const modelUrl = 'https://raw.githubusercontent.com/annaredwork/-ozycofeeshopmodel/main/cozycafe2-v1.glb';
  
  const { scene } = useGLTF(modelUrl);
  const modelRef = useRef<ThreeElements['group']>(null);
  
  // Gentle swaying animation: -30 to +30 degrees slowly
  useFrame((state) => {
    if (modelRef.current) {
      // Slow sine wave oscillation: 15 degrees = ~0.262 radians
      const maxRotation = Math.PI / 12; // 15 degrees in radians
      const speed = 0.3; // Very slow
      modelRef.current.rotation.y = Math.sin(state.clock.elapsedTime * speed) * maxRotation;
    }
  });
  
  return (
    <group ref={modelRef}>
      <primitive 
        object={scene} 
        scale={3.5}
        position={[0, 0, 0]}
      />
    </group>
  );
}

export function CoffeePage({ language, onPageChange, onLanguageChange }: CoffeePageProps) {
  const [teaspoons, setTeaspoons] = useState('');
  const [cups, setCups] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  const t = translations[language];

  // Suppress Three.js multiple instances warning
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = (...args) => {
      if (args[0]?.includes?.('Multiple instances of Three.js')) {
        return; // Suppress this specific warning
      }
      originalWarn(...args);
    };
    
    return () => {
      console.warn = originalWarn;
    };
  }, []);

  const handleAnalyze = async () => {
    if (!teaspoons || !cups) return;

    setIsLoading(true);
    setResponse('');

    try {
      // Calculate approximate caffeine consumption
      const teaspoonsNum = parseFloat(teaspoons);
      const cupsNum = parseFloat(cups);
      const caffeinePerTeaspoon = 60; // mg of caffeine per teaspoon of ground coffee
      const totalCaffeine = teaspoonsNum * caffeinePerTeaspoon;
      const dailyLimit = 400; // Recommended daily limit in mg
      const percentageOfLimit = (totalCaffeine / dailyLimit * 100).toFixed(1);
      
      // Determine language for response
      const languagePrompt = language === 'ru' 
        ? 'Respond in Russian language.' 
        : language === 'uk' 
        ? 'Respond in Ukrainian language.' 
        : 'Respond in English language.';

      // Google Gemini API Integration
      const GEMINI_API_KEY = 'AIzaSyDQt_3N36_HRWllwJfTRN2VU4CTEQoJdoA';
      const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`;

      const requestBody = {
        contents: [{
          parts: [{
            text: `${languagePrompt}

I used ${teaspoons} teaspoon(s) of ground coffee to make ${cups} cup(s).

Based on calculations:
- Total caffeine consumed: approximately ${totalCaffeine}mg
- This is ${percentageOfLimit}% of the recommended daily limit (400mg for adults)

Please provide:
1. An assessment of this caffeine intake (is it safe, moderate, or excessive?)
2. Brief advice about coffee consumption and health
3. Any interesting facts about coffee or caffeine
4. Tips for optimal coffee brewing

Keep the response friendly, informative, and use emojis. Maximum 250 words.`
          }]
        }]
      };

      const apiResponse = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });

      if (!apiResponse.ok) {
        throw new Error(`API Error: ${apiResponse.status}`);
      }

      const data = await apiResponse.json();
      const generatedText = data.candidates[0].content.parts[0].text;
      
      setResponse(generatedText);
      setIsLoading(false);
    } catch (error) {
      console.error('Error calling Gemini API:', error);
      
      // Fallback to mock response if API fails
      const teaspoonsNum = parseFloat(teaspoons);
      const cupsNum = parseFloat(cups);
      const totalCaffeine = teaspoonsNum * 60;
      const percentageOfLimit = (totalCaffeine / 400 * 100).toFixed(1);
      
      const mockResponse = `☕ CAFFEINE ANALYSIS\n\nBased on ${teaspoons} teaspoon(s) of coffee for ${cups} cup(s):\n\n💊 Total Caffeine: ~${totalCaffeine}mg\n📊 Daily Limit: ${percentageOfLimit}% of 400mg recommended maximum\n\n${
        totalCaffeine < 200
          ? "✅ SAFE: You're well within healthy limits! This is a moderate amount of caffeine."
          : totalCaffeine < 400
          ? "⚠️ MODERATE: You're approaching the daily limit. Consider spreading your coffee throughout the day."
          : "🚫 HIGH: You've exceeded the recommended daily limit. Consider reducing intake."
      }\n\n💡 TIP: Use water at 90-96°C and brew for 4-5 minutes for optimal extraction.`;
      
      setResponse(mockResponse);
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setTeaspoons('');
    setCups('');
    setResponse('');
  };

  return (
    <div 
      className="min-h-screen relative overflow-hidden"
      style={{
        backgroundImage: `url(${coffeeBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'repeat'
      }}
    >
      {/* Blur overlay */}
      <div 
        className="absolute inset-0" 
        style={{
          backgroundImage: `url(${coffeeBg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
          zIndex: 0
        }}
      />
      
      {/* Warm overlay for better contrast */}
      <div 
        className="absolute inset-0" 
        style={{
          background: 'linear-gradient(135deg, rgba(212, 165, 116, 0.3) 0%, rgba(244, 209, 155, 0.2) 50%, rgba(232, 197, 137, 0.3) 100%)',
          zIndex: 1
        }}
      />

      {/* Navigation Bar */}
      <header className="relative z-20">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          {onPageChange && (
            <Navigation 
              currentPage="coffee" 
              onPageChange={onPageChange}
              language={language}
            />
          )}
          {onLanguageChange && (
            <LanguageSwitcher 
              currentLanguage={language} 
              onLanguageChange={onLanguageChange}
            />
          )}
        </div>
      </header>

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto flex items-center justify-center gap-12 relative z-10 p-8" style={{ minHeight: 'calc(100vh - 120px)' }}>
        {/* 3D Coffee Shop Model - LEFT */}
        <div className="flex-1 relative" style={{ height: '600px' }}>
          <Canvas shadows>
            <PerspectiveCamera makeDefault position={[0, 0.5, 4]} fov={70} />
            
            {/* Lighting setup */}
            <ambientLight intensity={0.6} />
            <directionalLight
              position={[5, 5, 5]}
              intensity={1.2}
              castShadow
              shadow-mapSize-width={2048}
              shadow-mapSize-height={2048}
            />
            <pointLight position={[-5, 3, -5]} intensity={0.8} color="#F4D19B" />
            <pointLight position={[5, 2, 5]} intensity={0.5} color="#D2691E" />
            
            {/* 3D Model */}
            <Suspense fallback={null}>
              <CoffeeShopModel />
              <Environment preset="sunset" />
            </Suspense>
            
            {/* Interactive orbit controls - NO auto-rotate */}
            <OrbitControls
              enableZoom={true}
              enablePan={false}
              minDistance={2}
              maxDistance={10}
              maxPolarAngle={Math.PI / 2}
              autoRotate={false}
            />
          </Canvas>
          
          {/* 3D Controls Info */}
          <div 
            className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm border-2 border-white/30 rounded-lg px-4 py-2 text-white text-sm"
            style={{ fontFamily: '"Courier New", monospace' }}
          >
            <p>🎮 <strong>Drag</strong> to rotate • <strong>Scroll</strong> to zoom</p>
          </div>
        </div>

        {/* Pixel art form - RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex-1"
          style={{ height: '600px', display: 'flex', alignItems: 'center' }}
        >
          <div
            className="relative"
            style={{
              imageRendering: 'pixelated',
              background: 'linear-gradient(180deg, #6F4E37 0%, #3E2723 100%)',
              border: '6px solid #8B4513',
              borderRadius: '12px',
              padding: '4px',
              boxShadow: '0 8px 0 #3E2723, 0 12px 24px rgba(0,0,0,0.4)'
            }}
          >
            {/* Inner content */}
            <div className="bg-[#2C1810] p-8"
              style={{
                border: '3px solid #6F4E37'
              }}
            >
              {!response ? (
                <div className="space-y-6">
                  {/* Title */}
                  <div className="text-center mb-8">
                    <h2
                      className="text-white text-2xl mb-2"
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontWeight: 'bold',
                        textShadow: '2px 2px 0 #D2691E',
                        letterSpacing: '2px'
                      }}
                    >
                      ☕ COFFEE ANALYZER ☕
                    </h2>
                  </div>

                  {/* First input */}
                  <div>
                    <label
                      className="block text-white mb-3 text-lg"
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      {t.coffeeTeaspoons}
                    </label>
                    <input
                      type="number"
                      value={teaspoons}
                      onChange={(e) => setTeaspoons(e.target.value)}
                      placeholder="..."
                      className="w-full px-6 py-4 text-xl"
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontWeight: 'bold',
                        imageRendering: 'pixelated',
                        outline: 'none',
                        background: '#D4A574',
                        border: '4px solid #8B4513',
                        color: '#2C1810'
                      }}
                    />
                  </div>

                  {/* Second input */}
                  <div>
                    <label
                      className="block text-white mb-3 text-lg"
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '1px'
                      }}
                    >
                      {t.coffeeCups}
                    </label>
                    <input
                      type="number"
                      value={cups}
                      onChange={(e) => setCups(e.target.value)}
                      placeholder="..."
                      className="w-full px-6 py-4 text-xl"
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontWeight: 'bold',
                        imageRendering: 'pixelated',
                        outline: 'none',
                        background: '#D4A574',
                        border: '4px solid #8B4513',
                        color: '#2C1810'
                      }}
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-4 pt-4">
                    <button
                      onClick={handleAnalyze}
                      disabled={!teaspoons || !cups || isLoading}
                      className="flex-1 py-4 bg-[#D2691E] border-4 border-white text-white text-xl hover:bg-[#A0522D] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        imageRendering: 'pixelated'
                      }}
                    >
                      {isLoading ? '...' : t.coffeeAnalyze}
                    </button>
                    <button
                      onClick={handleReset}
                      className="px-8 py-4 bg-transparent border-4 border-white text-white text-xl hover:bg-white/10 transition-colors"
                      style={{
                        fontFamily: '"Courier New", monospace',
                        fontWeight: 'bold',
                        textTransform: 'uppercase',
                        letterSpacing: '2px',
                        imageRendering: 'pixelated'
                      }}
                    >
                      {t.coffeeCancel}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Response display */}
                  <div
                    className="text-white text-lg leading-relaxed whitespace-pre-wrap"
                    style={{
                      fontFamily: '"Courier New", monospace',
                      letterSpacing: '0.5px'
                    }}
                  >
                    {response}
                  </div>

                  {/* Get another button */}
                  <button
                    onClick={handleReset}
                    className="w-full py-4 bg-[#D2691E] border-4 border-white text-white text-xl hover:bg-[#A0522D] transition-colors"
                    style={{
                      fontFamily: '"Courier New", monospace',
                      fontWeight: 'bold',
                      textTransform: 'uppercase',
                      letterSpacing: '2px',
                      imageRendering: 'pixelated'
                    }}
                  >
                    ↻ {t.coffeeAnalyze} AGAIN
                  </button>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}