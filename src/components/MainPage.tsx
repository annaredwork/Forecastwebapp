import { Language } from '../App';
import { LanguageSelector } from './LanguageSelector';
import { PredictionButton } from './PredictionButton';

interface MainPageProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onNavigateToHistory: () => void;
}

export function MainPage({ language, setLanguage, onNavigateToHistory }: MainPageProps) {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 animate-gradient">
        <div className="absolute inset-0 bg-gradient-to-tl from-blue-500 via-cyan-500 to-teal-500 opacity-70 animate-gradient-reverse"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        <LanguageSelector 
          language={language} 
          setLanguage={setLanguage}
          onNavigateToHistory={onNavigateToHistory}
        />
        
        <div className="flex-1 flex items-center justify-center px-4">
          <div className="text-center">
            <h1 className="text-white mb-12 drop-shadow-lg">
              Forecast
            </h1>
            
            <PredictionButton language={language} />
          </div>
        </div>
      </div>
      
      <style>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        @keyframes gradient-reverse {
          0% {
            background-position: 100% 50%;
          }
          50% {
            background-position: 0% 50%;
          }
          100% {
            background-position: 100% 50%;
          }
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 8s ease infinite;
        }
        
        .animate-gradient-reverse {
          background-size: 200% 200%;
          animation: gradient-reverse 10s ease infinite;
        }
      `}</style>
    </div>
  );
}