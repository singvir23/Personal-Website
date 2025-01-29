// src/app/layout.tsx
import Navbar from './components/Navbar';
import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Viraaj Singh',
  description: 'Personal website of Viraaj Singh',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Preconnect for Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Add PT Mono Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=PT+Mono&display=swap"
          rel="stylesheet"
        />
      </head>
      <body style={{ fontFamily: "'PT Mono', monospace" }}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
