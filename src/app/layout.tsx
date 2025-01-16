// src/app/layout.tsx
import Navbar from './components/Navbar';
import './globals.css'; // includes Tailwind base, components, utilities

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        {/* Existing Quicksand Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        {/* Add Antonio Font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Antonio:wght@400;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {/* Navbar is rendered here, ensuring it's persistent across pages */}
        <Navbar />
        {children}
      </body>
    </html>
  );
}
