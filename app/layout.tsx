import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Ithmar Capital — Une nouvelle expérience se prépare',
  description: 'Ithmar Capital prépare le lancement de sa nouvelle plateforme digitale.',
  robots: { index: true, follow: true },
  openGraph: { title: 'Ithmar Capital', description: 'Une nouvelle expérience digitale se prépare.', type: 'website' },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="fr"><body>{children}</body></html>;
}
