import { Button } from './ui/button';
import { Home, Notebook, Coffee } from 'lucide-react';
import { FortuneCookieIcon } from './FortuneCookieIcon';
import { translations, type Language } from '../lib/translations';

interface NavigationProps {
  currentPage: 'home' | 'history' | 'fortune-cookies' | 'coffee';
  onPageChange: (page: 'home' | 'history' | 'fortune-cookies' | 'coffee') => void;
  language: Language;
}

export function Navigation({ currentPage, onPageChange, language }: NavigationProps) {
  const t = translations[language];

  return (
    <nav className="flex gap-2">
      <Button
        variant={currentPage === 'home' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onPageChange('home')}
        className={currentPage === 'home' 
          ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' 
          : 'text-white hover:bg-white/10 backdrop-blur-sm'}
      >
        <Home className="size-4 mr-2" />
        {t.home}
      </Button>
      <Button
        variant={currentPage === 'history' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onPageChange('history')}
        className={currentPage === 'history' 
          ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' 
          : 'text-white hover:bg-white/10 backdrop-blur-sm'}
      >
        <Notebook className="size-4 mr-2" />
        {t.history}
      </Button>
      <Button
        variant={currentPage === 'fortune-cookies' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onPageChange('fortune-cookies')}
        className={currentPage === 'fortune-cookies' 
          ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' 
          : 'text-white hover:bg-white/10 backdrop-blur-sm'}
      >
        <FortuneCookieIcon className="size-4 mr-2" />
        {t.fortuneCookies}
      </Button>
      <Button
        variant={currentPage === 'coffee' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => onPageChange('coffee')}
        className={currentPage === 'coffee' 
          ? 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm' 
          : 'text-white hover:bg-white/10 backdrop-blur-sm'}
      >
        <Coffee className="size-4 mr-2" />
        {t.coffee}
      </Button>
    </nav>
  );
}