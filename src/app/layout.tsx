import type { Metadata } from 'next';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Hilal Lavaş | Gelenekten Geleceğe Unlu Mamüller',
  description: 'En kaliteli buğdaydan, hijyenik modern tesislerde el değmeden üretilen lavaş, tortilla, gobit ve tırnaklı pide çeşitlerimiz ile sofralarınıza lezzet katıyoruz.',
  keywords: 'lavaş, tortilla, gobit, pide, unlu mamüller, hilal lavaş, dürüm ekmeği, ankara unlu mamüller',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="tr" className={`${inter.variable} ${playfair.variable} scroll-smooth`}>
      <body className="font-sans text-brand-dark antialiased bg-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
