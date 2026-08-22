import type { Metadata } from 'next';
import './globals.css';
import { SahayakMeshProvider } from '@/lib/sahayak-mesh/mesh-context';

export const metadata: Metadata = {
  title: 'Sahayak Mesh — Offline-First Systems (Track 05)',
  description: 'Hackathon Track 05: Offline-First Systems. Local truth layer & edge route engine for crowded venues.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="bg-slate-950 text-slate-100 antialiased min-h-screen">
        <SahayakMeshProvider>
          {children}
        </SahayakMeshProvider>
      </body>
    </html>
  );
}
