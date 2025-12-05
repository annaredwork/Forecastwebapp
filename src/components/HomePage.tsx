import { Button } from './ui/button';
import { Sparkles, Copy, Check } from 'lucide-react';
import { translations, type Language } from '../lib/translations';
import { quotes } from '../data/quotes';
import { useState } from 'react';

interface HomePageProps {
  language: Language;
}

export function HomePage({ language }: HomePageProps) {
  const t = translations[language];
  const [currentQuote, setCurrentQuote] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const handleGetPrediction = () => {
    const languageQuotes = quotes[language];
    const randomQuote = languageQuotes[Math.floor(Math.random() * languageQuotes.length)];
    setCurrentQuote(randomQuote);
    setCopied(false);
  };

  const handleCopyQuote = async () => {
    if (currentQuote) {
      try {
        // Try modern Clipboard API first
        await navigator.clipboard.writeText(currentQuote);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        // Fallback to legacy method
        const textArea = document.createElement('textarea');
        textArea.value = currentQuote;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        } catch (error) {
          console.error('Failed to copy:', error);
        }
        document.body.removeChild(textArea);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] px-4">
      <div className="text-center space-y-8 max-w-2xl w-full">
        <h1 className="text-5xl text-white drop-shadow-lg">
          {t.heroTitle}
        </h1>
        
        {!currentQuote ? (
          <Button
            onClick={handleGetPrediction}
            size="lg"
            className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 backdrop-blur-sm px-8 py-6 transition-all hover:scale-105"
          >
            <Sparkles className="size-5 mr-2" />
            {t.getPrediction}
          </Button>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div 
              className="relative bg-white/10 backdrop-blur-md border-2 border-white/30 rounded-2xl p-8 shadow-2xl cursor-pointer transition-all hover:bg-white/15 hover:border-white/40 active:scale-[0.98]"
              onClick={handleCopyQuote}
              title={copied ? t.copied : t.copyQuote}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent rounded-2xl" />
              <p className="relative text-white text-xl leading-relaxed">
                "{currentQuote}"
              </p>
            </div>
            
            <div className="flex gap-4 justify-center">
              <Button
                onClick={handleCopyQuote}
                variant="outline"
                className="bg-white/10 hover:bg-white/20 text-white border-2 border-white/30 backdrop-blur-sm transition-all"
              >
                {copied ? (
                  <>
                    <Check className="size-4 mr-2" />
                    {t.copied}
                  </>
                ) : (
                  <>
                    <Copy className="size-4 mr-2" />
                    {t.copyQuote}
                  </>
                )}
              </Button>
              
              <Button
                onClick={handleGetPrediction}
                className="bg-white/20 hover:bg-white/30 text-white border-2 border-white/40 backdrop-blur-sm transition-all hover:scale-105"
              >
                <Sparkles className="size-5 mr-2" />
                {t.getAnother}
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}