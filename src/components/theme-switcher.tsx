'use client';

import { useTheme } from 'next-themes';
import { Button } from '@/components/ui/button';
import { Sun, Moon, Laptop } from 'lucide-react';
import { useI18n } from '@/context/i18n-context';
import { cn } from '@/lib/utils';

export default function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();
  const { t } = useI18n();

  const themes = [
    { name: 'light', label: t('customize.theme.light'), icon: <Sun /> },
    { name: 'dark', label: t('customize.theme.dark'), icon: <Moon /> },
    { name: 'system', label: t('customize.theme.system'), icon: <Laptop /> },
  ];

  return (
    <div className="grid grid-cols-3 gap-2 rounded-lg bg-muted p-1">
      {themes.map((item) => (
        <Button
          key={item.name}
          variant="ghost"
          onClick={() => setTheme(item.name)}
          className={cn(
            'w-full justify-center text-muted-foreground hover:text-foreground',
            theme === item.name &&
              'bg-background text-foreground shadow-sm hover:bg-background'
          )}
        >
          {item.icon}
          <span className="ml-2 hidden sm:inline">{item.label}</span>
        </Button>
      ))}
    </div>
  );
}
