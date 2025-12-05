import { useState } from 'react';
import { AnimatedGradient } from './components/AnimatedGradient';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { Navigation } from './components/Navigation';
import { HomePage } from './components/HomePage';
import { HistoryPage } from './components/HistoryPage';
import { type Language } from './lib/translations';

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [currentPage, setCurrentPage] = useState<'home' | 'history'>('home');

  return (
    <div className="min-h-screen relative">
      <AnimatedGradient />
      
      <div className="relative z-10">
        <header className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Navigation 
            currentPage={currentPage} 
            onPageChange={setCurrentPage}
            language={language}
          />
          <LanguageSwitcher 
            currentLanguage={language} 
            onLanguageChange={setLanguage}
          />
        </header>

        <main>
          {currentPage === 'home' ? (
            <HomePage language={language} />
          ) : (
            <HistoryPage language={language} />
          )}
        </main>
      </div>
    </div>
  );
}
