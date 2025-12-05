import { Button } from './ui/button';
import { Home, Notebook } from 'lucide-react';
import { translations, type Language } from '../lib/translations';

interface NavigationProps {
  currentPage: 'home' | 'history';
  onPageChange: (page: 'home' | 'history') => void;
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
    </nav>
  );
}