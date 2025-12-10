import { ClerkProvider } from '@clerk/nextjs';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'SM3 Tech - Inspection Management System',
  description: 'Professional inspection and compliance management system for factory licenses, stability certificates, and regulatory documentation.',
  keywords: ['inspection management', 'factory license', 'compliance', 'certificates', 'regulatory documentation', 'SM3 Tech'],
  authors: [{ name: 'SM3 Tech' }],
  creator: 'SM3 Tech',
  publisher: 'SM3 Tech',
  applicationName: 'SM3 Tech Inspection System',
  openGraph: {
    title: 'SM3 Tech - Inspection Management System',
    description: 'Professional inspection and compliance management system for factory licenses, stability certificates, and regulatory documentation.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SM3 Tech - Inspection Management System',
    description: 'Professional inspection and compliance management system for factory licenses, stability certificates, and regulatory documentation.',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
