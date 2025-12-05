import { Languages, ChevronDown } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { type Language } from '../lib/translations';

interface LanguageSwitcherProps {
  currentLanguage: Language;
  onLanguageChange: (lang: Language) => void;
}

const languageLabels = {
  en: 'English',
  ru: 'Русский',
  ua: 'Українська',
};

export function LanguageSwitcher({ currentLanguage, onLanguageChange }: LanguageSwitcherProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="outline" 
          size="sm" 
          className="gap-2 bg-white/10 hover:bg-white/20 border-2 border-white/30 text-white backdrop-blur-sm transition-all"
        >
          <Languages className="size-4" />
          {languageLabels[currentLanguage]}
          <ChevronDown className="size-3 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="backdrop-blur-md bg-white/10 border-2 border-white/30 shadow-2xl">
        <DropdownMenuItem 
          onClick={() => onLanguageChange('en')}
          className="cursor-pointer text-white hover:bg-white/20 focus:bg-white/20 transition-colors"
        >
          English
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onLanguageChange('ru')}
          className="cursor-pointer text-white hover:bg-white/20 focus:bg-white/20 transition-colors"
        >
          Русский
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => onLanguageChange('ua')}
          className="cursor-pointer text-white hover:bg-white/20 focus:bg-white/20 transition-colors"
        >
          Українська
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}