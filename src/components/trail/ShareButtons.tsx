'use client';

import { Button } from '@/components/common/Button';

interface ShareButtonsProps {
  language?: 'pl' | 'en';
}

export function ShareButtons({ language = 'pl' }: ShareButtonsProps) {
  const labels =
    language === 'pl'
      ? {
          facebook: 'Facebook',
          twitter: 'Twitter',
          copy: 'Kopiuj link',
          facebookMessage: 'Udostępnij na Facebooku - funkcja w przygotowaniu',
          twitterMessage: 'Udostępnij na Twitterze - funkcja w przygotowaniu',
          copyMessage: 'Kopiuj link - funkcja w przygotowaniu',
        }
      : {
          facebook: 'Facebook',
          twitter: 'Twitter',
          copy: 'Copy link',
          facebookMessage: 'Share on Facebook - not implemented yet',
          twitterMessage: 'Share on Twitter - not implemented yet',
          copyMessage: 'Copy link - not implemented yet',
        };

  return (
    <div className="flex gap-3">
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          console.warn(labels.facebookMessage);
        }}
      >
        {labels.facebook}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          console.warn(labels.twitterMessage);
        }}
      >
        {labels.twitter}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={() => {
          console.warn(labels.copyMessage);
        }}
      >
        {labels.copy}
      </Button>
    </div>
  );
}
