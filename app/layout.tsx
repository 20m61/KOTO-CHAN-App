import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ことちゃんバースデーアプリ',
  description: 'ことちゃんの1歳の誕生日を祝う特別なアプリ',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: '#FFB6C1',
  manifest: '/manifest.json',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'ことちゃんアプリ',
  },
  openGraph: {
    title: 'ことちゃんバースデーアプリ',
    description: 'ことちゃんの1歳の誕生日を祝う特別なアプリ',
    type: 'website',
    locale: 'ja_JP',
    siteName: 'ことちゃんアプリ',
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-icon.png' },
    ],
  },
};

import { PWAInstaller } from '@/components/ui/PWAInstaller';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja" className="h-full">
      <head>
        <meta name="format-detection" content="telephone=no" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${inter.className} h-full overflow-x-hidden`}>
        <div className="min-h-full">
          {children}
          <PWAInstaller />
        </div>
      </body>
    </html>
  );
}