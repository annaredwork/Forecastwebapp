import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { translations, type Language } from '../lib/translations';

interface HistoryPageProps {
  language: Language;
}

export function HistoryPage({ language }: HistoryPageProps) {
  const t = translations[language];

  return (
    <div className="container max-w-4xl mx-auto py-12 px-4">
      <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-white">{t.historyTitle}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-white/90 leading-relaxed">
            {t.historyContent}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
