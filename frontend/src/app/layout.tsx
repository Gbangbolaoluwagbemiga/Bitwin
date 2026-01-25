import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Sidebar } from '@/components/sidebar';
import { ThemeProvider } from '@/components/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BitTrust - Advanced Lending on Stacks',
  description: 'Reputation-based lending with flash loans, pools, and NFT collateral',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-background text-foreground min-h-screen flex transition-colors duration-300`}>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
          <Sidebar />
          <main className="flex-1 ml-64 p-8">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
