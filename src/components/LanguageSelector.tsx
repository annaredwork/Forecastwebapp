import { Language } from '../App';
import { Globe, History } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface LanguageSelectorProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  onNavigateToHistory: () => void;
}

const languageNames = {
  en: 'English',
  ru: 'Русский'
};

const historyText = {
  en: 'History',
  ru: 'История'
};

export function LanguageSelector({ language, setLanguage, onNavigateToHistory }: LanguageSelectorProps) {
  return (
    <div className="flex justify-between items-center p-6">
      <Button
        onClick={onNavigateToHistory}
        variant="ghost"
        className="text-white hover:bg-white/20 backdrop-blur-sm"
      >
        <History className="mr-2 h-5 w-5" />
        {historyText[language]}
      </Button>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="text-white hover:bg-white/20 backdrop-blur-sm"
          >
            <Globe className="mr-2 h-5 w-5" />
            {languageNames[language]}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white/95 backdrop-blur-sm">
          <DropdownMenuItem 
            onClick={() => setLanguage('en')}
            className="cursor-pointer"
          >
            {languageNames.en}
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => setLanguage('ru')}
            className="cursor-pointer"
          >
            {languageNames.ru}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
