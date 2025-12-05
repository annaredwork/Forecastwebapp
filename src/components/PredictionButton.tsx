import { useState } from 'react';
import { Button } from './ui/button';
import { Sparkles } from 'lucide-react';
import { Language } from '../App';

interface PredictionButtonProps {
  language: Language;
}

const predictions = {
  en: [
    "Great opportunities await you this week!",
    "A pleasant surprise is coming your way.",
    "Your creativity will lead to success.",
    "An important connection will be made soon.",
    "Trust your intuition in the coming days.",
    "A new adventure is on the horizon.",
    "Your hard work will soon pay off.",
    "Expect positive changes in your life."
  ],
  ru: [
    "На этой неделе вас ждут большие возможности!",
    "Вас ждет приятный сюрприз.",
    "Ваша креативность приведет к успеху.",
    "Скоро вы установите важную связь.",
    "Доверяйте своей интуиции в ближайшие дни.",
    "На горизонте новое приключение.",
    "Ваш упорный труд скоро окупится.",
    "Ожидайте позитивных изменений в вашей жизни."
  ]
};

const buttonText = {
  en: "Get Prediction",
  ru: "Получить предсказание"
};

export function PredictionButton({ language }: PredictionButtonProps) {
  const [prediction, setPrediction] = useState<string | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleGetPrediction = () => {
    setIsAnimating(true);
    setPrediction(null);
    
    setTimeout(() => {
      const randomPrediction = predictions[language][Math.floor(Math.random() * predictions[language].length)];
      setPrediction(randomPrediction);
      setIsAnimating(false);
    }, 800);
  };

  return (
    <div className="space-y-8">
      <Button 
        onClick={handleGetPrediction}
        disabled={isAnimating}
        size="lg"
        className="bg-white text-purple-600 hover:bg-purple-50 shadow-2xl px-8 py-6 transition-all duration-300 hover:scale-105"
      >
        <Sparkles className={`mr-2 h-5 w-5 ${isAnimating ? 'animate-spin' : ''}`} />
        {buttonText[language]}
      </Button>
      
      {prediction && (
        <div className="mt-8 max-w-md mx-auto animate-fade-in">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <p className="text-purple-900">
              {prediction}
            </p>
          </div>
        </div>
      )}
      
      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fade-in 0.5s ease-out;
        }
      `}</style>
    </div>
  );
}
