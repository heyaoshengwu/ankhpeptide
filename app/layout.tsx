import type { Metadata } from 'next';
import './globals.css';

const BASE_URL = process.env.SITE_URL || 'https://ankhpeptide.com';

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  icons: '/favicon.svg',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}