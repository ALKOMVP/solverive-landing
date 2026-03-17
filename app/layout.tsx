import type { Metadata } from 'next';
import { Outfit, Syne } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Solverive | Gestión de clases y reservas por WhatsApp',
  description:
    'Sistema todo-en-uno para estudios y profesores: calendario, alumnos, reservas, cancelaciones y lista de espera. Tus alumnos reservan y cancelan por WhatsApp.',
  openGraph: {
    title: 'Solverive | Gestión de clases y reservas por WhatsApp',
    description:
      'Sistema todo-en-uno para estudios y profesores. Reservas y cancelaciones por WhatsApp.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`scroll-smooth ${outfit.variable} ${syne.variable}`}>
      <body className="min-h-screen font-sans antialiased bg-[var(--bg)] text-[var(--text)]">
        {children}
      </body>
    </html>
  );
}
