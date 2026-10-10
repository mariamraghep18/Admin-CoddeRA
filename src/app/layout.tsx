import type { Metadata } from 'next';
import './globals.css';
import { AppProvider } from '@/context/AppContext';

export const metadata: Metadata = {
  title: 'CodeRa Admin Portal',
  description: 'Enterprise Administrative Operations for CodeRa EdTech Platform',
  icons: {
    icon: [
      { url: '/assets/logo.svg', type: 'image/svg+xml' },
      { url: '/favicon.ico' },
    ],
    apple: '/assets/logo.svg',
    shortcut: '/assets/logo.svg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <body className="antialiased selection:bg-blue-500/20 selection:text-blue-600">
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
