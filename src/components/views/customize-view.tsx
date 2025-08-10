'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useI18n } from '@/context/i18n-context';
import { Languages, Paintbrush, Palette } from 'lucide-react';
import LanguageSwitcher from '@/components/language-switcher';
import ThemeSwitcher from '@/components/theme-switcher';

export default function CustomizeView() {
  const { t } = useI18n();
  return (
    <div className="h-full flex items-start justify-center pt-10">
        <div className="w-full max-w-2xl space-y-8">
            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary rounded-lg p-3 w-fit">
                            <Languages className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-2xl">{t('customize.language.title')}</CardTitle>
                            <CardDescription>{t('customize.language.description')}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <LanguageSwitcher />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <div className="flex items-center gap-4">
                        <div className="bg-primary/10 text-primary rounded-lg p-3 w-fit">
                            <Palette className="h-6 w-6" />
                        </div>
                        <div>
                            <CardTitle className="font-headline text-2xl">{t('customize.theme.title')}</CardTitle>
                            <CardDescription>{t('customize.theme.description')}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <ThemeSwitcher />
                </CardContent>
            </Card>

            <Card>
                <CardHeader className="text-center">
                    <div className="mx-auto bg-primary/10 text-primary rounded-full p-3 w-fit mb-4">
                        <Paintbrush className="h-8 w-8" />
                    </div>
                    <CardTitle className="font-headline text-3xl">{t('customize.title')}</CardTitle>
                    <CardDescription>{t('customize.description')}</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="text-center text-muted-foreground p-10 border-2 border-dashed rounded-lg mt-4">
                    <p className="text-lg font-semibold font-body">{t('customize.comingSoon.title')}</p>
                    <p className="font-body">{t('customize.comingSoon.description')}</p>
                    </div>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
