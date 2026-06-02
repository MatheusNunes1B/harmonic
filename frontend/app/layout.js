import '../styles/globals.css';
import Player from '../components/Player';
import MobileNav from '../components/MobileNav';
import ServiceWorkerRegister from '../components/ServiceWorkerRegister';

export const metadata = {
  title: 'Harmonic',
  description: 'PWA de música moderno com playlists, busca e player.',
  manifest: '/manifest.json'
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#8b5cf6'
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <ServiceWorkerRegister />
        {children}
        <Player />
        <MobileNav />
      </body>
    </html>
  );
}
