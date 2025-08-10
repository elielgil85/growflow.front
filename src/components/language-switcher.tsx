'use client';

import { Button } from '@/components/ui/button';
import { useI18n } from '@/context/i18n-context';
import { cn } from '@/lib/utils';
import { Languages } from 'lucide-react';

// A simple SVG for Brazil flag
const BrazilFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 20" fill="none">
        <rect width="28" height="20" rx="4" fill="#009B3A"/>
        <path d="M13.9999 2.5L24.9999 10L13.9999 17.5L2.99991 10L13.9999 2.5Z" fill="#FFCC29"/>
        <circle cx="14" cy="10" r="4.5" fill="#002776"/>
    </svg>
);

// A simple SVG for USA flag
const USAFlag = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 28 20" fill="none">
        <rect width="28" height="20" rx="4" fill="#fff"/>
        <path d="M0 4C0 1.79086 1.79086 0 4 0H24C26.2091 0 28 1.79086 28 4V10H0V4Z" fill="#B31942"/>
        <path fillRule="evenodd" clipRule="evenodd" d="M0 4H15.2V14H0V4Z" fill="#002868"/>
        <path d="M0 14H28V16H0V14ZM0 18H28V20H0V18Z" fill="#B31942"/>
    </svg>
);


export default function LanguageSwitcher() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={language === 'en' ? 'default' : 'outline'}
        onClick={() => setLanguage('en')}
        className={cn("flex-1", language === 'en' && "border-2 border-primary shadow-lg")}
      >
        <USAFlag />
        <span className="ml-2">English</span>
      </Button>
      <Button
        variant={language === 'pt' ? 'default' : 'outline'}
        onClick={() => setLanguage('pt')}
        className={cn("flex-1", language === 'pt' && "border-2 border-primary shadow-lg")}
      >
        <BrazilFlag />
        <span className="ml-2">Português</span>
      </Button>
    </div>
  );
}
